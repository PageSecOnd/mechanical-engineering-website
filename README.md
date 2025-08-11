# 机械工程企业网站

现代化的机械工程企业网站，采用前后端分离架构，具备完整的内容管理功能和优秀的用户体验。

## ✨ 功能特性

### 🎨 前端功能
- **响应式设计** - 完美适配桌面、平板、手机
- **首页轮播图** - 可自定义图片、标题和链接
- **产品展示系统** - 分类展示，支持详细规格参数
- **文章新闻系统** - Markdown 支持，分类标签管理
- **流畅动画效果** - Framer Motion 驱动的现代动画
- **SEO 优化** - 完整的 Meta 标签和结构化数据
- **多语言支持** - 中文界面优化

### 🛠 后端功能
- **用户认证系统** - JWT 认证，多角色权限管理
- **内容管理系统** - 文章、产品、分类完整管理
- **文件上传系统** - 安全的图片上传和管理
- **API 安全防护** - 限流、验证、XSS 防护
- **数据库设计** - MongoDB 优化的数据结构
- **RESTful API** - 标准化的 API 接口

### 👨‍💼 管理功能
- **后台管理界面** - 直观的管理操作界面
- **内容编辑器** - 支持 Markdown 的富文本编辑
- **用户管理** - 管理员和编辑角色权限
- **网站配置** - 公司信息、SEO 设置等
- **轮播图管理** - 首页轮播内容管理

## 🚀 快速开始

### 一键部署

```bash
# 克隆项目
git clone https://github.com/PageSecOnd/mechanical-engineering-website.git
cd mechanical-engineering-website

# 自动部署 (推荐)
./scripts/deploy.sh dev   # 开发环境
./scripts/deploy.sh prod  # 生产环境
```

### 手动安装

#### 环境要求
- Node.js 18+
- MongoDB 6+
- PM2 (生产环境)
- Nginx (生产环境)

#### 安装步骤

1. **安装依赖**
```bash
# 后端依赖
cd backend && npm install

# 前端依赖
cd ../frontend && npm install
```

2. **配置环境**
```bash
# 复制配置文件
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 编辑配置 (设置数据库连接等)
nano backend/.env
```

3. **构建项目**
```bash
# 构建后端
cd backend && npm run build

# 构建前端
cd ../frontend && npm run build
```

4. **初始化数据**
```bash
cd backend && npm run seed
```

5. **启动服务**
```bash
# 开发环境
cd backend && npm run dev     # 后端服务
cd frontend && npm run dev    # 前端服务 (新终端)

# 生产环境
pm2 start ecosystem.config.js --env production
```

## 📱 访问应用

- **前端网站**: http://localhost:3000
- **后端API**: http://localhost:5000/api
- **管理后台**: http://localhost:3000/admin

### 默认管理员账户
- 用户名: `admin`
- 密码: `admin123456`

## 🛠 技术栈

### 前端技术
- **React 18** + **TypeScript** - 现代化前端框架
- **Next.js 14** - 全栈 React 框架，支持 SSR/SSG
- **Tailwind CSS** - 原子化 CSS 框架
- **Framer Motion** - 强大的动画库
- **React Hook Form** + **Zod** - 表单处理和验证
- **React Markdown** - Markdown 渲染支持
- **Zustand** - 轻量级状态管理
- **Axios** - HTTP 客户端

### 后端技术
- **Node.js** + **Express** + **TypeScript** - 服务端框架
- **MongoDB** + **Mongoose** - 数据库和 ODM
- **JWT** + **bcryptjs** - 身份认证和密码加密
- **Multer** - 文件上传处理
- **Helmet** - 安全头设置
- **Express Rate Limit** - API 限流
- **Joi** - 数据验证

### 部署技术
- **PM2** - 进程管理
- **Nginx** - 反向代理和静态文件服务
- **Let's Encrypt** - SSL 证书

## 📁 项目结构

