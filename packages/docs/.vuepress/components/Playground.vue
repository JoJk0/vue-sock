<template>
    <div class="box" ref="boxEl">Box</div>
    <button @click="play">play</button>
    <button @click="pause">pause</button>
    <button @click="resume">resume</button>
    <button @click="restart">restart</button>
    <button @click="reverse">reverse</button>
    <button @click="kill">kill</button>
    <button @click="createTween">respawn</button>
    <Playground2/>
</template>

<script lang="ts" setup>
import gsap from 'gsap'
import { computed, onMounted, ref } from 'vue';

// const props = defineProps({});

let tween: gsap.core.Tween

// const emit = defineEmits({});

const boxEl = ref<HTMLElement>()

const play = () => tween?.play()
const pause = () => tween?.pause()
const resume = () => tween?.resume()
const reverse = () => tween?.reverse()
const restart = () => tween?.restart()
const kill = () => tween?.kill()


const createTween = () => {
    tween && tween.kill();
    tween = gsap.fromTo(
        boxEl.value!,
        { rotation: 0, xPercent: 0 },
        {
            paused: true,
            // repeat: 1,
            rotation: 360,
            xPercent: 300,
            duration: 3,
            immediateRender: false,
            overwrite: true,
            // onRepeat: () => { tween.value?.pause(); tween.value?.seek(0) },
        }
    )
}

onMounted(createTween)

</script>

<style scoped>
.box {
    width: 6em;
    height: 6em;
    border-radius: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    line-height: 130%;
    text-align: center;
    background-color: rgba(116, 179, 0, 0.5);
    border: 0.1em solid rgba(116, 179, 0, 0.5);
    margin: 5em;
}
</style>