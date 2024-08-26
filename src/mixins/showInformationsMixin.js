export default {
    data() {
        return {
        isEditing: false,
        step1Data: null,
        step2Data: null,
        personalInfoItems: [
            { title: 'Nivel profesional', value: '', icon: require('@/assets/icons/reviewIcons/suitcase.svg'), name: 'professionalLevel' },
            { title: 'Rango Salarial', value: '', icon: require('@/assets/icons/reviewIcons/wallet.svg'), name: 'salaryRange', class: 'dashed-box' },
            { title: 'Nombre', value: '', icon: null, name: 'fullName', class: 'green-items' },
            { title: 'Profesion', value: '', icon: null, name: 'profession', class: 'green-items' },
            { title: 'Especialización', value: '', icon: null, name: 'specialization', class: 'green-items' },
            { title: 'Número de documento', value: '', icon: null, name: 'documentNumber', class: 'green-items' },
            { title: 'Ciudad donde busco', value: '', icon: null, name: 'city', class: 'green-items' },
            { title: 'Abierto a nueva ubicación', value: '', icon: null, name: 'willingToRelocate', class: 'toggle-element', isToggle: true },
            { title: 'Correo electrónico', value: '', icon: null, name: 'email', class: 'green-items' },
            { title: 'Número de celular', value: '', icon: null, name: 'phoneNumber', class: 'green-items' },
            { title: 'Red profesional', value: '', name: 'linkedin', class: 'green-items dashed-box', icon: null },
            { title: 'Valor agregado personal', value: '', icon: require('@/assets/icons/reviewIcons/like.svg'), name: 'addedValue',},
            { title: 'Lo que me hace feliz', value: '', icon: require('@/assets/icons/reviewIcons/heart.svg'), name: 'happiness',},
            { title: 'Talento profesional', value: '', icon: require('@/assets/icons/reviewIcons/star.svg'), name: 'professionalTalent',},
            { title: 'Ideas, proyectos o actividades a futuro', value: '', icon: require('@/assets/icons/reviewIcons/sun.svg'), name: 'ideas', },
        ]
        };
    },
    computed: {
        filteredOptions() {
            return (this.step1Data.options || []).map((section, sectionIndex) => {
                return {
                ...section,
                selectedItems: section.items.filter((item, itemIndex) => 
                    this.step1Data.selectedOptions.includes(`${sectionIndex}-${itemIndex}`)
                )
                };
            });
        },
        filteredSections() {
            return this.filteredOptions.filter(section => section.selectedItems && section.selectedItems.length > 0);
        },
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
            this.step1Data = stepsData.step1 || {};
            this.step2Data = stepsData.step2 || {};
            this.step3Data = stepsData.step3 || { formations: [] };
            this.step4Data = stepsData.step4 || { experiences: [] };
            this.loadFormationsFromLocalStorage();
            this.loadExperiencesFromLocalStorage();
            this.updatePersonalInfoItems();
        },  
        confirmDeleteExperience(index) {
            if (confirm("¿Estás seguro de que deseas eliminar esta experiencia?")) {
                this.deleteExperience(index);
            }
        },
        deleteExperience(index) {
            this.step4Data.experiences.splice(index, 1);
            this.updateLocalStorage();
        },
        editExperienceEmit(index) {
            this.$emit('edit-step', 4);
            this.goToStep(4);
            localStorage.setItem('editExperienceIndex', index);
        },
        confirmDeleteFormation(index) {
            if (confirm("¿Estás seguro de que deseas eliminar esta formación?")) {
                this.deleteFormation(index);
            }
        },
        deleteFormation(index) {
            this.step3Data.formations.splice(index, 1);
            this.updateLocalStorage();
        },
        editFormationEmit(index) {
            this.$emit('edit-step', 3);
            this.goToStep(3);
            localStorage.setItem('editFormationIndex', index);
        },
        updatePersonalInfoItems() {
            this.personalInfoItems.forEach(item => {
                if (item.name) {
                item.value = this.step2Data[item.name] || '';
                }
            });
        },
        updateLocalStorage() {
            const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
            stepsData.step3 = this.step3Data;
            stepsData.step4 = this.step4Data; 
            localStorage.setItem('stepsData', JSON.stringify(stepsData));
        },
        goToStep(stepNumber) {
            this.$emit('edit-step', stepNumber);
        },
    },
    created() {
        this.loadData();
    }
};