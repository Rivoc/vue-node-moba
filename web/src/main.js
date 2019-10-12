import Vue from 'vue'
import App from './App.vue'
import './reset.styl'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './assets/css/iconfont.css'
import Card from './components/Card'
Vue.component('m-card', Card)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


