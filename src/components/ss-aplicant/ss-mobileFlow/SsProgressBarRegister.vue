<template>
  <div class="progress-bar-container">
    <h2 v-if="step <= steps">{{ title }}</h2>
    <h2 v-else>Muy bien! ya casi estamos listos</h2>
    <div v-if="step <= steps" class="progress-bar">
      <div v-for="n in steps" :key="n" class="step" :class="{'active': n <= step, 'completed': n < step}">
        <div class="bullet">
          <div v-if="n === step" class="current"></div>
          <span v-else-if="n < step" class="checkmark"><img src="@/assets/icons/check.svg" alt=""></span>
        </div>
        <div class="label">{{ labels[n-1] }}</div>
      </div>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: 'SsProgressBarRegister',
    props: {
      step: {
        type: Number,
        required: true
      },
      steps: {
        type: Number,
        required: true
      },
      labels: {
        type: Array,
        required: true
      }
    },
    computed: {
      title() {
        if (this.step === this.steps) {
          return 'Un último detalle';
        } else {
          return 'Detalla tu perfil aquí';
        }
      }
    }
  }
</script>
  
<style scoped lang="sass">
.progress-bar-container
  display: flex
  flex-direction: column
  gap: 16px
  align-items: center
  justify-content: center
  .progress-bar
    display: flex
    align-items: flex-start
    justify-content: center
    position: relative
    padding: 0 26px
    gap: 26px
    flex-wrap: wrap

    .step
      display: flex
      flex-direction: column
      align-items: center
      justify-content: flex-start
      height: 100%
      gap: 10px
      flex-grow: 1

      .label
        font-size: 12px
        color: #707070
        text-align: center

      .bullet
        width: 20px
        height: 20px
        border-radius: 10px
        border: 1px solid #495AFF1A
        display: flex
        align-items: center
        justify-content: center
        background-color: #495AFF1A
        .current
          font-size: 12px
          background-color: #495AFF
          width: 10px
          height: 10px
          border-radius: 5px

        .checkmark
          font-size: 14px
          color: white

      &.active
        .bullet
          border: 1px solid #495AFF
          background-color: transparent

      &.completed 
        .bullet
          background-color: #007bff
          color: white
          border: none
      &:last-child
        display: none
  h2
    margin: 0
    font-size: 20px
    font-weight: 600
    line-height: 26px
    text-align: center
    color: #023D6A
</style>
  