module.exports = app => {
  const router = require('express').Router()
  const Article = require('../../models/Article')
  const Hero = require('../../models/Hero')
  const Category = require('../../models/Category')

  app.use('/web/api', router)

  //新闻列表接口
  router.get('/news/list', async (req, res) => {
    // // 先找每个板块的大类
    // const parent = await Category.findOne({ name: "新闻分类" }).populate({
    //   path: 'children',//关联了children,可以得到每个大类的子分类
    //   populate: {
    //     path: 'newsList'//关联了children的newsList，可以得到每个子分类的新闻
    //   }
    // }).lean()//lean显示关联数据


    //得到新闻分类（大类）
    const parent = await Category.findOne({ name: "新闻分类" })
    //聚合查询（使用管道方式）,目的是把小分类和它对应的新闻数据查出来
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },//过滤数据(过滤掉大类，得到大类里的小分类)
      //再接个管道,连表查询，目的是查出小分类对应的新闻数据
      {
        $lookup: {
          from: 'articles',//要关联的表,这里要把表名小写复数化
          localField: '_id',//主表的字段（当前collection中要连接的字段）
          foreignField: 'categories',//关联表的字段(关联colletion中连接查询的字段)
          as: 'newsList'//存储的字段（把获取到的值赋值给这个字段)
        }
      },
      // $addFields 把newsList字段添加到查询结果里
      {
        $addFields: {
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])
    const subCats = cats.map(v => v._id)//把每个子分类的id取出来[](4个)
    //在数组第一项前新增热门一项
    //$in查出一个键的多个值用[]表示
    //热门里调的数据是不限制分类的总数据
    //用populate是为了查到分类的名称

    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats[3] }//
      }).populate('categories').limit(5).lean()
    })

    //每条数据可能属于多个分类，但除了热门下的数据不显示热门分类，显示本来的分类外，其他的数据在哪个分类下就显示是哪个分类
    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(cats)
  })



  //英雄列表接口
  router.get('/heroes/list', async (req, res) => {
    const parent = await Category.findOne({ name: "英雄分类" })
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },//先查到所有parent字段属于英雄分类的数据(子分类)
      //子分类关联查询得到英雄列表
      {
        $lookup: {
          from: 'heros',
          localField: '_id',
          foreignField: 'categories',
          as: 'heroList'
        }
      }

    ])
    //子分类id
    const subCats = cats.map(v => v._id)
    //插入热门英雄分类
    cats.unshift({
      name: '热门',
      heroList: await Hero.find().where({
        categories: { $in: subCats }
      }).limit(10).lean()
    })


    cats.map(cat => {
      cat.heroList.map(hero => {
        hero.categoryName = cat.name === '热门' ? hero.categories[0].name : cat.name
        return hero
      })
      return cat
    })
    res.send(cats)
  })



  //文章详情接口
  router.get('/articles/:id', async (req, res) => {
    const data = await Article.findById(req.params.id)
    //文章相关链接，找2条同类型的文章显示在文章底部
    data.related = await Article.find().where({
      categories: { $in: data.categories }
    }).limit(2)
    res.send(data)


  })

}