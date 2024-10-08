import { ref } from 'vue';
import SsFormInput from '@/components/ss-form/SsFormInput.vue';

export default function useFormations() {
  const showForm = ref(false);
  const formations = ref([]);
  const newFormation = ref({
    title: '',
    institution: '',
    startDate: '',
    endDate: '',
  });

  const formationFormFields = ref([
    { label: 'Título obtenido', name: 'title', placeholder: 'Ingresala aquí...', type: SsFormInput, required: true },
    { label: 'Institución', name: 'institution', placeholder: 'Ingresala aquí...', type: SsFormInput, required: true },
    { label: 'Fecha de inicio', name: 'startDate', placeholder: '', type: SsFormInput, inputType: 'date', required: true },
    { label: 'Fecha de terminación', name: 'endDate', placeholder: '', type: SsFormInput, inputType: 'date', required: true },
  ]);
  
  const editIndex = ref(null);
  const deleteFormationDialogVisible = ref(false);
  const formationToDelete = ref(null);

  const openForm = () => {
    showForm.value = true;
  };

  const cancelForm = () => {
    resetForm();
    showForm.value = false;
  };

  const saveFormation = () => {
    if (editIndex.value !== null) {
      formations.value.splice(editIndex.value, 1, { ...newFormation.value });
      editIndex.value = null;
    } else {
      formations.value.push({ ...newFormation.value });
    }
    resetForm();
    showForm.value = false;
    saveToLocalStorage();
  };

  const resetForm = () => {
    newFormation.value = {
      title: '',
      institution: '',
      startDate: '',
      endDate: '',
    };
  };

  const editFormation = (index) => {
    newFormation.value = { ...formations.value[index] };
    editIndex.value = index;
    showForm.value = true;
  };

  const openDeleteFormationDialog = (index) => {
    formationToDelete.value = index;
    deleteFormationDialogVisible.value = true;
  };

  const confirmDeleteFormation = () => {
    if (formationToDelete.value !== null) {
      deleteFormation(formationToDelete.value);
      formationToDelete.value = null;
      deleteFormationDialogVisible.value = false;
    }
  };

  const deleteFormation = (index) => {
    formations.value.splice(index, 1);
    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
    stepsData.step3 = { formations: formations.value };
    localStorage.setItem('stepsData', JSON.stringify(stepsData));
  };

  const loadFormationsFromLocalStorage = () => {
    const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
    if (stepsData.step3 && stepsData.step3.formations) {
      formations.value = stepsData.step3.formations;
    }
    const editIndexValue = localStorage.getItem('editFormationIndex');
    if (editIndexValue !== null) {
      editIndex.value = parseInt(editIndexValue, 10);
      newFormation.value = { ...formations.value[editIndex.value] };
      showForm.value = true;
      localStorage.removeItem('editFormationIndex');
    }
  };

  const isMostRecent = (itemIndex) => {
    if (formations.value.length === 0) return false;

    const latestIndex = formations.value.reduce((latest, formation, index) => {
      return new Date(formation.endDate) > new Date(formations.value[latest].endDate) ? index : latest;
    }, 0);

    return itemIndex === latestIndex;
  };
  
  const formatDate = (dateString) => {
    const dateParts = dateString.split('-');
    const date = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));

    const day = date.getUTCDate().toString().padStart(2, '0');
    let month = date.toLocaleString('es-ES', { month: 'long', timeZone: 'UTC' });
    month = month.charAt(0).toUpperCase() + month.slice(1);
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
  };

  // Cargar las formaciones al montar
  loadFormationsFromLocalStorage();

  return {
    showForm,
    formations,
    newFormation,
    formationFormFields,
    editIndex,
    deleteFormationDialogVisible,
    formationToDelete,
    openForm,
    cancelForm,
    saveFormation,
    saveToLocalStorage,
    resetForm,
    editFormation,
    openDeleteFormationDialog,
    confirmDeleteFormation,
    deleteFormation,
    isMostRecent,
    formatDate,
  };
}
