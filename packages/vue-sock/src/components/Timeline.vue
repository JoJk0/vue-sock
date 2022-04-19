<template>
  <div :class="config.timelineClassName" ref="targetsContainerEl">
   <component v-for="vNode of targetsVNodes" :key="vNode.toString()" :paused="true" :is="vNode" @ready="onTargetReady($event)"/>
  </div>
</template>
<script lang="ts" setup>
import { computed, onUnmounted, ref } from 'vue'
import { onMounted, useSlots } from 'vue'
import gsap from 'gsap'
import { OnReadyEmit, TimelineEmits, TimelineProps } from '@/types';
import { config } from '../utils';

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

const timeline = ref<gsap.core.Timeline>(gsap.timeline({
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

const targetsVNodes = computed(() => slots.default ? slots.default() : [])

const targetsContainerEl = ref<Element>()

// const targets = computed(() => targetsContainerEl.value ? Array.from(targetsContainerEl.value.children).filter(el => el.className === config.tweenClassName || el.className === config.timelineClassName) : [])

const onTargetReady = ({animation, position}: OnReadyEmit<gsap.core.Animation>) => {

  if(!timeline.value) return;
  timeline.value.add(animation.paused(false), position)

  if(timeline.value.getChildren().length === targetsVNodes.value.length && !props.paused){
    timeline.value.play()
  }

}

// const onDestroyed = (el: gsap.core.Timeline | gsap.core.Tween) => {
//   const index = timeline.value?.getChildren().indexOf(el)
//   if(index !== -1){
//     timeline.value?.remove(el)
//   }
// }

defineExpose({timeline})

onMounted(() => {
  if(!props.paused) timeline.value.play()
  if (targetsContainerEl.value) {

    emit('ready', {el: timeline.value, position: props.position})

    timeline.value.eventCallback('onComplete', () => emit('complete', timeline.value))
    timeline.value.eventCallback('onRepeat', () => emit('repeat', timeline.value))
    timeline.value.eventCallback('onReverseComplete', () => emit('reverseComplete', timeline.value))
    timeline.value.eventCallback('onStart', () => emit('start', timeline.value))
    timeline.value.eventCallback('onUpdate', () => emit('update', timeline.value))
    timeline.value.eventCallback('onInterrupt', () => emit('interrupt', timeline.value))
  }
  else {
    console.error('vue-sock: Timeline: No content found')
  }
})

onUnmounted(() => {
  if (timeline.value){ emit('destroyed', timeline.value); timeline.value.kill(); timeline.value = undefined }
})

</script>
