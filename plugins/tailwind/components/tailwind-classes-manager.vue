<template>

  <div class="redevtool classes-manager" ref="tokens">

    <div class="classes-container">
      <tailwind-element-classes :classes="classes" @update="onTokensUpdate"></tailwind-element-classes>
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
    updated: {}
  },
  components: {TailwindElementClasses, TailwindClassRules, TailwindSuggestedClasses}
})
export default class TailwindClassesManager extends Vue {

  inspect!: { target: HTMLElement }

  classes: CssClassData[] = []

  activeClass = ''
  classNameUpToCaret = '';

  private suggestion: TailwindSuggestedEvent = {classes: [], className: '', index: 0};

  mounted() {
    this.updateClasses();
  }

  private updateClasses() {
    const className = this.inspect.target?.className
    if (className) {
      const classes = className.split(" ")
      this.classes = classes.filter(c => c.length > 0).map(c => {
        const foundRules = tailwind.all.filter(t => t.className == c)
        return foundRules[0] ?? {className: c, rules: ''}
      }).filter(c => c)
    }
  }


  private onTokensUpdate(event: TokensUpdateEvent) {
    console.log("onTokensUpdate: ", event, this.$refs.suggester)
    if (event.lastKey == "ArrowUp" || event.lastKey == "ArrowDown") {
      const indexIncrement = event.lastKey == "ArrowDown" ? 1 : -1
      const newIndex = this.suggestion.index + indexIncrement
      const newClass = this.suggestion.classes[newIndex]
      if (newClass) {
        this.updateInputWithNewClass(event.value, newClass.className)
        this.activeClass = newClass.className
        this.classNameUpToCaret = event.valueUpToCaret
      }
    } else {
      this.inspect.target.className = event.values.join(" ")
      this.activeClass = event.value;
      this.classNameUpToCaret = event.valueUpToCaret
    }
    this.$emit("updated")
  }

  private updateInputWithNewClass(oldClass: string, newClass: string) {
    this.inspect.target.className = this.inspect.target.className.replace(oldClass, newClass)
  }

  private onSuggested(suggestion: TailwindSuggestedEvent) {
    this.updateClasses()
    if (suggestion.className)
      this.activeClass = suggestion.className
    this.suggestion = suggestion
  }

  private onSelected(suggestion: TailwindSuggestedEvent) {
    this.updateInputWithNewClass(this.activeClass, suggestion.className)
  }

  private copyClasses() {
    copyToClipboard(this.classes.map(c => c.className).join(" "))
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
  width: 16px;
  height: 16px;
  cursor: pointer;
  padding: 4px;
}

.classes-container svg path {
  fill: #1a1a1a;
}

</style>





