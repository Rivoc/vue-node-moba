//定义Article模型
const mongoose = require('mongoose')
const schema = new mongoose.Schema({

  title: { type: String },
  //分类有多个，所以是个数组，categories关联着Category模型中的id
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  body: { type: String },
  related: { type: Array }
},
  { timestamps: true }//带上时间戳

)
module.exports = mongoose.model('Article', schema)