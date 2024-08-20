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
      confirmDelete(index) {
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta formación?');
        if (confirmed) {
          this.deleteFormation(index);
        }
      },
      deleteFormation(index) {
        this.formations.splice(index, 1);
        this.saveToLocalStorage();
      },
      saveToLocalStorage() {
        const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
        stepsData.formations = this.formations;
        localStorage.setItem('stepsData', JSON.stringify(stepsData));
      },
      isMostRecent(formation) {
        return this.formations.every(f => new Date(f.endDate) <= new Date(formation.endDate));
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        let month = date.toLocaleString('es-ES', { month: 'long' });
        month = month.charAt(0).toUpperCase() + month.slice(1);
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      },
      loadFromLocalStorage() {
        const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
        if (stepsData.formations) {
          this.formations = stepsData.formations;
        }
      },
    },
    mounted() {
      this.loadFromLocalStorage();
    },
  };
  