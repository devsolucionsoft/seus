import { ref, onMounted, markRaw } from 'vue';
import SsFormInput from '@/components/ss-form/SsFormInput.vue';
import SsFormSelect from '@/components/ss-form/SsFormSelect.vue';
import SsFormTextarea from '@/components/ss-form/SsFormTextarea.vue';
import SsFormToggle from '@/components/ss-form/SsFormToggle.vue';
import { useProfessionalLevels } from '@/services/candidate/useProfessionalLevels';
import { useCities } from '@/services/candidate/useCities';
import { useCandidateService } from '@/services/candidate/useCandidateService';
import store from 'store2';

export default function useStep2Form() {
  const token = store("token");
  
  const formFields = ref([
    { label: 'Rango salarial desde:', name: 'salaryRange', type: markRaw(SsFormSelect), options: [] },
    { label: '¿Cuál es tu nivel profesional?', name: 'professionalLevel', type: markRaw(SsFormSelect), options: [] },
    { label: 'Nombres', name: 'names', type: markRaw(SsFormInput), placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'Apellidos', name: 'lastNames', type: markRaw(SsFormInput), placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'Profesión', name: 'profession', type: markRaw(SsFormInput), placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'Especialización', name: 'specialization', type: markRaw(SsFormInput), placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'Número de documento', name: 'documentNumber', type: markRaw(SsFormInput), placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'Ciudad donde buscas empleo', name: 'city', type: markRaw(SsFormSelect), options: [] },
    { label: '¿Estás dispuesto a trasladarte?', name: 'willingToRelocate', type: markRaw(SsFormToggle), class: 'custom-toggle-class'},
    { label: 'Correo electrónico', name: 'email', type: markRaw(SsFormInput), placeholder: 'Escribe aquí...', inputType: 'email' },
    { label: 'Número de celular', name: 'phoneNumber', type: markRaw(SsFormInput), placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'LinkedIn', name: 'linkedin', type: markRaw(SsFormInput), placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: '¿Qué valor agregado le ofreces a una empresa que te contrata?', name: 'addedValue', type: markRaw(SsFormTextarea), placeholder: 'Escríbelas aquí...' },
    { label: '¿Qué te hace feliz a nivel laboral?', name: 'happiness', type: markRaw(SsFormInput), placeholder: 'Escribe aquí...' },
    { label: '¿Cuál es tu talento profesional?', name: 'professionalTalent', type: markRaw(SsFormInput), placeholder: 'Escribe aquí...' },
    { label: 'Qué ideas, proyectos o actividades has implementado', name: 'ideas', type: markRaw(SsFormTextarea), placeholder: 'Escríbelas aquí...' },
  ]);

  const formData = ref(JSON.parse(localStorage.getItem('stepsData'))?.step2 || {
    salaryRange: '',
    professionalLevel: '',
    names: '',
    lastNames: '',
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
  const CandidateService = useCandidateService();

  const fillFormWithCandidateData = (data) => {
    formData.value.salaryRange = data.data.data.salary_from || '';
    formData.value.professionalLevel = data.data.data.professional_level_id || '';
    formData.value.names = data.data.data.name || '';
    formData.value.lastNames = data.data.data.last_name || '';
    formData.value.profession = data.data.data.profession || '';
    formData.value.specialization = data.data.data.specialization || '';
    formData.value.documentNumber = data.data.data.document_number || '';
    formData.value.city = data.data.data.job_search_city_id || '';
    formData.value.willingToRelocate = data.data.data.willing_to_relocate || false;
    formData.value.linkedin = data.data.data.linkedin || '';
    formData.value.email = data.data.data.user?.email || '';
    formData.value.phoneNumber = data.data.data.cell_phone_number || '';
    formData.value.addedValue = data.data.data.added_value || '';
    formData.value.happiness = data.data.data.job_happiness || '';
    formData.value.professionalTalent = data.data.data.professional_talent || '';
    formData.value.ideas = data.data.data.ideas_and_projects || '';
  };

  const fetchProfessionalLevels = async () => {
    try {
      const response = await listProfessionalLevels();
      const levelsData = response.data.data;

      if (Array.isArray(levelsData)) {
        const professionalLevels = levelsData.map(level => ({
          id: level.id,
          name: level.name,
        }));
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
        const cities = citiesData.map(city => ({
          id: city.id, 
          name: city.name,
        }));
        const cityField = formFields.value.find(field => field.name === 'city');
        cityField.options = cities; 
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

  onMounted(async () => {
    await fetchProfessionalLevels();
    await fetchCities();

    try {
      const candidateData = await CandidateService.getCandidateProfile(token);
      fillFormWithCandidateData(candidateData);
    } catch (error) {
      console.error('Error fetching candidate profile:', error);
    }

    updateSwitchLabel();
  });

  return {
    formFields,
    formData,
    handleInputChange,
  };
}
