<template>
  <div :class="config.tweenClassName" ref="targetsContainerEl">
    <component v-for="vNode of targetsVNodes" :key="vNode.toString()" :is="vNode" />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, useSlots, watch, defineExpose, computed, getCurrentInstance, onUnmounted } from 'vue'
import { TweenState, TweenEmits, TweenProps } from '@/types';
import { getElementFromScopedComponent } from '../utils';
import { config, createTween } from '../utils';
import { useInputTargets } from '@/composables/useInputTargets';


const props = defineProps({
  target: {
    type: [Object, String],
    default: undefined,
  },
  targets: {
    type: Array,
    default: undefined,
  },
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
    default: undefined,
  },
  immediateRender: {
    type: Boolean,
    default: undefined,
  },
  lazy: {
    type: Boolean,
    default: undefined,
  },
  keyframes: {
    type: [Object, Array],
    default: undefined,
  },
  overwrite: {
    type: [Boolean, String],
    default: undefined,
  },
  paused: {
    type: Boolean,
    default: undefined,
  },
  progress: {
    type: Number,
    default: undefined,
  },
  repeat: {
    type: Number,
    default: undefined,
  },
  repeatDelay: {
    type: Number,
    default: undefined,
  },
  repeatRefresh: {
    type: Boolean,
    default: undefined,
  },
  reversed: {
    type: Boolean,
    default: undefined,
  },
  runBackwards: {
    type: Boolean,
    default: undefined,
  },
  stagger: {
    type: [Number, Object, Function],
    default: undefined,
  },
  startAt: {
    type: Object,
    default: undefined,
  },
  yoyo: {
    type: Boolean,
    default: undefined,
  },
  yoyoEase: {
    type: [Boolean, String, Function],
    default: undefined,
  },
  position: {
    type: [Number, String],
    default: undefined,
  },
  scrollTrigger: {
    type: Object,
    default: undefined,
  }
} as TweenProps)

const emit = defineEmits({
  complete: e => e,
  interrupt: e => e,
  repeat: e => e,
  reverseComplete: e => e,
  start: e => e,
  update: e => e,

  // progressChange: Number,
  pausedChange: Boolean,
  reversedChange: Boolean,
  ready: e => e,
  destroyed: e => e,
} as TweenEmits)

const slots = useSlots()

const tween = ref<gsap.core.Tween>()

const targetsVNodes = computed(() => slots.default ? slots.default() : [])

const targetsContainerEl = ref<Element>()

const instance = getCurrentInstance()

// const { inputTargets } = useInputTargets({
//   allowedInputTypes: {
//     'slots': ['target', 'targets'],
//     'props': ['target', 'targets'],
//   },
//   sources: {
//     slots,
//     props
//   }
// })

// const timeline = instance?.parent?.exposed?.timeline as Ref<gsap.core.Timeline | undefined>;

// const isInTimeline = computed(() => instance?.parent?.vnode?.el?.className === config.timelineClassName)

const targets = computed(() => {
  if (props.target) {
    if (typeof props.target === 'string') {
      if (!instance) return [];
      const el = getElementFromScopedComponent(props.target, instance)
      if (!el) return [];
      return [el]
    } else {
      return [props.target]
    }
  } else if (props.targets) {
    return props.targets.map(target => {
      if (typeof target === 'string') {
        if (!instance) return;
        const el = getElementFromScopedComponent(target, instance)
        if (!el) return;
        return el
      } else {
        return target
      }
    }).filter(target => target !== undefined) as Element[]
  } else {
    return targetsContainerEl.value ? Array.from(targetsContainerEl.value.children) : []
  }
})

const state: TweenState = {
  progress: computed({
    get: () => tween.value?.progress(),
    set: (v) => { console.log('progress set', v); v ? tween.value?.progress(v) : undefined }
  }),
  yoyo: computed({
    get: () => tween.value?.yoyo(),
    set: (v) => v ? tween.value?.yoyo(v) : undefined
  }),
  totalTime: computed({
    get: () => tween.value?.totalTime(),
    set: (v) => v ? tween.value?.totalTime(v) : undefined
  }),
  totalProgress: computed({
    get: () => tween.value?.totalProgress(),
    set: (v) => v ? tween.value?.totalProgress(v) : undefined
  }),
  totalDuration: computed({
    get: () => tween.value?.progress(),
    set: (v) => v ? tween.value?.progress(v) : undefined
  }),
  timeScale: computed({
    get: () => tween.value?.timeScale(),
    set: (v) => v ? tween.value?.timeScale(v) : undefined
  }),
  time: computed({
    get: () => tween.value?.time(),
    set: (v) => v ? tween.value?.time(v) : undefined
  }),
  startTime: computed({
    get: () => tween.value?.startTime(),
    set: (v) => v ? tween.value?.startTime(v) : undefined
  }),
  reversed: computed({
    get: () => tween.value?.reversed(),
    set: (v) => v ? tween.value?.reversed(v) : undefined
  }),
  repeatDelay: computed({
    get: () => tween.value?.repeatDelay(),
    set: (v) => v ? tween.value?.repeatDelay(v) : undefined
  }),
  repeat: computed({
    get: () => tween.value?.repeat(),
    set: (v) => v ? tween.value?.repeat(v) : undefined
  }),
  paused: computed({
    get: () => tween.value?.paused(),
    set: (v) => v ? tween.value?.paused(v) : undefined
  }),
  iteration: computed({
    get: () => tween.value?.iteration(),
    set: (v) => v ? tween.value?.iteration(v) : undefined
  }),
  isActive: computed(() => tween.value?.isActive()),
  duration: computed({
    get: () => tween.value?.duration(),
    set: (v) => v ? tween.value?.duration(v) : undefined
  }),
  delay: computed({
    get: () => tween.value?.delay(),
    set: (v) => v ? tween.value?.delay(v) : undefined
  }),
}


