const express = require("express");
const { User } = require("../model/user");
const { Event } = require("../model/event");
const api = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");
const { writeFileRecursive } = require("../Tools/writeFileRecursive")
var fs = require("fs");


api.post("/registered", (req, res) => {
  // 将用户输入的信息解构
  let { username, password, mobile } = req.body

  if (username && password && mobile) {
    User.create({
      username,
      password,
      mobile
    })
    res.send('注册成功')
  } else {
    res.status(400).send('注册失败')
  }
})

api.post("/login", async (req, res) => {
  // 将用户输入的信息解构
  let { password, mobile } = req.body
  let result = await User.findOne({
    mobile
  })

  if (result.password == password) {
    const token = jwt.sign({ mobile }, "yyjkn");
    res.send({ msg: "登录成功", token, status: 200 })
  } else {
    res.send({ msg: "账号或密码错误", status: 400 });
  }
})

api.post('/auth', async (req, res) => {
  const token = req.headers.authorization.split(" ").pop()
  const { mobile } = jwt.verify(token, "yyjkn");

  let result = await User.findOne({ mobile })
  res.send(result)
})

api.post("/event", (req, res) => {
  if (!req.body) return
  let { uname, description, tel, level, content, id, fileList, fileName } = req.body
  
  if (fileList) {
    fileList.forEach((item, index) => {  //处理图片
      let s = item.content;
      let arr = s.split(",")
      let buffer = Buffer.from(arr[1], 'base64');
      // 存放图片的路径
      let distPath = "./Temp/" + fileName[index]
      writeFileRecursive(distPath, buffer, function (err) {
        if (err) return console.log(err);
        console.log("Success");
      })
    })
  }

  Event.create({
    uname,
    description,
    tel,
    level,
    content,
    user: id
  }).then(doc => {
    console.log("插入文档成功");
    res.send({
      msg: "发布成功",
      status: 200
    })
  }).catch(err => {
    console.log(err);
    res.send({
      msg: '发布失败',
      status: 400
    });
  })
})

api.get('/event', async (req, res) => {
  let id = req.query.id
  let result = await Event.find({ user: id })
  res.send(result)
})
module.exports = api

var fs = require('fs');

