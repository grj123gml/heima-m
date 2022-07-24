<template>
  <div>
    <img :src="photo" alt="" ref="img" />

    <div class="toolbar">
      <span class="cancel" @click="cancel">取消</span>
      <span class="confirm" @click="confirm">完成</span>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadPhoto } from '@/api/user'
export default {
  props: ['photo'],
  data () {
    return {}
  },
  mounted () {
    const img = this.$refs.img
    this.myCropper = new Cropper(img, {})
  },
  methods: {
    confirm () {
      const fm = new FormData()
      this.myCropper.getCroppedCanvas().toBlob(function (blob) {
        fm.append('photo', blob)
        uploadPhoto(fm)
      })
    },
    cancel () {
      this.$emit('cancelImg')
    }
  }
}
</script>

<style scoped lang="less">
.toolbar {
  position: relative;
  .cancel {
    position: absolute;
    color: #fff;
    left: 20%;
    bottom: -10%;
    font-size: 30px;
    z-index: 999;
  }
  .confirm {
    position: absolute;
    color: #fff;
    right: 20%;
    bottom: -10%;
    font-size: 30px;
    z-index: 999;
  }
}
</style>
