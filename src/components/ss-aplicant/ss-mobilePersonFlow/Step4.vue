<template>
  <div class="step4">
    <div class="container" v-if="!showForm">
      <div :class="['add-experience-box', { 'small-box': experiences.length > 0 }]" @click="openForm">
        <img src="@/assets/icons/plusCircle.svg" alt="+">
        <p>Añadir Experiencia</p>
      </div>
      <div v-for="(experience, index) in experiences" :key="index" class="experience-item">
        <div class="header-element">
          <p v-if="experience.currentWork">Trabaja aquí actualmente</p>
          <div class="actions">
            <button @click="editExperience(index)">
              <img src="@/assets/icons/whiteEdit.svg" alt="Edit">
            </button>
            <button @click="confirmDeleteExperience(index)">
              <img src="@/assets/icons/whiteDelete.svg" alt="Edit">
            </button>
          </div>
        </div>
        <div class="experience-level element">
          <div class="up">
            <img src="@/assets/icons/frame.svg" alt="Hat">
            <span>Cargo</span>
          </div>
          <span>{{ experience.position }}</span>
        </div>
        <div class="experience-place element">
          <div class="up">
            <img src="@/assets/icons/blueBuild.svg" alt="Build">
            <span>Empresa</span>
          </div>
          <span>{{ experience.company }}</span>
        </div>
        <div class="experience-dates element">
          <div class="up">
            <img src="@/assets/icons/blueCalendar.svg" alt="Calendar">
            <span>Tiempo de duración</span>
          </div>
          <span>{{ formatDate(experience.startDate) }} - {{ formatDate(experience.endDate) }}</span>
        </div>
      </div>
    </div>

    <div v-else class="form-modal">
      <div class="title">
        <h3>Añadir Experiencia</h3>
        <button type="button" @click="cancelForm">
          <img src="@/assets/icons/closeX.svg" alt="x">
        </button>
      </div>
      <form @submit.prevent="saveExperience">
        <div
          :class="[
            'form-group',
            { formToggle: field.type === 'SsFormToggle' }
          ]"
          v-for="(field, index) in experiencesFormFields"
          :key="index"
        >
          <label :for="field.name">{{ field.label }}</label>
          <component
            :is="field.type"
            :key="index"
            v-model="newExperience[field.name]"
            :label="field.label"
            :placeholder="field.placeholder"
            :type="field.inputType"
            :inputType="field.inpuType"
            :required="field.required"
            :id="field.name"
          />
        </div>


        <div class="form-group attachments-form-group">
          <label for="attachments">
            <div class="addMedia">
              <img src="@/assets/icons/clip.svg" alt="Clip">
              <span>
                Añadir certificación, fotos o premios
              </span>
            </div>
            <span class="optional">
              Opcional
            </span>
          </label>
          <input
            type="file"
            id="attachments"
            @change="handleFileUpload"
            multiple
            accept="image/*"
          />
          <div class="previews">
            <img
              v-for="(attachment, index) in newExperience.attachments"
              :key="index"
              :src="attachment"
              class="preview-image"
              alt="Vista previa"
            />
          </div>
        </div>
        <p class="description">{{ experiencesFinalNote }}</p>
        <button class="submit" type="submit">
          <img src="@/assets/icons/mailBox.svg" alt="">
          <span>Guardar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import SsFormInput from '@/components/ss-form/SsFormInput.vue';
import SsFormTextarea from '@/components/ss-form/SsFormTextarea.vue';
import SsFormToggle from '@/components/ss-form/SsFormToggle.vue';
import experiencesMixin from '@/mixins/experiencesMixin.js';

export default {
  name: 'Step4',
  mixins: [experiencesMixin], 
  components: {
    SsFormInput,
    SsFormTextarea,
    SsFormToggle,
  },
  watch:{
    experiences: {
      handler() {
        this.saveToLocalStorage();
      },
      deep: true,
    },
    showForm(val) {
      if (val) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.step4 {
  padding: 16px;
  width: 100%;
  .container{
    display: flex;
    flex-direction: column;
    gap: 16px;
    .add-experience-box {
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
  
    .experience-item {
      padding: 20px;
      border-radius: 12px;
      background-color: #045480;
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
            height: 32px;
            width: 32px;
            color: #F1E8F1;
            .delete{
              height: 18px;
              width: 16px;
              color: #F1E8F1;
            }
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
            color: #0DC6DE;
          }
        }
        span{
          font-size: 16px;
          font-weight: 500;
          line-height: 20px;
          text-align: left;
          color: #EDEEF1;
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
        &.formToggle{
          flex-direction: row;
          justify-content: space-between;
        }
        .previews {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          .preview-image {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          }
        }
        &.attachments-form-group{
          label{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .addMedia{
              display: flex;
              align-items: center;
              gap: 13px;
            }
            .optional{
              padding: 4px 10px;
              border-radius: 25px;
              background-color: #06759F66;
              color: white;
              font-size: 12px;
              font-weight: 500;
              line-height: 14.63px;
              text-align: center;
            }
          }
          input{
            display: none;
          }
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
      .description{
        font-size: 10px;
        font-weight: 400;
        line-height: 18px;
        text-align: left;
        color: #023D6A;
        padding: 10px;
      }
    }   
  }
}
</style>