import Vue from 'vue'
import Router from 'vue-router'
/* import HelloWorld from '@/components/HelloWorld' */
import BaiduOCR from '@/components/BaiduOCR'
import Home from '@/components/Home'
import FormOcr from '@/components/FormOcr'
import CardOcr from '@/components/CardOcr'
import UploadForm from '@/components/UploadForm'
import UploadCard from '@/components/UploadCard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home
    }, {
      path: '/baiduocr',
      name: 'BaiduOCR',
      component: BaiduOCR
    }, {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/formocr',
      name: 'FormOcr',
      component: FormOcr
    }, {
      path: '/cardocr',
      name: 'CardOcr',
      component: CardOcr
    }, {
      path: '/uploadform',
      name: 'UploadForm',
      props: true,
      component: UploadForm
    }, {
      path: '/uploadcard',
      name: 'UploadCard',
      props: true,
      component: UploadCard
    }
  ]
})
