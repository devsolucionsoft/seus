<template>
  <div class="content">

    <div class="employment card">
      <div class="header-section">
        <span>Empleo</span>
        <button @click="goToStep(1)"><img src="@/assets/icons/edit.svg" alt="Edit"></button>
      </div>
      <div v-for="(section, sectionIndex) in filteredOptions" :key="sectionIndex" class="option-group">
        <h3>{{ section.title }}</h3>
        <div class="options">
          <div v-for="(item, itemIndex) in section.selectedItems" :key="itemIndex" class="selected-item">
            <div class="image-container">
              <img :src="item.image" :alt="item.label" />
            </div>
            <p>{{ item.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="personal-info card" v-if="step2Data">
      <div class="header-section">
        <span>Datos Personales</span>
        <button @click="goToStep(2)"><img src="@/assets/icons/edit.svg" alt="Edit"></button>
      </div>

      <div class="group" v-for="(item, index) in personalInfoItems" :key="index" :class="item.class">
        <div class="group-info-element">
          <div class="title">
            <div v-if="item.icon">
              <img :src="item.icon" alt="Icon">
            </div>
            <span>{{ item.title }}</span>
          </div>
          <p>
            <img v-if="item.name === 'linkedin'" src="@/assets/icons/linkedin.svg" alt="LinkedIn Logo" class="linkedin-icon" />
            <template v-if="item.isToggle">
              <SsFormToggle v-model="item.willingToRelocate" />
            </template>
            <template v-else>
              {{ item.value }}
            </template>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import SsFormToggle from '@/components/ss-form/SsFormToggle.vue';

export default {
  name: 'StepPreview',
  components: {
    SsFormToggle,
  },
  data() {
    return {
      step1Data: {},
      step2Data: {},
      step3Data: {},
      personalInfoItems: [
        { title: 'Nivel profesional', value: '', icon: require('@/assets/icons/reviewIcons/suitcase.svg'), name: 'professionalLevel' },
        { title: 'Rango Salarial', value: '', icon: require('@/assets/icons/reviewIcons/wallet.svg'), name: 'salaryRange', class: 'dashed-box' },
        { title: 'Nombre', value: '', icon: null, name: 'fullName', class: ' green-items' },
        { title: 'Profesion', value: '', icon: null, name: 'profession', class: 'green-items' },
        { title: 'Especialización', value: '', icon: null, name: 'specialization', class: 'green-items' },
        { title: 'Número de documento', value: '', icon: null, name: 'documentNumber', class: 'green-items' },
        { title: 'Ciudad donde busco', value: '', icon: null, name: 'city', class: 'green-items' },
        { title: 'Abierto a nueva ubicación', value: '', icon: null, name: 'willingToRelocate', class: 'toggle-element', isToggle: true },
        { title: 'Correo electrónico', value: '', icon: null, name: 'email', class: 'green-items' },
        { title: 'Número de celular', value: '', icon: null, name: 'phoneNumber', class: 'green-items' },
        { title: 'Red profesional', value: '', name: 'linkedin', class: 'green-items dashed-box', icon: null },
        { title: 'Valor agregado personal', value: '', icon: require('@/assets/icons/reviewIcons/like.svg'), name: 'addedValue',},
        { title: 'Lo que me hace feliz', value: '', icon: require('@/assets/icons/reviewIcons/heart.svg'), name: 'happiness',},
        { title: 'Talento profesional', value: '', icon: require('@/assets/icons/reviewIcons/star.svg'), name: 'professionalTalent',},
        { title: 'Ideas, proyectos o actividades a futuro', value: '', icon: require('@/assets/icons/reviewIcons/sun.svg'), name: 'ideas', },
      ]
    };
  },
  computed: {
    filteredOptions() {
      return (this.step1Data.options || []).map((section, sectionIndex) => {
        return {
          ...section,
          selectedItems: section.items.filter((item, itemIndex) => 
            this.step1Data.selectedOptions.includes(`${sectionIndex}-${itemIndex}`)
          )
        };
      });
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
      this.step1Data = stepsData.step1 || {};
      this.step2Data = stepsData.step2 || {};
      this.step3Data = stepsData.step3 || {};
      this.updatePersonalInfoItems();
    },
    updatePersonalInfoItems() {
      this.personalInfoItems.forEach(item => {
        if (item.name) {
          item.value = this.step2Data[item.name] || '';
        }
      });
    },
    goToStep(stepNumber) {
      this.$emit('edit-step', stepNumber);
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style scoped lang="sass">

.content
  display: flex
  align-items: center
  justify-content: center
  padding: 16px
  flex-direction: column
  gap: 16px
  .card
    display: flex
    flex-direction: column
    gap: 16px
    padding: 16px
    border-radius: 16px
    overflow: hidden
    width: 100%
    &.employment
      background-color: #EDEEF1
    &.personal-info
      box-shadow: 0px 4px 10px 0px #00000026
      background-color: white

  .header-section
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    span
      font-size: 20px
      font-weight: 600
      line-height: 26px
      text-align: left
      color: #023D6A
    button
      appearance: none
      background: none
      border: none
      padding: 0
      margin: 0
      font: inherit
      color: inherit
      text-align: inherit
      cursor: pointer
      outline: none
      height: 24px
      width: 24px
      border-radius: 50px
      border: 1px solid #333333
      display: flex
      align-items: center
      justify-content: center
  .option-group
    display: flex
    gap: 18px
    flex-direction: column

    h3
      font-size: 16px
      font-weight: 600
      line-height: 24px
      text-align: center
      color: #023D6A
      margin: 0

    .options
      display: flex
      justify-content: space-around
      width: 100%
      overflow-x: auto
      scrollbar-width: none
      -webkit-overflow-scrolling: touch
      gap: 0px

      .selected-item
        display: flex
        flex-direction: column
        align-items: center
        text-align: center
        padding: 11px 24px

        .image-container
          background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
          height: 80px
          width: 80px
          border-radius: 72px
          display: flex
          align-items: center
          justify-content: center
          transition: background 0.3s ease-in-out
          img
            max-width: 48px
            max-height: 48px
        p
          font-size: 14px
          font-weight: 500
          line-height: 17.07px
          text-align: center
          color: #350D34
  .group
    display: flex
    flex-direction: column
    gap: 16px
    .group-info-element
      display: flex
      flex-direction: column
      gap: 12px
      .title
        display: flex
        flex-direction: row
        align-items: center
        gap: 7px
        span
          font-size: 14px
          font-weight: 500
          line-height: 20px
          text-align: left
          color: #47586E
      p
        font-size: 16px
        font-weight: 500
        line-height: 24px
        text-align: left
        color: #023D6A
        display: flex
        flex-direction: row
        align-items: center
        gap: 10px
    &.dashed-box
      border-bottom: 1px dashed #9E9E9E
      padding-bottom: 24px
    &.green-items
      .group-info-element
        .title
          span
            font-size: 12px
            font-weight: 500
            line-height: 20px
            text-align: left
            color: #05454E
            padding: 1px 12px
            background-color: #CDFDF3
            border-radius: 30px
        p
          margin-left: 12px
    &.toggle-element
      .group-info-element
        flex-direction: row      
        justify-content: space-between
</style>