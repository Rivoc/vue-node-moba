import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList'
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList'
import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList'
import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList'
import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList'
import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList'
import Login from './views/Login'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login', name: 'login', component: Login,
      meta: { isPublic: true }
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        //分类路由
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


        //物品(装备）路由
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


        //英雄编辑路由
        {
          path: '/heroes/create',
          component: HeroEdit
        },
        {
          path: '/heroes/list',
          component: HeroList
        },

        {
          path: '/heroes/edit/:id',
          component: HeroEdit,
          props: true
        },


        //文章路由
        {
          path: '/articles/create',
          component: ArticleEdit
        },
        {
          path: '/articles/list',
          component: ArticleList
        },
        {

          path: '/articles/edit/:id',
          component: ArticleEdit,
          props: true
        },



        //广告路由
        {
          path: '/ads/create',
          component: AdEdit
        },
        {
          path: '/ads/list',
          component: AdList
        },
        {

          path: '/ads/edit/:id',
          component: AdEdit,
          props: true
        },



        //管理员路由
        {
          path: '/admin_users/create',
          component: AdminUserEdit
        },
        {
          path: '/admin_users/list',
          component: AdminUserList
        },
        {

          path: '/admin_users/edit/:id',
          component: AdminUserEdit,
          props: true
        },


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

router.beforeEach((to, from, next) => {
  //如果没带token要跳转到需要token的页面，就跳转到登录页面
  if (!to.meta.isPublic && !localStorage.token) {
    Vue.prototype.$message.error('请先登录')
    return next('/login')
  }
  next()
})
export default router