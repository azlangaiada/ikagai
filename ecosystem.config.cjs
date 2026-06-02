// PM2 ecosystem for ikagAI (ikagai.online). Each app reads packages/<app>/.env at runtime.
// Do NOT put secrets in this file — it is committed to git.
module.exports = {
  apps: [
    {
      name: 'ikagai-cms',
      cwd: './packages/cms',
      script: 'node_modules/.bin/next',
      args: 'start -p 4010',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--no-deprecation',
      },
    },
    {
      name: 'ikagai-web',
      cwd: './packages/web',
      script: 'node_modules/.bin/tsx',
      args: 'server.ts',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
        PORT: 3010,
      },
    },
  ],
}
