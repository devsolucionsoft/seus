<template>
    <div class="cont">
  
        
        <div class="container">
            <div class="up-section">
                <h2 class="main-title">MERCADO DE OPORTUNIDADES</h2>
                <div class="postulated">
                    <h3>Ofertas laborales</h3>
                    <div class="filters-container">
                        <el-select v-if="isSmallScreen" v-model="selectedRole" placeholder="Seleccione un cargo" class="custom-select">
                            <el-option
                                v-for="item in roles"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>

                        <div class="filters" v-else>
                            <div class="title-filters">Filtrar resultados por</div>
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

            <div class="offers-container">
                <span class="results">{{ pagedItems[currentPage].length }} resultados de alrededor de 141.746</span>
                <div class="offer-elements">
                    <div 
                        v-for="(offer, index) in pagedItems[currentPage]" 
                        :key="index" 
                        class="card"
                    >
                        <div class="header">
                            <div class="img-container">
                                <div class="inner-circle">
                                    <img :src="offer.img" alt="Person">
                                </div>
                            </div>
                            <div class="information">
                                <div class="name">{{ offer.name }}</div>
                            </div>
                        </div>
                        <div class="desc-offer">
                            {{ offer.description }}
                        </div>
                        <div class="position">
                            <div class="title">
                                <div class="name">{{ offer.namePosition }}</div>
                                <div class="channel">{{ offer.channel }}</div>
                            </div>
                            <div class="desc-position">
                                {{ offer.descPosition }}
                            </div>
                        </div>
                        <div class="items">
                            <div class="item">
                                <span class="title-item">Ciudad</span>
                                <span class="desc">{{ offer.city }}</span>
                            </div>
                            <div class="item">
                                <span class="title-item">Fecha de cierre</span>
                                <span class="desc">{{ offer.endDate }}</span>
                            </div>
                            <div class="item">
                                <span class="title-item">Salario</span>
                                <span class="desc salary">{{ offer.salary }}</span>
                            </div>
                        </div>
                        <router-link :to="{ name: '' }" class="button">
                            <span>Aplicar a la oferta</span>
                        </router-link>
                    </div>
                </div>

                <div class="navigation">
                    <span>Página {{ currentPage + 1 }}</span>
                    <div class="navigation-items">
                        <img src="@/assets/icons/prev.svg" @click="prevPage" alt="Prev">
                        <img src="@/assets/icons/next.svg" @click="nextPage" alt="Next">
                    </div>
                </div>         
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OpportunityMarket',
    data() {
        return {
            selectedRole: '',
            selectedCity: '',
            selectedSalary: '',
            selectedMode: '',
            roles: [
                { value: 'marketing', label: 'Ejecutiva de marketing' },
                { value: 'ventas', label: 'Ejecutiva de ventas' },
            ],
            cities: [
                { value: 'bogota', label: 'Bogotá' },
                { value: 'medellin', label: 'Medellín' },
            ],
            salaries: [
                { value: '1000-2000', label: '1.000.000 - 2.000.000' },
                { value: '2000-3000', label: '2.000.000 - 3.000.000' },
            ],
            modes: [
                { value: 'presencial', label: 'Presencial' },
                { value: 'remoto', label: 'Remoto' },
            ],
            offers: [],
            currentPage: 0,
            itemsPerPage: 12,
            isSmallScreen: window.innerWidth < 1200
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
        }
    },
    created() {
        for (let i = 1; i <= 24; i++) {
            this.offers.push({
                name: 'Nuestros beneficios ' + i,
                description: 'En Nutresa, creemos firmemente en la importancia de mantener un equilibrio saludable entre la vida laboral y personal de nuestros empleados... ' + i,
                namePosition: 'Líder de ventas ' + i,
                channel: '(canal natural)',
                descPosition: 'Buscamos líder comercial apasionado(a) por el bienestar y la alimentación saludable, empática y con orientación al logro...',
                city: 'Bogotá',
                endDate: '30 de Julio de 2024',
                salary: '3.500.000 / 4.000.000',
                img: require('@/assets/brands/nutresag.svg')
            });
        }
    },
    beforeUnmounted() {
        window.removeEventListener('resize', this.handleResize);
    }
};
</script>

<style lang="sass" scoped>

.el-select
    border: 1px solid #0e497e
    border-radius: 5px
    *
        color: #023D6A
        font-size: 14px
        font-weight: 500
        line-height: 17.07px
        text-align: left

    @media(min-width: 1200px)
        border: 1px solid #023D6A
        border-radius: 50px
        overflow: hidden
        *
            border-radius: 0
            font-size: 12px
            font-weight: 500
            line-height: 14.63px
            text-align: left

.el-poper
    *
        color: #023D6A
        font-size: 14px
        font-weight: 500
        line-height: 17.07px
        text-align: left

