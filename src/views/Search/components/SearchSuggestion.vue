<template>
  <div>
     <van-cell v-for="(item,index) in highlightDta" :key="index" @click="searchFn(index)">
      <template #icon>
        <van-icon name="search" class="seaarch-icon"/>
      </template>
      <template #title>
       <span v-html="item"></span>
      </template>
     </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  watch: {
    // keywords: 'getSearchSuggestion'
    keywords: {
      immediate: true,
      handler () {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    async getSearchSuggestion () {
      try {
        const res = await getSearchSuggestion(this.keywords)
        // console.log(res)
        if (res.data.data.options.length === 0) {
          this.$toast.fail('没有相关搜索建议')
        }
        this.suggestions = res.data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    },
    searchFn (index) {
      // console.log(this.suggestions[index])
      this.$parent.keywords = this.suggestions[index]
      this.$parent.isShowSearchResult = true
      this.$parent.history.unshift(this.suggestions[index])
      // console.log(this.$parent.history)
    }
  },
  computed: {
    highlightDta () {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) => str.replace(reg, (match) => `<span style="color:red">${match}</span>`))
    }
  }
}
</script>

<style scoped lang="less">
.seaarch-icon{
  padding-top: 10px;
}
</style>
