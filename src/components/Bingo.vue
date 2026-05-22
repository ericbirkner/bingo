<template>
  <div class="bingo-container">
    <div class="top-stats">
      <div class="stat-box">
        <span class="stat-value">{{ calledNumbers.length }}</span>
        <span class="stat-label">Cantados</span>
      </div>
      <div class="stat-box">
        <span class="stat-value">{{ totalNumbers }}</span>
        <span class="stat-label">Total</span>
      </div>
    </div>

    <div class="magic-ball-container">
      <div class="magic-ball">
        <div class="glow-top"></div>
        <div class="glow-bottom"></div>
        <div class="current-number">{{ currentNumber || "--" }}</div>
      </div>
    </div>

    <div class="controls">
      <button @click="drawNumber" class="btn-draw">Sacar Número</button>
      <button @click="reset" class="btn-reset">Reiniciar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bingo",
  props: {
    totalNumbers: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentNumber: null,
      availableNumbers: [],
      calledNumbers: [],
    };
  },
  computed: {
    remainingNumbers() {
      return this.availableNumbers.length;
    },
  },
  methods: {
    initializeGame() {
      this.availableNumbers = Array.from(
        { length: this.totalNumbers },
        (_, i) => i + 1,
      );
      this.calledNumbers = [];
      this.currentNumber = null;
    },
    drawNumber() {
      if (this.availableNumbers.length === 0) {
        this.$emit("gameOver");
        return;
      }

      const randomIndex = Math.floor(
        Math.random() * this.availableNumbers.length,
      );
      const drawnNumber = this.availableNumbers[randomIndex];

      this.currentNumber = drawnNumber;
      this.calledNumbers.push(drawnNumber);
      this.availableNumbers.splice(randomIndex, 1);

      // Emitir el número cantado para que Cantados lo reciba
      this.$emit("numberCalled", drawnNumber);

      // Llamar a la función de síntesis de voz
      this.cantaNumero(drawnNumber.toString());
    },
    cantaNumero(numero) {
      if ("speechSynthesis" in window) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = numero;
        msg.lang = "es-ES"; // Idioma español
        msg.rate = 0.8; // Velocidad un poco más lenta para claridad
        window.speechSynthesis.speak(msg);
      }
    },
    reset() {
      this.initializeGame();
      this.$emit("reset");
    },
  },
  mounted() {
    this.initializeGame();
  },
  watch: {
    totalNumbers() {
      this.initializeGame();
    },
  },
};
</script>

<style scoped>
.bingo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.top-stats {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-box {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #00ffff;
  text-shadow: 0 0 10px #00ffff;
}

.stat-label {
  font-size: 0.8rem;
  color: #aaaaaa;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.magic-ball-container {
  position: relative;
  margin-bottom: 2rem;
}

.magic-ball {
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
  border: 2px solid #00ffff;
}

.current-number {
  font-size: 4rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 20px #00ffff;
  font-family: "Poppins", sans-serif;
}

.glow-top,
.glow-bottom {
  position: absolute;
  width: 100%;
  height: 30px;
  border-radius: 50%;
  filter: blur(15px);
}

.glow-top {
  top: -15px;
  background: radial-gradient(circle, #00ffff 0%, transparent 70%);
}

.glow-bottom {
  bottom: -15px;
  background: radial-gradient(circle, #ff00ff 0%, transparent 70%);
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 200px;
}

.btn-placeholder { /* button styles moved to src/assets/styles/shared.scss */ }
</style>
