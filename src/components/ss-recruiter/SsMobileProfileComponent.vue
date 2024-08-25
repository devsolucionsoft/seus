<template>
  <div v-if="!isEditing" class="content">
    <div class="welcome">
      <div class="text">
        <div class="info">
          <h2>Francisco José Benavides</h2>
          <span>Ingeniero Químico</span>
        </div>
        <button><img src="@/assets/icons/dots.svg" alt="..."></button>
      </div>
    </div>


    <div v-if="filteredSections.length > 0" class="employment card">
      <div class="header-section">
        <span>Empleo</span>
        <button @click="goToStep(1)"><img src="@/assets/icons/edit.svg" alt="Edit"></button>
      </div>
      <div v-for="(section, sectionIndex) in filteredSections" :key="sectionIndex" class="option-group">
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

    <div class="personal-info card" v-if="personalInfoItems">
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
              <SsFormToggle v-model="item.willingToRelocate" :isEditable="isEditing" />
            </template>
            <template v-else>
              {{ item.value !== null && item.value !== '' ? item.value : 'N/A' }}
            </template>
          </p>
        </div>
      </div>
    </div>

    <div v-if="formations.length > 0" class="formations card information-cards">
      <div class="header-section">
        <span>Formación académica</span>
        <button @click="goToStep(3)"><img src="@/assets/icons/edit.svg" alt="Edit"></button>
      </div>
      <div class="formation-container">
        <div v-for="(formation, index) in formations" :key="index" class="formation-item">
  
          <div class="header-element">
            <p v-if="isMostRecent(index)">Último estudio realizado</p>
            <div class="actions">
              <button @click="editFormationEmit(index)"><img src="@/assets/icons/edit2.svg" alt="Edit"></button>
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

    <div v-if="experiences.length > 0" class="experiences card information-cards">
      <div class="header-section">
        <span>Experiencia Laboral</span>
        <button @click="goToStep(4)"><img src="@/assets/icons/edit.svg" alt="Edit"></button>
      </div>
      <div class="experience-container">
        <div v-for="(experience, index) in experiences" :key="index" class="experience-item">
          <div class="header-element">
            <p v-if="experience.currentWork">Trabaja aquí actualmente</p>
            <div class="actions">
              <button @click="editExperienceEmit(index)"><img src="@/assets/icons/whiteEdit.svg" alt="Edit"></button>
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

    <div v-if="hasAttachments()" class="card thropies">
      <div class="header-section">
        <img src="@/assets/icons/cameraOutline.svg" alt="">
        <span>Fotos o premios</span>
      </div>
      
      <div class="attachments-section">
        <div class="attachments-container" v-for="(experience, index) in experiences" :key="index">
          <div v-for="(attachment, attachmentIndex) in experience.attachments" :key="attachmentIndex" class="attachment-item">
            <img class="image" :src="attachment" :alt="'Attachment ' + (attachmentIndex + 1)" />
            <button class="icon-container" @click="showImage(attachment)">
              <img src="@/assets/icons/magnifying.svg" alt="">
            </button>
          </div>
        </div>
      </div>

      <div v-if="isImageModalVisible" class="image-modal" @click="closeImageModal">
        <img :src="selectedImage" alt="Imagen ampliada" />
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
  <div class="edit" v-if="isEditing">
      <component :is="currentStepComponent" @edit-step="changeStep" />
      <button @click="saveChanges">Guardar</button>
  </div>
</template>

<script>
import Step1 from '@/components/ss-aplicant/ss-mobilePersonFlow/Step1.vue';
import Step2 from '@/components/ss-aplicant/ss-mobilePersonFlow/Step2.vue';
import Step3 from '@/components/ss-aplicant/ss-mobilePersonFlow/Step3.vue';
import Step4 from '@/components/ss-aplicant/ss-mobilePersonFlow/Step4.vue';
import SsFormToggle from '@/components/ss-form/SsFormToggle.vue';
import showInformationsMixin from '@/mixins/showInformationsMixin';
import formationsMixin from '@/mixins/formationsMixin.js';
import experiencesMixin from '@/mixins/experiencesMixin.js';


export default {
  name: 'ProfilePerson',
  mixins: [showInformationsMixin, formationsMixin, experiencesMixin],
  components: {
    SsFormToggle,
  },
  data() {
    return {
      step: null,
      isEditing: false,
    };
  },
  computed: {
    currentStepComponent() {
      switch (this.step) {
        case 1:
        return Step1;
        case 2:
          return Step2;
        case 3:
          return Step3;
        case 4:
          return Step4;
        default:
          return null;
      }
    },
  },
  methods: {
    goToStep(stepNumber) {
      this.step = stepNumber;
      this.isEditing = true;
    },
    saveChanges() {
      this.isEditing = false;
      this.loadData();
    },
  },
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
  .welcome
    display: flex
    flex-direction: column
    gap: 15px
    padding: 16px
    width: 100%
    .text
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      gap: 16px
      .info
        display: flex
        flex-direction: column
        h2
          font-size: 20px
          font-weight: 600
          line-height: 26px
          text-align: left
          color: #023D6A
        span
          font-size: 16px
          font-weight: 400
          line-height: 24px
          text-align: left
          color: #023D6A

      button
        height: 32px
        width: 32px
        border-radius: 20px
        border: 2px solid #333333
        display: flex
        align-items: center
        justify-content: center
        text-align: center
  .send-section
    display: flex
    flex-direction: column
    gap: 16px
    width: 100%
    span
      font-size: 14px
      font-weight: 400
      line-height: 24px
      text-align: left
      color: black
    .button
      padding: 14px 24px
      background-color: #761D74
      border-radius: 28px
      color: #F8D2EA
      font-size: 16px
      font-weight: 600
      line-height: 19.5px
      text-align: center
      text-decoration: none  
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
      .image-modal
        position: fixed
        top: 0
        left: 0
        width: 100vw
        height: 100vh
        background: rgba(0, 0, 0, 0.8)
        display: flex
        align-items: center
        justify-content: center
        z-index: 1000
        cursor: pointer
        img
            max-width: 90%
            max-height: 90%
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5)
            border-radius: 8px
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
.edit
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  padding: 24px 0
  button
    padding: 12px 24px
    border-radius: 28px
    color: #F8D2EA
    font-size: 14px
    font-weight: 600
    line-height: 17.07px
    text-align: center
    background-color: #761D74


</style>