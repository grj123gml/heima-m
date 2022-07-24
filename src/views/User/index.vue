<template>
  <div>
    <div class="user">
      <!-- 头部 -->
      <van-nav-bar
        class="van-nav-bar"
        title="个人信息"
        left-arrow
        @click-left="$router.back()"
      />
    </div>
    <!-- 编辑头像 -->
    <input type="file" ref="file" accept=".jpg,.png" hidden />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>

    <!-- 裁剪头像弹出框 -->
    <van-popup v-model="show">
      <Popup :photo="photo" @cancelImg="cancelIMG"></Popup>
    </van-popup>

    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isShowname = true"
    />
    <!-- 昵称弹出框 -->
    <van-popup
      v-model="isShowname"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="Popcancel"
        @click-right="keepName"
      />
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入你要修改的新昵称"
        show-word-limit
      />
    </van-popup>

    <van-cell
      title="性别"
      :value="user.gender ? '女' : '男'"
      is-link
      @click="isShowgender = true"
    />
    <!-- 性别弹出框 -->
    <van-popup
      v-model="isShowgender"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        title="更新性别"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>

    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isShowbirthday = true"
    />
    <!-- 生日弹出层 -->
    <van-popup
      v-model="isShowbirthday"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="Confirm"
        @cancel="Cancel"
      />
    </van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Popup from '@/views/User/Popup.vue'
import { getUserprofile, updataUserInfo } from '@/api/user.js'
export default {
  data () {
    return {
      user: {},
      show: false,
      isShowname: false,
      isShowgender: false,
      photo: '',
      message: '',
      columns: ['男', '女'],
      isShowbirthday: false,
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2022, 10, 1),
      currentDate: new Date()
    }
  },
  components: {
    Popup
  },
  created () {
    this.getUserprofile()
  },
  mounted () {
    this.$refs.file.addEventListener('change', (e) => {
      console.log(e.target)
      // e.target触发事件的元素,input输入框
      const file = e.target.files[0] // 要上传的图片
      // file = URL.createObjectURL(file) // 将file对象转为图片可识别的url
      // this.photo = file
      // this.show = true
      const fr = new FileReader()
      fr.readAsDataURL(file)

      fr.onload = (e) => {
        this.photo = e.target.result
        this.show = true
      }
    })
  },
  methods: {
    async getUserprofile () {
      try {
        const res = await getUserprofile()
        console.log(res)
        this.user = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
    cancelIMG () {
      this.show = false
    },
    // 封装修改用户个人资料请求方法
    async updataUserInfo (data) {
      try {
        const res = await updataUserInfo(data)
        console.log(res)
        this.getUserprofile()
      } catch (error) {
        this.$toast.fail('编辑用户资料失败')
      }
    },
    // 昵称修改取消按钮
    Popcancel () {
      this.isShowname = false
    },
    // 保存昵称按钮
    async keepName () {
      try {
        await this.updataUserInfo({
          name: this.message
        })
        this.$toast.success('更新成功')
        this.isShowname = false
      } catch (error) {
        this.$toast.fail('更新昵称失败')
      }
    },
    // 性别修改取消按钮
    onCancel () {
      this.isShowgender = false
    },
    // 保存性别修改按钮
    async onConfirm (value, index) {
      try {
        await this.updataUserInfo({
          gender: index
        })
        this.$toast.success('更新成功')
        this.isShowgender = false
      } catch (error) {
        console.log(error)
      }
    },
    // 生日修改取消按钮
    Cancel () {
      this.isShowbirthday = false
    },
    // 保存生日修改按钮
    async Confirm () {
      try {
        await this.updataUserInfo({
          birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
        })
        this.$toast.success('更新成功')
        this.isShowbirthday = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.user {
  .van-nav-bar {
    background-color: #3296fa;
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon-arrow-left) {
    color: #fff;
  }
}
.avatar {
  width: 60px;
  height: 60px;
}
</style>
