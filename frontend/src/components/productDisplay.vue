<template>
  <div id="categoryProducts">
    <h1>{{ title }} products</h1>

    <section class="display">
      <div v-for="product in this.products" :key="product.id" :id="product.id" class="product">
        <p>
          <img :src="'http://localhost:3000/images/' + product.image" alt="product image" />
        </p>
        <p>{{product.name}}</p>
        <p>{{product.weight}} {{product.unit}}</p>
        <p>{{product.price}} kr</p>
        <quantityButton :myProduct="product" />
      </div>
    </section>
  </div>
</template>
<script>
import quantityButton from "@/components/quantityButton.vue";

export default {
  created() {
    fetch(`http://localhost:3000/products/${this.$route.params.category}`)
      .then(response => response.json())
      .then(result => {
        this.products = result;
      });
  },

  updated() {
    document.title =
      this.$route.params.category + " " + "Products" + " " + "|| Coffee World";
  },
  data() {
    return {
      title: this.$route.params.category,
      products: null
    };
  },
  name: "productDisplay",
  components: {
    quantityButton
  }
};
</script>

<style scoped>
.display {
  display: grid;
  grid-template-columns: auto auto auto;
}
.product {
  padding: 1em;
  margin: 1em;
  border: 1px solid rgb(85, 23, 14);
  border-radius: 0.5em;
  box-shadow: 1px 3px rgba(63, 42, 39, 0.5);
  background-color: white;
}

.product div,
p {
  margin-bottom: 0.5em;
}

.display img {
  height: 80px;
}

#categoryProducts {
  height: 100%;
}

h1 {
  font-size: 2em;
  font-weight: bold;
}

@media screen and (max-width: 425px) {
  .display {
    grid-template-columns: auto auto;
  }

  h1 {
    font-size: 1em;
  }
}
</style>
