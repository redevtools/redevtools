<template>

  <div class="redevtool classes-manager">

    <div class="token" :title="c.tooltip" v-for="c in classes" v-bind:key="c.name">
      <input :value="c.name" @keydown="updateInputSize"/>
    </div>

  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {tailwind} from "@/components/tailwind.classes";

@Options({
  name: "tailwind-classes-manager",
  props: {
    inspect: {target: HTMLElement}
  },
  emits: {}
})
export default class TailwindClassesManager extends Vue {

  inspect!: { target: HTMLElement }

  classes: { name: string; tooltip?: string }[] = []

  beforeMount() {
    this.updateTarget()
  }

  beforeUpdate() {
    this.updateTarget()
  }


  private updateTarget() {
    this.$nextTick(() => {
      this.$el.querySelectorAll("input").forEach((input: HTMLInputElement) => {
        input.style.width = (input.value.length + 1) + 'ch'
      })
    })
    const className = this.inspect.target?.className
    if (className) {
      const classes = className.split(" ")
      this.classes = classes.map(c => {
        const foundRules = tailwind.all.filter(t => t.className == c)
        if (foundRules.length == 0)
          console.log("foundRules: ", c, foundRules[0])
        let tooltip = undefined
        if (foundRules.length > 0)
          tooltip = foundRules[0].rules
        return {name: c, tooltip: tooltip}
      })
    }
  }

  private updateInputSize(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement
    if (input)
      input.style.width = (input.value.length + 1) + 'ch'
  }
}
</script>

<style scoped>
.classes-manager {
  color: #818bff;
  font-size: 11px;
  line-height: 11px;
  text-align: left;
  padding: 4px;
}

.token {
  display: inline-block;
  margin-right: 2px;
  margin-bottom: 2px;
}

.token input {
  border-radius: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
  height: 13px;
  border: none;
  display: inline-block;
  outline: none;
  text-align: center;
  font-family: monospace;
}

.token input:hover, .token input:active {
  background-color: #f1f1f1;
}

</style>