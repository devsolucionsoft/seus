<template>
    <div class="page-container">
        <div class="container">
            <img src="@/assets/logo.png" alt="SEUS Talent Logo" class="logo">
            <div class="figure">
                <div class="title">
                    <h1>Reestablecer contraseña</h1>
                    <div class="lineTitle"></div>
                </div>

                <form class="form" @submit.prevent="handleSubmit" novalidate>
                    <div class="step step1" v-if="step === 1">
                        <label for="email">Ingresa tu dirección de correo, te enviaremos un enlace para restablecer tu contraseña de forma segura.</label>
                        <div class="element">
                            <div class="input-wrapper">
                                <img src="@/assets/icons/at.svg" alt="Arroba Icon" class="input-icon">
                                <input type="email" id="email" v-model="email" required placeholder="Escribe un email">
                            </div>
                            <span v-if="emailError" class="error-message">{{ emailError }}</span>
                        </div>
                        <button type="submit">Enviar instrucciones</button>
                    </div>
            
                    <!-- Paso 2: Cambiar contraseña -->
                    <div class="step step2" v-if="step === 2">
                        <label for="password">Por favor elige una nueva contraseña</label>
                        <div class="element">
                            <div class="password-strength">
                                <div class="input-wrapper">
                                    <img src="@/assets/icons/lock.svg" alt="Lock Icon" class="input-icon"/>
                                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required @input="checkPasswordStrength" placeholder="Nueva contraseña"/>
                                    <img @click="togglePasswordVisibility('showPassword')" style="cursor: pointer;" src="@/assets/icons/hidden-eye.svg" alt="Eye Icon" class="eye-icon"/>
                                </div>
                                <div class="password-strength-bar">
                                    <div class="strength-bar weak hide"></div>
                                    <div class="strength-bar moderate hide"></div>
                                    <div class="strength-bar strong hide"></div>
                                    <div class="strength-bar very-strong hide"></div>
                                </div>
                            </div>
                            <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
                        </div>
                        <div class="element">
                            <div class="input-wrapper">
                                <img src="@/assets/icons/lock.svg" alt="Lock Icon" class="input-icon">
                                <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword" required placeholder="Confirmar nueva contraseña">
                                <img @click="togglePasswordVisibility('showConfirmPassword')" style="cursor: pointer;" src="@/assets/icons/hidden-eye.svg" alt="Eye Icon" class="eye-icon">
                            </div>
                            <span v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</span>
                        </div>
                        <button type="submit">Guardar nueva contraseña</button>
                    </div>
                </form>
            </div>
        </div>
        <footer>
            <div class="brands">
                <img src="@/assets/brands/cocacola.png" alt="Coca Cola">
                <img src="@/assets/brands/bancolombia.png" alt="Bancolombia">
                <img src="@/assets/brands/nutresa.png" alt="Nutresa">
                <img src="@/assets/brands/velez.png" alt="Velez">
                <img src="@/assets/brands/cocacola.png" alt="Coca Cola">
                <img src="@/assets/brands/bancolombia.png" alt="Bancolombia">
                <img src="@/assets/brands/nutresa.png" alt="Nutresa">
                <img src="@/assets/brands/velez.png" alt="Velez">
            </div>
            <div class="poweredby">
                <p>Powered by <a target="_blank" href="https://solucionsoft.com">SolucionSoft.com</a></p>
            </div>
        </footer>
    </div>
</template>
  
<script>
  export default {
    name: 'forgottenPassword',
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        step: 1,
        errorMessage: '',
        showPassword: false,
        showConfirmPassword: false,
        passwordError: '',
        confirmPasswordError: '',
        emailError: '',
        passwordStrengthMessage: '',
        passwordStrengthClass: '',
        isStep2Submitted: false,
      };
    },
    methods: {
        handleSubmit() {
            if (this.step === 1) {
                this.validateStep1();
            } else if (this.step === 2) {
                this.validateStep2();
            }
        },
        validateStep1() {
            this.resetErrors();
            if (!this.email) {
                this.emailError = 'El correo electrónico es requerido';
            } else if (!this.isValidEmail(this.email)) {
                this.emailError = 'El correo electrónico no es válido';
            } else {
                // Si no hay errores, avanzar al siguiente paso
                this.step = 2;
            }
        },
        validateStep2() {
            this.resetErrors();
            this.isStep2Submitted = true;

            if (!this.password) {
                this.passwordError = 'La contraseña es requerida';
            } else if (this.password.length < 6) {
                this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
            }

            if (!this.confirmPassword) {
                this.confirmPasswordError = 'La confirmación de la contraseña es requerida';
            } else if (this.password !== this.confirmPassword) {
                this.confirmPasswordError = 'Las contraseñas no coinciden';
            }

            if (!this.passwordError && !this.confirmPasswordError) {
                // Aquí puedes enviar el formulario si es válido
                this.submitForm();
            }
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
            this.emailError = '';
            this.passwordError = '';
            this.confirmPasswordError = '';
        },
        submitForm() {
            this.$router.push({ name: 'signIn' });
        },
        isValidEmail(email) {
            const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\\[\]\\.,;:\s@"]+\.)+[^<>()\\[\]\\.,;:\s@"]{2,})$/i;
            return re.test(email);
        },
    },
    watch: {
        email(value) {
            if (value && this.isValidEmail(value)) this.emailError = '';
        },
        password(value) {
            if (value && value.length >= 6) this.passwordError = '';
        },
        confirmPassword(value) {
            if (value && value === this.password) this.confirmPasswordError = '';
        },
    },
  }
