<template>
  <div>
    <!-- 渲染无图片 -->
    <van-cell
    v-if="articleInfo.cover.type ===0"
    :title="articleInfo.title"
    :label="articleDesc"
    :to="`/article/${articleInfo.art_id}`"
     @click="getArt"/>

       <!-- 渲染一张图片 -->
    <van-cell
    v-if="articleInfo.cover.type ===1"
    :title="articleInfo.title"
    :label="articleDesc"
    :to="`/article/${articleInfo.art_id}`"
    @click="getArt1">
    <van-image
    width="3rem"
    height="2rem"
    :src="articleInfo.cover.images[0]"
    />
    </van-cell>

       <!-- 渲染三张图片 -->
    <van-cell
    v-if="articleInfo.cover.type ===3"
    :title="articleInfo.title"
    :to="`/article/${articleInfo.art_id}`"
     @click="getArt2">
    <template #label>
        <div>
        <van-image
        v-for="(item,index) in articleInfo.cover.images"
        :key="index"
         width="2.7rem"
         height="2rem"
         style="margin-right:10px"
         :src="item"
        />
        <br>
         <span>{{articleDesc}}</span>
        </div>
    </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  name: 'Articleitem',
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleDesc () {
      const art = this.articleInfo
      const relativeTime = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${relativeTime}`
    }
  },
  methods: {
    getArt () {
      this.$store.commit('setId', this.articleInfo.art_id)
    },
    getArt1 () {
      this.$store.commit('setId', this.articleInfo.art_id)
    },
    getArt2 () {
      this.$store.commit('setId', this.articleInfo.art_id)
    }
  }

}
</script>

<style>

</style>
