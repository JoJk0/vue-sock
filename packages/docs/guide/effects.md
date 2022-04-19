# Effects
Effects are pre-defined functionalities that can be re-used across the app. If `extendTimeline` is set to `true` then effect **must** be a tween or timeline.

[See GSAP Effect docs](https://greensock.com/docs/v3/GSAP/gsap.effects)

## Defining effects
You can optionally use `defineEffect` convenience helper to auto-register your effect and type-check:

```ts
import gsap from 'gsap'
import { defineEffect } from 'vue-sock'

defineEffect({
    name: "fade",
    effect: (targets, config) => {
        return gsap.to(targets, { duration: config.duration, opacity: 0 });
    },
    defaults: {
        duration: 2
    },
    customVars: {
        yourProp: String as PropType<YourCustomType>
    },
    extendTimeline: true
})

```
You can define custom variables to be used in `effect()` function via `customVars` property in the same way you define props in components.

## Usage
<CodeGroup>
  <CodeGroupItem title="Components">

```vue
<template>
    <Fade yourProp="val">
      <div class="box">
        Hello VueSock!
      </div>
    </Fade>
    <button @click="play">Play!</button>
</template>
<script lang="ts" setup>
import { defineEffect } from 'vue-sock'

const { Fade } = defineEffect({
    name: "fade",
    effect: (targets, config) => {
        const myProp = config.yourProp
        return gsap.to(targets, { duration: config.duration, opacity: 0 });
    },
    defaults: {
        duration: 2
    },
    customVars: {
        yourProp: String
    },
    extendTimeline: true
})

</script>

```

`defineEffect` returns a component that can be used in the same way as tween. Its key is a capitalized name of the effect.

  </CodeGroupItem>
  <CodeGroupItem title="Composables">

```vue
<template>
    <div class="box" ref="boxEl">
      Hello VueSock!
    </div>
    <button @click="play">Play!</button>
</template>
<script lang="ts" setup>
import { defineEffect, useEffect } from 'vue-sock'

const { fadeEffect } = defineEffect({
    name: "fade",
    effect: (targets, config) => {
        const myProp = config.yourProp
        return gsap.to(targets, { duration: config.duration, opacity: 0 });
    },
    defaults: {
        duration: 2
    },
    customVars: {
        yourProp: String
    },
    extendTimeline: true
})

const [[boxEl], { play }] = useEffect(fadeEffect)

// You can also target by name
const [[boxEl], { play }] = useEffect<typeof fadeEffect>('fade')

</script>
```
`useEffect` returns a effect actions that can be used in the same way as tween or timeline. Its key is the name of the effect and `Effect` word like \``${name}Effect`\`.

  </CodeGroupItem>
</CodeGroup>