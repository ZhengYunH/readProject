<template>
  <el-form :model="user" :rules="rules" ref="user" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">Login</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="user.username" auto-complete="off" placeholder="Username"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="user.password" auto-complete="off" placeholder="Password"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">Remember</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import * as types from '../store/mutation-types'
  import axios from 'axios'
  export default {
    data() {
      return {
        logining: false,
        user: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: 'Please enter username', trigger: 'blur' },
          ],
          password: [
            { required: true, message: 'Please enter password', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      handleSubmit(ev) {
        var _this = this;
        let params = {
          username : this.user.username,
          password : this.user.password
        };
        this.$refs.user.validate((valid) => {
          if (valid) {
            this.logining = true;

            axios.get('login.php', { params })
              .then(function (response) {

                if(response.data.success == true ){
                  let userName = _this.user.username;
                  _this.$store.commit(types.LOGIN, userName)
                  _this.$router.push({ path: '/introduce' })
                  _this.logining = false;
                }
                else{
                  _this.$message({
                    message: response.data.message,
                    type: 'error'
                  });
                  _this.logining = false;
                } 
              })
              .catch(function (error) {
                  console.log(error);
                  _this.logining = false;
              });
          } else {
            return false
          }
        });
      }
    }
  }
</script>

<style>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
</style>