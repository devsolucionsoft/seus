import { ref, onMounted, nextTick  } from 'vue';
import { useEmploymentTypes } from '@/services/candidate/useEmploymentTypes';
import { useJobOptions } from '@/services/candidate/useJobOptions';
import { useCultureTypes } from '@/services/candidate/useCultureTypes';
import { useCandidateService } from '@/services/candidate/useCandidateService';
import store from 'store2';

export default function useOptions() {
  const token = store("token");
  const selectedOptions = ref([]);
  const options = ref([
    
    {
      title: 'Tipo de formación y empleo que buscas:',
      items: [],
    },
    {
      title: 'Opciones de jornadas:',
      items: [],
    },
    {
      title: 'Qué tipos de culturas te gustan más:',
      items: [],
    },
  ]);

  const showLeftArrow = ref([]);
  const showRightArrow = ref([]);
  const optionContainers = ref([]);

  // Consumo de los servicios
  const employmentTypes = ref([]);
  const jobOptions = ref([]);
  const cultureTypes = ref([]);

  const { listEmploymentTypes } = useEmploymentTypes();
  const { listJobOptions } = useJobOptions();
  const { listCultureTypes } = useCultureTypes();
  const CandidateService = useCandidateService();

  // Funciones para obtener datos de los servicios
  const fetchEmploymentTypes = async () => {
    try {
      const response = await listEmploymentTypes();
      if (response.data && response.data.data) {
        employmentTypes.value = response.data.data.map(item => ({
          id: item.id,
          name: item.name,
          icon: item.icon,
        }));
        options.value[0].items = employmentTypes.value;
      }
    } catch (error) {
      console.error("Error fetching employment types:", error);
    }
  };

  const fetchJobOptions = async () => {
    try {
      const response = await listJobOptions();
      if (response.data && response.data.data) {
        jobOptions.value = response.data.data.map(item => ({
          id: item.id,
          name: item.name,
          icon: item.icon,
        }));
        options.value[1].items = jobOptions.value;
      }
    } catch (error) {
      console.error("Error fetching job options:", error);
    }
  };

  const fetchCultureTypes = async () => {
    try {
      const response = await listCultureTypes();
      if (response.data && response.data.data) {
        cultureTypes.value = response.data.data.map(item => ({
          id: item.id,
          name: item.name,
          icon: item.icon,
        }));
        options.value[2].items = cultureTypes.value;
      }
    } catch (error) {
      console.error("Error fetching culture types:", error);
    }
  };


  const loadCandidateProfile = async () => {
    try {
      const response = await CandidateService.getCandidateProfile(token);
      if (response.data && response.data.data) {
        const candidateData = response.data.data;

        // Asignar los valores a selectedOptions
        selectedOptions.value[0] = candidateData.employment_training_types || [];
        selectedOptions.value[1] = candidateData.jornada_options || [];
        selectedOptions.value[2] = candidateData.cultures || [];
      }
    } catch (error) {
      console.error("Error fetching candidate profile:", error);
    }
  };

  const toggleSelection = (index) => {
    const position = selectedOptions.value.indexOf(index);
    if (position === -1) {
      selectedOptions.value.push(index);
    } else {
      selectedOptions.value.splice(position, 1);
    }
    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
    stepsData.step1 = {
      selectedOptions: selectedOptions.value,
      options: options.value,
    };
    localStorage.setItem('stepsData', JSON.stringify(stepsData));
  };

  const loadFromLocalStorage = () => {
    const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
    if (stepsData.step1) {
      selectedOptions.value = stepsData.step1.selectedOptions || [];
      options.value = stepsData.step1.options || [];
    }
  };

  const scrollLeft = (index) => {
    const optionsContainer = optionContainers.value[index];
    if (optionsContainer) {
      optionsContainer.scrollBy({ left: -178, behavior: 'smooth' });
      updateArrows(index);
    }
  };

  const scrollRight = (index) => {
    const optionsContainer = optionContainers.value[index];
    if (optionsContainer) {
      optionsContainer.scrollBy({ left: 178, behavior: 'smooth' });
      updateArrows(index);
    }
  };

  const updateArrows = (index) => {
    nextTick(() => {
      const optionsContainer = optionContainers.value[index];
      if (optionsContainer) {
        showLeftArrow.value[index] = optionsContainer.scrollLeft > 0;
        showRightArrow.value[index] = optionsContainer.scrollLeft < (optionsContainer.scrollWidth - optionsContainer.clientWidth);
      }
    });
  };

  const checkArrowsVisibility = () => {
    nextTick(() => {
      options.value.forEach((_, index) => {
        updateArrows(index);
      });
    });
  };

  // Cargar datos desde el localStorage al montar el componente
  onMounted(() => {
    loadFromLocalStorage();
    fetchEmploymentTypes();
    fetchJobOptions();
    fetchCultureTypes();
    loadCandidateProfile();
    checkArrowsVisibility();
  });

  // Retornamos los valores y métodos que queremos utilizar en el componente
  return {
    selectedOptions,
    options,
    toggleSelection,
    scrollLeft,
    scrollRight,
    showLeftArrow,
    showRightArrow,
    optionContainers,
    checkArrowsVisibility,
  };
}