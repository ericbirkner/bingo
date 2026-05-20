<template>
  <div class="bingo-container container-fluid">
    <div class="current-number-display text-center my-4">
      <div v-if="lastCalledNumber" class="last-number">
        <h2 class="text-primary">Último Número:</h2>
        <div class="number-circle d-flex align-items-center justify-content-center mx-auto">
          {{ lastCalledNumber }}
        </div>
      </div>
      <div v-else class="no-number">
        <h2 class="text-muted">Esperando...</h2>
      </div>
    </div>
    
    <div class="game-controls text-center mb-4">
      <button 
        @click="callNextNumber" 
        :disabled="isGameFinished || calledNumbers.length >= totalNumbers"
        class="btn btn-success m-1"
      >
        {{ isGameFinished ? '¡Juego Terminado!' : 'Cantar Número' }}
      </button>
      <button 
        @click="resetRound" 
        v-if="calledNumbers.length > 0" 
        class="btn btn-danger m-1"
      >
        Reiniciar Ronda
      </button>
    </div>
    
    <div class="game-info text-center mb-4">
      <p class="mb-1">Números cantados: {{ calledNumbers.length }} de {{ totalNumbers }}</p>
      <p class="mb-0">Modalidad: Bingo de {{ totalNumbers }} números</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bingo",
  props: {
    totalNumbers: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      calledNumbers: [],
      availableNumbers: [],
      lastCalledNumber: null,
      isGameFinished: false
    };
  },
  mounted() {
    this.initializeAvailableNumbers();
  },
  methods: {
    initializeAvailableNumbers() {
      this.availableNumbers = Array.from({ length: this.totalNumbers }, (_, i) => i + 1);
    },
    
    callNextNumber() {
      if (this.isGameFinished || this.availableNumbers.length === 0) {
        this.isGameFinished = true;
        this.$emit('gameOver');
        return;
      }
      
      const randomIndex = Math.floor(Math.random() * this.availableNumbers.length);
      const number = this.availableNumbers.splice(randomIndex, 1)[0];
      this.calledNumbers.push(number);
      this.lastCalledNumber = number;
      
      // Llamar a la función de audio original
      this.cantaNumero(number);
      
      // Emitir el número cantado para que otros componentes lo reciban
      this.$emit('numberCalled', number);
      
      // Verificar si se han cantado todos los números
      if (this.calledNumbers.length >= this.totalNumbers) {
        this.isGameFinished = true;
        setTimeout(() => {
          this.$emit('gameOver');
        }, 1000);
      }
    },
    
    // Tu función de audio original
    cantaNumero(numero) {
      if ("speechSynthesis" in window) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = numero;
        msg.lang = 'es-ES'; // Idioma español
        msg.rate = 0.8; // Velocidad un poco más lenta para claridad
        window.speechSynthesis.speak(msg);
      }
    },
    
    resetRound() {
      this.calledNumbers = [];
      this.lastCalledNumber = null;
      this.isGameFinished = false;
      this.initializeAvailableNumbers();
    }
  },
  watch: {
    calledNumbers: {
      handler(newVal) {
        // Propagar los números cantados al componente padre
        this.$parent.calledNumbers = [...newVal];
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.bingo-container {
  padding: 1rem;
  background: white;
  border-radius: 10px;
  margin: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.number-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #3498db;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  border: 5px solid #2980b9;
  margin-top: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.btn-success {
  background: #2ecc71;
  border: none;
}

.btn-success:hover:not(:disabled) {
  background: #27ae60;
}

.btn-success:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.btn-danger {
  background: #e74c3c;
  border: none;
}

.btn-danger:hover {
  background: #c0392b;
}
</style>