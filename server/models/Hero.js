//定义Hero模型
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: { type: String },
  //数据库不是直接保存图片(一个图片几兆)，而是将图片上传到一个地址，数据库保存的是图片的地址
  avatar: { type: String },
  //英雄称号
  title: { type: String },
  //一个英雄可能关联多个分类
  //ref:关联的模型的名称
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  //打分，有难度、技能、攻击、生存四个指标
  //使用对象取，用数组取要用下标，比较复杂
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  skills: [
    {
      icon: { type: String },
      name: { type: String },
      description: { type: String },
      tips: { type: String }
    }
  ],
  //顺风/逆风装备，装备物品在Item数据库中
  //顺风是1，逆风是2
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
  //使用技巧
  usageTips: { type: String },
  //战斗技巧
  battleTips: { type: String },
  //团战思路
  teamTips: { type: String },


  //英雄关系-最佳搭档
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }]
})
module.exports = mongoose.model('Hero', schema)