```
mechanical-engineering-website/
├── frontend/              # Next.js 前端应用
│   ├── src/
│   │   ├── app/           # Next.js 13+ App Router
│   │   ├── components/    # 可复用组件
│   │   │   ├── ui/        # 基础 UI 组件
│   │   │   ├── layout/    # 布局组件
│   │   │   └── sections/  # 页面区块组件
│   │   ├── lib/           # 工具库和配置
│   │   ├── store/         # Zustand 状态管理
│   │   └── styles/        # 样式文件
│   └── public/            # 静态资源
├── backend/               # Express 后端 API
│   ├── src/
│   │   ├── controllers/   # 控制器
│   │   ├── models/        # 数据模型
│   │   ├── routes/        # 路由定义
│   │   ├── middleware/    # 中间件
│   │   ├── utils/         # 工具函数
│   │   ├── config/        # 配置文件
│   │   └── scripts/       # 脚本文件
│   └── uploads/           # 文件上传目录
├── shared/                # 共享类型定义
├── scripts/               # 部署和构建脚本
├── nginx.conf             # Nginx 配置
├── ecosystem.config.js    # PM2 配置
└── DEPLOYMENT.md          # 详细部署文档
```

## 🔧 开发指南

### 添加新页面
```typescript
// frontend/src/app/new-page/page.tsx
export default function NewPage() {
  return <div>新页面内容</div>;
}
```

### 添加新 API 接口
```typescript
// backend/src/routes/new-route.ts
import { Router } from 'express';

const router = Router();

router.get('/new-endpoint', (req, res) => {
  res.json({ message: '新的API接口' });
});

export default router;
```

### 添加新组件
```typescript
// frontend/src/components/NewComponent.tsx
export const NewComponent = () => {
  return <div>新组件</div>;
};
```

## 🚀 部署指南

详细的部署说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 服务器环境自动安装

```bash
# Ubuntu/CentOS 服务器一键安装环境
curl -sSL https://raw.githubusercontent.com/PageSecOnd/mechanical-engineering-website/main/scripts/install-server.sh | sudo bash
```

### Nginx 配置

```bash
# 复制 Nginx 配置
sudo cp nginx.conf /etc/nginx/sites-available/mechanical-engineering

# 启用站点
sudo ln -s /etc/nginx/sites-available/mechanical-engineering /etc/nginx/sites-enabled/

# 重启 Nginx
sudo systemctl restart nginx
```

### SSL 证书

```bash
# 使用 Let's Encrypt 自动配置 SSL
sudo certbot --nginx -d your-domain.com
```

## 📊 API 文档

### 认证接口
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/profile` - 获取用户信息

### 内容接口
- `GET /api/articles` - 获取文章列表
- `GET /api/products` - 获取产品列表
- `GET /api/categories` - 获取分类列表

### 网站接口
- `GET /api/site/settings` - 获取网站设置
- `POST /api/site/contact` - 提交联系表单

完整 API 文档请参考源码中的路由定义。

## 🔒 安全特性

- **JWT 身份认证** - 安全的用户认证机制
- **密码加密** - bcryptjs 密码哈希
- **XSS 防护** - 输入验证和输出转义
- **CSRF 防护** - 跨站请求伪造防护
- **API 限流** - 防止恶意请求
- **文件上传安全** - 文件类型和大小限制
- **Helmet 安全头** - HTTP 安全头设置

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持

如果您遇到问题或需要帮助：

1. 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取详细部署说明
2. 提交 [Issue](https://github.com/PageSecOnd/mechanical-engineering-website/issues)
3. 查看项目 [Wiki](https://github.com/PageSecOnd/mechanical-engineering-website/wiki)

## 🌟 致谢

感谢所有开源项目的贡献者，特别是：
- Next.js 团队
- React 团队  
- Tailwind CSS 团队
- MongoDB 团队

---

**⭐ 如果这个项目对您有帮助，请给它一个星标！**