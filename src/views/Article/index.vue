<template>
  <!-- 头部 -->
  <div class="body">
    <van-nav-bar
      class="header"
      title="黑马头条"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <div>
      <!-- 标题 -->
      <h1 class="title">{{ Article.title }}</h1>
      <!-- 文章作者信息区域 -->
      <div class="user">
        <!-- 左边头像部分 -->
        <div class="user-left">
          <van-image
            round
            width="36px"
            height="36px"
            :src="Article.aut_photo"
          />
          <div>
            <p>{{ Article.aut_name }}</p>
            <span>{{ time }}</span>
          </div>
        </div>
        <!-- 右边按钮部分 -->
        <div class="user-right">
          <!-- 已关注按钮 -->
          <van-button
            type="default"
            round
            size="small"
            v-if="Article.is_followed"
            @click="addFollowFn"
            >已关注</van-button
          >
          <!-- 未关注按钮 -->
          <van-button type="info" round size="small" v-else @click="addFollowFn"
            >+ 关注</van-button
          >
        </div>
      </div>
    </div>
    <!-- 文章主体区域 -->
    <div class="article-content markdown-body" v-html="Article.content"></div>
    <!-- 分割线 -->
    <van-divider class="divider">正文结束</van-divider>
    <!-- 评论 -->
    <div class="comment">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <getCommentItem
          v-for="(item, index) in commentList"
          :key="index"
          :commentList="item"
        />
      </van-list>
    </div>
    <!-- 底部按钮区域 -->
    <van-tabbar class="bottomBtn">
      <van-tabbar-item class="pinglunBtn" @click="show = true"
        >写评论</van-tabbar-item
      >
      <!-- 评论按钮 -->
      <van-badge class="badge" :content="totalCount">
        <div class="child"><van-tabbar-item icon="comment-o" /></div>
      </van-badge>
      <van-tabbar-item>
        <template #icon>
          <!-- 收藏按钮 -->
          <van-icon
            name="star"
            color="#3296fa"
            v-if="Article.is_collected"
            @click="showCollected"
          />
          <!-- 未收藏按钮 -->
          <van-icon name="star-o" v-else @click="showCollected" />
        </template>
      </van-tabbar-item>
      <!-- 对文章的点赞按钮 -->
      <van-badge
        class="badge"
        v-model="islikeArticle"
        :content="Article.like_count"
      >
        <div class="child">
          <van-tabbar-item icon="good-job-o" @click="likeArticle" />
        </div>
      </van-badge>
      <van-tabbar-item icon="share" @click="showShare = true" />
    </van-tabbar>
    <!-- 写评论框的弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '17%' }">
      <div class="commentpost">
        <van-field
          class="post"
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <span class="but" @click="SendComment">发布</span>
      </div>
    </van-popup>
    <!-- 分享按钮的弹出层 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
