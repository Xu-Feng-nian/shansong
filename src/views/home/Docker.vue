<template>
  <div class="btm">
    <span
    v-for="item in dockerList"
    :key="item.text"
    class="btm-item">
      <div class="iconfont" v-html="item.icon"></div>
      <p>{{item.text}}</p>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  setup () {
    const dockerList = [
      { icon: '&#xe64f;', text: '首页' },
      { icon: '&#xe6a7;', text: '分类' },
      { icon: '&#xe718;', text: '圈子' },
      { icon: '&#xe73d;', text: '购物车' },
      { icon: '&#xe8a0;', text: '我的' }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
.btm {
  position: fixed;
  display: flex;
  // float: left;
  bottom: 0;
  // top: 500px;
  width: 100%;
  height: 70px;
  // font-size: 1.25rem;
  background: white;
  .btm-item {
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: 2.5rem;
    }
  }
}
</style>
