export default {
    data() {
      return {
        additionalInfoFormFields: [
          { label: 'Elige las 5 competencias que más te caracterizan', name: 'profiency', type: 'SsFormSelect', options: ['Junior', 'Mid', 'Senior'] },
          { label: 'Datos complementarios', name: 'aditionalinfo', type: 'SsFormTextarea', placeholder: 'Añade información complementaria útil para reclutadores', optional: true },
        ],
        formData: JSON.parse(localStorage.getItem('step5FormData')) || {
          profiency: '',
          aditionalinfo: '',
        },
      };
    },
    methods: {
      submitForm() {
        console.log(this.formData);
        this.saveToLocalStorage();
      },
      saveToLocalStorage() {
        localStorage.setItem('step5FormData', JSON.stringify(this.formData));
      },
    },
  };