<template>
<div class="ocr-container">
  <img v-if="!ocrState" :src="fileUrl" class="image-container">
  <el-button v-if="!ocrState" type="primary" plain style="width:80%" @click="getOcr">图片解析</el-button>
  <div v-if="ocrState" class="content">
    <p class="white">已成功识别:<br />
    <strong>{{fileName}}</strong>
    </p>
    <div style="width:100%; margin-top: 50px;">
      <el-button v-if="ocrState" type="primary" plain @click="downloadFile('web')">点击下载</el-button>
      <el-button v-if="ocrState" type="primary" plain @click="downloadFile('mobile')">发送到邮箱</el-button>
      <el-button v-if="ocrState" type="primary" plain @click="restartOcr">继续上传图片</el-button>
    </div>
  </div>
</div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'uploadForm',
  data () {
    return {
      ocrState: false,
      requestId: '',
      loadingObj: null,
      excelUrl: ''
    }
  },
  mounted () {
    console.log(this.$route)
    // this.sendEmail()
  },
  computed: {
    fileUrl: function () {
      return this.$route.query.fileUrl
    },
    imageUrl: function () {
      return this.$route.query.imageUrl
    },
    fileName: function () {
      return this.$route.query.fileName
    }
  },
  methods: {
    getOcr () {
      var params = qs.stringify({
        imageUrl: this.imageUrl,
        picType: 'form_ocr_request'
      })
      this.loadingObj = this.$loading({
        text: '操作中，请稍后'
      })
      this.axios.post('./api/baidu_ocr_general', params).then(res => {
        this.requestId = JSON.parse(res.data).result[0].request_id
        this.loadingObj.close()
        this.ocrState = true
      })
    },
    downloadFile (type) {
      this.loadingObj = this.$loading({
        text: '操作中，请稍后'
      })
      this.requestFormFile(type)
    },
    requestFormFile (type) {
      this.axios.post('./api/baidu_ocr_general', qs.stringify(
        {
          picType: 'form_ocr_get_request_result',
          requestId: /* '11518496_401810' */this.requestId
        }
      )).then(res => {
        try {
          var url = JSON.parse(res.data).result.result_data
          console.log(url)
          if (url === '') {
            this.requestFormFile()
          } else {
            this.loadingObj.close()
            // this.excelUrl = url
            if (type === 'web') {
              this.processWeb(url)
            } else {
              this.sendEmail(url)
            }
          }
        } catch (error) {
          this.loadingObj.close()
          this.$message.error('出错了，请刷新重试吧！！！')
        }
      })
    },
    processWeb (url) {
      let urlArrays = url.split('?')[0].split('/')
      let fileName = urlArrays[urlArrays.length - 1]
      const a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('download', fileName)
      a.click()
    },
    restartOcr () {
      this.ocrState = false
      this.requestId = ''
      this.$router.push('/formocr')
    },
    sendEmail (url) {
      this.$prompt('请输入邮箱', '提示', {
        center: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.axios.post('./api/downloadformexcel', qs.stringify(
          {
            fileUrl: url/* `http://bj.bcebos.com/v1/aip-web/form_ocr/A657F6060F4B460487B4FB023074C05A.xls?authorization=bce-auth-v1%2Ff86a2044998643b5abc89b59158bad6d%2F2018-07-29T04%3A17%3A06Z%2F86400%2F%2F57b6f391f97b870f6210b9cf2224107f7be6729e6f960263acd43177c562328e` */,
            email: value
          })
        ).then(res => {
          console.log(res)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }
}
</script>

<style>
.image-container {
  width:100%;
  height: 90%;
}
</style>
