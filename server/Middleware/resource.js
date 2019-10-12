module.exports = (options) => {
  return async (req, res, next) => {
    //小写复数转大写单数
    const modelName = require('inflection').classify(req.params.resource)
    //将model挂载到req上，注意这里的路径
    req.Model = require(`../models/${modelName}`)
    next()
  }
}
