<template>
    <section class="interest-items">
        <h2>Configura esta sección para un perfil más detallado.</h2>
        <div v-for="(option, index) in options" :key="index" class="option-group">
            <h3>{{ option.title }}</h3>
            <div class="options">
                <div v-for="(item, idx) in option.items" :key="idx" class="option-item">
                <div 
                    class="image-container" 
                    :class="{ selected: selectedOptions.includes(`${index}-${idx}`) }" 
                    @click="toggleSelection(`${index}-${idx}`)"
                >
                    <img :src="item.image" :alt="item.label" />
                </div>
                <p>{{ item.label }}</p>
                </div>
            </div>
        </div>
        <p class="description">{{ finalNote }}</p>
    </section>

    <div class="form">
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
                    :class="{'switch-label': field.type === 'SsFormToggle'}"
                    @change="handleInputChange(field.name)"
                />
                <img v-if="field.name === 'linkedin'" src="@/assets/icons/linkedin.svg" alt="LinkedIn Logo" class="linkedin-icon" />
            </div>
        </form>
    </div>

</template>

<script>
    import SsFormInput from '@/components/ss-form/SsFormInput.vue';
    import SsFormSelect from '@/components/ss-form/SsFormSelect.vue';
    import SsFormTextarea from '@/components/ss-form/SsFormTextarea.vue';
    import SsFormToggle from '@/components/ss-form/SsFormToggle.vue';
    import optionMixin from '@/mixins/optionMixin.js';
    import formMixin from '@/mixins/formMixin.js';
    export default {
        mixins: [optionMixin, formMixin],
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
      overflow-x: auto
      scrollbar-width: none
      -webkit-overflow-scrolling: touch
      gap: 32px

      .option-item
        display: flex
        flex-direction: column
        align-items: center
        text-align: center
        padding: 11px 24px
        gap: 10px
        cursor: pointer

        .image-container
          background: #761D74
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
    padding: 52px 197px
    margin: auto
    border-radius: 12px
    form
        display: grid
        grid-template-columns: repeat(6, 1fr)
        gap: 33px

    .form-group
        display: flex
        flex-direction: column
        gap: 14px

        &:nth-child(1), &:nth-child(2), &:nth-child(13), &:nth-child(14)
            grid-column: span 3
        
        &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(6), &:nth-child(7), &:nth-child(8), &:nth-child(9), &:nth-child(10), &:nth-child(11)
            grid-column: span 2

        &:nth-child(12), &:nth-child(15)
            grid-column: span 6

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

</style>