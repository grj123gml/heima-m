<template>
  <div>
    <div style="margin-top: 80px; background-color: #000; width: 100%">
      <img :src="photo" alt="" ref="img" style="width: 100%" />
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
      this.myCropper.getCroppedCanvas().toBlob((blob) => {
        fm.append('photo', blob)
        try {
          uploadPhoto(fm)
          this.$emit('cancelImg')
          this.$toast.success('修改头像成功')
        } catch (error) {
          this.$toast.fail('修改头像失败')
        }
      })
    },
    cancel () {
      this.$emit('cancelImg')
    }
  }
}
</script>

<style scoped lang="less">
.cancel {
  position: fixed;
  color: #fff;
  left: 0;
  bottom: 0;
  font-size: 30px;
  z-index: 999;
}
.confirm {
  position: fixed;
  color: #fff;
  right: 0;
  bottom: 0;
  font-size: 30px;
  z-index: 999;
}
</style>
