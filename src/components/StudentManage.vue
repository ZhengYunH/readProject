<template>
	<div>
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="90%">
      <el-table-column
        prop="date"
        label="日期"
        width="180"
        sortable>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
        sortable>
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码">
      </el-table-column>

      <el-table-column
      fixed="right"
      label="操作"
      width="100">
	      <template slot-scope="scope">
	        <el-button @click="deleteData(scope.row)" type="text" size="small">删除</el-button>
	      </template>
	    </el-table-column>
    </el-table>
    <el-form ref="form" :model="form" label-width="80px">
    	<el-form-item label="名字">
    		<el-input v-model="form.name"></el-input>
    	</el-form-item>
    	<el-form-item label="密码">
    		<el-input v-model="form.password"></el-input>
    	</el-form-item>
    	<el-form-item>
    		<el-button type="primary" @click="onSubmit">创建学生信息</el-button>
    	</el-form-item>
    </el-form>
  </div>
  </template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        tableData: [{ date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'}],
        form:{
        	name:'',
        	password:'',
        }
      }
    },
    methods: {
      getInfo() {
        let params = {};
				var _this = this;
				axios.get('studentInfo.php', { params })
					.then(function (response) {
							//console.log(response.data);
		          _this.tableData = response.data;
		          //_this.$message('成功导入');
		        })
		        .catch(function (error) {
		        	_this.$message('导入失败');
		        });
      },

      onSubmit(){
      	let params = {
					name : this.form.name,
					password : this.form.password
				};
				var _this = this;
				axios.get('addStudentInfo.php', { params })
					.then(function (response) {
              if(response.data.success){
                _this.$message('成功导入信息');
                this.getInfo();
              }
              else{
                _this.$message(response.data.message);
              }
		        })
		        .catch(function (error) {
		        	_this.$message(error);
		        });
      },

      deleteData(row){
        let params = {
          name : row.name
        };
        var _this = this;
        axios.get('deleteStudentInfo.php', { params })
          .then(function (response) {
              if(response.data.success){
                _this.$message('成功删除');
                this.getInfo();
              }
              else{
                _this.$message(response.data.message);
              }
            })
            .catch(function (error) {
              _this.$message(error);
            });
      }
    },

    mounted:function(){
      this.getInfo();
    },
  }
</script>

<style type="text/css">
	.addButton{
		margin-top: 20px;
		margin-left: 20px;
	}
</style>