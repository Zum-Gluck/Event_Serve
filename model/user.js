const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 19,
  },
  mobile: {
    type: Number,
    require: true,
  },
  role: {
    // 0为村民 1为村长
    type: Number,
    default: 0
  }
})

const User = mongoose.model('user', userSchema);

// User.create({
//   username: 'fj',
//   password: '1234567',
//   mobile: 17637543547
// }).then(res => {
//   console.log("插入文档成功");
// }).catch(err => {
//   console.log(err);
// })

module.exports = {
  User
}