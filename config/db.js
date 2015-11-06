//File Name: ./config/db.js
module.exports = {
  connection    : {
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    password    : process.env.DB_PASS,
    database    : process.env.DB_NAME,
    port        : 8889
  },
  users_table : 'user'
};
