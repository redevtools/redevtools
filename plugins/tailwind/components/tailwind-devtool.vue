<template>
  <div class="redevtools rdt-highlighter" v-if="showHighlighter" ref="highlighter">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24">
      <path
          d="m 11.901966,4.8952091 c -3.1287063,0 -5.084148,1.5643534 -5.8663247,4.6930601 1.173265,-1.5643534 2.5420742,-2.1509859 4.1064277,-1.7598976 0.89255,0.2229204 1.530459,0.8708234 2.236591,1.5873842 1.150234,1.1676162 2.481672,2.5190432 5.389632,2.5190432 3.128706,0 5.084148,-1.564353 5.866325,-4.6930599 C 22.461352,8.8060925 21.092542,9.392725 19.528189,9.0016367 18.635639,8.7787163 17.99773,8.1308133 17.291598,7.4142526 16.141364,6.2466366 14.809925,4.8952091 11.901966,4.8952091 Z M 6.0356413,11.934799 c -3.1287067,0 -5.0841484,1.564354 -5.86632508,4.69306 1.17326498,-1.564353 2.54207418,-2.150986 4.10642758,-1.759897 0.8925505,0.223355 1.530459,0.870823 2.2365908,1.587384 1.1502342,1.167616 2.4816727,2.519043 5.3896314,2.519043 3.128707,0 5.084149,-1.564353 5.866326,-4.69306 -1.173266,1.564354 -2.542075,2.150986 -4.106428,1.759898 -0.892551,-0.222921 -1.530459,-0.870824 -2.236591,-1.587384 -1.150234,-1.167616 -2.4816726,-2.519044 -5.3896317,-2.519044 z"/>
    </svg>
  </div>

  <div ref="popup">
    <tailwind-popup v-if="inspected" :target="inspected" @mouseleave="hidePopup" @mousedown="setFocused" ref="twpopup">
      <tailwind-classes-manager :inspect="inspected" @updated="updatePopupPosition()"></tailwind-classes-manager>
    </tailwind-popup>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import TailwindPopup from "@/components/tailwind-popup.vue";
import TailwindClassesManager from "@/components/tailwind-classes-manager.vue";


@Options({
  name: "tailwind-devtool",
  props: {},
  emits: {
    inspect: {target: HTMLElement}
  },
  components: {TailwindPopup, TailwindClassesManager}
})
export default class TailwindDevtool extends Vue {
  private lastTarget: HTMLElement | null = null;
  private inspected: { target: HTMLElement } | null = null;

  $refs!: {
    highlighter: HTMLElement;
    popup: HTMLElement;
    twpopup: TailwindPopup;
  }


  showHighlighter = false

  focused = false

  beforeCreate() {
    const listener = (e: MouseEvent) => {
      this.unHighlight()
      if (e.target && (e.target as HTMLElement).className?.indexOf("redevtools") < 0) {
        this.lastTarget = e.target as any
      }
      if (e.ctrlKey) {
        this.highlightLatest()
      }
    }
    document.addEventListener("mouseover", listener)
    document.addEventListener("click", e => {
      const clickedInside = this.$refs.popup.contains(e.target as any);
      if (!clickedInside) {
        this.focused = false
        this.inspected = null
      }
      if (this.showHighlighter && this.lastTarget) {
        this.$emit("inspect", {target: this.lastTarget})
        this.inspected = {target: this.lastTarget}
      }
    })
    document.addEventListener("mousemove", e => {
      if (e.ctrlKey)
        this.highlightLatest()
      else
        this.unHighlight()
    })

  }

  private updatePopupPosition(){
    this.$refs.twpopup.updatePosition()
  }

  private highlightLatest() {
    if (!this.showHighlighter && this.lastTarget) {
      this.showHighlighter = true
      const box = this.lastTarget?.getBoundingClientRect()
      if (box) {
        setTimeout(() => {
          const highlighter = this.$refs.highlighter
          if (highlighter) {
            highlighter.style.width = box.width + 'px'
            highlighter.style.height = box.height + 'px'
            highlighter.style.top = box.top + 'px'
            highlighter.style.left = box.left + 'px'
          }
        })
      }

    }
  }

  private unHighlight() {
    this.showHighlighter = false
    delete this.lastTarget
  }

  private hidePopup() {
    if (!this.focused) {
      this.inspected = null
    }
  }

  private setFocused() {
    this.focused = true
  }
}
</script>

<style scoped>

svg {
  opacity: .6;
}

path {
  fill: #06b6d4;
}

.rdt-highlighter {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 10001;
  pointer-events: none;
  background-color: rgba(6, 182, 212, .3);
}
</style>
