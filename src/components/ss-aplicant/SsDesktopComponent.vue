<template>
    <section class="interest-items">
        <h2>Configura esta sección para un perfil más detallado.</h2>
        <div v-for="(option, index) in options" :key="index" class="option-group">
            <h3>{{ option.title }}</h3>
            <div class="options">
                <div v-for="(item, idx) in option.items" :key="idx" class="option-item">
                <div 
                    class="image-container" 
                    :class="{ selected: selectedOptions.includes(`${index}-${idx}`) }" 
                    @click="toggleSelection(`${index}-${idx}`)"
                >
                    <img :src="item.image" :alt="item.label" />
                </div>
                <p>{{ item.label }}</p>
                </div>
            </div>
        </div>
        <p class="description">{{ finalNote }}</p>
    </section>
</template>

<script>
    import optionMixin from '@/mixins/optionMixin.js';
    export default {
        mixins: [optionMixin],
        name: 'SsDesktopComponent.vue',
        data() {
            return {
                finalNote: 'Elegir una cultura específica no te descarta de ningún proceso.',
            };
        },
    };
</script>
  
<style scoped lang="sass">
.interest-items
  padding: 40px 196px
  display: flex
  flex-direction: column
  gap: 41px
  background-color: #EDEEF1

  h2
    font-size: 24px
    font-weight: 700
    line-height: 29.26px
    text-align: center
    color: #023D6A

  .option-group
    display: flex
    gap: 18px
    flex-direction: column

    h3
      font-size: 16px
      font-weight: 600
      line-height: 20px
      text-align: left
      color: #023D6A
      margin: 0

    .options
      display: flex
      width: 100%
      overflow-x: auto
      scrollbar-width: none
      -webkit-overflow-scrolling: touch
      gap: 32px

      .option-item
        display: flex
        flex-direction: column
        align-items: center
        text-align: center
        padding: 11px 24px
        gap: 10px
        cursor: pointer

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