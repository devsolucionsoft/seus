  <template>
    <SsHeader></SsHeader>
    <section>
      <div class="title">
        EMPRESAS
      </div>
      <div class="content">
        <div class="startCarrer">
          <div class="title">
            <h2>EMPIEZA TU CARRERA HOY MISMO</h2>
            <div class="lineTitle"></div>
          </div>

          <form @submit.prevent="validateForm" novalidate>
            <div class="element">
              <div class="input-wrapper">
                <img src="@/assets/icons/person.svg" alt="Person Icon" class="input-icon">
                <input type="text" id="names" v-model="names" required placeholder="Razón social">
              </div>
              <span v-if="namesError" class="error-message">{{ namesError }}</span>
            </div>
            <div class="element">
              <div class="input-wrapper">
                <img src="@/assets/icons/person.svg" alt="Person Icon" class="input-icon">
                <input type="text" id="commercialName" v-model="commercialName" required placeholder="Nombre comercial">
              </div>
              <span v-if="commercialNameError" class="error-message">{{ commercialNameError }}</span>
            </div>
            <div class="element">
              <div class="input-wrapper">
                <img src="@/assets/icons/at.svg" alt="Arroba Icon" class="input-icon">
                <input type="email" id="email" v-model="email" required placeholder="Escribe un email">
              </div>
              <span v-if="emailError" class="error-message">{{ emailError }}</span>
            </div>
            <div class="element document-row">
              <div class="select-wrapper">
                <div class="contentElement">
                  <select id="documentType" v-model="documentType" required>
                    <option value="" disabled selected>Tipo de Documento</option>
                    <option value="NIT">NIT</option>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="CE">Cédula de Extranjería</option>
                  </select>
                  <div class="custom-arrow">
                    <img src="@/assets/icons/down-arrow.svg" alt="Custom Arrow">
                  </div>
                </div>
                <span v-if="documentTypeError" class="error-message">{{ documentTypeError }}</span>
              </div>
              <div class="input-wrapper">
                <img src="@/assets/icons/fingerprint.svg" alt="ID Card Icon" class="input-icon">
                <input type="text" id="documentNumber" v-model="documentNumber" required placeholder="Número de Documento">
                <span v-if="documentNumberError" class="error-message">{{ documentNumberError }}</span>
              </div>
            </div>
            <div class="element">
              <div class="input-wrapper">
                <img src="@/assets/icons/lock.svg" alt="Lock Icon" class="input-icon">
                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required @input="checkPasswordStrength" placeholder="Contraseña">
                <img @click="togglePasswordVisibility('showPassword')" style="cursor: pointer;" src="@/assets/icons/hidden-eye.svg" alt="Eye Icon" class="eye-icon">
              </div>
              <div class="password-strength-bar">
                <div class="strength-bar weak hide"></div>
                <div class="strength-bar moderate hide"></div>
                <div class="strength-bar strong hide"></div>
                <div class="strength-bar very-strong hide"></div>
              </div>
              <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
            </div>
            <div class="element">
              <div class="input-wrapper">
                <img src="@/assets/icons/lock.svg" alt="Lock Icon" class="input-icon">
                <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword" required placeholder="Confirmar contraseña">
                <img @click="togglePasswordVisibility('showConfirmPassword')" style="cursor: pointer;" src="@/assets/icons/hidden-eye.svg" alt="Eye Icon" class="eye-icon">
              </div>
              <span v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</span>
            </div>
            <div class="element">
              <label class="checkbox-label">
                <input type="checkbox" v-model="acceptTerms" required>
                <div class="custom-checkmark">
                  <img src="@/assets/icons/custom-checkmark.svg" alt="Custom Checkmark">
                </div>
                <p>Acepto <a @click="showTermsModal">Política de Tratamiento de Datos</a></p>
              </label>
              <span v-if="acceptTermsError" class="error-message">{{ acceptTermsError }}</span>
            </div>
            <button type="submit">Registrarme</button>
          </form>

          <div v-if="termsModalVisible" class="modal">
            <div class="modal-content">
              <div class="modal-header">
                <img src="@/assets/logo.png" alt="SEUS Talent Logo" class="logo">
                <span class="close" @click="hideTermsModal">&times;</span>
              </div>
              <div class="content">
                <h5>Términos y Condiciones</h5>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. <br><br>

                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. <br><br>
                  
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
                <button @click="acceptTermsAndCloseModal">Acepto términos y condiciones</button>
              </div>
            </div>
          </div>
        </div>
        <SsOpportunityMarket/>
      </div>
    </section>
    <SsFooter></SsFooter>
  </template>


