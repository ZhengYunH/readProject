import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import login from '../components/Login.vue'
import textChoose from '../components/TextChoose.vue'
import textPage from '../components/TextPage.vue'
import personalRecording from '../components/PersonalRecording.vue'
import personalRecordingPage from '../components/PersonalRecordingPage.vue'
import uploadText from '../components/UploadText.vue'
import introduce from '../components/Introduce.vue'
import studentManage from '../components/StudentManage.vue'
import apply from '../components/Apply.vue'
import applyInfo from '../components/ApplyInfo.vue'

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
       title: '登录'
      },
      hidden: true
    },

    {
      path: '/text-choose',
      name: 'textChoose',
      component: textChoose,
      meta: {
       title: '选择课文'
      },
    },
    
    {
    	path: '/text-page',
      name: 'textPage',
      component: textPage,
      meta: {
       title: '芝麻街英语'
      }
    },

    {
      path:'/personal-recording',
      name:'personalRecording',
      component: personalRecording,
      meta: {
       title: '个人录音'
      }
    },

    {
      path:'/personal-recording-page',
      name:'personalRecordingPage',
      component: personalRecordingPage,
      meta: {
       title: '芝麻街英语'
      }
    },
    {
      path:'/upload-text',
      name:'uploadText',
      component: uploadText,
      meta: {
       title: '上传课文'
      }
    },
    {
      path:'/introduce',
      name:'introduce',
      meta: {
       title: '芝麻街英语'
      },
      component: introduce
    },
    {
      path:'/student-manage',
      name:'studentManage',
      component:studentManage,
      meta: {
       title: '学生管理'
      }
    },
    {
      path:'/apply',
      name:'apply',
      component:apply,
      meta: {
       title: '注册'
      },
      hidden: true
    },
    {
      path:'/apply-info',
      name:'applyInfo',
      component:applyInfo,
      meta: {
       title: '查看注册信息'
      },
    },
  ]
})
