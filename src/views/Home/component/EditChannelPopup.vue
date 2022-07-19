<template>
<van-popup
 v-model="isShow" position="bottom"
:style="{ height: '97%' }"
 closeable close-icon-position="top-left">
 <div class="popupMain">
<div class="my-channel">
    <van-cell title="我的频道">
        <van-button size="small" round class="edit-btn"
        @click="isEdit = !isEdit">{{isEdit ? '完成':'编辑'}}</van-button>
    </van-cell>
    <!-- 我的频道 -->
    <van-grid :border="false" gutter="10px">
   <van-grid-item v-for="(item,index) in  myChannels"
   :key="item.id" :text="item.name"
   :class="{'active-channel':item.name ==='推荐'}"
   @click="onClickMychannel(item,index)"
   >
    <template #icon>
        <van-icon name="cross" v-show="isEdit && item.name !=='推荐'"></van-icon>
    </template>
    </van-grid-item>
   </van-grid>
</div>
<!-- 推荐频道 -->
<div class="recommend-channel">
  <van-cell title="推荐频道"></van-cell>
    <van-grid :border="false" gutter="10px">
   <van-grid-item v-for="item in recommendChannels" :key="item.id"
   :text="item.name" icon="plus" @click="addMychannel(item)"></van-grid-item>
   </van-grid>
</div>
 </div>
 </van-popup>
</template>

<script>
import { getAllMyChannels } from '@/api/channel'
export default {
  name: 'EditChannelPopup',
  data () {
    return {
      isShow: false,
      allMyChannels: [],
      // 用于标记是否处于编辑状态
      isEdit: false
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getAllMyChannels()
  },
  methods: {
    async getAllMyChannels () {
      const { data } = await getAllMyChannels()
      console.log(data)
      this.allMyChannels = data.data.channels
    },
    onClickMychannel (item, index) {
      // 边缘情况的判断
      if (this.isEdit && item.name !== '推荐') {
        // 删除
        return this.$emit('del-mychannel', item.id)
      }
      if (!this.isEdit) {
        // 关闭弹层，切换
        this.isShow = false
        this.$emit('changeMychannel', index)
      }
    },
    addMychannel (item) {
      this.$emit('add-Mychannel', { ...item })
    }
  },
  computed: {
    recommendChannels () {
      // 数组的 filter 方法:遍历数组,把符合条件的元素存储到新数组中并返回
      return this.allMyChannels.filter((item) => {
        // 数组的 find 方法: 遍历数组,把符合条件的元素返回,有符合的返回元素，不符合的是underfined
        // const result = this.myChannels.find(ele => ele.id === item.id)
        // if (result) {
        //   return false
        // } else {
        //   return true
        // }
        return !this.myChannels.find(ele => ele.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.active-channel{
  :deep(.van-grid-item__text){
    color:red
  }
}
.popupMain{
    padding-top: 100px;
    //按钮的样式
    .edit-btn{
        color:red;
        padding:0 30px;
        height: 48px;
        border:0.02667rem solid red
    }
    //我的频道样式
    .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      background-color: #eee;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 16px;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      background-color: #eee;
      padding:30px 6px;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
