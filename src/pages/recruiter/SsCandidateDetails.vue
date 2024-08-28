<template>
    <div class="content">
        <SsHeader/>
        <SsBannerProfile :visibleSections="{ bannerImage: true, profileSection: true, basicInfo: true, otherElements: false }" createOffer="true"/>
        <SsCandidateDetails/>
        <SsFooter/>
    </div>
</template>

<script>
import SsHeader from '@/components/ss-header/SsHeader.vue';
import SsFooter from '@/components/ss-footer/SsFooter.vue';
import SsBannerProfile from '@/components/ss-aplicant/SsBannerProfile.vue';
import SsCandidateDetails from '@/components/ss-offers/SsCandidateDetails.vue';


export default {
    components: {
        SsHeader,
        SsFooter,
        SsBannerProfile,
        SsCandidateDetails
    },
}
</script>

<style scoped lang="sass">


</style>