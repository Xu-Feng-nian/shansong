import Vuex from 'vuex'

export default Vuex.createStore({
  state: {
    cartList:{
    //   //第一层商铺的ID
    //   shopId:{
    //     //第二层商品ID
    //     //第二层的内容就是商品的内容 和 购物车中的数量
    //     productId:{
    //       _id:'1',
    //       name:'波霸奶茶',
    //       imgUrl:'https://p0.meituan.net/xianfu/677a37e4d54e7c0c1cd52eb96d18cac1762716.jpg@300w',
    //       sales:15,
    //       price:3.6,
    //       oldPrice:9.6,
    //       count:0
    //     }
    //   }

    }
  },
  mutations: {
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo } = payload
      let shopInfo = state.cartList[shopId]
      if(!shopInfo) { shopInfo = {} }
      let product = shopInfo[productId]
      if(!product) {
        product = productInfo
        product.count = 0
      }
      product.count = product.count + payload.num
      if(payload.num > 0) { product.check = true }
      if(product.count < 0) { product.count = 0 }
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId][productId]
      product.check = !product.check
    },
    cleanCartProducts(state, payload){
      const {shopId} = payload
      state.cartList[shopId] = {}
    },
    setCartItemsChecked(state, payload){
      const {shopId} = payload
      const products = state.cartList[shopId]
      if(products){
        for(let key in products){
          const product = products[key]
          product.check =true
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
