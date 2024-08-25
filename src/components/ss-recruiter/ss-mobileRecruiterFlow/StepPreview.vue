<template>
  <div class="content">
    <div class="send-section">
      <span>Revisa tu información y luego envía tu perfil</span>
      <router-link :to="{ name: 'successRegister', query: { userType: 'recruiter' } }" class="button">
        Enviar perfil
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
import showRecruiterInformationsMixin from '@/mixins/recruiter/showRecruiterInformationsMixin';


export default {
  name: 'StepPreview',
  mixins: [showRecruiterInformationsMixin],
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
        justify-content: center
        align-items: center
        width: 100%
        gap: 32px
        flex-wrap: wrap

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
</style>