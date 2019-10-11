//定义Article模型
const mongoose = require('mongoose')
const schema = new mongoose.Schema({

  title: { type: String },
  //分类有多个，所以是个数组，关联Category模型
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  body:{type:String},


})
module.exports = mongoose.model('Article', schema)