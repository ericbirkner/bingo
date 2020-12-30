<template>
  
  <div class="col-lg-7 col-md-6 col-sm-12 mb-3">
    <table border="1">
      <tr v-for="f in 9" v-bind:key="f">
        <td
          v-for="col in 10"
          v-bind:key="col"
          v-html="imprimeNumero(f, col)"
        ></td>
      </tr>
    </table>
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
    imprimeNumero(fila, col) {
      let numero = 0;
      if (fila == 1) {
        numero = col;
      } else if (fila == 2) {
        numero = col + 10;
        //numero = col + fila*10;
      } else if (fila > 2) {
        numero = col - 1 + fila * 10 - 9;
      }

      if (this.$store.state.cantados.includes(numero)) {
        return "<strong>" + numero + "</strong>";
      } else {
        return numero;
      }
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
table {
  width: 100%;
  border: 2px solid #007bff;
  tr{
    td {
      padding: 5px;
      color: #ccc;
      border-color: #ccc;   
    }
    &:nth-child(odd){
      td{
        &:nth-child(odd){
          background:#f0f0f0;
        }
        &:nth-child(even){
        background:#fff;
        }
      }      
    }
    &:nth-child(even){
      td{
        &:nth-child(odd){
          background:#fff;
        }
        &:nth-child(even){
        background:#f0f0f0;
        }
      }      
    }
  }
  
  strong {
    color: #007bff !important;
  }
}
</style>
