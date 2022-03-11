module.exports = {
  apps: [
    {
      name: 'nestjs-template-http',
      script: 'dist/main.js',
      args: '',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '4G',
      env: {
        NODE_ENV: 'production',
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      output: '/data/logs/nestjs-template-http/pm2-out.log',
      error: '/data/logs/nestjs-template-http/pm2-error.log',
    },
  ],
};
