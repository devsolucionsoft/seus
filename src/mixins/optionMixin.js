import { ref, onMounted } from 'vue';

export default function useOptions() {
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

  // Cargar datos desde el localStorage al montar el componente
  onMounted(() => {
    loadFromLocalStorage();
  });

  // Retornamos los valores y métodos que queremos utilizar en el componente
  return {
    selectedOptions,
    options,
    toggleSelection,
  };
}