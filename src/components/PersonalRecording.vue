<template>
  <div>
    <div class="br-template"></div>
    <el-row>
      <el-col :span="4" v-for="(o, index) in imgGroup" :key="o.title" :offset="1">
        <el-card :body-style="{ padding: '0px' }">
            <img :src=o.pic class="image">
            <div style="padding: 14px;text-align: center;">
              <span class="textTitle"><a @click="routerToTextPage" >{{ o.title }}</a></span>
            </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      currentDate: new Date(),
      imgGroup:[],
    };
  },
  
  methods:{
    routerToTextPage:function(event){
      var textTitle = event.srcElement.innerText;
      this.$store.dispatch('changeText',textTitle);
      this.$router.push('/personal-recording-page');
    },

    getImage:function(){
      let params = {
        user: this.$store.getters.user,
        page: 1
      };
      var _this = this;
      axios.get('personalRecording.php', { params })
        .then(function (response) {
          _this.imgGroup = response.data;
          //_this.$message('成功导入图片');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },

  mounted:function(){
    //console.log(this.$store.getters.user);
    this.getImage();
  }
}
</script>

<style>
  a {
    cursor: pointer;
  }

  .image {
    width: 100%;
    display: block;
  }

  .br-template{
    height: 20px;
  }

</style>