<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12" md="5" lg="5" class="aside-bg">
        <Banner />
      </b-col>
      <b-col sm="12" md="7" lg="7">
        <b-row
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
          <b-col cols="12" class="pb-13">
            <h3
              class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
            >
              Bem-Vindo
            </h3>
            <span class="text-muted font-weight-bold font-size-h4"
              >Novo aqui?
              <b-link
                class="text-primary font-weight-bolder"
                href="/account-create"
                >Criar uma conta</b-link
              ></span
            >
          </b-col>
          <b-col cols="12" class="pb-3">
            <b-toast id="invalidForm" variant="danger" static no-auto-hide data-test-toast>
              Usuário ou senha Inválido
            </b-toast>
          </b-col>
          <b-col cols="12">
            <b-form @submit="onSubmit" method="post" action="/login" data-test-form-login>
              <b-form-group label="Usuário:" label-for="username">
                <b-form-input
                  id="username"
                  v-model="username"
                  type="text"
                  data-test-username
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Senha:" label-for="password">
                <b-form-input
                  id="password"
                  v-model="password"
                  type="password"
                   data-test-password
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" block variant="success" data-test-submit>Entrar</b-button>
            </b-form>
          </b-col>
          <b-col cols="12" class="pt-3">
            <b-link
              class="text-primary font-weight-bolder"
              href="/password_reset"
              >Esqueceu a senha?</b-link
            >
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Banner from "../components/Banner.vue";
import { ApiService } from "../services/api";
import "bootstrap-vue";

@Component({
  components: { Banner },
})
export default class Home extends Vue {
  public username = "";
  public password = "";

  public async onSubmit(event: Event) {
    event.preventDefault();
    if (!this.isValidForm()) {
      this.$bvToast.show("invalidForm");
    }
    try {
       const loginCallback = await ApiService.login({ username: this.username, password: this.password});
       window.location.replace(loginCallback.url);
    } catch(error) {
      this.$bvToast.show("invalidForm");
    }
  }

  private isValidForm(): boolean {
    return this.isBlank(this.username) && this.isBlank(this.password);
  }

  private isBlank(value: string): boolean {
    if (!value) return false;
    else if (value.length === 0 || value.trim().length === 0) return false;
    return true;
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
