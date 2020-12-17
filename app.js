const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();

app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({ limit:'100mb', extended: true }));
// 连接数据库
require("./model/connect")
require("./model/user")
require("./model/event")

app.use(cors())

//配置路由
const api = require("./api");
app.use('/api', api);

app.listen(3000);
console.log("服务器创建成功，请访问http://localhost:3000");