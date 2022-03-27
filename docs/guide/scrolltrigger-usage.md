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