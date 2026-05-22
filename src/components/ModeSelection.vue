<template>
  <div class="setup-screen">
    <h1 class="text-white mb-5 text-center">
      Selecciona la modalidad de Bingo
    </h1>
    <div class="mode-selection d-flex flex-wrap justify-content-center gap-4">
      <button @click="$emit('start', 75)" class="btn-draw">
        <h3 class="mb-2">Bingo de <span class="neon-text">75</span> Números</h3>
      </button>
      <button @click="$emit('start', 90)" class="btn-draw">
        <h3 class="mb-2">Bingo de <span class="neon-text">90</span> Números</h3>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModeSelection",
  emits: ["start"],
};
</script>
