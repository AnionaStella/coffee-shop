<template>
  <div>
    <h2>Control Panel</h2>
    <h3 @click="toggle('Stock')">Stock Levels</h3>
    <h3 @click="toggle('Orders')">Orders</h3>
    <h3 @click="toggle('TopProducts')">TopProducts</h3>
    <Stock id="stock" v-if="toggleStock"></Stock>
    <Orders id="orders" v-if="toggleOrders"></Orders>
    <TopProducts id="topProducts" v-if="toggleTopProducts"></TopProducts>
  </div>
</template>

<script>
import Stock from "@/components/Stock.vue";
import Orders from "@/components/Orders.vue";
import TopProducts from "@/components/TopProducts.vue";

export default {
  components: {
    Orders,
    Stock,
    TopProducts
  },
  data() {
    return {
      toggleStock: true,
      toggleOrders: false,
      toggleTopProducts: false
    };
  },
  methods: {
    toggle(category) {
      if (category == "Stock") {
        this.toggleStock = true;
        this.toggleOrders = false;
        this.toggleTopProducts = false;
      } else if (category == "Orders") {
        this.toggleStock = false;
        this.toggleOrders = true;
        this.toggleTopProducts = false;
      } else if (category == "TopProducts") {
        this.toggleStock = false;
        this.toggleOrders = false;
        this.toggleTopProducts = true;
      }
    }
  },
  name: "ControlPanel"
};
</script>

<style scoped>
h2 {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 1em;
}

h3 {
  background-color: rgba(95, 58, 43, 0.4);
  border-radius: 12px;
  color: rgb(95, 58, 43);
  cursor: pointer;
  font-size: 1.4em;
  font-weight: bold;
  height: 2.5em;
  margin: 2em 1em 2em 2em;
  /* margin-left: 20vw; */
  padding: 0.5em 0;
  width: 20vw;
}

h3:hover {
  background-color: rgba(95, 58, 43, 0.849);
  color: rgb(233, 223, 223);
}

div {
  height: 95vh;
}

#stock,
#orders {
  height: 75vh;
  overflow-y: scroll;
  position: absolute;
  left: 17vw;
  top: 25vh;
}

/*----style scrollbar- !does not work for firefox!----*/
#stock::-webkit-scrollbar,
#orders::-webkit-scrollbar {
  width: 0.5em;
}

#stock::-webkit-scrollbar-button,
#orders::-webkit-scrollbar-button {
  background: #888;
}

#stock::-webkit-scrollbar-track-piece,
#orders::-webkit-scrollbar-track-piece {
  background: #ccc;
}

#stock::-webkit-scrollbar-thumb,
#orders::-webkit-scrollbar-thumb {
  background: rgb(95, 58, 43);
}
</style>