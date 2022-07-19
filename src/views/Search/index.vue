<template>
  <div>
    <!-- 头部搜索框 -->
    <form action="/">
    <van-search
    v-model="keywords"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="backToPropage"
    @focus="visibleSearchSuggestion"
  />
</form>
 <!-- <SearchHistory></SearchHistory>
 <SearchSuggestion></SearchSuggestion>
 <SearchResult></SearchResult> -->
 <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchHistory from '@/views/Search/components/SearchHistory.vue'
import SearchResult from '@/views/Search/components/SearchResult.vue'
import SearchSuggestion from '@/views/Search/components/SearchSuggestion.vue'
export default {
  data () {
    return {
    // 搜索关键词
      keywords: '',
      isShowSearchResult: false
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  computed: {
    componentName () {
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }

      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    onSearch () {
      this.isShowSearchResult = true
    },
    backToPropage () {
      this.$router.go(-1)
    },
    visibleSearchSuggestion () {
      this.isShowSearchResult = false
    }
  }
}
</script>

<style scoped less="less">
.van-search{
background-color: #3296fa;
}
.van-search__action{
    color:#fff
}
</style>
