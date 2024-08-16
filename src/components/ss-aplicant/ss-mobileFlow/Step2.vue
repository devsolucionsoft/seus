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
        { label: 'Rango salarial desde:', name: 'salaryRange', type: 'SsFormSelect', options: ['Selecciona', 'Option 1', 'Option 2'] },
        { label: '¿Cuál es tu nivel profesional?', name: 'professionalLevel', type: 'SsFormSelect', options: ['Selecciona', 'Junior', 'Mid', 'Senior'] },
        { label: 'Nombre completo', name: 'fullName', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
        { label: 'Profesión', name: 'profession', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
        { label: 'Especialización', name: 'specialization', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
        { label: 'Número de documento', name: 'documentNumber', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
        { label: 'Ciudad donde buscas empleo', name: 'city', type: 'SsFormSelect', options: ['Selecciona', 'Ciudad 1', 'Ciudad 2'] },
        { label: '¿Estás dispuesto a trasladarte?', name: 'willingToRelocate', type: 'SsFormToggle' },
        { label: 'Correo electrónico', name: 'email', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'email' },
        { label: 'Número de celular', name: 'phoneNumber', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
        { label: 'LinkedIn', name: 'linkedin', type: 'SsFormInput', placeholder: 'Escribe aquí...', inputType: 'text' },
        { label: '¿Qué valor agregado le ofreces a una empresa que te contrata? ¿Qué te diferencia de otras personas?', name: 'addedValue', type: 'SsFormTextarea', placeholder: 'Escríbelo aquí...' },
        { label: '¿Qué te hace feliz a nivel laboral?', name: 'happiness', type: 'SsFormTextarea', placeholder: 'Escríbelo aquí...' },
        { label: '¿Cuál es tu talento profesional?', name: 'professionalTalent', type: 'SsFormTextarea', placeholder: 'Escríbelo aquí...' },
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
      input,select,textarea
        padding: 16px 20px
        border: 1px solid #E4E4E499
        border-radius: 5px
        background: #F2F2F2
        font-size: 13px
        font-weight: 400
        line-height: 18px
        text-align: left
        color: #023D6A
        &::placeholder
          font-size: 13px
          font-weight: 400
          line-height: 18px
          color: #023D6A 
        opacity: 1
        &:focus
          outline: none
          border-color: #F2F2F2
      textarea
        height: 140px
        resize: none
      select
        appearance: none
        background-image: url('../../../assets/icons/downArrow.svg')
        background-repeat: no-repeat
        background-position: calc(100% - 11px) center
        background-size: 16px 16px
        padding-right: 35px 
      .form-toggle
        display: flex
        align-items: center
        gap: 12px
        span
          font-size: 14px
          font-weight: 500
          line-height: 20px
          text-align: left
          color: #023D6A
        .switch
          position: relative
          display: inline-block
          width: 48px
          height: 28px
          input
            opacity: 0
            width: 0
            height: 0
            &:checked + .slider
              background-color: #CFE1F6
            &:checked + .slider:before 
              transform: translateX(20px)
          .slider 
            position: absolute
            cursor: pointer
            top: 0
            left: 0
            right: 0
            bottom: 0
            background-color: #CFE1F6
            transition: 0.4s
            border-radius: 24px
            &::before
              position: absolute
              content: ''
              display: flex
              justify-content: center
              align-items: center
              height: 24px
              width: 24px
              left: 2px
              bottom: 2px
              background-color: #045480
              color: white
              font-size: 12px
              transition: 0.4s
              border-radius: 50%
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