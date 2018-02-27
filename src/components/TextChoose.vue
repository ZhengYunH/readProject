<template>
<el-row>
  <el-col :span="4" v-for="(o, index) in imgGroup" :key="o.title" :offset="1">
    <el-card :body-style="{ padding: '0px' }">
      <router-link to="/text-page">
        <img :src=o.pic class="image">
        <div style="padding: 14px;text-align: center;">
          <span class="textTitle">{{ o.title }}</span>
        </div>
      </router-link>
    </el-card>
  </el-col>
</el-row>
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
    getImage:function(){
      let params = {
        userID : this.$store.getters.userID,
        page: 1
      };
      var _this = this;
      axios.get('textChoose.php', { params })
        .then(function (response) {
          _this.imgGroup = response.data;
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
  .image {
    width: 100%;
    display: block;
  }
</style>