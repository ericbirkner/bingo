<template>
  <div class="cantados-container">
    <h2 class="section-title">Números Cantados</h2>
    <div class="numbers-grid">
      <div
        v-for="num in allNumbers"
        :key="num"
        class="number-tile"
        :class="{
          called: calledNumbers.includes(num),
          'newly-called': isNewlyCalled(num),
        }"
      >
        {{ num }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cantados",
  props: {
    totalNumbers: {
      type: Number,
      required: true,
    },
    calledNumbers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newlyCalledNumbers: [],
    };
  },
  computed: {
    allNumbers() {
      return Array.from({ length: this.totalNumbers }, (_, i) => i + 1);
    },
  },
  methods: {
    isNewlyCalled(num) {
      return this.newlyCalledNumbers.includes(num);
    },
    highlightNewlyCalled(newNumber) {
      this.newlyCalledNumbers = [newNumber];
      setTimeout(() => {
        this.newlyCalledNumbers = [];
      }, 2000);
    },
  },
  watch: {
    calledNumbers(newVal, oldVal) {
      if (newVal.length > oldVal.length) {
        const newNumber = newVal[newVal.length - 1];
        this.highlightNewlyCalled(newNumber);
      }
    },
  },
};
</script>

<style scoped>
.cantados-container {
  height: 100%;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.section-title {
  color: #ffffff;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  text-shadow: 0 0 10px #00ffff;
}

.numbers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 0.5rem;
  width: 100%;
  max-height: calc(100% - 90px);
  overflow-y: auto;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.number-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
}

.number-tile.called {
  background: rgba(0, 255, 255, 0.32);
  color: #e0ffff;
  border-color: #00ffff;
  text-shadow: 0 0 12px #00ffff;
  box-shadow: 0 0 14px rgba(0, 255, 255, 0.35);
}

.number-tile.newly-called {
  animation: pulse 0.5s ease-in-out;
  background: rgba(255, 0, 255, 0.4);
  box-shadow: 0 0 15px #ff00ff;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .numbers-grid {
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  }

  .number-tile {
    width: 50px;
    height: 50px;
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
