module.exports = {
  apps : [{
	name: "wunder_n3_back",
    script: 'dist/main.js',
  }],

  deploy : {
    production : {
      user : 'root',
      host : '45.90.32.200',
      ref  : 'origin/main',
      repo : 'git@github.com:BlackCezar/wunder_back_n3.git',
      path : '/var/apps/wunder_n3/back',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    }
  }
};
