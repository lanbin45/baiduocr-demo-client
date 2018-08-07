<template>
<div class="ocr-container">
  <div class="content">
    <el-upload
      class="upload-demo"
      ref="upload"
      drag
      :auto-upload="false"
      list-type="'picture'"
      action="./api/upload"
      :on-success="uploadSuccess"
      :on-change="changeUpload"
      :on-exceed="exceedFile">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div style="text-align: center; width: 100%">
    <div class="left-align-class">
      <p class="font-14px-bold green">列表图片识别：<br /></p>
      <p class="font-14px green">
        <ol>
          <li>图片大小不超过<strong>4M</strong></li>
          <li>最短边边长<strong>至少15px</strong>,最长边<strong>不超过4096px</strong></li>
          <li>支持jpg/png/bmp格式</li>
          <li>不需要识别的信息内容最好不要出现在图中</li>
        </ol>
      </p>
    </div>
    </div>
    <div style="width:100%; margin-top: 30px">
      <el-button type="primary" plain style="width:80%" @click="submitUpload" :disabled="uploadState">上传文件</el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'formocr',
  data () {
    return {
      fileList: []
    }
  },
  computed: {
    uploadState: function () {
      return this.fileList.length === 0
    }
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    uploadSuccess (response, file, fileList) {
      console.log(file)
      var $this = this
      let image = new Image()
      image.onload = function () {
        $this.imgWidth = image.width
        $this.imgHeight = image.height
        $this.$router.push({
          path: 'draw',
          query: {
            fileUrl: file.url,
            imgWidth: image.width,
            imgHeight: image.height,
            fileName: file.name,
            imageUrl: response.path
          }
        })
      }
      image.src = file.url
      // this.$router.push({
      //   path: 'uploadform',
      //   query: {
      //     fileUrl: file.url,
      //     imageUrl: response.path,
      //     fileName: file.name
      //   }
      // })
    },
    changeUpload (file, fileList) {
      console.log(file)
      this.fileList = fileList
    },
    exceedFile (file) {
      this.$message({
        message: '每次只能上传一张图片，请先删除当前图片',
        type: 'warning'
      })
    }
  }
}
</script>

<style>
.content {
  position: fixed;
  top: 80px;
  text-align: center;
  vertical-align: middle;
  width: 100%;
}
.column-cell {
  width: 80%;
}
.left-align-class {
  text-align: left;
  margin: 0px 50px 0 50px;
}
</style>
