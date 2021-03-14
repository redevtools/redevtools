<template>

  <div class="redevtool classes-manager" ref="tokens">

    <div class="classes-container">
      <tailwind-element-classes :classes="classes" @update="onTokensUpdate" ref="inputs"></tailwind-element-classes>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" title="Copy classes" @click="copyClasses">
        <path d="M17 7h6v16h-16v-6h-6v-16h16v6zm5 1h-14v14h14v-14zm-6-1v-5h-14v14h5v-9h9z"/>
      </svg>
    </div>

    <hr/>

    <tailwind-class-rules :className="activeClass"></tailwind-class-rules>

    <hr/>


    <tailwind-suggested-classes
        :className="activeClass"
        :classNameUpToCaret="classNameUpToCaret"
        @suggestion="onSuggested"
        @selected="onSelected"
    ></tailwind-suggested-classes>


  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {tailwind} from "@/components/tailwind.classes";
import {CssClassData} from "@/components/tailwind-classes-parser";
import TailwindElementClasses, {TokensUpdateEvent} from "@/components/tailwind-element-classes.vue";
import TailwindClassRules from "@/components/tailwind-class-rules.vue";
import TailwindSuggestedClasses, {TailwindSuggestedEvent} from "@/components/tailwind-suggested-classes.vue";


export function copyToClipboard(text: string) {
  if (!navigator.clipboard) {
    console.log("cannot copy sice navigator clipboard does not exists. Which browser are you using?")
    return;
  }
  navigator.clipboard.writeText(text).then(function () {
    console.log('Clipboard: ' + text);
  }, function (err) {
    console.error('Could not copy text to clipboard: ', err);
  });
}


@Options({
  name: "tailwind-classes-manager",
  props: {
    inspect: {target: HTMLElement}
  },
  emits: {
    classUpdate: {}
  },
  components: {TailwindElementClasses, TailwindClassRules, TailwindSuggestedClasses}
})
export default class TailwindClassesManager extends Vue {

  inspect!: { target: HTMLElement }

  classes: CssClassData[] = []

  activeClass = ''
  classNameUpToCaret = '';

  $refs!: {
    inputs: TailwindElementClasses;
  }

  private suggestion: TailwindSuggestedEvent = {classes: [], className: '', index: 0};
  private tokenIndex = 0;

  mounted() {
    this.updateClasses();
  }

  private updateClasses() {
    let className = this.inspect.target?.className ?? ''
    if (this.isSvgTag(this.inspect.target?.tagName?.toLowerCase())) {
      className = this.inspect.target?.getAttribute("class") ?? ''
    }
    if (className && className.split) { //svg may have className that is not a list
      const classes = className.split(" ")
      this.classes = classes.filter(c => c.length > 0).map(c => {
        const foundRules = tailwind.all.filter(t => t.className == c)
        return foundRules[0] ?? {className: c, rules: ''}
      }).filter(c => c)
    }
  }

  private isSvgTag(tag: string) {
    return ["path",
      "animate",
      "animateMotion",
      "animateTransform",
      "circle",
      "clipPath",
      "color-profile",
      "defs",
      "desc",
      "discard",
      "ellipse",
      "feBlend",
      "feColorMatrix",
      "feComponentTransfer",
      "feComposite",
      "feConvolveMatrix",
      "feDiffuseLighting",
      "feDisplacementMap",
      "feDistantLight",
      "feDropShadow",
      "feFlood",
      "feFuncA",
      "feFuncB",
      "feFuncG",
      "feFuncR",
      "feGaussianBlur",
      "feImage",
      "feMerge",
      "feMergeNode",
      "feMorphology",
      "feOffset",
      "fePointLight",
      "feSpecularLighting",
      "feSpotLight",
      "feTile",
      "feTurbulence",
      "filter",
      "foreignObject",
      "g",
      "hatch",
      "hatchpath",
      "image",
      "line",
      "linearGradient",
      "marker",
      "mask",
      "mesh",
      "meshgradient",
      "meshpatch",
      "meshrow",
      "metadata",
      "mpath",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "radialGradient",
      "rect",
      "script",
      "set",
      "solidcolor",
      "stop",
      "style",
      "svg",
      "switch",
      "symbol",
      "text",
      "textPath",
      "title",
      "tspan",
      "unknown",
      "use",
      "view"].indexOf(tag) >= 0
  }


  private onTokensUpdate(event: TokensUpdateEvent) {
    this.tokenIndex = event.index
    if (event.lastKey == "Enter") {
      this.$refs.inputs?.moveToLastInput()
    } else if (event.lastKey == "ArrowUp" || event.lastKey == "ArrowDown") {
      this.updateClassesWithNewSuggestion(event);
    } else if (event.lastKey != "ArrowLeft" && event.lastKey != "ArrowRight") {
      this.updateActiveClassRules(event);
    } else
      this.updateActiveClassRules(event);
    this.$emit("classUpdate")
  }

  private updateActiveClassRules(event: TokensUpdateEvent) {
    this.inspect.target.setAttribute("class", event.values.join(" "))
    this.activeClass = event.value;
    this.classNameUpToCaret = event.valueUpToCaret
  }

  private updateClassesWithNewSuggestion(event: TokensUpdateEvent) {
    const indexIncrement = event.lastKey == "ArrowDown" ? 1 : -1
    const newIndex = this.suggestion.index + indexIncrement
    const newClass = this.suggestion.classes[newIndex]
    if (newClass) {
      this.updateSuggestion(newClass, event.value)
      this.activeClass = newClass.className
      this.classNameUpToCaret = newClass.className
    }
  }

  private updateInputWithNewClass(newClass: string) {
    const classes = (this.inspect.target.getAttribute("class") ?? '').split(" ")
    if (classes[this.tokenIndex]) {
      classes[this.tokenIndex] = newClass
      this.inspect.target.setAttribute("class", classes.join(" "))
    } else
      this.inspect.target.setAttribute("class", classes.join(" ") + " " + newClass)

  }

  private onSuggested(suggestion: TailwindSuggestedEvent) {
    this.updateClasses()
    if (suggestion.className)
      this.activeClass = suggestion.className
    this.suggestion = suggestion
  }

  private onSelected(suggestion: TailwindSuggestedEvent) {
    this.updateSuggestion(suggestion);
  }

  private updateSuggestion(suggestion: Partial<TailwindSuggestedEvent>, value?: string) {
    if (suggestion.presets) {
      let indexOfClassName = this.classes.findIndex(c => c.className == value)
      if (indexOfClassName == -1)
        indexOfClassName = this.classes.length - 1
      const classes = this.classes.slice(0, indexOfClassName).map(c => c.className)
      const presets = suggestion.presets.split(" ").filter(p => classes.indexOf(p) < 0)
      this.inspect.target.className = [...classes, suggestion.className, ...presets].join(" ")
      this.tokenIndex = this.classes.map(c => c.className).length
      if (this.tokenIndex < 0)
        this.tokenIndex = 0
      this.updateClasses()
    } else if (suggestion.className)
      this.updateInputWithNewClass(suggestion.className)
  }

  private copyClasses() {
    copyToClipboard(this.classes.map(c => c.className).filter(c => !c.startsWith("ng-")).join(" "))
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

.classes-container {
  position: relative;
}

.classes-container svg {
  position: absolute;
  right: 0;
  top: 0;
  width: 12px;
  height: 12px;
  cursor: pointer;
}

.classes-container svg path {
  fill: #1a1a1a;
}

hr {
  margin-top: 5px;
  margin-bottom: 5px;
}

</style>





