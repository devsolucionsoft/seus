<template>
  <SsHeader></SsHeader>
  <section>
    <div class="title">PERSONAS</div>
    <div class="content">
      <div class="startCarrer">
        <div class="title">
          <h2>EMPIEZA TU CARRERA HOY MISMO</h2>
          <div class="lineTitle"></div>
        </div>

        <form ref="opportunityForm" @submit.prevent="validateForm" novalidate>
          <div class="element">
            <div class="input-wrapper">
              <img
                src="@/assets/icons/person.svg"
                alt="Person Icon"
                class="input-icon"
              />
              <input
                type="text"
                id="names"
                v-model="names"
                required
                placeholder="Nombres"
              />
            </div>
            <span v-if="namesError" class="error-message">{{
              namesError
            }}</span>
          </div>
          <div class="element">
            <div class="input-wrapper">
              <img
                src="@/assets/icons/person.svg"
                alt="Person Icon"
                class="input-icon"
              />
              <input
                type="text"
                id="lastNames"
                v-model="lastNames"
                required
                placeholder="Apellidos"
              />
            </div>
            <span v-if="lastNamesError" class="error-message">{{
              lastNamesError
            }}</span>
          </div>
          <div class="element">
            <div class="input-wrapper">
              <img
                src="@/assets/icons/at.svg"
                alt="Arroba Icon"
                class="input-icon"
              />
              <input
                type="email"
                id="email"
                v-model="email"
                required
                placeholder="Escribe un email"
              />
            </div>
            <span v-if="emailError" class="error-message">{{
              emailError
            }}</span>
          </div>
          <div class="element document-row">
            <div class="select-wrapper">
              <div class="contentElement">
                <select id="documentType" v-model="documentType" required>
                  <option value="" disabled>Tipo de Documento</option>
                  <option v-for="doc in typeDocuments" :key="doc.id" :value="doc.id">
                    {{ doc.type }}
                  </option>
                </select>
                <div class="custom-arrow">
                  <img src="@/assets/icons/down-arrow.svg" alt="Custom Arrow" />
                </div>
              </div>
              <span v-if="documentTypeError" class="error-message">{{
                documentTypeError
              }}</span>
            </div>
            <div class="input-wrapper">
              <img
                src="@/assets/icons/fingerprint.svg"
                alt="ID Card Icon"
                class="input-icon"
              />
              <input
                type="text"
                id="documentNumber"
                v-model="documentNumber"
                required
                placeholder="Número de Documento"
              />
              <span v-if="documentNumberError" class="error-message">{{
                documentNumberError
              }}</span>
            </div>
          </div>
          <div class="element">
            <div class="input-wrapper">
              <img
                src="@/assets/icons/lock.svg"
                alt="Lock Icon"
                class="input-icon"
              />
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                required
                @input="checkPasswordStrength"
                placeholder="Contraseña"
              />
              <img
                @click="togglePasswordVisibility('showPassword')"
                style="cursor: pointer"
                src="@/assets/icons/hidden-eye.svg"
                alt="Eye Icon"
                class="eye-icon"
              />
            </div>
            <div class="password-strength-bar">
              <div class="strength-bar weak hide"></div>
              <div class="strength-bar moderate hide"></div>
              <div class="strength-bar strong hide"></div>
              <div class="strength-bar very-strong hide"></div>
            </div>
            <span v-if="passwordError" class="error-message">{{
              passwordError
            }}</span>
          </div>
          <div class="element">
            <div class="input-wrapper">
              <img
                src="@/assets/icons/lock.svg"
                alt="Lock Icon"
                class="input-icon"
              />
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="confirmPassword"
                required
                placeholder="Confirmar contraseña"
              />
              <img
                @click="togglePasswordVisibility('showConfirmPassword')"
                style="cursor: pointer"
                src="@/assets/icons/hidden-eye.svg"
                alt="Eye Icon"
                class="eye-icon"
              />
            </div>
            <span v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</span>
          </div>
          <div class="element">
            <label class="checkbox-label">
              <input type="checkbox" v-model="acceptTerms" required />
              <div class="custom-checkmark">
                <img
                  src="@/assets/icons/custom-checkmark.svg"
                  alt="Custom Checkmark"
                />
              </div>
              <p>
                Acepto
                <a @click="showTermsModal">Política de Tratamiento de Datos</a>
              </p>
            </label>
            <span v-if="acceptTermsError" class="error-message">{{
              acceptTermsError
            }}</span>
          </div>
          <button type="submit">Registrarme</button>
        </form>

        <div v-if="termsModalVisible" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <img
                src="@/assets/logo.png"
                alt="SEUS Talent Logo"
                class="logo"
              />
              <span class="close" @click="hideTermsModal">&times;</span>
            </div>
            <div class="content">
              <h5>Términos y Condiciones</h5>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. <br /><br />

                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. <br /><br />

                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem.
              </p>
              <button @click="acceptTermsAndCloseModal">
                Acepto términos y condiciones
              </button>
            </div>
          </div>
        </div>
      </div>
      <SsOpportunityMarket @focus-form="focusForm" />
    </div>
  </section>
  <SsFooter></SsFooter>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SsHeader from '@/components/ss-header/SsHeader.vue';
