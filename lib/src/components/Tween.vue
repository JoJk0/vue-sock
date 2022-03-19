<template>
  <slot />
</template>
<script lang="ts" setup>
import { onMounted, ref, useSlots, watch, defineExpose } from 'vue'
import gsap from 'gsap'
import { TweenEmits, TweenProps } from '@/types';
import { methods } from '../utils';

const props = defineProps({
  from: {
    type: Object,
    default: undefined,
  },
  to: {
    type: Object,
    default: undefined,
  },
  callbackScope: {
    type: Object,
    default: undefined,
  },
  data: {
    type: Object,
    default: undefined,
  },
  duration: {
    type: Number,
    default: 0.5,
  },
  delay: {
    type: Number,
    default: 0,
  },
  ease: {
    type: [String, Function],
    default: "power1.out",
  },
  endArray: {
    type: Array,
    default: undefined,
  },  
  id: {
    type: [String, Number],
    default: undefined,
  },
  inherit: {
    type: Boolean,
    default: false,
  },
  immediateRender: {
    type: Boolean,
    default: false,
  },
  lazy: {
    type: Boolean,
    default: true,
  },
  keyframes: {
    type: [Object, Array],
    default: undefined,
  },
  overwrite: {
    type: [Boolean, String],
    default: false,
  },  
  paused: {
    type: Boolean,
    default: false,
  },
  repeat: {
    type: Number,
    default: 0,
  },
  repeatDelay: {
    type: Number,
    default: 0,
  },
  repeatRefresh: {
    type: Boolean,
    default: false,
  },
  reversed: {
    type: Boolean,
    default: false,
  },
  runBackwards: {
    type: Boolean,
    default: false,
  },  
  stagger: {
    type: [Number, Object, Function],
    default: 0,
  },
  startAt: {
    type: Object,
    default: undefined,
  },  
  yoyo: {
    type: Boolean,
    default: false,
  },
  yoyoEase: {
    type: [Boolean, String, Function],
    default: false,
  }
} as TweenProps)

const emit = defineEmits({
  complete: e => e,
  interrupt: e => e,
  repeat: e => e,
  reverseComplete: e => e,
  start: e => e,
  update: e => e,
} as TweenEmits)

const slots = useSlots()

const tween = ref<gsap.core.Tween>()

defineExpose(methods(tween.value!))

onMounted(() => {
  const slotContent = slots.default ? (slots.default()).length > 1 ? (slots.default()).map(slot => slot.el) : slots.default()[0].el : null
  
  if (slotContent) {

    tween.value = props.from && props.to
      ? gsap.fromTo(slotContent, { ...props.from }, { ...props })
      : props.from
        ? gsap.from(slotContent, { ...props })
        : props.to
          ? gsap.to(slotContent, { ...props })
          : undefined

    if (!tween.value){
      console.error('vue-sock: Tween not specified')
      return;}

    tween.value.eventCallback('onComplete', () => emit('complete', tween.value))
    tween.value.eventCallback('onRepeat', () => emit('repeat', tween.value))
    tween.value.eventCallback('onReverseComplete', () => emit('reverseComplete', tween.value))
    tween.value.eventCallback('onStart', () => emit('start', tween.value))
    tween.value.eventCallback('onUpdate', () => emit('update', tween.value))
    tween.value.eventCallback('onInterrupt', () => emit('interrupt', tween.value))
  }
  else {
    console.error('vue-sock: Tween: No content found')
  }
})

watch(() => props.paused, val => tween.value && val ? tween.value.paused(val) : undefined)
watch(() => props.reversed, val => tween.value && val ? tween.value.reversed(val) : undefined)
watch(() => props.repeat, val => tween.value && val ? tween.value.repeat(val) : undefined)
watch(() => props.repeatDelay, val => tween.value && val ? tween.value.repeatDelay(val) : undefined)
watch(() => props.repeatRefresh, val => tween.value && val ? tween.value.vars.repeatRefresh = val : undefined)
watch(() => props.yoyo, val => tween.value && val ? tween.value.yoyo(val) : undefined)
watch(() => props.yoyoEase, val => tween.value && val ? tween.value.vars.yoyoEase = val : undefined)
watch(() => props.duration, val => tween.value && val ? tween.value.vars.duration = val : undefined)
watch(() => props.delay, val => tween.value && val ? tween.value.vars.delay = val : undefined)
watch(() => props.ease, val => tween.value && val ? tween.value.vars.ease = val : undefined)
watch(() => props.endArray, val => tween.value && val ? tween.value.vars.endArray = val : undefined)
watch(() => props.immediateRender, val => tween.value && val ? tween.value.vars.immediateRender = val : undefined)
watch(() => props.lazy, val => tween.value && val ? tween.value.vars.lazy = val : undefined)
watch(() => props.keyframes, val => tween.value && val ? tween.value.vars.keyframes = val : undefined)
watch(() => props.overwrite, val => tween.value && val ? tween.value.vars.overwrite = val : undefined)
watch(() => props.runBackwards, val => tween.value && val ? tween.value.vars.runBackwards = val : undefined)
watch(() => props.startAt, val => tween.value && val ? tween.value.vars.startAt = val : undefined)
watch(() => props.callbackScope, val => tween.value && val ? tween.value.vars.callbackScope = val : undefined)
watch(() => props.data, val => tween.value && val ? tween.value.vars.data = val : undefined)
watch(() => props.stagger, val => tween.value && val ? tween.value.vars.stagger = val : undefined)

const slotProps = slots.default ? slots.default()[0].props : null
</script>
