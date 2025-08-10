module.exports = {
    apps: [
      {
        name: 'globe-hub-backend',
        script: 'server.js',
        env: {
          PORT: 5000,
          DB_HOST: 'tourismdb.c7yuw0kceh7i.ap-south-1.rds.amazonaws.com',
          DB_USER: 'admin',
          DB_PASS: 'Make12Admin',
          DB_NAME: 'tourismdb',
          DB_PORT: 3306,
        }
      }
    ]
  }
  