<template>
    <div class="content">
        <section class="interest-items">
            <h2>Configura esta sección para un perfil más detallado.</h2>
            <div v-for="(option, index) in options" :key="index" class="option-group">
                <h3>{{ option.title }}</h3>
                <div class="options-wrapper">
                    <button v-if="showLeftArrow[index]" @click="scrollLeft(index)" class="scroll-button left">‹</button>
                    <div class="options" :ref="el => optionContainers[index] = el">
                        <div v-for="(item, idx) in option.items" :key="idx" class="option-item">
                            <div 
                                class="image-container" 
                                :class="{ selected: selectedOptions.includes(`${index}-${idx}`) }" 
                                @click="toggleSelection(`${index}-${idx}`)"
                            >
                                <img :src="item.icon" :alt="item.name" />
                            </div>
                            <p>{{ item.name }}</p>
                        </div>
                    </div>
                    <button v-if="showRightArrow[index]" @click="scrollRight(index)" class="scroll-button right">›</button>
                </div>
            </div>
            <p class="description">{{ finalNote }}</p>
        </section>
        
        <section class="form">
            <form @submit.prevent="submitForm">
                <div v-for="(field, index) in formFields" :key="index" :class="['form-group', field.name === 'linkedin' ? 'linkedin' : '']">
                    <label :for="field.name">{{ field.label }}</label>
                    <component
                        :is="field.type"
                        v-model="formData[field.name]"
                        :placeholder="field.placeholder"
                        :options="field.options"
                        :type="field.inputType"
                        :id="field.name"
                        :label="field.label"
                        :class="{'switch-label': field.type === 'SsFormToggle'}"
                        @change="handleInputChange(field.name)"
                    />
                    <img v-if="field.name === 'linkedin'" src="@/assets/icons/linkedin.svg" alt="LinkedIn Logo" class="linkedin-icon" />
                </div>
            </form>
        </section>
    
        <section class="formations">
            <div class="form-modal">
                <div class="title">
                    <h3>Formación académica</h3>
                </div>
                <form @submit.prevent="saveFormation">
                    <div class="form-group" v-for="(field, index) in formationFormFields" :key="index">
                    <label :for="field.name">{{ field.label }}</label>
                    <component
                        :is="field.type"
                        :key="index"
                        v-model="newFormation[field.name]"
                        :label="field.label"
                        :placeholder="field.placeholder"
                        :type="field.inputType"
                        :inputType="field.inpuType"
                        :required="field.required"
                        :id="field.name"
                    />
                    </div>
                    <div class="button-container">
                        <button class="blue" type="submit">
                            <img src="@/assets/icons/mailBox.svg" alt="">
                            <span>Guardar</span>
                        </button>
                        <button class="transparent" type="submit">
                            <img src="@/assets/icons/plus.svg" alt="">
                            <span>Añadir</span>
                        </button>
                    </div>
                </form>
            </div>
            
            <div class="formations-elements">
                <div v-for="(formation, index) in formations" :key="index" class="form-modal">
                    <form class="grouped" @submit.prevent="saveFormation">
                        <div class="form-group" v-for="(field, index) in formationFormFields" :key="index">
                            <label :for="field.name">{{ field.label }}</label>
                            <component
                                :is="field.type"
                                :key="index"
                                v-model="formation[field.name]"
                                :label="field.label"
                                :placeholder="field.placeholder"
                                :type="field.inputType"
                                :required="field.required"
                                :id="field.name"
                            />
                        </div>
                        <div class="button-container">
                            <button @click="openDeleteFormationDialog(index)" class="purple" type="button">
                                <span>Eliminar</span>
                                <img src="@/assets/icons/trash.svg" alt="">
                            </button>
                            <button @click="editFormation(index)" class="ultrawhite" type="button">
                                <img src="@/assets/icons/edit.svg" alt="">
                                <span>Editar</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <el-dialog
            v-model="deleteFormationDialogVisible"
            title="Confirmar eliminación"
            width="400px"
            center
            >
            <span>¿Estás seguro de que deseas eliminar esta formación?</span>
            <template #footer>
                <div class="dialog-footer">
                <el-button @click="deleteFormationDialogVisible = false">Cancelar</el-button>
                <el-button type="primary" @click="confirmDeleteFormation">Confirmar</el-button>
                </div>
            </template>
        </el-dialog>
    
        <section class="experiences">
            <div class="form-modal">
                <div class="title">
                    <h3>Experiencia laboral</h3>
                </div>
    
                <form @submit.prevent="saveExperience">
                    <div
                    :class="[
                        'form-group',
                        { formToggle: field.type === 'SsFormToggle' }
                    ]"
                    v-for="(field, index) in experiencesFormFields"
                    :key="index"
                    >
                    <label :for="field.name">{{ field.label }}</label>
                    <component
                        :is="field.type"
                        :key="index"
                        v-model="newExperience[field.name]"
                        :label="field.label"
                        :placeholder="field.placeholder"
                        :type="field.inputType"
                        :inputType="field.inpuType"
                        :required="field.required"
                        :id="field.name"
                    />
                    </div>
    
                    <div class="form-group attachments-form-group">
                        <label class="attachments" for="attachments">
                            <div class="addMedia">
                                <img src="@/assets/icons/clip.svg" alt="Clip">
                                <span>
                                    Añadir certificación, fotos o premios
                                </span>
                                <span class="optional">
                                    Opcional
                                </span>
                            </div>
                        </label>
                        <input
                            type="file"
                            id="attachments"
                            @change="handleFileUpload"
                            multiple
                            accept="image/*"
                        />
                        <div class="previews">
                            <img
                            v-for="(attachment, index) in newExperience.attachments"
                            :key="index"
                            :src="attachment"
                            class="preview-image"
                            alt="Vista previa"
                            />
                        </div>
                        <p class="description">{{ experiencesFinalNote }}</p>
                    </div>
                    
                    <div class="button-container">
                        <button class="blue" type="submit">
                            <img src="@/assets/icons/mailBox.svg" alt="save">
                            <span>Guardar</span>
                        </button>
    
                        <button class="white">
                            <img src="@/assets/icons/plus.svg" alt="add">
                            <span>Añadir</span>
                        </button>
                    </div>
                </form>
            </div>
    
            <div class="experiences-items">
                <div v-for="(experience, index) in experiences" :key="index" class="form-modal">
                    <form class="grouped" @submit.prevent="saveExperience">
                        <div
                        :class="[
                            'form-group',
                            { formToggle: field.type === 'SsFormToggle' }
                        ]"
                        v-for="(field, index) in experiencesFormFields"
                        :key="index"
                        >
                        <label :for="field.name">{{ field.label }}</label>
                        <component
                            :is="field.type"
                            :key="index"
                            v-model="experience[field.name]"
                            :label="field.label"
                            :placeholder="field.placeholder"
                            :type="field.inputType"
                            :inputType="field.inpuType"
                            :required="field.required"
                            :id="field.name"
                        />
                        </div>
        
                        <div class="form-group attachments-form-group">
                            <label class="attachments" for="attachments">
                                <div class="addMedia">
                                    <img src="@/assets/icons/clip.svg" alt="Clip">
                                    <span>
                                        Añadir certificación, fotos o premios
                                    </span>
                                    <span class="optional">
                                        Opcional
                                    </span>
                                </div>
                            </label>
                            <input
                                type="file"
                                id="attachments"
                                @change="handleFileUpload"
                                multiple
                                accept="image/*"
                            />
                            <div class="previews">
                                <img
                                v-for="(attachment, index) in newExperience.attachments"
                                :key="index"
                                :src="attachment"
                                class="preview-image"
                                alt="Vista previa"
                                />
                            </div>
                            <p class="description">{{ experiencesFinalNote }}</p>
                        </div>
                        
                        <div class="button-container">
                            <button @click="openDeleteExperienceDialog(index)" type="button" class="blue-text">
                                <span>Eliminar</span>
                                <img src="@/assets/icons/white-delete.svg" alt="delete">
                            </button>
        
                            <button @click="editExperience(index)" type="button" class="bgwhite-txblack">
                                <span>Editar</span>
                                <img src="@/assets/icons/edit.svg" alt="edit">
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        
        <el-dialog
            v-model="deleteExperienceDialogVisible"
            title="Confirmar eliminación"
            width="400px"
            center
            >
            <span>¿Estás seguro de que deseas eliminar esta experiencia?</span>
            <template #footer>
                <div class="dialog-footer">
                <el-button @click="deleteExperienceDialogVisible = false">Cancelar</el-button>
                <el-button type="primary" @click="confirmDeleteExperience">Confirmar</el-button>
                </div>
            </template>
        </el-dialog>
        
        <section class="additional-info">
            <form @submit.prevent="submitForm">
                <div v-for="(field, index) in additionalInfoFormFields" :key="index" class="form-group">
                    <label :for="field.name">
                        {{ field.label }}
                        <span v-if="field.optional" class="optional-badge">Opcional</span>
                    </label>
                    <component
                    :is="field.type"
                    v-model="formData[field.name]"
                    :placeholder="field.placeholder"
                    :options="field.options"
                    :type="field.inputType"
                    :id="field.name"
                    :label="field.label"
                    @change="handleInputChange(field.name)"
                    />
                </div>
            </form>
        </section>
    
        <section class="sendProfile">
            <button class="sendProfileButton">
                <img src="@/assets/icons/whiteMailBox.svg" alt="Icon">
                <span>Guardar información</span>
            </button>
        </section>        
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import useOptions from '@/mixins/optionMixin.js';
import { useEmploymentTypes } from '@/services/candidate/useEmploymentTypes';
import { useJobOptions } from '@/services/candidate/useJobOptions';
import { useCultureTypes } from '@/services/candidate/useCultureTypes';
import SsFormInput from '@/components/ss-form/SsFormInput.vue';
import SsFormSelect from '@/components/ss-form/SsFormSelect.vue';
import SsFormTextarea from '@/components/ss-form/SsFormTextarea.vue';
import SsFormToggle from '@/components/ss-form/SsFormToggle.vue';

