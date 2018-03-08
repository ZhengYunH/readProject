<template>
  <el-container class="wrapper">
    <el-header>
      Header
      <a @click="logout">注销</a>
    </el-header>
  	<el-container>
	    <el-aside width="200px">
        <el-menu>
          <el-menu-item index="1">
            <router-link to="/text-choose">选择课文</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/personal-recording">个人录音</router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
	    <el-main>
         <router-view ></router-view>
      </el-main>
	  </el-container>
  </el-container>
</template>

<script>
import TextPage from './components/TextPage.vue'
import TextChoose from './components/TextChoose.vue'
import PersonalRecording from './components/PersonalRecording.vue'
import PersonalRecordingPage from './components/PersonalRecordingPage.vue'

export default {
  name: 'App',
  components:{
    'textPage': TextPage,
    'textChoose': TextChoose,
    'personalRecording': PersonalRecording,
    'personalRecordingPage': PersonalRecordingPage
  },
  methods:{
    logout:function(){
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    checkLogin:function(){
      if(!this.$store.getters.user){
        this.$message('请先登录');
        this.$router.push('/login');
      }
    }
  },
  created() {
    //this.checkLogin();
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
  
	.wrapper {
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
  
  .el-aside {
    color: #333;
  }
</style>