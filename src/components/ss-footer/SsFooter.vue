<template>
    <footer>
        <div class="brands">
            <img v-for="(img, index) in images" :key="index" :src="img.url" :alt="img.alt">
        </div>
        <div class="socialFooter">
            <div class="poweredby">
                <p>Powered by <a href="">SolucionSoft.com</a></p>
            </div>
            <div class="socials">
                <a href=""><img src="@/assets/icons/fb.svg" alt="Facebook"></a>
                <a href=""><img src="@/assets/icons/x.svg" alt="X"></a>
                <a href=""><img src="@/assets/icons/ig.svg" alt="Instagram"></a>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue';
import cocacola from '@/assets/brands/cocacola.png';
import bancolombia from '@/assets/brands/bancolombia.png';
import nutresa from '@/assets/brands/nutresa.png';
import velez from '@/assets/brands/velez.png';

const images = ref([
    {url: cocacola, alt: 'Coca Cola'},
    {url: bancolombia, alt: 'Bancolombia'},
    {url: nutresa, alt: 'Nutresa'},
    {url: velez, alt: 'Velez'},
])

</script>

<style scoped>
    footer{
        display: flex;
        flex-direction: column;
        gap: 0;
    }
    footer .brands{
        background-color: #C6CBD2;
        display: flex;
        gap: 40px;
        align-items: center;
        justify-content: center;
        overflow-x: auto;
        scrollbar-width: thin;
        -webkit-overflow-scrolling: touch;
        width: 100%;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
    }
    footer .brands img{
        max-width: 72px;
        max-height: 47px;
        padding: 18px;
        box-sizing: content-box;
    }
    footer .socialFooter{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        padding: 24px 197px;
        background-color: #023D6A;
    }
    footer .socialFooter .poweredby p{
        font-size: 10px;
        font-weight: 400;
        line-height: 12.1px;
        text-align: left;
        color: white;
    }
    footer .socialFooter .poweredby p a{
        font-size: 10px;
        font-weight: 400;
        line-height: 12.1px;
        text-align: left;
        color: white;
        text-decoration: none;
    }
    footer .socialFooter .socials{
        display: flex;
        flex-direction: row;
        gap: 23px;
    }
    @media(max-width: 700px){
        footer .socialFooter{
            padding: 18px 0;
            flex-direction: column;
            align-items: center;
            gap: 24px;
        }
        footer .brands{
            gap: 30px;
            justify-content: start;
        }
    }
    footer .brands::-webkit-scrollbar{
        display: none;
    }
</style>