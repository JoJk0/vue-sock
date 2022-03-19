# Controls helper
If you would like to work with your animations, controls helper could be handy in such situations. It allows you to play, pause, restart and scrub through the animation. 

<CodeGroup>
  <CodeGroupItem title="Component API">

```vue
<template>
  <Controls playState="play">
    <Tween :to="{ x: '200px', rotation: 180 }" :duration="2" ease="back.out(1.7)">
        <div class="box">VueSock</div>
    </Tween>
  </Controls>
</template>

<script setup>
  import { Tween, Controls } from 'vue-sock'
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
    controls: true,
    playState: 'play'
  })

</script>
```

  </CodeGroupItem>
</CodeGroup>