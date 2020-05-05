<template>
  <div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Brand</th>
          <th>Type</th>
          <th>Size</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>

      <tbody>
        <tr :key="product.id" v-for="product in products">
          <td>{{ products.indexOf(product) + 1 }}.</td>
          <td>
            <router-link :to="'/control-panel/products/'+product.id">{{ product.name }}</router-link>
          </td>
          <td>{{ product.brand }}</td>
          <td>{{ product.type }}</td>
          <td>{{ product.weight }} {{ product.unit }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  name: "CategoryDisplay",
  props: {
    products: {
      type: Array
    }
  }
};
</script>

<style scoped>
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