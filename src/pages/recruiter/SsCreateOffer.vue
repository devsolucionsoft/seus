<template>
    <div class="content">
        <SsHeader></SsHeader>
        <SsBannerProfile :visibleSections="{ bannerImage: true, profileSection: true, basicInfo: true, otherElements: false }"></SsBannerProfile>
        <SsCreateOffer></SsCreateOffer>
        <SsFooter></SsFooter>
    </div>
</template>

<script>
import SsHeader from '@/components/ss-header/SsHeader.vue';
import SsFooter from '@/components/ss-footer/SsFooter.vue';
import SsBannerProfile from '@/components/ss-aplicant/SsBannerProfile.vue';
import SsCreateOffer from '@/components/ss-offers/SsCreateOffer.vue';


export default {
    components: {
        SsHeader,
        SsFooter,
        SsBannerProfile,
        SsCreateOffer
    },
}
</script>

<style scoped lang="sass">


</style>