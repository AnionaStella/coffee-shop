<template>
  <div>
    <div id="stock-nav">
      <h3 :class="{dark:viewAll}" @click="viewAll=!viewAll">
        <!--if class "h3-dark" works then :class="{ dark: viewAll }" -->
        Categories
      </h3>
      <h3 :class="{dark:!viewAll}" @click="viewAll=!viewAll">
        All Products
      </h3>
    </div>

    <div id="stock-item" v-show="viewAll">
      <div>
        <div 
          class="category-name"
          @click ='toggle(alcoholOn)
          setProduct("alcoholic"); 
          alcoholOn = !alcoholOn'
        >
          Alchoholic Products
        </div>
        <div class="indiv-products" v-if="products" v-show='alcoholOn'>
          <CategoryDisplay :products="viewProducts"></CategoryDisplay>
          <div class="close" @click="alcoholOn = false">close</div>
        </div>
      </div>

      <div>
        <div class="category-name" @click="toggle(coffeeOn); coffeeOn= true">Coffee Brew and Beans</div>
        <div class="indiv-products" v-if="allCoffee" v-show="coffeeOn">
          <CategoryDisplay :products="allCoffee"></CategoryDisplay>
          <div class="close" @click="coffeeOn = false">close</div>
        </div>
      </div>

      <div>
        <div class="category-name" @click ='toggle(milkOn); setProduct("sugar"); milkOn=true'>
          Sugar
        </div>
        <div class="indiv-products" v-show='milkOn'>
          <CategoryDisplay :products="viewProducts"></CategoryDisplay>
          <div class="close" @click="milkOn = false">close</div>
        </div>
      </div>

      <div @click ='toggle(sugarOn); setProduct("spice"); sugarOn=true'>
        <div class="category-name">
          Spices
        </div>
        <div class="indiv-products" v-show='sugarOn'>
          <CategoryDisplay :products="viewProducts"></CategoryDisplay>
          <div class="close" @click="sugarOn = false">close</div>
        </div>
      </div>

      <div @click ='toggle(syrupOn) ; setProduct("syrup"); syrupOn = true'>
        <!-- find solution to compute syrupOn = true in 'toggle()' -->
        <div class="category-name">Syrups</div>
        <div class="indiv-products" v-show="syrupOn">
          <CategoryDisplay :products="viewProducts"></CategoryDisplay>
          <div class="close" @click="syrupOn = false">close</div>
        </div>
      </div>
    </div>

    <div id="stock-all" v-show="!viewAll">
      <CategoryDisplay :products="products"></CategoryDisplay>
    </div>
  </div>
</template>

<script>
import CategoryDisplay from "@/components/CategoryDisplay.vue";

export default {
  components: {
    CategoryDisplay
  },
  computed: {
    setClass(viewAll) {
      return this.viewAll ? h3 - dark : nothing;
    }
  },
  created() {
    fetch("http://localhost:3000/products")
      .then(response => response.json())
      .then(result => {
        this.products = result;
        console.log(result);
        this.setCoffee();
      });
  },
  data() {
    return {
      clicked: null,
      products: null,
      alcoholOn: false,
      coffeeOn: false,
      milkOn: false,
      sugarOn: false,
      syrupOn: false,
      viewAll: true,
      allCoffee: null,
      viewProducts: null,
      alcoholic: null
    };
  },
  methods: {
    setCoffee() {
      this.allCoffee = this.products.filter(
        product =>
          product.type === "coffee" ||
          product.type === "espresso" ||
          product.type === "instant coffee"
      );
    },
    setProduct(type) {
      // type = this.products.filter(
      //   product => product.type ===type
      // )
      this.viewProducts = this.products.filter(
        product => product.type === type
      );
    },
    toggle(type) {
      let statuses = [
        (this.alcoholOn = false),
        (this.coffeeOn = false),
        (this.milkOn = false),
        (this.syrupOn = false),
        (this.sugarOn = false)
      ];

      // statuses.forEach( status => {
      //     if (status = type) status = true
      //   else status = false
      // })

      statuses.find(status => {
        if ((status = type)) status = true;
      });
    }
  },
  name: "Stock"
};
</script>

<style scoped>
* {
  color: #000;
}

#stock-nav {
  /* border: 2px solid rgb(85, 23, 14);
  border-radius: 15px; */
  color: #000;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 3em;
  margin: 2em 9vw;
  width: 40em;
}

h3:hover {
  text-decoration-line: underline;
}

.dark {
  background-color: sandybrown;
  border-radius: 15px;
}

h3 {
  font-size: 120%;
  font-weight: bold;
  height: 2.6em;
  padding-top: 0.5em;
  width: 15em;
}

.close {
  margin-bottom: 1em;
  font-weight: bold;
  text-decoration-line: underline;
  text-align: center;
}

#stock-item {
  text-align: left;
}

.category-name {
  font-size: 120%;
  font-weight: bold;
  margin: 0.5em 12vw;
}

.indiv-products {
  margin-left: 0em;
}
</style>
