const express = require('express')
const app = express()


app.use(express.json())//解析请求体
app.use(require('cors')())
app.listen(3000, () => {
  console.log('正在监听')
})
//引入admin下的index.js
require('./routes/admin')(app)
//引入mongoDB数据库
require('./plugins/db')(app)