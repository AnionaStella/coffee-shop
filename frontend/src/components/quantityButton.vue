<template>
  <div>
    <b-button type="is-danger" @click="remove">-</b-button>
    <span>{{ quantity }}</span>
    <b-button type="is-success" @click="add">+</b-button>
  </div>
</template>

<script>
export default {
  name: "quantityButton",
  data() {
    return {
      quantity: this.myQuantity,
      product: this.myProduct
    };
  },
  methods: {
    add() {
      console.log(this.product);
      this.quantity++;
      this.product.productQuantity = this.quantity;
      this.$store.commit("addProduct", this.product);
    },
    remove() {
      if (this.quantity > 0) {
        this.quantity--;
        this.product.productQuantity = this.quantity;
        this.$store.commit("addProduct", this.product);
      }
    }
  },

  props: {
    myProduct: Object,
    myQuantity: Number
  }
};
</script>

<style scoped>
b-button {
  padding: 1em;
}
span {
  font-size: 1.1em;
  padding: 0.5em;
}
</style>