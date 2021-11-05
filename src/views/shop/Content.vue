<template>
  <div class="content">
    <div class="category">
      <div
        :class="{'category__item': true, 'category__item--active': currentTab === item.tab}"
        v-for="item in categories"
        :key="item.name"
        @click="() => handleTabClick(item.tab)"
      >
        {{item.name}}
      </div>
    </div>
    <div class="product">
      <div
        class="product__item"
        v-for="item in list"
        :key="item._id"
      >
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售 {{item.sales}} 件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span 
            class="product__number__minus"
            @click="() => { changeCartItemInfo(shopId, item._id, item,-1) }"
          >-</span>
            {{cartList?.[shopId]?.[item._id]?.count || 0}}
          <span
            class="product__number__plus"
            @click="() => { changeCartItemInfo(shopId, item._id, item,1) }"
          >+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '../../untils/request'
import {useCommonCartEffect} from './commonCartEffect'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name:'秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit'}
]

// Tab 切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick}
}

// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if(result?.errno === 0 && result?.data?.length) {
      content.list = result.data;
    }
  }
  watchEffect(() => { getContentData() })
  const { list } = toRefs(content)
  return { list }
}

export default {
  name: 'Content',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { changeCartItemInfo,cartList } = useCommonCartEffect()
    return {
      categories, currentTab, handleTabClick, list,
      shopId, changeCartItemInfo,cartList
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 200px;
  bottom: 60px;
}
.category {
  overflow-y: scroll;
  height: 100%;
  width: 70px;
  background: #f5f5f5;
  &__item {
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #333;
    &--active {
      background: #fff;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    display: flex;
    padding: 5px 0;
    margin: 0 10x;
    border-bottom: 2px solid #f1f1f1;
    &__img {
      width: 60px;
      height: 60px;
      margin-right: 10px;
    }
    &__title {
      margin-top: 5px;
      line-height: 15px;
      font-size: 10px;
      color: #333;
    }
    &__sales {
      margin: 10px 0;
      font-size: 10px;
      color: #333;
    }
    &__price {
      margin: 0;
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
      margin-left: 70px;
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
</style>