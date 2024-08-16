<template>
  <textarea
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
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
  };
</script>
