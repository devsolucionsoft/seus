<template>
    <div class="create-offer">
        <button @click="goBack" class="back-button">
            <img src="@/assets/icons/backArrow.svg" alt="<">
            <span>Volver</span>
        </button>

        <div class="card">
            <div class="header-section">
                <span>Cajero / Tiempo completo</span>
            </div>
            <div class="group">
                <div
                  v-for="(groupItems, groupIndex) in groupedItems"
                  :key="groupIndex"
                  class="dashed-group"
                >
                  <div
                    v-for="(item, index) in groupItems"
                    :key="index"
                    :class="item.class"
                    class="group-info-element"
                  >
                      <div class="title">
                        <div v-if="item.icon">
                          <img :src="item.icon" alt="Icon">
                        </div>
                        <span>{{ item.title }}</span>
                      </div>
                      <p>
                        {{ item.value !== null && item.value !== '' ? item.value : 'N/A' }}
                      </p>
                    </div>
                </div>
            </div>

        </div>


        <button class="button">
            <img src="@/assets/icons/upload.svg" alt="upload" />
            <p>Crear oferta de empleo</p>
        </button>
    </div>
</template>
  
<script>
import offer from '@/mixins/createOffer/offer.js';  
export default {
    mixins: [offer],
    name: 'createOffer',
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>
  
<style lang="sass" scoped>
.create-offer
    padding: 16px 16px 46px 16px
    width: 100%
    display: flex
    flex-direction: column
    gap: 56px
    @media(min-width: 1200px)
        gap: 44px

    .back-button
        display: flex
        align-items: center
        justify-content: center
        gap: 10px
        padding: 12px 16px
        border-radius: 28px
        border: 1px solid #191F27
        max-width: 116px
        span
            font-size: 16px
            font-weight: 400
            line-height: 19.5px
            text-align: center
            color: #191F27
        @media(max-width: 1200px)
            display: none
        
    @media(min-width: 1200px)
        padding: 40px 196px
    .main-title
        font-size: 24px
        font-weight: 700
        line-height: 29.26px
        text-align: center
        color: #023D6A
        align-self: center
        @media(min-width: 1200px)
            display: none

    .card
        display: flex
        flex-direction: column
        gap: 16px
        padding: 16px
        border-radius: 16px
        overflow: hidden
        width: 100%
        box-shadow: 0px 4px 10px 0px #00000026
        background-color: white
        @media(min-width: 1200px)
            padding: 50px 40px
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
            @media(min-width: 1200px)
                font-size: 24px
                font-weight: 700
                line-height: 29.26px
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
            justify-content: space-around
            width: 100%
            flex-wrap: wrap
            gap: 32px

            .selected-item
                display: flex
                flex-direction: column
                align-items: center
                text-align: center
                padding: 11px 24px
                gap: 10px

            .image-container
                background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
                height: 112px
                width: 112px
                border-radius: 100px
                display: flex
                align-items: center
                justify-content: center
                transition: background 0.3s ease-in-out
                img
                    max-width: 67px
                    max-height: 67px
            p
                font-size: 14px
                font-weight: 500
                line-height: 17.07px
                text-align: center
                color: #045480
        .group
            display: flex
            flex-direction: column
            gap: 32px
            .dashed-group
                display: flex
                flex-direction: column
                gap: 12px
                border-bottom: 1px dashed #9E9E9E
                padding-bottom: 32px
                @media(min-width: 1200px)
                    &:first-child
                        display: grid
                        grid-template-columns: repeat(3, 1fr)
                        grid-template-rows: repeat(3, 1fr)
                        .group-info-element
                            &:nth-child(1)
                                grid-column: span 3

                    &:nth-child(2)
                        display: grid
                        grid-template-columns: repeat(2, 1fr)
                        grid-template-rows: repeat(3, 1fr)

                                
                &:last-child
                    border-bottom: none
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

                    &.green-items
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

    @media(min-width: 768px)
        display: none

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