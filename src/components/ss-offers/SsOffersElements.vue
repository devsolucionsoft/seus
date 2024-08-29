<template>
    <div class="cont">
        <div class="offertButton">
            <router-link :to="{ name: 'createOffer' }" class="button">
                <img src="@/assets/icons/upload.svg" alt="upload">
                <span>Crear oferta de empleo</span>
            </router-link>
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
                    <span class="title">Empleos abiertos y en pausa</span>
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
            </div>

            <draggable class="elements" v-model="pagedItems[currentPage]" group="items">
                <template #item="{ element }">
                    <div class="element">
                        <div class="info">
                            <div class="header">
                                <div class="position">{{ element.position }}</div>
                                <img src="@/assets/icons/sixdots.svg" alt="...">
                            </div>
                            <span class="place">{{ element.place }}</span>
                            <span class="created">Creado: {{ element.created }}</span>
                        </div>
                        <div class="metrics">
                            <div class="header">
                                <img src="@/assets/icons/twopersons.svg" alt="pair">
                                <span class="title">Candidatos</span>
                            </div>
                            <div class="metrics-elements">
                                <div class="metric-element">
                                    <span class="desc">Activos</span>
                                    <span class="value">{{ element.active }}</span>
                                </div>
                                <div class="metric-element">
                                    <span class="desc">En espera</span>
                                    <span class="value">{{ element.waiting }}</span>
                                </div>
                                <div class="metric-element">
                                    <span class="desc">Revisados</span>
                                    <span class="value">{{ element.reviewed }}</span>
                                </div>
                                <div class="metric-element">
                                    <span class="desc">Por Contactar</span>
                                    <span class="value">{{ element.toContact }}</span>
                                </div> 
                                <div class="metric-element">
                                    <span class="desc">Contratado</span>
                                    <span class="value">{{ element.hired }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="actions">
                            <div class="action-element">
                                <span>Estado del empleo</span>
                                <ElSelect v-model="element.jobStatus">
                                    <ElOption label="Activo" value="activo"></ElOption>
                                    <ElOption label="Pausa" value="pausa"></ElOption>
                                </ElSelect>
                            </div>
                            <div class="action-element">
                                <span>Acciones</span>
                                <ElSelect v-model="element.action">
                                    <ElOption label="Editar" value="editar"></ElOption>
                                    <ElOption label="Eliminar" value="eliminar"></ElOption>
                                </ElSelect>
                            </div>
                        </div>
                        <img class="dotsDesk" src="@/assets/icons/sixdots.svg" alt="...">
                    </div>
                </template>
            </draggable>

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
import draggable from 'vuedraggable';
import { ElSelect, ElOption } from 'element-plus';

export default {
    components: {
        draggable,
        ElSelect,
        ElOption
    },
    data() {
        return {
            items: [],
            currentPage: 0,
            itemsPerPage: 6
        };
    },
    computed: {
        pagedItems() {
            const pages = [];
            for (let i = 0; i < this.items.length; i += this.itemsPerPage) {
                pages.push(this.items.slice(i, i + this.itemsPerPage));
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
        }
    },
    created() {
        for (let i = 0; i < 15; i++) {
            this.items.push({
                position: 'Cajero ' + (i + 1),
                place: 'Bogotá',
                created: '16 de Julio de 2024',
                active: 5,
                waiting: 0,
                reviewed: 1,
                toContact: 0,
                hired: 1,
                jobStatus: 'activo',
                action: ''
            });
        }
    }
};
</script>

<style lang="sass" scoped>

.cont   
    padding: 16px 16px 59px 16px
    display: flex
    flex-direction: column
    gap: 40px
    @media(min-width: 1200px)
        padding: 62px 196px

    .offertButton
        width: 100%
        @media(min-width: 768px)
            display: none
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

            span
                text-decoration: none
                font-size: 16px
                font-weight: 500
                line-height: 19.5px
                text-align: center
                color: #CDFDF3


    .welcome
        display: flex
        flex-direction: column
        gap: 15px
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
        gap: 40px
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
                flex-direction: row
                justify-content: space-between
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
        .elements
            display: flex
            flex-direction: column
            gap: 16px
            align-content: center
            justify-content: center
            .element
                background-color: white
                padding: 16px
                border: 1px solid #E3E6E9
                border-radius: 8px
                display: flex
                flex-direction: column
                gap: 16px
                justify-content: center
                .dotsDesk
                    align-self: flex-start
                    @media(max-width: 1200px)
                        display: none
                @media(min-width: 1200px)
                    flex-direction: row
                    justify-content: space-between
                .info
                    display: flex
                    flex-direction: column
                    gap: 4px
                    .header
                        display: flex
                        justify-content: space-between
                        align-items: center
                        .position
                            font-size: 18px
                            font-weight: 600
                            line-height: 21.94px
                            text-align: left
                            color: #023D6A
                            text-decoration: underline
                        @media(min-width: 1200px)
                            img
                                display: none

                    .place
                        font-size: 14px
                        font-weight: 500
                        line-height: 17.07px
                        text-align: left
                        color:  #354253
                    .created
                        font-size: 12px
                        font-weight: 500
                        line-height: 14.63px
                        text-align: left
                        color:  #354253

                .metrics
                    display: flex
                    flex-direction: column
                    gap: 16px
                    padding: 16px 22px
                    border-radius: 8px
                    background-color: #E4E0E0
                    @media(min-width: 1200px)
                        flex-direction: row
                        padding: 8px 16px

                    .header
                        display: flex
                        flex-direction: row
                        gap: 8px
                        align-items: center
                        .title
                            font-size: 14px
                            font-weight: 600
                            line-height: 17.07px
                            text-align: left
                            color: black

                    .metrics-elements
                        display: flex
                        flex-direction: row
                        gap: 16px
                        align-items: flex-end
                        justify-content: center
                        .metric-element
                            display: flex
                            flex-direction: column
                            gap: 8px
                            justify-content: flex-end
                            .desc
                                font-size: 10px
                                font-weight: 500
                                line-height: 12.19px
                                text-align: center
                                color: black
                            .value
                                font-size: 33px
                                font-weight: 600
                                line-height: 39px
                                text-align: center
                                color: black

                .actions
                    display: flex
                    flex-direction: row
                    gap: 28px
                    align-items: center
                    .action-element
                        display: flex
                        flex-direction: column
                        gap: 8px
                        max-width: 116px
                        .el-select
                            width: 116px
                            
                        span
                            font-size: 12px
                            font-weight: 500
                            line-height: 14.63px
                            text-align: left
                            color: #354253

        .navigation
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
