<template>
    <div>
      <component :is="currentStepComponent" />
  
      <div v-if="step > 1">
        <button @click="prevStep">Anterior</button>
      </div>
      <div v-if="step < maxSteps">
        <button @click="nextStep">Siguiente</button>
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
  
  export default {
    data() {
      return {
        step: 1,
        maxSteps: 7,
      };
    },
    computed: {
      currentStepComponent() {
        switch (this.step) {
            case 1:
                return Step1;
            case 2:
                return Step2;
            case 3:
                return Step3;
            case 4:
                return Step4;
            case 5:
                return Step5;
            case 6:
                return StepPreview;
            case 7:
                return StepSuccess;
            default:
                return Step1;
        }
      },
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
button
    background-color: #007bff
    color: white
    border: none
    padding: 10px 20px
    border-radius: 5px
    cursor: pointer

button:disabled
    background-color: #ccc

</style>
  