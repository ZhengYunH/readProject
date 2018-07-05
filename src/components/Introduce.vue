<template>
	<div>
    <div class="br-template"></div>
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>简介</span>
		  </div>
		  <div v-for="(item, index) in data" :key="index" class="text item">
		    {{index+1}} . {{ item }}
		  </div>
		</el-card>
	</div>
</template>



<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }


</style>

<script>
	export default {
  data:function(){
    return{
     	data:["始于1969年，伴随美国儿童成长的教育品牌",
     		"覆盖全球150个国家，影响1.56亿儿童成长",
"独有价值观课程帮助儿童健康成长，超过1000项学术研究证实课程的成效性",
"学龄前经常接触《芝麻街》的儿童比未接触的儿童，在高中时期的平均成绩高出16%",
"超过90%的父母反映《芝麻街》的课程内容使得孩子对数数、排序和配对的兴趣有了积极变化",
"接触《芝麻街》的四岁儿童比不接触的儿童的读写能力高67%",
"接触过《芝麻街》的儿童的亲社会行为水平比未接触的儿童高40%"]
    }
  },
}
</script>