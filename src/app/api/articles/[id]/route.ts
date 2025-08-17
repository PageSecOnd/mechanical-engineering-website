import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { generateSlug, extractExcerpt } from '@/lib/utils'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
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

    if (!article) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    return NextResponse.json(
      { error: '获取文章失败' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: '权限不足' }, { status: 403 })
  }

  try {
    const data = await request.json()
    const { title, content, categoryId, tags, status, featured } = data

    const slug = generateSlug(title)
    const excerpt = extractExcerpt(content)

    // 删除现有的标签关联
    await prisma.tagOnArticle.deleteMany({
      where: { articleId: params.id }
    })

    const article = await prisma.article.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        content,
        excerpt,
        status,
        featured,
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
    console.error('更新文章失败:', error)
    return NextResponse.json(
      { error: '更新文章失败' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: '权限不足' }, { status: 403 })
  }

  try {
    await prisma.article.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: '文章删除成功' })
  } catch (error) {
    return NextResponse.json(
      { error: '删除文章失败' },
      { status: 500 }
    )
  }
}