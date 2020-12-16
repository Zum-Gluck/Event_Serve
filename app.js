const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// 连接数据库
require("./model/connect")
require("./model/user")

// 跨域资源
app.use("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //*号代表所有都跨域访问
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//配置路由
const api = require("./api");
app.use('/api', api);

app.listen(3000);
console.log("服务器创建成功，请访问http://localhost:3000");