const express = require('express')
const app = express()

app.set('secret', 'asdsadasd')
app.use(express.json())//解析请求体
app.use(require('cors')())//解决跨域
app.use('/uploads', express.static(__dirname + '/uploads'))//静态资源托管，让upload路径下的文件都可以被访问到
app.listen(3000, () => {
  console.log('正在监听')
})
//引入admin下的index.js
require('./routes/admin')(app)
//引入mongoDB数据库
require('./plugins/db')(app)