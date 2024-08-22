// src/mixins/experiencesMixin.js

export default {
    data() {
        return {
            showForm: false,
            experiences: [],
            newExperience: {
                title: '',
                institution: '',
                startDate: '',
                endDate: '',
                attachments: [],
                currentWork: false,
            },
            experiencesFinalNote: 'Si tienes fotos de tu experiencia laboral compártela con nosotros (fotos con el equipo de trabajo, en eventos realizados, dando una charla, recibiendo un premio) recuerda que el mal uso de este espacio puede generar que tu perfil no sea aprobado. Si no tienes fotos que generen valor, deja este espacio en blanco.',
            experiencesFormFields: [
                { label: 'Cargo', name: 'position', placeholder: 'Ingresala aquí...', type: 'SsFormInput', required: true },
                { label: 'Empresa', name: 'company', placeholder: 'Ingresala aquí...', type: 'SsFormInput', required: true },
                { label: 'Fecha de inicio', name: 'startDate', placeholder: '', type: 'SsFormInput', inputType: 'date', required: true },
                { label: 'Fecha de terminación', name: 'endDate', placeholder: '', type: 'SsFormInput', inputType: 'date', required: true },
                { label: 'Menciona 3 principales logros', name: 'achievements', placeholder: 'Escribelos aquí...', type: 'SsFormTextarea', required: true },
                { label: 'Trabaja aquí actualmente', name: 'currentWork', type: 'SsFormToggle' },
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
        saveExperience() {
            if (this.editIndex !== null) {
            this.experiences.splice(this.editIndex, 1, { ...this.newExperience });
            this.editIndex = null;
            } else {
            this.experiences.push({ ...this.newExperience });
            }
            this.resetForm();
            this.showForm = false;
            this.saveToLocalStorage();
        },
        resetForm() {
            this.newExperience = {
                title: '',
                institution: '',
                startDate: '',
                endDate: '',
                attachments: [],
                currentWork: false,
            };
        },
        editExperience(index) {
            this.newExperience = { ...this.experiences[index] };
            this.editIndex = index;
            this.showForm = true;
        },
        confirmDeleteExperience(index) {
            const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta formación?');
            if (confirmed) {
                this.deleteExperience(index);
            }
        },
        deleteExperience(index) {
            this.experiences.splice(index, 1);
            this.saveToLocalStorage();
        },
        saveToLocalStorage() {
            const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
            stepsData.step4 = { experiences: this.experiences };
            stepsData.step3 = { formations: this.formations };
            localStorage.setItem('stepsData', JSON.stringify(stepsData));
        },
        loadFromLocalStorage() {
            const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
            if (stepsData.step4 && stepsData.step4.experiences) {
                this.experiences = stepsData.step4.experiences;
            }
            if (stepsData.step3 && stepsData.step3.formations) {
                this.formations = stepsData.step3.formations;
            }
            const editIndex = localStorage.getItem('editExperienceIndex');
                if (editIndex !== null) {
                    this.editIndex = parseInt(editIndex, 10);
                    this.newExperience = { ...this.experiences[this.editIndex] };
                    this.showForm = true;
                    localStorage.removeItem('editExperienceIndex');
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            let month = date.toLocaleString('es-ES', { month: 'long' });
            month = month.charAt(0).toUpperCase() + month.slice(1);
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        },
        handleFileUpload(event) {
            const files = event.target.files;

            if (this.newExperience.attachments.length >= 10) {
                alert('Has alcanzado el límite de 10 archivos.');
                return;
            }

            const availableSlots = 10 - this.newExperience.attachments.length;
            const filesToAdd = Math.min(files.length, availableSlots);

            for (let i = 0; i < filesToAdd; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                this.newExperience.attachments.push(e.target.result);
                };
                reader.readAsDataURL(files[i]);
            }
        },
    },
    mounted() {
        this.loadFromLocalStorage();
    }
};