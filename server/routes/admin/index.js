//admin用到的所有api
module.exports = app => {

  const express = require('express')
  //定义子路由,这个子路由有增删改查各种方法
  const router = express.Router({
    mergeParams: true
  })
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  // const assert = require('http-assert')
  //token校验中间件，权限验证
  const authMiddleware = require('../../Middleware/authMiddleware')()
  //资源中间件，用来查找并引入模型
  const resource = require('../../Middleware/resource')()



  //资源路由，加了两个中间件，先看用户是否存在，再看模型是否存在，最后挂载路由
  app.use('/admin/api/rest/:resource',
    authMiddleware,
    resource,
    router)//挂载子路由

  // 定义新增资源api
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  //定义修改资源api
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  //定义删除资源api
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  //定义获取列表资源api
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })



  //定义详情资源api
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })



  //定义图片上传接口
  //引入multer包
  const multer = require('multer')
  //muter接收一个options对象，dest属性告诉multer要将上传文件保存在哪
  const upload = multer({ dest: __dirname + '/../../uploads' })
  //.single方法表示处理单个文件上传，single(fieldname)表示接受一个以 fieldname 命名的文件。这个文件的信息保存在 req.file。
  app.post('/admin/api/upload', authMiddleware, upload.single('file'), async (req, res) => {
    const file = req.file//本身req没有file,是用upload中间件使file挂载到req上，req.file就是file文件的信息
    //构造图片的url,返回给前端用于展示图片
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })



  //定义登录接口,进行校验
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    //根据用户名找用户(因为密码被散列，只能通过用户名找)

    //查找条件用{key:value}表示
    //因为数据库中的密码设置了不允许查询，所以这里要特别查询出来
    const user = await AdminUser.findOne({ username }).select('+password')
    // assert(user, res.status(422), '用户不存在')
    if (!user) {
      res.status(422).send({
        message: '用户不存在'
      })
    }
    //校验密码
    //compareSync返回布尔值
    const isValid = require('bcrypt').compareSync(password, user.password)
    // assert(isValid, res.status(422), '密码错误')
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
    //返回token

    const token = jwt.sign({
      id: user._id,
    }, app.get('secret'))

    res.send({ token })


  })

  //错误处理函数
  // assert粗暴的抛出了异常，捕获这个异常，然后把错误信息已json的形式发给后端
  app.use(async (err, req, res, next) => {
    //捕获所有异常，可能没有状态码
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}



