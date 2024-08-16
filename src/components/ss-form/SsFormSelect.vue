<template>
    <select 
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)" 
      class="form-select"
    >
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
      placeholder: {
        type: String,
        default: 'Selecciona',
      },
      options: {
        type: Array,
        required: true,
      },
    },
    emits: ['update:modelValue'],
  };
</script>