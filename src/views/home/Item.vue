<template>
      <div class="items">
        <div
          class="items-item"
          v-for="item in itemList"
          :key="item.id"
        >
          <img class="items-item-img" :src="item.imgUrl" />
          <p class="items-item-tect">{{item.text}}</p>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Item',
  setup () {
    const itemList = [
      {
        id: '1',
        imgUrl: require('../../assets/it1.png'),
        text: '商品秒杀'
      },
      {
        id: '2',
        imgUrl: require('../../assets/it2.png'),
        text: '超市便利'
      },
      {
        id: '3',
        imgUrl: require('../../assets/it3.png'),
        text: '拼团抢购'
      },
      {
        id: '4',
        imgUrl: require('../../assets/it4.png'),
        text: '手机数码'
      },
      {
        id: '5',
        imgUrl: require('../../assets/it5.png'),
        text: '家用电器'
      },
      {
        id: '6',
        imgUrl: require('../../assets/it6.png'),
        text: '免费水果'
      },
      {
        id: '7',
        imgUrl: require('../../assets/it7.png'),
        text: '超级会员'
      },
      {
        id: '8',
        imgUrl: require('../../assets/it8.png'),
        text: '签到有礼'
      },
      {
        id: '9',
        imgUrl: require('../../assets/it9.png'),
        text: '领券中心'
      },
      {
        id: '10',
        imgUrl: require('../../assets/it10.png'),
        text: '更多频道'
      }
    ]
    return { itemList }
  }
}
</script>
<style lang="scss" scoped>
.items {
    width: 100%;
    height: 60px;
    // display: flex;
    .items-item {
      margin-top: 10px;
      margin-left: 15px;
      // flex: 1;
      float: left;
      text-align: center;
      height: 60px;
      .items-item-img {
        margin-left: 5px;
        width: 50px;
        height: 50px;
      }
      .items-item-text {
        font-size: 10px;
      }
    }
  }
  .items2 {
    margin-top: 10px;
    width: 100%;
    height: 60px;
    display: flex;
    .items-item {
      // margin: 0px auto;
      text-align: center;
      flex: 1;
      height: 100%;
      .items-item-img {
        margin-left: 5px;
        width: 50px;
        height: 50px;
      }
      .items-item-text {
        font-size: 10px;
      }
    }
  }
</style>
