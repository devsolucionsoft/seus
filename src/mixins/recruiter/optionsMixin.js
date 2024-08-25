export default {
    data() {
      return {
        selectedOptions: [],
        options: [
          {
              title: 'Qué tipos de cultura se identifica más con su empresa:',
              items: [
                { label: 'Emocionales', image: require('@/assets/icons/selectIcons/blueIcons/emotional.svg') },
                { label: 'Conocimiento', image: require('@/assets/icons/selectIcons/blueIcons/knowledge.svg') },
                { label: 'Remoto', image: require('@/assets/icons/selectIcons/blueIcons/remote.svg') },
                { label: 'Producción', image: require('@/assets/icons/selectIcons/blueIcons/production.svg') },
                { label: 'Intuitiva', image: require('@/assets/icons/selectIcons/blueIcons/intuitive.svg') },
                { label: 'Me es indiferente', image: require('@/assets/icons/selectIcons/blueIcons/indiferent.svg') },
              ]
          },
        ],
        
      };
    },
    methods: {
      toggleSelection1(index) {
        const position = this.selectedOptions.indexOf(index);
        if (position === -1) {
          this.selectedOptions.push(index);
        } else {
          this.selectedOptions.splice(position, 1);
        }
        this.saveToLocalStorage();
      },
      saveToLocalStorage() {
        const stepsDataRecruiter = JSON.parse(localStorage.getItem('stepsDataRecruiter')) || {};
        stepsDataRecruiter.step1 = {
          selectedOptions: this.selectedOptions,
          options: this.options
        };
        localStorage.setItem('stepsDataRecruiter', JSON.stringify(stepsDataRecruiter));
      },
      loadFromLocalStorage() {
        const stepsDataRecruiter = JSON.parse(localStorage.getItem('stepsDataRecruiter')) || {};
        if (stepsDataRecruiter.step1) {
          this.selectedOptions = stepsDataRecruiter.step1.selectedOptions || [];
          this.options = stepsDataRecruiter.step1.options || [];
        }
      },
    },
    created() {
      this.loadFromLocalStorage();
    }
  };
  