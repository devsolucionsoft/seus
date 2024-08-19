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

    <div v-if="step3Data.formations.length > 0" class="formations card information-cards">
      <div class="header-section">
        <span>Formación académica</span>
        <button @click="goToStep(3)"><img src="@/assets/icons/edit.svg" alt="Edit"></button>
      </div>
      <div class="formation-container">
        <div v-for="(formation, index) in step3Data.formations" :key="index" class="formation-item">
  
          <div class="header-element">
            <p v-if="isMostRecent(index)">Último estudio realizado</p>
            <div class="actions">
              <button @click="editFormation(index)"><img src="@/assets/icons/edit2.svg" alt="Edit"></button>
              <button @click="confirmDeleteFormation(index)"><img src="@/assets/icons/delete.svg" alt="Delete"></button>
            </div>
          </div>
          <div class="formation-level element">
            <div class="up">
              <img src="@/assets/icons/hat.svg" alt="Hat">
              <span>Nivel de formación</span>
            </div>
            <span>{{ formation.title }}</span>
          </div>
          <div class="formation-place element">
            <div class="up">
              <img src="@/assets/icons/build.svg" alt="Build">
              <span>Institución</span>
            </div>
            <span>{{ formation.institution }}</span>
          </div>
          <div class="formation-dates element">
            <div class="up">
              <img src="@/assets/icons/calendar.svg" alt="Calendar">
              <span>Fecha de certificación</span>
            </div>
            <span>{{ formatDate(formation.startDate) }} - {{ formatDate(formation.endDate) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="step4Data.experiences.length > 0" class="experiences card information-cards">
      <div class="header-section">
        <span>Experiencia Laboral</span>
        <button @click="goToStep(4)"><img src="@/assets/icons/edit.svg" alt="Edit"></button>
      </div>
      <div class="experience-container">
        <div v-for="(experience, index) in step4Data.experiences" :key="index" class="experience-item">
          <div class="header-element">
            <p v-if="experience.currentWork">Trabaja aquí actualmente</p>
            <div class="actions">
              <button @click="editExperience(index)"><img src="@/assets/icons/whiteEdit.svg" alt="Edit"></button>
              <button @click="confirmDeleteExperience(index)"><img src="@/assets/icons/whiteDelete.svg" alt="Delete"></button>
            </div>
          </div>
          <div class="experience-position element">
            <div class="up">
              <img src="@/assets/icons/frame.svg" alt="Position">
              <span>Cargo</span>
            </div>
            <span>{{ experience.position }}</span>
          </div>
          <div class="experience-company element">
            <div class="up">
              <img src="@/assets/icons/blueBuild.svg" alt="Company">
              <span>Empresa</span>
            </div>
            <span>{{ experience.company }}</span>
          </div>
          <div class="experience-dates element">
            <div class="up">
              <img src="@/assets/icons/blueCalendar.svg" alt="Dates">
              <span>Tiempo de duración</span>
            </div>
            <span>{{ formatDate(experience.startDate) }} - {{ formatDate(experience.endDate) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card thropies">
      <div class="header-section">
        <img src="@/assets/icons/cameraOutline.svg" alt="">
        <span>Fotos o premios</span>
      </div>
      
      <div class="attachments-section">
        <div class="attachments-container" v-for="(experience, index) in step4Data.experiences" :key="index">
          <div v-for="(attachment, attachmentIndex) in experience.attachments" :key="attachmentIndex" class="attachment-item">
            <img class="image" :src="attachment" :alt="'Attachment ' + (attachmentIndex + 1)" />
            <div class="icon-container">
              <img src="@/assets/icons/magnifying.svg" alt="">
            </div>
          </div>
        </div>
      </div>
      
      <div class="header-section">
        <img src="@/assets/icons/trophy.svg" alt="">
        <span>Logros importantes</span>
      </div>
      <div class="achievements-section">
        <ol>
          <li v-for="(experience, index) in step4Data.experiences" :key="index">
              {{ experience.achievements }}
          </li>
        </ol>
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
      step1Data: null,
      step2Data: null,
      step3Data: { formations: [] },
      step4Data: { experiences: [] },
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
      this.step3Data = stepsData.step3 || { formations: [] };
      this.step4Data = stepsData.step4 || { experiences: [] };
      this.updatePersonalInfoItems();
    },  
    confirmDeleteExperience(index) {
      if (confirm("¿Estás seguro de que deseas eliminar esta experiencia?")) {
        this.deleteExperience(index);
      }
    },
    deleteExperience(index) {
      this.step4Data.experiences.splice(index, 1);
      this.updateLocalStorage();
    },
    editExperience(index) {
      this.$emit('edit-step', 4); // Cambia a step 4 para editar
      localStorage.setItem('editExperienceIndex', index);
    },
    confirmDeleteFormation(index) {
      if (confirm("¿Estás seguro de que deseas eliminar esta formación?")) {
        this.deleteFormation(index);
      }
    },
    deleteFormation(index) {
      this.step3Data.formations.splice(index, 1);
      this.updateLocalStorage();
    },
    editFormation(index) {
      this.$emit('edit-step', 3);
      localStorage.setItem('editFormationIndex', index);
    },
    updatePersonalInfoItems() {
      this.personalInfoItems.forEach(item => {
        if (item.name) {
          item.value = this.step2Data[item.name] || '';
        }
      });
    },
    updateLocalStorage() {
      const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
      stepsData.step3 = this.step3Data;
      stepsData.step4 = this.step4Data; 
      localStorage.setItem('stepsData', JSON.stringify(stepsData));
    },
    goToStep(stepNumber) {
      this.$emit('edit-step', stepNumber);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      let month = date.toLocaleString('es-ES', { month: 'long' });
      month = month.charAt(0).toUpperCase() + month.slice(1);
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    },
    isMostRecent(itemIndex) {
      if (this.step3Data.formations.length === 0) return false;

      const latestIndex = this.step3Data.formations.reduce((latest, formation, index) => {
        return new Date(formation.endDate) > new Date(this.step3Data.formations[latest].endDate) ? index : latest;
      }, 0);

      return itemIndex === latestIndex;
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
    &.formations
      background-color: #C6CBD2
      box-shadow: 0px 4px 10px 0px #00000026
    &.experiences
      background-color: #B4EDF5
      box-shadow: 0px 4px 10px 0px #00000026
    &.thropies
      box-shadow: 0px 4px 10px 0px #00000026
      background-color: white    
      .header-section
        justify-content: flex-start
        gap: 12px
      .attachments-section
        .attachments-container
          max-width: 100%
          display: flex
          flex-direction: column
          gap: 0px
          gap: 20px
          .attachment-item
            max-width: 100%
            height: 100%
            overflow: hidden
            position: relative
            .image
              max-width: 100%
              object-fit: cover
            .icon-container
              position: absolute
              bottom: 0
              left: 0
              height: 34px
              width: 34px
              background-color: #0DC6DE
              display: flex
              align-items: center
              justify-content: center
      .achievements-section
        ol
          font-family: Montserrat
          font-size: 14px
          font-weight: 500
          line-height: 20px
          text-align: left
          color: #023D6A
          margin: 0
          padding-inline-start: 16px
          gap: 22px        
          display: flex
          flex-direction: column
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
      img
        max-height: 30px
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
  .information-cards
    .formation-container
      display: flex
      flex-direction: column
      gap: 48px
      .formation-item 
        padding: 20px
        border-radius: 12px
        background-color: #EDEEF1
        display: flex
        flex-direction: column
        gap: 12px
        position: relative
        margin-bottom: 0
        
        &:after
          content: ''
          position: absolute
          left: 0
          bottom: -24px
          width: 100%
          height: 1px
          border-bottom: 1px dashed #9e9e9e        
    
        &:last-child::after 
          display: none

        .header-element
          display: flex
          flex-direction: row
          align-items: center
          justify-content: space-between

          p
            padding: 1px 12px
            background-color: #023D6A
            border-radius: 30px
            color: #EDEEF1
            font-size: 12px
            font-weight: 500
            line-height: 20px
            text-align: left

          
          .actions
            display: flex
            flex-direction: row
            gap: 12px
            align-items: center
            justify-content: center

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
            
          
        
        .element
          display: flex
          flex-direction: column
          gap: 12px
          .up
            display: flex
            align-items: center
            gap: 7px
            span
              font-size: 14px
              font-weight: 500
              line-height: 20px
              text-align: left
              color: #47586E
            
          
          span
            font-size: 16px
            font-weight: 500
            line-height: 20px
            text-align: left
            color: #023D6A
    .experience-container
      display: flex
      flex-direction: column
      gap: 48px
      .experience-item 
        padding: 20px
        border-radius: 12px
        background-color: #045480
        display: flex
        flex-direction: column
        gap: 12px
        border-bottom: 1px dashed #9E9E9E
        padding-bottom: 24px
        position: relative

        &:after
          content: ''
          position: absolute
          left: 0
          bottom: -24px
          width: 100%
          height: 1px
          border-bottom: 1px dashed #9e9e9e        
    
        &:last-child::after 
          display: none

      .header-element
        display: flex
        flex-direction: row
        align-items: center
        justify-content: space-between

        p
          padding: 1px 12px
          background-color: #023D6A
          border-radius: 30px
          color: #EDEEF1
          font-size: 12px
          font-weight: 500
          line-height: 20px
          text-align: left

        
        .actions
          display: flex
          flex-direction: row
          gap: 12px
          align-items: center
          justify-content: center

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
            height: 32px
            width: 32px
            color: #F1E8F1
            .delete
              height: 18px
              width: 16px
              color: #F1E8F1
            
      .element
        display: flex
        flex-direction: column
        gap: 12px
        .up
          display: flex
          align-items: center
          gap: 7px
          span
            font-size: 14px
            font-weight: 500
            line-height: 20px
            text-align: left
            color: #0DC6DE
          
        
        span
          font-size: 16px
          font-weight: 500
          line-height: 20px
          text-align: left
          color: #EDEEF1
</style>