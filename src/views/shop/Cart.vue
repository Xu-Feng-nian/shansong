<template>
<div class="mask" v-if="showCart"></div>
  <div class="cart">
    <div class="product" v-if="showCart">
      <div class="product__header">
        <div
          class="product__header__all"
          @click="() => setCartItemsChecked(shopId)"
        >
          <span
            class="product__header__icon iconfont"
            v-html="allChecked ? '&#xe629;' : '&#xe6c1;'"
          >
          </span>
          全选
        </div>
        <div
          class="product__header__clear"
          @click="() => cleanCartProducts(shopId)"
        >
          清空购物车
        </div>
      </div>
      <div v-for="item in productList" :key="item._id">
        <div class="product__item" v-if="item.count > 0">
          <div
            class="iconfont product__item__checked"
            v-html="item.check ? '&#xe629;' : '&#xe6c1;'"
            @click="
              () => {
                changeCartItemChecked(shopId, item._id);
              }
            "
          ></div>
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{ item.price }}
              <span class="product__item__origin"
                >&yen;{{ item.oldPrice }}</span
              >
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, -1);
                }
              "
              >-</span
            >
            {{ item.count || 0 }}
            <span
              class="product__number__plus"
              @click="
                () => {
                  changeCartItemInfo(shopId, item._id, item, 1);
                }
              "
              >+</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="https://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/34088a7505729ed54cdfcf1ee9c3d15d.png"
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{ price }}</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>
<script>
import {computed,ref} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {useCommonCartEffect} from './commonCartEffect'
//获取购物车商品的逻辑处理
const useCartEffect = (shopId)=>{
  const {changeCartItemInfo} = useCommonCartEffect();
  const store = useStore();
  const cartList = store.state.cartList
  //计算数量
  const total = computed(()=>{
    const productList = cartList[shopId]
    // console.log(productList)
    let count = 0
    if(productList){
      for( let i in productList){
        const product = productList[i]
        if(product.check){
          count+=product.count
        }
      }
    }
    return count
  })
  //计算总价
  const price =computed(()=>{
    const productList = cartList[shopId]
    let count = 0
    if(productList){
      for( let i in productList){
        const product = productList[i]
        if(product.check){
          // 反选的信息要做一下判断
          count += (product.count*product.price)
        }
      }
    }
    return count.toFixed(2)
  })
  //计算购物车展示的内容
  const productList = computed(() => {
      const productList = cartList[shopId] || []
      return productList
  })
  //计算全选还是没全选
  const allChecked = computed(()=>{
    const productList = cartList[shopId];
    let result = true;
    if(productList){
      for(let i in productList){
        const product = productList[i]
        if(product.count > 0 && !product.check){
          result = false
        }
      }
    }
    // console.log(result);
    return result
  })
  //选择购物车中的内容
  const changeCartItemChecked = (shopId,productId)=>{
    store.commit('changeCartItemChecked',{shopId,productId})
  }
  //清空购物车
  const cleanCartProducts = (shopId)=>{
    store.commit('cleanCartProducts',{shopId})
  }
  //全选功能
  const setCartItemsChecked = (shopId)=>{
    store.commit('setCartItemsChecked',{shopId})
  }
  return {
    total,price,productList,allChecked,
    changeCartItemChecked,changeCartItemInfo,
    cleanCartProducts,setCartItemsChecked
    }
}
export default {
  name: 'Cart',
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const showCart = ref(false);
    const handleCartShowChange = ()=>{
      showCart.value = ! showCart.value
    }
    const { 
      total, price, productList, setCartItemsChecked,allChecked,
      changeCartItemInfo, changeCartItemChecked ,cleanCartProducts} = useCartEffect(shopId)
    return { 
      total, price, shopId, productList, showCart,
      changeCartItemInfo, changeCartItemChecked,
      cleanCartProducts,setCartItemsChecked,allChecked,
      handleCartShowChange
      }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
.mask{
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(170, 170, 170, 0.568);
  z-index: 1;
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}
.product {
  overflow-y: scroll;
  flex: 1;
  height: 100%;
  max-height: 200px;
  background: #fff;
  &__header {
    margin-top: 5px;
    width: 100%;
    height: 30px;
    &__all {
      height: 30px;
      line-height: 30px;
      float: left;
      margin-left: 20px;
    }
    &__clear {
      margin-right: 20px;
      height: 30px;
      line-height: 30px;
      float: right;
    }
  }
  &__item {
    display: flex;
    padding: 5px 0;
    margin: 5px 10px;
    margin-left: 20px;
    border-bottom: 2px solid #f1f1f1;
    &__checked {
      margin-right: 20px;
      margin-top: 20px;
    }
    &__img {
      width: 60px;
      height: 60px;
      margin-right: 10px;
    }
    &__title {
      margin-top: 10px;
      line-height: 15px;
      font-size: 10px;
      color: #333;
    }
    &__price {
      margin-top: 15px;
      line-height: 3.2px;
      font-size: 2.24px;
      color: #e93b3b;
    }
    &__yen {
      font-size: 1.92px;
    }
    &__origin {
      margin-left: 2px;
      line-height: 4px;
      font-size: 2px;
      color: #999;
      text-decoration: line-through;
    }
    .product__number {
      width: 80px;
      height: 20px;
      // background: #e93b3b;
      text-align: center;
      margin-top: 30px;
      margin-left: 103px;
      font-size: 17px;
      line-height: 30px;
      &__minus {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        background: #b6b6b68c;
        border-radius: 10px;
      }
      &__plus {
        display: inline-block;
        line-height: 20px;
        width: 20px;
        height: 20px;
        background: #b6b6b68c;
        border-radius: 10px;
      }
    }
  }
}
.check {
  display: flex;
  height: 60px;
    background: #ffffff;
  border-top: 1px solid $content-bgColor;
  line-height: 60px;
  &__icon {
    position: relative;
    width: 59px;
    &__img {
      display: block;
      margin: 0 auto;
      width: 40px;
      height: 59px;
    }
    &__tag {
      position: absolute;
      right: 5px;
      top: 2px;
      width: 20px;
      height: 20px;
      line-height: 20px;
      background-color: $hightlight-fontColor;
      border-radius: 50%;
      font-size: 20px;
      text-align: center;
      color: #fff;
      transform: scale(0.5);
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: 15px;
    &__price {
      line-height: 15px;
      color: $hightlight-fontColor;
      font-size: 15px;
    }
  }
  &__btn {
    width: 80px;
    background-color: #4fb0f9;
    text-align: center;
    color: #fff;
    font-size: 12px;
  }
}
</style>