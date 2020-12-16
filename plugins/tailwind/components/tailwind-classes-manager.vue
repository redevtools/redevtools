<template>

  <div class="redevtool classes-manager" ref="tokens">

    <div class="token" :title="c.tooltip" v-for="(c, index) in classes" :key="c">
      <input :value="c.name" @keydown="updateInputSize"
             @keyup.left="updateLeftFocus($event.target, index)"
             @keyup.right="updateRightFocus($event.target, index)"
             @keyup.enter="updateClass(c, $event.target.value, index)"/>
    </div>
    <div class="token" title="Add new class">
      <input v-model="newClass" placeholder="+" @keydown.enter="addNewClass" @keyup.left="focusLastToken"/>
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

  $refs!: {
    tokens: HTMLDivElement;
  }

  newClass = ''

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
    this.updateClasses();
  }

  private updateClasses() {
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

  private addNewClass() {
    console.log("addNewClass: ")
    if (this.newClass)
      this.inspect.target.classList.add(this.newClass)
    this.updateClasses()
    this.newClass = ''
  }

  private updateClass(c: { name: string }, newClass: string, index: number) {
    if (newClass == '')
      this.inspect.target.classList.remove(c.name)
    else
      this.inspect.target.className = this.inspect.target.className.replace(c.name, newClass)
    this.updateClasses()
    this.$nextTick(()=>{
      const input = this.$refs.tokens.children[index].querySelector("input")
      console.log("input: ",input)
      if (input) {
        input.focus()
      }
    })
  }

  private updateLeftFocus(token: HTMLInputElement, index: number) {
    if (token.selectionStart == 0 && index > 0) {
      const input = this.$refs.tokens.children[index - 1].querySelector("input")
      if (input) {
        input.focus()
      }
    }
  }

  private updateRightFocus(token: HTMLInputElement, index: number) {
    if (token.selectionStart == token.value.length && index < this.$refs.tokens.children.length - 1) {
      const input = this.$refs.tokens.children[index + 1].querySelector("input")
      if (input) {
        input.focus()
      }
    }
  }

  private focusLastToken() {
    this.$refs.tokens.children[this.$refs.tokens.children.length - 2].querySelector("input")?.focus()
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

.token input:hover, .token input:active, .token input:focus {
  background-color: #f1f1f1;
}

</style>