<script>
  import SsHeader from '@/components/ss-header/SsHeader.vue';
  import SsFooter from '@/components/ss-footer/SsFooter.vue';
  import SsOpportunityMarket from '@/components/ss-opportunityMarket/SsOpportunityMarket.vue';

  export default {
    name: 'Companies',
    components: {
      SsHeader,
      SsFooter,
      SsOpportunityMarket,
    },
    data() {
      return {
        names: '',
        commercialName: '',
        email: '',
        documentType: '',
        documentNumber: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        showPassword: false,
        showConfirmPassword: false,
        namesError: '',
        commercialNameError: '',
        emailError: '',
        documentTypeError: '',
        documentNumberError: '',
        passwordError: '',
        confirmPasswordError: '',
        acceptTermsError: '',
        termsModalVisible: false,
        passwordStrengthMessage: '',
        passwordStrengthClass: ''
      };
    },
    methods: {
      validateForm() {
        this.resetErrors();

        let isValid = true;

        if (!this.names) {
          this.namesError = 'La razón social es requerida';
          isValid = false;
        }

        if (!this.commercialName) {
          this.commercialNameError = 'El nombre comercial es requeridos';
          isValid = false;
        }

        if (!this.email) {
          this.emailError = 'El correo electrónico es requerido';
          isValid = false;
        } else if (!this.isValidEmail(this.email)) {
          this.emailError = 'El correo electrónico no es válido';
          isValid = false;
        }

        if (!this.documentType) {
          this.documentTypeError = 'El tipo de documento es requerido';
          isValid = false;
        }

        if (!this.documentNumber) {
          this.documentNumberError = 'El número de documento es requerido';
          isValid = false;
        }

        if (!this.password) {
          this.passwordError = 'La contraseña es requerida';
          isValid = false;
        } else if (this.password.length < 6) {
          this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
          isValid = false;
        }

        if (!this.confirmPassword) {
          this.confirmPasswordError = 'La confirmación de la contraseña es requerida';
          isValid = false;
        } else if (this.password !== this.confirmPassword) {
          this.confirmPasswordError = 'Las contraseñas no coinciden';
          isValid = false;
        }

        if (!this.acceptTerms) {
          this.acceptTermsError = 'Debes aceptar la política de tratamiento de datos';
          isValid = false;
        }

        if (isValid) {
          this.submitForm();
        }
      },
      isValidEmail(email) {
        const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\\[\]\\.,;:\s@"]+\.)+[^<>()\\[\]\\.,;:\s@"]{2,})$/i;
        return re.test(email);
      },
      checkPasswordStrength() {
        const strength = this.calculatePasswordStrength(this.password);
        this.passwordStrengthMessage = strength.message;

        this.$nextTick(() => {
          const bars = document.querySelectorAll('.strength-bar');
          bars.forEach((bar, index) => {
            if (index <= strength.level) {
              bar.classList.remove('hide');
            } else {
              bar.classList.add('hide');
            }
          });
        });
      },
      calculatePasswordStrength(password) {
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
      },
      togglePasswordVisibility(field) {
        this[field] = !this[field];
      },
      resetErrors() {
        this.namesError = '';
        this.comercialNameError = '';
        this.emailError = '';
        this.documentTypeError = '';
        this.documentNumberError = '';
        this.passwordError = '';
        this.confirmPasswordError = '';
        this.acceptTermsError = '';
      },
      submitForm() {
        // Código para enviar el formulario
      },
      acceptTermsAndCloseModal() {
        this.acceptTerms = true; // Marca el checkbox
        this.hideTermsModal(); // Cierra el modal
      },
      showTermsModal() {
        this.termsModalVisible = true;
        document.body.classList.add('modal-open');
      },
      hideTermsModal() {
        this.termsModalVisible = false;
        document.body.classList.remove('modal-open');
      }
    },
    watch: {
      names(value) {
        if (value) this.namesError = '';
      },
      commercialName(value) {
        if (value) this.commercialNameError = '';
      },
      email(value) {
        if (value && this.isValidEmail(value)) this.emailError = '';
      },
      documentType(value) {
        if (value) this.documentTypeError = '';
      },
      documentNumber(value) {
        if (value) this.documentNumberError = '';
      },
      password(value) {
        if (value && value.length >= 6) this.passwordError = '';
      },
      confirmPassword(value) {
        if (value && value === this.password) this.confirmPasswordError = '';
      },
      acceptTerms(value) {
        if (value) this.acceptTermsError = '';
      }
    }
  };
