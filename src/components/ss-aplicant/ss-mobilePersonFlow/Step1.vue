<template>
  <div class="step1">
    <div v-for="(option, categoryIndex) in options" :key="categoryIndex" class="option-group">
      <h3>{{ option.title }}</h3>
      <div class="options-wrapper">
        <button v-if="showLeftArrow[categoryIndex]" @click="scrollLeft(categoryIndex)" class="scroll-button left">‹</button>
        
        <div class="options" :ref="el => optionContainers[categoryIndex] = el">
          <div v-for="(item) in option.items" :key="item.id" class="option-item">
            <div 
              class="image-container" 
              :class="{ selected: selectedOptions[categoryIndex] && selectedOptions[categoryIndex].includes(item.id) }" 
              @click="toggleSelection(categoryIndex, item.id)"
            >
              <img :src="item.icon" :alt="item.name" />
            </div>
            <p>{{ item.name }}</p>
          </div>
        </div>
        
        <button v-if="showRightArrow[categoryIndex]" @click="scrollRight(categoryIndex)" class="scroll-button right">›</button>
      </div>
    </div>
    <p class="description">{{ finalNote }}</p>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import useOptions from '@/composables/useOptions.js';
const finalNote = ref('Elegir una cultura específica no te descarta de ningún proceso.');

const {
  selectedOptions,
  options,
  toggleSelection,
  scrollLeft,
  scrollRight,
  showLeftArrow,
  showRightArrow,
  optionContainers,
  checkArrowsVisibility,
} = useOptions();

checkArrowsVisibility();
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