<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*{
  box-sizing: border-box;
}

button{
  font-family: 'Montserrat', sans-serif;
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  text-align: inherit;
  cursor: pointer;
  outline: none;
}

body {
  margin: 0;
}

h1,h2,h3,h4,h5,h6,p{
  margin: 0;
}

@media(min-width: 1200px){
  .content{
    background-color: white;
    background-image: url('./assets/images/bgWhiteSection.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
}

</style>
