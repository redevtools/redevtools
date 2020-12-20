<template>

  <div class="suggested">
    <div class="tw-class-row" v-for="(t, index) in suggested" :key="t">
      <span class="tw-class" :class="{highlight: t.highlight}" @click.stop.prevent="suggest(t, index)">{{ t.twClass }}</span>
      <span v-if="t.color"
            class="square"
            :style="{backgroundColor: t.color}"></span>
      <span
          v-if="t.valuePx" class="rule-comment"> ({{ t.valuePx }})</span>
    </div>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {closest, computeRules, CssClassData, tokensTree} from "@/components/tailwind-classes-parser";
import {tailwind} from "@/components/tailwind.classes";

@Options({
  name: "tailwind-suggested-classes",
  props: {
    className: String,
    classNameUpToCaret: String
  },
  emits: {
    suggestion: {},
    seleted: {}
  }
})
export default class TailwindSuggestedClasses extends Vue {

  className!: string

  classNameUpToCaret!: string

  suggested: { twClass: string; valuePx?: string; color?: string; highlight?: boolean }[] = []

  private tokensTree: { token: string; children: string[]; tree: any; parent? } = tokensTree(tailwind.all)
  private classIndex = -1;

  mounted() {
    this.updateSuggested()
  }

  beforeUpdate() {
    this.updateSuggested()
  }

  private updateSuggested() {
    console.log("updateSuggested: ", this.classNameUpToCaret)
    this.suggested = []

    const className = this.className
    console.log("suggested -> className: ", className)
    const classNameUpToCaret = this.classNameUpToCaret
    const tokens = className.split("-").filter(t => t.length > 0)
    if (className == '') {
      this.suggested = ['text', 'w', 'h', 'p', 'm', 'font', 'cursor'].map(c => ({twClass: c}))
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
    const dashesBeforeCaret = classNameUpToCaret.split("").filter(c => c == '-').length
    let tokensToCompute = dashesBeforeCaret + 1
    const currentTokenIndex = dashesBeforeCaret
    if (classNameUpToCaret == "" && className == '')
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
      relevant = closest(className)
    } else {
      relevant = nodeTokens(n)
    }

    this.classIndex = -1
    this.suggested = relevant.map((c: CssClassData, ci) => {
      const computed = computeRules(c.rules)
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
        valuePx
      }
      if (tw.twClass == className) {
        this.classIndex = ci
      }

      return tw
    })
    this.updateClassHighlight()
  }

  updateClassHighlight() {
    if (this.suggested[this.classIndex]) {
      this.suggested[this.classIndex].highlight = true
      const newClass = this.suggested[this.classIndex].twClass
      this.$emit("suggestion", {
        className: newClass,
        classes: this.suggested.map(s => ({className: s.twClass})),
        index: this.classIndex
      })
    } else {
      this.$emit("suggestion", {
        className: '',
        classes: this.suggested.map(s => ({className: s.twClass})),
        index: -1
      })

    }
  }

  suggest(t: { twClass: string }, index: number) {
    this.classIndex = index
    this.$emit("selected", {
      className: this.suggested[this.classIndex].twClass,
      classes: this.suggested.map(s => ({className: s.twClass})),
      index: this.classIndex
    })
    this.updateClassHighlight()
  }


}

export interface TailwindSuggestedEvent {
  className: string;
  classes: { className: string }[];
  index: number;
}

</script>

<style scoped>

.square {
  width: 8px;
  height: 8px;
  display: inline-block;
  margin-right: 4px;
}

.tw-class {
  color: #818bff;
  cursor: pointer;
}

.tw-class.highlight {
  color: #0014db;
  text-shadow: 0 0 1px #818bff;
  font-weight: bold;
}

</style>





