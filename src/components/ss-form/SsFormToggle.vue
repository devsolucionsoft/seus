<template>
  <div class="form-toggle">
    <label class="switch">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
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
};
</script>
