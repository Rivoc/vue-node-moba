//定义category模型
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: { type: String },
  //上parent与分类模块建立关系
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }//不能是String
})
//设置虚拟属性，并不存在于数据库中，只是从数据库中提取的数据的整合
//查找大类的子分类
schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})
//通过子分类查找分类对应的新闻数据
schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'Categories',//Article模型中的Categories关联着Category模型中的id
  justOne: false,
  ref: 'Article'
})

module.exports = mongoose.model('Category', schema)