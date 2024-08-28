<template>
    <div class="cont">
        <div class="offertButton">
            <div class="up">
                <button @click="goBack" class="back-button mobile">
                    <img src="@/assets/icons/backArrow.svg" alt="<">
                    <span>Volver</span>
                </button>
                <router-link :to="{ name: 'createOffer' }" class="button">
                    <img src="@/assets/icons/upload.svg" alt="upload">
                    <span>Crear oferta de empleo</span>
                </router-link>
            </div>
            <div class="options">
                <div class="element">
                    <span class="desc">Entrevistas</span>
                    <img src="@/assets/icons/calendar.svg" alt="calendar">
                </div>
                <div class="element">
                    <span class="desc">Mensaje</span>
                    <img src="@/assets/icons/message.svg" alt="message">
                </div>
            </div>
        </div>
  
        
        <div class="container">
            <div class="up-section">
                <div class="welcome">
                    <div class="text">
                        <h2>Bienvenido Francisco</h2>
                        <button><img src="@/assets/icons/dots.svg" alt="..."></button>
                    </div>
                    <div class="lineTitle"></div>
                </div>
                <div class="top">
                    <div class="up">
                        <span class="title">Candidatos postulados</span>
                        <div class="options">
                            <div class="element">
                                <span class="desc">Entrevistas</span>
                                <img src="@/assets/icons/calendar.svg" alt="calendar">
                            </div>
                            <div class="element">
                                <span class="desc">Mensaje</span>
                                <img src="@/assets/icons/message.svg" alt="message">
                            </div>
                        </div>
                    </div>
                    <div class="actions">
                        <div class="top-container">
                            <div class="img-container">
                                <div class="inner-circle">
                                    <img src="@/assets/images/person.webp" alt="Person">
                                </div>
                            </div>
                            <div class="text mobile">
                                <h2>Francisco José Benavides</h2>
                                <span>Ingeniero Químico</span>
                            </div>
                        </div>
                        <div class="buttons">
                            <div class="up-section desktop">
                                <h2>Francisco José <br> Benavides</h2>
                                <div class="lineTitle"></div>
                            </div>
                            
                            <div class="buttons-container">
                                <button>
                                    <img src="@/assets/icons/arrow.svg" alt="->">
                                    <span>Enviar mensaje</span>
                                </button>
                                <button>
                                    <img src="@/assets/icons/phone.svg" alt="phone">
                                    <span>Llamar</span>
                                </button>
                                <button>
                                    <img src="@/assets/icons/download.svg" alt="download">
                                    <span>Decargar PDF</span>
                                </button>
                                <button class="desktop">
                                    <img src="@/assets/icons/print.svg" alt="print">
                                    <span>Imprimir</span>
                                </button>
                            </div>
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
                                    <SsFormToggle v-model="item.willingToRelocate" :isEditable="false" />
                                </template>
                                <template v-else>
                                    {{ item.value !== null && item.value !== '' ? item.value : 'N/A' }}
                                </template>
                            </p>
                        </div>
                    </div>
                </div>
            
                <div v-if="formations.length > 0" class="card formations information-cards">
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
    </div>
</template>

<script>
import showInformationsMixin from '@/mixins/showInformationsMixin';
import formationsMixin from '@/mixins/formationsMixin.js';
import experiencesMixin from '@/mixins/experiencesMixin.js';
import SsFormToggle from '@/components/ss-form/SsFormToggle.vue';




export default {
    name: 'CandidateDetails',
    mixins: [showInformationsMixin, formationsMixin, experiencesMixin],
    components: {
        SsFormToggle,
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    },
};
</script>

