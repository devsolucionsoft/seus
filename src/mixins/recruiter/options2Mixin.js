export default {
    data() {
      return {
        selectedOptions2: [],
        options2: [
          {
              title: 'Elije el o los arquetipos de marca que más se identifiquen con la empresa:',
              items: [
                { label: 'INOCENTE', image: require('@/assets/icons/selectIcons/blueIcons/innocent.svg') },
                { label: 'EXPLORADOR', image: require('@/assets/icons/selectIcons/blueIcons/explorer.svg') },
                { label: 'SABIO', image: require('@/assets/icons/selectIcons/blueIcons/sage.svg') },
                { label: 'HÉROE', image: require('@/assets/icons/selectIcons/blueIcons/hero.svg') },
                { label: 'REBELDE', image: require('@/assets/icons/selectIcons/blueIcons/rebel.svg') },
                { label: 'MAGO', image: require('@/assets/icons/selectIcons/blueIcons/magic.svg') },
                { label: 'COMÚN', image: require('@/assets/icons/selectIcons/blueIcons/common.svg') },
                { label: 'AMANTE', image: require('@/assets/icons/selectIcons/blueIcons/lover.svg') },
                { label: 'BUFÓN', image: require('@/assets/icons/selectIcons/blueIcons/jester.svg') },
                { label: 'CUIDADOR', image: require('@/assets/icons/selectIcons/blueIcons/carer.svg') },
                { label: 'CREADOR', image: require('@/assets/icons/selectIcons/blueIcons/creative.svg') },
                { label: 'GOBERNANTE', image: require('@/assets/icons/selectIcons/blueIcons/ruler.svg') },
              ]
          },
        ],
        
      };
    },
    methods: {
      toggleSelection2(index) {
        const position = this.selectedOptions2.indexOf(index);
        if (position === -1) {
          this.selectedOptions2.push(index);
        } else {
          this.selectedOptions2.splice(position, 1);
        }
        this.saveToLocalStorage();
      },
      saveToLocalStorage() {
        const stepsDataRecruiter = JSON.parse(localStorage.getItem('stepsDataRecruiter')) || {};
        stepsDataRecruiter.step3 = {
          selectedOptions2: this.selectedOptions2,
          options2: this.options2
        };
        localStorage.setItem('stepsDataRecruiter', JSON.stringify(stepsDataRecruiter));
      },
      loadFromLocalStorage() {
        const stepsDataRecruiter = JSON.parse(localStorage.getItem('stepsDataRecruiter')) || {};
        if (stepsDataRecruiter.step3) {
          this.selectedOptions2 = stepsDataRecruiter.step3.selectedOptions2 || [];
          this.options2 = stepsDataRecruiter.step3.options2 || [];
        }
      },
    },
    created() {
      this.loadFromLocalStorage();
    }
  };
  