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
    <!-- 通过 ref 可以获取到 Form 实例并调用实例方法 -->
    <van-form ref="form" class="form" @submit="onSubmit">
   <van-field
    v-model="mobile"
    name="mobile"
    placeholder="请输入手机号"
    :rules="mobileRules">
    <template #label>
    <span class="toutiao toutiao-shouji"></span>
    </template>
    </van-field>
   <van-field
    v-model="code"
    type="text"
    name="code"
    placeholder="请输入验证码"
    :rules="codeRules">
    <template #label>
    <span class="toutiao toutiao-yanzhengma"></span>
    </template>
      <template #button>
      <van-count-down v-if="isShowCountDown" :time="5 *1000"  format="ss s"
      @finish="isShowCountDown=false"/>
      <van-button v-else class="send-sms-btn" round size="small" type="default" @click.prevent="onSendSms">发送验证码</van-button>
      </template>
   </van-field>
  <div style="margin: 16px;">
    <van-button block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import { login, onSendSms } from '@/api/user'
import { mobileRules, codeRules } from './rules'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
    }
  },
  methods: {
    backToPropage () {
      this.$router.back()
    },
    // 登录
    async onSubmit () {
      this.$toast.loading({
        message: '不要急,加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // console.log(res)
        // 存储token
        this.$store.commit('setUser', res.data.data)
        // 跳转页面
        this.$router.push('/profile')
        // 提示成功
        this.$toast.success('登录成功')
      } catch (err) {
        // console.log(err)
        // this.$toast.fail('登录失败')
        const status = err.response.status
        let message = '登录错误，请刷新重试'
        if (status === 400) {
          message = err.response.data.message
        }
        this.$toast.fail(message)

        // switch (status) {
        //   // 400的提示错误
        //   case 400:
        //     this.$toast.fail(err.response.data.message)
        //     break
        //   case 507:
        //     // 服务器错误
        //     this.$toast.fail('请刷新后重新登录')
        //     break
        //   default:
        //     // 其他错误
        //     this.$toast.fail('请刷新后重新登录')
        //     break
        // }
      }
    },
    // 发送验证码
    async onSendSms () {
      try {
        // 验证手机码 validate验证表单，支持传入 name 来验证单个或部分表单项
        await this.$refs.form.validate('mobile')
        // 发送请求，获取验证码
        await onSendSms(this.mobile)
        // 显示倒计时
        this.isShowCountDown = true
      } catch (err) {
        // 表单校验导致的失败
        if (!err.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          // 验证码导致的失败
          const status = err.response.status
          if (status === 429 || status === 404) {
            this.$toast.fail(err.response.data.message)
          }
        }
      }
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
