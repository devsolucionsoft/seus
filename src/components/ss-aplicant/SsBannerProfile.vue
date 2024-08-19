<template>
    <section class="banner-profile">
        <div class="banner-image">
          <img :src="backgroundImageBanner" alt="Background" class="background">
          <button @click="changeBackground" class="edit-btn">
            <span>Editar</span>
            <div class="img-container">
              <img src="@/assets/icons/edit.svg" alt="Editar">
            </div>
          </button>
        </div>
        <div class="profile-section">
          <div class="profile-image" @click="changeProfileImage">
            <img :src="profileImage" alt="Perfil">
            <div class="gradient-overlay"></div>
            <div class="upload-overlay">
              <img :src="cameraIcon" alt="Camera Image">
              <span>Sube una imagen de perfil</span>
            </div>
          </div>
          <div class="basic-info">
            <div class="text">
              <span>Bienvenido <br><b>Francisco José Benavides</b></span>
              <div class="lineText"></div>
            </div>
            <div class="info">
              <div class="element">
                <span class="title">Email</span>
                <span class="desc">FRJosé@gmail.com</span>
              </div>
              <div class="element">
                <span class="title">Documento</span>
                <div class="document-container desc">
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
            <button>Cambiar contraseña</button>
          </div>
        </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'BannerProfile',
    data() {
      return {
        backgroundImageBanner: require('@/assets/images/bgProfileImageBanner.webp'),
        profileImage: require('@/assets/images/bgProfileImage.webp'),
        cameraIcon: require('@/assets/icons/camera.svg'),
      };
    },
    methods: {
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
      }
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
      @media(min-width: 1200px)
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
      @media(min-width: 1200px)
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
    background-image: url('../../assets/images/bgLogin.jpeg')
    background-position: center right
    background-size: cover
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)

    @media(min-width: 1200px)
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
      @media(min-width: 1200px)
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
        @media(min-width: 1200px)
          top: 30%
          gap: 12px
        img
          max-width: 36px
          max-height: 33px
          @media(min-width: 1200px)
            max-width: 64px
            max-height: 59px
        span
          font-size: 12px
          font-weight: 500
          line-height: 18px
          text-align: center
          color: #47586E
          max-width: 80%
          @media(min-width: 1200px)
            font-size: 16px
            line-height: 24px
    .basic-info
      display: none
      margin-top: 142px
      flex-direction: column
      align-items: start
      gap: 23px
      width: 70%

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
          background-color: #761D74
          border: none
      .info
        display: flex
        flex-direction: row
        width: 100%
        justify-content: space-between
        padding-right: 67px
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
          .document-container
            display: flex
            flex-direction: row
            gap: 11px
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

      @media(min-width: 1200px)
        display: flex


</style>
  