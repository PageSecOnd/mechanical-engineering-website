module.exports = {
  apps: [
    {
      name: 'mechanical-engineering-backend',
      script: './backend/dist/server.js',
      cwd: '/path/to/your/project',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
        MONGODB_URI: 'mongodb://localhost:27017/mechanical-engineering',
        JWT_SECRET: 'your-production-jwt-secret-key',
        JWT_EXPIRES_IN: '7d',
        UPLOAD_PATH: './uploads',
        MAX_FILE_SIZE: '5242880',
        RATE_LIMIT_WINDOW_MS: '900000',
        RATE_LIMIT_MAX_REQUESTS: '100',
        FRONTEND_URL: 'http://your-domain.com',
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true
    },
    {
      name: 'mechanical-engineering-frontend',
      script: 'npm',
      args: 'start',
      cwd: '/path/to/your/project/frontend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_API_URL: 'http://localhost:5000/api',
        NEXT_PUBLIC_SITE_URL: 'http://your-domain.com'
      },
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      log_file: './logs/frontend-combined.log',
      time: true
    }
  ],

  deploy: {
    production: {
      user: 'deploy',
      host: 'your-server-ip',
      ref: 'origin/main',
      repo: 'git@github.com:PageSecOnd/mechanical-engineering-website.git',
      path: '/var/www/mechanical-engineering-website',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};