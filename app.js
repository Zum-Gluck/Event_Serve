const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// 连接数据库
require("./model/connect")
require("./model/user")

const api = require("./api");
app.use('/api', api);

app.listen(3000);
console.log("服务器创建成功，请访问http://localhost:3000");