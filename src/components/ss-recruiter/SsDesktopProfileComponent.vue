<template>
    <div class="container">

        <div v-if="filteredSections1.length > 0" class="employment">
            <div v-for="(section, sectionIndex) in filteredSections1" :key="sectionIndex" class="option-group">
              <h3>Culturas que nos identifican</h3>
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
                          <img 
                            v-if="item.name === 'instagram'" 
                            src="@/assets/icons/blue-ig.svg" 
                            alt="Instagram Logo" 
                            class="instagram-icon" 
                          />
                          <img 
                            v-else-if="item.name === 'linkedin'" 
                            src="@/assets/icons/bluelinkedin.svg" 
                            alt="LinkedIn Logo" 
                            class="linkedin-icon" 
                          />
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
        </div>

        <div v-if="filteredSections2.length > 0" class="employment">
            <div v-for="(section, sectionIndex) in filteredSections2" :key="sectionIndex" class="option-group">
              <h3>Arquetipos que nos identifican</h3>
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

        <div class="cards-elements second">
            <div class="personal-info card" v-if="personalInfoItems2">
                <div class="group" v-for="(item, index) in personalInfoItems2" :key="index" :class="item.class">
                    <div class="group-info-element">
                        <div class="title">
                            <div v-if="item.icon">
                                <img :src="item.icon" alt="Icon">
                            </div>
                            <span>{{ item.title }}</span>
                        </div>
                        <p>
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
    components: {
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
                font-size: 20px
                font-weight: 600
                line-height: 24px
                text-align: center
                color: #023D6A
                margin: 0
  
            .options
                flex-wrap: wrap
                display: flex
                justify-content: center
                width: 100%
                gap: 33px
    
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
                        color: #045480
    .cards-elements
        display: flex
        padding: 40px 196px
        width: 100%
        height: fit-content
        align-items: stretch

        &.second
            background-color: #023D6A
            .personal-info
                .group 
                    @media(min-width: 1100px)
                        &:nth-child(4)
                            grid-column: span 3
                    .group-info-element
                        p
                            color: #E7F9FC


        .personal-info
            width: 100%
            flex-direction: column
            display: grid
            gap: 32px
            @media(min-width: 1100px)
                grid-template-columns: repeat(3, 1fr)
            .group 
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
                        margin-left: 12px
                        img
                          width: 32px
                          height: 32px

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
.offertButton
    width: 100%
    padding: 44px 0
    display: flex
    align-items: center
    justify-content: center
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
        max-width: 270px

        span
            text-decoration: none
            font-size: 16px
            font-weight: 500
            line-height: 19.5px
            text-align: center
            color: #CDFDF3
  </style>