<template>
  <el-container class="wrapper">
    <el-header>Header</el-header>
  	<el-container>
	    <el-aside width="200px">
        <el-menu>
          <el-menu-item index="1">
            <router-link to="/text-choose">选择课文</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/text-choose">个人录音</router-link>
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

export default {
  name: 'App',
  components:{
    'textPage': TextPage,
    'TextChoose': TextChoose,
  }
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