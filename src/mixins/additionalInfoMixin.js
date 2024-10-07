// src/composables/useAdditionalInfo.js
import { ref } from 'vue';
import SsFormTextarea from '@/components/ss-form/SsFormTextarea.vue';
import SsFormSelect from '@/components/ss-form/SsFormSelect.vue';


export default function useAdditionalInfo() {
    const additionalInfoFormFields = ref([
        { label: 'Elige las 5 competencias que más te caracterizan', name: 'profiency', type: SsFormSelect, options: ['Junior', 'Mid', 'Senior'] },
        { label: 'Datos complementarios', name: 'aditionalinfo', type: SsFormTextarea, placeholder: 'Añade información complementaria útil para reclutadores', optional: true },
    ]);

    const additionalInfoFormData = ref(JSON.parse(localStorage.getItem('step5FormData')) || {
        profiency: '',
        aditionalinfo: '',
    });

    const saveToLocalStorage = () => {
        localStorage.setItem('step5FormData', JSON.stringify(additionalInfoFormData.value));
    };

    const submitForm = () => {
        saveToLocalStorage();
    };

    return {
        additionalInfoFormFields,
        additionalInfoFormData,
        submitForm,
        saveToLocalStorage,
    };
}
