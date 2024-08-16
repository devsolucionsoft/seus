<template>
    <select v-model="modelValue" class="form-select">
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
</template>
  
<script>
  export default {
    name: 'FormSelect',
    props: {
      modelValue: String,
      placeholder: String,
      options: Array,
    },
    emits: ['update:modelValue'],
    watch: {
      modelValue(value) {
        this.$emit('update:modelValue', value);
      },
    },
  };
</script>