#!/bin/bash

# 服务器安装脚本 - 为机械工程网站准备服务器环境
# 支持 Ubuntu 20.04/22.04 和 CentOS 7/8

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# 检测操作系统
detect_os() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        OS=$NAME
        VER=$VERSION_ID
    else
        log_error "无法检测操作系统"
        exit 1
    fi
    
    log_info "检测到操作系统: $OS $VER"
}

# 安装 Node.js 18
install_nodejs() {
    log_step "安装 Node.js 18..."
    
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        log_info "Node.js 已安装: $NODE_VERSION"
        return
    fi
    
    if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
        curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
        sudo yum install -y nodejs
    fi
    
    log_info "Node.js 安装完成: $(node --version)"
}

# 安装 MongoDB
install_mongodb() {
    log_step "安装 MongoDB..."
    
    if command -v mongod &> /dev/null; then
        log_info "MongoDB 已安装"
        return
    fi
    
    if [[ "$OS" == *"Ubuntu"* ]]; then
        wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
        sudo apt-get update
        sudo apt-get install -y mongodb-org
        
        # 启动并启用 MongoDB
        sudo systemctl start mongod
        sudo systemctl enable mongod
    elif [[ "$OS" == *"CentOS"* ]]; then
        cat > /etc/yum.repos.d/mongodb-org-6.0.repo << 'EOF'
[mongodb-org-6.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/6.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-6.0.asc
EOF
        sudo yum install -y mongodb-org
        
        # 启动并启用 MongoDB
        sudo systemctl start mongod
        sudo systemctl enable mongod
    fi
    
    log_info "MongoDB 安装完成"
}

# 安装 Nginx
install_nginx() {
    log_step "安装 Nginx..."
    
    if command -v nginx &> /dev/null; then
        log_info "Nginx 已安装"
        return
    fi
    
    if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
        sudo apt-get update
        sudo apt-get install -y nginx
    elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
        sudo yum install -y nginx
    fi
    
    # 启动并启用 Nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
    
    log_info "Nginx 安装完成"
}

# 安装 PM2
install_pm2() {
    log_step "安装 PM2..."
    
    if command -v pm2 &> /dev/null; then
        log_info "PM2 已安装"
        return
    fi
    
    sudo npm install -g pm2
    
    # 设置 PM2 开机启动
    sudo pm2 startup
    
    log_info "PM2 安装完成"
}

# 创建部署用户
create_deploy_user() {
    log_step "创建部署用户..."
    
    if id "deploy" &>/dev/null; then
        log_info "用户 deploy 已存在"
        return
    fi
    
    sudo adduser --disabled-password --gecos "" deploy
    sudo usermod -aG sudo deploy
    
    # 创建项目目录
    sudo mkdir -p /var/www/mechanical-engineering-website
    sudo chown deploy:deploy /var/www/mechanical-engineering-website
    
    log_info "部署用户创建完成"
}

# 配置防火墙
setup_firewall() {
    log_step "配置防火墙..."
    
    if [[ "$OS" == *"Ubuntu"* ]]; then
        sudo ufw allow 22
        sudo ufw allow 80
        sudo ufw allow 443
        sudo ufw --force enable
    elif [[ "$OS" == *"CentOS"* ]]; then
        sudo firewall-cmd --permanent --add-service=ssh
        sudo firewall-cmd --permanent --add-service=http
        sudo firewall-cmd --permanent --add-service=https
        sudo firewall-cmd --reload
    fi
    
    log_info "防火墙配置完成"
}

# 安装 SSL 证书工具
install_certbot() {
    log_step "安装 Certbot (Let's Encrypt)..."
    
    if command -v certbot &> /dev/null; then
        log_info "Certbot 已安装"
        return
    fi
    
    if [[ "$OS" == *"Ubuntu"* ]]; then
        sudo apt-get install -y certbot python3-certbot-nginx
    elif [[ "$OS" == *"CentOS"* ]]; then
        sudo yum install -y certbot python3-certbot-nginx
    fi
    
    log_info "Certbot 安装完成"
}

# 主函数
main() {
    log_info "开始服务器环境安装..."
    
    # 检测操作系统
    detect_os
    
    # 更新系统包
    log_step "更新系统包..."
    if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
        sudo apt-get update
        sudo apt-get upgrade -y
        sudo apt-get install -y curl wget git build-essential
    elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
        sudo yum update -y
        sudo yum groupinstall -y "Development Tools"
        sudo yum install -y curl wget git
    fi
    
    # 安装各组件
    install_nodejs
    install_mongodb
    install_nginx
    install_pm2
    create_deploy_user
    setup_firewall
    install_certbot
    
    log_info "服务器环境安装完成! 🎉"
    echo ""
    log_info "接下来的步骤:"
    echo "1. 切换到 deploy 用户: sudo su - deploy"
    echo "2. 克隆项目: git clone <repository-url> /var/www/mechanical-engineering-website"
    echo "3. 运行部署脚本: cd /var/www/mechanical-engineering-website && ./scripts/deploy.sh prod"
    echo "4. 配置 Nginx: sudo cp nginx.conf /etc/nginx/sites-available/mechanical-engineering"
    echo "5. 启用站点: sudo ln -s /etc/nginx/sites-available/mechanical-engineering /etc/nginx/sites-enabled/"
    echo "6. 测试 Nginx 配置: sudo nginx -t"
    echo "7. 重启 Nginx: sudo systemctl restart nginx"
    echo "8. 申请 SSL 证书: sudo certbot --nginx -d your-domain.com"
}

# 检查是否为 root 用户
if [[ $EUID -ne 0 ]]; then
   log_error "此脚本需要 root 权限运行"
   echo "请使用: sudo $0"
   exit 1
fi

main "$@"