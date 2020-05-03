<template>
  <div id="app">
    <!--  Creators: Vimbayinashe Mandaza and Evi Ioannou
    Course: Design med JavaScript-->
    <main>
      <div id="nav">
        <router-link id="coffee" to="/">Coffee World</router-link>
      </div>
      <router-link to="/basket">
        <div id="basketdiv">
          {{ basketAmount }}
          <img id="basket2" src="./assets/images/basket.png" alt />
        </div>
      </router-link>
      <router-view />
    </main>

    <div id="footer">
      <div id="control-panel">
        <router-link id="personal-link" to="/control-panel">Staff</router-link>
      </div>
      <div @click="toggle=!toggle">
        <p id="credits">Credits</p>
        <div v-if="toggle">
          <p>
            Data and images from ICA shop online and Systembolaget web shop were used to create a database with products.
            Other images were downloaded from Unsplash.com.
            These data are only used for learning purposes in this specific course.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle: false
    };
  },
  computed: {
    basketAmount: function() {
      let basketAmount = 0;
      this.$store.state.myBasket.forEach(product => {
        basketAmount += product.productQuantity;
      });
      return basketAmount;
    }
  }
};
</script>

<style>
#app {
  background-color: #e3d4ce;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#nav {
  background-color: rgb(95, 58, 43);
  padding: 25px;
  margin-bottom: 2.5em;
}

main {
  flex-grow: 1;
}

a,
button {
  cursor: pointer;
}

#footer {
  background-color: rgb(95, 58, 43);
  color: rgb(233, 223, 223);
  text-align: justify;
  margin-top: 10em;
  height: 7em;
  display: grid;
  grid-template-columns: 25% 65%;
  grid-column-gap: 2em;
  justify-content: center;
  padding: 1em;
  width: 100vw;
}

/* #basket-image,
#basket2 {
  width: 1.5em;
  height: auto;
}

#basket-image {
  position: absolute;
  right: 1.5em;
  top: 2em;
} */
#basketdiv {
  width: 1.5em;
  height: auto;
  position: absolute;
  right: 1.5em;
  top: 6.6em;
}
/* #basket2 {
  width: 1.5em;
  height: auto;
  position: absolute;
  right: 1.5em;
  top: 6.6em;
} */
#coffee {
  color: rgb(233, 223, 223);
  font-size: 200%;
}

#personal-link,
#credits {
  font-size: 1.3em;
}

#credits:hover,
#personal-link:hover {
  text-decoration-line: underline;
}

#personal-link:hover {
  color: goldenrod;
  font-size: 1.4em;
}

#personal-link {
  color: rgb(233, 223, 223);
  padding: 1em 2em;
}

@media screen and (max-width: 425px) {
  #footer {
    font-size: 0.5em;
  }

  #link {
    margin-top: 1em;
  }
}
</style>
