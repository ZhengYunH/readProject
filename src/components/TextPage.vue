<template>
	<div class="warpper">
		<div class="br-template"></div>
		<el-carousel v-loading="loading" height="500px" :autoplay=false arrow="never" trigger="click" ref="carousel" indicator-position="none" @change="carouselChange">
	    <el-carousel-item v-for="(item,index) in info.text" :key="index">
	      <img :src=item.pic><br>
	    </el-carousel-item>
	  </el-carousel>
	  <div class="audioWarpper">
	  	<audio id="RecordAudio" :src=info.record> <!--control for visible-->
		  	您的浏览器不支持audio标签，请更换最新或其他浏览器。
		  </audio><br>
	  </div>
	  <div class="buttonGroup">
	  	<el-button type="primary" @click="playRecord" :disabled="playRecordDisable">{{ stateText }}</el-button>
	  	<el-button type="danger" @click="Record" :disabled="RecordDisable">{{ recordStateText }}</el-button>
	  	<el-button class="uploadButton" type="primary" v-show = "audio_replay_visible" @click="upload">上传<i class="el-icon-upload el-icon--right"></i></el-button>
	  </div>

		  <audio id="RecordReplay" :controls="audio_replay_visible" :src=info.record>
		  	您的浏览器不支持audio标签，请更换最新或其他浏览器。
		  </audio>
	

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
			audio_visible:false,
			audio_replay_visible:false,
			playRecordDisable:true,
			state:false,
			recordState:false,
			recorder:null,
			blob:null,
			playControl:null,
			timeCount:0,
			loading:true,
			RecordDisable:true
		};
	},

	computed:{
		stateText:function(){
			if(this.state ){
				return "暂停播放";
			}
			return "播放原文";
		},
		recordStateText:function(){
			if(this.recordState){
				return "暂停录制";
			}
			return "开始录制";
		}
	},

	methods:{
		setActiveItem(index){
			this.$refs.carousel.setActiveItem(index-1);
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
			axios.get('textPage.php', { params })
				.then(function (response) {
						//console.log(response.data);
	          _this.info = response.data;
	          var audio = document.getElementById("RecordAudio");
	          audio.addEventListener("canplaythrough",function(){
				    	_this.loading = false;
				      _this.playRecordDisable = false;
				      _this.RecordDisable = false;
						  //_this.$message('成功导入');
						},false);
						audio.addEventListener("error",function(){
						    console.log("加载失败！");
						},false);
	        })
	        .catch(function (error) {
	        	_this.$message('导入失败');
	          console.log(error);
	        });
	    
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
				if(this.recordState){
					this.Pause();
				}
				else{
					this.setActiveItem(1);
					var x = document.getElementById("RecordAudio");
					x.currentTime = 0;
					this.picIndex = 1;
					this.Pause();				
				}
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
			if(x){
				x.pause();
			}
			this.timeCount = x.currentTime;	//获得当前播放时间，用于下面的图片轮播
		},

		Record:function(){
			this.audio_visible = false;
			this.audio_replay_visible = false;
			this.playRecordDisable = true;
			var x = document.getElementById("RecordAudio");
			x.pause();

			this.Pause();
			this.picIndex = 1;
			this.setActiveItem(1);
			

			if(this.recordState == false){
				this.playControl = setTimeout(this.picTranFun,this.info.text[0].time);
				this.recordState = true;
				this.recorder.record();
			}
			else{
				this.recordState = false;
				this.recorder.stop();
				this.audio_replay_visible = true ;
				this.createDownloadLink();
				this.recorder.clear();
			}
		},

		upload:function(){
			this.uploadBlob('backend/upload.php',this.blob);
		},

		uploadBlob:function(uploadUrl,blob){  
	    var reader = new FileReader();
	    var _this = this;
	    reader.onload = function(event){
	        var fd = new FormData();
	        fd.append('user', _this.$store.getters.user);
	        fd.append('textTitle', _this.$store.getters.textTitle);
	        fd.append('data', event.target.result);
	        //console.log(_this.$store.getters.user,_this.$store.getters.textTitle,fd);
	        $.ajax({
	            type: 'POST',
	            url: uploadUrl,
	            data: fd,
	            processData: false,
	            contentType: false
	        }).done(function(data) {
	        	var data2 = JSON.parse(data);
	        	console.log(data2);
	        	console.log(typeof data2);
	        	console.log(data2[0]);
	        	if(data2.success){
	            _this.$message('上传成功');
	        	}
	        	else{
	        		_this.$message(data.message);
	        	}
	        });
	    };      
	    reader.readAsDataURL(blob);
		},

		createDownloadLink:function() {
			var _this = this;
	    this.recorder && this.recorder.exportWAV(function(blob) { 
	    	_this.blob = blob;
	      var url = URL.createObjectURL(blob);
	      RecordReplay.src = url;
	    });
	  },

	  //mounted
		initRecorder:function(){
			var _this = this;
    	var audio_context = new AudioContext;
    	navigator.mediaDevices.getUserMedia({audio: true})
    	.then(function(mediaStream) {
    		var input = audio_context.createMediaStreamSource(mediaStream); 
    		_this.recorder = new Recorder(input,{
	        bufferLen: 4096,
	        numChannels: 2,
	        mimeType: 'audio/mp3'
    		});
    	})
    	.catch(function(error) { console.log(error); });
		},
	},

	mounted:function(){
    this.getInfo();
		this.initRecorder();
    this.audio_visible = false;
  },

  beforeDestroy:function(){
  	if(this.playControl){
				clearInterval(this.playControl);
				this.playControl = null;
		}
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