const formFields = ref([
    { label: 'Rango salarial desde:', name: 'salaryRange', type: SsFormSelect, options: ['Option 1', 'Option 2'] },
    { label: '¿Cuál es tu nivel profesional?', name: 'professionalLevel', type: SsFormSelect, options: ['Junior', 'Mid', 'Senior'] },
    { label: 'Nombre completo', name: 'fullName', type: SsFormInput, placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'Profesión', name: 'profession', type: SsFormInput, placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'Especialización', name: 'specialization', type: SsFormInput, placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'Número de documento', name: 'documentNumber', type: SsFormInput, placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'Ciudad donde buscas empleo', name: 'city', type: SsFormSelect, options: ['Ciudad 1', 'Ciudad 2'] },
    { label: '¿Estás dispuesto a trasladarte?', name: 'willingToRelocate', type: SsFormToggle },
    { label: 'Correo electrónico', name: 'email', type: SsFormInput, placeholder: 'Escribe aquí...', inputType: 'email' },
    { label: 'Número de celular', name: 'phoneNumber', type: SsFormInput, placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: 'LinkedIn', name: 'linkedin', type: SsFormInput, placeholder: 'Escribe aquí...', inputType: 'text' },
    { label: '¿Qué valor agregado le ofreces a una empresa que te contrata? ¿Qué te diferencia de otras personas?', name: 'addedValue', type: SsFormTextarea, placeholder: 'Escríbelas aquí...' },
    { label: '¿Qué te hace feliz a nivel laboral?', name: 'happiness', type: SsFormInput, placeholder: 'Escríbe aquí...' },
    { label: '¿Cuál es tu talento profesional?', name: 'professionalTalent', type: SsFormInput, placeholder: 'Escríbe aquí...' },
    { label: 'Qué ideas, proyectos o actividades has implementado que quieras contar. / Si no tienes experiencia ¿qué ideas tienes para implementar?', name: 'ideas', type: SsFormTextarea, placeholder: 'Escríbelas aquí...' },
]);

