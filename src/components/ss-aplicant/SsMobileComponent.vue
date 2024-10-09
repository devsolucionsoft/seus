<template>
  <div class="welcome">
    <div class="text">
      <h2>{{ headerText }}</h2>
      <button><img src="@/assets/icons/dots.svg" alt="..."></button>
    </div>
    <div class="lineTitle"></div>
  </div>
  <div class="body">
    <SsProgressBarRegister 
      :step="step" 
      :steps="5"
      class="hiddenLast"
      :labels="['Empleo', 'Datos Personales', 'Formación', 'Experiencia', 'Revision']" 
    />
    <component :is="currentStepComponent" @edit-step="changeStep" />
    
    <!-- Botones de navegación -->
    <div v-if="showStepsNavigation" class="stepsNavigation">
      <button v-if="step > 1" class="prevStep" @click="prevStep">Anterior</button>
      <button v-if="step <= maxSteps" class="nextStep" @click="nextStep">{{ nextButtonText }}</button>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import SsProgressBarRegister from '@/components/ss-aplicant/ss-mobilePersonFlow/SsProgressBarRegister.vue';
import Step1 from '@/components/ss-aplicant/ss-mobilePersonFlow/Step1.vue';
import Step2 from '@/components/ss-aplicant/ss-mobilePersonFlow/Step2.vue';
import Step3 from '@/components/ss-aplicant/ss-mobilePersonFlow/Step3.vue';
import Step4 from '@/components/ss-aplicant/ss-mobilePersonFlow/Step4.vue';
import Step5 from '@/components/ss-aplicant/ss-mobilePersonFlow/Step5.vue';
import StepPreview from '@/components/ss-aplicant/ss-mobilePersonFlow/StepPreview.vue';
import StepSuccess from '@/components/ss-aplicant/ss-mobilePersonFlow/StepSuccess.vue';
import { useCandidateService } from '@/services/candidate/useCandidateService';
import store from 'store2';

// Estado para el paso actual y el máximo de pasos
const step = ref(1);
const maxSteps = ref(5);

// Datos del candidato
const candidateData = ref({});
const CandidateService = useCandidateService();

const token = store("token");

// Función para obtener el perfil del candidato
const fetchCandidateProfile = async () => {
  const result = await CandidateService.getCandidateProfile(token);
  if (result.success) {
    candidateData.value = result.data;
  }
};

// Computed para cambiar el componente de paso
const currentStepComponent = computed(() => {
  switch (step.value) {
    case 1: return Step1;
    case 2: return Step2;
    case 3: return Step3;
    case 4: return Step4;
    case 5: return Step5;
    case 6: return StepPreview;
    case 7: return StepSuccess;
    default: return Step1;
  }
});

// Computed para el texto del botón "Siguiente"
const nextButtonText = computed(() => {
  return step.value === maxSteps.value ? 'Previsualiza tu perfil' : 'Siguiente';
});

// Computed para el texto del encabezado
const headerText = computed(() => {
  return step.value === 6
    ? 'Previsualización de perfil'
    : `Bienvenido ${candidateData.value.name || ''}`;
});

// Computed para mostrar los botones de navegación solo en pasos <= 5
const showStepsNavigation = computed(() => {
  return step.value <= maxSteps.value;
});

// Función para cambiar al siguiente paso
const nextStep = () => {
  if (step.value < maxSteps.value) {
    step.value++;
  } else if (step.value === maxSteps.value) {
    step.value = 6;
  }
};

// Función para regresar al paso anterior
const prevStep = () => {
  if (step.value > 1) {
    step.value--;
  }
};

// Función para cambiar de paso manualmente
const changeStep = (stepNumber) => {
  step.value = stepNumber;
};

// Ejecuta la carga de perfil al montar el componente
onMounted(() => {
  fetchCandidateProfile();
});
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
    