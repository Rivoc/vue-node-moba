//admin用到的所有api
module.exports = app => {
  const express = require('express')
  //定义子路由,这个子路由有增删改查各种方法
  const router = express.Router()

  const Category = require('../../models/Category')
  app.use('/admin/api', router)//挂载子路由

  // 定义新增分类api
  router.post('/categories', async (req, res) => {

    const model = await Category.create(req.body)
    res.send(model)
  })
  //定义修改分类api
  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //定义删除分类api
  router.delete('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
  //定义分类列表api
  router.get('/categories', async (req, res) => {
    const items = await Category.find().populate('parent').limit(10)
    //parent本是一个普通的id字符串，但在建模的时候将parent做了关联
    //所以用populate方法便可查到parent id对应的那一行数据的所有信息

    res.send(items)
  })
  //定义分类详情api
  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })
}

