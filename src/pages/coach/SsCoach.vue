<template>
    <div class="content clean">
        <SsHeader/>
        <SsBannerProfile :visibleSections="{ bannerImage: true, profileSection: false, basicInfo: false, otherElements: false }"/>
        <SsCoach/>
        <SsFooter/>
    </div>
</template>

<script>
import SsHeader from '@/components/ss-header/SsHeader.vue';
import SsFooter from '@/components/ss-footer/SsFooter.vue';
import SsBannerProfile from '@/components/ss-aplicant/SsBannerProfile.vue';
import SsCoach from '@/components/ss-coach/SsCoach.vue';


export default {
    components: {
        SsHeader,
        SsFooter,
        SsBannerProfile,
        SsCoach
    },
}
</script>