<template>

  <div class="redevtool classes-manager" ref="tokens">


    <div class="token" :title="c.rules" v-for="(c, index) in classes" :key="c">
      <input @keyup="updateInputSize"
             @click="updateRules($event.target)"
             @focus="updateRules($event.target)"
             @keydown.down.stop.prevent="updateClassHighlight(1, c, index)"
             @keydown.up.stop.prevent="updateClassHighlight(-1, c, index)"
             @keyup.left="updateLeftFocus($event.target, index)"
             @keyup.right="updateRightFocus($event.target, index)"
             @keydown.enter.stop.prevent="updateClass(c, $event.target.value, index)"/>
    </div>
    <div class="token" title="Add new class">
      <input v-model="newClass" placeholder="+"
             @click="updateRules($event.target)"
             @focus="updateRules($event.target)"
             @keyup="updateRules($event.target)"
             @keydown.enter.stop.prevent="addNewClass"
             @keydown.down.stop.prevent="updateClassHighlight(1)"
             @keydown.up.stop.prevent="updateClassHighlight(-1)"
             @keyup.left="focusLastToken"/>
    </div>

    <hr/>

    <div class="active-rules">
      <div class="rule-row" v-for="r in activeRules" :key="r">
        <span v-if="r.color" class="square" :style="{backgroundColor: r.color}"></span>
        <span class="rule">{{ r.rule }}</span>:
        <span class="rule-value">{{ r.value }}</span>;
        <span v-if="r.valuePx" class="rule-comment"> // {{ r.valuePx }}</span>
      </div>
    </div>

    <hr/>


    <div class="suggested">
      <div class="tw-class-row" v-for="t in suggested" :key="t">
        <span class="tw-class" :class="{highlight: t.highlight}">{{ t.twClass }}</span> <span v-if="t.color"
                                                                                              class="square"
                                                                                              :style="{backgroundColor: t.color}"></span>
        <span
            v-if="t.valuePx" class="rule-comment"> ({{ t.valuePx }})</span>
      </div>
    </div>


  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {tailwind} from "@/components/tailwind.classes";
