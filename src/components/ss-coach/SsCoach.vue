<template>
    <div class="single-coach">
        <div class="profile-section">
            <div class="profile-image">
                <img src="@/assets/images/woman.svg" alt="Camera Image">
            </div>
            <div class="basic-info">
                <div class="text">
                    <span><b>Andrea Tejeiro</b><br>COACH PERSONAL SENIOR</span>
                    <div class="lineText"></div>
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
                </div>
            </div>
        </div>

        <div 
            v-for="(coach, index) in pagedItems[currentPage]" 
            :key="index" 
            class="coach-info"
        >  
            <div class="card">
                <div class="offer-details dashed-group info-group">
                    <div class="element">
                        <div class="element-title">
                            <img src="@/assets/icons/suitcase.svg" alt="Suitcase">
                            <span>Nivel profesional</span>
                        </div>
                        <ul class="element-info ul">
                            <li>Leader Coaching para el desarrollo y desempeño.</li>
                            <li>Formadora en Aprendizaje Experiencial.</li>
                            <li>Inteligencia Emocional, con Daniel Goleman.</li>
                            <li>Terapia Transpersonal.</li>
                        </ul>
                    </div>
                    <div class="element">
                        <div class="element-title">
                            <img src="@/assets/icons/star.svg" alt="Suitcase">
                            <span>Certificaciones</span>
                        </div>
                        <div class="element-info images-container">
                            <img src="@/assets/images/icf.png" alt="ICF Credentials">
                            <img src="@/assets/images/icf2.png" alt="ICF Member">
                        </div>
                    </div>
                </div>
                <div class="info-group">
                    <div class="element">
                        <div class="element-title">
                            <img src="@/assets/icons/smile.svg" alt="Suitcase">
                            <span>Mi estilo</span>
                        </div>
                        <span class="element-info">
                            Me caracteriza el trato profesional y a la vez cercano. Considero que es importante crear una relación de confianza donde podamos colaborar desde la honestidad y el respeto mutuo. <br> Mi trabajo consiste en acompañarte en un proceso de coaching a tu medida. Confío en que, con la pregunta oportuna y aportaciones relevantes, puedes llegar a tus propias conclusiones y a tomar tus propias decisiones, tanto a nivel personal como profesional. <br><br> Tu proceso de coaching será para ti, al trabajar conmigo, un proceso de reflexión y transformación.
                        </span>
                    </div>
                    <div class="element">
                        <div class="element-title">
                            <img src="@/assets/icons/mic.svg" alt="Suitcase">
                            <span>Mi filosofía del Coaching</span>
                        </div>
                        <span class="element-info">
                            Del coaching como metodología valoro el hecho de que te conduce a asumir la responsabilidad sobre ti y te motiva a tomar tus propias decisiones. <br>
                            El éxito en el coaching es aprender a expresarte desde tu potencial, desde quién eres tú y desde quién quieres ser. Eres tú quien toma conciencia de dónde quieres estar y quien define el camino para conseguir tu meta. Eres tú quien sabe qué te está limitando y cómo construir nuevos caminos. Basta con formular las preguntas adecuadas para descubrirlo.
                            <br><br>El coaching me conecta con la toma de conciencia como proceso de desarrollo continuo para el ser humano. En mí lo vivo como una potente herramienta de crecimiento personal y profesional.
                        </span>
                    </div>
                </div>
            </div>

            <div class="coaching-areas">
                <h2>ÁREAS DE COACHING</h2>
                <div class="videos-container">
                    <div v-for="(video, index) in videos" :key="index" class="video-item">
                        <div class="video-wrapper">
                            <video
                            v-if="!video.isPlaying"
                            :poster="video.poster"
                            :src="video.url"
                            controls
                            class="video-player"
                            @click="playVideo(index)"
                            ></video>
                            <iframe
                            v-if="video.isPlaying"
                            :src="getVideoEmbedUrl(video.url)"
                            frameborder="0"
                            allowfullscreen
                            class="video-player"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="navigation">
            <span class="results">12 resultados de alrededor de 141.746</span>
            <div class="navigation-items">
                <img src="@/assets/icons/prev.svg" @click="prevPage" alt="Prev">
                <img src="@/assets/icons/next.svg" @click="nextPage" alt="Next">
            </div>
        </div>
        <button class="counseling">
            <img src="@/assets/icons/star-success-white.svg" alt="counseling">
            <span>Solicita tu asesoramiento</span>
        </button>         
    </div>  
