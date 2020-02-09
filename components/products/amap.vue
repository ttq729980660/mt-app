<template>
  <div class="m-map" :id="id" :style="{width:width+'px',height:height+'px',margin:'34px auto'}"/>
</template>

<script>
export default {
  props:{
    width:{
      type:Number,
      default:300
    },
    height:{
      type:Number,
      default: 300
    },
    point:{
      type:Array,
      default(){
        return [116.46,39.92]
      }
    }
  },
  data(){
    return {
      id:'amap',
      key:'ac835eceb3e7ca8ec3b9e7b0b642e0bd'
    }
  },
  watch:{
    point:function (val,old) {
      this.map.setCenter(val)
      this.marker.setPosition(val)
    }
  },
  mounted() {
    let self = this
    self.id=`amap${Math.random().toString().slice(4,6)}`
    window.onmaploaded = () => {
      let map = new window.AMap.Map(self.id, {
        resizeEnable:true,
        zoom:11,
        center:self.point
      })
      self.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        let toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
        let marker = new window.AMap.Marker({
          icon:'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position:self.point
        })
        self.marker = marker
        marker.setMap(map)
      })
    }
    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmaploaded`
    let jsApi = document.createElement('script')
    jsApi.charset = 'utf-8'
    jsApi.src = url
    document.head.appendChild(jsApi)
  }
}
</script>

<style scoped>

</style>
