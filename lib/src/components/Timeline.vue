<template>
  <slot />
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import { onMounted, useSlots } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  start: {
    type: [String, Number, Function] as PropType<ScrollTrigger.Vars['start']>,
    default: null,
  },
  end: {
    type: [String, Number, Function] as PropType<ScrollTrigger.Vars['end']>,
    default: null,
  },
  scrub: {
    type: [Number, Boolean] as PropType<ScrollTrigger.Vars['scrub']>,
    default: null,
  },
  markers: {
    type: [Boolean, Object] as PropType<ScrollTrigger.Vars['markers']>,
    default: false,
  },
})

const slots = useSlots()

onMounted(() => {
  const slotEls = slots.default ? slots.default().map(slot => slot.el) : null

  if (slotEls && slotEls.length) {
    const { start, end, scrub, markers } = props

    const scrollTrigger = {
      ...props,
    }
  }
  else {
    console.error('vue-sock: ScrollTrigger: No content found')
  }
})

</script>
