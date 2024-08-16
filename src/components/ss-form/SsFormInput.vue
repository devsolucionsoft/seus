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
  
<style lang="sass" scoped>
input
  padding: 16px 20px
  border: 1px solid #E4E4E499
  border-radius: 5px
  background: #F2F2F2
  font-size: 13px
  font-weight: 400
  line-height: 18px
  text-align: left
  color: #023D6A
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