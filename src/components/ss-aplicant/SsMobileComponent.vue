<template>
  <div class="body">
    <SsProgressBarRegister :step="step" :steps="6" :labels="['Empleo', 'Datos Personales', 'Formación', 'Experiencia', 'Revision']" />
    <component :is="currentStepComponent" />
    <div v-if="showStepsNavigation" class="stepsNavigation">
      <button v-if="step > 1" class="prevStep" @click="prevStep">Anterior</button>
      <button v-if="step <= maxSteps" class="nextStep" @click="nextStep">{{ nextButtonText }}</button>
    </div>
  </div>
</template>

<script>
  import Step1 from '@/components/ss-aplicant/ss-mobileFlow/Step1.vue';
  import Step2 from '@/components/ss-aplicant/ss-mobileFlow/Step2.vue';
  import Step3 from '@/components/ss-aplicant/ss-mobileFlow/Step3.vue';
  import Step4 from '@/components/ss-aplicant/ss-mobileFlow/Step4.vue';
  import Step5 from '@/components/ss-aplicant/ss-mobileFlow/Step5.vue';
  import StepPreview from '@/components/ss-aplicant/ss-mobileFlow/StepPreview.vue';
  import StepSuccess from '@/components/ss-aplicant/ss-mobileFlow/StepSuccess.vue';  
  import SsProgressBarRegister from '@/components/ss-aplicant/ss-mobileFlow/SsProgressBarRegister.vue';

  export default {
    components: {
      SsProgressBarRegister
    },
    data() {
      return {
        step: 1,
        maxSteps: 6,
      };
    },
    computed: {
      currentStepComponent() {
        switch (this.step) {
          case 1: return Step1;
          case 2: return Step2;
          case 3: return Step3;
          case 4: return Step4;
          case 5: return Step5;
          case 6: return StepPreview;
          case 7: return StepSuccess;
          default: return Step1;
        }
      },
      showStepsNavigation() {
        return this.step <= this.maxSteps;
      },
      nextButtonText() {
        return this.step === this.maxSteps ? 'Previsualiza tu perfil' : 'Siguiente';
      }
    },
    methods: {
      nextStep() {
        if (this.step < this.maxSteps) {
          this.step++;
        }
      },
      prevStep() {
        if (this.step > 1) {
          this.step--;
        }
      },
    },
  };
  </script>
  
<style scoped lang="sass">
.body
  display: flex
  flex-direction: column
  .stepsNavigation
    background: #270538
    padding: 16px
    justify-content: flex-end
    display: flex
    flex-direction: row
    margin-top: auto
    button
        border: none
        padding: 12px 24px
        border-radius: 28px
        cursor: pointer
        font-size: 14px
        font-weight: 600
        line-height: 17.07px
        text-align: center
        color: white
        &.nextStep
          background-color: #761D74
          border: 1px solid #761d74
          justify-self: flex-end
        &.prevStep
          background-color: transparent
          border: 1px solid white
          margin-right: auto
    button:disabled
        background-color: #ccc
</style>
  