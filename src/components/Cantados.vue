<template>
  <div class="cantados-container container-fluid">
    <h3 class="text-center mb-3">Números Cantados</h3>
    <div class="numbers-grid">
      <div 
        v-for="num in numbersToDisplay" 
        :key="num.id"
        :class="['number-item', 'd-flex', 'align-items-center', 'justify-content-center', { 'called': num.called }]"
      >
        <span>{{ num.value }}</span>
      </div>
    </div>
    <div class="stats row mt-3">
      <div class="col-6">
        <p class="mb-0"><strong>Restantes:</strong> {{ remainingCount }}</p>
      </div>
      <div class="col-6">
        <p class="mb-0"><strong>Cantados:</strong> {{ calledCount }}</p>
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
      required: true
    },
    calledNumbers: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    numbersToDisplay() {
      const total = this.totalNumbers;
      return Array.from({ length: total }, (_, i) => ({
        id: i + 1,
        value: i + 1,
        called: this.calledNumbers.includes(i + 1)
      }));
    },
    remainingCount() {
      return this.totalNumbers - this.calledCount;
    },
    calledCount() {
      return this.calledNumbers.length;
    }
  }
};
</script>

<style scoped>
.cantados-container {
  background: white;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.numbers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 0.25rem;
  max-height: 400px;
  overflow-y: auto;
  margin: 1rem 0;
}

.number-item {
  width: 40px;
  height: 40px;
  border: 2px solid #ddd;
  border-radius: 50%;
  font-weight: bold;
  background: #f8f9fa;
}

.number-item.called {
  background: #28a745;
  color: white;
  border-color: #28a745;
}

.stats {
  display: flex;
  justify-content: space-around;
  font-weight: bold;
}
</style>