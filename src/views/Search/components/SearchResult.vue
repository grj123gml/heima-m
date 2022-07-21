<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title"/>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      page: 1, // 当前搜索结果的页码
      perPage: 10,
      loading: false,
      finished: false
    }
  },
  created () {
    this.getSearchResult()
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult(this.keywords, this.page, this.perPage)
        console.log(res)
        this.list = res.data.data.results
      } catch (error) {
        console.log(error)
      }
    },
    async onLoad () {
      this.page++
      const res = await getSearchResult(this.keywords, this.page, this.perPage)
      this.list.push(...res.data.data.results)
      this.loading = false
      if (res.data.data.results.length) {
        this.page++ // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
      }
    }
  }
}
</script>

<style>

</style>
