<template>
  <div class="step3">
    <div class="container" v-if="!showForm">
      <div :class="['add-formation-box', { 'small-box': formations?.length > 0 }]" @click="openForm">
        <img src="@/assets/icons/plusCircle.svg" alt="+">
        <p>Añadir Formación</p>
      </div>
      <div v-for="(formation, index) in formations" :key="index" class="formation-item">
        <div class="header-element">
          <p v-if="isMostRecent(index)">Último estudio realizado</p>
          <div class="actions">
            <button @click="editFormation(index)"><img src="@/assets/icons/edit2.svg" alt="Edit"></button>
            <button @click="openDeleteFormationDialogVisible(index)"><img src="@/assets/icons/delete.svg" alt="Delete"></button>
          </div>
        </div>
        <div class="formation-level element">
          <div class="up">
            <img src="@/assets/icons/hat.svg" alt="Hat">
            <span>Nivel de formación</span>
          </div>
          <span>{{ formation.title }}</span>
        </div>
        <div class="formation-place element">
          <div class="up">
            <img src="@/assets/icons/build.svg" alt="Build">
            <span>Institución</span>
          </div>
          <span>{{ formation.institution }}</span>
        </div>
        <div class="formation-dates element">
          <div class="up">
            <img src="@/assets/icons/calendar.svg" alt="Calendar">
            <span>Fecha de certificación</span>
          </div>
          <span>{{ formatDate(formation.startDate) }} - {{ formatDate(formation.endDate) }}</span>
        </div>
      </div>
    </div>

    <div v-else class="form-modal">
      <div class="title">
        <h3>Añadir Formación</h3>
        <button type="button" @click="cancelForm">
          <img src="@/assets/icons/closeX.svg" alt="x">
        </button>
      </div>
      <form @submit.prevent="saveFormation">
        <div class="form-group" v-for="(field, index) in formationFormFields" :key="index">
          <label :for="field.name">{{ field.label }}</label>
          <component
            :is="field.type"
            :key="index"
            v-model="newFormation[field.name]"
            :label="field.label"
            :placeholder="field.placeholder"
            :type="field.inputType"
            :inputType="field.inpuType"
            :required="field.required"
            :id="field.name"
          />
        </div>
        <button class="submit" type="submit">
          <img src="@/assets/icons/mailBox.svg" alt="">
          <span>Guardar</span>
        </button>
      </form>
    </div>
    <el-dialog
      v-model="deleteFormationDialogVisible"
      title="Confirmar eliminación"
      width="400px"
      center
    >
      <span>¿Estás seguro de que deseas eliminar esta formación?</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="deleteFormationDialogVisible = false">Cancelar</el-button>
          <el-button type="primary" @click="confirmDeleteFormation">Confirmar</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import SsFormInput from '@/components/ss-form/SsFormInput.vue';
import formationsMixin from '@/mixins/formationsMixin.js';

export default {
  name: 'Step3',
  mixins: [formationsMixin], 
  components: {
    SsFormInput,
  },
  watch:{
    formations: {
      handler() {
        this.saveToLocalStorage();
      },
      deep: true
    },
    showForm(val) {
      if (val) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.step3 {
  padding: 16px;
  width: 100%;
  .container{
    display: flex;
    flex-direction: column;
    gap: 16px;
    .add-formation-box {
      background-color: #EDEEF1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 260px;
      flex-direction: column;
      gap: 12px;
      padding: 20px;
      border-radius: 12px;
  
      img {
        width: 24px;
        height: 24px;
      }
  
      p {
        font-size: 16px;
        font-weight: 500;
        color: #023D6A;
        margin: 0;
      }
  
      &.small-box {
        padding: 9px 16px;
        border: 1px solid #191F27;
        gap: 10px;
        align-self: flex-end;
        height: auto;
        flex-direction: row;
        width: fit-content;
        border-radius: 28px;
        background-color: transparent;
  
        img {
          width: 18px;
          height: 18px;
        }
  
        p {
          font-size: 14px;
          margin: 0;
        }
      }
    }
  
    .formation-item {
      padding: 20px;
      border-radius: 12px;
      background-color: #EDEEF1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      .header-element{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        p{
          padding: 1px 12px;
          background-color: #023D6A;
          border-radius: 30px;
          color: #EDEEF1;
          font-size: 12px;
          font-weight: 500;
          line-height: 20px;
          text-align: left;

        }
        .actions{
          display: flex;
          flex-direction: row;
          gap: 12px;
          align-items: center;
          justify-content: center;

          button{
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
        }
      }
      .element{
        display: flex;
        flex-direction: column;
        gap: 12px;
        .up{
          display: flex;
          align-items: center;
          gap: 7px;
          span{
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            text-align: left;
            color: #47586E
          }
        }
        span{
          font-size: 16px;
          font-weight: 500;
          line-height: 20px;
          text-align: left;
          color: #023D6A;
        }
      }
    }
  }

  .form-modal {
    background-color: white;
    padding: 16px;
    height: 100vh;
    position: fixed;
    z-index: 3;
    width: 100%;
    left: 0;
    top: 0;
    box-sizing: border-box;
    gap: 24px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    z-index: 11;

    .title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      h3{
        font-size: 18px;
        margin-bottom: 20px;
        color: #045480;
        margin: 0
      }
      button{
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
    }
    form{
      display: flex;
      flex-direction: column;
      gap: 24px;
      .form-group{
        display: flex;
        flex-direction: column;
        gap: 15px;
        label{
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          text-align: left;
          color: #023D6A;
        }
      }
      .submit {
        padding: 9px 24px;
        border: none;
        border-radius: 28px;
        width: 100%;
        cursor: pointer;
        color: #023D6A;
        background-color: #0DC6DE;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        span{
          font-size: 14px;
          font-weight: 500;
          line-height: 17.07px;
          text-align: center;
        }
      }
    }   
  }
}
</style>