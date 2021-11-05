<template>
  <div :class="{ sale: true, 'sale--border': hideBorder ? false : true }">
    <div class="sales-t">
      <img :src="item.imgUrl" class="sales-t-left" />
      <div class="sales-t-right">
        <div class="title">{{ item.name }}</div>
        <div class="text">
          <span>月售: {{ item.sales }}</span>
          <span>起送: {{ item.expressLimit }}</span>
          <span>基础运费: {{ item.expressPrice }}</span>
        </div>
        <div class="foo">{{ item.slogan }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShopInfo",
  props: ["item", "hideBorder"],
};
</script>
<style lang="scss" scoped>
.sale {
  height: 160px;
  // border-bottom: 1px solid #ccc;
  .sales-t {
    display: flex;
    margin-top: 20px;
    height: 150px;
    .sales-t-left {
      // flex: 1;
      // background: cyan;
      width: 160px;
      height: 150px;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .sales-t-right {
      flex: 2;
      height: 150px;
      display: flex;
      flex-direction: column;
      .title {
        margin-left: 5px;
        flex: 1;
        height: 50px;
        line-height: 50px;
      }
      .text {
        margin-left: 10px;
        flex: 1;
        height: 50px;
        line-height: 50px;
        display: flex;
        flex-direction: column;
        span {
          flex: 1;
          height: 10px;
          line-height: 10px;
        }
      }
      .foo {
        margin-left: 5px;
        flex: 1;
        height: 50px;
        line-height: 50px;
      }
    }
  }
}
.sale--border {
  border-bottom: 1px solid #ccc;
}
</style>