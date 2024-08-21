<template>
  <div class="step5">
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
  </div>
</template>

<script>
import SsFormSelect from '@/components/ss-form/SsFormSelect.vue';
import SsFormTextarea from '@/components/ss-form/SsFormTextarea.vue';
import additionalInfoMixin from '../../../mixins/additionalInfoMixin';

export default {
  name: 'Step5',
  mixins: [additionalInfoMixin],
  components: {
    SsFormSelect,
    SsFormTextarea,
  },
  watch: {
    formData: {
      handler() {
        this.saveToLocalStorage();
      },
      deep: true,
    },
  },
};
</script>

<style lang="sass">
.step5
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
        gap: 7px
        span
          padding: 4px 10px
          border-radius: 25px
          background-color: #06759F66
          color: #FFFFFF
          font-size: 12px
          font-weight: 500
          line-height: 14.63px
          text-align: center
</style>