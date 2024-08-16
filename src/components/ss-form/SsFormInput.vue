<template>
    <input
      :type="type"
      v-model="modelValue"
      :placeholder="placeholder"
      class="form-input"
    />
</template>
  
<script>
  export default {
    name: 'SsFormInput',
    props: {
      modelValue: String,
      placeholder: String,
      type: {
        type: String,
        default: 'text',
      },
    },
    emits: ['update:modelValue'],
    watch: {
      modelValue(value) {
        this.$emit('update:modelValue', value);
      },
    },
  };
</script>
  