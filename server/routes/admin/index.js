//admin用到的所有api
module.exports = app => {
  const express = require('express')
  //定义子路由,这个子路由有增删改查各种方法
  const router = express.Router({
    mergeParams: true
  })
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    //小写复数转大写单数
    const modelName = require('inflection').classify(req.params.resource)
    //将model挂载到req上
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)//挂载子路由

  // 定义新增分类api
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  //定义修改分类api
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //定义删除分类api
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  //定义分类列表api
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    //parent本是一个普通的id字符串，但在建模的时候将parent做了关联
    //所以用populate方法便可查到parent id对应的那一行数据的所有信息

    res.send(items)
  })
  //定义分类详情api
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
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file//本身req没有file,是用upload中间件使file挂载到req上，req.file就是file文件的信息
    //构造图片的url,返回给前端用于展示图片
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })


  //定义登录接口,进行校验
  app.post('admin/api/login', async (req, res) => {
    const { username, password } = req.body
    //根据用户名找用户(因为密码被散列，只能通过用户名找)
    const AdminUser = require('../../models/AdminUser')
    //查找条件用{key:value}表示
    //因为数据库中的密码设置了不允许查询，所以这里要特别查询出来
    const user = await AdminUser.findOne({ username }).select('+password')
    if (!user) {
      res.status(422).send({
        message: '用户不存在'
      })
    }
    //校验密码
    //compareSync返回布尔值
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
    //返回token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({
      id: user._id,
    }, app.get('secret'))

    res.send(token)
  })
}

