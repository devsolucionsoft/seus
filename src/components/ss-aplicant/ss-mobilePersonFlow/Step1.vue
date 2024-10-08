<template>
  <div class="step1">
    <div v-for="(option, index) in options" :key="index" class="option-group">
      <h3>{{ option.title }}</h3>
      <div class="options-wrapper">
        <button v-if="showLeftArrow[index]" @click="scrollLeft(index)" class="scroll-button left">‹</button>
        <div class="options" :ref="'options-' + index">
          <div v-for="(item, idx) in option.items" :key="idx" class="option-item">
            <div class="image-container" :class="{ selected: selectedOptions.includes(`${index}-${idx}`) }" @click="toggleSelection(`${index}-${idx}`)">
              <img :src="item.image" :alt="item.label" />
            </div>
            <p>{{ item.label }}</p>
          </div>
        </div>
        <button v-if="showRightArrow[index]" @click="scrollRight(index)" class="scroll-button right">›</button>
      </div>
    </div>
    <p class="description">{{ finalNote }}</p>
  </div>
</template>
  
<script>
  import optionMixin from '@/mixins/optionMixin.js';
  export default {
    mixins: [optionMixin],
    name: 'Step1',
    data() {
      return {
        finalNote: 'Elegir una cultura específica no te descarta de ningún proceso.',
        showLeftArrow: [],
        showRightArrow: [],
      };
    },
    mounted() {
      this.checkArrowsVisibility();
    },
    methods: {
      scrollLeft(index) {
        const optionsContainer = this.$refs[`options-${index}`][0];
        optionsContainer.scrollBy({ left: -178, behavior: 'smooth' });
        this.updateArrows(index);
      },
      scrollRight(index) {
        const optionsContainer = this.$refs[`options-${index}`][0];
        optionsContainer.scrollBy({ left: 178, behavior: 'smooth' });
        this.updateArrows(index);
      },
      updateArrows(index) {
        this.$nextTick(() => {
          const optionsContainer = this.$refs[`options-${index}`][0];
          this.showLeftArrow[index] = optionsContainer.scrollLeft > 0;
          this.showRightArrow[index] = optionsContainer.scrollLeft < (optionsContainer.scrollWidth - optionsContainer.clientWidth);
        });
      },
      checkArrowsVisibility() {
        this.$nextTick(() => {
          this.options.forEach((_, index) => {
            this.updateArrows(index);
          });
        });
      }
    },
    watch: {
      options: {
        handler() {
          this.checkArrowsVisibility();
        },
        immediate: true
      }
    }
  };
</script>
  

<style scoped lang="sass">
.step1
  padding: 16px
  display: flex
  flex-direction: column
  gap: 16px
  width: 100%

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

    .options-wrapper
      position: relative
      display: flex
      align-items: center

      .options
        display: flex
        justify-content: flex-start
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
          gap: 10px

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
      .scroll-button
        position: absolute
        top: 50%
        transform: translateY(-50%)
        color: #191F27
        border: none
        padding: 10px
        cursor: pointer
        z-index: 1
        font-size: 50px

        &.left
          left: 0

        &.right
          right: 0
  .description
    font-size: 14px
    font-weight: 400
    line-height: 24px
    text-align: center
    color: #191F27
</style>