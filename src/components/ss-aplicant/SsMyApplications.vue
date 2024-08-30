<template>
    <div class="cont">
        <div class="up-section">
            <h2 class="main-title">MERCADO DE OPORTUNIDADES</h2>
            <div class="postulated">
                <h3>Mis postulaciones</h3>
                <div class="filters-container">
                    <div class="title-filters">Filtrar resultados por</div>
                    <el-select v-if="isSmallScreen" v-model="selectedRole" placeholder="Seleccione un cargo" class="custom-select">
                        <el-option
                            v-for="item in roles"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>

                    <div class="filters" v-else>
                        <div class="selects">
                            <div class="element">
                                <span class="title">Ciudad</span>
                                <el-select v-model="selectedCity" placeholder="Selecciona">
                                    <el-option
                                        v-for="item in cities"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="element">
                                <span class="title">Cargo</span>
                                <el-select v-model="selectedRole" placeholder="Selecciona">
                                    <el-option
                                        v-for="item in roles"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="element">
                                <span class="title">Salario</span>
                                <el-select v-model="selectedSalary" placeholder="Selecciona">
                                    <el-option
                                        v-for="item in salaries"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="element">
                                <span class="title">Modalidad</span>
                                <el-select v-model="selectedMode" placeholder="Selecciona">
                                    <el-option
                                        v-for="item in modes"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card" v-for="(offer, index) in pagedItems[currentPage]" :key="index">
            <template v-if="offer.applied">
                <div class="applied-card">
                    <div class="img-container">
                        <div class="inner-circle">
                            <img src="@/assets/brands/nutresag.svg" alt="Person">
                        </div>
                    </div>
                    <img class="success-image" src="@/assets/icons/starSuccess.svg" alt="Success">
                    <div class="info">
                        <span class="title">Aplicaste correctamente a esta oferta</span>
                        <span class="desc">Se adjuntó el documento a tu postulación. Puedes modificarlo y añadir otros documentos.</span>
                    </div>
                    <router-link :to="{ name: 'MyApplications' }" class="button">Volver al listado de ofertas</router-link>
                </div>
            </template>
            <template v-else>
                <div class="header card-section">
                    <div class="action">
                        <span class="action-text">Compartir en redes</span>
                        <div class="img-container">
                            <img src="@/assets/icons/arrow-white.svg" alt="Arrow">
                        </div>
                    </div>
                    <div class="action">
                        <span class="action-text">Enviar a un amigo</span>
                        <div class="img-container">
                            <img src="@/assets/icons/small-text.svg" alt="text">
                        </div>
                    </div>
                    <span class="applied">Aplicaste a esta oferta</span>
                </div>
                <div class="up card-section">
                    <div class="img-container">
                        <div class="inner-circle">
                            <img src="@/assets/brands/nutresag.svg" alt="Person">
                        </div>
                    </div>
                    <div class="invitation">
                        <div class="up-section">
                            <img src="@/assets/icons/suitcase.svg" alt="Suitcase">
                            <div class="title-up-section">¿Porque trabajar con nosotros?</div>
                        </div>
                        <div class="text-invitation">En Nutresa, creemos firmemente en la importancia de mantener un equilibrio saludable entre la vida laboral y personal de nuestros empleados. Por ello, ofrecemos una serie de beneficios que buscan mejorar su bienestar y satisfacción. Entre ellos, se destaca el día libre en el cumpleaños de cada empleado, permitiéndoles disfrutar de su día especial sin preocupaciones laborales. Además, proporcionamos horarios flexibles, la opción de trabajar desde casa y actividades recreativas mensuales para fome.</div>
                    </div>
                    <span class="mobile-applied">
                        Aplicaste a esta oferta
                    </span>
                </div>
                <div :class="['offer-details', 'info-group', 'card-section', { 'dashed-group': !isSmallScreen || offer.showMore }]">
                    <div class="element offer-title">{{ offer.name }}</div>
                    <div class="element green-item">
                        <div class="element-title">Cargo</div>
                        <div class="element-info">Cajero</div>
                    </div>
                    <div class="element green-item">
                        <div class="element-title">Salario</div>
                        <div class="element-info">3.500.000 / 4.000.000</div>
                    </div>
                    <div class="element green-item">
                        <div class="element-title">Ciudad</div>
                        <div class="element-info">Bogotá</div>
                    </div>
                    <div class="element green-item">
                        <div class="element-title">Vacante disponible</div>
                        <div class="element-info">Cajero</div>
                    </div>
                    <div class="element green-item">
                        <div class="element-title">Responsabilidades</div>
                        <div class="element-info">Manejo de dinero</div>
                    </div>
                    <div class="element green-item">
                        <div class="element-title">Fecha de cierre</div>
                        <div class="element-info">30 de Julio de 2024</div>
                    </div>
                </div>
                <template v-if="offer.showMore || !isSmallScreen">
                    <div class="requires dashed-group info-group card-section">
                        <div class="element green-item">
                            <div class="element-title">Estudios requeridos</div>
                            <div class="element-info">Bachillerato / Universidad</div>
                        </div>
                        <div class="element green-item">
                            <div class="element-title">Conocimientos esperados</div>
                            <div class="element-info">Manejo de clientes</div>
                        </div>
                        <div class="element green-item">
                            <div class="element-title">Experiencia Requerida</div>
                            <div class="element-info">1 año mínimo</div>
                        </div>
                        <div class="element green-item">
                            <div class="element-title">Palabras clave de la vacante</div>
                            <div class="element-info">Cajero</div>
                        </div>
                        <div class="element green-item">
                            <div class="element-title">Experiencia Requerida</div>
                            <div class="element-info">E-mail / Mensaje en Plataforma</div>
                        </div>
                        <div class="element green-item">
                            <div class="element-title">Correo para portulaciones</div>
                            <div class="element-info">Vacante@gmail.com</div>
                        </div>
                    </div>
                    <div class="footer-offer card-section">
                        <div class="offer-desc-up">
                            <div class="title-footer">
                                <img src="@/assets/icons/comment.svg" alt="message">
                                <span>Descripción del empleo</span>
                            </div>
                            <span class="desc">Habilidades de liderazgo y colaboración, con experiencia en dirigir equipos creativos hacia el logro de objetivos comunes, fomentando un ambiente de trabajo positivo y productivo.</span>
                        </div>
                        <div class="actions">
                            <button class="white button">Cancelar</button>
                            <button class="blue button" @click="applyToOffer(index)">Aplicar a la oferta</button>
                        </div>
                    </div>
                </template>
                <button v-if="isSmallScreen && !offer.showMore" @click="toggleShowMore(index)" class="blue button">
                    Ver más
                </button>
            </template>
        </div>
        <div class="navigation-container">
            <span class="result">{{ pagedItems[currentPage].length }} resultados de alrededor de 141.746</span>
            <div class="navigation">
                <span>Página {{ currentPage + 1 }}</span>
                <div class="navigation-items">
                    <img src="@/assets/icons/prev.svg" @click="prevPage" alt="Prev">
                    <img src="@/assets/icons/next.svg" @click="nextPage" alt="Next">
                </div>
            </div>   
        </div>
    </div>
