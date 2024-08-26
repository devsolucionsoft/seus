  <template>
    <div class="welcome">
      <div class="text">
        <h2>{{ headerText  }}</h2>
        <button><img src="@/assets/icons/dots.svg" alt="..."></button>
      </div>
      <div class="lineTitle"></div>
    </div>
    <div class="body">
      <SsProgressBarRegister 
        :step="step" 
        :steps="4" 
        :labels="['Cultura', 'Empresa', 'Arquetipos', 'Reclutador']" 
      />
      <component :is="currentStepComponent" @edit-step="changeStep"/>
      <div v-if="showStepsNavigation" class="stepsNavigation">
        <button v-if="step > 1" class="prevStep" @click="prevStep">Anterior</button>
        <button v-if="step <= maxSteps" class="nextStep" @click="nextStep">{{ nextButtonText }}</button>
      </div>
    </div>
  </template>

<script>
  import Step1 from '@/components/ss-recruiter/ss-mobileRecruiterFlow/Step1.vue';
  import Step2 from '@/components/ss-recruiter/ss-mobileRecruiterFlow/Step2.vue';
  import Step3 from '@/components/ss-recruiter/ss-mobileRecruiterFlow/Step3.vue';
  import Step4 from '@/components/ss-recruiter/ss-mobileRecruiterFlow/Step4.vue';
  import StepPreview from '@/components/ss-recruiter/ss-mobileRecruiterFlow/StepPreview.vue';
  import StepSuccess from '@/components/ss-recruiter/ss-mobileRecruiterFlow/StepSuccess.vue';  
  import SsProgressBarRegister from '@/components/ss-aplicant/ss-mobilePersonFlow/SsProgressBarRegister.vue';

  export default {
    components: {
      SsProgressBarRegister
    },
    data() {
      return {
        step: 1,
        maxSteps: 4,
        editingSection: null,
      };
    },
    computed: {
      currentStepComponent() {
        switch (this.step) {
          case 1: return Step1;
          case 2: return Step2;
          case 3: return Step3;
          case 4: return Step4;
          case 5: return StepPreview;
          case 6: return StepSuccess;
          default: return Step1;
        }
      },
      showStepsNavigation() {
        return this.step <= this.maxSteps;
      },
      nextButtonText() {
        return this.step === this.maxSteps ? 'Previsualiza tu perfil' : 'Siguiente';
      },
      headerText() {
        return this.step === 5 ? 'Previsualización de perfil' : 'Bienvenido Francisco';
      }
    },
    methods: {
      nextStep() {
        if (this.step < this.maxSteps) {
          this.step++;
        } else if (this.step === this.maxSteps) {
          this.step = 5;
        }
      },
      prevStep() {
        if (this.step > 1) {
          this.step--;
        }
      },
      changeStep(stepNumber) {
        this.step = stepNumber;
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
  .welcome
    display: flex
    flex-direction: column
    gap: 15px
    padding: 16px
    .text
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      gap: 16px
      h2
        font-size: 20px
        font-weight: 600
        line-height: 26px
        text-align: left
        color: #023D6A
      button
        height: 32px
        width: 32px
        border-radius: 20px
        border: 2px solid #333333
        display: flex
        align-items: center
        justify-content: center
        text-align: center
    .lineTitle
      max-width: 64px
      width: 100%
      border-radius: 7px
      height: 8px
      background-color: #761D74
      border: none

  </style>
    