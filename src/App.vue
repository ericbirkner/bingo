<template>
  <div id="app">
    <ModeSelection v-if="!gameStarted" @start="startGame" />

    <div v-else class="game-screen">
      <div class="container-fluid">
        <div class="row align-items-center caja">
          <div class="col-md-6 col-xl-4 p-0">
            <Bingo
              :totalNumbers="selectedMode"
              @gameOver="handleGameOver"
              @numberCalled="handleNumberCalled"
              @reset="handleReset"
            />
          </div>
          <div class="col-md-6 col-xl-8 p-0">
            <Cantados
              :totalNumbers="selectedMode"
              :calledNumbers="calledNumbers"
            />
          </div>
        </div>
      </div>

      <div v-if="isGameOver" class="game-over-overlay">
        <div class="game-over-content">
          <h2 class="text-danger">¡Juego Terminado!</h2>
          <p>
            Se han cantado todos los números del Bingo de
            {{ selectedMode }} números.
          </p>
          <button @click="resetGame" class="btn btn-primary restart-btn">
            Jugar de nuevo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bingo from "./components/Bingo.vue";
import Cantados from "./components/Cantados.vue";
import ModeSelection from "./components/ModeSelection.vue";

export default {
  name: "App",
  components: {
    Bingo,
    Cantados,
    ModeSelection,
  },
  data() {
    return {
      gameStarted: false,
      selectedMode: null,
      isGameOver: false,
      calledNumbers: [],
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
    },
    handleNumberCalled(number) {
      this.calledNumbers.push(number);
    },
    handleReset() {
      this.calledNumbers = [];
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .container,
  .container-fluid,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl {
    width: auto;
  }
}

/* setup-screen and mode button styles moved to shared.scss */

.game-screen {
  min-height: 100vh;
}

.caja {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

@media only screen and (max-width: 600px) {
  .caja {
    height: inherit;
  }
}

/* Shared button style used by Bingo and ModeSelection */
/* .btn-draw moved to shared.scss */

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
