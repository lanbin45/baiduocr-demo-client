<template>
<div>
  <div class="content">
    <i class="el-icon-upload logo"></i>
    <div class="title">图片识别Demo</div>
  </div>
  <div class="footer">
    <router-link to="/formocr">
      <el-button type="primary">表格图片识别</el-button>
    </router-link>
    <router-link to="/cardocr">
      <el-button type="primary" plain>批量名片识别</el-button>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'home',
  mounted () {
    this.init()
  },
  methods: {
    init () {
      console.log(this.$route)
    },
    handleClick (type) {
      if (type === 'formOcr') {
        this.$router.push('/formocr')
      } else {
        console.log(type)
      }
    }
  }
}
</script>
<style>
.content {
  position: fixed;
  top: 100px;
  text-align: center;
  vertical-align: middle;
  width: 100%;
}
.footer {
  position: fixed;
  bottom: 80px;
  width: 100%;
  height: 50px;
}
.logo {
  margin-top: 100px;
  font-size: 120px;
  color: #0094b8;
}
.title {
  margin-top: 20px;
  font-size: 32px;
  color: #0094b8;
}
</style>