</template>

<script>
export default {
    name: 'coach',
    data() {
        return {
            currentVideoUrl: '',
            videos: [
                {
                    title: 'Video 1',
                    url: 'https://www.youtube.com/watch?v=ts8i-6AtDfc',
                    poster: require('@/assets/images/poster1.jpeg'),
                    isPlaying: false
                },
                {
                    title: 'Video 2',
                    url: 'https://www.youtube.com/watch?v=ts8i-6AtDfc',
                    poster: require('@/assets/images/poster1.jpeg'),
                    isPlaying: false
                },
            ],
            coachs: [],
            currentPage: 0,
            itemsPerPage: 1,
        };
    },
    computed: {
        pagedItems() {
            const pages = [];
            for (let i = 0; i < this.coachs.length; i += this.itemsPerPage) {
                pages.push(this.coachs.slice(i, i + this.itemsPerPage));
            }
            return pages;
        },
        maxPage() {
            return this.pagedItems.length - 1;
        }
    },
    methods: {
        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.maxPage) {
                this.currentPage++;
            }
        },
        playVideo(index) {
            this.videos.forEach((video, idx) => {
                if (idx !== index) video.isPlaying = false;
            });
            this.videos[index].isPlaying = true;
        },
        getVideoEmbedUrl(url) {
            const videoId = url.split('v=')[1];
            return `https://www.youtube.com/embed/${videoId}`;
            },
        },
    created() {
        for (let i = 1; i <= 24; i++) {
            this.coachs.push({
                position: 'Mentora de marcas personales ' + i,
                name: 'Andrea Tejeiro',
                place: 'Bogotá, Colombia',
                description: 'Gerente de Negocio en segmento de superalimentos y estilo de vida, miembro de Comités Directivos y más de 15 años de experiencia...' + i,
            });
        }
    },
};
</script>

