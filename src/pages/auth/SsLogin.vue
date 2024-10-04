<template>
  <div class="page-container">
    <nav>
      <router-link to="/companies" class="element">
        <img src="@/assets/icons/company.svg" alt="Companies Icon" />Empresas
      </router-link>

      <router-link to="/persons" class="element">
        <img src="@/assets/icons/persons.svg" alt="Persons Icon" />Personas
      </router-link>
    </nav>
    <div class="container">
      <div class="form-section">
        <img src="@/assets/logo.png" alt="SEUS Talent Logo" class="logo" />
        <form @submit.prevent="validateForm" novalidate>
          <div class="element">
            <div class="input">
              <label for="email">Usuario</label>
              <div class="inputElement">
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  placeholder="Ingresa un correo electrónico"
                />
                <img src="@/assets/icons/mail.svg" alt="Mail Icon" />
              </div>
            </div>
            <span v-if="emailError" class="error-message">{{ emailError }}</span>
          </div>
          <div class="element">
            <div class="input">
              <label for="password">Contraseña</label>
              <div class="inputElement">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="password"
                  placeholder="Ingresa tu contraseña"
                />
                <img
                  @click="togglePasswordVisibility"
                  style="cursor: pointer"
                  src="@/assets/icons/eye.svg"
                  alt="Eye Icon"
                />
              </div>
            </div>
            <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
          </div>
          <button type="submit">Ingresar</button>
          <router-link to="/forgotten-password" class="forgotten-password">
            ¿Olvidaste tu contraseña?
          </router-link>
        </form>
      </div>
      <div class="image-section">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image.src"
          :alt="image.alt"
          :class="{ expand: expandedIndex === index }"
          @mouseover="expandImage(index)"
          @mouseout="resetExpand"
        />
      </div>
    </div>
    <footer>
      <div class="brands">
        <img src="@/assets/brands/cocacola.png" alt="Coca Cola" />
        <img src="@/assets/brands/bancolombia.png" alt="Bancolombia" />
        <img src="@/assets/brands/nutresa.png" alt="Nutresa" />
        <img src="@/assets/brands/velez.png" alt="Velez" />
        <img src="@/assets/brands/cocacola.png" alt="Coca Cola" />
        <img src="@/assets/brands/bancolombia.png" alt="Bancolombia" />
        <img src="@/assets/brands/nutresa.png" alt="Nutresa" />
        <img src="@/assets/brands/velez.png" alt="Velez" />
      </div>
      <div class="poweredby">
        <p>
          Powered by
          <a target="_blank" href="https://solucionsoft.com"
            >SolucionSoft.com</a
          >
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import store from 'store2';
import { useAuthService } from '@/services/auth/useAuthService';
import { ElMessage } from 'element-plus';
import { decodeJWT } from '@/utils/decodeJWT';

import speakerImg from '@/assets/images/speaker.webp';
import cityImg from '@/assets/images/city.webp';
import micImg from '@/assets/images/mic.webp';

// Reactive form data
const email = ref('');
const password = ref('');
const showPassword = ref(false);

// Validation errors
const emailError = ref('');
const passwordError = ref('');

// State to check if login was attempted
const loginAttempted = ref(false);

// Router and AuthService
const router = useRouter();
const authService = useAuthService();

// Images for the image section
const images = ref([
  { src: speakerImg, alt: 'Speaker Image' },
  { src: cityImg, alt: 'City Image' },
  { src: micImg, alt: 'Microphone Image' },
]);

const expandedIndex = ref(0);

// Toggle visibility of password
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Validate email format
const isValidEmail = (email) => {
  const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(email);
};

// Form validation logic
const validateForm = async () => {
  // Set login attempt to true when the user tries to login
  loginAttempted.value = true;

  let isValid = true;
  emailError.value = '';
  passwordError.value = '';

  if (!email.value) {
    emailError.value = 'El correo electrónico es requerido';
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    emailError.value = 'El correo electrónico no es válido';
    isValid = false;
  }

  if (!password.value) {
    passwordError.value = 'La contraseña es requerida';
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = 'La contraseña debe tener al menos 6 caracteres';
    isValid = false;
  }

  if (isValid) {
    await login();
  }
};

// Login logic
const login = async () => {
  try {
    const response = await authService.login({
      username: email.value,
      password: password.value,
    });
    if (response && response.data.status_code === 200) {
      const token = response.data.data.token;

      const decodedToken = decodeJWT(token);
      const roles = decodedToken.roles;

      store.set("token", token);
      store.set("roles", roles); 

      if (roles.includes("Company")) {
        router.push({ name: "configRecruiterProfile" });
      } else if (roles.includes("Candidate")) {
        router.push({ name: "configProfile" });
      }
    }
  } catch (error) {
    ElMessage.error(error.response.data.message);
  }
};

// Image hover effect
const expandImage = (index) => {
  expandedIndex.value = index;
};

const resetExpand = () => {
  expandedIndex.value = 0;
};

// Watchers for real-time validation
watch(email, (newVal) => {
  if (loginAttempted.value) {
    emailError.value = '';
    if (newVal && !isValidEmail(newVal)) {
      emailError.value = 'El correo electrónico no es válido';
    }
  }
});

watch(password, (newVal) => {
  if (loginAttempted.value) {
    passwordError.value = '';
    if (newVal && newVal.length < 6) {
      passwordError.value = 'La contraseña debe tener al menos 6 caracteres';
    }
  }
});
</script>