import SsFooter from '@/components/ss-footer/SsFooter.vue';
import SsOpportunityMarket from '@/components/ss-opportunityMarket/SsOpportunityMarket.vue';
import { useTypeDocuments } from '@/services/globals/useTypeDocuments.js';
import { useCandidateService } from '@/services/candidate/useCandidateService.js';
import { ElMessage } from 'element-plus';

// Reactive form data
const names = ref('');
const lastNames = ref('');
const email = ref('');
const documentType = ref('');
const documentNumber = ref('');
const password = ref('');
const confirmPassword = ref('');
const acceptTerms = ref(false);


// Validation errors
const namesError = ref('');
const lastNamesError = ref('');
const emailError = ref('');
const documentTypeError = ref('');
const documentNumberError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const acceptTermsError = ref('');

//Terms Modal
const termsModalVisible = ref(false);

//Password Utils
const passwordStrengthMessage = ref('');
const passwordStrengthClass = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Router, TypeDocuments and CandidateService
const router = useRouter();
const typeDocuments = ref([]);
const candidateService = useCandidateService();

const listTypeDocuments = async () => {
  try {
    const response = await useTypeDocuments().listTypeDocuments();
    if (response && response.status === 200) {
      typeDocuments.value = response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

// Register logic
const registerCandidate = async () => {
  console.log(names.value, lastNames.value, email.value, documentType.value, documentNumber.value, password.value);
  try {
    const response = await candidateService.registerCandidate({
      name: names.value,
      last_name: lastNames.value,
      email: email.value,
      type_document_id: documentType.value,
      document_number: documentNumber.value,
      password: password.value
    });
    if (response && response.data.status_code === 201) {
      ElMessage.success(response.data.message);
      setTimeout(() => {
        router.push({ name: "signIn" });
      }, 3000);
    } else {
      ElMessage.error(response.data.message);
    }
  } catch (error) {
    ElMessage.error(error.response.data.message);
  }
};

const validateForm = async () => {
  resetErrors();
  let isValid = true;

  if (!names.value) {
    namesError.value = 'Los nombres son requeridos';
    isValid = false;
  }

  if (!lastNames.value) {
    lastNamesError.value = 'Los apellidos son requeridos';
    isValid = false;
  }

  if (!email.value) {
    emailError.value = 'El correo electrónico es requerido';
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    emailError.value = 'El correo electrónico no es válido';
    isValid = false;
  }

  if (!documentType.value) {
    documentTypeError.value = 'El tipo de documento es requerido';
    isValid = false;
  }

  if (!documentNumber.value) {
    documentNumberError.value = 'El número de documento es requerido';
    isValid = false;
  }

  if (!password.value) {
    passwordError.value = 'La contraseña es requerida';
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = 'La contraseña debe tener al menos 6 caracteres';
    isValid = false;
  }

  if (!confirmPassword.value) {
    confirmPasswordError.value = 'La confirmación de la contraseña es requerida';
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Las contraseñas no coinciden';
    isValid = false;
  }

  if (!acceptTerms.value) {
    acceptTermsError.value = 'Debes aceptar la política de tratamiento de datos';
    isValid = false;
  }

  if (isValid) {
    await registerCandidate();
  }
};

const isValidEmail = (email) => {
  const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\\[\]\\.,;:\s@"]+\.)+[^<>()\\[\]\\.,;:\s@"]{2,})$/i;
  return re.test(email);
};

const checkPasswordStrength = () => {
  const strength = calculatePasswordStrength(password.value);
  passwordStrengthMessage.value = strength.message;
  passwordStrengthClass.value = `strength-${strength.level}`;

  nextTick(() => {
    const bars = document.querySelectorAll('.strength-bar');
    bars.forEach((bar, index) => {
      if (index <= strength.level) {
        bar.classList.remove('hide');
      } else {
        bar.classList.add('hide');
      }
    });
  });
};

const calculatePasswordStrength = (password) => {
  let strength = { message: 'Contraseña muy débil', level: 0 };
  if (password.length >= 8) {
    strength = { message: 'Contraseña moderada', level: 1 };
    if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[\W_]/.test(password)) {
      strength = { message: 'Contraseña fuerte', level: 2 };
      if (password.length >= 12) {
        strength = { message: 'Contraseña muy fuerte', level: 3 };
      }
    }
  }
  return strength;
};

