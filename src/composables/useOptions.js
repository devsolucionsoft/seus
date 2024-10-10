import { ref, onMounted, nextTick } from 'vue';
import { useEmploymentTypes } from '@/services/candidate/useEmploymentTypes';
import { useJobOptions } from '@/services/candidate/useJobOptions';
import { useCultureTypes } from '@/services/candidate/useCultureTypes';
import { useCandidateService } from '@/services/candidate/useCandidateService';
import store from 'store2';

export default function useOptions() {
  const token = store("token");
  const selectedOptions = ref([[], [], []]);
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
  const { listEmploymentTypes } = useEmploymentTypes();
  const { listJobOptions } = useJobOptions();
  const { listCultureTypes } = useCultureTypes();
  const CandidateService = useCandidateService();

  // Funciones para obtener datos de los servicios
  const fetchOptions = async () => {
    try {
      const [employmentResponse, jobResponse, cultureResponse] = await Promise.all([
        listEmploymentTypes(),
        listJobOptions(),
        listCultureTypes()
      ]);

      // Manejo de los datos obtenidos
      options.value[0].items = employmentResponse.data?.data?.map(item => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
      })) || [];
      
      options.value[1].items = jobResponse.data?.data?.map(item => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
      })) || [];
      
      options.value[2].items = cultureResponse.data?.data?.map(item => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
      })) || [];
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const loadCandidateProfile = async () => {
    try {
      const response = await CandidateService.getCandidateProfile(token);
      if (response.data && response.data.data) {
        const candidateData = response.data.data;

        // Asignar los valores a selectedOptions
        selectedOptions.value = [
          candidateData.employment_training_types.map(item => item.id) || [],
          candidateData.jornada_options.map(item => item.id) || [],
          candidateData.cultures.map(item => item.id) || [],
        ];
        markSelectedOptions();
      }
    } catch (error) {
      console.error("Error fetching candidate profile:", error);
    }
  };

  const markSelectedOptions = () => {
    nextTick(() => {
      options.value.forEach((optionCategory, index) => {
        optionCategory.items.forEach(item => {
          item.selected = selectedOptions.value[index].includes(item.id);
        });
      });
    });
  };

  const toggleSelection = (categoryIndex, itemId) => {
    const selectedCategory = selectedOptions.value[categoryIndex];
    const itemIndex = selectedCategory.indexOf(itemId);
  
    if (itemIndex === -1) {
      selectedCategory.push(itemId);
    } else {
      selectedCategory.splice(itemIndex, 1);
    }
  
    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
    stepsData.step1 = {
      selectedOptions: selectedOptions.value,
    };
    localStorage.setItem('stepsData', JSON.stringify(stepsData));
  };

  const loadFromLocalStorage = () => {
    const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
    if (stepsData.step1) {
      selectedOptions.value = stepsData.step1.selectedOptions || [[], [], []];
    }
  };

  const scroll = (index, direction) => {
    const optionsContainer = optionContainers.value[index];
    if (optionsContainer) {
      const scrollAmount = direction === 'left' ? -178 : 178;
      optionsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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

  onMounted(async () => {
    loadFromLocalStorage();
    await fetchOptions();
    await loadCandidateProfile();
    await nextTick();
    markSelectedOptions();
    checkArrowsVisibility();
  });

  // Retornamos los valores y métodos que queremos utilizar en el componente
  return {
    selectedOptions,
    options,
    toggleSelection,
    scrollLeft: (index) => scroll(index, 'left'),
    scrollRight: (index) => scroll(index, 'right'),
    showLeftArrow,
    showRightArrow,
    optionContainers,
    checkArrowsVisibility,
  };
}