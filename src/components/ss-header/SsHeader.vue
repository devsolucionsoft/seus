<template>
  <header>
    <router-link to="/" class="element">
      <img src="@/assets/logo.png" alt="SEUS Talent Logo" class="logo" />
    </router-link>

     <!-- Conditional rendering for navigation based on current route -->
    <nav v-if="shouldShowNavigation" class="navigation-menu">
      <ul :class="{ 'show-mobile': showMobileMenu }">
        <li v-for="(route, index) in userConfig.routes" :key="index" class="desktop">
          <router-link :to="route.path">{{ route.label }}</router-link>
        </li>

        <li>
          <div class="welcome">
            <span class="name">{{ userConfig.name }}</span>
            <span>{{ userConfig.subtitle }}</span>
          </div>
          <div class="img-container">
            <div class="inner-circle">
              <img :src="userConfig.image" :alt="userConfig.name" />
            </div>
          </div>
        </li>

        <li v-if="isMobile" class="hamburger-menu">
          <button @click="toggleMobileMenu">
            <img src="@/assets/icons/hamburger.svg" alt="Menu" />
          </button>
        </li>

        <div v-if="showMobileMenu" class="mobile-menu-overlay">
          <button class="close-button" @click="toggleMobileMenu">✕</button>
          <ul>
            <li v-for="(route, index) in userConfig.routes" :key="index">
              <router-link :to="route.path">{{ route.label }}</router-link>
            </li>
          </ul>
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'; // Added onBeforeUnmount
import { userTypeConfig } from "@/mixins/userType/userTypeConfig.js";
import store from 'store2';
import { useRoute } from 'vue-router';

export default {
  setup() {
    // Reactive state
    const route = useRoute(); 
    const showMobileMenu = ref(false);
    const isMobile = ref(window.innerWidth <= 1200);
    const userRoles = store.get("roles") || []; // Retrieve user roles from store

    // Computed properties
    const userConfig = computed(() => {
      // Check if the current route is 'coach' or 'coachs' to show Coach menu
      if (['coach', 'coachs'].includes(route.name)) {
        return userTypeConfig.Coach; // Always show Coach config for these routes
      }

      if (userRoles.includes("Admin")) {
        return userTypeConfig.Admin;
      } else if (userRoles.includes("Candidate")) {
        return userTypeConfig.Candidate;
      }
      return null;
    });

    // Check if the current route is one of the configuration pages
    const shouldShowNavigation = computed(() => {
      return (
        userConfig.value && 
        !['/config-profile', '/config-recruiter-profile'].includes(window.location.pathname)
      );
    });

    // Method to toggle the mobile menu
    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value;
      document.body.style.overflow = showMobileMenu.value ? "hidden" : "auto";
    };

    // Window resize listener
    const handleResize = () => {
      isMobile.value = window.innerWidth <= 1200;
    };

    // Lifecycle hook
    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });

    // Clean up event listener when component unmounts
    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      showMobileMenu,
      isMobile,
      userConfig,
      shouldShowNavigation,
      toggleMobileMenu,
    };
  }
};
</script>

<style scoped lang="sass">
  header
      border-radius: 0 0 20px 20px
      background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
      padding: 41px 196px 36px 196px
      z-index: 10
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center
      width: 100%
      position: sticky
      top: 0
      .logo
          max-width: 192px
      @media(max-width: 768px)
          padding: 16px !important
          .logo
            max-width: 144px !important
      
      nav
          ul
              list-style: none
              flex-direction: row
              display: flex
              gap: 4px
              margin: 0
              padding: 0
              align-items: center
              justify-content: center
              @media (max-width: 1200px)
                  gap: 12px
              li
                  display: flex
                  flex-direction: row
                  gap: 20px
                  align-items: center
                  justify-content: center
                  @media (max-width: 1200px)
                      &.desktop
                          display: none
                  @media(max-width: 768px)
                      gap: 12px
                  
                  a
                      text-decoration: none
                      font-size: 13px
                      font-weight: 500
                      line-height: 10px
                      text-align: center
                      color: #CDFDF3
                      padding: 8px 16px
                      @media(max-width: 768px)

                  .welcome
                      display: flex
                      flex-direction: column
                      gap: 0px
                      padding-left: 30px
                      @media (max-width: 1200px)
                          padding-left: 0

                      span
                          font-size: 14px
                          font-weight: 500
                          line-height: 17.07px
                          text-align: right
                          color: #CDFDF3
                          
                          &.name
                              font-size: 23px
                              font-weight: 600
                              line-height: 28.04px
                              text-align: right

                          @media(max-width: 768px)
                              font-size: 14px
                              font-weight: 500
                              line-height: 17.07px
                              text-align: right
                              &.name
                                  font-size: 14px
                                  font-weight: 500
                                  line-height: 17.07px
                                  text-align: right
                  .img-container
                      width: 63px
                      height: 63px
                      border-radius: 50%
                      background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%)
                      padding: 3px
                      display: flex
                      align-items: center
                      justify-content: center
                      box-shadow: 0px 4px 8px 0px #00000026

                      @media(max-width: 768px)
                          width: 56px
                          height: 56px
                      .inner-circle
                          width: 100%
                          height: 100%
                          background-color: white
                          border-radius: 50%
                          display: flex
                          align-items: center
                          justify-content: center
                          overflow: hidden
                          img
                              max-width: 63px
                              object-fit: cover

              .hamburger-menu 
                  display: none
                  @media (max-width: 1200px)
                      display: block
                      button
                          background: none
                          border: none
                          cursor: pointer
              
              
              .mobile-menu-overlay
                  position: fixed
                  top: 0
                  left: 0
                  width: 100%
                  height: 100%
                  background: rgba(0, 0, 0, 0.9)
                  display: flex
                  flex-direction: column
                  align-items: center
                  justify-content: center
                  z-index: 1000
                  ul
                      list-style: none
                      padding: 0
                      display: flex
                      flex-direction: column
                      li
                          margin: 20px 0
                      a
                          font-size: 24px
                          color: #cdfdf3
                          text-decoration: none
                      
                  .close-button 
                      position: absolute
                      top: 20px
                      right: 20px
                      background: none
                      border: none
                      font-size: 30px
                      cursor: pointer
                      color: #cdfdf3 
</style>