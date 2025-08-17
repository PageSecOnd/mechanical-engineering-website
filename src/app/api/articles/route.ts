import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { generateSlug, extractExcerpt } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const search = searchParams.get('search')
  const category = searchParams.get('category')
  const status = searchParams.get('status')

  const skip = (page - 1) * limit

  const where: any = {}
  
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { content: { contains: search } },
    ]
  }
  
  if (category) {
    where.category = { slug: category }
  }
  
  if (status) {
    where.status = status
  } else {
    where.status = 'PUBLISHED'
  }

  try {
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          author: {
            select: { id: true, name: true, email: true }
          },
          category: true,
          tags: {
            include: { tag: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.article.count({ where })
    ])

    return NextResponse.json({
      data: articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: '获取文章列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: '权限不足' }, { status: 403 })
  }

  try {
    const data = await request.json()
    const { title, content, categoryId, tags, status, featured } = data

    const slug = generateSlug(title)
    const excerpt = extractExcerpt(content)

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        status: status || 'DRAFT',
        featured: featured || false,
        authorId: session.user.id,
        categoryId,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        tags: {
          create: tags?.map((tagId: string) => ({
            tag: { connect: { id: tagId } }
          })) || []
        }
      },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        },
        category: true,
        tags: {
          include: { tag: true }
        }
      }
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error('创建文章失败:', error)
    return NextResponse.json(
      { error: '创建文章失败' },
      { status: 500 }
    )
  }
}