<template>
    <div class="content">
        <section class="interest-items">
            <h2>Configura esta sección para un perfil más detallado.</h2>
            <div v-for="(option, index) in options" :key="index" class="option-group">
                <h3>{{ option.title }}</h3>
                <div class="options">
                    <div v-for="(item, idx) in option.items" :key="idx" class="option-item">
                        <div class="image-container" :class="{ selected: selectedOptions.includes(`${index}-${idx}`) }" @click="toggleSelection1(`${index}-${idx}`)">
                            <img :src="item.image" :alt="item.label" />
                        </div>
                        <p>{{ item.label }}</p>
                    </div>
                </div>
            </div>
        </section>
    
        <section class="form first">
            <form @submit.prevent="submitForm">
                <div v-for="(field, index) in formFields" :key="index" :class="['form-group', field.name === 'linkedin' ? 'linkedin' : '']">
                    <label :for="field.name">{{ field.label }}</label>
                    <component
                        :is="field.type"
                        v-model="formData[field.name]"
                        :placeholder="field.placeholder"
                        :options="field.options"
                        :type="field.inputType"
                        :id="field.name"
                        :label="field.label"
                        @change="handleInputChange(field.name)"
                    />
                    <img v-if="field.name === 'linkedin'" src="@/assets/icons/linkedin.svg" alt="LinkedIn Logo" class="linkedin-icon" />
                </div>
            </form>
        </section>
    
        <section class="interest-items">
            <div v-for="(option, index) in options2" :key="index" class="option-group">
                <h3>{{ option.title }}</h3>
                <div class="options">
                    <div v-for="(item, idx) in option.items" :key="idx" class="option-item">
                        <div class="image-container" :class="{ selected: selectedOptions2.includes(`${index}-${idx}`) }" @click="toggleSelection2(`${index}-${idx}`)">
                            <img :src="item.image" :alt="item.label" />
                        </div>
                        <p>{{ item.label }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="form second">
            <form @submit.prevent="submitForm">
                <div v-for="(field, index) in formFields2" :key="index" :class="['form-group', field.name === 'linkedin' ? 'linkedin' : '']">
                    <label :for="field.name">{{ field.label }}</label>
                    <component
                        :is="field.type"
                        v-model="formData[field.name]"
                        :placeholder="field.placeholder"
                        :options="field.options"
                        :type="field.inputType"
                        :id="field.name"
                        :label="field.label"
                        @change="handleInputChange(field.name)"
                    />
                    <img v-if="field.name === 'linkedin'" src="@/assets/icons/linkedin.svg" alt="LinkedIn Logo" class="linkedin-icon" />
                </div>
            </form>
        </section>
    
        <section class="sendProfile">
            <button class="sendProfileButton">
                <img src="@/assets/icons/whiteMailBox.svg" alt="Icon">
                <span>Guardar información</span>
            </button>
        </section>
    </div>

</template>

<script>
    import SsFormInput from '@/components/ss-form/SsFormInput.vue';
    import SsFormSelect from '@/components/ss-form/SsFormSelect.vue';
    import SsFormTextarea from '@/components/ss-form/SsFormTextarea.vue';
    import SsFormToggle from '@/components/ss-form/SsFormToggle.vue';
    import optionsMixin from '@/mixins/recruiter/optionsMixin.js';
    import formMixin from '@/mixins/recruiter/formMixin.js';
    import options2Mixin from '@/mixins/recruiter/options2Mixin.js';
    import form2Mixin from '@/mixins/recruiter/form2Mixin.js';


    export default {
        mixins: [optionsMixin, formMixin, options2Mixin, form2Mixin],
        name: 'SsDesktopComponent.vue',
        data() {
            return {
                finalNote: 'Elegir una cultura específica no te descarta de ningún proceso.',
            };
        },
        components:{
            SsFormInput,
            SsFormSelect,
            SsFormTextarea,
            SsFormToggle,
        },
    };
</script>
  
<style scoped lang="sass">

.content
    display: flex
    flex-direction: column
    gap: 0
    align-content: center
    justify-items: center
.interest-items
  padding: 40px 196px
  display: flex
  flex-direction: column
  gap: 41px
  background-color: #EDEEF1

  h2
    font-size: 24px
    font-weight: 700
    line-height: 29.26px
    text-align: center
    color: #023D6A

  .option-group
    display: flex
    gap: 18px
    flex-direction: column

    h3
      font-size: 16px
      font-weight: 600
      line-height: 20px
      text-align: left
      color: #023D6A
      margin: 0

    .options
      display: flex
      width: 100%
      gap: 32px
      align-items: center
      justify-content: flex-start
      flex-wrap: wrap

      .option-item
        display: flex
        flex-direction: column
        align-items: center
        text-align: center
        padding: 11px 24px
        gap: 10px
        cursor: pointer

        .image-container
          background: #023D6A
          height: 112px
          width: 112px
          border-radius: 100px
          display: flex
          align-items: center
          justify-content: center
          transition: background 0.3s ease-in-out

          &.selected
            background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
            transition: background 0.3s ease-in-out

        p
          font-size: 14px
          font-weight: 500
          line-height: 17.07px
          text-align: center
          color: #350D34

  .description
    font-size: 14px
    font-weight: 400
    line-height: 24px
    text-align: center
    color: #191F27

.form
    position: relative
    padding: 52px 197px
    form
        display: grid
        gap: 33px
    .form-group
        display: flex
        flex-direction: column
        gap: 14px

        label
            font-size: 14px
            font-weight: 500
            color: #023d6a

        &.linkedin
            position: relative
            .linkedin-icon
                position: absolute
                bottom: 0
                right: 11px
                transform: translateY(-50%)
                width: 28px
                height: 28px
    &.first
        @media (min-width: 1100px)
            form
                grid-template-columns: repeat(3, 1fr)
    &.second
        background-color: #023D6A
        form
            label
                color: #E7F9FC

        @media (min-width: 1100px)
            form
                grid-template-columns: repeat(3, 1fr)
            .form-group
                &:nth-child(4)
                    grid-column: span 4


.button-container
    display: flex
    flex-direction: row !important
    gap: 24px
    justify-content: flex-end
    grid-column: span 6            
    button
        max-width: 140px
        display: flex
        flex-direction: row
        align-items: center
        justify-content: center
        gap: 10px
        padding: 9px 24px
        border-radius: 28px
        &.blue
            background-color: #0DC6DE
            border: 1px solid #0DC6DE
            color: #023D6A
        &.transparent
            border: 1px solid #47586E
            background-color: transparent
        &.white
            border: 1px solid white
            background-color: transparent


.sendProfile
    padding: 44px 197px
    background-color: white
    display: flex
    align-items: center
    justify-content: center
    .sendProfileButton
        padding: 14px 24px
        align-self: center
        width: fit-content
        align-items: center
        gap: 10px
        justify-content: center
        display: flex
        border-radius: 50px
        background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
        span
            font-size: 16px
            font-weight: 500
            line-height: 19.5px
            text-align: center
            color: #F8D2EA
</style>