import '@/views/Article/news.css'
import dayjs from '@/utils/dayjs'
import getCommentItem from './components/commentsItem.vue'
import {
  getArticleById,
  ArticleCollection,
  deleteArticleCollection
} from '@/api/article.js'
import { getArticleComment, PostComment } from '@/api/comment.js'
import { addFollow, deleteFollow } from '@/api/user.js'
import { addLikeArticle, cancelLikeArticle } from '@/api/news.js'
export default {
  components: {
    getCommentItem
  },
  data () {
    return {
      Article: {},
      loading: false,
      finished: false,
      commentList: [],
      show: false,
      message: '',
      islikeArticle: false,
      commentId: '',
      showShare: false,
      totalCount: 0,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ]
    }
  },
  created () {
    this.getArticle()
    this.getArticleComment()
  },
  methods: {
    // 获取文章列表
    async getArticle () {
      const res = await getArticleById(this.$store.state.ArtId)
      // console.log(res)
      this.Article = res.data.data
    },
    // 获取评论
    async getArticleComment () {
      try {
        const res = await getArticleComment('a', this.$store.state.ArtId)
        console.log(res)
        this.commentList = res.data.data.results
        this.commentId = res.data.data.last_id
        this.totalCount = res.data.data.total_count
      } catch (error) {
        console.log(error)
      }
    },
    // 发布评论
    async getPostComment () {
      try {
        const res = await PostComment(this.$store.state.ArtId, this.message)
        console.log(res)
        this.getArticleComment()
        this.$toast.success('发布成功')
      } catch (error) {
        this.$toast.fail('发布评论失败')
      }
    },
    // 关注用户的点击事件
    async addFollowFn () {
      try {
        // 如果未关注用户，就调用关注用户的接口
        if (!this.Article.is_followed) {
          await addFollow(this.Article.aut_id)
        } else {
          // 如果关注用户，就调用删除用户关注的接口
          await deleteFollow(this.Article.aut_id)
        }
        // 赋值取反更新数据内容
        this.Article.is_followed = !this.Article.is_followed
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    // 收藏文章的点击事件
    async showCollected () {
      try {
        // 如果文章未收藏，就进行收藏
        if (!this.Article.is_collected) {
          await ArticleCollection(this.Article.art_id)
        } else {
          // 如果文章收藏，就取消收藏
          await deleteArticleCollection(this.Article.art_id)
        }
        // 赋值取反更新数据内容
        this.Article.is_collected = !this.Article.is_collected
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    // 点赞文章的点击事件
    async likeArticle () {
      try {
        if (this.islikeArticle) {
          await addLikeArticle(this.Article.art_id)
        } else {
          await cancelLikeArticle(this.Article.art_id)
        }
        this.islikeArticle = !this.islikeArticle
        this.getArticle()
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    // 加载
    async onLoad () {
      try {
        const res = await getArticleComment(
          'a',
          this.$store.state.ArtId,
          this.commentId,
          10
        )
        console.log(res)
        this.loading = false
        this.commentId = res.data.data.last_id
        this.commentList.push(...res.data.data.results)
        if (res.data.data.last_id === res.data.data.end_id) {
          this.loading = true
          this.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 发布点击事件
    SendComment () {
      this.getPostComment()
      this.message = ''
      this.show = false
    }
  },
  computed: {
    // 时间处理
    time () {
      return dayjs(this.Article.pubdate).fromNow()
    }
  }
}
</script>

<style scoped lang="less">
.body {
  padding-top: 95px;
  padding-bottom: 70px;
  //头部
  .van-nav-bar {
    background-color: #3296fa;
    :deep(.van-icon) {
      color: #fff;
    }
  }
  .header {
    :deep(.van-nav-bar__title) {
      color: #fff;
    }
  }
  .title {
    font-size: 0.53333rem;
    padding: 0.66667rem 0.42667rem;
    margin: 0;
    color: #3a3a3a;
  }
  .user {
    display: flex;
    position: relative;
    top: -30px;
    justify-content: space-between;
    // background-color: tomato;
    align-items: center;
    .user-left {
      align-items: center;
      display: flex;
      div {
        margin-left: 10px;
        p {
          position: relative;
          top: 25px;
          font-size: 0.32rem;
          color: #3a3a3a;
        }
        span {
          position: relative;
          top: -18px;
          font-size: 0.30667rem;
          color: #b7b7b7;
        }
      }
    }
    .user-right {
      .van-button--small {
        position: relative;
        top: -14px;
        right: 25px;
        padding: 0px 40px;
        height: 55px;
      }
    }
  }
}
// 分割线
.divider {
  display: flex;
  align-items: center;
  margin: 0.42667rem 0;
  color: #969799;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  border-color: #ebedf0;
  border-style: solid;
  border-width: 0;
  position: relative;
  bottom: 20px;
}

// 评论
.comment {
  margin-top: 40px;
  padding: 0 25px;
  :deep([class*='van-hairline']::after) {
    border-top: 0;
  }
  :deep(.van-cell) {
    padding: 0 !important;
    padding-bottom: 30px !important;
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
.commentpost {
  display: flex;
  box-sizing: border-box;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
  .post {
    background-color: #f5f7f9;
    width: 85%;
  }
  .but {
    position: absolute;
    bottom: 85px;
    left: 670px;
    color: #6ba3d8;
    font-size: 30px;
  }
}

// 底部按钮
.bottomBtn {
  :deep(.van-tabbar-item--active) {
    flex: 3;
  }
  :deep(.pinglunBtn .van-tabbar-item__text) {
    width: 80%;
    display: block;
    font-size: 0.4rem;
    text-align: center;
    line-height: 0.61333rem;
    color: #a7a7a7;
    border-radius: 25px;
    border: 1px solid #f2f2f2;
  }
  .child {
    width: 40px;
    height: 40px;
    background: #f2f3f5;
    border-radius: 4px;
  }
  .badge {
    position: relative;
    top: 30px;
  }
}
</style>
