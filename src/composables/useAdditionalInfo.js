// src/composables/useAdditionalInfo.js
import { ref, onMounted, markRaw } from 'vue';
import SsFormTextarea from '@/components/ss-form/SsFormTextarea.vue';
import SsMultipleFormSelect from '@/components/ss-form/SsMultipleFormSelect.vue';
import { useJobSkills } from '@/services/candidate/useJobSkills';
import { useCandidateService } from '@/services/candidate/useCandidateService';
import store from 'store2';

export default function useAdditionalInfo() {
    const token = store("token");

    const additionalInfoFormData = ref(JSON.parse(localStorage.getItem('step5FormData')) || {
        profiency: [],
        aditionalinfo: '',
    });

    const additionalInfoFormFields = ref([
        { label: 'Elige las 5 competencias que más te caracterizan', name: 'profiency', type: markRaw(SsMultipleFormSelect), options: [], modelValue: additionalInfoFormData.value.profiency },
        { label: 'Datos complementarios', name: 'aditionalinfo', type: markRaw(SsFormTextarea), placeholder: 'Añade información complementaria útil para reclutadores', optional: true },
    ]);

    const { listJobSkills } = useJobSkills();
    const CandidateService = useCandidateService();
    
    const fillFormWithCandidateData = (data) => {
        additionalInfoFormData.value.profiency = data.data.data.job_skills || '';
        additionalInfoFormData.value.aditionalinfo = data.data.data.additional_information || '';
    };

    const fetchJobSkills = async () => {
        try {
            const response = await listJobSkills();
            const jobSkillsData = response.data.data;

            if (Array.isArray(jobSkillsData)) {
                const jobSkillsNames = jobSkillsData.map(jobSkill => ({ id: jobSkill.id, name: jobSkill.name }));
                const jobSkillsField = additionalInfoFormFields.value.find(field => field.name === 'profiency');
                jobSkillsField.options = jobSkillsNames;
            } else {
            console.error('Unexpected response format for cities:', jobSkillsData);
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    
    const saveToLocalStorage = () => {
        const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
        stepsData.step5 = additionalInfoFormData.value;
        localStorage.setItem('stepsData', JSON.stringify(stepsData));
    };

    const handleInputChange = () => {
        saveToLocalStorage();
    };

    onMounted(async () => {
        await fetchJobSkills();
        try {
            const candidateData = await CandidateService.getCandidateProfile(token);
            fillFormWithCandidateData(candidateData);
        } catch (error) {
            console.error('Error fetching candidate profile:', error);
        }
    });

    return {
        additionalInfoFormFields,
        additionalInfoFormData,
        saveToLocalStorage,
        handleInputChange
    };
}
