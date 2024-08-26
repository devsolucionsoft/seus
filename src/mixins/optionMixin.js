export default {
    data() {
      return {
        selectedOptions: [],
        options: [
          {
              title: 'Tipo de formación y empleo que buscas:',
              items: [
                { label: 'Áreas humanas', image: require('@/assets/icons/selectIcons/human-resources.svg') },
                { label: 'Áreas Financieras', image: require('@/assets/icons/selectIcons/finance.svg') },
                { label: 'Área Comerciales', image: require('@/assets/icons/selectIcons/commercial.svg') },
                { label: 'Áreas de Logística', image: require('@/assets/icons/selectIcons/logistic.svg') },
                { label: 'Genérica', image: require('@/assets/icons/selectIcons/generic.svg') },
              ]
          },
          {
              title: 'Opciones de jornadas:',
              items: [
                { label: 'Presencial', image: require('@/assets/icons/selectIcons/presential.svg') },
                { label: 'Remoto', image: require('@/assets/icons/selectIcons/remote.svg') },
                { label: 'Híbrido', image: require('@/assets/icons/selectIcons/hybrid.svg') },
                { label: 'Me es indiferente', image: require('@/assets/icons/selectIcons/indiferent.svg') }
              ]
          },
          {
              title: 'Qué tipos de culturas te gustan más:',
              items: [
              { label: 'Emocionales', image: require('@/assets/icons/selectIcons/emotional.svg') },
              { label: 'Conocimiento', image: require('@/assets/icons/selectIcons/knowledge.svg') },
              { label: 'Remoto', image: require('@/assets/icons/selectIcons/hybrid.svg') },
              { label: 'Producción', image: require('@/assets/icons/selectIcons/production.svg') },
              { label: 'Intuitiva', image: require('@/assets/icons/selectIcons/intuitive.svg') },
              { label: 'Me es indiferente', image: require('@/assets/icons/selectIcons/indiferent.svg') }
              ]
          }
        ],
        
      };
    },
    methods: {
      toggleSelection(index) {
        const position = this.selectedOptions.indexOf(index);
        if (position === -1) {
          this.selectedOptions.push(index);
        } else {
          this.selectedOptions.splice(position, 1);
        }
        this.saveToLocalStorage();
      },
      saveToLocalStorage() {
        const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
        stepsData.step1 = {
          selectedOptions: this.selectedOptions,
          options: this.options
        };
        localStorage.setItem('stepsData', JSON.stringify(stepsData));
      },
      loadFromLocalStorage() {
        const stepsData = JSON.parse(localStorage.getItem('stepsData')) || {};
        if (stepsData.step1) {
          this.selectedOptions = stepsData.step1.selectedOptions || [];
          this.options = stepsData.step1.options || [];
        }
      },
    },
    created() {
      this.loadFromLocalStorage();
    }
  };
  