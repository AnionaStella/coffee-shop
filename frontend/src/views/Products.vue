<template>
  <div class="products">
    <section v-if="$route.params.category===undefined" id="categories">
      <p class="link">
        <img src="../assets/images/all products.jpg" alt="all products" class="photo" />
        <b-button tag="router-link" to="/products/All" type="is-primary" outlined >All products</b-button>
      </p>
      <p class="link">
        <img src="../assets/images/coffee.jpg" alt="coffee products" class="photo" />
        <b-button tag="router-link" to="/products/Coffee" type="is-primary" outlined 
        >Coffee brew</b-button>
      </p>
      <p class="link">
        <img src="../assets/images/milk and cream.jpg" alt="milk and cream" class="photo" />
        <b-button tag="router-link" to="/products/Milk" type="is-primary" outlined>Milk and cream</b-button>
      </p>
      <p class="link">
        <img src="../assets/images/spices.jpg" alt="spices" class="photo" />
        <b-button tag="router-link" to="/products/Spices" type="is-primary" outlined>Sugar and spices</b-button>
      </p>
      <p class="link">
        <img src="../assets/images/syrups.jpg" alt="syrups" class="photo" />
        <b-button tag="router-link" to="/products/Syrup" type="is-primary" outlined>Syrups</b-button>
      </p>
      <p class="link">
        <img src="../assets/images/alcoholic products.jpg" alt="alcoholic products" class="photo" />
        <b-button tag="router-link" to="/products/Alcoholic" type="is-primary" outlined>
        Alcoholic products
        </b-button>
      </p>
      <router-view />
    </section>

    <productDisplay v-else-if="$route.params.category!==undefined" />
  </div>
</template>

<script>
// @ is an alias to /src
import productDisplay from "@/components/productDisplay.vue";

export default {
  name: "Products",
  components: {
    productDisplay
  }
};
</script>

<style scoped>

.link {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em;
}

.photo {
  height: 160px;
  width: 240px;
}

a {
  width: 13vw;
}

#categories {
  margin-top: 0.7em;
  display: grid;
  grid-template-columns: 20% 20% 20%;
  grid-auto-rows: auto;
  grid-row-gap: 1em;
  justify-content: center;
    padding-bottom: 1em;
}

@media screen and (max-width: 768px){
  #categories{
    grid-template-columns: 20% 20%;
    grid-auto-rows: auto;
    grid-column-gap: 2em;
  }

  .photo{
  height: 130px;
  width: 190px;
  }

  a {
    width: 160px;
  }
}

@media screen and (max-width: 425px){
  #categories{
    display: block;
  }

  #categories .link{
    margin-top: 0.5em;
    margin-bottom: 0.8em;
  }
}
</style>