const formData = ref(JSON.parse(localStorage.getItem('stepsData'))?.step2 || {
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
});

import useAdditionalInfo from '@/mixins/additionalInfoMixin';
import useExperiences from '@/mixins/experiencesMixin.js';
import useFormations from '@/mixins/formationsMixin.js';

const {
    formations,
    newFormation,
    formationFormFields,
    deleteFormationDialogVisible,
    saveFormation,
    editFormation,
    openDeleteFormationDialog,
    confirmDeleteFormation,
} = useFormations();

const {
    experiences,
    newExperience,
    experiencesFinalNote,
    experiencesFormFields,
    deleteExperienceDialogVisible,
    editExperience,
    openDeleteExperienceDialog,
    saveExperience,
    handleFileUpload,
} = useExperiences();

const { additionalInfoFormFields} = useAdditionalInfo();

const finalNote = ref('Elegir una cultura específica no te descarta de ningún proceso.');
const showLeftArrow = ref([]);
const showRightArrow = ref([]);
const optionContainers = ref([]);

const employmentTypes = ref([]);
const jobOptions = ref([]);
const cultureTypes = ref([]);

// Composable
const { selectedOptions, options, toggleSelection } = useOptions();
const { listEmploymentTypes } = useEmploymentTypes();
const { listJobOptions } = useJobOptions();
const { listCultureTypes } = useCultureTypes(); 

