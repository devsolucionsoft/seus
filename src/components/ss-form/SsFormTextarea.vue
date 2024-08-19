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

<style lang="sass" scoped>
textarea
  height: 140px
  resize: none
  padding: 16px 20px
  border: 1px solid #E4E4E499
  border-radius: 5px
  background: #F2F2F2
  font-size: 13px
  font-weight: 400
  line-height: 18px
  text-align: left
  color: #023D6A
  width: 100%
  &::placeholder
    font-family: 'Montserrat', sans-serif
    font-size: 13px
    font-weight: 400
    line-height: 18px
    color: #023D6A
  opacity: 1
  &:focus
    outline: none
    border-color: #F2F2F2
</style>