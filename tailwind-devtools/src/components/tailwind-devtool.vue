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
      <tailwind-breadcrumb :target="inspected"
                           @breadcrumbTokenEnter="highlight($event)"
                           @breadcrumbTokenLeave="unHighlight()"
                           @breadcrumbUpdated="targetUpdated($event)"></tailwind-breadcrumb>
      <tailwind-classes-manager :inspect="inspected" @classUpdate="updatePopupPosition()"></tailwind-classes-manager>
    </tailwind-popup>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import TailwindPopup from "@/components/tailwind-popup.vue";
import TailwindClassesManager from "@/components/tailwind-classes-manager.vue";
import TailwindBreadcrumb from "@/components/tailwind-breadcrumb.vue";


function throttle<F extends ((...args: any[]) => any)>(
    func: F,
    wait: number
) {
  let timeout: number | null = null;
  let previous = 0;
  return function (..._arg) {
    const now = Date.now();

    const remaining = wait - (now - previous);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const context = this as unknown
    const args = _arg;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout as any);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(context, args);
      }, remaining);
    }
  };
}

declare global {
  interface Window {
    rdt_tailwind_options?: { enabled: boolean };
  }
}

@Options({
  name: "tailwind-devtool",
  props: {},
  emits: {
    inspect: {target: HTMLElement}
  },
  components: {TailwindPopup, TailwindClassesManager, TailwindBreadcrumb}
})
export default class TailwindDevtool extends Vue {
  private lastTarget!: HTMLElement;
  private inspected: { target: HTMLElement } | null = null;

  $refs!: {
    highlighter: HTMLElement;
    popup: HTMLElement;
    twpopup: TailwindPopup;
  }


  showHighlighter = false

  focused = false
  private enabled = false;

  beforeCreate() {

    setInterval(() => {
      if (window.rdt_tailwind_options)
        this.enabled = window.rdt_tailwind_options.enabled
    }, 100)

    const listener = (e: MouseEvent) => {
      if (this.enabled)
        this.unHighlight()
      this.findLastTarget(e)
      if (this.enabled) {
        this.highlightLatest()
      }
    }
    document.addEventListener("mouseover", listener)
    document.addEventListener("click", e => {
      const clickedInside = this.$refs.popup && this.$refs.popup.contains(e.target as any);
      if (!clickedInside) {
        this.focused = false
        this.inspected = null
      }
      if (this.showHighlighter && this.lastTarget) {
        this.inspected = null
        setTimeout(() => {
          this.$emit("inspect", {target: this.lastTarget})
          this.inspected = {target: this.lastTarget}
          this.enabled = false
          this.showHighlighter = false
          if (window.rdt_tailwind_options) {
            window.rdt_tailwind_options.enabled = false
          }
        })
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        return false
      }
    })
    const mousemove = throttle(e => {
      if (this.enabled) {
        if (!this.lastTarget)
          this.findLastTarget(e)
        this.highlightLatest()
      } else if (this.enabled)
        this.unHighlight()
    }, 50)
    document.addEventListener("mousemove", mousemove)

    document.addEventListener("keydown", e => {
      if (e.key == "Escape") {
        this.enabled = false
        this.unHighlight()
        this.hidePopup()
      } else {
        const tKey = e.key == "t"
        const notAnInput = ['INPUT', 'TEXTAREA'].indexOf(document.activeElement?.tagName ?? '') < 0
        const notEditable = (document.activeElement as any)?.contentEditable.toString() != "true"
        if (tKey && notAnInput && notEditable)
          this.enabled = !this.enabled
      }
      if (window.rdt_tailwind_options) {
        window.rdt_tailwind_options.enabled = this.enabled
      }
    })

  }

  private findLastTarget(e: MouseEvent) {
    try {
      if (e.target && (e.target as HTMLElement).className?.indexOf("redevtools") < 0) {
        this.lastTarget = e.target as any
      }
      // eslint-disable-next-line no-empty
    } catch {
    }
  }

  private updatePopupPosition() {
    this.$refs.twpopup.updatePosition()
  }

  private highlightLatest() {
    if (!this.showHighlighter && this.lastTarget) {
      this.showHighlighter = true
      this.highlight(this.lastTarget)
    }
  }

  private highlight(target) {
    this.showHighlighter = true
    const box = target?.getBoundingClientRect()
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

  targetUpdated(element: HTMLElement) {
    this.unHighlight()
    this.inspected = null
    setTimeout(() => {
      this.inspected = {target: element}
    })
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
