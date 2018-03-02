<template>
	<div class="warpper">
		<el-carousel height="500px" :autoplay=false arrow="never" trigger="click" ref="carousel" indicator-position="none" @change="carouselChange">
	    <el-carousel-item v-for="(item,index) in info.text" :key="index">
	      <img :src=item.pic><br>
	    </el-carousel-item>
	  </el-carousel>
	  <div class="audioWarpper">
	  	<audio id="RecordAudio" :controls="audio_visible" :src=info.record>
		  	您的浏览器不支持audio标签，请更换最新或其他浏览器。
		  </audio><br>
	  </div>
	  <div class="buttonGroup">
	  	<el-button type="primary" @click="playRecord" :disabled="playRecordDisable">{{ stateText }}</el-button>
	  	<el-button type="danger" @click="Record">{{ recordStateText }}</el-button>
	  </div>
<!-- test -->
	  <h2>Recordings</h2>
	  <ul id="recordingslist"></ul>

	</div>
</template>

<script>
import axios from 'axios'
import Recorder from '../recorder.js'
import $ from 'jquery'

export default{
	data:function(){
		return {
			img:['./assets/logo.png'],
			time:1000,
			info:{text:[{pic:"https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike60%2C5%2C5%2C60%2C20/sign=3d317346a18b87d6444fa34d6661435d/7aec54e736d12f2e37156f174fc2d562853568b1.jpg",time:1000},
			{pic:"https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike60%2C5%2C5%2C60%2C20/sign=3d317346a18b87d6444fa34d6661435d/7aec54e736d12f2e37156f174fc2d562853568b1.jpg",time:2000}],record:""},
			picIndex:1,
			audio_visible:false,
			playRecordDisable:false,
			state:false,
			recordState:false,
			recorder:null,

		};
	},

	computed:{
		stateText:function(){
			if(this.state){
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
			this.$refs.carousel.setActiveItem(index);
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
			axios.get('textPage.php', { params })
				.then(function (response) {
	          _this.info = response.data;
	          _this.$message('成功导入');
	        })
	        .catch(function (error) {
	          console.log(error);
	        });
		},

		playRecord:function(){
			var x = document.getElementById("RecordAudio");
			this.audio_visible = true;
			if(this.state){
				this.state = false;
				x.pause();
			}
			else{
				this.state = true;
				x.play();
				let _this = this;
				setInterval(function(){
					_this.setActiveItem(_this.picIndex);
					_this.picIndex = (_this.picIndex < _this.info.text.length) ? (_this.picIndex+1) : 1 ;
				},_this.info.text[_this.picIndex].time);
			}
		},

		Pause:function(){
			
		},

		Record:function(){
			this.audio_visible = false;
			this.playRecordDisable = true;
			var x = document.getElementById("RecordAudio");
			x.pause();

			if(this.recordState == false){
				this.recordState = true;
				this.recorder.record();
			}
			else{
				this.recordState = false;
				this.recorder.stop();
				this.createDownloadLink();
				this.recorder.clear();
			}
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

		//test
		uploadBlob:function(uploadUrl,blob){  
	    var reader = new FileReader();
	    var _this = this;
	    reader.onload = function(event){
	        var fd = new FormData();
	        fd.append('user', _this.$store.getters.user);
	        fd.append('textTitle', _this.$store.getters.textTitle);
	        fd.append('data', event.target.result);
	        $.ajax({
	            type: 'POST',
	            url: uploadUrl,
	            data: fd,
	            processData: false,
	            contentType: false
	        }).done(function(data) {
	            console.log(data);
	        });
	    };      
	    reader.readAsDataURL(blob);
		},

		createDownloadLink:function() {
			var _this = this;
	    this.recorder && this.recorder.exportWAV(function(blob) { 
	    	_this.uploadBlob('backend/upload.php',blob);

	      var url = URL.createObjectURL(blob);
	      var li = document.createElement('li');
	      var au = document.createElement('audio');
	      var hf = document.createElement('a');
	      
	      au.controls = true;
	      au.src = url;
	      hf.href = url;
	      hf.download = new Date().getTime() + '.mp3';
	      hf.innerHTML = hf.download;
	      li.appendChild(au);
	      li.appendChild(hf);
	      recordingslist.appendChild(li);
	    });
	  }
	},

	mounted:function(){
    //this.getInfo();
		this.initRecorder();
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