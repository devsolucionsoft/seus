<template>
    <div class="coachs-container">
        <div class="coachs-elements">
            <div v-if="isSmallScreen" class="filters">
                <h3>MENTORES</h3>
                <div class="filters-container">
                    <div class="title-filters">Filtra por cargos aplicados</div>
                    <el-select v-model="selectedRole" placeholder="Seleccione un cargo" class="custom-select">
                        <el-option
                            v-for="item in roles"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <span class="results">12 resultados de alrededor de 141.746</span>
            </div>

            <div class="cards">
                <div 
                    v-for="(coach, index) in pagedItems[currentPage]" 
                    :key="index" 
                    class="card"
                >  
                    <div class="img-container">
                        <img src="@/assets/images/coach.webp" alt="Coach">
                    </div>
                    <div class="content-card">
                        <span class="header">
                            {{ coach.position }}
                        </span>
                        <div class="personal-info">
                            <span class="name"> {{coach.name}} </span>
                            <span class="place"> {{ coach.place }}</span>
                            <span class="description"> {{ coach.description }}</span>
                        </div>
                        <div class="socials">
                            <div class="social">
                                <span class="title">LinkedIn</span>
                                <div class="desc">
                                    <img src="@/assets/icons/linkedin.svg" alt="LinkedIn">
                                    <span>@AndreaTejeiro</span>
                                </div>
                            </div>
                        </div>
                        <router-link :to="{ name: 'Coach' }" class="button">
                            <img src="@/assets/icons/star-success-blue.svg" alt="Frame">
                            <span>Ver Coach</span>
                        </router-link>
                    </div>
                </div>
            </div>

        </div>

        <div class="navigation">
            <span v-if="!isSmallScreen" class="results">12 resultados de alrededor de 141.746</span>
            <div class="pagination">
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
    name: 'Coachs',
    data() {
        return {
            selectedRole: '',
            roles: [
                { value: 'marketing', label: 'Ejecutiva de marketing' },
                { value: 'ventas', label: 'Ejecutiva de ventas' },
            ],
            coachs: [],
            currentPage: 0,
            itemsPerPage: 9,
            isSmallScreen: window.innerWidth < 1200
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
        handleResize() {
            this.isSmallScreen = window.innerWidth < 1200;
        }
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
    beforeUnmounted() {
        window.removeEventListener('resize', this.handleResize);
    }
};
</script>

<style lang="sass" scoped>
.coachs-container
    display: flex
    flex-direction: column
    padding: 24px 16px 40px 16px
    gap: 32px
    position: relative
    width: 100%
    justify-content: center
    align-items: center
    @media (min-width: 1200px)
        padding: 0 196px 80px 196px
        margin: -30px
    .coachs-elements
        display: flex
        gap: 16px
        flex-direction: column
    
        .filters
            display: flex
            flex-direction: column
            gap: 16px
            h3
                font-size: 20px
                font-weight: 600
                line-height: 26px
                text-align: left
                color: #023D6A
            .filters-container
                display: flex
                flex-direction: column
                gap: 12px
                width: 100%
                align-items: flex-start

                .title-filters
                    font-size: 16px
                    font-weight: 600
                    line-height: 19.5px
                    text-align: right
                    color: #023D6A
            .results
                font-size: 12px
                font-weight: 400
                line-height: 14.63px
                text-align: left
                color: #8E8E93

        .cards
            display: grid
            flex-direction: column
            gap: 16px
            grid-template-columns: repeat(auto-fit, minmax(352px, 1fr))
            @media (min-width: 1200px)
                row-gap: 30px
                column-gap: 32px

            .card
                box-shadow: 0px 1px 3px 1px #00000026
                box-shadow: 0px 1px 2px 0px #0000004D
                border-radius: 12px
                overflow: hidden
                background-color: white
                gap: 0
                display: flex
                flex-direction: column
                .img-container
                    max-height: 238px
                    img
                        height: 100%
                        width: 100%
                        object-fit: cover
                .content-card
                    padding: 24px 30px
                    background-color: white
                    gap: 10px
                    display: flex
                    flex-direction: column
                    .header
                        font-size: 24px
                        font-weight: 700
                        line-height: 28px
                        text-align: left
                        background: linear-gradient(180deg, #761D74 0%, #0DC6DE 100%)
                        -webkit-background-clip: text
                        -webkit-text-fill-color: transparent
                        background-clip: text
                        color: transparent
                    .personal-info
                        display: flex
                        flex-direction: column
                        gap: 4px
                        .name
                            font-size: 21px
                            font-weight: 500
                            line-height: 25.6px
                            text-align: left
                            color: #023D6A
                        .place
                            font-size: 14px
                            font-weight: 400
                            line-height: 17.07px
                            text-align: left
                            color: #023D6A
                        .description
                            font-size: 14px
                            font-weight: 400
                            line-height: 17.07px
                            text-align: left
                            color: #023D6A
                    .socials
                        display: flex
                        flex-direction: row
                        gap: 5px
                        flex-wrap: wrap
                        justify-content: flex-start
                        padding-bottom: 12px
                        .social 
                            display: flex
                            flex-direction: column
                            gap: 12px
                            .title
                                border-radius: 30px
                                background-color: #CDFDF3
                                color: #05454E
                                font-size: 12px
                                font-weight: 500
                                line-height: 20px
                                text-align: left
                                width: fit-content
                                padding: 1px 12px
                            .desc
                                display: flex
                                flex-direction: row
                                gap: 10px
                                align-items: center
                                span
                                    font-size: 16px
                                    font-weight: 500
                                    line-height: 19.5px
                                    text-align: left
                                    color: #023D6A
                    .button
                        width: 100%
                        align-items: center
                        justify-content: center
                        gap: 10px
                        border-radius: 28px
                        padding: 12px 24px
                        display: flex
                        background-color: #023C6A
                        text-decoration: none
                        span
                            font-size: 14px
                            font-weight: 400
                            line-height: 16.94px
                            text-align: center
                            font-family: 'Inter'
                            color: #CDFDF3
    .navigation
        display: flex
        justify-content: center
        align-items: center
        width: 100%
        @media(min-width: 1200px)
            justify-content: space-between
        .results
            font-size: 16px
            font-weight: 500
            line-height: 19.5px
            text-align: left
            color: #8E8E93
        .pagination
            display: flex
            flex-direction: row
            align-items: center
            justify-content: center
            gap: 22px
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
