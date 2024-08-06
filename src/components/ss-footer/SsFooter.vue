<template>
    <footer>
        <div class="brands">
            <img src="@/assets/brands/cocacolag.png" alt="Coca Cola">
            <img src="@/assets/brands/bancolombiag.png" alt="Bancolombia">
            <img src="@/assets/brands/nutresag.png" alt="Nutresa">
            <img src="@/assets/brands/velezg.png" alt="Velez">
            <img src="@/assets/brands/cocacolag.png" alt="Coca Cola">
            <img src="@/assets/brands/bancolombiag.png" alt="Bancolombia">
            <img src="@/assets/brands/nutresag.png" alt="Nutresa">
            <img src="@/assets/brands/velezg.png" alt="Velez">
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

<style scoped>
    footer{
        display: flex;
        flex-direction: column;
        gap: 0;
    }
    footer .brands{
        background-color: #EFEFEF;
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        align-items: center;
        justify-content: center;
    }
    footer .brands img{
        max-width: 72px;
        max-height: 60px;
        padding: 18px;
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
</style>