import {closest, CssClassData, tokensTree} from "@/components/tailwind-classes-parser";

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

  classes: CssClassData[] = []

  activeRules: { rule: string; value: string; valuePx: string; color: string }[] = []
  suggested: { twClass: string; valuePx?: string; color?: string; highlight?: boolean }[] = []

  rem = parseFloat(getComputedStyle(document.documentElement).fontSize)

  prevCursorPositions = {
    left: 0, right: 0
  }
  private tokensTree: { token: string; children: string[]; tree: any; parent? } = tokensTree(tailwind.all)
  private classIndex = -1;
  private prevTargetClassAttribute = '';

  mounted() {
    this.updateClasses();
  }

  beforeUpdate() {
    if (this.inspect.target.className != this.prevTargetClassAttribute) {
      this.prevTargetClassAttribute = this.inspect.target.className
      this.updateClasses();
      this.$nextTick(() => {
        this.$el.querySelectorAll("input").forEach((input: HTMLInputElement, index) => {
          if (this.classes[index])
            input.value = this.classes[index].className
          input.style.width = (input.value.length + 1) + 'ch'
        })
      })
    }
  }

  private updateClasses() {
    const className = this.inspect.target?.className
    if (className) {
      const classes = className.split(" ")
      this.classes = classes.map(c => {
        const foundRules = tailwind.all.filter(t => t.className == c)
        return foundRules[0] ?? {className: c, rules: ''}
      }).filter(c => c)

    }
  }

  private updateInputSize(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement
    if (input)
      input.style.width = (input.value.length + 1) + 'ch'
    if (e.key != "ArrowDown" && e.key != "ArrowUp")
      this.updateRules(input)
  }

  private addNewClass() {
    if (this.classIndex >= 0)
      this.newClass = this.suggested[this.classIndex].twClass
    if (this.newClass)
      this.inspect.target.classList.add(this.newClass)
    this.updateClasses()
    this.newClass = ''
  }

  private updateClass(c: CssClassData, newClass: string, index: number) {
    if (this.classIndex >= 0)
      newClass = this.suggested[this.classIndex].twClass
    if (newClass == '')
      this.inspect.target.classList.remove(c.className)
    else
      this.inspect.target.className = this.inspect.target.className.replace(c.className, newClass)
    this.updateClasses()
    this.$nextTick(() => {
      const input = this.$refs.tokens.children[index].querySelector("input")
      if (input) {
        input.focus()
      }
    })
  }

  private updateLeftFocus(token: HTMLInputElement, index: number) {
    this.updateFocus(token, index, "left")
  }

  private updateRightFocus(token: HTMLInputElement, index: number) {
    this.updateFocus(token, index, "right")
  }

  private updateFocus(token: HTMLInputElement, index: number, direction: 'left' | 'right') {
    let inputForMenu = token
    const shouldSwitchInput = {
      left: () => token.selectionStart == 0 && this.prevCursorPositions.left == 0 && index > 0,
      right: () => token.selectionStart == token.value.length && this.prevCursorPositions.right == token.value.length && index < this.$refs.tokens.children.length - 1
    }
    const newIndex = index + (direction == "left" ? -1 : 1)
    if (shouldSwitchInput[direction]()) {
      const input = this.$refs.tokens.children[newIndex].querySelector("input")
      if (input) {
        input.focus()
        inputForMenu = input
      }
    }
    this.prevCursorPositions.right = token.selectionStart ?? -1
    this.updateRules(inputForMenu)
  }

  private focusLastToken() {
    const inputs = [...this.$refs.tokens.querySelectorAll("input")]
    inputs[inputs.length - 2].focus()
  }

  private updateRules(input: HTMLInputElement) {
    this.activeRules = []
    this.suggested = []
    this.classIndex = -1
    this.updateClassHighlight()

    const value = input.value ?? ''

    const tokens = value.split("-").filter(t => t.length > 0)
    const caretPosition = input.selectionStart ?? value.length
    const closestClasses = closest(value)
    this.updateClassRules(closestClasses, value);
    this.updateSuggested(closestClasses, value, tokens, caretPosition);
  }

  private updateClassRules(closestClasses: CssClassData[], value: string) {
    const rawRules = closestClasses[0]?.className == value ? closestClasses[0].rules : ''
    if (rawRules) {
      const rules = this.computeRules(rawRules);
      this.activeRules = rules
    }
  }

  private computeRules(rawRules: string) {
    if (!rawRules)
      return []
    const rules = rawRules.split(";").filter((r: string) => r).map((r: string) => {
      try {

        return {
          rule: r.split(":")[0].trim(),
          value: r.split(":")[1].trim(),
          valuePx: '',
          color: ''
        }
      } catch (e) {
        return null as any
      }
    }).filter(r => r)
    for (const r of rules) {
      try {
        if (r.value.indexOf("rem") >= 0) {
          const remValue = +r.value.replace("rem", "")
          const pxValue = this.rem * remValue
          r.valuePx = `${pxValue}px`
        }
        if (r.value.indexOf("rgba") >= 0) {
          const colorToken = (r.value.match(/rgba\(\d+,\s?\d+,\s?\d+/gi) ?? [])[0] ?? ''
          if (colorToken) {
            const color = colorToken + ', 1)'
            r.color = color
          }
        }
      } catch (e) {
        console.log("e: ", e)
      }
    }
    return rules;
  }

  private updateSuggested(closestClasses: CssClassData[], className: string, tokens: string[], caretPosition: number) {
    if (className == '') {
      this.suggested = ['text', 'width', 'height', 'p', 'm', 'font', 'cursor'].map(c => ({twClass: c}))
      return
    }
    const nodeClasses = n => {
      const classes: CssClassData[] = []
      if (n.tree.className)
        return [n.tree]
      else {
        for (const ck in n.tree) {
          classes.push(...nodeClasses(n.tree[ck]))
        }
      }
      return classes

    }
    const nodeTokens = n => {
      let prefix = n.token
      let parent = n.parent
      while (parent) {
        prefix = parent.token + (parent.token ? '-' : '') + prefix
        parent = parent.parent
      }
      return n.children.map(c => {
        return {className: prefix + (prefix ? '-' : '') + c}
      })

    }
    let relevant: CssClassData[] = []
    const dashesBeforeCaret = className.slice(0, caretPosition).split("").filter(c => c == '-').length
    let tokensToCompute = dashesBeforeCaret + 1
    const currentTokenIndex = dashesBeforeCaret
    if (caretPosition == 0 && className == '')
      tokensToCompute = 0
    let node = this.tokensTree
    let level = 0
    while (level < tokensToCompute) {
      const parent = node
      if (!node.tree[tokens[level]])
        break;
      node = node.tree[tokens[level]]
      node.parent = parent
      level++
    }
    let n = node
    let all: CssClassData[] = nodeClasses(n)
    if (all.length == 1) {
      n = n.parent
      all = nodeClasses(n)
    }

    const classExists = tailwind.all.filter(c => c.className == className).length > 0
    const relevantIndex = all.findIndex((c: CssClassData) => c.className == className)
    if (relevantIndex > 0) {
      let min = relevantIndex - 10
      let max = relevantIndex + 10
      if (min < 0)
        min = 0
      if (max < 10)
        max = 10
      relevant = all.slice(min, max)
      if (currentTokenIndex > 0) {

        const lcr = ["left", "center", "right"]
        const nsizes = ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96", "auto", "px", "1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "1/5", "2/5", "3/5", "4/5", "1/6", "2/6", "3/6", "4/6", "5/6", "1/12", "2/12", "3/12", "4/12", "5/12", "6/12", "7/12", "8/12", "9/12", "10/12", "11/12"]
        const lsizes = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"]
        const colors = ["transparent", "current", "black", "white", "gray", "red", "yellow", "green", "blue", "indigo", "purple", "pink"]
        const currentToken = tokens[currentTokenIndex]
        const newRelevant = collection => {
          const prefix = tokens.slice(0, currentTokenIndex).join("-")
          const postfix = tokens.slice(currentTokenIndex + 1).join("-")
          const found = collection.map(c => prefix + '-' + c + (['transparent', 'current'].indexOf(c) < 0 && postfix ? '-' + postfix : ''))
          return tailwind.all.filter(c => {
            return found.indexOf(c.className) >= 0
          })
        }
        [lcr, colors, lsizes, nsizes].forEach(collection => {
          if (collection.indexOf(currentToken) >= 0)
            relevant = newRelevant(collection)
        })

      }
    } else if (!classExists && node.token != className && (node.token == '' || tokens[currentTokenIndex]?.length > 0)) {
      relevant = closestClasses
    } else {
      relevant = nodeTokens(n)
    }


    this.suggested = relevant.map((c: CssClassData, ci) => {
      const computed = this.computeRules(c.rules)
      let color = ''
      const vc = computed.filter(r => r.color)
      if (vc.length > 0)
        color = vc[0].color
      let valuePx = ''
      const vpx = computed.filter(r => r.valuePx)
      if (vpx.length > 0)
        valuePx = vpx[0].valuePx
      const tw = {
        twClass: c.className,
        color,
        valuePx,
        highlight: false
      }
      if (tw.twClass == className) {
        tw.highlight = true
        this.classIndex = ci
      }

      return tw
    })
  }

  updateClassHighlight(index = 0, c?: CssClassData, ci?: number) {
    this.classIndex += index
    this.suggested.forEach((c, i) => {
      delete c.highlight
    })
    if (this.suggested[this.classIndex]) {
      this.suggested[this.classIndex].highlight = true
    }
    return false
  }
}
</script>

<style scoped>

.rule-row {
  margin-top: 2px;
}

.square {
  width: 8px;
  height: 8px;
  display: inline-block;
  margin-right: 4px;
}

.rule {
  color: #ab00a1;
}

.tw-class {
  color: #818bff;
}

.tw-class.highlight {
  color: #0014db;
  text-shadow: 0 0 1px #818bff;
  font-weight: bold;
}

.rule-value {
  color: #0012c6;
}

.rule-comment {
  color: #006d1a;
}

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





