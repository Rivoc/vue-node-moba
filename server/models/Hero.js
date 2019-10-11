//定义Hero模型
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: { type: String },
  //数据库不是直接保存图片(一个图片几兆)，而是将图片上传到一个地址，数据库保存的是图片的地址
  avatar: { type: String }
})
module.exports = mongoose.model('Hero', schema)