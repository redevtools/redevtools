<template>

  <div class="redevtool rdt-popup" ref="popup">


    <svg class="redevtool arrow-up" v-if="arrow == 'up'" ref="arrowUp"
         xmlns="http://www.w3.org/2000/svg"
         width="12"
         height="12"
         viewBox="0 0 24 24">
      <path
          d="M 0.73874272,24.038159 12.148213,12.628688 23.475601,23.956077 Z"/>
    </svg>
    <svg class="redevtool arrow-down" v-if="arrow == 'down'"
         xmlns="http://www.w3.org/2000/svg"
         width="12"
         height="12"
         viewBox="0 0 24 24">
      <path
          d="M 23.475601,-0.05505504 12.066131,11.354417 0.73874272,0.02702696 Z"/>
    </svg>

    <div class="redevtool rdt-popup-container">
      <slot></slot>
    </div>

  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  name: "tailwind-popup",
  props: {
    target: {target: HTMLElement}
  },
  emits: {}
})
export default class TailwindPopup extends Vue {

  $refs!: {
    popup: HTMLDivElement;
    arrowUp: HTMLDivElement;
  }

  arrow = 'up'

  target!: { target: HTMLElement }

  beforeUpdate() {
    this.updatePosition()
  }

  beforeMount() {
    this.updatePosition()
  }


  private updatePosition() {
    setTimeout(() => {
      const popup = this.$refs.popup
      const arrowUp = this.$refs.arrowUp
      arrowUp.style.left = `calc(50% - 6px)`
      const box = this.target.target.getBoundingClientRect()
      if (popup) {
        const popupBox = popup.getBoundingClientRect()
        let computed = box.left + box.width - Math.round(box.width / 2) - Math.round(popupBox.width / 2)
        const max = window.innerWidth - popupBox.width - 10
        const min = popupBox.width + 10
        if (computed > max) {
          computed = max
          arrowUp.style.left = `calc(80% - 6px)`
        }
        if (computed < min) {
          computed = 10
          arrowUp.style.left = `calc(20% - 6px)`
        }
        popup.style.left = computed + 'px'
        popup.style.top = (box.top + box.height + 12) + 'px'
      }
    })
  }
}
</script>

<style scoped>
.rdt-popup-container {
}

svg {
  position: absolute;
  top: -12px;
  left: calc(50% - 6px);
  pointer-events: none;
}

path {
  fill: white;
}

.rdt-popup {
  box-shadow: 0px 0px 12px 0px rgba(128, 128, 128, .5);
  background-color: white;
  width: 200px;
  min-height: 150px;
  position: fixed;
  border-radius: 4px;
  z-index: 10002;
}
</style>