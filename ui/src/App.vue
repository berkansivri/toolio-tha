<template>
  <v-app>
    <v-main>
      <Products />
    </v-main>
  </v-app>
</template>

<script>
import Products from "./components/Products";

export default {
  name: "App",
  components: {
    Products,
  },
};
</script>

<style>
#app {
  background-color: gray;
}
</style>