// Funciones para obtener datos de los servicios
const fetchEmploymentTypes = async () => {
  try {
    const response = await listEmploymentTypes();
    if (response.data && response.data.data) {
      employmentTypes.value = response.data.data.map(item => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
      }));
      options.value[0].items = employmentTypes.value;
    }
  } catch (error) {
    console.error("Error fetching employment types:", error);
  }
};

const fetchJobOptions = async () => {
  try {
    const response = await listJobOptions();
    if (response.data && response.data.data) {
      jobOptions.value = response.data.data.map(item => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
      }));
      options.value[1].items = jobOptions.value;
    }
  } catch (error) {
    console.error("Error fetching job options:", error);
  }
};

const fetchCultureTypes = async () => {
  try {
    const response = await listCultureTypes();
    if (response.data && response.data.data) {
      cultureTypes.value = response.data.data.map(item => ({
        id: item.id,
        name: item.name,
        icon: item.icon,
      }));
      options.value[2].items = cultureTypes.value;
    }
  } catch (error) {
    console.error("Error fetching culture types:", error);
  }
};

const scrollLeft = (index) => {
  const optionsContainer = optionContainers.value[index];
  if (optionsContainer) {
    optionsContainer.scrollBy({ left: -178, behavior: 'smooth' });
    updateArrows(index);
  }
};

const scrollRight = (index) => {
  const optionsContainer = optionContainers.value[index];
  if (optionsContainer) {
    optionsContainer.scrollBy({ left: 178, behavior: 'smooth' });
    updateArrows(index);
  }
};

const updateArrows = (index) => {
  nextTick(() => {
    const optionsContainer = optionContainers.value[index];
    if (optionsContainer) {
      showLeftArrow.value[index] = optionsContainer.scrollLeft > 0;
      showRightArrow.value[index] = optionsContainer.scrollLeft < (optionsContainer.scrollWidth - optionsContainer.clientWidth);
    }
  });
};

const checkArrowsVisibility = () => {
  nextTick(() => {
    options.value.forEach((_, index) => {
      updateArrows(index);
    });
  });
};

const handleInputChange = (fieldName) => {
    if (fieldName === 'willingToRelocate') {
        updateSwitchLabel();
    }
    saveToLocalStorage();
};

const saveToLocalStorage = () => {
    const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
    stepsData.step2 = formData.value;
    localStorage.setItem('stepsData', JSON.stringify(stepsData));
};

const updateSwitchLabel = () => {
    const switchElement = document.querySelector('.switch .slider');
    if (switchElement) {
        switchElement.setAttribute('data-label', formData.value.willingToRelocate ? 'Sí' : 'No');
    }
};

const submitForm = () => {
    console.log(formData.value);
};

