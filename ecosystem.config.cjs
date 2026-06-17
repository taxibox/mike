module.exports = {
  apps: [
    {
      name: 'mike-backend',
      script: 'backend/dist/index.js',
      cwd: '/var/www/mike',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'mike-frontend',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/mike/frontend',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
