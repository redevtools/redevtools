<template>

  <div class="redevtool rdt-breadcrumb mx-2" v-if="target">
    <div class="inline-flex text-xs" v-for="(c, index) in breadcrumb"
         :key="c">
      <div @click="$emit('breadcrumbUpdated', c.element)"
           @mouseenter="$emit('breadcrumbTokenEnter', c.element)"
           @mouseleave="$emit('breadcrumbTokenLeave', c.element)"
           class=" cursor-pointer text-blue-300 hover:text-blue-400"
           :class="{'text-blue-500': c.element == target.target, 'text-bold': c.element == target.target}"
           :title="' → '+(c.element.className || '')">
        {{ c.element.tagName.toLowerCase() }}
      </div>
      <span class="inline mx-1" v-if="index < breadcrumb.length - 1 && !c.child">&rarr;</span>
      <span class="inline" v-if="index < breadcrumb.length - 1 && c.child">,</span>
    </div>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  name: "tailwind-breadcrumb",
  props: {
    target: {target: HTMLElement}
  },
  emits: {
    breadcrumbUpdated: {}, breadcrumbTokenEnter: {}, breadcrumbTokenLeave: {}
  }
})
export default class TailwindBreadcrumb extends Vue {

  target!: { target: HTMLElement }
  private breadcrumb: { element: HTMLElement; child: boolean }[] = []

  beforeMount() {
    this.updateBreadCrumb()
  }

  beforeUpdate() {
    this.updateBreadCrumb()
  }


  private updateBreadCrumb() {
    const current = this.target.target
    let parent
    if (current.tagName != "BODY")
      parent = current.parentElement
    let parentParent
    if (parent && parent.tagName != "BODY")
      parentParent = parent.parentElement
    const breadcrumb = [parentParent, parent, current].filter(c => c).map(c => ({element: c, child: false}))
    for(let i = 0; i < current.children.length; i++)
      breadcrumb.push({element: current.children.item(i), child: true})
    this.breadcrumb = breadcrumb
  }
}
</script>

<style scoped>
.current {
  font-weight: bold;
}
</style>