const togglePasswordVisibility = (field) => {
  if (field === 'showPassword') {
    showPassword.value = !showPassword.value;
  } else if (field === 'showConfirmPassword') {
    showConfirmPassword.value = !showConfirmPassword.value;
  }
};

const resetErrors = () => {
  namesError.value = '';
  lastNamesError.value = '';
  emailError.value = '';
  documentTypeError.value = '';
  documentNumberError.value = '';
  passwordError.value = '';
  confirmPasswordError.value = '';
  acceptTermsError.value = '';
};

const showTermsModal = () => {
  termsModalVisible.value = true;
  document.body.classList.add("modal-open");
};

const hideTermsModal = () => {
  termsModalVisible.value = false;
  document.body.classList.remove("modal-open");
};

const acceptTermsAndCloseModal = () => {
  acceptTerms.value = true;
  hideTermsModal();
};

const focusForm = () => {
  const form = this.$refs.opportunityForm;
  if (form) {
    form.scrollIntoView({ behavior: "smooth" });
    form.querySelector("input").focus(); // Focaliza el primer input del formulario
  }
};

watch(names, (newValue) => {
  if (newValue) {
    namesError.value = '';
  }
});

watch(lastNames, (newValue) => {
  if (newValue) {
    lastNamesError.value = '';
  }
});

watch(email, (newValue) => {
  if (newValue && isValidEmail(newValue)) {
    emailError.value = '';
  }
});

watch(documentType, (newValue) => {
  if (newValue) {
    documentTypeError.value = '';
  }
});

watch(documentNumber, (newValue) => {
  if (newValue) {
    documentNumberError.value = '';
  }
});

watch(password, (newValue) => {
  if (newValue && newValue.length >= 6) {
    passwordError.value = '';
  }
});

watch(confirmPassword, (newValue) => {
  if (newValue && newValue === password.value) {
    confirmPasswordError.value = '';
  }
});

watch(acceptTerms, (newValue) => {
  if (newValue) {
    acceptTermsError.value = '';
  }
});

onMounted(() => {
  listTypeDocuments();
});
</script>

