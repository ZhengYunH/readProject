<template>
	<div class="warpper">
		<el-carousel height="500px" :autoplay=false type="card" trigger="click" ref="carousel" indicator-position="none" @change="carouselChange">
	    <el-carousel-item v-for="item in 6" :key="item">
	      <img src='../assets/logo.png'>
	    </el-carousel-item>
	  </el-carousel>
	  <div class="buttonGroup">
	  	<el-button type="primary">录制</el-button>
	  	<el-button type="warning">停止</el-button>
	  	<el-button type="danger">取消</el-button>
	  </div>
	</div>
</template>

<script>

	export default{
		data:function(){
			return {
				index:0,
				img:['./assets/logo.png'],
				time:1000,
			};
		},

		methods:{
			setActiveItem(index){
				this.$refs.carousel.setActiveItem(index);
			},


			carouselChange:function(indexNow,indexLast){
				this.index = indexNow;
			}
		}
	}
</script>

<style>
	.warpper{
		text-align: center;
	}

  .el-carousel__item {
  	text-align: center;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>