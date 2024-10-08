<template>
  <div>
    <multiselect 
      v-model="internalValue" 
      :options="options" 
      :multiple="true" 
      :close-on-select="false" 
      :clear-on-select="false"
      :preserve-search="true" 
      placeholder="Selecciona" 
      label="name" 
      track-by="name"
      :custom-label="customLabel"
      :select-label="selectLabel"
      :deselect-label="deselectLabel"
      :noOptions="noOptions"
      :loading="loading"
      :selectedLabel="selectedLabel"
    >
      <template #selection="{ values, isOpen }">
        <span class="multiselect__single" v-if="values.length" v-show="!isOpen">
          {{ values.length }} competencias seleccionadas
        </span>
      </template>
    </multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  name: 'SsMultipleFormSelect',
  components: {
    Multiselect
  },
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    selectLabel: {
      type: String,
      default: 'Presiona Enter para seleccionar'
    },
    deselectLabel: {
      type: String,
      default: 'Presiona Enter para eliminar'
    },
    noOptions: {
      type: String,
      default: 'No hay opciones disponibles'
    },
    selectedLabel: {
      type: String,
      default: 'Seleccionado'
    }
  },
  computed: {
    internalValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    customLabel(option) {
      return option.name;
    }
  }
}
</script>

<style lang="scss" >
.multiselect{
  color: #023D6A;
  font-family: Montserrat !important;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  background-color: #F2F2F2;
  .multiselect__content-wrapper{
    z-index: 4;
  }
  *{
    font-family: Montserrat !important;
  }
  &::placeholder{
    font-family: Montserrat;
    font-size: 13px !important;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
    color: #023D6A;
  }

  .multiselect__placeholder {
    font-family: Montserrat;
    font-size: 13px !important;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
    color: #023D6A;
    margin: 0;
  }

  .multiselect__tags {
    padding: 16px 20px;
    border-radius: 5px;
    border: 1px solid #E4E4E499;
    background-color: #F2F2F2 !important;
  }

  .multiselect, .multiselect__input, .multiselect__single {
    font-family: Montserrat;
    font-size: 13px !important;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
    background-color: #F2F2F2;
    margin: 0;
  }

  .multiselect__select {
    width: 29px;
    height: 46px;
  }
}

</style>