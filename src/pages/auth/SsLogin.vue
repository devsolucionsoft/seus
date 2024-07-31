<template>
    <div class="page-container">
        <nav>
            <router-link to="/companies" class="element">
                <img src="@/assets/icons/company.svg" alt="Companies Icon">Empresas
            </router-link>

            <router-link to="/persons" class="element">
                <img src="@/assets/icons/persons.svg" alt="Persons Icon">Personas
            </router-link>
        </nav>
        <div class="content">
            <div class="form-section">
                <img src="@/assets/logo.png" alt="SEUS Talent Logo" class="logo">
                <form  @submit.prevent="validateForm" novalidate>
                    <div class="element">
                        <label for="email">Usuario</label>
                        <div class="inputElement">
                            <input type="email" id="email" required v-model="email" placeholder="Ingresa un correo electrónico">
                            <img src="@/assets/icons/mail.svg" alt="Mail Icon">
                        </div>
                        <span v-if="emailError" class="error-message">{{ emailError }}</span>
                    </div>
                    <div class="element">
                        <label for="password">Contraseña</label>
                        <div class="inputElement">
                            <input :type="showPassword ? 'text' : 'password'" id="password" required v-model="password" placeholder="Ingresa tu contraseña">
                            <img @click="togglePasswordVisibility" style="cursor: pointer;" src="@/assets/icons/eye.svg" alt="Eye Icon">
                        </div>
                        <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
                    </div>   
                    <button type="submit">Ingresar</button>
                </form>
            </div>
            <div class="image-section">
                <img v-for="(image, index) in images" :key="index" :src="image.src" 
                     :class="{'expand': expandedIndex === index}" 
                     @mouseover="expandImage(index)" 
                     @mouseout="resetExpand">
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
import speakerImg from '@/assets/images/speaker.jpeg';
import cityImg from '@/assets/images/city.jpeg';
import micImg from '@/assets/images/mic.jpeg';

export default {
    data() {
        return {
            email: '',
            password: '',
            showPassword: false,
            emailError: '',
            passwordError: '',
            images: [
                { src: speakerImg },
                { src: cityImg },
                { src: micImg }
            ],
            expandedIndex: 0
        }
    },
    watch: {
        email(value) {
            this.emailError = '';
            if (value && !this.isValidEmail(value)) {
                this.emailError = 'El correo electrónico no es válido';
            }
        },
        password(value) {
            this.passwordError = '';
            if (value && value.length < 6) {
                this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
            }
        }
    },
    methods: {
        expandImage(index) {
            this.expandedIndex = index;
        },
        resetExpand() {
            this.expandedIndex = 0;
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        validateForm() {
            this.emailError = '';
            this.passwordError = '';
            let isValid = true;

            if (!this.email) {
                this.emailError = 'El correo electrónico es requerido';
                isValid = false;
            } else if (!this.isValidEmail(this.email)) {
                this.emailError = 'El correo electrónico no es válido';
                isValid = false;
            }

            if (!this.password) {
                this.passwordError = 'La contraseña es requerida';
                isValid = false;
            } else if (this.password.length < 6) {
                this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
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
        submitForm() {
            console.log('Formulario enviado:', {
                email: this.email,
                password: this.password
            });
        }
    }
}
</script>

<style scoped>
    .page-container {
        background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%);
        
        min-height: 100vh;
        margin: 0;
        padding: 0;
    }
    .page-container nav{
        display: flex;
        flex-direction: row;
        padding: 42px 38px 21px 0;
        margin-right: 15%;
        justify-content: end;
        align-items: center;
        border-bottom: 1px solid white;
        gap: 42px;
    }
    .page-container nav .element{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 19px;
        color: #CDFDF3;
        text-decoration: none;
    }
    .page-container .content .form-section form .element span{
        font-size: 12px;
        font-weight: 400;
        line-height: 16.94px;
        text-align: left;
        color: orange;
        margin-top: 2px;
    }
    .page-container .content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 94px 0;
        overflow: hidden;
    }
    .page-container .content .form-section {
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
    }
    .page-container .content .form-section .logo {
        max-width: 473px;
        width: 100%;
    }
    .page-container .content .form-section form {
        display: flex;
        flex-direction: column;
        gap: 29px;
        width: 100%;
        max-width: 400px;
        align-items: center;
        justify-content: center;
    }

    .page-container .content .form-section form .element{
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 100%;
    }
    .page-container .content .form-section form .element label {
        font-size: 14px;
        font-weight: 400;
        line-height: 16.94px;
        text-align: left;
        color: white;
    }
    .page-container .content .form-section form .element .inputElement{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    
    .page-container .content .form-section form .element input {
        padding: 19px 0 19px 12px;
        color: #CDFDF3;
        background-color: transparent;
        border: none;
        width: 100%;
        border-bottom: 1px solid #CDFDF3;
        outline: none;
        box-shadow: none;
    }
    .page-container .content .form-section form .element input::placeholder{
        color: #CDFDF3;
    }

    .page-container .content .form-section form button {
        background: #0DC6DE;
        color: #023D6A;
        padding: 12px 24px;
        border: none;
        border-radius: 28px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 700;
        line-height: 19.36px;
        text-align: center;
        max-width: 114px;
    }
    .page-container .content .form-section form button:hover {
        background: #0bb5c9;
    }
    .page-container .content .image-section {
        display: flex;
        gap: 20px;
        width: 40%;
        justify-content: start;
        align-items: center;
        overflow: hidden;
        position: relative;
    }
    .page-container .content .image-section img {
        position: relative;
        height: 555px;
        width: 128px;
        border-radius: 51px;
        object-fit: cover;
        transition: width 0.3s ease;
    }

    .page-container .content .image-section img.expand {
        width: 385px;
    }

    .page-container footer{
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: start;
        padding: 0 2%;
        justify-self: flex-end;
    }
    .page-container footer .brands{
        display: flex;
        flex-direction: row;
        gap: 33px;
        align-self: flex-end;
    }
    .page-container footer .brands img{
        max-height: 47px;
    }
    .page-container footer .poweredby p{
        font-size: 10px;
        font-weight: 400;
        line-height: 12.1px;
        text-align: left;
        color: white;
    }
    .page-container footer .poweredby p a{
        font-size: 10px;
        font-weight: 400;
        line-height: 12.1px;
        text-align: left;
        text-decoration: none;
        color: white;
    }
</style>