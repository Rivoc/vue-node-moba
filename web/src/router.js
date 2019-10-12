import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Home from './views/Home.vue'

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
        }
      ]
    }
  ]
})
