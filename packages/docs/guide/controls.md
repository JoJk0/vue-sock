# Controls helper
If you would like to work with your animations, controls helper could be handy in such situations. It's an UI component that allows you to play, pause, restart and scrub through the animation.

If you need more advanced playback control, check out [GSDevTools](https://greensock.com/gsdevtools/), available for [Club GreenSock](https://greensock.com/club/) members.

## Single target

<CodeGroup>
  <CodeGroupItem title="Components">

```vue
<template>
  <Controls container>
    <Tween :to="{ x: '200px', rotation: 180 }" :duration="2" ease="back.out(1.7)">
        <div class="box">VueSock</div>
    </Tween>
  </Controls>
</template>

<script setup>
  import { Tween, Controls } from 'vue-sock'
</script>
```

If your tween/timeline has a single target, you can just wrap it over `Controls`. In that case, you can also use `container` option to wrap element in a container.

  </CodeGroupItem>
    <CodeGroupItem title="Composables">

```vue
<template>
  <Controls container>
    <div class="box" ref="boxEl">
      VueSock
    </div>
  </Controls>
</template>

<script setup>
  import { useTween } from 'vue-sock'

  const [[ boxEl ], { Controls }] = useTween({ 
    to: { x: '200px', rotation: 180 }, 
    duration: 2,
    ease: 'back.out(1.7)'
  })
</script>
```

If your tween/timeline has a single target, you can extract `Controls` component from the composable that you can place anywhere in your component you like. Notice that we are wrapping the **target** here, not an animation. You can wrap desired element, and optionally use `container` option to wrap element in container.

  </CodeGroupItem>
</CodeGroup>

## Multiple targets
If your tween/timeline has a multiple targets, then controls cannot be assigned to any target and therefore cannot be containerized.

<CodeGroup>
  <CodeGroupItem title="Components">

```vue
<template>
  <div class="boxOne">VueSock</div>
  <div class="boxTwo">VueSock</div>
  <div class="box">VueSock</div>

  <Controls>
    <Tween
      :targets="['.box', '.boxOne', '.boxTwo']"
      :to="{ x: '200px', rotation: 180 }" 
      :duration="2" 
      ease="back.out(1.7)" 
    />
  </Controls>
</template>

<script setup>
  import { Tween, Controls } from 'vue-sock'
</script>
```

  </CodeGroupItem>
    <CodeGroupItem title="Composables">

```vue
<template>
  <div class="box" ref="boxEl">VueSock</div>
  <div class="boxOne" ref="boxOneEl">VueSock</div>
  <div class="boxTwo" ref="boxTwoEl">VueSock</div>
  <Controls />
</template>

<script setup>
  import { useTween } from 'vue-sock'

  const [[ boxEl, boxOneEl, boxTwoEl ], { Controls }] = useTween({ 
    to: { x: '200px', rotation: 180 }, 
    duration: 2,
    ease: 'back.out(1.7)'
  })

</script>
```

  </CodeGroupItem>
</CodeGroup>