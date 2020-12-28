<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <table border="1" class="table">
          <tr v-for="f in 9" v-bind:key="f">
            <td v-for="col in 10" v-bind:key="col">{{ imprimeNumero(f,col) }}</td>
          </tr>
        </table>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Cantados",
  props: {
    cantados: Array
  },
   data() {
    return {
      columna: 0
    };
  },
  methods: {
    imprimeNumero(fila, col){
      let numero = 0; 
      if(fila == 1){
        numero = col;
      }
      else
      if(fila == 2){
        numero = col+10
        //numero = col + fila*10;
      }
      else
      if(fila > 2){
        numero = (col -1) + (fila*10) - 9;
      }
      return numero;
    }
  },
  mounted() {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.numero{
  border-radius: 20px;
  border: 1px solid red;
  font-size: 3em;
  text-align: center;
  width: 100px;
  height: 100px;
  line-height: 100px;
  margin: 20px auto;
}
</style>
