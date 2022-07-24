<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <!-- 登录的盒子 -->
      <div v-if="isLogin" class="user-info banner">
        <!-- 占位 -->
        <van-row></van-row>
        <!-- 展示用户信息 -->
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <!-- 用户头像 -->
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="UserInfo.photo"
              />
              <!-- 手机号 -->
              <span class="mobile">{{ UserInfo.name }}</span>
            </van-row>
          </van-col>
          <!-- 按钮 -->
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button
                to="/user"
                class="send-sms-btn"
                round
                size="small"
                type="default"
              >
                编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon> {{ UserInfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ UserInfo.fans_count }} </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ UserInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon> {{ UserInfo.like_count }} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录的盒子 -->
      <div v-else class="login-register banner">
        <div class="wrap" @click="goLogin">
          <img src="../../assets/images/mobile.png" alt="" srcset="" />
          <span> 登录 / 注册</span>
        </div>
      </div>
    </header>
    <!-- 主体部分 -->
    <main>
      <div>
        <!-- 收藏搜索 -->
        <van-grid column-num="2" class="grid">
          <van-grid-item icon="photo-o" text="收藏">
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="历史">
            <template #icon>
              <span class="toutiao toutiao-lishi"></span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!--  -->
      <div class="link">
        <van-cell title="消息通知 " is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>

    <!-- 底部退出按钮 -->
    <van-button v-if="isLogin" block class="login-btn" @click="logout"
      >退出</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      UserInfo: {}
    }
  },
  computed: {
    // 标识是否登录
    isLogin () {
      // 判断token
      // 两个感叹号转为布尔值
      return !!this.$store.state.user.token
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 退出登录
    logout () {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号？'
        })
        .then(() => {
          // on confirm
          // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
          console.log('取消执行这里')
        })
    },
    goLogin () {
      this.$router.push('/login')
    },
    async getUserInfo () {
      try {
        if (this.isLogin) {
          const {
            data: { data }
          } = await getUserInfo()
          this.UserInfo = data
          console.log(this.UserInfo)
        }
      } catch (error) {
        this.$toast.fail('请重新登录')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
//背景图的样式
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
//用户信息的样式
.user-info {
  display: flex;
  flex-direction: column;

  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  .send-sms-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }
  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
  :deep(.van-grid-item__icon-wrapper) {
    font-size: 0.34667rem;
    margin-bottom: 0.10667rem;
  }
}
// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
}
.login-btn {
  :deep(.van-button__text) {
    color: red;
  }
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 0.37333rem;
  img {
    margin-bottom: 10px;
    width: 1.76rem;
    height: 1.76rem;
  }
}
</style>
