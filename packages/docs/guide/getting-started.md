# Getting started

## Installation
To install this package, you will need a [Node package manager](https://nodejs.org/en/download/). 

You can use any among [PNPM (recommended)](https://pnpm.io/) or [Yarn](https://yarnpkg.net/)

<CodeGroup>
  <CodeGroupItem title="PNPM" active>

```bash:no-line-numbers
pnpm add gsap vue-sock
```

  </CodeGroupItem>

  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn add gsap vue-sock
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash:no-line-numbers
npm install gsap vue-sock
```

  </CodeGroupItem>
</CodeGroup>

## Basic usage

You can either use components, or composable functions to build your animations, depending on your preference, or use cases.

<CodeGroup>
  <CodeGroupItem title="Components">

@[code{0-12}](../.vuepress/components/guide/getting-started/BasicUsageComponent.vue)

<AppExample component penLink="https://codepen.io/jojk0/pen/yLpVpMO">
  <BasicUsageComponent />
</AppExample>

  </CodeGroupItem>
  <CodeGroupItem title="Composables">

@[code{0-16}](../.vuepress/components/guide/getting-started/BasicUsageComposable.vue)

<AppExample composable penLink="https://codepen.io/jojk0/pen/qBpVvwo">
  <BasicUsageComposable />
</AppExample>

  </CodeGroupItem>
</CodeGroup>

## Specifying targets
A target could be an `element`, `tween` or `timeline` or an array of those targets depending on what you use. 
Following properties are accepted:

- `Tween` has `target` or `targets` and accepts element(s)

- `Timeline` has `child` or `children` and accepts tween(s), timeline(s)

- `ScrollTrigger` has `child` and accepts a tween, or a timeline

- `[Effect]` has:
  - `target` or `targets` and accepts element(s) if it's a tween
  -  `child` or `children` and accepts tween(s), timeline(s) if it's a timeline

Depending on complexity of your project, you can specify the targets in 4 cardinalities, ranging from `1:1` to `M:N`.

## Relationship Table

|  entity/input type| target | targets | tween | tweens | timeline | timelines | scrollTrigger | controls
| ----------------- | ------ | ------- | ----- | ------ | -------- | --------- | ------------- | --------
| target            |   ✅     |    ✅     |   ✅    |   ✅     |   ✅       |    ✅       |      ✅         |      ✅    
| targets           |   ✅     |     ✅    |    ✅   |    ✅    |   ✅       |    ✅       |       ✅        |       ✅   
| tween             |    ✅    |    ✅     |       |        |          |           |      ✅         |    ✅     
| tweens            |    ✅    |    ✅     |       |        |          |           |               |          
| timeline          |        |         |   ✅    |    ✅    |     ✅     |    ✅       |    ✅      | ✅         
| timelines         |        |         |    ✅   |    ✅    |     ✅     |     ✅     |               |          
| scrollTrigger     |        |         |    ✅   |        |      ✅    |           |               |      ✅    
| controls          |   ✅     |         |    ✅   |        |    ✅      |           |      ✅         |          

### tween (`<Tween />` & `useTween()`)
|  input/method     | slot | prop | param | destruct | arg
| ----------------- | ---- | ---- | ----- | -------- | ---
| target            |  ✅   |  ✅    |       |     | ✅
| targets           |  ✅   |  ✅    |       |   ✅  | ✅

### timeline (`<Timeline />` & `useTimeline()`)
|  input/method     | slot | prop | param | destruct | arg
| ----------------- | ---- | ---- | ----- | -------- | ---
| target            |      |      |       |     | 
| targets           |      |      |       |   ✅  | 
| tween             |  ✅   |  ✅  |   ✅   |       |    
| tweens            |   ✅   |   ✅   |    ✅   |           
| timeline          |   ✅   |    ✅  |    ✅   |           
| timelines         |   ✅   |    ✅  |    ✅   |           
| scrollTrigger     |      |      |    ✅   |           
| controls          |      |      |       |           

### ScrollTrigger (`<ScrollTrigger />` & `useScrollTrigger()`)
|  input/method     | slot | prop | param | destruct | arg
| ----------------- | ---- | ---- | ----- | -------- | ---
| target            |      |      |       |     | 
| targets           |      |      |       |     | 
| tween             |  ✅   |  ✅  |   ✅   |       |    
| tweens            |      |      |       |           
| timeline          |   ✅   |    ✅  |    ✅   |           
| timelines         |      |      |       |           
| scrollTrigger     |      |      |       |           
| controls          |      |      |       |           


### controls (`<Controls />`)
|  input/method     | slot | prop | param | destruct | arg
| ----------------- | ---- | ---- | ----- | -------- | ---
| target            |      |      |       |     | 
| targets           |      |      |       |     | 
| tween             |  ✅   |  ✅  |   ✅   |       |    
| tweens            |   ✅   |   ✅   |    ✅   |           
| timeline          |   ✅   |    ✅  |    ✅   |           
| timelines         |   ✅   |    ✅  |    ✅   |           
| scrollTrigger     |   ✅   |    ✅  |    ✅   |           
| controls          |      |      |       |           

tween -> target, targets
timeline -> animation, animations, scrollTrigger
scrollTrigger -> animation

controls -> animation, scrollTrigger

one-to-one one-to-many many-to-one many-to-many

:target :targets :tween :tweens :timeline :timelines :scrollTrigger

input type -> slot (C), prop (C), param (c), destruct (c), arg (c)

- slot - through component slot
- prop - through component prop
- param - through composable parameter option
- destruct - through destructuring array of refs from composable return
- arg - through composable function argument

### Components
One target in a slot (one-to-one)

```html
<Tween :from="{ opacity: 0 }" :to="{ opacity: 1 }">
  <div class="box">Hello Vue Sock!</div>
</Tween>
```

Many targets in a slot (many-to-one) - useful for staggering

```html
<Tween :from="{ opacity: 0 }" :to="{ opacity: 1 }" :stagger="0.2">
  <div class="boxOne">Hello VueSock!</div>
  <div class="boxTwo">Hello VueSock!</div>
  <div class="boxThree">Hello VueSock!</div>
</Tween>
```

One target as a parameter (one-to-many)

You can target elements via class names (`.`) or IDs (`#`).
Bear in mind that selection is **scoped** to current component only.

```html
<div class="box">Hello VueSock!</div>

<Tween target=".box" :from="{ opacity: 0 }" :to="{ opacity: 1 }" />
<Tween target=".box" :from="{ rotation: 0 }" :to="{ rotation: 180 }" />
<Tween target=".box" :from="{ xPercent: 0 }" :to="{ xPercent: 20 }" />
```

Many targets as a parameter (many-to-many)

```html
<div class="boxOne">Hello VueSock!</div>
<div class="boxTwo">Hello VueSock!</div>
<div class="boxThree">Hello VueSock!</div>

<Tween :targets="['.boxOne', '.boxTwo', '.boxThree']" :from="{ opacity: 0 }" :to="{ opacity: 1 }" :stagger="0.2" />
<Tween :targets="['.boxOne', '.boxTwo', '.boxThree']" :from="{ rotation: 0 }" :to="{ rotation: 180 }" :stagger="0.2" />
<Tween :targets="['.boxOne', '.boxTwo', '.boxThree']" :from="{ xPercent: 0 }" :to="{ xPercent: 20 }" :stagger="0.2" />
```

Depending on what you use, you can also mix props with slots. If allowed, they will be merged in one array with targets in **slot to be added first** in order.

```html
<div class="boxOne">Hello VueSock!</div>

<Tween :from="{ opacity: 0 }" :to="{ opacity: 1 }" target=".boxOne">
  <div class="box">Hello Vue Sock!</div>
</Tween>
```

Produces `['.box', '.boxOne']` target array

### Composables
Targets can be specified by destructuring the `targets` array containing up to 100 temporary refs under the hood. After destructure, in `<script setup>` refs are automatically exposed to template and therefore, filled with the elements once mounted. This way you don't need to declare the targets separately.

```ts
const [[ targetOneEl, targetTwoEl ], { play }] = useTween({
    from: { opacity: 0 }, 
    to: { opacity: 1 },
})
```

You can also just pass a ref as an argument

```ts
const targetOneEl = ref<HTMLElement>()
const targetTwoEl = ref<HTMLElement>()

const { play } = useTween({
  from: { opacity: 0 }, 
  to: { opacity: 1 }
}, [ targetOneEl, targetTwoEl ])
```

You can use destructured refs in another tweens

```ts
const [[ targetOneEl, targetTwoEl ]] = useTween({
    from: { opacity: 0 }, 
    to: { opacity: 1 },
})

const { play } = useTween({
  from: { rotation: -180 },
  to: { rotation: 0 },
  paused: true
}, [ targetOneEl, targetTwoEl ])
```

If you don't need to use any actions and you're passing already declared targets, then you can skip the assignment entirely

```ts
useTween({
    from: { opacity: 0 }, 
    to: { opacity: 1 },
}, [ targetOneEl ])
```

## Components or Composables?
VueSock provides you with 2 ways to declare your animations. Depending on your use cases, you can choose either Components, or Composables, or even both at the same time and **mix-and-match** them! It's especially useful if you need easy access to methods in `<script setup>` while still using components.

```vue
<template>
    <Tween 
      ref="tweenEl"
      :from="{ opacity: 0, xPercent: -20 }" 
      :to="{ opacity: 1, xPercent: 0 }" 
      :duration="2"
      paused>
      <div class="box">
        Hello VueSock!
      </div>
    </Tween>
    <button @click="play">Play!</button>
</template>
<script lang="ts" setup>
import { Tween, useTween } from 'vue-sock'

const tweenEl = ref<typeof Tween>()

/* Mix-and-match and use methods here, or in template */
const { play } = useTween(tweenEl)

</script>
```

### Usage with Options API
You can use Components for your development:
@[code{0-23}](../.vuepress/components/guide/getting-started/OptionsAPI.vue)


### Usage with Composition API
For Composition API, Composables are recommended, however Components can be used as well.

## TypeScript
The whole project is fully typed. If you intend to use any GSAP plugins, in order to get proper types for animations, declare the plugins that you will use via `GSAPPlugins` type. All plugins' options will be then available in animations.

```ts{3}
import { configureGSAP } from 'vue-sock'

declare type GSAPPlugins = typeof plugins

const plugins = [ ScrollTrigger ]

configureGSAP({
  plugins
})

```