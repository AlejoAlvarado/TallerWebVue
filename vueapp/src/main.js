import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home';
import vuetify from './plugins/vuetify';
import User from './components/User'
import Dependency from './components/Dependency'
import Users from './components/Users'
import Dependencies from './components/Dependencies'
import store from '../src/store'




const routes =[
  {
    path: '/',
    component: Home,   

  },
  {
    path: '/user',
    component: User,   

  },
  {
    path: '/dependency',
    component: Dependency,   

  },
  {
    path: '/users',
    component: Users,   

  },
  {
    path: '/dependencies',
    component: Dependencies,   

  },
 
]

Vue.config.productionTip = false
Vue.use(VueRouter);
const router = new VueRouter({routes})
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
