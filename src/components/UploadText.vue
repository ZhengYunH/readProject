<template>
	<div>
		标题
		<el-input v-model="textTitle" placeholder="请输入文章标题"></el-input>
		图片
		<el-upload
			:action="UploadUrl()"
		  list-type="picture-card"
		  show-file-list 
		  multiple>
		  <i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog :visible.sync="dialogVisible">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		录音音频
		<el-upload
		  action="https://jsonplaceholder.typicode.com/posts/"
		  accept='.mp3'>
		  	<el-button size="small" type="primary">点击上传</el-button>
  			<div slot="tip" class="el-upload__tip">只能上传mp3文件</div>
		</el-upload>
		<el-button type = "primary" @click = "upload">上传</el-button>
	</div>
</template>

<script>
  export default {
    data() {
      return {
      	picUrl:'',
      	recordUrl:'',
        dialogImageUrl: '',
        dialogVisible: false,
        textTitle:'',
      };
    },
    methods: {
    	upload(){
    		console.log("test");
    	},
    	UploadUrl:function(){
        return "http://localhost/backend/uploadText.php";     
    	},   
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
  }
</script>