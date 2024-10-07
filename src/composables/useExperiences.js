import SsFormInput from '@/components/ss-form/SsFormInput.vue';
import SsFormTextarea from '@/components/ss-form/SsFormTextarea.vue';
import SsFormToggle from '@/components/ss-form/SsFormToggle.vue';
import { ref } from 'vue';

export default function useExperiences() {
    const isImageModalVisible = ref(false);
    const selectedImage = ref(null);
    const showForm = ref(false);
    const experiences = ref([]);
    const newExperience = ref({
        title: '',
        institution: '',
        startDate: '',
        endDate: '',
        attachments: [],
        currentWork: false,
    });
    const editIndex = ref(null);
    const deleteExperienceDialogVisible = ref(false);
    const experienceToDeleteIndex = ref(null);
    
    const experiencesFinalNote = ref('Si tienes fotos de tu experiencia laboral compártela con nosotros (fotos con el equipo de trabajo, en eventos realizados, dando una charla, recibiendo un premio) recuerda que el mal uso de este espacio puede generar que tu perfil no sea aprobado. Si no tienes fotos que generen valor, deja este espacio en blanco.');
    
    const experiencesFormFields = ref([
        { label: 'Cargo', name: 'position', placeholder: 'Ingresala aquí...', type: SsFormInput, required: true },
        { label: 'Empresa', name: 'company', placeholder: 'Ingresala aquí...', type: SsFormInput, required: true },
        { label: 'Fecha de inicio', name: 'startDate', placeholder: '', type: SsFormInput, inputType: 'date', required: true },
        { label: 'Fecha de terminación', name: 'endDate', placeholder: '', type: SsFormInput, inputType: 'date', required: true },
        { label: 'Menciona 3 principales logros', name: 'achievements', placeholder: 'Escribelos aquí...', type: SsFormTextarea, required: true },
        { label: 'Trabaja aquí actualmente', name: 'currentWork', type: SsFormToggle },
    ]);

    const openForm = () => { showForm.value = true; };
    const cancelForm = () => { resetForm(); showForm.value = false; };
    
    const saveExperience = () => {
        if (editIndex.value !== null) {
            experiences.value.splice(editIndex.value, 1, { ...newExperience.value });
            editIndex.value = null;
        } else {
            experiences.value.push({ ...newExperience.value });
        }
        resetForm();
        showForm.value = false;
        saveToLocalStorage();
    };

    const resetForm = () => {
        newExperience.value = {
            title: '',
            institution: '',
            startDate: '',
            endDate: '',
            attachments: [],
            currentWork: false,
        };
    };

    const editExperience = (index) => {
        newExperience.value = { ...experiences.value[index] };
        editIndex.value = index;
        showForm.value = true;
    };

    const openDeleteExperienceDialog = (index) => {
        experienceToDeleteIndex.value = index;
        deleteExperienceDialogVisible.value = true;
        console.log("Abriendo diálogo de eliminación para el índice:", index);
    };

    const confirmDeleteExperience = () => {
        if (experienceToDeleteIndex.value !== null) {
            deleteExperience(experienceToDeleteIndex.value);
            experienceToDeleteIndex.value = null;
            deleteExperienceDialogVisible.value = false;
        }
    };

    const deleteExperience = (index) => {
        experiences.value.splice(index, 1);
        saveToLocalStorage();
    };

    const saveToLocalStorage = () => {
        const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
        stepsData.step4 = { experiences: experiences.value };
        localStorage.setItem('stepsData', JSON.stringify(stepsData));
    };

    const loadExperiencesFromLocalStorage = () => {
        const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
        if (stepsData.step4 && stepsData.step4.experiences) {
            experiences.value = stepsData.step4.experiences;
        }
        
        const editIndexFromLocal = localStorage.getItem('editExperienceIndex');
        if (editIndexFromLocal !== null) {
            editIndex.value = parseInt(editIndexFromLocal, 10);
            newExperience.value = { ...experiences.value[editIndex.value] };
            showForm.value = true;
            localStorage.removeItem('editExperienceIndex');
        }
    };

    const formatDate = (dateString) => {
        const dateParts = dateString.split('-');
        const date = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));

        const day = date.getUTCDate().toString().padStart(2, '0');
        let month = date.toLocaleString('es-ES', { month: 'long', timeZone: 'UTC' });
        month = month.charAt(0).toUpperCase() + month.slice(1);
        const year = date.getUTCFullYear();

        return `${day} ${month} ${year}`;
    };

    const handleFileUpload = (event) => {
        const files = event.target.files;

        if (newExperience.value.attachments.length >= 10) {
            alert('Has alcanzado el límite de 10 archivos.');
            return;
        }

        const availableSlots = 10 - newExperience.value.attachments.length;
        const filesToAdd = Math.min(files.length, availableSlots);

        for (let i = 0; i < filesToAdd; i++) {
            const reader = new FileReader();
            reader.onload = (e) => {
                newExperience.value.attachments.push(e.target.result);
            };
            reader.readAsDataURL(files[i]);
        }
    };

    const hasAttachments = () => {
        return experiences.value.some(experience => experience.attachments && experience.attachments.length > 0);
    };

    const showImage = (image) => {
        selectedImage.value = image;
        isImageModalVisible.value = true;
        document.body.style.overflow = 'hidden'; // Deshabilitar scroll
    };

    const closeImageModal = () => {
        isImageModalVisible.value = false;
        selectedImage.value = null;
        document.body.style.overflow = ''; // Restaurar scroll
    };

    loadExperiencesFromLocalStorage();

    return {
        isImageModalVisible,
        selectedImage,
        showForm,
        experiences,
        newExperience,
        experiencesFinalNote,
        experiencesFormFields,
        editIndex,
        deleteExperienceDialogVisible,
        experienceToDeleteIndex,
        openForm,
        cancelForm,
        saveExperience,
        resetForm,
        editExperience,
        openDeleteExperienceDialog,
        confirmDeleteExperience,
        deleteExperience,
        handleFileUpload,
        hasAttachments,
        showImage,
        closeImageModal,
        formatDate,
    };
}
