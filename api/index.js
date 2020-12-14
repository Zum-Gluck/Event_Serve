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
    res.status(200).send('注册失败')
  }
})

module.exports = api