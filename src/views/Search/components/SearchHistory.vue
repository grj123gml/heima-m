<template>
  <div>
  <van-cell title="搜索历史">
    <template #right-icon v-if="isShowDel">
    <van-icon name="delete-o" @click="showDel"/>
    </template>
    <template #default v-else>
     <span @click="$parent.history = []">全部删除</span>
     <span style="margin-left:7px" @click="showDel">完成</span>
    </template>
  </van-cell>
  <van-cell-group>
  <van-cell v-for="(item,index) in history" :key="index" :title="item">
  <template #right-icon>
   <van-icon name="close" v-show="!isShowDel" @click="delHistory(item)"/>
  </template>
  </van-cell>
</van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowDel: true
    }
  },
  props: {
    history: {
      type: Array,
      required: true
    }
  },
  created () {
    this.showList()
  },
  methods: {
    showDel () {
      this.isShowDel = !this.isShowDel
    },
    showList () {
      // 给父组件里的history进行去重再渲染
      this.$parent.history = [...new Set(this.$parent.history)]
    },
    delHistory (val) {
      this.$parent.history = this.$parent.history.filter(ele => ele !== val)
    }
  }

}
</script>

<style>

</style>
