<template>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
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
  };
</script>
  