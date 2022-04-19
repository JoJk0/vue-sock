<template>
  <div :class="config.scrollTriggerClassName" ref="targetsContainerEl">
    <!-- <component v-if="vNode" :paused="true" :is="vNode" /> -->
    <component 
    v-if="isElementsReady" 
    :paused="true" 
    :scrollTrigger="filteredVars" 
    :is="vNode" 
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, PropType, ref, watch } from 'vue'
import { onMounted, useSlots } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollTriggerEmits, ScrollTriggerProps } from '@/types';
import { config, filterOptions, getElementFromScopedComponent, useScopedQuerySelector } from '../utils';

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
  child: {
    type: [Object, String],
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
// TODO: fix tweeining triggered scrolltrigger
gsap.registerPlugin(ScrollTrigger)

const slots = useSlots()

const instance = getCurrentInstance()

const targetsContainerEl = ref<HTMLElement>()

const triggerEl = useScopedQuerySelector(props.trigger)

const isElementsReady = computed(() => {
  const a = vNode && ((props.trigger && !!triggerEl.value) || !props.trigger)
  return a
})

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
  trigger: triggerEl.value,
  scroller: typeof props.scroller === 'string' && instance ? getElementFromScopedComponent(props.scroller, instance) : props.scroller,
  onToggle: scrollTrigger => {
    // refresh because height start changes
    scrollTrigger.refresh()
    emit('toggle', scrollTrigger)
  },
  onEnter: scrollTrigger => emit('enter', scrollTrigger),
  onEnterBack: scrollTrigger => emit('enterBack', scrollTrigger),
  onLeave: scrollTrigger => emit('leave', scrollTrigger),
  onLeaveBack: scrollTrigger => emit('leaveBack', scrollTrigger),
  onRefresh: scrollTrigger => emit('refresh', scrollTrigger),
  onRefreshInit: scrollTrigger => emit('refreshInit', scrollTrigger),
  onSnapComplete: scrollTrigger => emit('snapComplete', scrollTrigger),
  onScrubComplete: scrollTrigger => emit('scrubComplete', scrollTrigger),
  onUpdate: scrollTrigger => emit('update', scrollTrigger),
}))

const filteredVars = computed(() => filterOptions(vars.value))

const vNode = computed(() => {
  const slot = slots.default && slots.default()
  return slot && slot[0]
})

onMounted(() => {

  if (!targetsContainerEl.value) {
    console.error('ScrollTrigger: targetsContainerEl is not defined')
    return
  }

  // scrollTrigger.value = ScrollTrigger.create({
  //   animation: ,
  //   ...filteredVars.value
  // })

  if (slots.default && slots.default().length > 1) {
    console.log(slots.default())
    console.warn('ScrollTrigger: Only one element is allowed')
  }

  if (vNode.value) {
    // const { start, end, scrub, markers } = props

    // const scrollTrigger = {
    //   ...props,
    // }
  }
  else {
    console.warn('vue-sock: ScrollTrigger: No content found')
  }
})

</script>
