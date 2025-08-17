import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { generateSlug } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')
  const search = searchParams.get('search')
  const category = searchParams.get('category')
  const status = searchParams.get('status')

  const skip = (page - 1) * limit

  const where: any = {}
  
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
    ]
  }
  
  if (category) {
    where.category = { slug: category }
  }
  
  if (status) {
    where.status = status
  } else {
    where.status = 'ACTIVE'
  }

  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          author: {
            select: { id: true, name: true, email: true }
          },
          category: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.product.count({ where })
    ])

    return NextResponse.json({
      data: products,
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
      { error: '获取产品列表失败' },
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
    const { name, description, content, price, images, specifications, categoryId, status, featured } = data

    const slug = generateSlug(name)

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        content,
        price,
        images: images || [],
        specifications,
        status: status || 'ACTIVE',
        featured: featured || false,
        authorId: session.user.id,
        categoryId,
      },
      include: {
        author: {
          select: { id: true, name: true, email: true }
        },
        category: true,
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('创建产品失败:', error)
    return NextResponse.json(
      { error: '创建产品失败' },
      { status: 500 }
    )
  }
}