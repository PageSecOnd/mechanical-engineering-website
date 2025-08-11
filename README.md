# 机械工程企业网站

现代化的机械工程企业网站，采用前后端分离架构，具备完整的内容管理功能和优秀的用户体验。

## 技术栈

### 前端
- React 18 + TypeScript
- Next.js 14 (支持SSR/SSG)
- Tailwind CSS + Framer Motion
- React Hook Form + Zod
- React Markdown + remark/rehype
- Zustand

### 后端
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT认证 + bcryptjs
- Multer (文件上传)
- Express-rate-limit + Helmet

## 项目结构

```
mechanical-engineering-website/
├── frontend/              # Next.js前端应用
│   ├── src/
│   │   ├── components/    # 可复用组件
│   │   ├── pages/         # 页面组件
│   │   ├── hooks/         # 自定义hooks
│   │   ├── store/         # Zustand状态管理
│   │   ├── types/         # TypeScript类型定义
│   │   ├── utils/         # 工具函数
│   │   └── styles/        # 样式文件
│   ├── public/            # 静态资源
│   └── package.json
├── backend/               # Express后端API
│   ├── src/
│   │   ├── controllers/   # 控制器
│   │   ├── models/        # 数据模型
│   │   ├── routes/        # 路由定义
│   │   ├── middleware/    # 中间件
│   │   ├── utils/         # 工具函数
│   │   └── config/        # 配置文件
│   ├── uploads/           # 文件上传目录
│   └── package.json
├── shared/                # 共享类型定义
├── scripts/               # 部署和构建脚本
├── nginx.conf             # Nginx配置
├── ecosystem.config.js    # PM2配置
└── README.md              # 项目文档
```

## 安装和运行

### 环境要求
- Node.js 18+
- MongoDB 6+
- PM2 (生产环境)
- Nginx (生产环境)

### 开发环境

1. 安装依赖
```bash
# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd ../backend
npm install
```

2. 配置环境变量
```bash
# 复制环境变量模板
cp .env.example .env
# 编辑配置文件
```

3. 启动开发服务器
```bash
# 启动后端
cd backend
npm run dev

# 启动前端
cd frontend
npm run dev
```

### 生产环境部署

详见部署文档。

## 功能特性

- ✅ 响应式设计
- ✅ 现代化动画效果
- ✅ 内容管理系统
- ✅ 文章系统(Markdown支持)
- ✅ 产品展示
- ✅ 用户认证
- ✅ 文件上传
- ✅ SEO优化
- ✅ 安全防护

## 许可证

MIT License