export default {
    data() {
        return {
            formFields2: [
              { label: 'Nombre del reclutador(a)', name: 'recruiterName', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text'},
              { label: 'Número de celular', name: 'phoneNumber', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'number'},
              { label: 'Correo electrónico', name: 'email', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
              { label: 'Beneficios que ofrece la empresa', name: 'benefits', type: 'SsFormTextarea', placeholder: 'Escribe aquí...', inputType: 'text' },
            ],
            formData: (() => {
              const stepsDataRecruiter = JSON.parse(localStorage.getItem('stepsDataRecruiter')) || {};
              return stepsDataRecruiter.step4 || {
                recruiterName: '',
                phoneNumber: '',
                email: '',
                benefits: '',
              };
            })(),
        };
    },
    methods: {
        saveToLocalStorage() {
          const stepsDataRecruiter = JSON.parse(localStorage.getItem('stepsDataRecruiter')) || {};
          stepsDataRecruiter.step4 = this.formData;
          localStorage.setItem('stepsDataRecruiter', JSON.stringify(stepsDataRecruiter));
        },
        handleInputChange(fieldName) {
          if (fieldName === 'willingToRelocate') {
            this.updateSwitchLabel();
          }
          this.saveToLocalStorage();
      },
    },
  };
  