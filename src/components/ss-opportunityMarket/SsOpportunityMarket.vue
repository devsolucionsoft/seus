<template>
    <div class="opportunityMarket">
        <div class="upSection">
            <div class="title">
                <span>Mercado de oportunidades</span>
                <div class="lineTitle"></div>
            </div>
            <div class="opportunitysContainer">
                <div class="opportunity">
                    <div class="logoOpportunity">
                        <div class="inner-circle">
                            <img src="@/assets/brands/nutresag.svg" alt="">
                        </div>
                    </div>
                    <div class="cardOpportunityContainer">
                        <div class="imgContainer">
                            <img src="@/assets/images/groupImage.webp" alt="">
                        </div>
                        <div class="contentContainer">
                            <div class="charge">
                                <h4 class="position">Líder de ventas</h4>
                                <h5 class="channel">(canal natural)</h5>
                            </div>
                            <p class="description">
                                Buscamos líder comercial apasionado(a) por el bienestar y la alimentación saludable, empática y con orientación al logro...
                            </p>
                        </div>
                        <div class="actionsContainer">
                            <button class="readMore">Leer más</button>
                            <button class="applyOfert">Aplicar a oferta</button>
                        </div>
                    </div>
                    <div class="extraActions">
                        <button class="ask"><img src="@/assets/icons/star.svg" alt=""><span>Preguntar</span></button>
                        <button class="recommend"><img src="@/assets/icons/recomendationArrow.svg" alt=""><span>Recomendar</span></button>
                    </div>
                </div>
                <div class="opportunity">
                    <div class="logoOpportunity">
                        <div class="inner-circle">
                            <img src="@/assets/brands/nutresag.svg" alt="">
                        </div>
                    </div>
                    <div class="cardOpportunityContainer">
                        <div class="imgContainer">
                            <img src="@/assets/images/groupImage.webp" alt="">
                        </div>
                        <div class="contentContainer">
                            <div class="charge">
                                <h4 class="position">Líder de ventas</h4>
                                <h5 class="channel">(canal natural)</h5>
                            </div>
                            <p class="description">
                                Buscamos líder comercial apasionado(a) por el bienestar y la alimentación saludable, empática y con orientación al logro...
                            </p>
                        </div>
                        <div class="actionsContainer">
                            <button class="readMore">Leer más</button>
                            <button class="applyOfert">Aplicar a oferta</button>
                        </div>
                    </div>
                    <div class="extraActions">
                        <button class="ask"><img src="@/assets/icons/star.svg" alt=""><span>Preguntar</span></button>
                        <button class="recommend"><img src="@/assets/icons/recomendationArrow.svg" alt=""><span>Recomendar</span></button>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="downSection">
            <button class="applies"><img src="@/assets/icons/applies.svg" alt=""></button>
            <button class="video"><img src="@/assets/icons/play.svg" alt=""></button>
            <button class="companies"><img src="@/assets/icons/companyp.svg" alt=""></button>
        </div>
    </div>
</template>

<style scoped>

.opportunityMarket{
    background-color: #E5E5E5;
    border-radius: 40px 40px 0px 0px;
    align-self: end;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap:0;
    z-index: 2;
}

.opportunityMarket .upSection{
    display: flex;
    flex-direction: column;
    gap: 84px;
}

.opportunityMarket .upSection .title{
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 105px 48px 0 48px;
}

.opportunityMarket .upSection .title span{
    font-size: 24px;
    font-weight: 500;
    line-height: 29.26px;
    text-align: left;
    color: #023D6A;
}

.opportunityMarket .upSection .title .lineTitle{
    max-width: 64px;
    height: 8px;
    background-color: #761D74;
    border-radius: 7px;
}

.opportunityMarket .upSection .opportunitysContainer{
    display: flex;
    flex-direction: row;
    padding: 0 48px 48px 48px;
    gap: 31px;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity{
    display: flex;
    flex-direction: column;
    gap: 29px;
    position: relative;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .logoOpportunity {
    position: absolute;
    left: 18px;
    top: -48px;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: linear-gradient(112.76deg, #761D74 0.53%, #0DC6DE 100%);
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 8px 0px #00000026;
    overflow: hidden
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .logoOpportunity .inner-circle {
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .cardOpportunityContainer{
    max-width: 268px;
    display: flex;
    flex-direction: column;
    gap: 0;
    border-radius: 12px;
    box-shadow: 0px 4px 6px 0px #00000026;
    background-color: white;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .cardOpportunityContainer .imgContainer{
    max-height: 155px;
    border-radius: 12px 12px 0 0;
    overflow: hidden;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .cardOpportunityContainer .imgContainer img{
    width: 100%;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .cardOpportunityContainer .contentContainer{
    padding: 10px 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .cardOpportunityContainer .contentContainer .charge{
    display: flex;
    flex-direction: column;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .cardOpportunityContainer .contentContainer .charge .position, .opportunityMarket .upSection .opportunitysContainer .opportunity .cardOpportunityContainer .contentContainer .charge .channel{
    margin: 0;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .cardOpportunityContainer .contentContainer .charge .position{
    font-size: 18px;
    font-weight: 600;
    line-height: 21.94px;
    text-align: left;
    color: black;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .cardOpportunityContainer .contentContainer .charge .channel{
    font-size: 14px;
    font-weight: 400;
    line-height: 17.07px;
    text-align: left;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .cardOpportunityContainer .contentContainer .charge .description{
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 17.07px;
    text-align: left;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .cardOpportunityContainer .actionsContainer{
    display: flex;
    flex-direction: column;
    padding: 0 35px;
    gap: 10px;
    padding-bottom: 20px;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .cardOpportunityContainer .actionsContainer button{
    width: 100%;
    padding: 12px 24px;
    border-radius: 28px;
    border: none;
    font-size: 16px;
    font-weight: 700;
    line-height: 19.36px;
    text-align: center;
    cursor: pointer;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .cardOpportunityContainer .actionsContainer button.readMore{
    border: 1px solid #06759F;
    background-color: white;
    color: #06759F;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .cardOpportunityContainer .actionsContainer button.applyOfert{
    border: 1px solid;
    background-color: #0DC6DE;
    color: #CDFDF3;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .extraActions{
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 11px;
    align-self: center;
    justify-content: center;
}

.opportunityMarket .upSection .opportunitysContainer .opportunity .extraActions button{
    background-color: #FFFFFF33;
    color: #045480;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 4px 12px;
    gap: 10px;
    border-radius: 8px;
    border: 0.7px dashed #045480;
    cursor: pointer;
}

.opportunityMarket .downSection{
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: row;
    gap: 60px;
    padding: 44px 83px;
    border-top: 1px solid #023D6A;
}

.opportunityMarket .downSection button{
    height: 128px;
    width: 128px;
    border-radius: 80px;
    background-color: #D9D9D9;
    border: none;
    cursor: pointer;
}
</style>