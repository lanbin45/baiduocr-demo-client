<template>
<div class="ocr-container">
  <img v-if="!ocrState" v-for="(file, index) in fileUrls" v-bind:key="file" :src="file" :alt="fileNames[index]" class="image-cell">
  <el-button v-if="!ocrState" type="primary" plain style="width:80%" @click="getOcr">图片解析</el-button>
  <div v-if="ocrState" class="content">
    <p class="green">已成功识别:<br />
    <strong v-for="filename in fileNames" v-bind:key="filename">{{filename}}<br /></strong>
    </p>
    <div style="width:100%; margin-top: 50px;">
      <download-excel
        class="el-button el-button--primary is-plain"
        :data="excelData"
        :param="jsonFields"
        button_text="下载Excel">
      </download-excel>
      <el-button v-if="ocrState" type="primary" plain @click="downloadFile">发送到邮箱</el-button>
      <el-button v-if="ocrState" type="primary" plain @click="restartOcr">继续上传图片</el-button>
    </div>
  </div>
</div>
</template>

<script>
import qs from 'qs'
import JsonExcel from 'vue-json-to-excel'
const JsonFileds = {
  'NAME': 'String',
  'ADDR': 'String',
  'MOBILE': 'String',
  'TEL': 'String',
  'FAX': 'String',
  'PC': 'String',
  'URL': 'String'
}
export default {
  name: 'uploadForm',
  components: {
    'download-excel': JsonExcel
  },
  data () {
    return {
      ocrState: false,
      loadingObj: null,
      ocrResult: [],
      failedCount: 0,
      jsonFields: JsonFileds,
      excelData: []
    }
  },
  mounted () {
    console.log(this.$route)
  },
  computed: {
    fileUrls: function () {
      return this.$route.query.fileUrl
    },
    imageUrls: function () {
      return this.$route.query.imageUrl
    },
    fileNames: function () {
      return this.$route.query.fileName
    }
  },
  methods: {
    getOcr () {
      this.loadingObj = this.$loading({
        text: '操作中，请稍后'
      })
      this.failedCount = 0
      this.imageUrls.every((val, index) => {
        this.requestOcrData(val)
        return true
      })
    },
    requestOcrData (imageUrl) {
      var params = qs.stringify({
        imageUrl: imageUrl,
        picType: 'business_card'
      })
      this.axios.post('./api/baidu_ocr_general', params).then(res => {
        console.log(res)
        var result = JSON.parse(res.data)
        if (result.words_result_num === 0 || result.error_code) {
          this.failedCount += 1
          return res
        }
        this.ocrResult.push(result.words_result)
        if (this.ocrResult.length === this.imageUrls.length - this.failedCount) {
          this.excelData = this.proceedResult()
          console.log(this.excelData)
          this.loadingObj.close()
          this.ocrState = true
        }
        return res
      })
    },
    downloadFile () {
      this.$prompt('请输入邮箱', '提示', {
        center: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'confirm',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        var params = new URLSearchParams()
        params.append('excelData', JSON.stringify(this.excelData))
        params.append('email', value)
        this.axios.post('./api/downloadcardexcel', params
        ).then(res => {
          console.log(res)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    proceedResult () {
      var newResult = []
      this.ocrResult.every((val, index) => {
        var tempObj = {
          'NAME': '',
          'ADDR': '',
          'MOBILE': '',
          'TEL': '',
          'FAX': '',
          'PC': '',
          'URL': ''
        }
        Object.keys(val).every((key, i) => {
          tempObj[key] = val[key].join()
          return true
        })
        newResult.push(tempObj)
        return true
      })
      return newResult
    },
    restartOcr () {
      this.ocrState = false
      this.failedCount = 0
      this.ocrResult = []
      this.excelData = []
      this.$router.push('/cardocr')
    }
  }
}
</script>

<style>
.image-cell {
  margin: 2px;
  padding: 2px;
  width:23%;
  height: 23%;
}
.confirm {
  width: 60%;
}
</style>
