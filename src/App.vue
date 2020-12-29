<template>
  <Bingo />
  <Cantados />
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
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
