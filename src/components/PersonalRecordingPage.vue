<template>
	<div class="warpper">
		<el-carousel height="500px" :autoplay=false arrow="never" trigger="click" ref="carousel" indicator-position="none" @change="carouselChange">
	    <el-carousel-item v-for="(item,index) in info.text" :key="index">
	      <img :src=item.pic><br>
	    </el-carousel-item>
	  </el-carousel>
	  <div class="audioWarpper">
	  	<audio id="RecordAudio" :controls="state" :src=info.record>
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
import Recorder from '../recorder.js'
import $ from 'jquery'

export default{
	data:function(){
		return {
			info:{},
			picIndex:1,
			playRecordDisable:false,
			state:false
		};
	},

	computed:{
		stateText:function(){
			if(this.state ){
				return "暂停播放";
			}
			return "播放原文";
		},
	},

	methods:{
		playRecord:function(){
			var x = document.getElementById("RecordAudio");
			var _this = this;
			this.audio_visible = true;
			if(this.state){
				this.state = false;
				x.pause();
			}
			else{
				this.state = true;
				x.play();
				setInterval(function(){
					_this.setActiveItem(_this.picIndex);
					_this.picIndex = (_this.picIndex < _this.info.text.length) ? (_this.picIndex+1) : 1 ;
				},_this.info.text[_this.picIndex].time);
			}
		},

		carouselChange:function(indexNow,indexLast){
			this.index = indexNow;
		},

		getInfo:function(){
			let params = {
				user_id : 1,
				title : this.$store.getters.textTitle
			};
			var _this = this;
			axios.get('personalRecordingPage.php', { params })
				.then(function (response) {
						console.log(response.data);
	          _this.info = response.data;
	          _this.$message('成功导入');
	        })
	        .catch(function (error) {
	        	_this.$message('导入失败');
	          console.log(error);
	        });
		},

	}
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