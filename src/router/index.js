import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '../components/Login.vue'
import textChoose from '../components/TextChoose.vue'
import textPage from '../components/TextPage.vue'


export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      hidden: true
    },

    {
      path: '/text-choose',
      name: 'textChoose',
      component: textChoose
    },
    
    {
    	path: '/text-page',
      name: 'textPage',
      component: textPage
    }
  ]
})
