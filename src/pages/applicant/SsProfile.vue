<template>
    <div class="content">
        <SsHeader></SsHeader>
        <div>
            <SsBannerProfile :createOffer="true"></SsBannerProfile>
            <component :is="computedComponent" />
        </div>
        <SsFooter></SsFooter>
    </div>
</template>
  
<script>
    import MobileComponentPerson from '@/components/ss-aplicant/SsMobileProfileComponent.vue';
    import DesktopComponentPerson  from '@/components/ss-aplicant/SsDesktopProfileComponent.vue';
    import MobileComponentRecruiter from '@/components/ss-recruiter/SsMobileProfileComponent.vue';
    import DesktopComponentRecruiter from '@/components/ss-recruiter/SsDesktopProfileComponent.vue';
    import SsHeader from '@/components/ss-header/SsHeader.vue';
    import SsFooter from '@/components/ss-footer/SsFooter.vue';
    import SsBannerProfile from '@/components/ss-aplicant/SsBannerProfile.vue';

    export default {
    components: {
        MobileComponentPerson,
        DesktopComponentPerson,
        MobileComponentRecruiter,
        DesktopComponentRecruiter,
        SsHeader,
        SsFooter,
        SsBannerProfile,
    },
    data() {
        return {
        isMobile: window.innerWidth <= 768,
        };
    },
    computed: {
        computedComponent() {
            const userType = this.$route.query.userType || 'person';
            if (this.isMobile) {
                return userType === 'recruiter'
                ? 'MobileComponentRecruiter'
                : 'MobileComponentPerson';
            } else {
                return userType === 'recruiter'
                ? 'DesktopComponentRecruiter'
                : 'DesktopComponentPerson';
            }
        },
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