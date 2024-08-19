<template>
    <div class="content">
        <SsHeader></SsHeader>
        <div class="body">
            <img src="@/assets/icons/starSuccess.svg" alt="Success">
            <span>
                Buen trabajo Francisco, tu perfil está listo
            </span>
            <router-link to="/profile" class="button purple">
                Ver perfil
            </router-link>
            <router-link to="/offers" class="button white">
                Ver ofertas
            </router-link>
        </div>
        <SsFooter></SsFooter>
    </div>
</template>

<script>
import SsHeader from '@/components/ss-header/SsHeader.vue';
import SsFooter from '@/components/ss-footer/SsFooter.vue';

export default {
    components: {
        SsHeader,
        SsFooter,
    },
};
</script>

<style lang="sass">
@keyframes starFall 
    0% 
        transform: translateY(100vh) scale(0.5)
        opacity: 0

    50% 
        transform: translateY(-20px) scale(1.2)
        opacity: 1

    70% 
        transform: translateY(10px) scale(1.0)

    100% 
        transform: translateY(0) scale(1)
    
  
.content
    .body
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        gap: 24px
        padding: 16px
        min-height: 100vh
        img
            animation: starFall 1.5s ease-out forwards
            z-index: 1
        span
            font-size: 24px
            font-weight: 700
            line-height: 32px
            text-align: center
            color: #023D6A
            z-index: 2
        .button
            width: 100%
            border-radius: 28px
            padding: 14px
            font-size: 16px
            font-weight: 600
            line-height: 19.5px
            text-align: center
            text-decoration: none
            z-index: 2
            &.purple
                background-color: #761D74
                color: #F8D2EA
                border: 1px solid #761D74
            &.white
                background-color: transparent
                color: #191F27
                border: 1px solid #191F27
                font-weight: 400
</style>