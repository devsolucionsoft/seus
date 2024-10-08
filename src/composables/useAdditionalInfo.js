// src/composables/useAdditionalInfo.js
import { ref, onMounted } from 'vue';
import SsFormTextarea from '@/components/ss-form/SsFormTextarea.vue';
import SsMultipleFormSelect from '@/components/ss-form/SsMultipleFormSelect.vue';
import { useJobSkills } from '@/services/candidate/useJobSkills';

export default function useAdditionalInfo() {
    
    const additionalInfoFormData = ref(JSON.parse(localStorage.getItem('step5FormData')) || {
        profiency: '',
        aditionalinfo: '',
    });

    const additionalInfoFormFields = ref([
        { label: 'Elige las 5 competencias que más te caracterizan', name: 'profiency', type: SsMultipleFormSelect, options: [],  modelValue: additionalInfoFormData.value.profiency },
        { label: 'Datos complementarios', name: 'aditionalinfo', type: SsFormTextarea, placeholder: 'Añade información complementaria útil para reclutadores', optional: true },
    ]);

    const saveToLocalStorage = () => {
        localStorage.setItem('step5FormData', JSON.stringify(additionalInfoFormData.value));
    };

    const { listJobSkills } = useJobSkills();
    const fetchJobSkills = async () => {
        try {
            const response = await listJobSkills();
            const jobSkillsData = response.data.data;

            if (Array.isArray(jobSkillsData)) {
                const jobSkillsNames = jobSkillsData.map(jobSkill => ({ name: jobSkill.name }));
                const jobSkillsField = additionalInfoFormFields.value.find(field => field.name === 'profiency');
                jobSkillsField.options = jobSkillsNames;
            } else {
            console.error('Unexpected response format for cities:', jobSkillsData);
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    onMounted(() => {
        fetchJobSkills();
    });

    return {
        additionalInfoFormFields,
        additionalInfoFormData,
        saveToLocalStorage,
    };
}