</script>

<style scoped lang="scss">
    .page-container {
        background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%);
        height: 100vh;
        margin: 0;
        padding: 0;
        font-family: 'Inter' !important;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .container{
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 73px;
            @media(max-width: 700px){
                gap: 0;
            }
            .logo{
                max-width: 192px;
                @media(max-width: 700px){
                    max-width: 147px;
                    padding: 38px 16px 22px 16px;
                }
            }
            .figure{
                padding: 88px 40px 50px 40px;
                background-color: white;
                border-radius: 20px;
                gap: 53px;
                display: flex;
                flex-direction: column;
                max-width: 641px;
                
                @media(max-width: 700px){
                    border-radius: 0;
                    max-width: 100%;
                }

                .title{
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    h1{
                        font-size: 38px;
                        font-weight: 600;
                        line-height: 46.32px;
                        letter-spacing: -0.02em;
                        text-align: left;
                        color: #023D6A;
                        text-transform: uppercase;
                    }
                    .lineTitle{
                        max-width: 64px;
                        width: 100%;
                        border-radius: 7px;
                        height: 8px;
                        background-color: #761D74;
                        border: none;
                    }
                }
                .form{
                    .step{
                        display: flex;
                        flex-direction: column;
                        gap: 24px;
                        label{
                            font-size: 14px;
                            font-weight: 300;
                            line-height: 17.07px;
                            text-align: left;
                            color: black;
                        }
                        .element{
                            display: flex;
                            flex-direction: column;
                            gap: 8px;
                            .input-wrapper{
                                position: relative;
                                height: fit-content;
                                max-height: 47px;
                                .input-icon{
                                    position: absolute;
                                    top: 50%;
                                    left: 10px;
                                    transform: translateY(-50%);
                                    width: 20px;
                                    height: 20px;
                                }
                                .eye-icon{
                                    position: absolute;
                                    top: 50%;
                                    right: 10px;
                                    transform: translateY(-50%);
                                    width: 20px;
                                    height: 20px;
                                }
                                input{
                                    width: 100%;
                                    background-color: #F2F2F2;
                                    border: 1px solid #E6E6E6;
                                    border-radius: 6px;
                                    padding: 15px 0px 15px 44px;
                                    width: 100%;
                                    &::placeholder{
                                        color: #A8A8A8;
                                        font-size: 14px;
                                        font-weight: 400;
                                        line-height: 24px;
                                        text-align: left;
                                    }
                                }
                            }
                            .password-strength{
                                display: flex;
                                flex-direction: column;
                                gap: 8px;
                                .password-strength-bar{
                                    width: 100%;
                                    height: 2px;
                                    border-radius: 4px;
                                    margin-top: 4px;
                                    display: flex;
                                    flex-direction: row;
                                    gap: 8px;
                                    .strength-bar{
                                        flex: 1;
                                        height: 100%;
                                        transition: background-color 0.3s;
                                        &.weak{
                                            background-color: #d9534f;
                                        }
                                        &.moderate{
                                            background-color: #f0ad4e;
                                        }
                                        &.strong{
                                            background-color: #5bc0de;
                                        }
                                        &.very-strong{
                                            background-color: #5cb85c;
                                        }
                                        &.hide{
                                            background-color: #e6e6e6 !important;
                                        }

                                    }
                                }
                            }
                            .error-message {
                                color: #d9534f;
                                font-size: 0.875rem;
                                margin-top: 0.25rem;
                            }
                        }
                        button{
                            background-color: #761D74;
                            color: #F8D2EA;
                            font-size: 14px;
                            font-weight: 600;
                            line-height: 17.07px;
                            text-align: center;
                            padding: 10px 24px;
                            border-radius: 28px;
                            border: none;
                            cursor: pointer;
                            width: fit-content;
                        }
                    }
                }
                @media(max-width: 700px){
                    flex-grow: 1;
                }
            }
        }
        footer{
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: start;
            padding: 0 2% 10px 2%;
            @media(max-width: 1020px){
                gap: 16px;
                overflow: hidden;
                padding-bottom: 24px;
            }
            @media(max-width: 700px){
                background-color: white;
            }

            .brands{
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
                @media(max-width: 1020px){
                    align-self: flex-start;
                    gap: 30px;
                }
                @media(max-width: 700px){
                    width: 100%;
                }
                img{
                    max-height: 47px;
                    flex-shrink: 0;
                    z-index: 3;
                    @media(max-width: 1020px){
                        max-height: 37px;
                    }
                }
                &::-webkit-scrollbar{
                    display: none;
                }
            }
            .poweredby{
                @media(max-width: 1020px){
                    order: -1;
                }
                p{
                    font-size: 10px;
                    font-weight: 400;
                    line-height: 12.1px;
                    text-align: left;
                    color: white;
                    font-family: 'Inter' !important;
                    @media(max-width: 700px){
                        color: #A8A8A8;
                    }

                    a{
                        font-size: 10px;
                        font-weight: 400;
                        line-height: 12.1px;
                        text-align: left;
                        text-decoration: none;
                        color: white;
                        @media(max-width: 700px){
                            color: #A8A8A8;
                        }
                    }
                }
            }
        }
    }
</style>