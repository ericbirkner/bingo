<template>
  <div id="app">
    <div v-if="!gameStarted" class="setup-screen">
      <h1 class="text-white mb-5 text-center">Selecciona la modalidad de Bingo</h1>
      <div class="mode-selection d-flex flex-wrap justify-content-center gap-4">
        <button @click="startGame(75)" class="mode-btn btn-75">
          <h3 class="mb-2">Bingo de 75 Números</h3>
          <p class="mb-0">Números del 1 al 75</p>
        </button>
        <button @click="startGame(90)" class="mode-btn btn-90">
          <h3 class="mb-2">Bingo de 90 Números</h3>
          <p class="mb-0">Números del 1 al 90</p>
        </button>
      </div>
    </div>
    
    <div v-else class="game-screen">
      <div class="container-fluid">
        <div class="row align-items-center caja">
          <div class="col-md-6 col-xl-4">
            <Bingo :totalNumbers="selectedMode" @gameOver="handleGameOver"/>
          </div>
          <div class="col-md-6 col-xl-8">
            <Cantados :totalNumbers="selectedMode" :calledNumbers="calledNumbers"/>
          </div>
        </div>
      </div>
      
      <div v-if="isGameOver" class="game-over-overlay">
        <div class="game-over-content">
          <h2 class="text-danger">¡Juego Terminado!</h2>
          <p>Se han cantado todos los números del Bingo de {{ selectedMode }} números.</p>
          <button @click="resetGame" class="btn btn-primary restart-btn">Jugar de nuevo</button>
        </div>
      </div>
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
  },
  data() {
    return {
      gameStarted: false,
      selectedMode: null,
      isGameOver: false,
      calledNumbers: []
    };
  },
  methods: {
    startGame(mode) {
      this.selectedMode = mode;
      this.gameStarted = true;
      this.isGameOver = false;
      this.calledNumbers = [];
    },
    resetGame() {
      this.gameStarted = false;
      this.selectedMode = null;
      this.isGameOver = false;
      this.calledNumbers = [];
    },
    handleGameOver() {
      this.isGameOver = true;
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap");
body {
  margin: 0;
  background: linear-gradient(135deg, #d3e6bb 0%, #058910 100%);
  background-attachment: fixed;
  min-height: 100vh;
}

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl{
    width: auto;
  }
}

.setup-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;

  h1 {
    color: white;
    margin-bottom: 3rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .mode-selection {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .mode-btn {
    background: white;
    border: none;
    border-radius: 15px;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 300px;
    text-align: center;
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.3);
    }

    h3 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
    }

    p {
      margin: 0;
      color: #7f8c8d;
    }

    &.btn-75 {
      background: linear-gradient(135deg, #b5cceaf7 0%, #6d6febc6 100%);
    }

    &.btn-90 {
      background: linear-gradient(135deg, #a8edea 0%, #d6fef6 100%);
    }
  }
}

.game-screen {

}

.caja {
  height: 100vh;
}

@media only screen and (max-width: 600px) {
  .caja {
    height: inherit;
  }
  
  .mode-selection {
    flex-direction: column;
    gap: 1rem;
  }
  
  .mode-btn {
    min-width: 250px;
  }
}

.game-over-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .game-over-content {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    max-width: 400px;
    
    h2 {
      color: #e74c3c;
      margin-top: 0;
    }
    
    .restart-btn {
      background: #3498db !important;
      color: white;
      border: none;
      padding: 1rem 2rem !important;
      border-radius: 25px;
      cursor: pointer;
      font-size: 1rem;
      margin-top: 1rem;
      transition: background 0.3s ease;
      
      &:hover {
        background: #2980b9 !important;
      }
    }
  }
}
</style>