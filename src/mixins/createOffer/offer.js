export default {
    data() {
      return {
        personalInfoItems: [
          { title: 'Beneficios de la empresa', value: 'Habilidades de liderazgo y colaboración, con experiencia en dirigir equipos creativos hacia el logro de objetivos comunes, fomentando un ambiente de trabajo positivo y productivo.', name: 'benefits', icon: require('@/assets/icons/suitcase.svg'), group: 1 },
          { title: 'Cargo', value: 'Cajero', name: 'role', class: 'green-items', group: 1 },
          { title: 'Salario', value: '3.500.000 / 4.000.000', name: 'salary', class: 'green-items', group: 1 },
          { title: 'Ciudad', value: 'Bogotá', name: 'city', class: 'green-items', group: 1 },
          { title: 'Vacante disponible', value: 'Cajero', name: 'availableRole', class: 'green-items', group: 1 },
          { title: 'Responsabilidades', value: 'Manejo de dinero', name: 'responsabilities', class: 'green-items', group: 1 },
          { title: 'Fecha de cierre', value: '30 de Julio de 2024', name: 'endDate', class: 'green-items', group: 1 },
          { title: 'Estudios requeridos', value: 'Bachillerato / Universidad', name: 'requiredStudies', class: 'green-items', group: 2 },
          { title: 'Conocimientos esperados', value: 'Manejo de clientes', name: 'requiredKnowledge', class: 'green-items', group: 2 },
          { title: 'Experiencia Requerida', value: '1 año mínimo', name: 'requiredExperienceTime', class: 'green-items', group: 2 },
          { title: 'Palabras clave de la vacante', value: 'Cajero', name: 'keywords', class: 'green-items', group: 2 },
          { title: 'Experiencia Requerida', value: 'E-mail / Mensaje en Plataforma', name: 'requiredExperience', class: 'green-items', group: 2 },
          { title: 'Correo para postulaciones', value: 'Vacante@gmail.com', name: 'postulationsEmail', class: 'green-items', group: 2 },
          { title: 'Descripción del empleo', value: 'Habilidades de liderazgo y colaboración, con experiencia en dirigir equipos creativos hacia el logro de objetivos comunes, fomentando un ambiente de trabajo positivo y productivo.', name: 'description', icon: require('@/assets/icons/comment.svg'), group: 3 },
        ],
      };
    },
    computed: {
      groupedItems() {
        return this.personalInfoItems.reduce((groups, item) => {
          const groupIndex = item.group;
          if (!groups[groupIndex]) {
            groups[groupIndex] = [];
          }
          groups[groupIndex].push(item);
          return groups;
        }, {});
      },
    },
};