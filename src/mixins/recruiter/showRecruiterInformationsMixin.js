export default {
    data() {
        return {
        isEditing: false,
        step1Data: null,
        step2Data: null,
        personalInfoItems: [
            { title: 'Razón social', value: '', name: 'companyName', class: 'green-items' },
            { title: 'Nit', value: '', name: 'nit', class: 'green-items' },
            { title: 'Ciudad', value: '', name: 'city', class: 'green-items' },
            { title: 'Nombre comercial', value: '', name: 'commercialName', class: 'green-items' },
            { title: 'Correo corporativo', value: '', name: 'email', class: 'green-items' },
            { title: 'Número de celular', value: '', name: 'phone', class: 'green-items' },
            { title: 'Página web', value: '', name: 'webPage', class: 'green-items' },
            { title: 'LinkedIn', value: '', name: 'linkedin', class: 'green-items' },
            { title: 'Instagram', value: '', name: 'instagram', class: 'green-items' },
        ],
        personalInfoItems2: [
            { title: 'Nombre del reclutador(a)', value: '', name: 'recruiterName', class: 'green-items' },
            { title: 'Número de celular', value: '', name: 'phoneNumber', class: 'green-items' },
            { title: 'Correo electrónico', value: '', name: 'email', class: 'green-items' },
            { title: 'Beneficios que ofrece la empresa', value: '', name: 'benefits', class: 'green-items' },
        ]
        };
    },
    computed: {
        filteredOptions1() {
            return (this.step1Data.options || []).map((section, sectionIndex) => {
                return {
                ...section,
                selectedItems: section.items.filter((item, itemIndex) => 
                    this.step1Data.selectedOptions.includes(`${sectionIndex}-${itemIndex}`)
                )
                };
            });
        },
        filteredSections1() {
            return this.filteredOptions1.filter(section => section.selectedItems && section.selectedItems.length > 0);
        },
        filteredOptions2() {
            return (this.step3Data.options2 || []).map((section, sectionIndex) => {
                return {
                ...section,
                selectedItems: section.items.filter((item, itemIndex) => 
                    this.step3Data.selectedOptions2.includes(`${sectionIndex}-${itemIndex}`)
                )
                };
            });
        },
        filteredSections2() {
            return this.filteredOptions2.filter(section => section.selectedItems && section.selectedItems.length > 0);
        },
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            const stepsData = JSON.parse(localStorage.getItem('stepsDataRecruiter')) || {};
            this.step1Data = stepsData.step1 || {};
            this.step2Data = stepsData.step2 || {};
            this.step3Data = stepsData.step3 || {};
            this.step4Data = stepsData.step4 || {};
            this.updatePersonalInfoItems();
        },  
        updatePersonalInfoItems() {
            this.personalInfoItems.forEach(item => {
                if (item.name) {
                item.value = this.step2Data[item.name] || '';
                }
            });
            this.personalInfoItems2.forEach(item => {
                if (item.name) {
                item.value = this.step4Data[item.name] || '';
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