<style scoped lang="scss">
section {
  position: relative;
  background-position: center;
  background-size: cover;
  padding-top: 77px;
  min-height: 100vh;
  @media (max-width: 700px){
    padding: 10px 16px 0 16px;
  }

  > .title{
    font-size: 66px;
    font-weight: 700;
    line-height: 80.45px;
    text-align: left;
    color: #023d6a;
    padding: 0 0 24px 196px;
    border-bottom: 24px solid #601565;
    width: calc(100% - 120px);
    max-width: 100%;
    overflow: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    @media (max-width: 1267px){
      padding: 0px;
    }
    @media (max-width: 700px){
      font-size: 56px;
      max-width: none;
      width: 100%;
      text-align: center;
      padding: 0;
    }
  }
  .content{
    display: flex;
    flex-direction: row;
    gap: 72px;
    padding: 0 96px 0 140px;
    max-height: 200vh;
    background-image: url("../../assets/images/bgLogin.jpeg");
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
    margin-top: -48px;
    justify-content: space-between;
    @media (max-width: 1394px) {
      padding: 0 50px;
    }
    @media (max-width: 1267px) {
      flex-direction: column;
      align-items: center;
      max-height: none;
      gap: 0;
      margin-top: 0px;
    }
    @media (max-width: 700px){
      padding: 0;
    }
    .startCarrer {
      margin: 0;
      width: 100%;
      padding: 118px 0;
      border-radius: 0.5rem;
      max-width: 800px;
      display: flex;
      flex-direction: column;
      gap: 52px;
      @media (max-width: 1267px){
        border-bottom: 1px solid #023d6a;
        border-radius: 0;
        padding-bottom: 24px;
        max-width: none;
        padding: 24px 0;
      }
      .title {
        display: flex;
        flex-direction: column;
        gap: 10px;
        h2 {
          font-size: 38px;
          font-weight: 600;
          line-height: 46.32px;
          letter-spacing: -0.02em;
          text-align: left;
          color: #023d6a;
          margin: 0;
          max-width: 434px;
        }
        .lineTitle {
          max-width: 64px;
          width: 100%;
          border-radius: 7px;
          height: 8px;
          background-color: #761d74;
          border: none;
        }
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 24px;
        .element{
          .error-message {
            color: #d9534f;
            font-size: 0.875rem;
            margin-top: 0.25rem;
          }
          .checkbox-label {
            display: flex;
            flex-direction: row;
            align-items: center;
            position: relative;
            justify-content: start;
            gap: 18px;
            input {
              width: 24px;
              height: 24px;
              appearance: none;
              background-color: #270538;
              border-radius: 7px;
              border: 2px solid #270538;
              cursor: pointer;
              position: relative;
              outline: none;
              margin: 0;
              padding: 0;
              &:checked + .custom-checkmark {
                opacity: 1;
              }
            }
            .custom-checkmark {
              opacity: 0;
              transition: opacity 0.2s ease;
            }
          }
          .custom-checkmark {
            position: absolute;
            left: 0;
            top: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            opacity: 0;
            img {
              width: 16px;
              height: 16px;
            }
          }
          p {
            font-size: 14px;
            font-weight: 400;
            line-height: 18px;
            text-align: left;
            color: #33363f;
            a {
              font-size: 14px;
              font-weight: 600;
              line-height: 18px;
              text-align: left;
              color: #4a0e54;
              cursor: pointer;
            }
          }
          .input-wrapper {
            position: relative;
            height: fit-content;
            max-height: 47px;
            .input-icon {
              position: absolute;
              top: 50%;
              left: 10px;
              transform: translateY(-50%);
              width: 20px;
              height: 20px;
            }
            .eye-icon {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              width: 20px;
              height: 20px;
            }
            img{
              @media (max-width: 700px){
                top: 45% !important;
              } 
            }
          }
          input{
            width: 100%;
            padding: 0.5rem;
            background-color: #f2f2f2;
            border: 1px solid #e6e6e6;
            border-radius: 6px;
            padding: 15px 0px 15px 44px;
            width: 100%;
            &::placeholder{
              color: #a8a8a8;
              font-size: 14px;
              font-weight: 400;
              line-height: 24px;
              text-align: left;
            }
            @media (max-width: 700px){
              max-height: 47px;
            } 
          }
          select {
            width: 100%;
            padding: 0.5rem;
            background-color: #f2f2f2;
            border: 1px solid #e6e6e6;
            border-radius: 6px;
            padding: 15px 0px 15px 16px;
            color: #a8a8a8;
            font-size: 14px;
            font-weight: 400;
            line-height: 24px;
            text-align: left;
          }
          .select-wrapper{
            position: relative;
            select {
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
              width: 100%;
              padding: 13px 0px 13px 16px;
              color: #a8a8a8;
              font-size: 14px;
              font-weight: 400;
              line-height: 24px;
              text-align: left;
              background-color: #f2f2f2;
              border: 1px solid #e6e6e6;
              border-radius: 6px;
              max-height: 47px;
            }
            .custom-arrow {
              position: absolute;
              top: 50%;
              right: 16px;
              transform: translateY(-50%);
              pointer-events: none;
              img {
                width: 20px;
                height: 20px;
              }
              
            }
          }
        }
        button {
          background-color: #761d74;
          color: #f8d2ea;
          font-size: 14px;
          font-weight: 600;
          line-height: 17.07px;
          text-align: center;
          padding: 10px 24px;
          border-radius: 28px;
          border: none;
          max-width: 179px;
          cursor: pointer;
          @media (max-width: 700px){
            max-width: 100%;
            width: 100%;
          }
          &:hover{
            background-color: #0d243d;
          }
        }
        .document-row {
          display: flex;
          gap: 32px;
          @media (max-width: 700px){
            flex-direction: column;
            gap: 24px;
          }
          .input-wrapper {
            flex: 1;
            @media (max-width: 700px){
              max-height: none;
            }
          }
          .select-wrapper {
            flex: 1;
            .contentElement {
              max-height: 47px;
              position: relative;
            }
          }
        }
        .password-strength-bar {
          width: 100%;
          height: 2px;
          border-radius: 4px;
          margin-top: 4px;
          display: flex;
          flex-direction: row;
          gap: 8px;
        }
        .strength-bar {
          flex: 1;
          height: 100%;
          transition: background-color 0.3s;
          &.weak{
            background-color: #d9534f;
          }
          &.moderate {
            background-color: #f0ad4e;
          }
          &.strong {
            background-color: #5bc0de;
          }
          &.very-strong {
            background-color: #5cb85c;
          }
          &.hide{
            background-color: #e6e6e6 !important;
          }
        }
      }
      .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 11;
        .modal-content {
          background-color: #fff;
          border-radius: 12px;
          width: 100%;
          max-width: 443px;
          display: flex;
          flex-direction: column;
          gap: 0;
          max-height: 694px;
          @media (max-width: 700px){
            max-height: 100%;
            height: 100%;
          } 
          .modal-header {
            background: linear-gradient(112.76deg, #761d74 0.53%, #0dc6de 100%);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 22px 30px;
            align-items: center;
            border-radius: 12px 12px 0 0;
            img {
              max-width: 147px;
              width: 100%;
            }
            .close {
              cursor: pointer;
              color: white;
              border-radius: 50%;
              width: 18px;
              height: 18px;
              border: 1px solid white;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          
          .content {
            display: flex;
            flex-direction: column;
            gap: 12px;
            align-items: center;
            justify-content: center;
            padding: 34px 40px;
            overflow-y: auto;
            height: 100%;
            border-radius: 0 0 12px 12px;
            margin-top: 0;
            @media (max-width: 700px){
              padding: 16px;
            } 
            h5 {
              font-size: 22px;
              font-weight: 600;
              line-height: 26.82px;
              letter-spacing: -0.02em;
              text-align: center;
              color: #023d6a;
              margin: 0;
            }
            p {
              font-size: 12px;
              font-weight: 400;
              line-height: 14.63px;
              letter-spacing: -0.02em;
              text-align: left;
              color: black;
              margin: 0;
            }
            button {
              max-width: 303px;
              padding: 12px 24px;
              border-radius: 28px;
              border: none;
              background-color: #0dc6de;
              color: #cdfdf3;
              font-size: 16px;
              font-weight: 600;
              line-height: 19.5px;
              text-align: center;
              justify-content: space-between;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
