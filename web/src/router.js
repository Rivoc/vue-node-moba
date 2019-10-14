import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Home from './views/Home.vue'
import Article from './views/Article.vue'
import Hero from './views/Hero.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,//主界面框架
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home //首页
        },
        {
          path: '/articles/:id',
          name: 'article',
          component: Article,
          props: true
        }
      ]
    },
    {
      path: '/heroes/:id',
      name: 'hero',
      component: Hero,
      props: true
    }
  ]
})
