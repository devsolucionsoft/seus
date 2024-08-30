<template>
    <div class="content">
        <SsHeader/>
        <SsBannerProfile :visibleSections="{ bannerImage: true, profileSection: true, basicInfo: true, otherElements: false }" createOffer="true" hideOnSmallScreens="true"/>
        <SsHomeOffers/>
        <SsFooter/>
    </div>
</template>

<script>
import SsHeader from '@/components/ss-header/SsHeader.vue';
import SsFooter from '@/components/ss-footer/SsFooter.vue';
import SsBannerProfile from '@/components/ss-aplicant/SsBannerProfile.vue';
import SsHomeOffers from '@/components/ss-offers/SsHomeOffers.vue';


export default {
    components: {
        SsHeader,
        SsFooter,
        SsBannerProfile,
        SsHomeOffers
    },
}
</script>