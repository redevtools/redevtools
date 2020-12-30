<template>

  <div class="suggested">
    <div class="tw-class-row" v-for="(t, index) in suggested" :key="t">
      <span class="tw-class" :class="{highlight: t.highlight}" @click.stop.prevent="suggest(t, index)">{{
          t.twClass
        }}</span>
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
import {SuggesterWithPresets} from "@/components/presets";
import {TwSuggestedClass} from "@/components/suggester";

@Options({
  name: "tailwind-suggested-classes",
  props: {
    className: String,
    classNameUpToCaret: String
  },
  emits: {
    suggestion: {},
    selected: {}
  }
})
export default class TailwindSuggestedClasses extends Vue {

  className!: string

  classNameUpToCaret!: string

  suggested: (TwSuggestedClass & { highlight?: boolean })[] = []

  private classIndex = -1;

  mounted() {
    this.updateSuggested()
  }

  beforeUpdate() {
    this.updateSuggested()
  }

  private updateSuggested() {
    this.suggested = []

    this.suggested = new SuggesterWithPresets().suggest(this.className, this.classNameUpToCaret)

    this.classIndex = -1

    this.suggested.forEach((s, ci) => {
      if (s.twClass == this.className) {
        this.classIndex = ci
      }
    })

    this.updateClassHighlight()
  }

  updateClassHighlight() {
    let se: TailwindSuggestedEvent = {
      className: '',
      classes: this.suggested.map(s => ({className: s.twClass, presets: s.presets ?? ''})),
      index: -1
    }
    if (this.suggested[this.classIndex]) {
      this.suggested[this.classIndex].highlight = true
      const newClass = this.suggested[this.classIndex].twClass
      se = {
        className: newClass,
        classes: this.suggested.map(s => ({className: s.twClass, presets: s.presets ?? ''})),
        presets: this.suggested[this.classIndex].presets ?? '',
        index: this.classIndex
      }
    }
    this.$emit("suggestion", se)

  }

  suggest(t: TwSuggestedClass[], index: number) {
    this.classIndex = index
    this.$emit("selected", {
      className: this.suggested[this.classIndex].twClass,
      classes: this.suggested.map(s => ({className: s.twClass, presets: s.presets ?? ''})),
      presets: this.suggested[this.classIndex].presets ?? '',
      index: this.classIndex
    })
    this.updateClassHighlight()
  }


}


export interface TailwindSuggestedEvent {
  className: string;
  classes: { className: string, presets?: string }[];
  index: number;
  presets?: string;
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





