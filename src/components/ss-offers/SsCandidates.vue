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
            </div>

            <draggable class="elements" v-model="pagedItems[currentPage]" group="items">
                <template #item="{ element }">
                    <div class="element">
                        <div class="info">
                            <div class="header">
                                <div class="image">
                                    <div class="inner-circle">
                                        <img src="@/assets/images/person.webp" />
                                    </div>
                                </div>
                                <div class="person">
                                    <span class="name">{{ element.name }}</span>
                                    <span class="place">{{ element.place }}</span>
                                    <span class="postulated">Postulado en: {{ element.postulated }}</span>
                                </div>
                            </div>

                            <div class="elements-details">
                                <div class="detail">
                                    <span class="title">Estado</span>
                                    <span class="desc green-item">{{ element.status }}</span>
                                </div>
                                <div class="detail">
                                    <span class="title">Profesión</span>
                                    <span class="desc">{{ element.profession }}</span>
                                </div>
                                <div class="detail">
                                    <span class="title">Rango salarial</span>
                                    <span class="desc">{{ element.salary }}</span>
                                </div>
                                <div class="interest">
                                    <span class="title">¿Te interesa el candidato?</span>
                                    <div class="actions">
                                        <img src="@/assets/icons/checked.svg" alt="check">
                                        <img src="@/assets/icons/double-comment.svg" alt="comment">
                                        <img src="@/assets/icons/no-interest.svg" alt="x">
                                    </div>
                                </div>
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

export default {
    components: {
        draggable,
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
                name: 'Francisco José Benavides ' + (i + 1),
                place: 'Bogotá',
                postulated: '16 de Julio de 2024',
                status: 'Revisado',
                profession: 'Ingeniero Civil',
                salary: '3 SML en adelante',
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
        align-items: center
        .up-section
            display: flex
            flex-direction: column
            gap: 24px
        .top
            display: flex
            flex-direction: column
            gap: 16px
            align-item: center
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
            align-item: center
            justify-content: center
            .element
                background-color: white
                padding: 20px
                border: 1px solid #E3E6E9
                border-radius: 8px
                display: flex
                flex-direction: column
                gap: 16px
                justify-content: space-between
                flex-direction: row
                .dotsDesk
                    align-self: flex-start
                @media(min-width: 1200px)
                    flex-direction: row
                    .dotsDesk
                        align-self: center
                .info
                    display: flex
                    flex-direction: column
                    gap: 16px
                    width: 100%
                    @media(min-width: 1200px)
                        flex-direction: row
                    .header
                        display: flex
                        align-items: center
                        flex-direction: row
                        gap: 10px
                        @media(min-width: 1200px)
                        padding-right: 54px

                        .person
                            display: flex
                            flex-direction: column
                            gap: 4px
                            .name
                                font-size: 18px
                                font-weight: 600
                                line-height: 21.94px
                                text-align: left
                                color: #023D6A
                                text-decoration: underline
                                @media (min-width: 1200px)
                                    white-space: nowrap
                            .place
                                font-size: 14px
                                font-weight: 500
                                line-height: 17.07px
                                text-align: left
                                color:  #354253
                            .postulated
                                font-size: 12px
                                font-weight: 500
                                line-height: 14.63px
                                text-align: left
                                color:  #354253
                    .elements-details
                        display: flex
                        flex-wrap: wrap
                        gap: 24px
                        flex-direction: row
                        row-gap: 16px
                        align-items: center
                        width: 100%
                        @media(min-width: 1200px)
                            justify-content: space-evenly
                        .detail
                            display: flex
                            flex-direction: column
                            gap: 4px
                            .title
                                font-size: 12px
                                font-weight: 600
                                line-height: 20px
                                text-align: left
                                color: #05454E
                            .desc
                                font-size: 12px
                                font-weight: 500
                                line-height: 20px
                                text-align: left
                                color: #023D6A
                                &.green-item
                                    line-height: 15px
                                    padding: 5px 12px
                                    background-color: #9CFBEF
                                    border-radius: 50px
                        .interest
                            display: flex
                            flex-direction: column
                            gap: 8px
                            padding-bottom: 8px
                            .title
                                font-size: 12px
                                font-weight: 500
                                line-height: 20px
                                text-align: left
                                color: #354253
                            .actions
                                display: flex
                                flex-direction: row
                                gap: 8px
                                padding: 5px 12px
                                background-color: #6AF5EE
                                border-radius: 50px
                                max-width: 100px
                                align-self: flex-end
                    .image
                        width: 63px
                        height: 63px
                        border-radius: 50%
                        background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
                        padding: 3px
                        display: flex
                        align-items: center
                        justify-content: center
                        box-shadow: 0px 4px 8px 0px #00000026

                        @media(max-width: 768px)
                            width: 56px
                            height: 56px
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
                                max-width: 63px
                                object-fit: cover       
                            
                            
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
