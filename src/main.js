import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Paginate from 'vuejs-paginate'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles/app.scss'

Vue.use(BootstrapVue);

Vue.component('paginate', Paginate)

new Vue({
  el: '#app',
  render: h => h(App)
})
