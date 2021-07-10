<template>
  <b-container fluid data-test-banner>
    <b-row>
      <b-col cols="12" class="d-flex flex-column pt-15">
        <a href="/" class="text-center mb-10">
          <img src="../assets/logo.png" alt="" class="max-h-70" />
        </a>
        <h3
          class="font-weight-bolder text-center font-size-h4 font-size-h1-lg"
          style="color: rgb(250, 250, 250)"
        >
          A Informação Traduzida<br />em Desenvolvimento
        </h3>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col
        class="
          login-banner
          d-flex
          flex-row-fluid
          bgi-no-repeat bgi-position-y-bottom bgi-position-x-center
        "
        cols="12"
      ></b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Banner extends Vue {}
</script>

<style scoped lang="scss">
.login-banner {
  min-height: 450px;
  background-image: url("../assets/login-banner.svg");
}
.bgi-position-x-center {
  background-position-x: center;
}
.bgi-position-y-bottom {
  background-position-y: bottom;
}
.bgi-no-repeat {
  background-repeat: no-repeat;
}
@media (max-width: 575.98px) {
  .login-banner {
    min-height: 300px !important;
    background-size: 400px;
  }
}
</style>
