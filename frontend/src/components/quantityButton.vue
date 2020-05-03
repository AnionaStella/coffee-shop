<template>
  <div>
    <b-button type="is-danger" @click="remove">-</b-button>
    <span>{{ quantity }}</span>
    <b-button type="is-success" @click="add">+</b-button>
    <b-button type="is-primary" @click="addToBasket">Add to Basket</b-button>
  </div>
</template>

<script>
export default {
  name: "quantityButton",
  data() {
    return {
      quantity: this.myQuantity
    };
  },
  methods: {
    addToBasket() {
      if (this.quantity >= 0) {
        this.$emit("addProduct", this.quantity);
      }
    },
    add() {
      this.quantity++;
    },
    remove() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    }
  },

  props: {
    myQuantity: Number
  }
};
</script>

<style scoped>
span {
  padding: 0.5em;
}
</style>