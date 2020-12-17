const fs = require("fs")

const writeFileRecursive = function (path, buffer, callback) {
  // 去掉文件名称 只获取路径
  let lastPath = path.substring(0, path.lastIndexOf('/'));
  fs.mkdir(lastPath, { recursive: true }, (err) => {
    if (err) return callback(err)
    fs.writeFile(path, buffer, (err) => {
      if (err) return callback(err)
      return callback(null)
    })
  })
}

module.exports = {
  writeFileRecursive
}
