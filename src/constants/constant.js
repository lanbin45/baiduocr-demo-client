var OcrType = {
  general_basic: 'general_basic', // 通用文字识别
  accurate_basic: 'accurate_basic', // 通用文字识别（高精度版）
  general: 'general', // 通用文字识别（含位置信息版）
  accurate: 'accurate', // 通用文字识别（含位置信息、高精度版）
  webimage: 'webimage', // 网络图片文字识别
  idcard: 'idcard', // 身份证识别
  bankcard: 'bankcard', // 银行卡识别
  driving_license: 'driving_license', // 驾驶证识别
  vehicle_license: 'vehicle_license', // 行驶证识别
  license_plate: 'license_plate', // 车牌识别
  business_license: 'business_license', // 营业执照识别
  passport: 'passport', // 护照识别
  business_card: 'business_card', // 名片识别
  form_ocr_request: 'form_ocr/request', // 表格文字识别
  form_ocr_get_request_result: 'form_ocr/get_request_result', // 获取表格识别结果
  receipt: 'receipt', // 通用票据识别
  qrcode: 'qrcode' // 二维码识别
}
var PicOptions = [{
  name: '通用文字识别',
  command: 'general_basic'
}, {
  name: '通用文字识别（高精度版）',
  command: 'accurate_basic'
}, {
  name: '通用文字识别（含位置信息版）',
  command: 'general'
}, {
  name: '通用文字识别（含位置信息、高精度版）',
  command: 'accurate'
}, {
  name: '网络图片文字识别',
  command: 'webimage'
}, {
  name: '身份证识别',
  command: 'idcard'
}, {
  name: '银行卡识别',
  command: 'bankcard'
}, {
  name: '驾驶证识别',
  command: 'driving_license'
}, {
  name: '行驶证识别',
  command: 'vehicle_license'
}, {
  name: '车牌识别',
  command: 'license_plate'
}, {
  name: '营业执照识别',
  command: 'business_license'
}, {
  name: '护照识别',
  command: 'passport'
}, {
  name: '名片识别',
  command: 'business_card'
}, {
  name: '表格文字识别',
  command: 'form_ocr_request'
}, {
  name: '通用票据识别',
  command: 'receipt'
}, {
  name: '二维码识别',
  command: 'qrcode'
}]
module.exports.PicOptions = PicOptions
module.exports.OcrType = OcrType
