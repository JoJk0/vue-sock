<template>
    <div class="controls-container" :class="{ reversed }">
        <div :class="{ 'animation-container': container }">
            <component
                :is="wraps"
                :progress="progress"
                :paused="paused"
                :reversed="reversed"
                @update="onProgressChange($event)"
                @pausedChange="onPausedChange($event)"
                @reversedChange="onReversedChange($event)"
                @complete="onPausedChange(true)"
            ></component>
        </div>
        <div class="controls">
            <button v-show="paused" class="button play" @click="play">
                <img src="https://api.iconify.design/bi/play.svg" title="Play" />
            </button>
            <button v-show="!paused" class="button pause" @click="pause">
                <img src="https://api.iconify.design/bi/pause.svg" title="Pause" />
            </button>
            <button class="button stop" @click="stop">
                <img src="https://api.iconify.design/bi/stop.svg" title="Stop" />
            </button>
            <div class="time">{{formattedTime}}</div>
            <input
                type="range"
                @input="setProgress($event)"
                :value="progress"
                class="scrubber"
                min="0"
                max="1"
                step="0.01"
            />
            <button class="button reverse" @click="reverse">
                <img src="https://api.iconify.design/bi/arrow-repeat.svg" title="Reverse" />
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, useSlots } from 'vue';

const slots = useSlots()

const props = defineProps({
    initialState: {
        type: String,
        default: 'paused',
    },
    color: {
        type: String,
        default: '#74b300',
    },
    container: {
        type: Boolean,
        default: true,
    }
})

const wraps = computed(() => slots.default ? slots.default()[0] : null)

const progress = ref(0)
const paused = ref(true)
const reversed = ref(false)
const time = ref(0)

const formattedTime = computed(() => {
    const minutes = Math.floor(time.value / 60)
    const seconds = Math.floor(time.value % 60)
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
    progress.value = reversed.value ? 1 : 0
}

const reverse = () => {
    reversed.value = !reversed.value
}

const setProgress = (e: Event) => {
    paused.value = true
    progress.value = parseFloat((e.target as any)?.value as string)
}

const onPausedChange = (val: boolean) => {
    console.log('onPausedChange', val)
    paused.value = val
}

const onReversedChange = (val: boolean) => {
    console.log('onReversedChange', val)
    reversed.value = val
}

const onProgressChange = (tween: gsap.core.Tween) => {
    progress.value = tween.progress()
    time.value = tween.time()
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
    }
    &.reversed {
        .controls {
            .play {
                transform: rotate(180deg);
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