defineExpose({ tween, targets })

onMounted(async () => {
  // const slotContent = slots.default ? (slots.default()).length > 1 ? (slots.default()).map(slot => slot.el) : slots.default()[0].el : null

  if (targetsContainerEl.value) {

    tween.value = createTween(targets.value, props)

    if (!tween.value) {
      console.error('vue-sock: Tween not specified')
      return;
    }

    emit('ready', { animation: tween.value, position: props.position })

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

watch(() => props.paused, val => {
  if (tween.value && val !== undefined)
    if (val === true) tween.value.pause()
    else {
      if (tween.value.progress() === 0)
        tween.value.resume(0)
      else if (tween.value.progress() === 1)
        tween.value.restart()
      else {
        tween.value.resume()
      }
    }
})
watch(() => props.reversed, val => tween.value && val !== undefined ? tween.value.reversed(val) : undefined)
watch(() => props.repeat, val => tween.value && val !== undefined ? tween.value.repeat(val) : undefined)
watch(() => props.repeatDelay, val => tween.value && val !== undefined ? tween.value.repeatDelay(val) : undefined)
watch(() => props.repeatRefresh, val => tween.value && val !== undefined ? tween.value.vars.repeatRefresh = val : undefined)
watch(() => props.yoyo, val => tween.value && val !== undefined ? tween.value.yoyo(val) : undefined)
watch(() => props.yoyoEase, val => tween.value && val !== undefined ? tween.value.vars.yoyoEase = val : undefined)
watch(() => props.duration, val => tween.value && val !== undefined ? tween.value.vars.duration = val : undefined)
watch(() => props.delay, val => tween.value && val !== undefined ? tween.value.vars.delay = val : undefined)
watch(() => props.ease, val => tween.value && val !== undefined ? tween.value.vars.ease = val : undefined)
watch(() => props.endArray, val => tween.value && val !== undefined ? tween.value.vars.endArray = val : undefined)
watch(() => props.immediateRender, val => tween.value && val !== undefined ? tween.value.vars.immediateRender = val : undefined)
watch(() => props.lazy, val => tween.value && val !== undefined ? tween.value.vars.lazy = val : undefined)
watch(() => props.keyframes, val => tween.value && val !== undefined ? tween.value.vars.keyframes = val : undefined)
watch(() => props.overwrite, val => tween.value && val !== undefined ? tween.value.vars.overwrite = val : undefined)
watch(() => props.runBackwards, val => tween.value && val !== undefined ? tween.value.vars.runBackwards = val : undefined)
watch(() => props.startAt, val => tween.value && val !== undefined ? tween.value.vars.startAt = val : undefined)
watch(() => props.callbackScope, val => tween.value && val !== undefined ? tween.value.vars.callbackScope = val : undefined)
watch(() => props.data, val => tween.value && val !== undefined ? tween.value.vars.data = val : undefined)
watch(() => props.stagger, val => tween.value && val !== undefined ? tween.value.vars.stagger = val : undefined)
watch(() => props.progress, val => tween.value && val !== undefined ? tween.value.progress(val) : undefined)

// watch(() => props.scrollTrigger?.trigger, val => {
//   console.log('changes')
//   if (tween.value && val !== undefined && tween.value.scrollTrigger) {
//     tween.value.scrollTrigger.disable(true)
//     tween.value.kill()
//   }
//   tween.value = createTween(targets.value, props)
// })

// watch(() => tween.value?.paused(), val => val !== undefined ? emit('pausedChange', val) : undefined)
// watch(() => tween.value?.reversed(), val => val !== undefined ? emit('reversedChange', val) : undefined)
// watch(() => tween.value?.progress(), val => {console.log('change'); return val !== undefined ? emit('progressChange', val) : undefined})

onUnmounted(() => {
  if (tween.value) { emit('destroyed', tween.value); tween.value.kill(); tween.value = undefined }
})

</script>
