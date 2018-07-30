<template>

<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span class="card-title">图片文字识别Demo</span>
  </div>
  <div style="margin-bottom:50px">
    <el-steps :active="activeStep" align-center>
      <el-step title="步骤 1" description="先选择一张图片" icon="el-icon-upload"></el-step>
      <el-step title="步骤 2" description="选择图片的类型" icon="el-icon-edit"></el-step>
      <el-step title="步骤 3" description="获取图片识别结果" icon="el-icon-check"></el-step>
    </el-steps>
  </div>
  <el-row justify="center" align="middle">
    <el-col :span="currentSelectFileUrl?12:24" v-if="activeStep==1">
      <el-upload
        class="upload-demo"
        ref="upload"
        drag
        :auto-upload="false"
        :limit="1"
        list-type="'picture'"
        action="./api/upload"
        :on-success="uploadSuccess"
        :on-change="changeUpload"
        :on-exceed="exceedFile"
        :on-remove="removeFile"
        multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/png/bmp格式</div>
      </el-upload>
      <el-button v-if="currentSelectFileUrl" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-col>
    <el-col :span="activeStep>1?24:12" v-if="currentSelectFileUrl">
      <span class="span-title">图片预览：</span>
      <img :src="currentSelectFileUrl" style="height:200px; margin-top: 20px">
    </el-col>
  </el-row>
  <el-row justify="center" align="middle" style="margin-top: 50px">
    <el-col v-if="currentSelectFileUrl&&activeStep>1">
      <el-dropdown @command="handleCommand" trigger="click">
        <el-button type="primary">
          {{selectedOption?selectedOption:'选择图片类型'}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="option in picTypeOptions" v-bind:key="option.name" :command="option.command">{{option.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
  <el-row justify="center" align="middle" style="margin-top: 50px">
    <el-col :span="24" v-if="activeStep>2">
      <el-button type="primary" @click="getOcr()">
        获取图片识别结果
      </el-button>
      <result v-if="finishState" :wordsResult="words_result" :type="selectedCommand" style="margin-top: 50px"></result>
      <div v-if="finishState">
        <span class="span-title">识别结果（裸字符）：</span>
        <p>{{words_result}}</p>
      </div>
      <el-button v-if="finishState" type="success" @click="restart">
        再识别一张图片
      </el-button>
    </el-col>
  </el-row>
</el-card>
</template>
<script>
import result from './Result'
// import { OcrType, PicOptions } from '../constants/constant'
const qs = require('qs')
const { PicOptions } = require('../constants/constant')
export default {
  name: 'BaiduOCR',
  components: { result },
  data () {
    return {
      activeStep: 1,
      currentSelectFileUrl: '',
      picTypeOptions: PicOptions,
      selectedOption: '',
      selectedCommand: 'general_basic',
      selectedFileUrl: '',
      words_result: [],
      finishState: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // this.axios.post('/api/baidu_ocr_general').then(res => {
      //   console.log(res)
      // })
      console.log(qs)
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    uploadSuccess (response, file, fileList) {
      this.activeStep = 2
      this.selectedFileUrl = response.path
      console.log(response)
    },
    changeUpload (file, fileList) {
      this.currentSelectFileUrl = file.url
    },
    removeFile (file, fileList) {
      this.currentSelectFileUrl = ''
    },
    exceedFile (file) {
      this.$message({
        message: '每次只能上传一张图片，请先删除当前图片',
        type: 'warning'
      })
    },
    handleCommand (command) {
      this.finishState = false
      PicOptions.every((option, index) => {
        if (option.command === command) {
          this.selectedOption = option.name
          return false
        }
        return true
      })
      this.selectedCommand = command
      this.activeStep = 3
    },
    getOcr () {
      var params = qs.stringify({
        imageUrl: this.selectedFileUrl,
        picType: this.selectedCommand
      })
      this.words_result = []
      var picType = this.selectedCommand
      this.axios.post('./api/baidu_ocr_general', params).then(res => {
        console.log(res)
        this.words_result = JSON.parse(res.data).words_result
        if (picType === 'form_ocr_request') {
          let requestId = JSON.parse(res.data).result[0].request_id
          setTimeout(this.requestFormFile(requestId), 10000)
        }
        this.finishState = true
      })/* .catch(error => {
        this.$message.error('出错了，请刷新重试吧！！！')
      }) */
    },
    restart () {
      this.activeStep = 1
      this.currentSelectFileUrl = ''
      this.selectedCommand = ''
      this.selectedFileUrl = ''
      this.finishState = false
    },
    requestFormFile (requestId) {
      this.axios.post('./api/baidu_ocr_general', qs.stringify(
        {
          picType: 'form_ocr_get_request_result',
          requestId: /* '11518496_401810' */requestId
        }
      )).then(res => {
        var url = JSON.parse(res.data).result.result_data
        console.log(url)
        if (url === '') {
          this.requestFormFile(requestId)
        } else {
          let urlArrays = url.split('?')[0].split('/')
          let fileName = urlArrays[urlArrays.length - 1]
          const a = document.createElement('a')
          a.setAttribute('href', url)
          a.setAttribute('download', fileName)
          a.click()
        }
      })/* .catch(error => {
        this.$message.error('出错了，请刷新重试吧！！！')
      }) */
    }
  }
}
</script>
<style>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .card-title {
    font-size: 36px;
    font-weight: bold;
    color: #409eff;
  }
  .span-title {
    font-size: 24px;
    font-weight: bold;
    color: #409eff;
    margin-bottom: 20px;
  }
</style>