<style lang="sass" scoped>
.cont   
    padding: 16px 16px 59px 16px
    display: flex
    flex-direction: column
    gap: 16px
    @media(min-width: 1200px)
        padding: 62px 196px
        gap: 40px

    .offertButton
        display: flex
        flex-direction: column
        gap: 16px
        width: 100%
        padding-bottom: 16px
        border-bottom: 1px dashed #9E9E9E 
        @media(min-width: 768px)
            display: none
        .up
            display: flex
            width: 100%
            flex-wrap: wrap
            gap: 10px
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
            button
                display: flex
                flex-direction: row
                align-items: center
                justify-content: center
                gap: 10px
                border-radius: 28px
                padding: 12px 16px
                border: 1px solid #191F27
        .options
            display: flex
            flex-direction: row
            align-self: flex-end
            gap: 20px
            .element
                display: flex
                flex-direction: row
                gap: 13px 
                align-items: center
                justify-content: center
    .welcome
        display: flex
        flex-direction: column
        gap: 15px
        @media(max-width: 1200px)
                display: none
        @media(min-width: 768px)
            display: none
        .text
            display: flex
            flex-direction: row
            justify-content: space-between
            align-items: center
            gap: 16px
        h2
            font-size: 20px
            font-weight: 600
            line-height: 26px
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
        .lineTitle
            max-width: 64px
            width: 100%
            border-radius: 7px
            height: 8px
            background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
            border: none

    .container
        display: flex
        flex-direction: column
        gap: 28px
        .up-section
            display: flex
            flex-direction: column
            gap: 24px
        .top
            display: flex
            flex-direction: column
            gap: 16px
            align-content: center
            justify-content: center
            @media(min-width: 1200px)
                flex-direction: column
                justify-content: space-between
                gap: 28px
            .up
                display: flex
                flex-direction: row
                justify-content: space-between
                @media(max-width: 1200px)
                    display: none
                .title
                    font-size: 20px
                    font-weight: 600
                    line-height: 26px
                    text-align: center
                    color: #023D6A
                    @media(min-width: 1200px)
                        font-size: 24px
                        font-weight: 700
                        line-height: 29.26px
                        text-align: center

                .options
                    display: flex
                    flex-direction: row
                    gap: 20px
                    align-items: center
                    justify-content: center
                    .element
                        display: flex
                        flex-direction: row
                        gap: 13px
                        align-items: center
                        justify-content: center
                        .desc
                            font-size: 12px
                            font-weight: 500
                            line-height: 14.63px
                            text-align: center
                            color: #354253
            .actions
                display: flex
                flex-direction: column
                gap: 16px
                align-items: center
                @media(min-width: 1200px)
                    flex-direction: row
                .top-container
                    display: flex
                    flex-direction: row
                    gap: 16px
                    align-items: center
                    .img-container
                        width: 63px
                        height: 63px
                        border-radius: 50%
                        background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
                        padding: 3px
                        display: flex
                        align-items: center
                        justify-content: center
                        box-shadow: 0px 4px 8px 0px #00000026
                        @media(min-width: 1200px)
                            width: 255px
                            height: 255px
                            background: gray
                            padding: 0
                            box-shadow: none

                        @media(max-width: 768px)
                            width: 56px
                            height: 56px
                        .inner-circle
                            width: 100%
                            height: 100%
                            background-color: white
                            border-radius: 50%
                            display: flex
                            align-items: flex-start
                            justify-content: center
                            overflow: hidden
                            img
                                max-width: 63px
                                object-fit: cover
                                scale: 1.6
                                object-position: top center
                                @media(min-width: 1200px)
                                    max-width: 255px
                                    scale: 1
                                    object-position: center

                    .text
                        display: flex
                        flex-direction: column
                        gap: 0px
                        @media(min-width: 1200px)
                            display: none
                        h2
                            font-size: 24px
                            font-weight: 700
                            line-height: 32px
                            text-align: left
                            color: #023D6A
                        span
                            font-size: 16px
                            font-weight: 400
                            line-height: 24px
                            text-align: left
                            color: #023D6A

                .buttons
                    width: 100%
                    display: flex
                    flex-direction: column
                    gap: 23px
                    .up-section
                        display: flex
                        flex-direction: column
                        gap: 15px
                        h2
                            font-size: 34px
                            font-weight: 700
                            line-height: 41.45px
                            text-align: left
                            color: #023D6A
                        .lineTitle
                            width: 64px
                            height: 8px
                            border-radius: 7px
                            background-color: #761D74

                    .desktop
                        display: none
                        @media(min-width: 1200px)
                            display: flex
                    .buttons-container
                        display: flex
                        flex-wrap: wrap
                        justify-content: flex-start
                        gap: 15px
                        button 
                            display: flex
                            align-items: center
                            justify-content: center
                            gap: 10px
                            border-radius: 28px
                            border: 2px solid #05454E
                            padding: 9px 24px
                            width: calc(50% - 8px)
                            span
                                font-size: 14px
                                font-weight: 500
                                line-height: 17.07px
                                text-align: center
                                color: #065964
                            &.desktop 
                                display: none
                                @media(min-width: 1200px)
                                    display: flex
                            @media(min-width: 1200px)
                                width: auto
                            
        .cards-elements
            display: flex
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
                        @media(min-width: 1200px)
                            gap: 10px
                    .attachments-section
                        .attachments-container
                            max-width: 100%
                            display: flex
                            flex-direction: column
                            gap: 20px
                            @media(min-width: 1200px)
                                flex-direction: row
                            .attachment-item
                                max-width: 100%
                                height: 100%
                                overflow: hidden
                                position: relative
                                .image
                                    max-width: 100%
                                    object-fit: cover
                                    @media(min-width: 1200px)
                                        width: 220px
                                        height: 147px
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
                    @media(min-width: 1200px)
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
                        justify-content: flex-start
                        width: 100%
                        overflow-x: auto
                        scrollbar-width: none
                        -webkit-overflow-scrolling: touch
                        gap: 0px

                        .selected-item
                            display: flex
                            flex-direction: column
                            align-items: flex-start
                            text-align: center
                            padding: 11px 24px
                            gap: 10px

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
                @media(min-width: 1200px)
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
                
            @media(min-width: 1200px)
                display: grid
                grid-template-columns: repeat(2, 1fr)
                grid-template-rows: repeat(3, max-content)
                grid-column-gap: 28px
                grid-row-gap: 40px
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
                    gap: 24px
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


</style>
