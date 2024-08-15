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

    .profile-image
      position: relative
      width: 120px
      height: 120px
      border-radius: 50%
      overflow: hidden
      cursor: pointer

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
        bottom: 0
        left: 0
        right: 0
        display: flex
        align-items: center
        justify-content: center
        flex-direction: column
        gap: 16px

        img
          max-width: 36px
          max-height: 33px
        span
          font-size: 12px
          font-weight: 500
          line-height: 18px
          text-align: center
          color: #47586E
          max-width: 80%
</style>
  