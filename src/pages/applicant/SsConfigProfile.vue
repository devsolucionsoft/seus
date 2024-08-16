<template>
    <div class="content">
        <SsHeader></SsHeader>
        <div>
            <SsBannerProfile></SsBannerProfile>
          <component :is="isMobile ? 'MobileComponent' : 'DesktopComponent'" />
        </div>
        <SsFooter></SsFooter>
    </div>
</template>
  
<script>
    import MobileComponent from '@/components/ss-aplicant/SsMobileComponent.vue';
    import DesktopComponent from '@/components/ss-aplicant/SsDesktopComponent.vue';
    import SsHeader from '@/components/ss-header/SsHeader.vue';
    import SsFooter from '@/components/ss-footer/SsFooter.vue';
    import SsBannerProfile from '@/components/ss-aplicant/SsBannerProfile.vue';

    export default {
    components: {
        MobileComponent,
        DesktopComponent,
        SsHeader,
        SsFooter,
        SsBannerProfile,
    },
    data() {
        return {
        isMobile: window.innerWidth <= 768,
        };
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
        this.isMobile = window.innerWidth <= 768;
        },
    },
    };
</script>

<style lang="sass" scoped>
.content
    height: fit-content
    justify-content: space-between
    display: flex
    flex-direction: column
</style>