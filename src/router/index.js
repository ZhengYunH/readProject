import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '../components/Login.vue'
import textChoose from '../components/TextChoose.vue'
import textPage from '../components/TextPage.vue'
import personalRecording from '../components/PersonalRecording.vue'
import personalRecordingPage from '../components/PersonalRecordingPage.vue'
import uploadText from '../components/UploadText.vue'
import introduce from '../components/Introduce.vue'
import studentManage from '../components/StudentManage.vue'

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
    },

    {
      path:'/personal-recording',
      name:'personalRecording',
      component: personalRecording
    },

    {
      path:'/personal-recording-page',
      name:'personalRecordingPage',
      component: personalRecordingPage
    },
    {
      path:'/upload-text',
      name:'uploadText',
      component: uploadText
    },
    {
      path:'/introduce',
      name:'introduce',
      component: introduce
    },
    {
      path:'/student-manage',
      name:'studentManage',
      component:studentManage
    }
  ]
})
