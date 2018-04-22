<template>
	<div class="warpper">
		<el-carousel height="500px" :autoplay=false arrow="never" trigger="click" ref="carousel" indicator-position="none" @change="carouselChange">
	    <el-carousel-item v-for="(item,index) in info.text" :key="index">
	      <img :src=item.pic><br>
	    </el-carousel-item>
	  </el-carousel>
	  <div class="audioWarpper">
	  	<audio id="RecordAudio" :src=info.record>
		  	您的浏览器不支持audio标签，请更换最新或其他浏览器。
		  </audio><br>
	  </div>
	  <div class="buttonGroup">
	  	<el-button type="primary" @click="playRecord" :disabled="playRecordDisable">{{ stateText }}</el-button>
	  </div>
	</div>
</template>

<script>
import axios from 'axios'

export default{
	data:function(){
		return {
			info:{},
			picIndex:1,
			playRecordDisable:false,
			state:false,
			playControl:null,
			timeCount:0
		};
	},

	computed:{
		stateText:function(){
			if(this.state ){
				return "暂停播放";
			}
			return "播放录音";
		},
	},

	methods:{
		setActiveItem(index){
			this.$refs.carousel.setActiveItem(index-1);
		},
		playRecord:function(){
			var _this = this;
			var x = document.getElementById("RecordAudio");
			this.audio_visible = true;
			if(this.state){
				this.Pause();
			}
			else{
				this.state = true;
				x.play();
				this.picTran();
			}
		},

		//图片切换
		picTran:function(){
				let timeTemp = this.timeCount*1000;
				let sum = 0;
				var i = 1;
				//计算出当前图片的值
				for ( i = 0; i < this.info.text.length; i++) {
					sum = sum +  this.info.text[i].time;
					if(timeTemp < sum){
						break;
					}
				}

				if(i === this.info.text.length){	//播放完毕
					//console.log('end',sum,timeTemp);
					this.setActiveItem(1);
					var x = document.getElementById("RecordAudio");
					x.currentTime = 0;
					this.picIndex = 1;
					this.Pause();
				}
				

				let delta = sum - timeTemp;			

				//console.log("delta:",delta,this.info.text.length,this.timeCount);		

				var _this = this;

				this.playControl = setTimeout(this.picTranFun,delta);
		},

		//在picTran中用于图片播放的递归调用
		picTranFun:function(){
			var _this = this;
			this.picIndex = this.picIndex+1;

			if(_this.picIndex > _this.info.text.length){
				this.setActiveItem(1);
				var x = document.getElementById("RecordAudio");
				x.currentTime = 0;
				this.picIndex = 1;
				this.Pause();
			}
			else{
				this.setActiveItem(this.picIndex);
				setTimeout(_this.picTranFun,_this.info.text[_this.picIndex-1].time);
			}
			
		},

		Pause:function(){
			if(this.playControl){
				clearInterval(this.playControl);
				this.playControl = null;
			}
			this.state = false;
			var x = document.getElementById("RecordAudio");
			x.pause();
			this.timeCount = x.currentTime;	//获得当前播放时间，用于下面的图片轮播
		},

		carouselChange:function(indexNow,indexLast){
			this.index = indexNow;
		},

		getInfo:function(){
			let params = {
				user : this.$store.getters.user,
				title : this.$store.getters.textTitle
			};
			var _this = this;
			axios.get('personalRecordingPage.php', { params })
				.then(function (response) {
						console.log(response.data);
	          _this.info = response.data;
	          //_this.$message('成功导入');
	        })
	        .catch(function (error) {
	        	_this.$message('导入失败');
	          console.log(error);
	        });
		},

	},

	mounted:function(){
    this.getInfo();
    this.audio_visible = false;
  },
}
</script>

<style>
	.warpper{
		text-align: center;
	}

	.buttonGroup{
		margin-top: 20px;
	}

	.audioWarpper{
		margin-top: 20px;
	}

	#RecordReplay {
    margin-top: 20px;
	}

  .el-carousel__item {
  	text-align: center;
    margin: 0;
  }
</style>