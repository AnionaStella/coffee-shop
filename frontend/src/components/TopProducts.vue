<template>
  <div>
    <div id="form">
      <button class="button is-rounded" @click="topAll()">Show top products</button>
      <label for="number">Choose amount of top products:</label>
      <input type="number" v-model="amount" />
      <button class="button is-rounded" @click="topAmount()">Submit</button>
    </div>
    <div v-if="products">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Type</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Orders</th>
          </tr>
        </thead>

        <tbody>
          <tr v-bind:key="product.id" v-for="product in products">
            <td>{{ product.name }}</td>
            <td>{{ product.brand }}</td>
            <td>{{ product.type }}</td>
            <td>{{ product.weight }} {{ product.unit }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.amountOrdered }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: null,
      amount: 0
    };
  },
  methods: {
    topAll() {
      fetch("http://localhost:3000/topProducts")
        .then(response => response.json())
        .then(result => {
          this.products = result;
          console.log(result);
        });
    },
    topAmount() {
      fetch("http://localhost:3000/topProducts?amount=" + this.amount)
        .then(response => response.json())
        .then(result => {
          this.products = result;
          console.log(result);
        });
    }
  },
  name: "TopProducts"
};
</script>

<style  scoped>
form {
  text-align: justify;
}
button {
  background-color: sandybrown;
  margin: 1vw 3vw;
  width: 12em;
  font-weight: bold;
}
input {
  width: 4em;
  margin: 1vw 1vw;
  font-size: 1.2em;
}

/* Table Style */

table {
  border: 0.18em solid rgb(85, 23, 14);
  background-color: whitesmoke;
  color: #000;
  margin: 3vw 10vw;
}
th {
  margin: 1em;
  padding: 1em;
}

tr {
  margin: 1em;
  text-align: left;
  padding: 1em 0.5em;
}

td {
  text-align: left;
  padding: 1em;
}

th,
td {
  border-bottom: 0.1em solid rgb(85, 23, 14);
}

tr:hover {
  background-color: rgba(85, 23, 14, 0.1);
}

/*----style scrollbar- !does not work for firefox!----*/
tbody::-webkit-scrollbar {
  width: 0.5em;
}

tbody::-webkit-scrollbar-button {
  background: #888;
}

tbody::-webkit-scrollbar-track-piece {
  background: #ccc;
}

tbody::-webkit-scrollbar-thumb {
  background: rgb(75, 74, 74);
}
</style>