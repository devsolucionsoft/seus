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
  import formMixin from '@/mixins/recruiter/formMixin.js';


  export default {
    mixins: [formMixin],
    name: 'Step2',
    components: {
      SsFormInput,
      SsFormSelect,
      SsFormTextarea,
      SsFormToggle,
    },
  };
</script>

<style lang="sass" scoped>
.step2
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