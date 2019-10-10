//定义category模型
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }//不能是String
})
module.exports = mongoose.model('Category', schema)