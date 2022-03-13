<template>
  <slot />
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import { onMounted, useSlots } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  from: {
    type: Object as PropType<Parameters<typeof gsap.from>['2']>,
    default: null,
  },
  to: {
    type: Object as PropType<Parameters<typeof gsap.to>['2']>,
    default: null,
  },
  duration: {
    type: Number as PropType<gsap.TweenVars['duration']>,
    default: 1,
  },
  delay: {
    type: Number as PropType<gsap.TweenVars['delay']>,
    default: 0,
  },
  ease: {
    type: [String, Function] as PropType<gsap.TweenVars['ease']>,
    default: null,
  },
  repeat: {
    type: Number,
    default: 0,
  },
  repeatDelay: {
    type: Number,
    default: 0,
  },
  yoyo: {
    type: Boolean as PropType<gsap.TweenVars['yoyo']>,
    default: false,
  },
  stagger: {
    type: [Number, Object, Function] as PropType<gsap.TweenVars['stagger']>,
    default: 0,
  },
})

const slots = useSlots()

onMounted(() => {
  const slotContent = slots.default ? (slots.default()).length > 1 ? (slots.default()).map(slot => slot.el) : slots.default()[0].el : null

  if (slotContent) {
    const { from, to, duration, delay, ease, repeat, repeatDelay, yoyo, stagger } = props

    const tween = from && to
      ? gsap.fromTo(slotContent, { ...from }, { ...to, duration, delay, ease, repeat, repeatDelay, yoyo, stagger })
      : from
        ? gsap.from(slotContent, { ...from, duration, delay, ease, repeat, repeatDelay, yoyo, stagger })
        : to
          ? gsap.to(slotContent, { ...to, duration, delay, ease, repeat, repeatDelay, yoyo, stagger })
          : null

    if (!tween)
      console.error('vue-sock: Tween not specified')
  }
  else {
    console.error('vue-sock: Tween: No content found')
  }
})

const slotProps = slots.default ? slots.default()[0].props : null
</script>
