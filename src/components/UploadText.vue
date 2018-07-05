<template>
  <div>
    <div class="br-template"></div>
    <el-form ref="newform" :model="newform">
        <el-form-item prop="textName" label="">
          <el-input v-model="newform.textName" placeholder="" style="width:75%" placeholder="请输入课文标题"></el-input>
        </el-form-item>
        
        <el-form-item label="" prop="textFile">
          <el-upload
            class="upload-demo"
            :action="upload_url"
            :file-list="newform.file"
            :auto-upload="false"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
         <el-button type="primary" @click="newSubmitForm()" class="yes-btn">确 定</el-button>
         <el-button @click="resetForm('newform')">重 置</el-button>
        </el-form-item>
     </el-form>
  </div>
	
</template>

<script>
    import axios from 'axios'

  export default {
    data () {
      return {
  　　　 upload_url: 'aaa',       // 随便填一个，但一定要有
  　　   uploadForm: new FormData(),   // 一个formdata
        newform: {
          textName: '',
          file:[],
        },
      }
    }, 
    methods: {
    	newSubmitForm () {
      this.$refs['newform'].validate((valid) => {
        if (valid) {
          this.uploadForm.append('textName', this.newform.textName)
          this.uploadForm.append('file[]', this.newform.file)
          
          this.newExp(this.uploadForm).then(res => {
            if (res.code === 400) {
              this.$message.error(res.error)
            } else if (res.code === 200) {
              this.$message.success('上传成功！')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    newExp (data) {
      return axios({
        method: 'post',  // 方式一定是post
        url: 'uploadText.php',
        timeout: 20000,
        data: data        // 参数需要是单一的formData形式
      })
    }
  }
}
</script>