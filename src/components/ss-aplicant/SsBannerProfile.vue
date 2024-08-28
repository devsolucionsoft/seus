<template>
    <section v-if="!hideOnSmallScreens || windowWidth >= 1200" class="banner-profile">
        <div v-if="visibleSections.bannerImage" class="banner-image">
          <img :src="backgroundImageBanner" alt="Background" class="background">
          <button @click="changeBackground" class="edit-btn">
            <span>Editar</span>
            <div class="img-container">
              <img src="@/assets/icons/edit.svg" alt="Editar">
            </div>
          </button>
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
              <span>Bienvenido <br><b>Francisco José Benavides</b></span>
              <div class="lineText" :style="{ background: lineTextColor }"></div>
            </div>
            <div v-if="visibleSections.otherElements" class="info">
              <div class="element">
                <span class="title">Email</span>
                <span class="desc">FRJosé@gmail.com</span>
              </div>
              <div class="element">
                <span class="title">Documento</span>
                <div class="document-container">
                  <span class="type">CC</span>
                  <span class="#">#</span>
                  <span class="desc">1022345789</span>
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
        default: true,
      },
    },
    data() {
      return {
        backgroundImageBanner: require('@/assets/images/bgProfileImageBanner.webp'),
        profileImage: require('@/assets/images/bgProfileImage.webp'),
        cameraIcon: require('@/assets/icons/camera.svg'),
        lineTextColor: '#761D74',
        windowWidth: window.innerWidth,
      };
    },
    mounted(){
      window.addEventListener('resize', this.updateWindowWidth);
      this.updateLineColor()
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.updateWindowWidth);
    },
    methods: {
      updateWindowWidth() {
        this.windowWidth = window.innerWidth;
      },
      changeBackground() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (event) => {
          const file = event.target.files[0];
          if (file) {
            this.backgroundImage = URL.createObjectURL(file);
          }
        };
        fileInput.click();
      },
      changeProfileImage() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (event) => {
          const file = event.target.files[0];
          if (file) {
            this.profileImage = URL.createObjectURL(file);
          }
        };
        fileInput.click();
      },
      updateLineColor() {
        const queryParam = this.$route.query.userType;
        if (queryParam === 'recruiter') {
          this.lineTextColor = 'linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)';
        }
        else{
          this.lineText = '761D74';
        }
      },
    }
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

    img.background
      width: 100%
      max-height: 112px
      object-fit: cover
      object-position: top
      @media(min-width: 768px)
        max-height: 237px

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
        height: 26px
        width: 26px
        background-color: #0DC6DE
        border-radius: 50px
        display: flex
        justify-content: center
        align-items: center
        
        img
          max-height: 19px
          max-width: 20px

        span
          font-size: 14px
          font-weight: 500
          color: #333

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
  