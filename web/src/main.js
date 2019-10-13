import Vue from 'vue'
import App from './App.vue'
import './reset.styl'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './assets/css/iconfont.css'
import Card from './components/Card'
import ListCard from './components/ListCard'
import axios from 'axios'
Vue.component('m-card', Card)
Vue.component('m-list-card', ListCard)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


