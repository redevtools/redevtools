<template>



  <figure class="md:flex bg-gray-100 rounded-xl p-8 md:p-0">
    <img class="w-32 h-32 rounded-full mx-auto" src="./assets/logo.png" alt="" width="384" height="512">
    <div class="pt-6 text-center space-y-4">
      <blockquote>
        <HelloWorld msg="Ciao a tutti"/>
      </blockquote>
      <figcaption class="font-medium">
        <div class="text-cyan-600">
          Hello
        </div>
        <div class="text-gray-500">
          Huuuohu
        </div>
      </figcaption>
    </div>
  </figure>

  <tailwind-devtool @inspect="log"/>

  <tailwind-element-classes :classes="classes" @update="log"></tailwind-element-classes>


</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import TailwindDevtool from './components/tailwind-devtool.vue';
import TailwindElementClasses from "@/components/tailwind-element-classes.vue";

@Options({
  components: {
    HelloWorld, TailwindDevtool, TailwindElementClasses
  },
})
export default class App extends Vue {

  classes = [
    {className: "ciao"},
    {className: "text-size-1"},
    {className: "ok"},
    {className: "bene-a-tutti"}
  ]

  mounted() {
    setTimeout(() => {
      this.classes = [
        {className: "ciao"},
        {className: "text-size-1"},
        {className: "ok"},
        {className: "bene-a-tut"}
      ]
    }, 5000)
  }

  log(e: any) {
    console.log("e: ", e)
  }


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
