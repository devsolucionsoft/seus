<template>
  <div>
    <multiselect 
      v-model="value" 
      :options="options" 
      :multiple="true" 
      :close-on-select="false" 
      :clear-on-select="false"
      :preserve-search="true" 
      placeholder="Selecciona" 
      label="name" 
      track-by="name" 
      :preselect-first="true"
    >
      <template #selection="{ values, isOpen }">
        <span 
          class="multiselect__single" 
          v-if="values.length" 
          v-show="!isOpen"
        >
          {{ values.length }} competencias seleccionadas
        </span>
      </template>
    </multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'YourComponentName',
  components: {
    Multiselect
  },
  data() {
    return {
      value: [],
      options: this.getOptions()
    }
  },
  methods: {
    getOptions() {
      return [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Adonis', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' }
      ];
    }
  }
}
</script>

<style lang="scss" >
.multiselect{
  color: #023D6A;
  font-family: Montserrat;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  background-color: #F2F2F2;
  z-index: 4;
  &::placeholder{
    font-family: Montserrat;
    font-size: 13px !important;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
    color: #023D6A;
  }

  .multiselect__tags {
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
  }
  
}
</style>