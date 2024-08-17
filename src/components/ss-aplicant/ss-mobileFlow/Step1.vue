<template>
  <div class="step1">
    <div v-for="(option, index) in options" :key="index" class="option-group">
      <h3>{{ option.title }}</h3>
      <div class="options">
        <div v-for="(item, idx) in option.items" :key="idx" class="option-item">
          <div class="image-container" :class="{ selected: selectedOptions.includes(`${index}-${idx}`) }" @click="toggleSelection(`${index}-${idx}`)">
            <img :src="item.image" :alt="item.label" />
          </div>
          <p>{{ item.label }}</p>
        </div>
      </div>
    </div>
    <p class="description">{{ finalNote }}</p>
  </div>
</template>
  
<script>
  export default {
    name: 'Step1',
    data() {
      return {
        selectedOptions: [],
        finalNote: 'Elegir una cultura específica no te descarta de ningún proceso.',
        options: [
          {
            title: 'Tipo de empleo que buscas:',
            items: [
              { label: 'Áreas humanas', image: require('@/assets/icons/selectIcons/human-resources.svg') },
              { label: 'Áreas Financieras', image: require('@/assets/icons/selectIcons/finance.svg') },
              { label: 'Área Comercial', image: require('@/assets/icons/selectIcons/commercial.svg') },
            ]
          },
          {
            title: 'Opciones de jornadas:',
            items: [
              { label: 'Presencial', image: require('@/assets/icons/selectIcons/presential.svg') },
              { label: 'Remoto', image: require('@/assets/icons/selectIcons/remote.svg') },
              { label: 'Híbrido', image: require('@/assets/icons/selectIcons/hybrid.svg') }
            ]
          },
          {
            title: 'Qué tipos de culturas te gustan más:',
            items: [
              { label: 'Emocionales', image: require('@/assets/icons/selectIcons/emotional.svg') },
              { label: 'Conocimiento', image: require('@/assets/icons/selectIcons/knowledge.svg') },
              { label: 'Remoto', image: require('@/assets/icons/selectIcons/hybrid.svg') }
            ]
          }
        ]
      };
    },
  methods: {
    toggleSelection(index) {
      const position = this.selectedOptions.indexOf(index);
      if (position === -1) {
        this.selectedOptions.push(index);
      } else {
        this.selectedOptions.splice(position, 1);
      }
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
      stepsData.step1 = {
        selectedOptions: this.selectedOptions,
        options: this.options
      };
      localStorage.setItem('stepsData', JSON.stringify(stepsData));
    },
    loadFromLocalStorage() {
      const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
      if (stepsData.step1) {
        this.selectedOptions = stepsData.step1.selectedOptions || [];
        this.options = stepsData.step1.options || [];
      }
    },
  },
  created() {
    this.loadFromLocalStorage();
  }
};
</script>
  

<style scoped lang="sass">
.step1
  padding: 16px
  display: flex
  flex-direction: column
  gap: 16px

  .option-group
    display: flex
    gap: 18px
    flex-direction: column

    h3
      font-size: 20px
      font-weight: 600
      line-height: 26px
      text-align: left
      color: #023D6A
      margin: 0

    .options
      display: flex
      justify-content: space-around
      width: 100%
      overflow-x: auto
      scrollbar-width: none
      -webkit-overflow-scrolling: touch
      gap: 0px

      .option-item
        display: flex
        flex-direction: column
        align-items: center
        text-align: center
        padding: 11px 24px

        .image-container
          background: #761D74
          height: 112px
          width: 112px
          border-radius: 100px
          display: flex
          align-items: center
          justify-content: center
          transition: background 0.3s ease-in-out

          &.selected
            background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
            transition: background 0.3s ease-in-out

        p
          font-size: 14px
          font-weight: 500
          line-height: 17.07px
          text-align: center
          color: #350D34

  .description
    font-size: 14px
    font-weight: 400
    line-height: 24px
    text-align: center
    color: #191F27
</style>