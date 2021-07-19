<template>
  <BContainer fluid data-test-banner>
    <BRow>
      <BCol cols="12" class="d-flex flex-column pt-15">
        <a href="/" class="text-center mb-10" data-test-banner-logo-link>
          <img
            src="../assets/logo.png"
            alt=""
            class="max-h-70"
            data-test-banner-logo
          />
        </a>
        <h3
          class="font-weight-bolder text-center font-size-h4 font-size-h1-lg"
          style="color: rgb(250, 250, 250)"
          data-test-banner-title
        >
          A Informação Traduzida<br />
          em Desenvolvimento
        </h3>
      </BCol>
    </BRow>
    <BRow class="mt-3">
      <BCol
        data-test-banner-background
        class="
          login-banner
          d-flex
          flex-row-fluid
          bgi-no-repeat bgi-position-y-bottom bgi-position-x-center
        "
        cols="12"
      ></BCol>
    </BRow>
  </BContainer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BRow, BCol, BContainer } from "bootstrap-vue";

@Component({
  components: {
    BRow,
    BCol,
    BContainer,
  },
})
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
