<template>
  <div id="basket">
    <h1>My Basket</h1>
    <section id="myBasket">
      <div id="myBasketDiv">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Price per unit</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Remove/Add</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in $store.state.myBasket" :key="product.id" id="item">
              <td>
                <img :src="'http://localhost:3000/images/' + product.image" alt="product image" />
              </td>
              <td>{{product.name}}</td>
              <td>{{product.type}}</td>
              <td>{{product.weight}} {{product.unit}}</td>
              <td>{{product.price}}</td>
              <td>{{product.productQuantity}}</td>
              <td>{{parseFloat(product.productQuantity * product.price).toFixed(2)}}</td>
              <td>
                <quantityButton :myProduct="product" :myQuantity="product.productQuantity" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-for="product in $store.state.myBasket" :key="product.id" id="itemSmall">
        <p>
          <img :src="'http://localhost:3000/images/' + product.image" alt="product image" />
        </p>
        <p>{{product.name}}</p>
        <p>{{product.type}}</p>
        <p>{{product.weight}} {{product.unit}}</p>
        <p>{{product.price}} kr</p>
        <p>Amount in basket: {{product.productQuantity}}</p>
        <quantityButton
          :myProduct="product"
          :myQuantity="product.productQuantity"
          id="quantityButton"
        />
      </div>
    </section>

    <div
      class="total"
      v-if="basket.length > 0"
    >Total price: {{parseFloat(totalPrice).toFixed(2)}} kr</div>
    <div class="total">{{ successMessage }}</div>

    <div v-if="!buttonText">
      <div class="customer-details">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required v-model="name" />
      </div>
      <div class="customer-details">
        <label for="address">Shipping Address:</label>
        <textarea
          type="text"
          id="address"
          name="address"
          required
          rows="4"
          cols="30"
          v-model="address"
        ></textarea>
      </div>

      <div id="confirm">
        <div>Confirm Your Personal Details</div>
        <div>Name: {{ name }}</div>
        <div>
          <div>Address: {{ address }}</div>
        </div>
      </div>
      <div id="error-message">{{errorMessage}}</div>
    </div>

    <input
      class="checkout"
      type="button"
      value="Confirm"
      @click="buttonText=!buttonText"
      v-if="basket.length > 0 && buttonText"
    />
    <button class="checkout" type="submit" @click=" submitOrder()" v-if="!buttonText">Submit</button>
  </div>
</template>

<script>
import quantityButton from "@/components/quantityButton.vue";
export default {
  data() {
    return {
      name: null,
      address: null,
      basket: this.$store.state.myBasket,
      buttonText: true,
      errorMessage: null,
      successMessage: null
    };
  },

  computed: {
    totalPrice: function() {
      let totalPrice;
      let prices = [];
      let reducer = (accumulator, currentValue) => accumulator + currentValue;
      if (this.basket.length > 0) {
        this.basket.forEach(item => {
          prices.push(item.price * item.productQuantity);
        });
        totalPrice = prices.reduce(reducer);
      }
      return totalPrice;
    }
  },

  methods: {
    submitOrder() {
      if (!this.name && !this.address) {
        this.errorMessage = "Please enter a valid name & address";
      } else if (!this.name) {
        this.errorMessage = "Please enter a valid name";
      } else if (!this.address) {
        this.errorMessage = "Please enter a valid adress";
      } else if (this.name && this.address) {
        this.basket.forEach(product => {
          fetch("http://localhost:3000/orders", {
            body: JSON.stringify({
              name: this.name,
              address: this.address,
              productId: product.id,
              quantity: product.productQuantity
            }),
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST"
          })
            .then(response => response.json())
            .then(result => {
              console.log("Sent!");
            })
            .catch(error => {
              console.error("Error:", error);
            });
        });
        this.errorMessage = null;
        this.buttonText = true;
        this.basket.splice(0);
        this.successMessage = "Thank-you for shopping at Coffee World!!";

        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      }
    }
  },
  name: "Basket",
  components: {
    quantityButton
  }
};
</script>

<style scoped>
th {
  padding: 1em;
}
td {
  padding: 1em;
}
button {
  padding: 1em;
}
#item {
  padding: 1em;
  margin: 1em;
  border: 1px solid rgb(85, 23, 14);
  border-radius: 0.5em;
  background-color: white;
}
#itemSmall {
  display: none;
}
#myBasketDiv {
  display: grid;
  justify-content: center;
}
#myBasket img {
  height: 5em;
}

#item {
  border-radius: 0.5em;
  box-shadow: 1px 3px rgba(85, 23, 14, 0.5);
}

.total {
  margin-top: 1em;
  margin-bottom: 1em;
  font-weight: bold;
}

h1 {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 1em;
}
.checkout {
  position: relative;
  align-self: flex-end;
  font-size: 1em;
  padding: 0.8em;
  margin: 1em;
  right: 20px;
}

#confirm-address {
  white-space: pre;
}

.customer-details {
  margin: 1em 0 1em 25vw;
  text-align: left;
}

#name {
  position: relative;
  left: 6em;
  width: 20em;
}

label {
  margin-right: o.5em;
}

#error-message {
  color: red;
}

#confirm {
  margin: 1em;
}

#confirm > div {
  margin: 1em 30vw;
  text-align: left;
  font-weight: bold;
}

@media screen and (max-width: 700px) {
  #myBasket {
    grid-template-columns: auto auto;
  }
  #myBasketDiv {
    display: none;
  }
  #itemSmall {
    display: block;
    padding: 1em;
    margin: 1em;
    background-color: white;
    border-radius: 0.5em;
    box-shadow: 1px 3px rgba(85, 23, 14, 0.5);
  }
  #myBasket img {
    height: 4em;
  }
  h1 {
    font-size: 1em;
  }
}
</style>