</script>

<style scoped>
    section{
      position: relative;
      background-position: center;
      background-size: cover;
      padding-top: 77px;
      min-height: 100vh;
    }
    
    section > .title{
      font-size: 66px;
      font-weight: 700;
      line-height: 80.45px;
      text-align: left;
      color: #023D6A;
      padding: 0 0 24px 196px;
      border-bottom: 24px solid #601565;
      width: calc(100% - 120px)
    }

    section .content{
      display: flex;
      flex-direction: row;
      gap: 72px;
      padding: 0 96px 0 140px;
      max-height: 200vh;
      background-image: url('../../assets/images/bgLogin.jpeg');
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
      margin-top: -48px;
      justify-content: space-between
    }

    section .content .startCarrer{
      margin: 0;
      width: 100%;
      padding: 118px 0;
      border-radius: 0.5rem;
      max-width: 800px;
      display: flex;
      flex-direction: column;
      gap: 52px
    }

    section .content .startCarrer .title{
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    section .content .startCarrer .title h2{
      font-size: 38px;
      font-weight: 600;
      line-height: 46.32px;
      letter-spacing: -0.02em;
      text-align: left;
      color: #023D6A;
      margin: 0;
      max-width: 434px;
    }

    section .content .startCarrer .title .lineTitle{
      max-width: 64px;
      width: 100%;
      border-radius: 7px;
      height: 8px;
      background-color: #761D74;
      border: none;
    }

    section .content .startCarrer form{
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    section .content .startCarrer form .element .checkbox-label{
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      justify-content: start;
      gap: 18px;
    }

    section .content .startCarrer form .element .checkbox-label input{
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
      padding: 0
    }

    .checkbox-label input[type="checkbox"]:checked {
      background-color: #270538;
      border: 2px solid #270538;
    }

    .checkbox-label .custom-checkmark {
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
    }

    .checkbox-label input[type="checkbox"]:checked + .custom-checkmark {
      opacity: 1;
    }

    .checkbox-label .custom-checkmark img {
      width: 16px;
      height: 16px; 
    }

    section .content .startCarrer form .element .checkbox-label p{
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      text-align: left;
      color: #33363F;
    }
    section .content .startCarrer form .element .checkbox-label p a{
      font-size: 14px;
      font-weight: 600;
      line-height: 18px;
      text-align: left;
      color: #4A0E54;
      cursor: pointer;
    }

    section .content .startCarrer form .element .input-wrapper{
      position: relative;
      height: fit-content;
      max-height: 47px;
    }

    section .content .startCarrer form .element .input-wrapper .input-icon{
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
    }

    section .content .startCarrer form .element .input-wrapper .eye-icon{
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
    }

    section .content .startCarrer form .element input, section .content .startCarrer form .element select {
      width: 100%;
      padding: 0.5rem;
      background-color: #F2F2F2;
      border: 1px solid #E6E6E6;
      border-radius: 6px;
    }

    section .content .startCarrer form .element input{
      padding: 15px 0px 15px 44px;
      width: 100%;
    }

    section .content .startCarrer form .element select{
      padding: 15px 0px 15px 16px;
      color: #A8A8A8;
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
    }

    section .content .startCarrer form .element input::placeholder{
      color: #A8A8A8;
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
    }

    section .content .startCarrer form .element .select-wrapper{
      position: relative;
    }

    section .content .startCarrer form .element .select-wrapper select{
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none; 
      width: 100%;
      padding: 13px 0px 13px 16px;
      color: #A8A8A8;
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      text-align: left;
      background-color: #F2F2F2;
      border: 1px solid #E6E6E6;
      border-radius: 6px;
      max-height: 47px;
    }

    section .content .startCarrer form .element .select-wrapper .custom-arrow{
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
      pointer-events: none;
    }

    section .content .startCarrer form .element .select-wrapper .custom-arrow img{
      width: 20px;
      height: 20px;
    }

    section .content .startCarrer form button {
      background-color: #761D74;
      color: #F8D2EA;
      font-size: 14px;
      font-weight: 600;
      line-height: 17.07px;
      text-align: center;
      padding: 10px 24px;
      border-radius: 28px;
      border: none;
      max-width: 179px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0d243d;
    }

    .error-message {
      color: #d9534f;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    section .content .startCarrer form .document-row {
      display: flex;
      gap: 16px;
    }
    
    section .content .startCarrer form .password-strength-bar {
      width: 100%;
      height: 2px;
      border-radius: 4px;
      margin-top: 4px;
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
    
    section .content .startCarrer form .strength-bar {
      flex: 1;
      height: 100%;
      transition: background-color 0.3s;
    }
    
    section .content .startCarrer form .weak {
      background-color: #d9534f;
    }
    
    section .content .startCarrer form .moderate {
      background-color: #f0ad4e;
    }
    
    section .content .startCarrer form .strong {
      background-color: #5bc0de;
    }
    
    section .content .startCarrer form .very-strong {
      background-color: #5cb85c;
    }

    .weak.hide {
      background-color: #e6e6e6 !important;
    }

    .moderate.hide {
      background-color: #e6e6e6 !important;
    }

    .strong.hide {
      background-color: #e6e6e6 !important;
    }

    .very-strong.hide {
      background-color: #e6e6e6 !important;
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
    }

    .modal-content {
      background-color: #fff;
      border-radius: 12px;
      width: 100%;
      max-width: 443px;
      display: flex;
      flex-direction: column;
      gap: 0;
      max-height: 694px;
    }

    .modal-content .modal-header{
      background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 22px 30px;
      align-items: center;
      border-radius: 12px 12px 0 0;
    }

    .modal-content .modal-header img{
      max-width: 147px;
      width: 100%;
    }

    .modal-content .modal-header .close {
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

    .modal-content .content{
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: center;
      justify-content: center;
      padding: 34px 40px;
      overflow-y: auto;
      height: 100%;
      border-radius:  0 0 12px 12px;
      margin-top: 0;
    }
    
    .modal-content .content h5{
      font-size: 22px;
      font-weight: 600;
      line-height: 26.82px;
      letter-spacing: -0.02em;
      text-align: center;
      color: #023D6A;
      margin: 0;
    }

    .modal-content .content p{
      font-size: 12px;
      font-weight: 400;
      line-height: 14.63px;
      letter-spacing: -0.02em;
      text-align: left;
      color: black;
      margin: 0;
    }

    .modal-content .content button{
      max-width: 303px;
      padding: 12px 24px;
      border-radius: 28px;
      border: none;
      background-color: #0DC6DE;
      color: #CDFDF3;
      font-size: 16px;
      font-weight: 600;
      line-height: 19.5px;
      text-align: center;
      justify-content: space-between;
      cursor: pointer;
    }

    section .content .startCarrer form .document-row {
      display: flex;
      gap: 32px;
    }
    
    section .content .startCarrer form .document-row .select-wrapper,
    section .content .startCarrer form .document-row .input-wrapper {
      flex: 1;
    }

    .contentElement{
      max-height: 47px;
      position: relative;
    }

    
    @media(max-width: 1394px){
      section .content{
          padding: 0 50px;
      }
    }

    @media(max-width: 1267px){
      section .content{
        flex-direction: column;
        align-items: center;
        max-height: none;
        gap: 0;
        margin-top: 0px;
      }
      
      section .content .startCarrer{
        border-bottom: 1px solid #023D6A;
        border-radius: 0;
        max-width: none;
        padding: 24px 0;
      }

      section > .title{
        padding: 0 0 0 50px
      }
    }
    @media(max-width: 700px){
      section{
        padding: 10px 16px 0 16px;
      }
      section > .title{
        font-size: 56px;
        max-width: none;
        width: 100%;
        text-align: center;
        padding: 0
      }
      section .content{
        padding: 0;
      }
      section .content .startCarrer form button{
        max-width: 100%;
        width: 100%;
      }
      section .content .startCarrer form .document-row{
        flex-direction: column;
        gap: 24px;
      }
      section .content .startCarrer form .element .input-wrapper{
        max-height: none;
      }  
      section .content .startCarrer form .element input{
        max-height: 47px;
      }
      section .content .startCarrer form .document-row .input-wrapper img{
        top: 45% !important;
      }
      .modal-content .content{
        padding: 16px;
      }
      .modal-content{
        max-height: 100%;
        height: 100%;
      }
    }
    .modal-open {
      overflow: hidden;
    }
  </style>