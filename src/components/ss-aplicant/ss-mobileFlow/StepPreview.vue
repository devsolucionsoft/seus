<template>
  <div>

    <div v-if="step1SelectedItems.length">
      <h3>Tipo de empleo que buscas:</h3>
      <div v-for="(item, index) in step1SelectedItems" :key="index" class="selected-item">
        <div class="image-container">
          <img :src="item.image" :alt="item.label" />
        </div>
        <p>{{ item.label }}</p>
      </div>
    </div>
  </div>

  
</template>

<script>
export default {
  name: 'StepPreview',
  data() {
    return {
      step1SelectedItems: [],
    };
  },
  mounted() {
    this.loadStep1Data();
  },
  methods: {
    loadStep1Data() {
      const selectedIndices = JSON.parse(localStorage.getItem('step1Selected') || '[]');
      const options = JSON.parse(localStorage.getItem('step1Options') || '[]');
      
      this.step1SelectedItems = selectedIndices.map(index => {
        const [optionIndex, itemIndex] = index.split('-').map(Number);
        return options[optionIndex].items[itemIndex];
      });
    },
  },
};
</script>

<style scoped>
  .selected-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 11px 24px;
  }

  .image-container {
    background: #761D74;
    height: 112px;
    width: 112px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
