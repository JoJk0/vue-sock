<template>
    <div class="controls-container" :class="[config.controlsClassName, { reversed }]">
        <div :class="{ 'animation-container': container }">
            <component
                :is="wraps"
                :paused="true"
                @ready="onAnimationReady($event)"
                @update="onAnimationUpdate($event)"
            ></component>
            <template v-if="container">
                <div class="overlay" v-show="completed" @click="restart">
                    <img
                        src="https://api.iconify.design/bi/arrow-counterclockwise.svg"
                        class="overlay-icon"
                        title="Restart"
                        alt="Restart"
                    />
                </div>
                <div class="overlay" v-show="!touched" @click="play">
                    <img
                        src="https://api.iconify.design/bi/play-btn.svg"
                        class="overlay-icon"
                        title="Play"
                        alt="Play"
                    />
                </div>
            </template>
        </div>
        <div class="controls">
            <button v-show="paused && !completed" class="button play" @click="play">
                <img src="https://api.iconify.design/bi/play.svg" title="Play" alt="Play" />
            </button>
            <button v-show="!paused && !completed" class="button pause" @click="pause">
                <img src="https://api.iconify.design/bi/pause.svg" title="Pause" alt="Pause" />
            </button>
            <button v-show="completed" class="button restart" @click="restart">
                <img
                    v-show="!reversed"
                    src="https://api.iconify.design/bi/arrow-counterclockwise.svg"
                    title="Pause"
                    alt="Pause"
                />
                <img
                    v-show="reversed"
                    src="https://api.iconify.design/bi/arrow-clockwise.svg"
                    title="Pause"
                    alt="Play"
                />
            </button>
            <button class="button stop" @click="stop">
                <img src="https://api.iconify.design/bi/stop.svg" title="Stop" />
            </button>
            <div class="time">{{ formattedTime }}</div>
            <input
                type="range"
                @input="setTotalProgress($event)"
                :value="totalProgress"
                class="scrubber"
                min="0"
                max="1"
                step="0.01"
            />
            <button class="button reverse" @click="reverse">
                <img
                    src="https://api.iconify.design/bi/arrow-repeat.svg"
                    title="Reverse"
                    alt="Reverse"
                />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ControlsProps, OnReadyEmit } from '@/types';
import { computed, onMounted, ref, useSlots } from 'vue';
import { config } from '../utils';

const slots = useSlots()

const props = defineProps({
    initialState: { // TODO: implement initial state
        type: Object,
        default: { paused: true },
    },
    color: {
        type: String,
        default: '#74b300',
    },
    container: {
        type: Boolean,
        default: true,
    },
    pin: { // TODO: implement pinning
        type: String,
        default: undefined,
    },
    target: {
        type: [Object, String],
        default: undefined,
    }
} as ControlsProps)

const wraps = computed(() => slots.default ? slots.default()[0] : null)

const animation = ref<gsap.core.Animation>()

const totalProgress = ref<number>(0)

const totalTime = ref<number>(0)

const completed = computed(() => (totalProgress.value === 1 && !reversed.value) || (totalProgress.value === 0 && reversed.value))

const touched = computed(() => (totalProgress.value !== 0 && !reversed.value) || (totalProgress.value !== 1 && reversed.value))

const paused = computed<boolean>({
    get() {
        return animation?.value?.paused() ?? true
    },
    set(value) {
        animation?.value?.paused(value)
    },
})

const reversed = computed<boolean>({
    get() {
        return animation?.value?.reversed() ?? false
    },
    set(value) {
        animation?.value?.reversed(value)
    },
})

// const time = ref(0)

