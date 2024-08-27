export default {
    data() {
        return {
            personalInfoItems: [
                { title: 'Razón social', value: '', name: 'companyName', icon: require('@/assets/icons/suitcase.svg') },
                { title: 'Nit', value: '', name: 'nit', class: 'green-items' },
                { title: 'Ciudad', value: '', name: 'city', class: 'green-items' },
                { title: 'Nombre comercial', value: '', name: 'commercialName', class: 'green-items' },
                { title: 'Correo corporativo', value: '', name: 'email', class: 'green-items' },
                { title: 'Número de celular', value: '', name: 'phone', class: 'green-items' },
                { title: 'Página web', value: '', name: 'webPage', class: 'green-items' },
                { title: 'LinkedIn', value: '', name: 'linkedin', class: 'green-items' },
                { title: 'Instagram', value: '', name: 'instagram', class: 'green-items' },
            ],
        };
    },
};