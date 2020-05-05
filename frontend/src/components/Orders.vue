<template>
  <div v-if="orders && products">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Product</th>
          <th>Size</th>
          <th>Quantity</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr :key="order.id" v-for="order in orders">
          <td>{{ order.name }}</td>
          <td>{{ order.address }}</td>
          <td>{{ products[order.productId].name }}</td>
          <td>{{ products[order.productId].weight }} {{ products[order.productId].unit }}</td>
          <td>{{ order.quantity }}</td>
          <td>
            <div v-if="order.shipped">pending</div>
            <div v-else>sent</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  created() {
    fetch("http://localhost:3000/orders")
      .then(response => response.json())
      .then(result => {
        this.orders = result;
        console.log(result);
      });
    fetch("http://localhost:3000/products")
      .then(response => response.json())
      .then(result => {
        this.products = result;
        console.log(result);
      });
  },
  data() {
    return {
      orders: null,
      products: null
    };
  },
  name: "Orders"
};
</script>

<style  scoped>
/* Table Style */

table {
  border: 0.18em solid rgb(85, 23, 14);
  background-color: whitesmoke;
  color: #000;
  margin: 3vw 10vw;
}
th,
tr {
  margin: 2em;
  padding: 1em;
}

tr {
  margin: 1em;
  text-align: left;
  padding: 1em 0.5em;
}

td {
  /* margin: 1em; */
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