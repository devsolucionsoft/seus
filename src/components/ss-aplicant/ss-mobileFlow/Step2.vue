<template>
  <div class="step2">
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
  </div>
</template>

<script>
import SsFormInput from '@/components/ss-form/SsFormInput.vue';
import SsFormSelect from '@/components/ss-form/SsFormSelect.vue';
import SsFormTextarea from '@/components/ss-form/SsFormTextarea.vue';
import SsFormToggle from '@/components/ss-form/SsFormToggle.vue';

export default {
  name: 'Step2',
  components: {
    SsFormInput,
    SsFormSelect,
    SsFormTextarea,
    SsFormToggle,
  },
  data() {
    return {
      formFields: [
        { label: 'Rango salarial desde:', name: 'salaryRange', type: 'SsFormSelect', options: ['Option 1', 'Option 2'] },
        { label: '¿Cuál es tu nivel profesional?', name: 'professionalLevel', type: 'SsFormSelect', options: ['Junior', 'Mid', 'Senior'] },
        { label: 'Nombre completo', name: 'fullName', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
        { label: 'Profesión', name: 'profession', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
        { label: 'Especialización', name: 'specialization', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
        { label: 'Número de documento', name: 'documentNumber', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
        { label: 'Ciudad donde buscas empleo', name: 'city', type: 'SsFormSelect', options: ['Ciudad 1', 'Ciudad 2'] },
        { label: '¿Estás dispuesto a trasladarte?', name: 'willingToRelocate', type: 'SsFormToggle' },
        { label: 'Correo electrónico', name: 'email', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'email' },
        { label: 'Número de celular', name: 'phoneNumber', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
        { label: 'LinkedIn', name: 'linkedin', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
        { label: '¿Qué valor agregado le ofreces a una empresa que te contrata? ¿Qué te diferencia de otras personas?', name: 'addedValue', type: 'SsFormTextarea', placeholder: 'Escríbelas aquí...' },
        { label: '¿Qué te hace feliz a nivel laboral?', name: 'happiness', type: 'SsFormInput', placeholder: 'Escríbe aquí...' },
        { label: '¿Cuál es tu talento profesional?', name: 'professionalTalent', type: 'SsFormInput', placeholder: 'Escríbe aquí...' },
        { label: 'Qué ideas, proyectos o actividades has implementado que quieras contar. / Si no tienes experiencia ¿qué ideas tienes para implementar?', name: 'ideas', type: 'SsFormTextarea', placeholder: 'Escríbelas aquí...' },
      ],
      formData: {
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
      },
    };
  },
  methods: {
    handleInputChange(fieldName) {
      if (fieldName === 'willingToRelocate') {
        this.updateSwitchLabel();
      }
    },
    updateSwitchLabel() {
      const switchElement = document.querySelector('.switch .slider');
      if (switchElement) {
        switchElement.setAttribute('data-label', this.formData.willingToRelocate ? 'Sí' : 'No');
      }
    },
    submitForm() {
      console.log(this.formData);
      // Validar y enviar el formulario
    },
  },
  mounted() {
    this.updateSwitchLabel();
  },
};
</script>

<style lang="sass">
.step2
  padding: 16px
  form
    display: flex
    flex-direction: column
    gap: 16px
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
      &.linkedin
        position: relative
        .linkedin-icon
          position: absolute
          bottom: 0
          right: 11px
          transform: translateY(-50%)
          width: 28px
          height: 28px
</style>