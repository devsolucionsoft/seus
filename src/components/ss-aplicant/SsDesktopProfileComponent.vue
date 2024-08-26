<template>
    <div class="container">
  
      <div v-if="filteredSections.length > 0" class="employment">
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

      <div class="cards-elements">
        <div class="personal-info card" v-if="personalInfoItems">
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
    
        <div v-if="formations.length > 0" class="formations information-cards">
            <div class="header-section">
                <span>Formación académica</span>
            </div>
            <div class="formation-container">
                <div v-for="(formation, index) in formations" :key="index" class="formation-item">
        
                    <div class="header-element">
                        <p v-if="isMostRecent(index)">Último estudio realizado</p>
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
            </div>
            <div class="experience-container">
                <div v-for="(experience, index) in experiences" :key="index" class="experience-item">
                    <div class="header-element">
                        <p v-if="experience.currentWork">Trabaja aquí actualmente</p>
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
  
.container
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    width: 100%
    .employment
        display: flex
        width: 100%
        padding: 40px 196px
        background-color: #EDEEF1
        gap: 100px
        flex-wrap: wrap
        @media(min-width: 1060px)
            flex-wrap: nowrap
        .option-group
            display: flex
            gap: 18px
            flex-direction: column
            width: 100%
            h3
                font-size: 16px
                font-weight: 600
                line-height: 20px
                text-align: center
                color: #023D6A
                margin: 0
  
            .options
                flex-wrap: wrap
                display: flex
                justify-content: center
                width: 100%
                gap: 0px
    
                .selected-item
                    display: flex
                    flex-direction: column
                    align-items: center
                    text-align: center
                    padding: 11px 24px
                    gap: 10px
    
                    .image-container
                        background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
                        height: 112px
                        width: 112px
                        border-radius: 100px
                        display: flex
                        align-items: center
                        justify-content: center
                        transition: background 0.3s ease-in-out
                        img
                            max-width: 56px
                            max-height: 63px
                    p
                    font-size: 14px
                    font-weight: 500
                    line-height: 17.07px
                    text-align: center
                    color: #350D34
    .cards-elements
        display: grid
        grid-template-columns: repeat(2, 1fr)
        grid-template-rows: repeat(3, max-content)
        grid-column-gap: 28px
        grid-row-gap: 40px
        padding: 40px 196px
        width: 100%
        height: fit-content
        align-items: stretch

        .personal-info
            grid-area: 1 / 1 / 2 / 3
            width: 100%
            flex-direction: column
            padding: 66px 64px
            box-shadow: 0px 4px 10px 0px #00000026
            border-radius: 8px
            display: grid
            grid-template-columns: repeat(3, 1fr)
            grid-template-rows: repeat(7, 1fr)
            grid-column-gap: 0px
            grid-row-gap: 24px
            background-color: white
            .group 
                &:nth-child(1)
                    grid-area: 1 / 1 / 2 / 2
                &:nth-child(2)
                    grid-area: 1 / 3 / 2 / 4

                &:nth-child(3)
                    grid-area: 2 / 1 / 3 / 2

                &:nth-child(4)
                    grid-area: 2 / 2 / 3 / 3

                &:nth-child(5)
                    grid-area: 2 / 3 / 3 / 4

                &:nth-child(6)
                    grid-area: 3 / 1 / 4 / 2

                &:nth-child(7)
                    grid-area: 3 / 2 / 4 / 3

                &:nth-child(8)
                    grid-area: 3 / 3 / 4 / 4

                &:nth-child(9)
                    grid-area: 4 / 1 / 5 / 2

                &:nth-child(10)
                    grid-area: 4 / 2 / 5 / 3

                &:nth-child(11)
                    grid-area: 4 / 3 / 5 / 4

                &:nth-child(12)
                    grid-area: 5 / 1 / 6 / 4

                &:nth-child(13)
                    grid-area: 6 / 1 / 7 / 2

                &:nth-child(14)
                    grid-area: 6 / 3 / 7 / 4

                &:nth-child(15)
                    grid-area: 7 / 1 / 8 / 4
                    

                .group-info-element
                    display: flex
                    flex-direction: column
                    gap: 12px

                    .title
                        display: flex
                        flex-direction: row
                        gap: 7px
                        align-items: center
                        span
                            font-size: 14px
                            font-weight: 500
                            line-height: 20px
                            text-align: left
                    p
                        font-size: 16px
                        font-weight: 500
                        line-height: 20px
                        text-align: left
                        color: #023D6A
                        display: flex
                        flex-direction: row
                        align-items: center
                        gap: 10px

                &.green-items
                    .title
                        span
                            padding: 1px 12px
                            border-radius: 30px
                            background-color: #CDFDF3
                            font-size: 12px
                            font-weight: 500
                            line-height: 20px
                            text-align: left
                            color: #05454E

        .information-cards
            grid-area: 2 / 1 / 3 / 2
            display: flex
            flex-direction: column
            gap: 24px
            padding: 66px 36px
            border-radius: 8px
            box-shadow: 0px 4px 10px 0px #00000026
            height: fit-content
            height: 100%
            &.formations
                background-color: #C6CBD2
                .header-section
                    span
                        color: #023D6A
                .formation-container
                    .formation-item
                        &:first-child
                            background-color: #EDEEF1
                        .header-element
                            p
                                background-color: #023D6A
                                color: #EDEEF1
                        .element
                            .up
                                span
                                    color: #47586E
                            span
                                color: #023D6A

                                
            &.experiences
                background-color: #023D6A
                grid-area: 2 / 2 / 3 / 3
                .header-section
                    span
                        color: #E7F9FC
                .experience-container
                    .experience-item
                        &:first-child
                            background-color: #045480
                        .header-element
                            p
                                background-color: #CDFDF3
                                color: #05454E
                        .element
                            .up
                                span
                                    color: #0DC6DE
                            span
                                color: #E7F9FC

            .header-section
                margin-bottom: 4px
                span
                    font-size: 24px
                    font-weight: 500
                    line-height: 29.26px
                    text-align: left
            .formation-container, .experience-container
                display: flex
                flex-direction: column
                gap: 48px
                .formation-item, .experience-item
                    padding: 20px
                    border-radius: 12px
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
                        margin-bottom: 4px
                        align-self: flex-end
            
                        p
                            padding: 1px 12px
                            border-radius: 30px
                            font-size: 12px
                            font-weight: 500
                            line-height: 20px
                            text-align: left              
                    
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
                        span
                            font-size: 16px
                            font-weight: 500
                            line-height: 20px
                            text-align: left
        
        .thropies
            grid-area: 3 / 1 / 4 / 3
            padding: 66px 64px
            box-shadow: 0px 4px 10px 0px #00000026
            border-radius: 8px
            display: flex
            flex-direction: column
            gap: 22px
            height: fit-content
            .header-section
                display: flex
                flex-direction: row
                align-items: center
                gap: 10px
                justify-content: flex-start
                span
                    font-size: 24px
                    font-weight: 500
                    line-height: 29.26px
                    text-align: left
                    color: #023D6A


            .attachments-section
                .attachments-container
                    max-width: 100%
                    display: flex
                    flex-direction: row
                    gap: 20px
                    .attachment-item
                        max-width: 100%
                        height: 100%
                        overflow: hidden
                        position: relative
                        .image
                            width: 220px
                            height: 147px
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



  </style>