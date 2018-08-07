<template>
  <div class="ocr-container">
    <div class="wrap">
      <div class="canvas-container wrapContainer">
        <canvas
          ref="myCanvas"
          id="canvas"
          class="fl"
          :width="parseInt(imgWidth)"
          :height="parseInt(imgHeight)"
          @mouseup="canvasUp($event)"
          @touchend="canvasUp($event)"
        >
        </canvas>
      </div>
    </div>
    <div class="footer-button">
      <!--操作-->
      <el-button-group>
        <el-button type="primary" size="mini" plain @click="isVertical=false">画横线</el-button>
        <el-button type="primary" size="mini" plain @click="isVertical=true">画竖线</el-button>
        <el-button type="primary" size="mini" plain @click="clearRect()">清除</el-button>
        <el-button type="primary" size="mini" plain @click="getImage()">画好了</el-button>
        <el-button type="primary" size="mini" plain @click="canvasState()">{{canvasLabel}}</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'draw-board',
  data () {
    return {
      context: {},
      imgUrl: [],
      canvasMoveUse: false,
      canvasLabel: '开',
      // 存储当前表面状态数组-上一步
      imageData: null,
      // 配置参数
      config: {
        lineWidth: 1,
        lineColor: '#000000',
        shadowBlur: 2
      },
      fileUrl: this.$route.query.fileUrl,
      imgWidth: this.$route.query.imgWidth,
      imgHeight: this.$route.query.imgHeight,
      imageUrl: this.$route.query.imageUrl,
      requestId: '',
      fileName: this.$route.query.fileName,
      isVertical: false
    }
  },
  mounted () {
    this.$confirm('给表格图片添加适当的表格线将会极大地提高识别精度！快去试试吧', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '跳过',
      type: 'warning'
    }).then(() => {
      const canvas = this.$refs.myCanvas
      console.log(this.fileUrl)
      var context = canvas.getContext('2d')
      var img = new Image()
      var $this = this
      img.onload = function () {
        context.drawImage(img, 0, 0)
        $this.initDraw()
        $this.setCanvasStyle()
      }
      img.src = this.fileUrl
      this.context = context
    }).catch(() => {
      this.$router.push({
        path: 'uploadform',
        query: {
          fileUrl: this.fileUrl,
          imageUrl: this.imageUrl,
          fileName: this.fileName
        }
      })
    })
  },
  methods: {
    canvasState () {
      this.canvasLabel = this.canvasMoveUse ? '开' : '关'
      this.canvasMoveUse = !this.canvasMoveUse
    },
    isPc () {
      const userAgentInfo = navigator.userAgent
      const Agents = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod'
      ]
      let flag = true
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false
          break
        }
      }
      return flag
    },
    initDraw () {
      this.imageData = this.context.getImageData(0, 0, this.imgWidth, this.imgHeight)
    },
    // mouseup
    canvasUp (e) {
      console.log('canvasUp')
      if (this.canvasMoveUse) {
        let canvasX = e.offsetX
        let canvasY = e.offsetY
        // if (this.isPc()) {
        //   // canvasX = e.clientX - t.parentNode.offsetLeft + t.parentNode.parentNode.scrollLeft
        //   // canvasY = e.clientY - t.parentNode.offsetTop + t.parentNode.parentNode.scrollTop
        //   canvasX = e.offsetX
        //   canvasY = e.offsetY
        // } else {
        //   canvasX = e.changedTouches[0].offsetX
        //   canvasY = e.changedTouches[0].offsetY
        // }
        this.context.beginPath()
        this.context.moveTo(canvasX, canvasY)
        if (this.isVertical) {
          this.context.lineTo(canvasX, this.imgHeight)
        } else {
          this.context.lineTo(this.imgWidth, canvasY)
        }
        this.context.stroke()
      }
    },
    // 操作
    clearRect () {
      this.context.clearRect(
        0,
        0,
        this.context.canvas.width,
        this.context.canvas.height
      )
      this.context.putImageData(this.imageData, 0, 0)
    },
    // 设置绘画配置
    setCanvasStyle () {
      this.context.lineWidth = this.config.lineWidth
      this.context.shadowBlur = this.config.shadowBlur
      this.context.shadowColor = this.config.lineColor
      this.context.strokeStyle = this.config.lineColor
    },
    // 生成图片
    getImage () {
      var $this = this
      const canvas = document.querySelector('#canvas')
      if (!HTMLCanvasElement.prototype.toBlob) {
        this.addPollyFill()
      }
      canvas.toBlob((blob) => {
        let file = new window.File([blob], $this.fileName, {
          type: 'image/jpeg'
        })
        var params = new FormData()
        params.append('file', file)
        $this.axios.post('./api/upload', params, {
          headers: {
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary3q4SNbnLAUih9eBx'
          }
        }).then(res => {
          console.log(res)
          this.$router.push({
            path: 'uploadform',
            query: {
              fileUrl: canvas.toDataURL('image/png'),
              imageUrl: res.data.path,
              fileName: $this.fileName
            }
          })
        })
      })
    },
    addPollyFill () {
      if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
          value: function (callback, type, quality) {
            var binStr = atob(this.toDataURL(type, quality).split(',')[1])
            var len = binStr.length
            var arr = new Uint8Array(len)
            for (var i = 0; i < len; i++) {
              arr[i] = binStr.charCodeAt(i)
            }
            callback(new Blob([arr], {type: type || 'image/png'}))
          }
        })
      }
    }
  }
}
</script>

<style>
.wrap {
  overflow: auto !important;
  margin-top: 50px;
  border: 1px #585858 solid;
  padding: 10px;
  padding-right: 20px;
  margin-bottom: 50px;
}
#canvas {
  border-right: 1px #585858 solid;
  cursor: crosshair;
}
.wrapContainer {
  text-align: left;
}
</style>
