import Vue from 'vue'
import Router from 'vue-router'
/* import HelloWorld from '@/components/HelloWorld' */
import BaiduOCR from '@/components/BaiduOCR'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: BaiduOCR
    }, {
      path: '/baiduocr',
      name: 'BaiduOCR',
      component: BaiduOCR
    }
  ]
})
