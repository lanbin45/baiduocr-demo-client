<template>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>识别结果</span>
  </div>
  <!-- 身份证 -->
  <div v-if="type==ocrType.idcard" class="result-container">
    <div v-if="wordsResult['住址']">
      <el-tag size="medium">姓名</el-tag><span> {{wordsResult['姓名'].words}}</span>
    </div>
    <div v-if="wordsResult['性别']">
      <el-tag size="medium">性别</el-tag><span> {{wordsResult['性别'].words}}</span>
    </div>
    <div v-if="wordsResult['民族']">
      <el-tag size="medium">民族</el-tag><span> {{wordsResult['民族'].words}}</span>
    </div>
    <div v-if="wordsResult['住址']">
      <el-tag size="medium">住址</el-tag><span> {{wordsResult['住址'].words}}</span>
    </div>
    <div v-if="wordsResult['公民身份号码']">
      <el-tag size="medium">公民身份号码</el-tag><span> {{wordsResult['公民身份号码'].words}}</span>
    </div>
    <div v-if="wordsResult['出生']">
      <el-tag size="medium">出生</el-tag><span> {{wordsResult['出生'].words}}</span>
    </div>
  </div>
  <!-- 银行卡 -->
  <div v-if="type==ocrType.bankcard" class="result-container">
    <div v-if="wordsResult.bank_card_number">
      <el-tag size="medium">银行卡号</el-tag><span> {{wordsResult.bank_card_number}}</span>
    </div>
    <div v-if="wordsResult.bank_name">
      <el-tag size="medium">银行名</el-tag><span> {{wordsResult.bank_name}}</span>
    </div>
    <div v-if="wordsResult.bank_card_type">
      <el-tag size="medium">银行卡类型</el-tag><span> {{wordsResult.bank_card_type==1?'借记卡':'信用卡'}}</span>
    </div>
  </div>
  <!-- 驾驶证 -->
  <div v-if="type==ocrType.driving_license" class="result-container">
    <div v-if="wordsResult['证号']">
      <el-tag size="medium">证号</el-tag><span> {{wordsResult['证号'].words}}</span>
    </div>
    <div v-if="wordsResult['有效期限']">
      <el-tag size="medium">有效期限</el-tag><span> {{wordsResult['有效期限'].words}}</span>
    </div>
    <div v-if="wordsResult['准驾车型']">
      <el-tag size="medium">准驾车型</el-tag><span> {{wordsResult['准驾车型'].words}}</span>
    </div>
    <div v-if="wordsResult['有效起始日期']">
      <el-tag size="medium">有效起始日期</el-tag><span> {{wordsResult['有效起始日期'].words}}</span>
    </div>
    <div v-if="wordsResult['住址']">
      <el-tag size="medium">住址</el-tag><span> {{wordsResult['住址'].words}}</span>
    </div>
    <div v-if="wordsResult['姓名']">
      <el-tag size="medium">姓名</el-tag><span> {{wordsResult['姓名'].words}}</span>
    </div>
    <div v-if="wordsResult['国籍']">
      <el-tag size="medium">国籍</el-tag><span> {{wordsResult['国籍'].words}}</span>
    </div>
    <div v-if="wordsResult['出生日期']">
      <el-tag size="medium">出生日期</el-tag><span> {{wordsResult['出生日期'].words}}</span>
    </div>
    <div v-if="wordsResult['性别']">
      <el-tag size="medium">性别</el-tag><span> {{wordsResult['性别'].words}}</span>
    </div>
    <div v-if="wordsResult['初次领证日期']">
      <el-tag size="medium">初次领证日期</el-tag><span> {{wordsResult['初次领证日期'].words}}</span>
    </div>
  </div>
  <!-- 行驶证 -->
  <div v-if="type==ocrType.vehicle_license" class="result-container">
    <div v-if="wordsResult['品牌型号']">
      <el-tag size="medium">品牌型号</el-tag><span> {{wordsResult['品牌型号'].words}}</span>
    </div>
    <div v-if="wordsResult['发证日期']">
      <el-tag size="medium">发证日期</el-tag><span> {{wordsResult['发证日期'].words}}</span>
    </div>
    <div v-if="wordsResult['使用性质']">
      <el-tag size="medium">使用性质</el-tag><span> {{wordsResult['使用性质'].words}}</span>
    </div>
    <div v-if="wordsResult['发动机号码']">
      <el-tag size="medium">发动机号码</el-tag><span> {{wordsResult['发动机号码'].words}}</span>
    </div>
    <div v-if="wordsResult['号牌号码']">
      <el-tag size="medium">号牌号码</el-tag><span> {{wordsResult['号牌号码'].words}}</span>
    </div>
    <div v-if="wordsResult['所有人']">
      <el-tag size="medium">所有人</el-tag><span> {{wordsResult['所有人'].words}}</span>
    </div>
    <div v-if="wordsResult['住址']">
      <el-tag size="medium">住址</el-tag><span> {{wordsResult['住址'].words}}</span>
    </div>
    <div v-if="wordsResult['注册日期']">
      <el-tag size="medium">注册日期</el-tag><span> {{wordsResult['注册日期'].words}}</span>
    </div>
    <div v-if="wordsResult['车辆识别代号']">
      <el-tag size="medium">车辆识别代号</el-tag><span> {{wordsResult['车辆识别代号'].words}}</span>
    </div>
    <div v-if="wordsResult['车辆类型']">
      <el-tag size="medium">车辆类型</el-tag><span> {{wordsResult['车辆类型'].words}}</span>
    </div>
  </div>
  <!-- 车牌 -->
  <div v-if="type==ocrType.license_plate" class="result-container">
    <div v-if="wordsResult.number">
      <el-tag size="medium">车牌号</el-tag><span> {{wordsResult.number}}</span>
    </div>
  </div>
  <!-- 营业执照 -->
  <div v-if="type==ocrType.business_license" class="result-container">
    <div v-if="wordsResult['单位名称']">
      <el-tag size="medium">单位名称</el-tag><span> {{wordsResult['单位名称'].words}}</span>
    </div>
    <div v-if="wordsResult['法人']">
      <el-tag size="medium">法人</el-tag><span> {{wordsResult['法人'].words}}</span>
    </div>
    <div v-if="wordsResult['地址']">
      <el-tag size="medium">地址</el-tag><span> {{wordsResult['地址'].words}}</span>
    </div>
    <div v-if="wordsResult['有效期']">
      <el-tag size="medium">有效期</el-tag><span> {{wordsResult['有效期'].words}}</span>
    </div>
    <div v-if="wordsResult['证件编号']">
      <el-tag size="medium">证件编号</el-tag><span> {{wordsResult['证件编号'].words}}</span>
    </div>
    <div v-if="wordsResult['社会信用代码']">
      <el-tag size="medium">社会信用代码</el-tag><span> {{wordsResult['社会信用代码'].words}}</span>
    </div>
  </div>
  <!-- 护照 -->
  <div v-if="type==ocrType.passport" class="result-container">
    <div v-if="wordsResult['国家码']">
      <el-tag size="medium">国家码</el-tag><span> {{wordsResult['国家码'].words}}</span>
    </div>
    <div v-if="wordsResult['护照签发地点']">
      <el-tag size="medium">护照签发地点</el-tag><span> {{wordsResult['护照签发地点'].words}}</span>
    </div>
    <div v-if="wordsResult['有效期至']">
      <el-tag size="medium">有效期至</el-tag><span> {{wordsResult['有效期至'].words}}</span>
    </div>
    <div v-if="wordsResult['护照号码']">
      <el-tag size="medium">护照号码</el-tag><span> {{wordsResult['护照号码'].words}}</span>
    </div>
    <div v-if="wordsResult['姓名']">
      <el-tag size="medium">姓名</el-tag><span> {{wordsResult['姓名'].words}}</span>
    </div>
    <div v-if="wordsResult['签发日期']">
      <el-tag size="medium">签发日期</el-tag><span> {{wordsResult['签发日期'].words}}</span>
    </div>
    <div v-if="wordsResult['生日']">
      <el-tag size="medium">生日</el-tag><span> {{wordsResult['生日'].words}}</span>
    </div>
    <div v-if="wordsResult['性别']">
      <el-tag size="medium">性别</el-tag><span> {{wordsResult['性别'].words}}</span>
    </div>
  </div>
  <!-- 名片 -->
  <div v-if="type==ocrType.business_card" class="result-container">
    <div v-if="wordsResult['ADDR']">
      <el-tag size="medium">地址</el-tag><span> {{wordsResult['ADDR']}}</span>
    </div>
    <div v-if="wordsResult['FAX']">
      <el-tag size="medium">传真</el-tag><span> {{wordsResult['FAX']}}</span>
    </div>
    <div v-if="wordsResult['MOBILE']">
      <el-tag size="medium">手机</el-tag><span> {{wordsResult['MOBILE']}}</span>
    </div>
    <div v-if="wordsResult['NAME']">
      <el-tag size="medium">姓名</el-tag><span> {{wordsResult['NAME']}}</span>
    </div>
    <div v-if="wordsResult['PC']">
      <el-tag size="medium">邮编</el-tag><span> {{wordsResult['PC']}}</span>
    </div>
    <div v-if="wordsResult['URL']">
      <el-tag size="medium">公司网址</el-tag><span> {{wordsResult['URL']}}</span>
    </div>
    <div v-if="wordsResult['TEL']">
      <el-tag size="medium">电话</el-tag><span> {{wordsResult['TEL']}}</span>
    </div>
  </div>
  <!-- 二维码 -->
  <div v-if="type==ocrType.qrcode" class="result-container">
    <div v-for="result in wordsResult" v-bind:key="result.text">
      <el-tag size="medium">识别结果(目前只显示第一个结果)</el-tag><span> {{result.text[0]}}</span>
    </div>
  </div>
  <div v-else>
    <div v-for="result in wordsResult" v-bind:key="result.words">{{result.words}}</div>
  </div>
</el-card>
</template>
<script>
const { OcrType } = require('../constants/constant')
export default {
  name: 'result',
  props: [ 'wordsResult', 'type' ],
  data () {
    return {
      ocrType: OcrType
    }
  }
}
</script>
<style>
.result-container{
  text-align: left
}
</style>
