<template>
  <van-cell-group inset>
    <van-cell :title="(commentList && commentList.aut_name) || '暂无'">
      <template #icon>
        <img :src="(commentList && commentList.aut_photo) || '暂无'" alt="" />
      </template>
      <template #label>
        <div class="commentInfo">
          {{ (commentList && commentList.content) || '暂无' }}
        </div>
        <div class="commentTime">
          <span>{{ pubdate || '暂无' }}</span>
          <van-button class="huifuBtn" @click="isShowComment = true"
            >回复{{ commentList.reply_count }}</van-button
          >
        </div>
      </template>
      <template #default>
        <van-icon
          name="good-job-o"
          :class="{ loveBtn: commentList.is_liking === true }"
        />
        <span @click="likeFn">赞</span>
      </template>
    </van-cell>

    <van-popup
      v-model="isShowComment"
      position="bottom"
      closeable
      close-icon-position="top-left"
      close-icon="arrow-left"
      :style="{ height: '100%' }"
    >
      <!-- 回复评论弹窗组件 -->
      <commentReply
        :commentList="commentList"
        :id="commentList.com_id"
      ></commentReply>
    </van-popup>
  </van-cell-group>
</template>

<script>
import dayjs from '@/utils/dayjs'
import commentReply from '@/views/Article/components/commentReply.vue'
import { addLikeComment, deleteLikeComment } from '@/api/comment.js'
export default {
  name: 'sareItem',
  data () {
    return {
      isShowComment: false
    }
  },
  props: {
    commentList: {
      type: Object
    }
  },
  components: {
    commentReply
  },
  methods: {
    async likeFn () {
      try {
        if (!this.commentList.is_liking) {
          await addLikeComment(this.commentList.com_id)
        } else {
          await deleteLikeComment(this.commentList.com_id)
        }
        this.$toast.success('点赞成功')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
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
.comment {
  margin-top: 40px;
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
.loveBtn {
  color: red;
}
</style>