</template>

<script>
export default {
    name: 'OfferDetail',
    data() {
        return {
            offers: [],
            currentPage: 0,
            itemsPerPage: 3,
            isSmallScreen: window.innerWidth < 1200,
        };
    },
    computed: {
        pagedItems() {
            const pages = [];
            for (let i = 0; i < this.offers.length; i += this.itemsPerPage) {
                pages.push(this.offers.slice(i, i + this.itemsPerPage));
            }
            return pages;
        },
        maxPage() {
            return this.pagedItems.length - 1;
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
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
        handleResize() {
            this.isSmallScreen = window.innerWidth < 1200;
        },
        toggleShowMore(index) {
            this.offers[index].showMore = !this.offers[index].showMore;
        },
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        for (let i = 1; i <= 24; i++) {
            this.offers.push({
                name: 'Cajero / Tiempo completo ' + i,
                description: 'Descripción del cargo ' + i,
                logo: '@/assets/brands/nutresag.svg',
                applied: false,
                showMore: false
            });
        }
    },
    beforeUnmounted() {
        window.removeEventListener('resize', this.handleResize);
    }
};
</script>

<style lang="sass" scoped>
.cont   
    padding: 16px 16px 44px 16px
    display: flex
    flex-direction: column
    gap: 16px
    @media(min-width: 1200px)
        padding: 40px 196px 50px 196px
        gap: 40px
    .up-section
        display: flex
        flex-direction: column
        gap: 16px
        width: 100%
        @media (min-width: 1200px)
            gap: 28px
        .main-title
            font-size: 20px
            font-weight: 600
            line-height: 26px
            text-align: left
            color: #023D6A
            @media (min-width: 1200px)
                font-size: 43px
                font-weight: 700
                line-height: 68px
                text-align: left
        .postulated
            display: flex
            flex-direction: row
            justify-content: space-between
            width: 100%
            flex-direction: column
            gap: 24px
            @media(min-width: 1200px)
                flex-direction: row
                align-items: center
            h3
                font-size: 24px
                font-weight: 700
                line-height: 29.26px
                text-align: left
                color: #023D6A
            .filters-container
                display: flex
                flex-direction: column
                gap: 12px
                width: 100%
                align-items: flex-start
                @media (min-width: 1200px)
                    flex-direction: row
                    gap: 20px
                    align-items: center

                .title-filters
                    font-size: 16px
                    font-weight: 600
                    line-height: 19.5px
                    text-align: left
                    color: #023D6A
                    @media(min-width: 1200px)
                        font-size: 14px
                        line-height: 17.07px


                .filters
                    display: flex
                    flex-direction: row
                    gap: 20px
                    align-items: center
                    justify-content: flex-end
                    width: 100%
                    .selects
                        display: flex
                        flex-direction: row
                        gap: 12px
                        flex-wrap: wrap
                        justify-content: center
                        .element
                            display: flex
                            flex-direction: column
                            gap: 10px
                            width: 141px
                            .title
                                font-size: 12px
                                font-weight: 600
                                line-height: 14.63px
                                text-align: left
                                margin-left: 20px
                                color: #023D6A
    .card
        box-shadow: 0px 4px 10px 0px #00000026
        padding: 16px
        border-radius: 8px
        background-color: white
        .card-section
            &:nth-child(3)
                border-bottom: none
            
        @media(min-width: 1200px)
            padding: 50px 40px
        .header
            display: none
            flex-direction: row
            gap: 12px
            align-items: center
            justify-content: flex-end
            width: 100%
            padding-bottom: 32px
            .applied
                padding: 5px 12px
                border-radius: 50px
                background-color: #9CFBEF
                color: #023D6A
                font-size: 12px
                font-weight: 500
                line-height: 14.63px
                text-align: center

            @media (min-width: 1200px)
                display: flex
            .action
                display: flex
                flex-direction: row
                gap: 10px
                align-items: center
                .action-text
                    font-size: 10px
                    font-weight: 500
                    line-height: 12.19px
                    letter-spacing: -0.02em
                    text-align: left
                    color: #023D6A
                .img-container
                    width: 26px
                    height: 26px
                    background-color: #06759F
                    border-radius: 50px
                    display: flex
                    align-items: center
                    justify-content: center
        .up
            display: flex
            flex-direction: row
            align-items: flex-start
            justify-content: space-between
            @media(min-width: 1200px)
                align-items: center
                gap: 32px
                justify-content: center
            .mobile-applied
                padding: 5px 12px
                background-color: #023D6A
                color: #CDFDF3
                font-size: 12px
                font-weight: 500
                line-height: 14.63px
                text-align: center
                border-radius: 50px
                width: fit-content
                @media(min-width: 1200px)
                    display: none
            .img-container
                min-width: 152px
                height: 152px
                border-radius: 50%
                background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
                padding: 5px
                display: flex
                align-items: center
                justify-content: center
                .inner-circle
                    width: 100%
                    height: 100%
                    background-color: white
                    border-radius: 50%
                    display: flex
                    align-items: center
                    justify-content: center
                    overflow: hidden
                    img
                        max-width: 77px    
                        width: 100%
                        object-fit: cover
                        object-position: center
            .invitation
                display: flex
                flex-direction: column
                gap: 12px
                display: none
                @media(min-width: 1200px)
                    display: flex
                .up-section
                    display: flex
                    align-items: center
                    flex-direction: row
                    gap: 7px
                    .title-up-section
                        font-size: 24px
                        font-weight: 700
                        line-height: 20px
                        text-align: left
                        color: #023D6A
                .text-invitation
                    font-size: 14px
                    font-weight: 500
                    line-height: 24px
                    text-align: left
                    color: #023D6A
        .info-group
            display: flex
            flex-direction: column
            gap: 16px
            padding: 32px 0
            
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
                    padding: 1px 12px
                    background-color: #CDFDF3
                    font-size: 12px
                    font-weight: 500
                    line-height: 20px
                    text-align: left
                    color: #05454E
                    border-radius: 30px
                    width: fit-content
                .element-info
                    font-size: 14px
                    font-weight: 500
                    line-height: 20px
                    text-align: left
                    color: #023D6A
                    margin-left: 12px
            
            &.dashed-group
                border-bottom: 1px dashed #9E9E9E
            @media(min-width: 1200px)
                &.offer-details
                    display: grid
                    grid-template-columns: repeat(3, 1fr)
                    gap: 32px
                    .offer-title
                        grid-column: span 3
                &.requires
                    display: grid
                    grid-template-columns: repeat(2, 1fr)
                    gap: 32px               
        .footer-offer
            display: flex    
            flex-direction: column
            padding-top: 32px
            gap: 32px
            .offer-desc-up
                display: flex
                flex-direction: column
                gap: 12px
                .title-footer
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
                .desc
                    font-size: 14px
                    font-weight: 500
                    line-height: 24px
                    text-align: left
                    color: #023D6A

            .actions
                display: flex
                align-items: center
                justify-content: flex-end
                gap: 10px
                font-size: 16px
                font-weight: 500
                line-height: 19.5px
                text-align: center
                .button
                    padding: 12px 24px
                    border-radius: 28px
                    width: fit-content
                    &.white
                        border: 1px solid #099BBE
                        color:  #099BBE
                    &.blue
                        border: 1px solid #0DC6DE
                        background-color: #0DC6DE
                        color:  #CDFDF3
        .applied-card
            display: flex
            flex-direction: column
            gap: 32px
            align-items: center
            justify-content: center
            .img-container
                min-width: 152px
                height: 152px
                border-radius: 50%
                background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
                padding: 5px
                display: flex
                align-items: center
                justify-content: center
                .inner-circle
                    width: 100%
                    height: 100%
                    background-color: white
                    border-radius: 50%
                    display: flex
                    align-items: center
                    justify-content: center
                    overflow: hidden
                    img
                        max-width: 77px    
                        width: 100%
                        object-fit: cover
                        object-position: center
            .info
                display: flex
                flex-direction: column
                gap: 0
                align-items: center
                justify-content: center
                @media(min-width: 1200px)
                    gap: 32px
                .title
                    font-size: 24px
                    font-weight: 700
                    line-height: 29.26px
                    text-align: center
                    color: #023D6A
                .desc
                    font-size: 14px
                    font-weight: 500
                    line-height: 20px
                    text-align: center
                    color: #023D6A
                    max-width: 70%
            .button
                padding: 12px 24px
                border-radius:  28px
                background-color: #0DC6DE
                color: #CDFDF3
                text-decoration: none
                width: fit-content
                font-size: 16px
                font-weight: 600
                line-height: 19.5px
                text-align: center

    .navigation-container
        display: flex
        flex-direction: column
        gap: 12px
        .result
            font-size: 12px
            font-weight: 400
            line-height: 14.63px
            text-align: left
            color: #8E8E93
        .navigation
            display: flex
            flex-direction: row
            align-items: center
            justify-content: center
            gap: 22px
            align-self: flex-end
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
                img
                    cursor: pointer
</style>
