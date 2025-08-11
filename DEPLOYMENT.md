# 机械工程企业网站 - 部署文档

## 快速开始

### 环境要求

- Node.js 18+
- MongoDB 6+
- PM2 (生产环境)
- Nginx (生产环境)

### 自动安装服务器环境

对于全新的 Ubuntu/CentOS 服务器，可以使用自动安装脚本：

```bash
# 下载并运行服务器环境安装脚本
curl -sSL https://raw.githubusercontent.com/PageSecOnd/mechanical-engineering-website/main/scripts/install-server.sh | sudo bash
```

或者手动下载：

```bash
wget https://raw.githubusercontent.com/PageSecOnd/mechanical-engineering-website/main/scripts/install-server.sh
chmod +x install-server.sh
sudo ./install-server.sh
```

### 手动部署

#### 1. 克隆项目

```bash
git clone https://github.com/PageSecOnd/mechanical-engineering-website.git
cd mechanical-engineering-website
```

#### 2. 自动部署

```bash
# 开发环境
./scripts/deploy.sh dev

# 生产环境
./scripts/deploy.sh prod
```

#### 3. 手动部署步骤

如果不想使用自动部署脚本，可以按以下步骤手动部署：

**安装后端依赖并构建：**

```bash
cd backend
npm install
npm run build
```

**安装前端依赖并构建：**

```bash
cd ../frontend
npm install
npm run build
```

**设置环境变量：**

```bash
# 复制环境变量模板
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 编辑配置文件
nano backend/.env
nano frontend/.env
```

**初始化数据库：**

```bash
cd backend
npm run seed
```

**启动服务：**

开发环境：
```bash
# 后端
cd backend && npm run dev

# 前端 (新终端)
cd frontend && npm run dev
```

生产环境：
```bash
# 使用 PM2 启动
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

## 配置说明

### 环境变量配置

#### 后端环境变量 (backend/.env)

```bash
# 环境配置
NODE_ENV=production
PORT=5000
HOST=localhost

# 数据库配置
MONGODB_URI=mongodb://localhost:27017/mechanical-engineering

# JWT 配置
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# 文件上传配置
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# 限流配置
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS 配置
FRONTEND_URL=http://localhost:3000

# 管理员账户 (用于初始化)
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123456
```

#### 前端环境变量 (frontend/.env)

```bash
# API 配置
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# 站点配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=机械工程有限公司
```

### Nginx 配置

1. 复制 Nginx 配置文件：

```bash
sudo cp nginx.conf /etc/nginx/sites-available/mechanical-engineering
```

2. 编辑配置文件，替换域名：

```bash
sudo nano /etc/nginx/sites-available/mechanical-engineering
# 将 your-domain.com 替换为实际域名
```

3. 启用站点：

```bash
sudo ln -s /etc/nginx/sites-available/mechanical-engineering /etc/nginx/sites-enabled/
```

4. 测试配置：

```bash
sudo nginx -t
```

5. 重启 Nginx：

```bash
sudo systemctl restart nginx
```

### SSL 证书配置

使用 Let's Encrypt 自动配置 SSL：

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 功能特性

### 前端功能

- ✅ **响应式设计**: 适配桌面、平板、手机
- ✅ **首页轮播图**: 支持自定义图片和链接
- ✅ **产品展示**: 分类展示，支持规格参数
- ✅ **文章系统**: Markdown 支持，分类标签
- ✅ **动画效果**: Framer Motion 动画
- ✅ **SEO 优化**: Meta 标签，结构化数据

### 后端功能

- ✅ **用户认证**: JWT 认证，角色权限
- ✅ **内容管理**: 文章、产品、分类管理
- ✅ **文件上传**: 图片上传，安全验证
- ✅ **API 限流**: 防止恶意请求
- ✅ **数据验证**: 输入验证，XSS 防护
- ✅ **安全防护**: Helmet 安全头，CORS 配置

### 管理功能

- ✅ **后台管理**: 完整的管理界面
- ✅ **内容编辑**: 所见即所得编辑器
- ✅ **用户管理**: 管理员和编辑角色
- ✅ **网站设置**: 基本信息配置
- ✅ **数据统计**: 基础数据展示

## API 文档

### 认证接口

- `POST /api/auth/login` - 用户登录
- `POST /api/auth/register` - 用户注册
- `GET /api/auth/profile` - 获取用户信息

### 文章接口

- `GET /api/articles` - 获取文章列表
- `GET /api/articles/latest` - 获取最新文章
- `GET /api/articles/:id` - 获取文章详情
- `POST /api/articles` - 创建文章 (需认证)
- `PUT /api/articles/:id` - 更新文章 (需认证)
- `DELETE /api/articles/:id` - 删除文章 (需认证)

### 产品接口

- `GET /api/products` - 获取产品列表
- `GET /api/products/featured` - 获取精选产品
- `GET /api/products/:id` - 获取产品详情
- `POST /api/products` - 创建产品 (需认证)
- `PUT /api/products/:id` - 更新产品 (需认证)
- `DELETE /api/products/:id` - 删除产品 (需认证)

### 其他接口

- `GET /api/categories` - 获取分类列表
- `GET /api/site/settings` - 获取网站设置
- `POST /api/site/contact` - 提交联系表单
- `POST /api/upload/single` - 单文件上传 (需认证)

## 常见问题

### Q: 如何重置管理员密码？

A: 重新运行数据库种子脚本：

```bash
cd backend
npm run seed
```

默认管理员账户：
- 用户名: admin
- 密码: admin123456

### Q: 如何更换域名？

A: 1. 更新 Nginx 配置中的域名
   2. 更新前端环境变量 `NEXT_PUBLIC_SITE_URL`
   3. 更新后端环境变量 `FRONTEND_URL`
   4. 重新申请 SSL 证书

### Q: 如何备份数据？

A: 使用 MongoDB 备份命令：

```bash
mongodump --db mechanical-engineering --out /path/to/backup
```

恢复数据：

```bash
mongorestore --db mechanical-engineering /path/to/backup/mechanical-engineering
```

### Q: 如何监控服务状态？

A: 使用 PM2 监控：

```bash
pm2 status          # 查看状态
pm2 logs            # 查看日志
pm2 monit           # 实时监控
```

### Q: 如何扩展功能？

A: 项目采用模块化设计：

1. **添加新页面**: 在 `frontend/src/app` 中添加路由
2. **添加新组件**: 在 `frontend/src/components` 中添加组件
3. **添加新API**: 在 `backend/src/routes` 中添加路由
4. **添加新模型**: 在 `backend/src/models` 中添加数据模型

## 技术支持

如有问题，请提交 Issue 或联系技术支持。

## 许可证

MIT License - 详见 LICENSE 文件