<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-3">
        <table border="1">
          <tr v-for="f in 9" v-bind:key="f">
            <td v-for="col in 10" v-bind:key="col" v-html="imprimeNumero(f,col)"></td>
          </tr>
        </table>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Cantados",
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

      if( this.$store.state.cantados.includes(numero)){
        return "<strong>"+numero+"</strong>";
      }else{
        return numero;
      }

      
    }
  },
  mounted() {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
table{
  width:100%;
  border: 2px solid #007bff;
  td{
    padding:5px;
    color: #ccc; 
    border-color: #ccc;    
  }
  strong{
    color:#007bff !important;
  }
}
</style>
