export default {
    data() {
        return {
            formFields: [
                { label: 'Cargo', name: 'position', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
                { label: 'Salario', name: 'salary', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
                { label: 'Ciudad', name: 'city', type: 'SsFormSelect', options: ['1', '2', '3'] },
                { label: 'Vacante disponible', name: 'availableVacancy', type: 'SsFormSelect', options: ['1', '2', '3'] },
                { label: 'Responsabilidades', name: 'responsabilities', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
                { label: 'Fecha de Cierre', name: 'endDate', placeholder: '', type: 'SsFormInput', inputType: 'date'},
                { label: 'Estudios requeridos', name: 'requiredStudies', type: 'SsFormSelect', options: ['Tecnico', 'Tecnologo', 'Profesional'], image: require('@/assets/icons/help.svg')  },
                { label: 'Conocimientos esperados (10 como mínimo)', name: 'expectedKnowledge', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
                { label: 'Experiencia requerida', name: 'requiredExperience', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
                { label: 'Palabras clave de la vacante', name: 'keywords', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
                { label: '¿Cómo quieres recibir las solicitudes?', name: 'requestMethod', type: 'SsFormSelect', options: ['Email', 'Celular', 'Llamada'] },
                { label: 'Correo electrónico', name: 'email', type: 'SsFormInput', placeholder: 'Escribe aquí...@....', inputType: 'text' },
                { label: 'Añade una descripción del empleo', name: 'description', type: 'SsFormTextarea', placeholder: 'Escríbela aquí...' },
            ],
            formData: (() => {
                return {
                    position: '',
                    salary: '',
                    city: '',
                    availableVacancy: '',
                    responsabilities: '',
                    endDate: '',
                    requiredStudies: '',
                    expectedKnowledge: false,
                    requiredExperience: '', 
                    keywords: '',
                    requestMethod: '',
                    email: '',
                    description: '',
                };
            })(),
        };
    },
    methods: {
        submitForm() {
        },
    },
  };
  