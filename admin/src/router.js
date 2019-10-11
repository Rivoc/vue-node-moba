import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList'
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList'
import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/categories/create',
          component: CategoryEdit
        },
        {
          path: '/categories/list',
          component: CategoryList
        },
        {
          //把变量id注入到CategoryEdit组件中，组件通过props接收,这样做的好处是页面可以和路由尽可能地解耦
          path: '/categories/edit/:id',
          component: CategoryEdit,
          props: true
        },



        {
          path: '/items/create',
          component: ItemEdit
        },
        {
          path: '/items/list',
          component: ItemList
        },
        {
          //把变量id注入到CategoryEdit组件中，组件通过props接收,这样做的好处是页面可以和路由尽可能地解耦
          path: '/items/edit/:id',
          component: ItemEdit,
          props: true
        },

        {
          path: '/heroes/create',
          component: HeroEdit
        },
        {
          path: '/heroes/list',
          component: HeroList
        },
        {
          //把变量id注入到CategoryEdit组件中，组件通过props接收,这样做的好处是页面可以和路由尽可能地解耦
          path: '/heroes/edit/:id',
          component: HeroEdit,
          props: true
        }


      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
