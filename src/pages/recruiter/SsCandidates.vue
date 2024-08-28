<template>
    <div class="content">
        <SsHeader/>
        <SsBannerProfile :visibleSections="{ bannerImage: true, profileSection: true, basicInfo: true, otherElements: false }" createOffer="true"/>
        <SsCandidates/>
        <SsFooter/>
    </div>
</template>

<script>
import SsHeader from '@/components/ss-header/SsHeader.vue';
import SsFooter from '@/components/ss-footer/SsFooter.vue';
import SsBannerProfile from '@/components/ss-aplicant/SsBannerProfile.vue';
import SsCandidates from '@/components/ss-offers/SsCandidates.vue';


export default {
    components: {
        SsHeader,
        SsFooter,
        SsBannerProfile,
        SsCandidates
    },
}
</script>

<style scoped lang="sass">


</style>