<template>
    <div class="content">
        <SsHeader></SsHeader>
        <SsBannerProfile :visibleSections="{ bannerImage: true, profileSection: true, basicInfo: true, otherElements: false }" createOffer="true"></SsBannerProfile>
        <SsOffersElements/>
        <SsFooter></SsFooter>
    </div>
</template>

<script>
import SsHeader from '@/components/ss-header/SsHeader.vue';
import SsFooter from '@/components/ss-footer/SsFooter.vue';
import SsBannerProfile from '@/components/ss-aplicant/SsBannerProfile.vue';
import SsOffersElements from '@/components/ss-offers/SsOffersElements.vue';


export default {
    components: {
        SsHeader,
        SsFooter,
        SsBannerProfile,
        SsOffersElements
    },
}
</script>

<style scoped lang="sass">


</style>