export default {
    data() {
        return {
            formFields: [
              { label: 'Razon Social', name: 'companyName', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text'},
              { label: 'Nit', name: 'nit', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text'},
              { label: 'Ciudad', name: 'city', type: 'SsFormSelect', options: ['1', '2', '3'] },
              { label: 'Nombre comercial', name: 'commercialName', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
              { label: 'Correo corporativo', name: 'email', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
              { label: 'Celular', name: 'phone', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'number' },
              { label: 'Página web', name: 'webPage', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
              { label: 'LinkedIn', name: 'linkedin', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text', icon: 'true' },
              { label: 'Instagram', name: 'instagram', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text', icon: 'true' },
            ],
            formData: (() => {
              const stepsDataRecruiter = JSON.parse(localStorage.getItem('stepsDataRecruiter')) || {};
              return stepsDataRecruiter.step2 || {
                companyName: '',
                nit: '',
                city: '',
                commercialName: '',
                phone: '',
                webPage: '',
                email: '',
                linkedin: '', 
                instagram: '',
              };
            })(),
        };
    },
    methods: {
        handleInputChange(fieldName) {
            if (fieldName === 'willingToRelocate') {
              this.updateSwitchLabel();
            }
            this.saveToLocalStorage();
        },
        
        saveToLocalStorage() {
          const stepsDataRecruiter = JSON.parse(localStorage.getItem('stepsDataRecruiter')) || {};
          stepsDataRecruiter.step2 = this.formData;
          localStorage.setItem('stepsDataRecruiter', JSON.stringify(stepsDataRecruiter));
        },

        submitForm() {
            console.log(this.formData);
        },
    },
  };
  