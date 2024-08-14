<template>
    <div>
      <component :is="isMobile ? 'MobileComponent' : 'DesktopComponent'" />
    </div>
</template>
  
<script>
    import MobileComponent from '@/components/ss-aplicant/SsMobileComponent.vue';
    import DesktopComponent from '@/components/ss-aplicant/SsDesktopComponent.vue';

    export default {
    components: {
        MobileComponent,
        DesktopComponent,
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