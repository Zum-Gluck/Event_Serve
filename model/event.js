const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  uname: {
    type: String,
    min: 2,
    max: 10,
  },
  description: {
    type: String
  },
  tel: {
    type: Number
  },
  level: { // 1紧急 2正常 3一般
    type: String,
    default: "3"
  },
  content: {
    type: String
  },
  status: { // 1为处理完成  2为处理中  3为未处理
    type: Number,
    default: "3"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  timer: {
    type: Date,
    default: Date.now
  }
})

const Event = mongoose.model('event', EventSchema);

// Event.create({
//   uname: '冯崛',
//   address: '平顶山',
//   tel: 150,
//   level :"3",
//   content:'1231哈哈',
//   user:'5fd982680b1e6963ace1359b'
// }).then(res => {
//   console.log("插入文档成功");
// }).catch(err => {
//   console.log(err);
// })

module.exports = {
  Event
}