.cont   
    padding: 16px 16px 30px 16px
    display: flex
    flex-direction: column
    gap: 16px
    @media(min-width: 1200px)
        padding: 40px 196px 50px 196px
        gap: 40px
    .container
        display: flex
        flex-direction: column
        gap: 16px
        @media (min-width: 1200px)
            gap: 58px
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
                flex-direction: column
                gap: 24px
                align-items: flex-start
                width: 100%
                @media (min-width: 1200px)
                    flex-direction: row
                    justify-content: space-between
                    align-items: center
                h3
                    font-size: 24px
                    font-weight: 700
                    line-height: 29.26px
                    text-align: left
                    color: #023D6A
                    white-space: nowrap
                .filters-container
                    display: flex
                    flex-direction: column
                    gap: 12px
                    width: 100%
                    align-items: flex-start
                    @media (min-width: 1200px)
                        flex-direction: row
                        gap: 20px

                    .title-filters
                        font-size: 16px
                        font-weight: 600
                        line-height: 19.5px
                        text-align: right
                        color: #023D6A

                    .filters
                        display: flex
                        flex-direction: row
                        gap: 20px
                        align-items: center
                        justify-content: flex-end
                        width: 100%
                        @media(max-width: 1200px)
                            display: none
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
        .offers-container
            display: flex
            flex-direction: column
            gap: 24px
            @media (min-width: 1200px)
                gap: 38px
            .results
                font-size: 12px
                font-weight: 400
                line-height: 14.63px
                text-align: left
                color: #191F27
            .offer-elements
                display: flex
                flex-direction: column
                gap: 24px
                @media (min-width: 1200px)
                    padding: 0 48px
                    display: grid
                    row-gap: 38px
                    column-gap: 18px
                    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr))
                .card
                    box-shadow: 0px 4px 6px 0px #00000026
                    border-radius: 12px
                    padding: 20px 24px
                    background-color: white
                    gap: 13px
                    display: flex
                    flex-direction: column
                    .header
                        display: flex
                        flex-direction: row
                        gap: 18px
                        align-items: flex-end
                        .img-container
                            width: 96px
                            height: 96px
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
                                    max-width: 96px
                                    object-fit: cover
                                    object-position: center
                        .information
                            display: flex
                            flex-direction: column
                            .name
                                font-size: 22px
                                font-weight: 600
                                line-height: 26.82px
                                text-align: left
                                color: #023D6A     
                    .desc-offer
                        font-size: 12px
                        font-weight: 400
                        line-height: 14.63px
                        text-align: left
                        color: black
                        padding: 0 18px
                    .position
                        display: flex
                        flex-direction: column
                        gap: 6px 
                        padding: 0 18px 20px 18px
                        position: relative
                        &::after
                            content: ""
                            position: absolute
                            bottom: 0
                            left: 0
                            right: 0
                            height: 1px
                            background-color: black
                            transform: scaleY(0.2)
                            transform-origin: bottom
                        .title
                            display: flex
                            flex-direction: column
                            gap: 0
                            .name
                                font-size: 22px
                                font-weight: 600
                                line-height: 26.82px
                                text-align: left
                                color: #023D6A
                            .channel
                                font-size: 14px
                                font-weight: 400
                                line-height: 17.07px
                                text-align: left
                                color: #023D6A
                        .desc-position
                            font-size: 12px
                            font-weight: 400
                            line-height: 14.63px
                            text-align: left
                            color: black
                    .items
                        display: grid
                        grid-template-columns: repeat(2, 1fr)
                        column-gap: 2px
                        row-gap: 13px
                        .item
                            display: flex
                            flex-direction: column
                            gap: 12px
                            .title-item
                                padding: 1px 12px
                                background-color: #CDFDF3
                                border-radius: 30px
                                font-size: 12px
                                font-weight: 500
                                line-height: 20px
                                text-align: left
                                color: #05454E
                                width: fit-content
                            .desc
                                color: #023D6A
                                padding-left: 12px
                                font-size: 16px
                                font-weight: 500
                                line-height: 20px
                                text-align: left
                                color: #023D6A
                                &.salary
                                    font-size: 22px
                                    font-weight: 600
                                    line-height: 20px
                                    text-align: left
                            &:nth-child(3)
                                grid-column: span 2

                    .button
                        width: fit-content
                        align-items: center
                        justify-content: center
                        gap: 10px
                        border-radius: 28px
                        padding: 11px 24px
                        display: flex
                        align-items: center
                        justify-content: center
                        background-color: #0DC6DE
                        text-decoration: none
                        align-self: center
                        margin-top: 18px
                        span
                            font-size: 16px
                            font-weight: 600
                            line-height: 19.5px
                            text-align: center
                            color: #CDFDF3
            .navigation
                display: flex
                flex-direction: row
                align-items: center
                justify-content: center
                gap: 22px
                @media(min-width: 1200px)
                    padding-top: 20px
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
