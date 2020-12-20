<template>

  <div class="active-rules">
    <div class="rule-row" v-for="r in activeRules" :key="r">
      <span v-if="r.color" class="square" :style="{backgroundColor: r.color}"></span>
      <span class="rule">{{ r.rule }}</span>:
      <span class="rule-value">{{ r.value }}</span>;
      <span v-if="r.valuePx" class="rule-comment"> // {{ r.valuePx }}</span>
    </div>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {computeRules} from "@/components/tailwind-classes-parser";

@Options({
  name: "tailwind-class-rules",
  props: {
    className: String
  },
  emits: {
    update: {}
  }
})
export default class TailwindClassRules extends Vue {

  className!: string

  private activeRules: { rule: string; value: string; valuePx: string; color: string }[] = []

  mounted() {
    this.updateClassRules()
  }

  beforeUpdate() {
    this.updateClassRules()
  }

  private updateClassRules() {
    this.activeRules = computeRules(this.className)
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

.rule-value {
  color: #0012c6;
}

.rule-comment {
  color: #006d1a;
}

</style>





