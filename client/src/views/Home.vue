<template>
  <BContainer fluid data-test-home-page>
    <BRow>
      <BCol sm="12" md="5" lg="5" class="aside-bg">
        <Banner />
      </BCol>
      <BCol sm="12" md="7" lg="7">
        <BRow
          class="
            flex-row-fluid
            d-flex
            flex-column
            justify-content-center
            position-relative
            overflow-hidden
            p-7
            mx-auto
          "
        >
          <BCol cols="12" class="pb-13">
            <h3
              class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
              data-test-create-account-title
            >
              Bem-Vindo
            </h3>
            <span
              class="text-muted font-weight-bold font-size-h4"
              data-test-create-account-subtitle
              >Novo aqui?
              <BLink
                class="text-primary font-weight-bolder"
                href="/create-account"
                data-test-create-account-link
                >Criar uma conta</BLink
              ></span
            >
          </BCol>
          <BCol cols="12" class="pb-3">
            <BToast
              id="invalidForm"
              variant="danger"
              static
              no-auto-hide
              data-test-toast
            >
              Usuário ou senha Inválido
            </BToast>
          </BCol>
          <BCol cols="12">
            <BForm
              @submit="onSubmit"
              method="post"
              action="/login"
              data-test-form-login
            >
              <BFormGroup label="Usuário:" label-for="username">
                <BFormInput
                  id="username"
                  v-model="username"
                  type="text"
                  data-test-input-username
                ></BFormInput>
              </BFormGroup>
              <BFormGroup label="Senha:" label-for="password">
                <BFormInput
                  id="password"
                  v-model="password"
                  type="password"
                  data-test-input-password
                ></BFormInput>
              </BFormGroup>
              <BOverlay
                :show="isLoading"
                rounded
                opacity="0.6"
                spinner-small
                spinner-variant="success"
                class="d-inline-block"
                data-test-form-loading
              >
                <BButton
                  type="submit"
                  :disabled="isLoading"
                  block
                  variant="success"
                  data-test-form-submit
                  >Entrar</BButton
                >
              </BOverlay>
            </BForm>
          </BCol>
          <BCol cols="12" class="pt-3">
            <BLink
              class="text-primary font-weight-bolder"
              href="/reset-password"
              data-test-reset-password
              >Esqueceu a senha?</BLink
            >
          </BCol>
        </BRow>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Banner from "../components/Banner.vue";
import {
  BRow,
  BCol,
  BContainer,
  BLink,
  BToast,
  BOverlay,
  BButton,
  BForm,
  BFormInput,
  BFormGroup,
} from "bootstrap-vue";
import { ApiService } from "../services/api";
import "bootstrap-vue";

@Component({
  components: {
    BRow,
    BCol,
    BContainer,
    BLink,
    BToast,
    BOverlay,
    BButton,
    BFormInput,
    BFormGroup,
    BForm,
    Banner,
  },
})
export default class Home extends Vue {
  public username = "";
  public password = "";
  public isLoading = false;

  public async onSubmit(event: Event) {
    event.preventDefault();
    if (this.isInvalidForm()) {
      this.$bvToast.show("invalidForm");
    } else {
      this.isLoading = true;
      try {
        const loginCallback = await ApiService.login({
          username: this.username,
          password: this.password,
        });
        window.location.replace(loginCallback.url);
      } catch (error) {
        this.$bvToast.show("invalidForm");
      }
      this.isLoading = false;
    }
  }

  private isInvalidForm(): boolean {
    return this.isBlank(this.username) && this.isBlank(this.password);
  }

  private isBlank(value: string): boolean {
    if (!value) return true;
    else if (value.length === 0 || value.trim().length === 0) return true;
    return false;
  }
}
</script>

<style lang="scss">
.pl-5 {
  padding-left: 1.25rem !important;
}
.pb-13,
.py-13 {
  padding-bottom: 3.25rem !important;
}
.pb-3 {
  padding-top: 1.1rem !important;
}
.pt-3,
.py-3 {
  padding-top: 1.1rem !important;
}
.pt-5,
.py-5 {
  padding-top: 1.25rem !important;
}
.max-h-70 {
  max-height: 70px !important;
}
.pt-15,
.py-15 {
  padding-top: 3.75rem !important;
}
.ml-auto,
.mx-auto {
  margin-left: auto !important;
}
.mr-auto,
.mx-auto {
  margin-right: auto !important;
}
.p-7 {
  padding: 1.75rem !important;
}
.position-relative {
  position: relative !important;
}
.overflow-hidden {
  overflow: hidden !important;
}
.aside-bg {
  background-color: #041e42;
}
</style>
