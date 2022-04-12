# ScrollTrigger

## ScrollTrigger - basic usage

ScrollTrigger plugin gets auto-imported once mentioned in VueSock so there is no need to register it.

<CodeGroup>
  <CodeGroupItem title="Component API">

```vue
<template>
  <ScrollTrigger
    start="-200px center"
    end="200px center"
    :scrub="true"
  >
    <Tween :to="{ x: '200px', rotation: 180 }" :duration="1" ease="back.out(1.7)">
        <div class="box">VueSock</div>
    </Tween>
  </ScrollTrigger>
</template>

<script setup>
  import { Tween, ScrollTrigger } from 'vue-sock'
</script>
```

  </CodeGroupItem>
    <CodeGroupItem title="Composition API">

```vue
<template>
  <div class="box" ref="boxEl">
    VueSock
  </div>
</template>

<script setup>
  import { useTween } from 'vue-sock'

  const [[ boxEl ]] = useTween({ 
    to: { x: '200px', rotation: 180 }, 
    duration: 2,
    ease: 'back.out(1.7)',
    ScrollTrigger: {
        start: '-200px center',
        end: '200px center',
        scrub: true
    }
  })

</script>
```

  </CodeGroupItem>
</CodeGroup>

## Targeting
If you use Refs for `target` and `scroller`, make sure you have the element ready with e.x. `v-if="yourRefEl"`

```vue {4,8}
<template>
  <section class="container" ref="containerEl">
    <ScrollTrigger
      v-if="containerEl"
      start="-200px center"
      end="200px center"
      :scrub="true"
      :trigger="containerEl"
    >
      <Tween :to="{ x: '200px', rotation: 180 }" :duration="1" ease="back.out(1.7)">
          <div class="box">VueSock</div>
      </Tween>
    </ScrollTrigger>
  </section>
</template>

<script lang="ts" setup>
import { ScrollTrigger, Tween } from 'vue-sock'

const containerEl = ref<HTMLElement>()

</script>
```

## Use "trigger" prop

## Custom scroller container

## Standalone

<CodeGroup>
  <CodeGroupItem title="Component API">

```vue
<template>
  <ScrollTrigger
    start="-200px center"
    end="200px center"
    :scrub="true"
    @toggle="onToggle($event)"
  >
    <div class="box">VueSock</div>
  </ScrollTrigger>
</template>

<script setup>
  import { ScrollTrigger } from 'vue-sock'

  const onToggle = (self) => {
    console.log('toggled, isActive:', self.isActive)
  }
</script>
```

  </CodeGroupItem>
    <CodeGroupItem title="Composition API">

```vue
<template>
  <div class="box" ref="boxEl">
    VueSock
  </div>
</template>

<script setup>
  import { useScrollTrigger } from 'vue-sock'

  const [[ boxEl ], { onToggle }] = useScrollTrigger({ 
    start: '-200px center',
    end: '200px center',
    scrub: true
  })

  onToggle(self => {
      console.log('toggled, isActive:', self.isActive)
  })

</script>
```

  </CodeGroupItem>
</CodeGroup>

## Using Lottie animations
If you use third-party apps for animating, you can use those animations with ScrollTrigger as long as they are in Lottie format.

For more info, see [Hook a Lottie animation up to ScrollTrigger](https://greensock.com/docs/v3/HelperFunctions#lottie) in GSAP Docs.