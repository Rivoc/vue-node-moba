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
}

