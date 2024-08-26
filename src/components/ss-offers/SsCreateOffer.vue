<template>
    <div class="create-offer">
        <span class="main-title">Detalles del empleo</span>
        <form @submit.prevent="submitForm">
            <div v-for="(field, index) in formFields" :key="index" class="form-group">
                <label :for="field.name">
                    {{ field.label }}
                    <img :src="field.image" alt="">
                </label>
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
            </div>
            <router-link :to="{ name: '' }" class="button">
                <img src="@/assets/icons/upload.svg" alt="upload" />
                <p>Crear oferta de empleo</p>
            </router-link>
        </form>
    </div>
</template>
  
<script>
    import SsFormInput from '@/components/ss-form/SsFormInput.vue';
    import SsFormSelect from '@/components/ss-form/SsFormSelect.vue';
    import SsFormTextarea from '@/components/ss-form/SsFormTextarea.vue';
    import createOffer from '@/mixins/createOffer/createOffer.js';
  
  
    export default {
      mixins: [createOffer],
      name: 'createOffer',
      components: {
        SsFormInput,
        SsFormSelect,
        SsFormTextarea,
      },
    };
</script>
  
<style lang="sass" scoped>
.create-offer
    padding: 16px 16px 46px 16px
    width: 100%
    display: flex
    flex-direction: column
    gap: 24px
    @media(min-width: 1200px)
        padding: 40px 196px
    .main-title
        font-size: 24px
        font-weight: 700
        line-height: 29.26px
        text-align: center
        color: #023D6A
        align-self: center


    form
        display: flex
        flex-direction: column
        gap: 33px
        @media(min-width: 1200px)
            display: grid
            grid-template-columns: repeat(6, 1fr)
            gap: 24px

        .form-group
            display: flex
            flex-direction: column
            gap: 15px
            @for $i from 1 through 6 
                &:nth-child(#{$i})
                  grid-column: span 2

            @for $i from 7 through 12
                &:nth-child(#{$i})
                    grid-column: span 3
            
            &:nth-child(13)
                grid-column: span 6

                
                
            label
                font-size: 14px
                font-weight: 500
                line-height: 20px
                text-align: left
                color: #023D6A
                align-items: center
                display: flex
                flex-direction: row
                gap: 6px
            &.linkedin
                position: relative
            .linkedin-icon
                position: absolute
                bottom: 0
                right: 11px
                transform: translateY(-50%)
                width: 28px
                height: 28px

    .button
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
        align-self: center
        grid-column: span 6
        place-self: center

        @media(min-width: 1200px)
            margin-top: 60px
        p
            text-decoration: none
            font-size: 16px
            font-weight: 500
            line-height: 19.5px
            text-align: center
            color: #CDFDF3
</style>