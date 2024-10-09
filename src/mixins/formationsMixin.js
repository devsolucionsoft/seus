// src/mixins/formationMixin.js
export default {
  data() {
    return {
      showForm: false,
      formations: [],
      newFormation: {
        title: '',
        institution: '',
        startDate: '',
        endDate: '',
      },
      formationFormFields: [
        { label: 'Título obtenido', name: 'title', placeholder: 'Ingresala aquí...', type: 'SsFormInput', required: true },
        { label: 'Institución', name: 'institution', placeholder: 'Ingresala aquí...', type: 'SsFormInput', required: true },
        { label: 'Fecha de inicio', name: 'startDate', placeholder: '', type: 'SsFormInput', inputType: 'date', required: true },
        { label: 'Fecha de terminación', name: 'endDate', placeholder: '', type: 'SsFormInput', inputType: 'date', required: true },
      ],
      editIndex: null,
      deleteFormationDialogVisible: false,
      formationToDeleteIndex: null,
    };
  },
  methods: {
    openForm() {
      this.showForm = true;
    },
    cancelForm() {
      this.resetForm();
      this.showForm = false;
    },
    saveFormation() {
      if (this.editIndex !== null) {
        this.formations.splice(this.editIndex, 1, { ...this.newFormation });
        this.editIndex = null;
      } else {
        this.formations.push({ ...this.newFormation });
      }
      this.resetForm();
      this.showForm = false;
      this.saveToLocalStorage();
    },
    resetForm() {
      this.newFormation = {
        title: '',
        institution: '',
        startDate: '',
        endDate: '',
      };
    },
    editFormation(index) {
      this.newFormation = { ...this.formations[index] };
      this.editIndex = index;
      this.showForm = true;
    },
    openDeleteFormationDialogVisible(index) {
        this.formationToDelete = index;
        this.deleteFormationDialogVisible = true;
    },
    confirmDeleteFormation() {
      if (this.formationToDelete !== null) {
        this.deleteFormation(this.formationToDelete);
        this.formationToDelete = null;
        this.deleteFormationDialogVisible = false;
      }
    },
    deleteFormation(index) {
      this.formations.splice(index, 1);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
      stepsData.step3 = { formations: this.formations };
      localStorage.setItem('stepsData', JSON.stringify(stepsData));
    },
    isMostRecent(itemIndex) {
      if (this.formations.length === 0) return false;

      const latestIndex = this.formations.reduce((latest, formation, index) => {
          return new Date(formation.endDate) > new Date(this.formations[latest].endDate) ? index : latest;
      }, 0);
      return itemIndex === latestIndex;
    },
    formatDate(dateString) {
      const dateParts = dateString.split('-');
      const date = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
    
      const day = date.getUTCDate().toString().padStart(2, '0');
      let month = date.toLocaleString('es-ES', { month: 'long', timeZone: 'UTC' });
      month = month.charAt(0).toUpperCase() + month.slice(1);
      const year = date.getUTCFullYear();
    
      return `${day} ${month} ${year}`;
    },
    loadFormationsFromLocalStorage() {
      const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
      if (stepsData.step3 && stepsData.step3.formations) {
          this.formations = stepsData.step3.formations;
      }
      const editIndex = localStorage.getItem('editFormationIndex');
      if (editIndex !== null) {
          this.editIndex = parseInt(editIndex, 10);
          this.newFormation = { ...this.formations[this.editIndex] };
          this.showForm = true;
          localStorage.removeItem('editFormationIndex');
      }
    },
  },
  mounted() {
    this.loadFormationsFromLocalStorage();
  },
};