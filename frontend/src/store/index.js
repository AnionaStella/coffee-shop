import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myBasket: []
  },
  mutations: {
    addProduct(state, targetProduct) {
      let index = state.myBasket.findIndex(
        product => product.id === targetProduct.id
      );
      if (index >= 0) {
        if (targetProduct.productQuantity === 0) {
          state.myBasket.splice(index, 1);
        } else {
          Vue.set(state.myBasket, index, targetProduct);
        }
      } else if (targetProduct.productQuantity !== 0) {
        state.myBasket.push(targetProduct);
      }
    }
  },
  actions: {},
  modules: {}
})