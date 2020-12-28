<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="numero">{{numero}}</div>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" @click="sacarNumero()">Sacar Número</button>
      </div>
    </div>
    <div class="row">
      <div class="col-12" v-if="fin"> Fín del juego </div>
    </div>
    <div class="row">
      <div class="col-12"> {{ $data }} </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Bingo",
  props: {
    msg: String
  },
   data() {
    return {
      numero: null,
      numeros: [],
      cantados: this.$store.state.cantados,
      fin: false
    };
  },
  methods: {
    generaNumeros(){
      for(var i =1 ; i < 91; i++){
        this.numeros.push(i);
      } 
    },
    sacarNumero(){
      if(this.numeros.length > 0){
        let bolita = this.randomNumber(0,this.numeros.length - 1 );
        this.numero = this.numeros[bolita];
        //this.cantados.push( this.numeros[bolita]);
        this.$store.commit('addNumero', this.numeros[bolita]);
        this.numeros.splice(bolita, 1);
      }else{
        this.fin = true;
      }
      
    },
    randomNumber(min, max){
      const r = Math.random()*(max-min) + min;
      return Math.floor(r);
    }
  },
  mounted() {
    this.generaNumeros();
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
