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
                <h2 class="main-title">MERCADO DE TALENTOS</h2>
                <div class="postulated">
                    <h3>Candidatos postulados</h3>
                    <div class="filters-container">
                        <div class="title-filters" v-if="isSmallScreen">Filtra por cargos </div>
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

            <div class="aplicants-container">
                <span class="results">Mostrando {{ pagedItems[currentPage].length }} resultados de un total de 24</span>
                <div class="aplicants-elements">
                    <div 
                        v-for="(candidate, index) in pagedItems[currentPage]" 
                        :key="index" 
                        class="card"
                    >
                        <div class="header">
                            <div class="img-container">
                                <div class="inner-circle">
                                    <img :src="candidate.img" alt="Person">
                                </div>
                            </div>
                            <div class="information">
                                <div class="name">{{ candidate.name }}</div>
                                <div class="position">{{ candidate.position }}</div>
                                <div class="place">{{ candidate.place }}</div>
                            </div>
                        </div>
                        <div class="desc">
                            {{ candidate.description }}
                        </div>
                        <div class="labels">
                            <div 
                                v-for="(label, idx) in candidate.labels" 
                                :key="idx" 
                                class="label"
                            >
                                {{ label }}
                            </div>
                        </div>
                        <div class="salary">
                            <div class="add-info">{{ candidate.addInfo }}</div>
                            <div class="amount">{{ candidate.salary }}</div>
                        </div>
                        <router-link :to="{ name: 'CandidateDetails' }" class="button">
                            <img src="@/assets/icons/whiteFrame.svg" alt="Frame">
                            <span>Ver candidato</span>
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
    name: 'HomeOffers',
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
            candidates: [],
            currentPage: 0,
            itemsPerPage: 12,
            isSmallScreen: window.innerWidth < 1200
        };
    },
    computed: {
        pagedItems() {
            const pages = [];
            for (let i = 0; i < this.candidates.length; i += this.itemsPerPage) {
                pages.push(this.candidates.slice(i, i + this.itemsPerPage));
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
            this.candidates.push({
                name: 'Candidato ' + i,
                position: 'Cargo ' + i,
                place: 'Bogotá, Colombia',
                description: 'Descripción del candidato ' + i,
                labels: ['Servicio al cliente', 'Ingeniero', 'Planning', 'Branding', '+4'],
                addInfo: 'Flexible para trabajar',
                salary: '3’000.000',
                img: require('@/assets/images/person.webp')
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
        padding: 40px 196px 20px 196px
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
                .desc
                    font-size: 12px
                    font-weight: 500
                    line-height: 14.63px
                    text-align: center
                    color: #354253

    .container
        display: flex
        flex-direction: column
        gap: 16px
        @media (min-width: 1200px)
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
                                    
                            

        .aplicants-container
            display: flex
            flex-direction: column
            gap: 16px
            @media (min-width: 1200px)
                gap: 20px
            .results
                font-size: 14px
                font-weight: 400
                line-height: 17.07px
                text-align: left
                color: #191F27
            .aplicants-elements
                display: flex
                flex-direction: column
                gap: 16px
                @media (min-width: 1200px)
                    padding: 0 48px
                    display: grid
                    row-gap: 20px
                    column-gap: 32px
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))

                .card
                    box-shadow: 0px 5px 7.9px 0px #00254B33
                    border-radius: 16px
                    padding: 24px 14px
                    background-color: white
                    gap: 16px
                    display: flex
                    flex-direction: column
                    .header
                        display: flex
                        flex-direction: row
                        gap: 16px
                        align-items: center
                        .img-container
                            width: 56px
                            height: 56px
                            border-radius: 50%
                            background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
                            padding: 3px
                            display: flex
                            align-items: center
                            justify-content: center
                            @media(min-width: 1200px)
                                width: 81px
                                height: 81px
                                box-shadow: none
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
                                    max-width: 56px
                                    object-fit: cover
                                    scale: 1.6
                                    object-position: top center
                        .information
                            display: flex
                            flex-direction: column
                            gap: 4px
                            .name
                                font-size: 18px
                                font-weight: 600
                                line-height: 21.94px
                                text-align: left
                                color: #023D6A
                            .position
                                font-size: 14px
                                font-weight: 500
                                line-height: 17.07px
                                text-align: left
                                color: #354253
                            .place
                                font-size: 12px
                                font-weight: 500
                                line-height: 14.63px
                                text-align: left
                                color: #354253
                    .desc
                        font-size: 14px
                        font-weight: 400
                        line-height: 24px
                        text-align: left
                        color: #023D6A
                    .labels
                        display: flex
                        flex-wrap: wrap
                        row-gap: 9px
                        column-gap: 5px
                        padding: 0 96px 12px 0
                        .label
                            border-radius: 30px
                            background-color: #A8A8A8
                            padding: 6px 14px
                            font-size: 12px
                            font-weight: 400
                            line-height: 14.52px
                            text-align: left
                            font-family: 'Inter'
                            color: white
                    .salary
                        display: flex
                        flex-direction: column
                        gap: 0
                        padding-left: 10px
                        .add-info
                            font-size: 12px
                            font-weight: 400
                            line-height: 14.63px
                            text-align: left
                            color: #023D6A
                        .amount
                            font-size: 30px
                            font-weight: 700
                            line-height: 36.31px
                            text-align: left
                            font-family: 'Inter'
                            color: #099BBE
                    .button
                        width: 100%
                        align-items: center
                        justify-content: center
                        gap: 10px
                        border-radius: 28px
                        padding: 9px 24px
                        display: flex
                        background-color: #761D74
                        text-decoration: none
                        span
                            font-size: 14px
                            font-weight: 400
                            line-height: 16.94px
                            text-align: center
                            font-family: 'Inter'
                            color: #F8D2EA
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
