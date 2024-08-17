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

<style lang="sass" scoped>
select
  appearance: none
  background-image: url("../../assets/icons/downArrow.svg") !important
  background-repeat: no-repeat !important
  background-position: calc(100% - 11px) center !important
  background-size: 16px 16px !important
  padding-right: 35px  !important
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