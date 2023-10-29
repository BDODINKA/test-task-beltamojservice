<template>
  <v-card v-if="dialog" class="card" v-click-outside="closeForm">
    <v-form @submit="submitForm" lazy-validation ref="form">
      <v-card-text>
        <v-text-field
          v-model="formData.firstName"
          :rules="isFieldValid"
          :error-messages="errorMessages"
          label="Имя"
          placeholder="Имя"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.lastName"
          :rules="isFieldValid"
          label="Фамилия"
          placeholder="Фамилия"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.company"
          :rules="isFieldValid"
          label="Компания"
          placeholder="Компания"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.jobTitle"
          :rules="isFieldValid"
          label="Специальность"
          required
          placeholder="Специальность"
        ></v-text-field>
        <v-text-field
          v-model="formData.phone"
          :rules="isPhoneInvalid"
          label="Телефон"
          @input="formatPhoneNumber"
          required
          placeholder="+375(29)8888888"
        ></v-text-field>
        <v-text-field
          v-model="formData.email"
          :rules="isEmailValid"
          label="E-mail"
          required
          placeholder="E-mail"
        ></v-text-field>
        <v-text-field
          v-model="formData.interests"
          :rules="isFieldValid"
          label="Интересы"
          required
          placeholder="Интересы"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="resetForm" type="reset">Очистить</v-btn>
        <v-btn color="primary" variant="text" type="submit">Применить</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { ValidationError } from "@/helpers/types/enums";
import type { NewUserType, UserDataType } from "@/helpers/types/types";

import Vue, { defineComponent } from "vue";

export default defineComponent({
  name: "FormUser",
  props: {
    initValues: {
      type: Object as () => UserDataType,
      default: () => ({}),
    },
    actions: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      errorMessages: "",
      formData: {} as NewUserType,
    };
  },
  watch: {
    initValues() {
      this.formData = {
        firstName: this.initValues.firstName,
        lastName: this.initValues.lastName,
        company: this.initValues.company,
        jobTitle: this.initValues.jobTitle,
        phone: this.initValues.phone,
        email: this.initValues.email,
        interests: this.initValues.interests,
        status: this.initValues.status,
      };
    },
  },
  computed: {
    dialog() {
      return this.$store.state.usersForm;
    },
    isFieldValid() {
      return [(v: string) => !!v || ValidationError.FIELD_REQUIRED];
    },
    isEmailValid() {
      return [
        (v: string) => !!v || ValidationError.FIELD_REQUIRED,
        (v: string) =>
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v) ||
          ValidationError.FIELD_EMAIL,
      ];
    },
    isPhoneInvalid() {
      return [
        (v: string) => !!v || ValidationError.FIELD_REQUIRED,
        (v: string) =>
          /\+\d{3}\(\d{2}\)\d{3}-\d{2}-\d{2}/.test(v) ||
          ValidationError.FIELD_PHONE,
      ];
    },
  },

  methods: {
    submitForm(event: Event) {
      event.preventDefault();
      if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
        this.$store.dispatch(this.actions, {
          ...this.formData,
          id: this.initValues.id,
        });
      }
    },
    resetForm() {
      this.formData = {
        firstName: "",
        lastName: "",
        company: "",
        jobTitle: "",
        phone: "",
        email: "",
        interests: "",
        status: false,
      };
    },
    closeForm() {
      this.$store.state.usersForm = false;
    },

    formatPhoneNumber() {
      this.formData.phone = this.formData.phone.replace(
        /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
        "$1($2)$3-$4-$5"
      );
    },
  },
});
</script>

<style scoped>
.card {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 99;
}
</style>
