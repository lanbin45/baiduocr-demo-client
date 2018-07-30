<template>
  <div id="app">
    <mt-header fixed :title="title">
        <!-- <router-link v-if="$route.fullPath !== '/home'" to="/home" slot="left"> -->
            <mt-button v-if="backButtonState" icon="back" @click="handleBack" slot="left">返回</mt-button>
        <!-- </router-link> -->
    </mt-header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    title: function () {
      switch (this.$route.name) {
        case 'home':
          return '图片文字识别'
        case 'FormOcr':
          return '表格图片识别'
        case 'UploadForm':
          return '表格图片识别'
        case 'CardOcr':
          return '批量名片识别'
        case 'UploadCard':
          return '批量名片识别'
        default:
          return '图片文字识别'
      }
    },
    backButtonState: function () {
      return this.$route.path !== '/home'
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
html,body {
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
}
.font-14px {
  font-size: 14px;
}
.font-14px-bold {
  font-size: 14px;
  font-weight: bold;
}
.font-14pt {
  font-size: 14pt;
}
.font-14pt-bold {
  font-size: 14pt;
  font-weight: bold;
}
.white {
  color: white;
}
.mint-header {
  background: #0094b8 !important;
}
.el-button--primary {
  background: #0094b8 !important;
  border-color: #ffffff !important;
}
.el-button--primary.is-plain {
  border-color: #ffffff !important;
  color: #ffffff !important;
}
.el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover {
  background: #0094b8 !important;
  border-color: #FFFFFF !important;
}
.el-button--primary.is-plain.is-disabled, .el-button--primary.is-plain.is-disabled:active, .el-button--primary.is-plain.is-disabled:focus, .el-button--primary.is-plain.is-disabled:hover {
  color: #8ccbda !important;
  border-color: #8ccbda !important;
}
.el-message-box {
  width: unset !important;
}
</style>