onMounted(() => {
    checkArrowsVisibility();
    fetchEmploymentTypes();
    fetchJobOptions(); 
    fetchCultureTypes();
});

watch(options, checkArrowsVisibility, { immediate: true });
</script>
  
<style scoped lang="sass">

.content
    display: flex
    flex-direction: column
    gap: 0
    align-content: center
    justify-items: center
.interest-items
  padding: 40px 196px
  display: flex
  flex-direction: column
  gap: 41px
  background-color: #EDEEF1

  h2
    font-size: 24px
    font-weight: 700
    line-height: 29.26px
    text-align: center
    color: #023D6A

  .option-group
    display: flex
    gap: 18px
    flex-direction: column

    h3
      font-size: 16px
      font-weight: 600
      line-height: 20px
      text-align: left
      color: #023D6A
      margin: 0
    .options-wrapper
        position: relative
        display: flex
        align-items: center
        .options
            display: flex
            width: 100%
            overflow-x: auto
            scrollbar-width: none
            -webkit-overflow-scrolling: touch
            gap: 32px

            .option-item
                display: flex
                flex-direction: column
                align-items: center
                text-align: center
                padding: 11px 24px
                gap: 10px
                cursor: pointer

                .image-container
                    background: #761D74
                    height: 112px
                    width: 112px
                    border-radius: 100px
                    display: flex
                    align-items: center
                    justify-content: center
                    transition: background 0.3s ease-in-out

                    &.selected
                        background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
                        transition: background 0.3s ease-in-out

                p
                font-size: 14px
                font-weight: 500
                line-height: 17.07px
                text-align: center
                color: #350D34
        .scroll-button
            position: absolute
            top: 50%
            transform: translateY(-50%)
            color: #191F27
            border: none
            cursor: pointer
            z-index: 1
            font-size: 50px
    
            &.left
                left: -20px
    
            &.right
                right: -20px
  .description
    font-size: 14px
    font-weight: 400
    line-height: 24px
    text-align: center
    color: #191F27

.form
    position: relative
    padding: 52px 197px
    form
        display: grid
        grid-template-columns: repeat(6, 1fr)
        gap: 33px
        @media (max-width: 1024px) and (min-width: 768px)
            grid-template-columns: repeat(4, 1fr)

    .form-group
        display: flex
        flex-direction: column
        gap: 14px

        &:nth-child(1), &:nth-child(2), &:nth-child(13), &:nth-child(14)
            grid-column: span 3
            @media (max-width: 1024px) and (min-width: 768px)
                grid-column: span 2
        
        &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(6), &:nth-child(7), &:nth-child(8), &:nth-child(9), &:nth-child(10), &:nth-child(11)
            grid-column: span 2
            @media (max-width: 1024px) and (min-width: 768px)
                grid-column: span 2

        &:nth-child(12), &:nth-child(15)
            grid-column: span 6
            @media (max-width: 1024px) and (min-width: 768px)
                grid-column: span 4

        label
            font-size: 14px
            font-weight: 500
            color: #023d6a

        &.linkedin
            position: relative
            .linkedin-icon
                position: absolute
                bottom: 0
                right: 11px
                transform: translateY(-50%)
                width: 28px
                height: 28px

.formations
    padding: 40px 197px
    background-color: #C6CBD2
    display: flex
    flex-direction: column
    gap: 34px
    .formations-elements
        display: flex
        flex-direction: column
        gap: 32px
    .form-modal
        display: flex
        flex-direction: column
        gap: 34px
        .title
            h3
                font-size: 24px
                font-weight: 500
                line-height: 29.26px
                text-align: left
                color: #023D6A
        form
            display: grid
            grid-template-columns: repeat(6, 1fr)
            gap: 32px
            align-items: center
            justify-content: space-between
            padding-bottom: 10px
            border-bottom: 1px solid #FFFFFF
            &.grouped
                border-bottom: none
            .form-group
                display: flex
                flex-direction: column
                gap: 15px

                label
                    font-size: 14px
                    font-weight: 500
                    line-height: 20px
                    text-align: left
                    color: #023D6A
                    white-space: nowrap

                &:nth-child(1), &:nth-child(2)
                    grid-column: span 2

                &:nth-child(3), &:nth-child(4)
                    grid-column: span 1
