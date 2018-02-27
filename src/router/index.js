import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import textChoose from '../components/TextChoose.vue'
import textPage from '../components/TextPage.vue'

export default new Router({
  routes: [
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