<style scoped lang="scss">
.page-container {
  background: linear-gradient(112.76deg, #761d74 0.53%, #0dc6de 100%);
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: "Inter" !important;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 1020px) {
    height: auto;
  }
  nav {
    display: flex;
    flex-direction: row;
    padding: 42px 38px 21px 0;
    margin-right: 15%;
    justify-content: end;
    align-items: center;
    border-bottom: 1px solid white;
    gap: 42px;
    @media (max-width: 700px) {
      margin-right: 0px;
      margin: 0 26px 0 26px;
      padding: 24px 0 34px 0;
      gap: 16px;
    }
    .element {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 19px;
      color: #cdfdf3;
      text-decoration: none;
      z-index: 3;
      font-family: "Inter" !important;
      @media (max-width: 700px) {
        font-size: 14px;
        line-height: 17px;
      }
    }
  }
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 94px 18px;
    overflow: hidden;
    height: calc(100vh - 196px);
    box-sizing: border-box;
    @media (max-width: 1020px) {
      flex-direction: column;
      height: 100%;
    }
    .form-section {
      padding: 40px;
      border-radius: 10px;
      text-align: center;
      max-width: 60%;
      width: 60%;
      gap: 29px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      @media (max-width: 700px) {
        max-width: 100%;
        width: 100%;
      }
      .logo {
        max-width: 473px;
        width: 100%;
        z-index: 3;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 29px;
        width: 100%;
        max-width: 400px;
        align-items: center;
        justify-content: center;
        @media (max-width: 700px) {
          padding: 0 18px;
        }
        .element {
          display: flex;
          flex-direction: column;
          align-items: start;
          width: 100%;
          span {
            font-size: 12px;
            font-weight: 400;
            line-height: 16.94px;
            text-align: left;
            color: orange;
            margin-top: 2px;
          }
          .input {
            display: flex;
            flex-direction: column;
            align-items: start;
            width: 100%;
            @media (max-width: 700px) {
              border-bottom: 1px solid #cdfdf3;
            }
          }
          label {
            font-size: 14px;
            font-weight: 400;
            line-height: 16.94px;
            text-align: left;
            color: white;
            font-family: "Inter" !important;
          }
          .inputElement {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 100%;
          }
          input {
            padding: 19px 0 19px 12px;
            color: #cdfdf3;
            background-color: transparent;
            border: none;
            width: 100%;
            border-bottom: 1px solid #cdfdf3;
            outline: none;
            box-shadow: none;
            font-family: "Inter" !important;
            &::placeholder {
              color: #cdfdf3;
            }
            @media (max-width: 700px) {
              border: none;
            }
          }
        }
        button {
          background: #0dc6de;
          color: #023d6a;
          padding: 12px 24px;
          border: none;
          border-radius: 28px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 700;
          line-height: 19.36px;
          text-align: center;
          max-width: 114px;
          font-family: "Inter" !important;
          &:hover {
            background: #0bb5c9;
          }
          @media (max-width: 700px) {
            width: 100%;
            max-width: 100%;
          }
        }
        .forgotten-password {
          font-family: "Inter" !important;
          font-size: 12px;
          font-style: italic;
          font-weight: 200;
          line-height: 14.52px;
          text-align: center;
          color: #cdfdf3;
          align-self: flex-start;
          margin-top: -5px;
        }
      }
    }
    .image-section {
      display: flex;
      gap: 20px;
      width: 40%;
      justify-content: start;
      align-items: center;
      position: relative;
      overflow-x: auto;
      scrollbar-width: thin;
      height: inherit;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      @media (max-width: 1020px) {
        width: 100%;
        height: auto;
        justify-content: center;
      }
      @media (max-width: 700px) {
        justify-content: flex-start;
      }
      img {
        position: relative;
        border-radius: 51px;
        object-fit: cover;
        transition: transform 0.6s ease-in-out, max-width 0.6s ease-in-out;
        flex-shrink: 0;
        height: 100%;
        max-height: 555px;
        max-width: 128px;
        width: 100%;
        @media (max-width: 1020px) {
          position: relative;
          height: 555px;
        }
        &.expand {
          max-width: 50%;
          @media (max-width: 1020px) {
            max-width: 316px;
          }
        }
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  footer {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding: 0 2% 10px 2%;
    justify-self: flex-end;
    @media (max-width: 1020px) {
      gap: 16px;
      overflow: hidden;
      padding-bottom: 24px;
    }
    .brands {
      display: flex;
      width: auto;
      flex-direction: row;
      gap: 33px;
      align-self: flex-end;
      overflow-x: auto;
      padding-bottom: 10px;
      scrollbar-width: thin;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      @media (max-width: 1020px) {
        align-self: flex-start;
        gap: 30px;
      }
      @media (max-width: 700px) {
        width: 100%;
      }
      img {
        max-height: 47px;
        flex-shrink: 0;
        z-index: 3;
        @media (max-width: 1020px) {
          max-height: 37px;
        }
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .poweredby {
      @media (max-width: 1020px) {
        order: -1;
      }
      p {
        font-size: 10px;
        font-weight: 400;
        line-height: 12.1px;
        text-align: left;
        color: white;
        font-family: "Inter" !important;
        a {
          font-size: 10px;
          font-weight: 400;
          line-height: 12.1px;
          text-align: left;
          text-decoration: none;
          color: white;
        }
      }
    }
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(112.76deg, #761d74 0.53%, #0dc6de 100%);
    opacity: 0.3;
    z-index: -1;
  }
}
</style>
