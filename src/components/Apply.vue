<template>
	<div class="apply-wrapper">
		<div class="apply-main"></div>
		<div class="apply-input">
			 <el-input type="text" v-model="user.username" placeholder="姓名" class="apply-inputStyle" style="width: 36%;"></el-input>
			 <el-input type="text" v-model="user.phone" placeholder="联系方式" class="apply-inputStyle" style="margin-left:2%;width: 36%;"></el-input>
			 <el-button type="primary" style="margin-left:4%" @click="submit">提交</el-button>
		</div>
	</div>
</template>

<script>
  import axios from 'axios'
	export default {
		data(){
			return{
				user: {
          username: '',
          phone: ''
        },
			};
		},
		methods:{
			submit:function(){
				let params = {
	        name: this.user.username,
	        phone: this.user.phone
	      };
      	var _this = this;
	      axios.get('Apply.php', { params })
	        .then(function (response) {
	        	response = response.data;
	        	if(response.success){
	        		_this.$message({
	        			message:'成功申请，等待管理员审核',
	        			type: 'success'
	        		});
	        	}
	        	else{
	        		_this.$message('error: '+response.message);
	        	}
	          
	        })
	        .catch(function (error) {
	          console.log(error);
	        });
	    }
		}
	}
</script>

<style>
	.apply-wrapper{
		margin-top: 10px;
		height: 100%;
		width:100%;
		background-color: #60DBFA;
	}

	.apply-main {
		height: 80%;
		width:100%;
    background-image: url(/static/apply.jpg);
    background-repeat: no-repeat;
    background-size: contain|cover;
    background-position:center;
  }

  .apply-input{
  	height: 10%;
  	width: 100%;
  	margin: 0 auto;
  	text-align: center;
  }

</style>