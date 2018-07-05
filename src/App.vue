<template>
  <el-container class="app-wrapper" >
    <el-header>
      <el-menu mode="horizontal" :default-active="activeIndex">     
        <el-menu-item index="0">
          <router-link to="/introduce"><img :src="logoUrl" height="80%"></router-link>
        </el-menu-item>

        <el-menu-item index="1">
          <router-link to="/text-choose">选择课文</router-link>
        </el-menu-item>

        <el-menu-item index="2">
          <router-link to="/personal-recording">个人录音</router-link>
        </el-menu-item>

        <el-menu-item index="3" v-show="isAdmin">
          <router-link to="/upload-text" >上传(待上线)</router-link>
        </el-menu-item>

        <el-menu-item index="4" v-show="isAdmin">
          <router-link to="/student-manage" >学员信息管理</router-link>
        </el-menu-item>

        <el-menu-item index="5" v-show="isAdmin">
          <router-link to="/apply-info" >申请信息管理</router-link>
        </el-menu-item>

        <el-menu-item index="6">
          <a @click="logout">注销</a>
        </el-menu-item>

        <div class="menu-right">
          {{userTip}}
        </div>
      </el-menu>
      
    </el-header>
  	<el-container>
	    <el-main>
         <router-view></router-view>
      </el-main>
	  </el-container>
  </el-container>
</template>

<script>
import TextPage from './components/TextPage.vue'
import TextChoose from './components/TextChoose.vue'
import PersonalRecording from './components/PersonalRecording.vue'
import PersonalRecordingPage from './components/PersonalRecordingPage.vue'
import UploadText from './components/UploadText.vue'
import Introduce from './components/Introduce.vue'
import StudentManage from './components/StudentManage.vue'
import ApplyInfo from './components/ApplyInfo.vue'

export default {
  name: 'App',
  data:function(){
    return{
      activeIndex:'0',
      logoUrl: '/static/logo.png',
    }
  },
  computed:{
    userTip:function(){
      if(this.$store.getters.user){
        return ('你好,' + this.$store.getters.user);
      }
      else{
        return '';
      }
    },
    isAdmin:function(){
      if(this.$store.getters.user === 'admin'){
        return true;
      }
      return false;
    }
  },
  components:{
    'textPage': TextPage,
    'textChoose': TextChoose,
    'personalRecording': PersonalRecording,
    'personalRecordingPage': PersonalRecordingPage,
    'uploadText': UploadText,
    'introduce': Introduce,
    'studentManage': StudentManage ,
    'apply-info': ApplyInfo
  },
  methods:{
    logout:function(){
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    checkLogin:function(){
      if((!this.$store.getters.user) && (this.$route.name!='apply') && (this.$route.name!='introduce')){ 
        this.$router.push('/login');
      }
    }
  },
  created() {
    this.$router.push('/introduce');
    this.checkLogin();
  },
  watch:{
    "$route" : 'checkLogin'
  },
}
</script>


<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  .menu-right{
    position: absolute;
    right:2%;
  }

	.app-wrapper {
	  position: absolute;
	  top: 0px;
	  bottom: 0px;
	  left: 0px;
	  width: 100%;
	}
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .router-link-active {
  color: #000;
  font-weight: bold;
  }

  .el-main{
    padding-top: 0;
  }
</style>