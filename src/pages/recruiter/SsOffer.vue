<template>
    <div class="content">
        <SsHeader></SsHeader>
        <SsBannerProfile :visibleSections="{ bannerImage: true, profileSection: true, basicInfo: true, otherElements: false }" :createOffer="true" :hideOnSmallScreens="true"></SsBannerProfile>
        <SsOffer></SsOffer>
        <SsFooter></SsFooter>
    </div>
</template>

<script>
import SsHeader from '@/components/ss-header/SsHeader.vue';
import SsFooter from '@/components/ss-footer/SsFooter.vue';
import SsBannerProfile from '@/components/ss-aplicant/SsBannerProfile.vue';
import SsOffer from '@/components/ss-offers/SsOffer.vue';


export default {
    components: {
        SsHeader,
        SsFooter,
        SsBannerProfile,
        SsOffer
    },
}
</script>