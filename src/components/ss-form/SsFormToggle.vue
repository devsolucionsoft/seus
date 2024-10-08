<template>
  <div class="form-toggle">
    <label class="switch">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        :disabled="!isEditable"
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
    isEditable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
};
</script>

<style lang="sass" scoped>
.form-toggle
  display: flex
  align-items: center
  gap: 12px
  span
    font-size: 14px
    font-weight: 500
    line-height: 20px
    text-align: left
    color: #EDEEF1
  .switch
    position: relative
    display: inline-block
    width: 48px
    height: 28px
    input
      opacity: 0
      width: 0
      height: 0
      &:checked + .slider
        background-color: #CFE1F6
      &:checked + .slider:before 
        transform: translateX(20px)
    .slider 
      position: absolute
      cursor: pointer
      top: 0
      left: 0
      right: 0
      bottom: 0
      background-color: #CFE1F6
      transition: 0.4s
      border-radius: 24px
      &::before
        position: absolute
        content: ''
        display: flex
        justify-content: center
        align-items: center
        height: 24px
        width: 24px
        left: 2px
        bottom: 2px
        background-color: #045480
        color: white
        font-size: 12px
        transition: 0.4s
        border-radius: 50%
</style>