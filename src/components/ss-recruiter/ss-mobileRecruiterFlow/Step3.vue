<template>
  <div class="step3">
    <div v-for="(option, index) in options2" :key="index" class="option-group">
      <h3>{{ option.title }}</h3>
      <div class="options">
        <div v-for="(item, idx) in option.items" :key="idx" class="option-item">
          <div class="image-container" :class="{ selected: selectedOptions2.includes(`${index}-${idx}`) }" @click="toggleSelection2(`${index}-${idx}`)">
            <img :src="item.image" :alt="item.label" />
          </div>
          <p>{{ item.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import options2Mixin from '@/mixins/recruiter/options2Mixin.js';
  export default {
    mixins: [options2Mixin],
    name: 'Step3',
  };
</script>
  

<style scoped lang="sass">
.step3
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

    .options
      display: flex
      width: 100%
      overflow-x: auto
      gap: 32px
      flex-wrap: wrap
      align-items: center
      justify-content: center

      .option-item
        display: flex
        flex-direction: column
        align-items: center
        text-align: center
        padding: 11px 24px
        gap: 10px

        .image-container
          background: #023D6A
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