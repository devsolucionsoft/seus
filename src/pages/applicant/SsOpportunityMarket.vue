<template>
    <div class="content">
        <SsHeader/>
        <SsBannerProfile :visibleSections="{ bannerImage: true, profileSection: false, basicInfo: false, otherElements: false }"/>
        <SsOpportunityMarket/>
        <SsFooter/>
    </div>
</template>

<script>
import SsHeader from '@/components/ss-header/SsHeader.vue';
import SsFooter from '@/components/ss-footer/SsFooter.vue';
import SsBannerProfile from '@/components/ss-aplicant/SsBannerProfile.vue';
import SsOpportunityMarket from '@/components/ss-aplicant/SsOpportunityMarket.vue';


export default {
    components: {
        SsHeader,
        SsFooter,
        SsBannerProfile,
        SsOpportunityMarket
    },
}
</script>