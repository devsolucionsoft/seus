import { ref, onMounted } from 'vue';
import SsFormInput from '@/components/ss-form/SsFormInput.vue';
import SsFormSelect from '@/components/ss-form/SsFormSelect.vue';
import SsFormTextarea from '@/components/ss-form/SsFormTextarea.vue';
import SsFormToggle from '@/components/ss-form/SsFormToggle.vue';
import { useProfessionalLevels } from '@/services/candidate/useProfessionalLevels';
import { useCities } from '@/services/candidate/useCities';

export default function useStep2Form() {
  const formFields = ref([
    { label: 'Rango salarial desde:', name: 'salaryRange', type: SsFormSelect, options: [] },
    { label: '¿Cuál es tu nivel profesional?', name: 'professionalLevel', type: SsFormSelect, options: [] },
    { label: 'Nombre completo', name: 'fullName', type: SsFormInput, placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'Profesión', name: 'profession', type: SsFormInput, placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'Especialización', name: 'specialization', type: SsFormInput, placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'Número de documento', name: 'documentNumber', type: SsFormInput, placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'Ciudad donde buscas empleo', name: 'city', type: SsFormSelect, options: [] },
    { label: '¿Estás dispuesto a trasladarte?', name: 'willingToRelocate', type: SsFormToggle },
    { label: 'Correo electrónico', name: 'email', type: SsFormInput, placeholder: 'Escribe aquí...', inputType: 'email' },
    { label: 'Número de celular', name: 'phoneNumber', type: SsFormInput, placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'LinkedIn', name: 'linkedin', type: SsFormInput, placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: '¿Qué valor agregado le ofreces a una empresa que te contrata?', name: 'addedValue', type: SsFormTextarea, placeholder: 'Escríbelas aquí...' },
    { label: '¿Qué te hace feliz a nivel laboral?', name: 'happiness', type: SsFormInput, placeholder: 'Escríbe aquí...' },
    { label: '¿Cuál es tu talento profesional?', name: 'professionalTalent', type: SsFormInput, placeholder: 'Escríbe aquí...' },
    { label: 'Qué ideas, proyectos o actividades has implementado', name: 'ideas', type: SsFormTextarea, placeholder: 'Escríbelas aquí...' },
  ]);

  const formData = ref(JSON.parse(localStorage.getItem('stepsData'))?.step2 || {
    salaryRange: '',
    professionalLevel: '',
    fullName: '',
    profession: '',
    specialization: '',
    documentNumber: '',
    city: '',
    willingToRelocate: false,
    linkedin: '',
    email: '',
    phoneNumber: '',
    addedValue: '',
    happiness: '',
    professionalTalent: '',
    ideas: '',
  });

  const { listProfessionalLevels } = useProfessionalLevels();
  const { listCities } = useCities();

  const fetchProfessionalLevels = async () => {
    try {
      const response = await listProfessionalLevels();
  
      const levelsData = response.data.data;
      if (Array.isArray(levelsData)) {
        const professionalLevels = levelsData.map(level => level.name);
        const professionalLevelField = formFields.value.find(field => field.name === 'professionalLevel');
        professionalLevelField.options = professionalLevels;
      } else {
        console.error('Unexpected response format:', levelsData);
      }
    } catch (error) {
      console.error('Error fetching professional levels:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await listCities();
      const citiesData = response.data.data;

      if (Array.isArray(citiesData)) {
        const cityNames = citiesData.map(city => city.name);
        const cityField = formFields.value.find(field => field.name === 'city');
        cityField.options = cityNames;
      } else {
        console.error('Unexpected response format for cities:', citiesData);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const saveToLocalStorage = () => {
    const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
    stepsData.step2 = formData.value;
    localStorage.setItem('stepsData', JSON.stringify(stepsData));
  };

  const handleInputChange = (fieldName) => {
    if (fieldName === 'willingToRelocate') {
      updateSwitchLabel();
    }
    saveToLocalStorage();
  };

  const updateSwitchLabel = () => {
    const switchElement = document.querySelector('.switch .slider');
    if (switchElement) {
      switchElement.setAttribute('data-label', formData.value.willingToRelocate ? 'Sí' : 'No');
    }
  };

  onMounted(() => {
    fetchProfessionalLevels();
    fetchCities();
    updateSwitchLabel();
  });

  return {
    formFields,
    formData,
    handleInputChange,
  };
}
