<template>
  <section v-if="!hideOnSmallScreens || windowWidth >= 1200" class="banner-profile">
    <div v-if="visibleSections.bannerImage" class="banner-image">
      <div :class="{'background-container': true, 'blue-overlay': $route.query.userType === 'coach'}">
        <img v-if="$route.query.userType === 'coach'" :src="backgroundImageBannerCoach" alt="Background" class="background center">
        <img v-else :src="backgroundImageBanner" alt="Background" class="background top">
      </div>
      <button @click="changeBackground" class="edit-btn">
        <span>Editar</span>
        <div class="img-container">
          <img src="@/assets/icons/edit.svg" alt="Editar">
        </div>
      </button>
      <div v-if="$route.query.userType === 'coach'" class="coachs-title">
        <img src="@/assets/images/bg-coach.svg" alt="bg-image">
        <h1>MENTORES</h1>
      </div>
    </div>
    <div v-if="visibleSections.profileSection" class="profile-section">
      <div class="profile-image" @click="changeProfileImage">
        <img :src="profileImage" alt="Perfil">
        <div class="gradient-overlay"></div>
        <div class="upload-overlay">
          <img :src="cameraIcon" alt="Camera Image">
          <span>Sube una imagen de perfil</span>
        </div>
      </div>

      <div v-if="visibleSections.basicInfo" class="basic-info">
        <div class="text">
          <span>Bienvenido <br><b>{{ candidateData.name }} {{ candidateData.last_name }}</b></span>
          <div class="lineText" :style="{ background: lineTextColor }"></div>
        </div>
        <div v-if="visibleSections.otherElements" class="info">
          <div class="element">
            <span class="title">Email</span>
            <span class="desc">{{ candidateData.user?.email }}</span>
          </div>
          <div class="element">
            <span class="title">Documento</span>
            <div class="document-container">
              <span class="type">{{ candidateData.type_document_name }}</span>
              <span class="#">#</span>
              <span class="desc">{{ candidateData.document_number }}</span>
            </div>
          </div>
          <div class="element">
            <span class="title">Password</span>
            <span class="desc">***********</span>
          </div>
        </div>
        <button v-if="visibleSections.otherElements">Cambiar contraseña</button>
        <div class="offertButton" v-if="$route.query.userType === 'recruiter' && createOffer">
          <router-link :to="{ name: 'createOffer' }" class="button">
            <img src="@/assets/icons/upload.svg" alt="upload" />
            <span>Crear oferta de empleo</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useCandidateService } from '@/services/candidate/useCandidateService';
import { useTypeDocuments } from '@/services/globals/useTypeDocuments';
import store from 'store2';

export default {
  name: 'BannerProfile',
  props: {
    visibleSections: {
      type: Object,
      default: () => ({
        bannerImage: true,
        profileSection: true,
        basicInfo: true,
        otherElements: true,
      }),
    },
    createOffer: {
      type: Boolean,
      default: false,
    },
    hideOnSmallScreens: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const defaultBackgroundImageBanner  = require('@/assets/images/bgProfileImageBanner.webp');
    const defaultProfileImage  = require('@/assets/images/bgProfileImage.webp');
    const backgroundImageBannerCoach = require('@/assets/images/bgProfileImageBannerCoach.webp');
    const cameraIcon = require('@/assets/icons/camera.svg');
    const lineTextColor = ref('#761D74');
    const windowWidth = ref(window.innerWidth);
    const candidateData = ref({});
    const errorMessage = ref(null);

    const CandidateService = useCandidateService();
    const { listTypeDocuments } = useTypeDocuments();

    const backgroundImageBanner = ref(defaultBackgroundImageBanner);
    const profileImage = ref(defaultProfileImage);

    const token = store("token");

    const fetchCandidateProfile = async () => {
      try{
        const response = await CandidateService.getCandidateProfile(token);
        
        if (response.status === 200) {
          candidateData.value = response.data;
          errorMessage.value = null;
  
          backgroundImageBanner.value = candidateData.value.cover_image || defaultBackgroundImageBanner;
          profileImage.value = candidateData.value.photo || defaultProfileImage;
  
          const typesResult = await listTypeDocuments();
          if (typesResult) {
            const documentTypesMap = new Map(typesResult.data.data.map(type => [type.id, type.type]));
            candidateData.value.type_document_name = documentTypesMap.get(candidateData.value.type_document_id) || 'Desconocido';
          }
        }
      } catch (eror){
        /* errorMessage.value = result.message; */
      }
    };

    const updateLineColor = () => {
      const userType = props.userType || ''; 
      if (userType === 'recruiter') {
        lineTextColor.value = 'linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)';
      }
    };

    onMounted(() => {
      fetchCandidateProfile();
      window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth;
      });
    });

    return {
      backgroundImageBanner,
      backgroundImageBannerCoach,
      profileImage,
      cameraIcon,
      lineTextColor,
      windowWidth,
      candidateData,
      updateLineColor,
    };
  },
};
</script>


