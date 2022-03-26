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

@[code{0-16}](../.vuepress/components/guide/getting-started/BasicUsageComponent.vue)

<AppExample penLink="https://codepen.io/jojk0/pen/yLpVpMO">
  <BasicUsageComponent />
</AppExample>

  </CodeGroupItem>
    <CodeGroupItem title="Composables">

<!-- @[code{0-20}](../.vuepress/components/guide/getting-started/BasicUsageComposition.vue) -->

<BasicUsageComposition />

  </CodeGroupItem>
</CodeGroup>

## Specifying targets
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

`Tween` accepts `target` or `targets`

`Timeline` accepts `tween` or `tweens`, `timeline` or `timelines`

`ScrollTrigger` accepts `tween`, `timeline`

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
