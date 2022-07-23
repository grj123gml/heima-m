<template>
  <div class="popInfo">
    <!-- 标题 -->
    <van-nav-bar :title="num ? `${num}条回复` : '暂无回复'" />
    <!-- 评论内容 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell-group inset class="cellGroup">
        <van-cell :title="(commentList && commentList.aut_name) || '暂无'">
          <template #icon>
            <img
              :src="(commentList && commentList.aut_photo) || '暂无'"
              alt=""
            />
          </template>
          <template #label>
            <div class="commentInfo">
              {{ (commentList && commentList.content) || '暂无' }}
            </div>
            <div class="commentTime">
              <span>{{ pubdate || '暂无' }}</span>
              <van-button class="huifuBtn">回复0</van-button>
            </div>
          </template>
          <template #default>
            <van-icon
              name="good-job-o"
              :class="{ loveBtn: isLiking === true }"
            />
            <span @click="likeFn">赞</span>
          </template>
        </van-cell>
        <van-cell title="全部回复" class="allInfo"></van-cell>
        <!-- 全部回复 -->
        <van-cell
          :title="(item && item.aut_name) || '暂无'"
          v-for="(item, index) in allComments"
          :key="index"
        >
          <template #icon>
            <img :src="(item && item.aut_photo) || '暂无'" alt="" />
          </template>
          <template #label>
            <div class="commentInfo">
              {{ (item && item.content) || '暂无' }}
            </div>
            <div class="commentTime">
              <span>{{ pubdateData(item.pubdate) || '暂无' }}</span>
              <van-button class="huifuBtn">回复0</van-button>
            </div>
          </template>
          <template #default>
            <van-icon
              name="good-job-o"
              :class="{ loveBtn: replyisLiking === true }"
            />
            <span @click="likeFnIn">赞</span>
          </template>
        </van-cell>
      </van-cell-group>
    </van-list>
    <!-- 底部回复按钮 -->
    <van-tabbar class="bottomBtn">
      <van-tabbar-item>
        <van-button class="commentBtn nav_Btn" round @click="isShowPop">
          评论</van-button
        >
        <van-popup
          v-model="showPop"
          position="bottom"
          :style="{ height: '20%' }"
        >
          <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          >
            <template #extra
              ><span class="release" @click="releaseFn">发布</span>
            </template>
          </van-field>
        </van-popup>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  name: 'popUp',
  data () {
    return {
      loading: false,
      finished: false,
      isLiking: '',
      // 评论的ID
      commentId: '',
      // 全部评论的数据
      allComments: [],
      // 回复点赞
      replyisLiking: false,
      // 显示弹框
      showPop: false,
      // 回复内容
      message: ''
    }
  },
  props: {
    commentList: {
      type: Object
    },
    num: {
      type: [String, Number]
    },
    id: {
      type: [String, Number]
    }
  },
  created () {
    // 获取评论id
    this.commentId = this.commentList.com_id
    // 获取点赞数量
    this.isLiking = this.commentList.is_liking
    // 获取文章回复
    this.getArtistComment()
  },
  methods: {
    // 触底事件
    onLoad () {
      this.finished = true
    },
    // 点赞
    async likeFn () {
      console.log(this.id)
    },
    // 获取文章评论回复
    async getArtistComment () {},
    // 评论回复的时间计算
    pubdateData (item) {
      // const art = this.commentList
      const time = dayjs(item).fromNow()
      return time
    },
    // 回复点赞
    async likeFnIn () {},
    // 点击显示弹框
    isShowPop () {
      this.showPop = true
      console.log(this.showPop)
    },
    // 发布回复
    releaseFn () {}
  },
  computed: {
    pubdate () {
      const art = this.commentList
      const time = dayjs(art.pubdate).fromNow()
      return time
    }
  }
}
</script>

<style scoped lang="less">
// 标题
.popInfo {
  :deep(.van-nav-bar__content) {
    background-color: #fff !important;
  }
  :deep(.van-ellipsis) {
    color: #333;
  }
  :deep(.van-nav-bar__title) {
    color: unset;
  }
}

// 评论样式
:deep(.cellGroup) {
  padding: 30px !important;
  border: 0 !important;
}
:deep(.van-cell) {
  border-bottom: 1px solid transparent !important;
}
.comment {
  margin-top: 40px;
  :deep([class*='van-hairline']::after) {
    border-top: 0;
  }
  :deep(.van-cell__title) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 30px;
    > span:nth-child(1) {
      color: #406599;
    }
  }
  :deep(.van-cell-group) {
    margin: 0;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 0;
    }
  }
  :deep(.van-cell__label) {
    margin: 0;
    .commentInfo {
      margin: 30px 0;
      color: #333;
    }
  }
}
:deep(.huifuBtn) {
  margin-left: 48px;
  height: 48px;
  color: #333;
  border-radius: 24px;
}
:deep(.commentTime) {
  display: flex;
  align-items: center;
  color: #333;
}

// 底部按钮
.bottomBtn {
  .van-tabbar-item {
    border-top: 1px solid #f5f6f8;
  }
  .commentBtn {
    border: 1px solid #f5f6f8;
  }
  .nav_Btn {
    width: 500px;
    margin-bottom: 8px;
  }
}
.loveBtn {
  color: red;
}
:deep(.van-cell__title) {
  margin-top: 20px;
}
.allInfo {
  padding-bottom: 0 !important;
}
</style>