.button-container
    display: flex
    flex-direction: row !important
    gap: 24px
    justify-content: flex-end
    grid-column: span 6            
    button
        max-width: 140px
        display: flex
        flex-direction: row
        align-items: center
        justify-content: center
        gap: 10px
        padding: 5px 16px
        border-radius: 28px
        span
            font-size: 12px
            font-weight: 500
            line-height: 14.63px
            text-align: center
        &.blue
            background-color: #0DC6DE
            border: 1px solid #0DC6DE
            color: #023D6A
        &.transparent
            border: 1px solid #47586E
            background-color: transparent
        &.white
            border: 1px solid white
            background-color: transparent
        &.purple
            border: 1px solid #761D74
            background-color: transparent
            color: #290A29
        &.ultrawhite
            border: 1px solid #EDEEF1
            background-color: #EDEEF1
        &.blue-text
            border: 1px solid #CDFDF3
            color: #CDFDF3
        &.bgwhite-txblack
            border: 1px solid #EDEEF1
            background-color: #EDEEF1
            color: #290A29

.experiences
    padding: 40px 197px
    background-color: #023D6A
    color: white
    display: flex
    flex-direction: column
    gap: 34px
    .form-modal
        display: flex
        flex-direction: column
        gap: 34px
        .title
            h3
                font-size: 24px
                font-weight: 500
                line-height: 29.26px
                text-align: left
                color: white
        form
            display: grid
            grid-template-columns: repeat(6, 1fr)
            gap: 32px
            align-items: center
            justify-content: space-between
            padding-bottom: 42px
            border-bottom: 1px solid #FFFFFF
            &.grouped
                border-bottom: none
            .form-group
                display: flex
                flex-direction: column
                gap: 15px

                label
                    font-size: 14px
                    font-weight: 500
                    line-height: 20px
                    text-align: left
                    color: white
                    white-space: nowrap

                &:nth-child(1), &:nth-child(2)
                    grid-column: span 2

                &:nth-child(3), &:nth-child(4)
                    grid-column: span 1

                &:nth-child(5)
                    grid-column: span 6

                &:nth-child(6)
                    grid-column: span 2

                &:nth-child(7)
                    grid-column: span 4

                &.attachments-form-group
                    display: flex
                    flex-direction: column
                    gap: 0px
                    .attachments
                        .addMedia
                            display: flex
                            flex-direction: row
                            align-content: center
                            gap: 8px
                            cursor: pointer
                    .previews 
                        display: flex
                        gap: 5px
                        flex-wrap: wrap
                        align-items: center
                        justify-content: center
                        .preview-image 
                            width: 60px
                            height: 60px
                            object-fit: cover
                            border-radius: 8px
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2)
                    .description
                        padding: 10px
                        font-size: 10px
                        font-weight: 400
                        line-height: 12px
                        text-align: left
                        color: #999999

                    input
                        display: none
.additional-info
    padding: 40px 197px
    background-color: white
    form
        display: flex
        flex-direction: column
        gap: 35px
        .form-group
            display: flex
            flex-direction: column
            gap: 15px
            &:nth-child(2)
                order: -1
            label
                display: flex
                flex-direction: row
                gap: 7px
                align-items: center
                font-size: 14px
                font-weight: 500
                line-height: 20px
                text-align: left
                color: #023D6A
                span
                    padding: 4px 10px
                    color: white
                    font-size: 12px
                    font-weight: 500
                    line-height: 14.63px
                    text-align: center
                    color: white
                    border-radius: 25px
                    background-color: #06759F66
.sendProfile
    padding: 23px 197px 67px 197px
    background-color: white
    display: flex
    align-items: center
    justify-content: center
    .sendProfileButton
        padding: 14px 24px
        align-self: center
        width: fit-content
        align-items: center
        gap: 10px
        justify-content: center
        display: flex
        border-radius: 50px
        background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
        span
            font-size: 16px
            font-weight: 500
            line-height: 19.5px
            text-align: center
            color: #F8D2EA
</style>