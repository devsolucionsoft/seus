<template>
    <div class="form-toggle">
      <label class="switch">
        <input type="checkbox" v-model="modelValue" />
        <span class="slider"></span>
      </label>
      <span>{{ modelValue ? 'Sí' : 'No' }}</span>
    </div>
</template>
  
<script>
  export default {
    name: 'FormToggle',
    props: {
      modelValue: Boolean,
    },
    emits: ['update:modelValue'],
    watch: {
      modelValue(value) {
        this.$emit('update:modelValue', value);
      },
    },
  };
</script>
  