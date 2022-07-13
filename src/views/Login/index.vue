<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
    class="navbar"
    title="登录"
    left-arrow
    @click-left="backToPropage">
    <template #left>
   <van-icon name="cross" />
   </template>
    </van-nav-bar>
    <!-- 手机号、验证码表单 -->
    <!-- van-field -->
    <van-form class="form" @submit="onSubmit">
   <van-field
    v-model="mobile"
    name="mobile"
    placeholder="请输入手机号"
    :rules="[{ required: true, message: '请填写手机号' }]">
    <template #label>
    <span class="toutiao toutiao-shouji"></span>
    </template>
    </van-field>
   <van-field
    v-model="code"
    type="text"
    name="code"
    placeholder="请输入验证码"
    :rules="[{ required: true, message: '请填写验证码' }]">
    <template #label>
    <span class="toutiao toutiao-yanzhengma"></span>
    </template>
      <template #button>
          <van-button class="send-sms-btn" round size="small" type="default">发送验证码</van-button>
        </template>
    </van-field>
  <div style="margin: 16px;">
    <van-button block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    backToPropage () {
      this.$router.back()
    },
    // 登录
    async onSubmit () {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style scoped lang='less'>
.navbar{
background-color: #3296fa;
:deep(.van-nav-bar__title){
color:#fff;
}
.van-icon{
 color:#fff;
}
}
.form{
  :deep(.van-field__label){
    flex:1
  }
  :deep(.van-cell__value){
    flex:25
  }
  .toutiao{
   font-size: 0.5rem;
  }
}
  .send-sms-btn {
    padding: 0; // 原有button 带有 padding 需要清除
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

</style>
