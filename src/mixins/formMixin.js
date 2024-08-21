export default {
    data() {
        return {
            formFields: [
              { label: 'Rango salarial desde:', name: 'salaryRange', type: 'SsFormSelect', options: ['Option 1', 'Option 2'] },
              { label: '¿Cuál es tu nivel profesional?', name: 'professionalLevel', type: 'SsFormSelect', options: ['Junior', 'Mid', 'Senior'] },
              { label: 'Nombre completo', name: 'fullName', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
              { label: 'Profesión', name: 'profession', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
              { label: 'Especialización', name: 'specialization', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
              { label: 'Número de documento', name: 'documentNumber', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
              { label: 'Ciudad donde buscas empleo', name: 'city', type: 'SsFormSelect', options: ['Ciudad 1', 'Ciudad 2'] },
              { label: '¿Estás dispuesto a trasladarte?', name: 'willingToRelocate', type: 'SsFormToggle' },
              { label: 'Correo electrónico', name: 'email', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'email' },
              { label: 'Número de celular', name: 'phoneNumber', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
              { label: 'LinkedIn', name: 'linkedin', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
              { label: '¿Qué valor agregado le ofreces a una empresa que te contrata? ¿Qué te diferencia de otras personas?', name: 'addedValue', type: 'SsFormTextarea', placeholder: 'Escríbelas aquí...' },
              { label: '¿Qué te hace feliz a nivel laboral?', name: 'happiness', type: 'SsFormInput', placeholder: 'Escríbe aquí...' },
              { label: '¿Cuál es tu talento profesional?', name: 'professionalTalent', type: 'SsFormInput', placeholder: 'Escríbe aquí...' },
              { label: 'Qué ideas, proyectos o actividades has implementado que quieras contar. / Si no tienes experiencia ¿qué ideas tienes para implementar?', name: 'ideas', type: 'SsFormTextarea', placeholder: 'Escríbelas aquí...' },
            ],
            formData: (() => {
              const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
              return stepsData.step2 || {
                salaryRange: '',
                professionalLevel: '',
                fullName: '',
                profession: '',
                specialization: '',
                documentNumber: '',
                city: '',
                willingToRelocate: false,
                linkedin: '', 
                email: '',
                phoneNumber: '',
                addedValue: '',
                happiness: '',
                professionalTalent: '',
                ideas: '',
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
          const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
          stepsData.step2 = this.formData;
          localStorage.setItem('stepsData', JSON.stringify(stepsData));
        },
        updateSwitchLabel() {
          const switchElement = document.querySelector('.switch .slider');
          if (switchElement) {
            switchElement.setAttribute('data-label', this.formData.willingToRelocate ? 'Sí' : 'No');
          }
        },
        submitForm() {
            console.log(this.formData);
        },
    },
    mounted() {
        this.updateSwitchLabel();
    },
  };
  