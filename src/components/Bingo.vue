<template>
  
  <div class="col-lg-5 col-md-6 col-sm-12 text-center  mb-4">
      <div class="numero" @click="cantaNumero(numero)">{{ numero }}</div>
      <button class="btn btn-primary" @click="sacarNumero()">
        Sacar Número
      </button>
      <div class="mt-2" v-if="fin">
        Fín del juego / <a href="javascript:window.reload()">jugar otra vez</a>
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
    generaNumeros() {
      for (var i = 1; i < 91; i++) {
        this.numeros.push(i);
      }
    },
    sacarNumero() {
      if (this.numeros.length > 0) {
        let bolita = this.randomNumber(0, this.numeros.length - 1);
        this.numero = this.numeros[bolita];
        //this.cantados.push( this.numeros[bolita]);
        this.$store.commit("addNumero", this.numeros[bolita]);
        this.cantaNumero(this.numeros[bolita]);
        this.numeros.splice(bolita, 1);
      } else {
        this.fin = true;
      }
    },
    randomNumber(min, max) {
      const r = Math.random() * (max - min) + min;
      return Math.floor(r);
    },
    cantaNumero(numero) {
      if ("speechSynthesis" in window) {
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
.numero {
  border-radius: 90px;
  border: 3px solid #007bff;
  font-size: 4em;
  text-align: center;
  width: 180px;
  height: 180px;
  line-height: 170px;
  margin: 20px auto;
  font-weight: 700;
  transition: opacity .15s ease-in-out;
}
</style>
