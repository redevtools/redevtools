<template>

  <tailwind-devtool @inspect="log"/>


</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import TailwindDevtool from './components/tailwind-devtool.vue';

@Options({
  components: {
    TailwindDevtool
  },
})
export default class App extends Vue {

  log(e: any) {
    console.log("e: ", e)
  }


}
</script>

<style>
</style>