<style lang="sass" scoped>
.single-coach
    position: relative
    text-align: center
    padding: 10px 16px 94px 16px
    gap: 32px
    display: flex
    flex-direction: column
    align-items: center
    @media(min-width: 1200px)
        padding: 0 196px 50px 196px
        gap: 30px
    .profile-section
        margin-top: -80px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: flex-start
        align-items: flex-start
        gap: 32px
        @media(min-width: 1200px)
            width: 100%
            justify-content: center
            gap: 33px
            align-items: center
            margin-left: 0
            flex-direction: row
            margin-top: -20px

        .profile-image
            position: relative
            min-width: 144px
            min-height: 144px
            background-color: #F8D2EA
            border-radius: 50%
            overflow: hidden
            cursor: pointer
            display: flex
            align-items: center
            justify-content: center
            @media(min-width: 1200px)
                min-width: 255px
                min-height: 255px
            img
                max-width: 99px
                max-height: 87px
                object-fit: cover
                @media(min-width: 1200px)
                    max-width: 180px
                    max-height: 140px

        .basic-info
            display: flex
            flex-direction: column
            align-items: start
            gap: 24px
            position: relative
            width: 100%
            .text
                display: flex
                flex-direction: column
                gap: 15px
                span
                    font-size: 18px
                    font-weight: 500
                    line-height: 21.94px
                    text-align: left
                    color: #023D6A

                b
                    font-size: 34px
                    font-weight: 700
                    line-height: 41.45px
                    text-align: left
                .lineText
                    max-width: 64px
                    width: 100%
                    border-radius: 7px
                    height: 8px
                    border: none
                    background-color: #761d74
            .buttons-container
                display: flex
                flex-wrap: wrap
                justify-content: flex-start
                gap: 15px
                width: 100%
                button 
                    display: flex
                    align-items: center
                    justify-content: center
                    gap: 10px
                    border-radius: 28px
                    border: 2px solid #05454E
                    padding: 9px 24px
                    width: fit-content
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
    .coach-info
        display: flex
        flex-direction: column
        gap: 32px
        .card
            box-shadow: 0px 4px 10px 0px #00000026
            padding: 16px
            border-radius: 8px
            background-color: white
            @media(min-width: 1200px)
                padding: 50px 40px
            .info-group
                display: flex
                flex-direction: column
                padding: 32px 0
                gap: 24px

                &:first-child
                    padding: 0 0 32px 0
                &:last-child
                    padding: 32px 0 0 0
                .offer-title
                    font-size: 24px
                    font-weight: 700
                    line-height: 29.26px
                    text-align: left
                    color: #023D6A
                .element
                    display: flex
                    flex-direction: column
                    gap: 12px
                    .element-title
                        display: flex
                        flex-direction: row
                        gap: 7px
                        align-items: center
                        span
                            font-size: 14px
                            font-weight: 500
                            line-height: 20px
                            text-align: left
                            color: #47586E
                    .element-info
                        font-size: 14px
                        font-weight: 500
                        line-height: 20px
                        text-align: left
                        color: #023D6A
                        &.ul
                            padding-inline-start: 23px
                            margin: 0
                            li
                                font-size: 16px
                                font-weight: 500
                                line-height: 24px
                                text-align: left
                                color: #023D6A
                                &::marker
                                    font-size: 9px
                        &.images-container
                            display: flex
                            flex-direction: row
                            align-items: center
                            gap: 10px
                            img
                                max-width: 92px
                                max-height: 92px



                &.dashed-group
                    border-bottom: 1px dashed #9E9E9E
                @media(min-width: 1200px)
                    &.offer-details
                        display: grid
                        grid-template-columns: repeat(2, 1fr)
                        gap: 32px
                        .offer-title
                            grid-column: span 2
        .coaching-areas
            display: flex
            flex-direction: column
            gap: 32px
            justify-content: center
            h2
                font-size: 22px
                font-weight: 700
                line-height: 26.82px
                text-align: center
                color: #023D6A

            .videos-container
                display: grid
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
                gap: 10px
                justify-items: center
                align-items: center
                @media (min-width: 1200px)
                    gap: 34px
                .video-item
                    width: 100%
                    cursor: pointer
                    max-height: 280px
                    max-width: 100%
                    .video-wrapper
                        position: relative
                        width: 100%
                        max-width: 100%
                        min-height: 280px
                        height: auto
                        display: flex
                        justify-content: center

                        .video-player
                            position: relative
                            width: 100%
                            max-width: 100%
                            cursor: pointer
                            border-radius: 12px
                            object-fit: cover
                            max-height: 280px

.navigation
    display: flex
    justify-content: center
    align-items: flex-start
    width: 100%
    flex-direction: column
    gap: 16px
    @media(min-width: 1200px)
        justify-content: space-between
    .results
        font-size: 16px
        font-weight: 500
        line-height: 19.5px
        text-align: left
        color: #8E8E93
        span
            font-size: 14px
            font-weight: 500
            line-height: 17.07px
            text-align: right
            color: #828282
    .navigation-items
        display: flex
        flex-direction: row
        gap: 8px
        align-items: center
        justify-content: center
        align-self: center
        @media(min-width: 1200px)
            align-self: flex-end
        img
            cursor: pointer

.counseling
    display: flex
    flex-basis: row
    align-items: center
    justify-content: center
    gap: 10px
    background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
    border-radius: 50px
    padding: 14px 24px
    @media(min-width: 900px)
        width: fit-content
    @media(min-width: 1200px)
        margin-top: 20px
    span
        font-size: 16px
        font-weight: 500
        line-height: 19.5px
        text-align: center
        color: #CDFDF3


</style>
