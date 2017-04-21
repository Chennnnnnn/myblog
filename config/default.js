module.exports = {
  port: 3000, //端口3000
  session: {                   //express-session的配置信息
    secret: 'myblog', 
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/myblog'      //mongodb的地址
};














