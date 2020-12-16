const express = require("express");
const { User } = require("../model/user");
const api = express.Router();
const jwt = require("jsonwebtoken");

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
  ``
  let result = await User.findOne({ mobile })
  res.send(result)
})
module.exports = api