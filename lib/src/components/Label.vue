<template>
    <div :class="config.labelClassName"></div>
</template>

<script lang="ts" setup>
import { useParent } from '@/composables/useParent';
import { onMounted, onUnmounted, PropType, watch } from 'vue';
import { config } from '../utils';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    position: {
        type: [String, Number] as PropType<gsap.Position>,
        default: "+=0"
    }
});

// const emit = defineEmits({});

const timeline = useParent(['timeline'])

watch(() => props.name, (newVal, oldVal) => {
    timeline.value?.removeLabel(oldVal);
    timeline.value?.addLabel(newVal, props.position)
})

watch(() => props.position, newVal => {
    timeline.value?.removeLabel(props.name);
    timeline.value?.addLabel(props.name, newVal)
})

onMounted(() => {
    timeline.value?.addLabel(props.name, props.position);
}),

onUnmounted(() => {
    timeline.value?.removeLabel(props.name);
});

</script>

<style lang="scss" scoped></style>