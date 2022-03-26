# Usage of tweens

## From
<CodeGroup>
  <CodeGroupItem title="Component API">

```vue
<template>
  <Tween :from="{ x: '200px', rotation: 180 }" :duration="2">
    <div class="box">VueSock</div>
  </Tween>
</template>

<script setup>
  import { Tween } from 'vue-sock'
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
    from: { x: '200px', rotation: 180 }, 
    duration: 2
  })

</script>
```

  </CodeGroupItem>
</CodeGroup>

## To
<CodeGroup>
  <CodeGroupItem title="Component API">

```vue
<template>
  <Tween :to="{ x: '200px', rotation: 180 }" :duration="2" ease="back.out(1.7)">
    <div class="box">VueSock</div>
  </Tween>
</template>

<script setup>
  import { Tween } from 'vue-sock'
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
    ease: 'back.out(1.7)'
  })

</script>
```

  </CodeGroupItem>
</CodeGroup>

## FromTo
<CodeGroup>
  <CodeGroupItem title="Component API">

```vue
<template>
  <Tween 
    :from="{ x: '100px', rotation: 45 }" 
    :to="{ x: '200px', rotation: 135 }"
    :duration="2"
    >
    <div class="box">VueSock</div>
  </Tween>
</template>

<script setup>
  import { Tween } from 'vue-sock'
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
    from: { x: '100px', rotation: 45 }, 
    to: { x: '200px', rotation: 135 }, 
    duration: 2
  })

</script>
```

  </CodeGroupItem>
</CodeGroup>

## Stagger
<CodeGroup>
  <CodeGroupItem title="Component API">

```vue
<template>
  <Tween :to="{ x: '200px' }" :stagger="0.2" ease="elastic.out(0.2, 0.1)">
    <div class="box">VueSock</div>
    <div class="box">VueSock</div>
    <div class="box">VueSock</div>
    <div class="box">VueSock</div>
    <div class="box">VueSock</div>
  </Tween>
</template>

<script setup>
  import { Tween } from 'vue-sock'
</script>
```

  </CodeGroupItem>
    <CodeGroupItem title="Composition API">

```vue
<template>
  <div class="box-container" ref="boxContainerEl">
    <div class="box">VueSock</div>
    <div class="box">VueSock</div>
    <div class="box">VueSock</div>
    <div class="box">VueSock</div>
    <div class="box">VueSock</div>
  </div>
</template>

<script setup>
  import { useTween } from 'vue-sock'

  const [[ boxContainerEl ]] = useTween({ 
    to: { x: '200px' }, 
    stagger: 0.2,
    ease: 'elastic.out(0.2, 0.1)'
  })

</script>
```

  </CodeGroupItem>
</CodeGroup>

## Advanced stagger

## Deferring animation
By default, GSAP plays tweens automatically once the DOM is loaded. To prevent this, add `paused: true` prop. Use `animate()` function to trigger animation on demand.
<CodeGroup>
  <CodeGroupItem title="Component API">

```vue
<template>
  <Tween :to="{ x: '200px' }" ref="tweenEl" paused>
    <div class="box">VueSock</div>
  </Tween>
  <button @click="tweenEl.animate()">Animate!</button>
</template>

<script setup>
  import { Tween } from 'vue-sock'

  const tweenEl = ref()
</script>
```

  </CodeGroupItem>
    <CodeGroupItem title="Composition API">

```vue
<template>
  <div class="box" ref="boxEl">
    VueSock
  </div>
  <button @click="animate">Animate!</button>
</template>

<script setup>
  import { useTween } from 'vue-sock'

  const [ [ boxEl ], { animate } ] = useTween({ 
    to: { x: '200px' },
    paused: true
  })

</script>
```

  </CodeGroupItem>
</CodeGroup>

## Events
<CodeGroup>
  <CodeGroupItem title="Component API">

```vue
<template>
  <Tween :to="{ x: '200px' }" @animationStart="onAnimationStart">
    <div class="box">VueSock</div>
  </Tween>
</template>

<script setup>
  import { Tween } from 'vue-sock'

  const onAnimationStart = () => {
      console.log('Animation started!')
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
  import { useTween } from 'vue-sock'

  const [ [ boxEl ], { onAnimationStart } ] = useTween({ 
    to: { x: '200px' }
  })

  onAnimationStart(() => {
      console.log('Animation started!')
  })
</script>
```

  </CodeGroupItem>
</CodeGroup>

## Access to methods

## Multiple targets
<CodeGroup>
  <CodeGroupItem title="Component API">

```vue
<template>
  <Tween :to="{ x: '200px' }">
    <div class="box">VueSock</div>
    <div class="box">VueSock</div>
    <div class="box">VueSock</div>
  </Tween>
</template>

<script setup>
  import { Tween } from 'vue-sock'
</script>
```

  </CodeGroupItem>
    <CodeGroupItem title="Composition API">

```vue
<template>
  <div class="box-container">
    <div class="box" ref="boxOneEl">VueSock</div>
    <div class="box" ref="boxTwoEl">VueSock</div>
    <div class="box" ref="boxThreeEl">VueSock</div>
  </div>
</template>

<script setup>
  import { useTween } from 'vue-sock'

  const [[ boxOneEl, boxTwoEl, boxThreeEl ]] = useTween({ 
    to: { x: '200px' }
  })

</script>
```

  </CodeGroupItem>
</CodeGroup>

## Advanced multiple targets