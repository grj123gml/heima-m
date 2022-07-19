<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="loadNextPage" success-text="刷新成功">
    <van-list @load="loadNextPage"
    v-model="loading"
    :finished="finished"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
     finished-text="没有更多了">
    <Articleitem
    v-for="item in article"
    :key="item.art_id"
    :articleInfo="item"
    ></Articleitem>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Articleitem from '@/views/Home/component/Articleitem.vue'
import { getArticleList } from '@/api/news'
export default {
  name: 'ArticleList',
  data () {
    return {
      article: [],
      pre_timestamp: '',
      error: false,
      loading: false, // 上拉加载更多的 loading 状态
      finished: false, // 是否加载结束
      refreshing: false // 是否下拉刷新
    }
  },
  components: {
    Articleitem
  },
  props: {
    // 频道id
    id: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () { // 页面一开始，加载第一页数据
      try {
        const { data } = await getArticleList(this.id, +new Date())
        console.log(data)
        this.pre_timestamp = data.data.pre_timestamp // 保存第一次页码
        this.article = data.data.results
      } catch (error) {
        // 获取状态码
        const status = error.response.status

        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('请刷新浏览器重试')
        }
      }
    },
    // 加载下一页数据频道
    async loadNextPage () { // 滚动条触底,加载下一页数据
      try {
        // 模拟错误
        // if (Math.random() < 0.7) {
        //   throw new Error('错误了')
        // }
        if (!this.pre_timestamp) {
          this.finished = true
          return
        }
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        // console.log(data)
        // 将第n页的数据，放在article里
        if (this.refreshing) {
          this.article.unshift(...data.data.results)
        } else {
          this.article.push(...data.data.results)
        }

        // 更新页数
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally { // finally语句一定会执行
        // loading设置为false
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style>

</style>
