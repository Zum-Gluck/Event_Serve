const express = require("express");
const { User } = require("../model/user");
const api = express.Router();

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
    res.send('登录成功')
  } else {
    res.status(400).send('账号密码错误');
  }
})

module.exports = api