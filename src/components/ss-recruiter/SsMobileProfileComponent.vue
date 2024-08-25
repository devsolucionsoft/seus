<template>
  <div v-if="!isEditing" class="content">
    <div class="welcome">
      <div class="text">
        <div class="info">
          <h2>Francisco José Benavides</h2>
          <span>Recursos Humanos</span>
        </div>
        <button><img src="@/assets/icons/dots.svg" alt="..."></button>
      </div>
    </div>

    <div class="offertButton">
      <router-link
        :to="{ name: 'createOffer'}"
        class="button"
      >
        <img src="@/assets/icons/upload.svg" alt="upload">
        <span>Crear oferta de empleo</span>
      </router-link>
    </div>


    <div v-if="filteredSections1.length > 0" class="employment card">
      <div class="header-section">
        <span>Cultura</span>
        <button @click="goToStep(1)"><img src="@/assets/icons/edit.svg" alt="Edit"></button>
      </div>
      <div v-for="(section, sectionIndex) in filteredSections1" :key="sectionIndex" class="option-group">
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
        <span>Empresa</span>
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
            <template v-else>
              {{ item.value !== null && item.value !== '' ? item.value : 'N/A' }}
            </template>
          </p>
        </div>
      </div>
    </div>

    <div v-if="filteredSections2.length > 0" class="archetypes card">
      <div class="header-section">
        <span>Arquetipos</span>
        <button @click="goToStep(3)"><img src="@/assets/icons/edit.svg" alt="Edit"></button>
      </div>
      <div v-for="(section, sectionIndex) in filteredSections2" :key="sectionIndex" class="option-group">
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

    <div class="personal-info card" v-if="step4Data">
      <div class="header-section">
        <span>Reclutador</span>
        <button @click="goToStep(4)"><img src="@/assets/icons/edit.svg" alt="Edit"></button>
      </div>
      <div class="group" v-for="(item, index) in personalInfoItems2" :key="index" :class="item.class">
        <div class="group-info-element">
          <div class="title">
            <div v-if="item.icon">
              <img :src="item.icon" alt="Icon">
            </div>
            <span>{{ item.title }}</span>
          </div>
          <p>
            {{ item.value !== null && item.value !== '' ? item.value : 'N/A' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Step1 from '@/components/ss-recruiter/ss-mobileRecruiterFlow/Step1.vue';
import Step2 from '@/components/ss-recruiter/ss-mobileRecruiterFlow/Step2.vue';
import Step3 from '@/components/ss-recruiter/ss-mobileRecruiterFlow/Step3.vue';
import Step4 from '@/components/ss-recruiter/ss-mobileRecruiterFlow/Step4.vue';
import showRecruiterInformationsMixin from '@/mixins/recruiter/showRecruiterInformationsMixin';


export default {
  name: 'ProfilePerson',
  mixins: [showRecruiterInformationsMixin],
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
        flex-wrap: wrap
        gap: 32px

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
              max-width: 67px
              max-height: 67px
          p
            font-size: 14px
            font-weight: 500
            line-height: 17.07px
            text-align: center
            color: #045480
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

.offertButton
  width: 100%
  a
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    gap: 10px
    background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
    border-radius: 50px
    padding: 14px
    width: 100%
    text-decoration: none

    span
      text-decoration: none
      font-size: 16px
      font-weight: 500
      line-height: 19.5px
      text-align: center
      color: #CDFDF3
    

</style>