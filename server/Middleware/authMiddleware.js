//用函数包起来让中间件可配置
module.exports = options => {
  return async (req, res, next) => {
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    //校验用户是否登录
    //提取token,首先将token转为字符串，用空格分割字符串，然后抛出最后一项，即token
    // const token = String(req.headers.Authorization || '').split(' ').pop()

    const token = String(req.headers.authorization || '')


    //找到用户
    assert(token, 401, '请提供jwt token')
    //req自带app对象
    const { id } = jwt.verify(token, req.app.get('secret'))

    //挂载到req上
    assert(id, 401, '无效的jwt token')
    req.user = await AdminUser.findById(id)
    //如果token不存在，解析id不存在，根据id找到的用户也不存在，就返回错误
    assert(req.user, 401, '请先登录')
    await next()

  }
}