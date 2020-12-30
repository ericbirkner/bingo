<template>
  <div class="container">
    <div class="row align-items-center caja">
    <Bingo />
    <Cantados />
    </div>
  </div>
</template>

<script>
import Bingo from "./components/Bingo.vue";
import Cantados from "./components/Cantados.vue";

export default {
  name: "App",
  components: {
    Bingo,
    Cantados
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
body {
  margin: 0;
}

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.caja{
  height: 100vh;
}


@media only screen and (max-width: 600px) {
  .caja{
    height: inherit;
  }
}


</style>
