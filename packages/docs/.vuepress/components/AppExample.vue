<template>
    <div class="app-example">
        <div v-if="penLink" class="pen-link" title="Edit on CodePen">
            <div class="tooltip">Edit on CodePen</div>
            <a :href="penLink" target="_blank">
                <img alt="CodePen" src="https://api.iconify.design/ion/logo-codepen.svg" />
            </a>
        </div>
        <Controls v-if="component">
            <component :is="wrappedEl"></component>
        </Controls>
        <component v-else :is="wrappedEl"></component>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, useSlots } from 'vue';

import { Controls } from 'vue-sock'

const props = defineProps({
    penLink: {
        type: String,
        default: null,
    },
    component: {
        type: Boolean,
        default: false,
    },
    composable: {
        type: Boolean,
        default: false,
    }
});

// const emit = defineEmits({});

const slots = useSlots()

const wrappedEl = computed(() => slots.default ? slots.default()[0] : null)

</script>

<style lang="scss" scoped>
.app-example {
    position: relative;

    .pen-link {
        display: flex;
        background-color: rgba(0, 0, 0, 0);
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 2.5em;
        align-items: center;
        justify-content: flex-end;
        text-decoration: none;
        overflow: hidden;
        padding: 0;
        margin: 0;
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        opacity: 0.7;
        z-index: 9;
        transition: background-color 0.2s ease-in-out, opacity 0.2s ease-in-out;

        &:hover {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.05);
            width: auto;

            .tooltip {
                opacity: 1;
            }
        }

        a {
            min-width: 2.5rem;
            min-height: 2.5rem;
            padding: 0;
            margin: 0;
            margin-left: -0.5rem;
            margin-top: 0.25rem;

            img {
                pointer-events: none;
                width: 2.5rem;
                height: 2.5rem;
                padding: 0;
                margin: 0;
            }
        }

        .tooltip {
            color: inherit;
            font-size: 1rem;
            transition: all 0.2s ease-in-out;
            padding: 0 1rem;
            opacity: 0;
        }
    }
}
</style>

<style lang="scss">
body.dark,
html.dark {
    .app-example {
        .pen-link {
            background-color: rgba(255, 255, 255, 0);

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }

            img {
                filter: invert(1);
            }
        }
    }
}
</style>