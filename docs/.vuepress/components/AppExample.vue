<template>
    <h1>Component API</h1>
    <Tween :from="{ opacity: 0 }" :to="{ opacity: 1 }" :duration="1" ease="none" :stagger="0.2">
        <div class="lol">Lolz</div>
        <div class="lol">Lolz</div>
        <div class="lol">Lolz</div>
        <div class="lol">Lolz</div>
    </Tween>
    <h1>Composition API</h1>
    <div ref="tweenEl">
        <div class="lol">Lolz</div>
        <div class="lol">Lolz</div>
        <div class="lol">Lolz</div>
        <div class="lol">Lolz</div>
    </div>
</template>

<script lang="ts" setup>
import {  onMounted} from 'vue'
import { ScrollTrigger, Timeline, Tween, useTween } from '../../../lib/src'

// const props = defineProps({});

// const emit = defineEmits({});
console.log(useTween)
const [tweenEl] = useTween({
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: 1,
    ease: 'none',
    stagger: 0.2,
});

</script>

<style lang="scss" scoped></style>