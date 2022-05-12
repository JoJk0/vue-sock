<template>
  <component v-for="vNode of targetsVNodes" :key="vNode.toString()" :paused="true" :is="vNode"
    @ready="onTargetReady($event)" />
</template>
<script lang="ts" setup>
import { ComponentPublicInstance, computed, onUnmounted, ref } from 'vue'
import { onMounted, useSlots } from 'vue'
import gsap from 'gsap'
import { OnReadyEmit, TimelineEmits, TimelineProps } from '@/types';
import { config } from '../utils';
import { useInputTargets } from '../composables/useInputTargets';
import { Timeline, Tween } from '..';

const props = defineProps({
  autoRemoveChildren: {
    type: Boolean,
    default: false,
  },
  callbackScope: {
    type: Object,
    default: undefined,
  },
  delay: {
    type: Number,
    default: 0,
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
  smoothChildTiming: {
    type: Boolean,
    default: undefined,
  },
  yoyo: {
    type: Boolean,
    default: false,
  },
  position: {
    type: [Number, String],
    default: undefined,
  },
  scrollTrigger: {
    type: Object,
    default: undefined,
  },
  child: {
    type: [Object, String, Function],
    default: undefined,
  },
  children: {
    type: Array,
    default: undefined,
  }
} as TimelineProps)

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
} as TimelineEmits)

const slots = useSlots()

const timeline = ref<gsap.core.Timeline | undefined>(gsap.timeline({
  autoRemoveChildren: props.autoRemoveChildren,
  callbackScope: props.callbackScope,
  delay: props.delay,
  paused: true,
  repeat: props.repeat,
  repeatDelay: props.repeatDelay,
  repeatRefresh: props.repeatRefresh,
  smoothChildTiming: props.smoothChildTiming,
  yoyo: props.yoyo,
  scrollTrigger: props.scrollTrigger
}))

// const childrenRefs = ref<(gsap.core.Timeline | gsap.core.Tween)[]>([])

const targetsVNodes = computed(() => slots.default ? slots.default().filter(vnode => typeof vnode.type !== "symbol") : [])

// const onAnimationMounted = (animationComponent: InstanceType<typeof Tween | typeof Timeline>) => {
//   console.log(typeof animationComponent.tween)
//   if (animationComponent.tween) {
//     console.log(animationComponent.tween.value)
//     animations.value.push(animationComponent.tween.value)
//   } else if (animationComponent.timeline) {
//     animations.value.push(animationComponent.timeline.value)
//   } else {
//     console.warn('[vue-sock]: Unknown animation component: ', animationComponent)
//   }
// }

const onTargetsReady = () => {
  if (!props.paused) timeline.value?.play()
  if (timeline.value!.getChildren().length > 0) {

    emit('ready', { el: timeline.value, position: props.position })

    timeline.value?.eventCallback('onComplete', () => emit('complete', timeline.value))
    timeline.value?.eventCallback('onRepeat', () => emit('repeat', timeline.value))
    timeline.value?.eventCallback('onReverseComplete', () => emit('reverseComplete', timeline.value))
    timeline.value?.eventCallback('onStart', () => emit('start', timeline.value))
    timeline.value?.eventCallback('onUpdate', () => emit('update', timeline.value))
    timeline.value?.eventCallback('onInterrupt', () => emit('interrupt', timeline.value))
  }
  else {
    console.error('[vue-sock]: Timeline: No content found')
  }
}


// const { animations } = useInputTargets({
//   allowedInputTypes: {
//     'slots': ['animation', 'animations'],
//     'props': ['animation', 'animations'],
//   },
//   sources: {
//     slots,
//     props
//   },
//   onTargetsReady
// })

// const targets = computed(() => targetsContainerEl.value ? Array.from(targetsContainerEl.value.children).filter(el => el.className === config.tweenClassName || el.className === config.timelineClassName) : [])

const onTargetReady = ({ animation, position }: OnReadyEmit<gsap.core.Animation>) => {

  if (!timeline.value) return;
  timeline.value.add(animation.paused(false), position)

  if (timeline.value.getChildren().length === targetsVNodes.value.length && !props.paused) {
    onTargetsReady()
  }

}

// const onDestroyed = (el: gsap.core.Timeline | gsap.core.Tween) => {
//   const index = timeline.value?.getChildren().indexOf(el)
//   if(index !== -1){
//     timeline.value?.remove(el)
//   }
// }

defineExpose({ timeline })



onUnmounted(() => {
  if (timeline.value) { emit('destroyed', timeline.value); timeline.value.kill(); timeline.value = undefined }
})

</script>
