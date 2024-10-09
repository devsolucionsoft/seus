import { ref, computed, onMounted } from 'vue';

export default function useShowInformation() {
  const step1Data = ref(null);
  const step2Data = ref(null);
  const step3Data = ref({ formations: [] });
  const step4Data = ref({ experiences: [] });
  
  const personalInfoItems = ref([
    { title: 'Nivel profesional', value: '', icon: require('@/assets/icons/reviewIcons/suitcase.svg'), name: 'professionalLevel', group: 1 },
    { title: 'Rango Salarial', value: '', icon: require('@/assets/icons/reviewIcons/wallet.svg'), name: 'salaryRange', group: 1 },
    { title: 'Nombre', value: '', icon: null, name: 'fullName', class: 'green-items', group: 2 },
    { title: 'Profesion', value: '', icon: null, name: 'profession', class: 'green-items', group: 2 },
    { title: 'Especialización', value: '', icon: null, name: 'specialization', class: 'green-items', group: 2 },
    { title: 'Número de documento', value: '', icon: null, name: 'documentNumber', class: 'green-items', group: 2 },
    { title: 'Ciudad donde busco', value: '', icon: null, name: 'city', class: 'green-items', group: 2 },
    { title: 'Abierto a nueva ubicación', value: '', icon: null, name: 'willingToRelocate', class: 'toggle-element', isToggle: true, group: 2 },
    { title: 'Correo electrónico', value: '', icon: null, name: 'email', class: 'green-items', group: 2 },
    { title: 'Número de celular', value: '', icon: null, name: 'phoneNumber', class: 'green-items', group: 2 },
    { title: 'Red profesional', value: '', name: 'linkedin', class: 'green-items', icon: null, group: 2 },
    { title: 'Valor agregado personal', value: '', icon: require('@/assets/icons/reviewIcons/like.svg'), name: 'addedValue', group: 3},
    { title: 'Lo que me hace feliz', value: '', icon: require('@/assets/icons/reviewIcons/heart.svg'), name: 'happiness', group: 3},
    { title: 'Talento profesional', value: '', icon: require('@/assets/icons/reviewIcons/star.svg'), name: 'professionalTalent', group: 3},
    { title: 'Ideas, proyectos o actividades a futuro', value: '', icon: require('@/assets/icons/reviewIcons/sun.svg'), name: 'ideas', group: 3},
  ]);

  // Computed properties para las secciones y los elementos seleccionados
  const filteredOptions = computed(() => {
    return (step1Data.value?.options || []).map((section, sectionIndex) => ({
      ...section,
      selectedItems: section.items.filter((_, itemIndex) => 
        step1Data.value.selectedOptions.includes(`${sectionIndex}-${itemIndex}`)
      )
    }));
  });

  const filteredSections = computed(() => {
    return filteredOptions.value.filter(section => section.selectedItems && section.selectedItems.length > 0);
  });

  const groupedItems = computed(() => {
    return personalInfoItems.value.reduce((groups, item) => {
      const groupIndex = item.group;
      if (!groups[groupIndex]) {
        groups[groupIndex] = [];
      }
      groups[groupIndex].push(item);
      return groups;
    }, {});
  });

  // Cargar datos de localStorage
  const loadData = () => {
    const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
    step1Data.value = stepsData.step1 || {};
    step2Data.value = stepsData.step2 || {};
    step3Data.value = stepsData.step3 || { formations: [] };
    step4Data.value = stepsData.step4 || { experiences: [] };
    updatePersonalInfoItems();  
  };

  const updatePersonalInfoItems = () => {
    personalInfoItems.value.forEach(item => {
      if (item.name) {
        item.value = step2Data.value[item.name] || '';
      }
    });
  };

  const updateLocalStorage = () => {
    const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
    stepsData.step3 = step3Data.value;
    stepsData.step4 = step4Data.value;
    localStorage.setItem('stepsData', JSON.stringify(stepsData));
  };

  onMounted(() => {
    loadData();
  });

  return {
    step1Data,
    step2Data,
    step3Data,
    step4Data,
    filteredSections,
    groupedItems,
    updateLocalStorage,
    updatePersonalInfoItems,
  };
}