const formattedTime = computed(() => {
    const minutes = Math.floor(totalTime.value / 60)
    const seconds = Math.floor(totalTime.value % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
})

const play = () => {
    paused.value = false
}

const pause = () => {
    paused.value = true
}

const stop = () => {
    paused.value = true
    totalProgress.value = reversed.value ? 1 : 0
    animation.value?.totalProgress(totalProgress.value)
}

const restart = () => {
    totalProgress.value = reversed.value ? 1 : 0
    animation.value?.totalProgress(totalProgress.value)
    paused.value = false
}

const reverse = () => {
    reversed.value = !reversed.value
}

const setTotalProgress = (e: Event | number) => {
    paused.value = true
    totalProgress.value = typeof e === 'number' ? e : parseFloat((e.target as any)?.value as string)
    animation?.value?.totalProgress(totalProgress.value)
}

const onAnimationUpdate = (animation: gsap.core.Animation) => {
    totalProgress.value = animation.totalProgress()
    totalTime.value = animation.totalTime()
}

const onAnimationReady = (e: OnReadyEmit<gsap.core.Tween>) => {
    console.log('ready', e)
    animation.value = e.animation
}

onMounted(() => {
    if (!slots.default) return;
    const slotEls = slots.default ? slots.default().map(slot => slot.el) : []

    slots.default().forEach(vNode => {
    });

    if (slotEls && slotEls.length) {
        // const { start, end, scrub, markers } = props
        console.log(slots.default ? slots.default() : null)
        // const scrollTrigger = {
        //     ...props,
        // }
    }
    else {
        console.error('vue-sock: Controls: No content found')
    }
})

</script>

<style lang="scss" scoped>
.controls-container {
    .animation-container {
        padding: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .overlay {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            background: rgba(255, 255, 255, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1em;
            cursor: pointer;
            .overlay-icon {
                color: rgba(0, 0, 0, 0.7);
                width: 3em;
                height: 3em;
                pointer-events: none;
            }
            &:hover {
                .overlay-icon {
                    opacity: 0.7;
                }
            }
        }
    }
    &.reversed {
        .overlay {
            .overlay-icon {
                transform: rotate(180deg);
            }
            .controls {
                .play {
                    transform: rotate(180deg);
                }
            }
        }
    }
}
.button {
    background: transparent;
    border: 0;
    color: black;
    border-radius: 100%;
    aspect-ratio: 1;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.2em;
    cursor: pointer;
    line-height: 0;
    box-sizing: content-box;
    transition: background 0.2s ease-in-out;
    img {
        pointer-events: none;
    }
    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }
    &:active {
        background: rgba(0, 0, 0, 0.1);
    }
}
.controls {
    background: #eeeeee;
    color: #fff;
    width: 100%;
    display: flex;
    margin: 1em 0;
    box-sizing: border-box;
    border-radius: 5em;
    align-items: center;
    .time {
        padding: 0 1em;
        width: 2em;
        opacity: 0.7;
    }
}
.scrubber {
    outline: 0;
    border: 0;
    flex: 1;
    border-radius: 500px;
    max-width: 100%;
    transition: box-shadow 0.2s ease-in-out;
    // Chrome
    @media screen and (-webkit-min-device-pixel-ratio: 0) {
        & {
            overflow: hidden;
            height: 40px;
            -webkit-appearance: none;
            background-color: #ddd;
        }
        &::-webkit-slider-runnable-track {
            height: 40px;
            -webkit-appearance: none;
            color: #ccc;
            // margin-top: -1px;
            transition: box-shadow 0.2s ease-in-out;
        }
        &::-webkit-slider-thumb {
            width: 40px;
            -webkit-appearance: none;
            height: 40px;
            cursor: ew-resize;
            background: #fff;
            box-shadow: -340px 0 0 320px v-bind(color),
                inset 0 0 0 40px v-bind(color);
            border-radius: 50%;
            transition: box-shadow 0.2s ease-in-out;
            position: relative;
            // top: 1px;
        }
        &:active::-webkit-slider-thumb {
            background: #fff;
            box-shadow: -340px 0 0 320px v-bind(color),
                inset 0 0 0 3px v-bind(color);
        }
    }
    // Firefox
    &::-moz-range-progress {
        background-color: v-bind(color);
    }
    &::-moz-range-track {
        background-color: #9a905d;
    }
    // IE
    &::-ms-fill-lower {
        background-color: v-bind(color);
    }
    &::-ms-fill-upper {
        background-color: #9a905d;
    }
}
</style>

<style lang="scss">
body.dark,
html.dark {
    .controls-container {
        .animation-container {
            .overlay {
                background: rgba(0, 0, 0, 0.5);
                .overlay-icon {
                    filter: invert(1);
                }
            }
        }
        .controls {
            background: #1c1c1c;
            .scrubber {
                @media screen and (-webkit-min-device-pixel-ratio: 0) {
                    & {
                        background-color: #333;
                    }
                    &::-webkit-slider-runnable-track {
                        color: #444;
                    }
                }
            }
        }
        .button {
            color: white;
            &:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            &:active {
                background: rgba(255, 255, 255, 0.2);
            }
            img {
                filter: invert(1);
            }
        }
    }
}
</style>