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
    <div class="row mt-2 mb-4">
      <div class="col-12" v-if="fin"> Fín del juego / <a href="window.reload()">jugar otra vez</a> </div>
    </div>
    
    
  </div>
</template>

<script>
export default {
  name: "Bingo",
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
        this.cantaNumero(this.numeros[bolita]);
        this.numeros.splice(bolita, 1);
      }else{
        this.fin = true;
      }
      
    },
    randomNumber(min, max){
      const r = Math.random()*(max-min) + min;
      return Math.floor(r);
    },
    cantaNumero(numero){
      if ('speechSynthesis' in window) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = numero;
        window.speechSynthesis.speak(msg);
      }
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
  border-radius: 60px;
  border: 3px solid #007bff;;
  font-size: 3em;
  text-align: center;
  width: 120px;
  height: 120px;
  line-height: 115px;
  margin: 20px auto;
  font-weight:700;
}
</style>
