<template>
  <router-view />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss">
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
