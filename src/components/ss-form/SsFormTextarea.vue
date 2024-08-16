<template>
    <textarea
      v-model="modelValue"
      :placeholder="placeholder"
      class="form-textarea"
    ></textarea>
</template>
  
<script>
  export default {
    name: 'FormTextarea',
    props: {
      modelValue: String,
      placeholder: String,
    },
    emits: ['update:modelValue'],
    watch: {
      modelValue(value) {
        this.$emit('update:modelValue', value);
      },
    },
  };
</script>
  