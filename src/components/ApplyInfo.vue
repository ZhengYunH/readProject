<template>
	<div>
    <div class="br-template"></div>
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
        prop="phone"
        label="电话">
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
  </div>
  </template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        tableData: [],
      }
    },
    methods: {
      getInfo() {
        let params = {};
				var _this = this;
				axios.get('ApplyInfo.php', { params })
					.then(function (response) {
							console.log(response.data);
		          _this.tableData = response.data;
		          //_this.$message('成功导入');
		        })
		        .catch(function (error) {
		        	_this.$message('导入失败');
		        });
      },

      deleteData(row){
        let params = {
          name : row.name
        };
        var _this = this;
        axios.get('deleteApplyInfo.php', { params })
          .then(function (response) {
              if(response.data.success){
                _this.$message('成功删除');
                _this.getInfo();
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