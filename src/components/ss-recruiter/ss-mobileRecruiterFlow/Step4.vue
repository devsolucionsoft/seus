<template>
  <div class="step4">
    <form @submit.prevent="submitForm">
      <div v-for="(field, index) in formFields2" :key="index" :class="['form-group', field.name === 'linkedin' ? 'linkedin' : '']">
        <label :for="field.name">{{ field.label }}</label>
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
  </div>
</template>

<script>
  import SsFormInput from '@/components/ss-form/SsFormInput.vue';
  import SsFormTextarea from '@/components/ss-form/SsFormTextarea.vue';
  import form2Mixin from '@/mixins/recruiter/form2Mixin.js';


  export default {
    mixins: [form2Mixin],
    name: 'Step4',
    components: {
      SsFormInput,
      SsFormTextarea,
    },
  };
</script>

<style lang="sass" scoped>
.step4
  padding: 16px
  width: 100%
  form
    display: flex
    flex-direction: column
    gap: 34px
    padding: 0 16px
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