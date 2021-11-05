<template>
  <div class="sales">附近商家</div>
  <!-- router-link 最终会在页面生成a链接 -->
  <router-link
    v-for="item in saleList"
    :key="item._id"
    :to="`/shop/${item._id}`"
  >
    <ShopInfo :item="item" />
  </router-link>
</template>
<script>
import { ref } from "vue";
import { get } from "../../untils/request";
import ShopInfo from "../../components/ShopInfo";
//读取附近商家信息
const useSaleListEffect = () => {
  const saleList = ref([]);
  const getsaleList = async () => {
    const result = await get("/api/user/hot-list");
    if (result.errno === 0 && result.data.length) {
      saleList.value = result.data;
      // console.log(result.data);
      if(result.data===1){
      }
    }
  };
  return { saleList, getsaleList };
};
export default {
  name: "Sale",
  components: { ShopInfo },
  setup() {
    const { saleList, getsaleList } = useSaleListEffect();
    getsaleList();
    return { saleList };
  },
};
</script>
<style lang="scss" scoped>
.sales {
  margin-top: 100px;
  font-size: 15px;
  // line-height: 20px;
  font-weight: 800;
}
</style>
