<template>
  <div :class="config.scrollTriggerClassName" ref="targetsContainerEl">
   <component v-if="vNode" :paused="true" :scrollTrigger="vars" :is="vNode" />
  </div>
</template>
<script lang="ts" setup>
import { computed, PropType, ref } from 'vue'
import { onMounted, useSlots } from 'vue'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import { ScrollTriggerEmits, ScrollTriggerProps } from '@/types';
import { config } from '../utils';

const props = defineProps({
  animation: {
    type: Object,
    default: undefined,
  },
  anticipatePin: {
    type: Number,
    default: undefined,
  },
  containerAnimation: {
    type: Object,
    default: undefined,
  },
  start: {
    type: [String, Number, Function],
    default: undefined,
  },
  end: {
    type: [String, Number, Function],
    default: undefined,
  },
  endTrigger: {
    type: [String, Object],
    default: undefined,
  },
  fastScrollEnd: {
    type: [Boolean, Number],
    default: undefined,
  },
  horizontal: {
    type: Boolean,
    default: undefined,
  },
  id: {
    type: String,
    default: undefined,
  },
  invalidateOnRefresh: {
    type: Boolean,
    default: undefined,
  },
  scrub: {
    type: [Number, Boolean],
    default: undefined,
  },
  markers: {
    type: [Boolean, Object],
    default: undefined,
  },
  once: {
    type: Boolean,
    default: undefined,
  },
  pin: {
    type: [Boolean, Object, String],
    default: undefined,
  },
  pinnedContainer: {
    type: [Object, String],
    default: undefined,
  },
  pinReparent: {
    type: Boolean,
    default: undefined,
  },
  pinSpacer: {
    type: [Object, String],
    default: undefined,
  },
  pinSpacing: {
    type: [Boolean, String],
    default: undefined,
  },
  pinType: {
    type: String,
    default: undefined,
  },
  preventOverlaps: {
    type: [Boolean, String],
    default: undefined,
  },
  refreshPriority: {
    type: Number,
    default: undefined,
  },
  scroller: {
    type: [Object, String],
    default: undefined,
  },
  snap: {
    type: [Number, Object, Array, Function, String],
    default: undefined,
  },
  toggleActions: {
    type: String,
    default: undefined,
  },
  toggleClass: {
    type: [String, Object],
    default: undefined,
  },
  trigger: {
    type: [String, Object],
    default: undefined,
  }, 
  tween: {
    type: Object,
    default: undefined,
  },
  timeline: {
    type: Object,
    default: undefined,
  },
} as ScrollTriggerProps)

const emit = defineEmits({
  enter: e => e,
  enterBack: e => e,
  leave: e => e,
  leaveBack: e => e,
  refresh: e => e,
  refreshInit: e => e,
  snapComplete: e => e,
  scrubComplete: e => e,
  update: e => e,
  toggle: e => e,

  // progressChange: Number,
  // pausedChange: Boolean,
  // reversedChange: Boolean,
  // ready: e => e,
  // destroyed: e => e,
} as ScrollTriggerEmits)

gsap.registerPlugin(ScrollTrigger)

const slots = useSlots()

const scrollTrigger = ref<ScrollTrigger>()

const vars = computed<ScrollTrigger.Vars>(() => ({
    anticipatePin: props.anticipatePin,
    containerAnimation: props.containerAnimation,
    end: props.end,
    endTrigger: props.endTrigger,
    fastScrollEnd: props.fastScrollEnd,
    horizontal: props.horizontal,
    id: props.id,
    invalidateOnRefresh: props.invalidateOnRefresh,
    markers: props.markers,
    once: props.once,
    pin: props.pin,
    pinnedContainer: props.pinnedContainer,
    pinReparent: props.pinReparent,
    pinSpacer: props.pinSpacer,
    pinSpacing: props.pinSpacing,
    pinType: props.pinType,
    preventOverlaps: props.preventOverlaps,
    refreshPriority: props.refreshPriority,
    scrub: props.scrub,
    snap: props.snap,
    start: props.start,
    toggleActions: props.toggleActions,
    toggleClass: props.toggleClass,
    trigger: props.trigger,
    scroller: props.scroller,
}))

const vNode = computed(() => {
  const slot = slots.default && slots.default()
  return slot && slot[0]
})

onMounted(() => {

  if(slots.default && slots.default().length > 1) {
    console.warn('ScrollTrigger: Only one element is allowed')
  }

  if (vNode.value) {
    const { start, end, scrub, markers } = props

    const scrollTrigger = {
      ...props,
    }
  }
  else {
    console.warn('vue-sock: ScrollTrigger: No content found')
  }
})

</script>
