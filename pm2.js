const pm2 = require('pm2');

console.log(process.env.SERVER_NODE_ENV);

pm2.connect(function(err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  pm2.start(
    {
      name:'upblog',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: './docs/.vuepress/dist',
        PM2_SERVE_PORT: 3077
      }
    },
    (err, apps) => {
      pm2.disconnect();
      if (err) {
        throw err;
      }
    },
  );
});
