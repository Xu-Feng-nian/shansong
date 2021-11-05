<template>
<div class="wrapper">
  <div class="search">
    <div class="iconfont" @click="handelBackClick">&#xe64f;</div>
    <div class="search__content">
      <span class="iconfont">&#xe651;</span>
      <span class="search__text">波霸奶茶</span>
    </div>
  </div>
  <ShopInfo :item="item" :hideBorder="true" />
  <Content/>
  <Cart/>
</div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import ShopInfo from "../../components/ShopInfo";
import { get } from "../../untils/request";
import Content from "./Content";
import Cart from "./Cart"
//useRoute 和useRouter的区别
//跳转useRouter
//获取useRoute
//获取当前店铺的信息
const useShopInfoEffect = () => {
  const route = useRoute();
  const data = reactive({ item: {} });
  const getItemData = async () => {
    // console.log(data);
    const result = await get(`/api/shop/${route.params.id}`);
    // console.log(result);
    if (result.errno === 0 && result.data) {
      data.item = result.data;
      // console.log(data.item);
    }
  };
  const { item } = toRefs(data);
  return { item, getItemData };
};
const useBackEffect = ()=>{
    const router = useRouter();
    const handelBackClick = ()=>{
        router.back();
    }
    return handelBackClick
}
export default {
  name: "Shop",
  components: { ShopInfo, Content, Cart },
  setup() {
    const { item, getItemData } = useShopInfoEffect();
    const handelBackClick = useBackEffect();
    getItemData();
    return { item,handelBackClick };
  },
};
</script>
<style scoped lang="scss">
@import '../../style/viriables.scss';
    .wrapper{
        padding:0 5px;
    .search{
        display: flex;
        margin: 5px 5px;
        line-height: 20px;
        .iconfont{
            // margin-left: 20px;
            font-size: 16px;
        }
        &__content{
            margin-left: 10px;
            display: flex;
            flex:1;
            background:$content-bgColor;
            border-radius: 20px;
            .iconfont{
                margin: 0px 20px;
            }
        }
    }
}
</style>