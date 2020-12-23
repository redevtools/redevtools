<template>

  <div ref="tokens" class="tokens">
    <div class="token" v-for="(c, index) in inputs" :key="c">
      <input :value="c.className"
             @keydown="onKeyDown"
             @click="onClick"
             @focus="onFocus($event.target, index)"
             @keydown.up.stop.prevent="onUpDown"
             @keydown.down.stop.prevent="onUpDown"
             @keyup="onKeyUp"
             @keyup.left="updateFocus($event, index)"
             @keyup.right="updateFocus($event, index)"
             placeholder="+"
      />
    </div>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

export interface TokensUpdateEvent {
  value: string;
  valueUpToCaret: string;
  values: string[];
  index: number;
  lastKey: string;
}

@Options({
  name: "tailwind-element-classes",
  props: {
    classes: Array
  },
  emits: {
    update: {}
  },
  watch: {
    classes: "updateInputs"
  }
})
export default class TailwindElementClasses extends Vue {

  $refs!: {
    tokens: HTMLDivElement;
  }

  classes: { className: string }[] = []

  prevCursorPositions = {
    left: 0, right: 0
  }

  private inputs: { className: string }[] = []

  private currentTokenIndex = -1
  private currentSelectionStart = -1
  private lastKey = '';
  private keyIsDown!: KeyboardEvent;

  mounted() {
    this.updateInputs()
    this.updateAllInputSizes()
  }

  updateInputs() {
    this.inputs = [...this.classes, {className: ''}]
  }

  updated() {
    this.updateAllInputSizes()
    if (this.currentTokenIndex >= 0) {
      const input = this.$el.querySelectorAll("input")[this.currentTokenIndex]
      if (input && input != document.activeElement && (!(this.keyIsDown?.ctrlKey || this.keyIsDown?.shiftKey))) {
        input.selectionStart = this.currentSelectionStart
        input.selectionEnd = this.currentSelectionStart
        input.focus()
      }
    }
  }

  updateAllInputSizes() {
    this.$el.querySelectorAll("input").forEach((input: HTMLInputElement) => {
      input.style.width = (input.value.length + 1) + 'ch'
    })
  }

  private onKeyDown(e: KeyboardEvent) {
    this.lastKey = e.key
    this.keyIsDown = e
  }

  private onKeyUp(e: KeyboardEvent) {
    delete this.keyIsDown
    const input = e.target as HTMLInputElement
    this.currentSelectionStart = (e.target as HTMLInputElement)?.selectionStart ?? -1;
    const inputs = this.$el.querySelectorAll("input")
    if (e.key != "ArrowDown" && e.key != "ArrowUp") {
      this.emitUpdateEvent()
    } else {
      const lastInput = inputs[inputs.length - 1]
      const prevInput = inputs[inputs.length - 2]
      if (input == lastInput) {
        if (input.value != '') {
          this.inputs.push({className: ''})
        }
      } else if (input == prevInput) {
        if (input.value == '' && lastInput.value == '') {
          this.inputs.splice(this.inputs.length - 1)
        }
      }
    }
    input.style.width = (input.value.length + 1) + 'ch';
  }

  private onUpDown(e: KeyboardEvent) {
    this.emitUpdateEvent()
  }

  private onClick() {
    this.lastKey = ''
    this.emitUpdateEvent()
  }

  private onFocus(input: HTMLInputElement, index: number) {
    this.lastKey = ''
    this.currentTokenIndex = index
    this.emitUpdateEvent()
  }

  private updateFocus(e: KeyboardEvent, index: number) {
    if (e.shiftKey)
      return
    const direction = e.key == "ArrowLeft" ? 'left' : 'right'
    const token = e.target as HTMLInputElement
    const shouldSwitchInput = {
      left: () => token.selectionStart == 0 && this.prevCursorPositions.left == 0 && index > 0,
      right: () => token.selectionStart == token.value.length && this.prevCursorPositions.right == token.value.length && index < this.$refs.tokens.children.length - 1
    }
    const newIndex = index + (direction == "left" ? -1 : 1)
    if (shouldSwitchInput[direction]()) {
      const input = this.$refs.tokens.children[newIndex].querySelector("input")
      if (input) {
        input.focus()
      }
    }
    this.prevCursorPositions.right = token.selectionStart ?? -1
    this.prevCursorPositions.left = token.selectionStart ?? -1
  }


  private emitUpdateEvent() {
    if (this.currentTokenIndex >= 0) {
      const inputs = this.$el.querySelectorAll("input")
      const input = inputs[this.currentTokenIndex]
      if (input) {
        const value = input.value
        let valueUpToCaret = input.value.substr(0, input.selectionStart)
        const selected = input.value.substring(input.selectionStart, input.selectionEnd)
        if (selected == value)
          valueUpToCaret = value
        const values = [...inputs].map(i => i.value || '')
        this.$emit("update", {value, valueUpToCaret, values, index: this.currentTokenIndex, lastKey: this.lastKey})
      }
    }
  }
}
</script>

<style scoped>

.tokens {
  font-size: 11px;
  line-height: 11px;
  padding: 4px;
}

.token {
  display: inline-block;
  margin-right: 2px;
  margin-bottom: 2px;
}

.token input {
  color: #000cdd;
  border-radius: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
  height: 13px;
  border: none;
  display: inline-block;
  outline: none;
  text-align: center;
  font-family: monospace;
  font-size: 11px;
  line-height: 11px;
}

.token input:hover, .token input:active, .token input:focus {
  background-color: #f1f1f1;
}

</style>





