//定义Ad模型
const mongoose = require('mongoose')
const schema = new mongoose.Schema({

  name: { type: String },
  //分类有多个，所以是个数组，关联Category模型
  items:[{
    image:{type:String},
    url:{type:String}
  }]


})
module.exports = mongoose.model('Ad', schema)