<style lang="sass">
.banner-profile
  position: relative
  text-align: center
  margin-top: -20px

  .banner-image
    position: relative
    display: flex

    .background-container
      position: relative
      width: 100%
      max-height: 112px
      @media (min-width: 768px) 
        max-height: 360px
      

      img.background
        width: 100%
        max-height: 100%
        object-fit: cover
        display: block
        &.center
          object-position: center
        &.top
          object-position: top
      
      &.blue-overlay
        &::before
          content: ''
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          background-color: rgba(39, 59, 74, 0.6)
          pointer-events: none
          
    .coachs-title
      position: absolute
      left: 196px
      bottom: 60px
      @media(max-width: 768px)
        display: none
      h1
        font-size: 66px
        font-weight: 700
        line-height: 68px
        text-align: left
        color: #CDFDF3
        position: absolute
        bottom: 59px
        left: 44px

    .edit-btn
      position: absolute
      top: 40px
      right: 10px
      display: flex
      align-items: center
      background-color: #EDEEF1
      border: none
      padding: 5px 16px
      cursor: pointer
      border-radius: 50px
      gap: 12px
      @media(min-width: 768px)
        top: 47px
        right: 184px

      .img-container
        display: flex
        justify-content: center
        align-items: center
        
        img
          max-height: 19px
          max-width: 20px

      span
        font-size: 12px
        font-weight: 500
        line-height: 15px
        color: #290A29

  .profile-section
    margin-top: -80px
    display: flex
    align-items: center
    justify-content: flex-start
    margin-left: 4%
    gap: 33px
    //background-image: url('../../assets/images/bgLogin.jpeg')
    background-position: center right
    background-size: cover
    //background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)

    @media (min-width: 768px) and (max-width: 1200px)
      flex-direction: column

    @media(min-width: 768px)
      margin-top: -124px
      margin-left: 196px
      width: 100%
      justify-content: center
      gap: 33px
      align-content: start
      margin-left: 0
      padding: 0 196px 40px 196px

    .profile-image
      position: relative
      width: 120px
      height: 120px
      border-radius: 50%
      overflow: hidden
      cursor: pointer
      @media(min-width: 768px)
        width: 255px
        height: 255px 

      img
        width: 100%
        height: 100%
        object-fit: cover

      .gradient-overlay
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: #B8BCFBE6
        border-radius: 50%
        pointer-events: none

      .upload-overlay
        position: absolute
        top: 15%
        left: 0
        right: 0
        display: flex
        align-items: center
        justify-content: center
        flex-direction: column
        gap: 16px
        @media(min-width: 768px)
          top: 30%
          gap: 12px
        img
          max-width: 36px
          max-height: 33px
          @media(min-width: 768px)
            max-width: 64px
            max-height: 59px
        span
          font-size: 12px
          font-weight: 500
          line-height: 18px
          text-align: center
          color: #47586E
          max-width: 80%
          @media(min-width: 768px)
            font-size: 16px
            line-height: 24px
    .basic-info
      display: none
      margin-top: 142px
      flex-direction: column
      align-items: start
      gap: 23px
      width: 70%
      position: relative

      .offertButton
        width: 100%
        right: 0
        top: 0
        max-width: 270px
        align-self: center
        @media(min-width: 1430px)
          position: absolute
        a
          display: flex
          flex-direction: row
          align-items: center
          justify-content: center
          gap: 10px
          background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
          border-radius: 50px
          padding: 14px
          width: 100%
          text-decoration: none

          span
            text-decoration: none
            font-size: 16px
            font-weight: 500
            line-height: 19.5px
            text-align: center
            color: #CDFDF3

      @media (min-width: 768px) and (max-width: 1200px)
        margin-top: 0px

      .text
        display: flex
        flex-direction: column
        gap: 15px
        span
          font-size: 24px
          font-weight: 500
          line-height: 29.26px
          text-align: left
          color: #023D6A
          b
            font-size: 34px
            font-weight: 700
            line-height: 41.45px
        .lineText
          max-width: 64px
          width: 100%
          border-radius: 7px
          height: 8px
          border: none
      .info
        display: flex
        flex-direction: row
        width: 100%
        justify-content: space-between
        padding-right: 67px
        gap: 18px
        @media (min-width: 768px) and (max-width: 1200px)
          flex-direction: column
        .element
          display: flex
          flex-direction: column
          gap: 18px
          .title
            font-size: 14px
            font-weight: 500
            line-height: 17.07px
            text-align: left
            color: #9E9E9E
          .desc
            font-size: 16px
            font-weight: 500
            line-height: 19.5px
            text-align: left
            align-items: center
            color: #023D6A
          .document-container
            display: flex
            flex-direction: row
            gap: 11px
            font-size: 16px
            font-weight: 500
            line-height: 19.5px
            text-align: left
            color: black

      button
        padding: 9px 11px 
        background-color: #D5B9D4
        border-radius: 28px
        font-size: 12px
        font-weight: 500
        line-height: 14.63px
        text-align: center
        color: #290A29
        align-self: flex-end

      @media(min-width: 768px)
        display: flex


</style>
  