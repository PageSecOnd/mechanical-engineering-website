#!/bin/bash

# 机械工程网站部署脚本
# 使用方法: ./deploy.sh [环境] 
# 环境: dev, prod

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查参数
if [ $# -eq 0 ]; then
    log_error "请指定部署环境: dev 或 prod"
    echo "使用方法: ./deploy.sh [dev|prod]"
    exit 1
fi

ENVIRONMENT=$1
PROJECT_ROOT=$(dirname $(dirname $(realpath $0)))

log_info "开始部署机械工程网站 - 环境: $ENVIRONMENT"
log_info "项目根目录: $PROJECT_ROOT"

# 检查 Node.js 和 npm
if ! command -v node &> /dev/null; then
    log_error "Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    log_error "npm 未安装"
    exit 1
fi

# 检查 MongoDB
if ! command -v mongosh &> /dev/null && ! command -v mongo &> /dev/null; then
    log_warn "MongoDB 客户端未找到，请确保 MongoDB 已安装并运行"
fi

# 检查 PM2 (生产环境)
if [ "$ENVIRONMENT" = "prod" ]; then
    if ! command -v pm2 &> /dev/null; then
        log_error "PM2 未安装，请先安装: npm install -g pm2"
        exit 1
    fi
fi

cd $PROJECT_ROOT

# 1. 安装后端依赖
log_info "安装后端依赖..."
cd backend
if [ -f package-lock.json ]; then
    npm ci
else
    npm install
fi

# 2. 编译后端
log_info "编译后端 TypeScript..."
npm run build

# 3. 安装前端依赖
log_info "安装前端依赖..."
cd ../frontend
if [ -f package-lock.json ]; then
    npm ci
else
    npm install
fi

# 4. 构建前端
log_info "构建前端应用..."
npm run build

cd $PROJECT_ROOT

# 5. 环境配置
log_info "配置环境变量..."
if [ "$ENVIRONMENT" = "prod" ]; then
    # 生产环境配置
    if [ ! -f backend/.env ]; then
        log_warn "生产环境配置文件不存在，从模板创建..."
        cp backend/.env.example backend/.env
        log_warn "请编辑 backend/.env 文件设置生产环境配置"
    fi
    
    # 创建日志目录
    mkdir -p logs
    
    # 创建上传目录
    mkdir -p backend/uploads
    chmod 755 backend/uploads
    
    # 6. 数据库初始化
    log_info "检查数据库连接并初始化数据..."
    cd backend
    if npm run seed; then
        log_info "数据库初始化成功"
    else
        log_warn "数据库初始化失败，请检查 MongoDB 连接"
    fi
    cd ..
    
    # 7. 启动服务 (生产环境使用 PM2)
    log_info "使用 PM2 启动服务..."
    pm2 delete mechanical-engineering-backend 2>/dev/null || true
    pm2 delete mechanical-engineering-frontend 2>/dev/null || true
    pm2 start ecosystem.config.js --env production
    pm2 save
    
    log_info "生产环境部署完成!"
    log_info "后端服务: http://localhost:5000"
    log_info "前端服务: http://localhost:3000"
    log_info "查看服务状态: pm2 status"
    log_info "查看日志: pm2 logs"
    
else
    # 开发环境配置
    if [ ! -f backend/.env ]; then
        log_info "创建开发环境配置..."
        cp backend/.env.example backend/.env
    fi
    
    # 创建上传目录
    mkdir -p backend/uploads
    
    # 数据库初始化
    log_info "初始化开发数据库..."
    cd backend
    npm run seed || log_warn "数据库初始化失败，请检查 MongoDB 连接"
    cd ..
    
    log_info "开发环境部署完成!"
    log_info "启动开发服务器:"
    log_info "  后端: cd backend && npm run dev"
    log_info "  前端: cd frontend && npm run dev"
fi

# 8. 显示后续步骤
log_info "部署后检查清单:"
echo "  □ 检查服务是否正常运行"
echo "  □ 检查数据库连接"
echo "  □ 检查文件上传功能"
echo "  □ 检查前端页面加载"
echo "  □ 测试登录功能 (admin/admin123456)"

if [ "$ENVIRONMENT" = "prod" ]; then
    echo "  □ 配置 Nginx 反向代理"
    echo "  □ 设置 SSL 证书"
    echo "  □ 配置域名解析"
    echo "  □ 设置防火墙规则"
fi

log_info "部署完成! 🎉"