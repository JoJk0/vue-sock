# Usage of timelines

## Basic timeline

<CodeGroup>
  <CodeGroupItem title="Component API">

```vue
<template>
  <Timeline>
    <div class="box">VueSock</div>
    <Tween :from="{ opacity: 0 }" :to="{ opacity: 1 }" :duration="2" />
    <Tween :to="{ x: '200px' }" />
    <Tween :to="{ rotation: 180 }" position="+=1" />
  </Timeline>
</template>

<script setup>
  import { Tween, Timeline } from 'vue-sock'
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
  import { useTimeline } from 'vue-sock'

  const [[ boxEl ]] = useTimeline([
    { 
        from: { opacity: 0 },
        to: { opacity: 1 },
        duration: 2
    },
    {
        to: { x: '200px' }
    },
    {
        to: { rotation: 180 },
        position: '+=1'
    }
  ])

</script>
```

  </CodeGroupItem>
</CodeGroup>

## Multiple targets (one-to-one)
If your target needs to be used by only one tween, then your target can be just nested in `Tween`.

## Multiple targets (many-to-many)
If you need more complex usage, you can put your targets alongside tweens in `Timeline` and refer to them from `Tween` by name, or position in array (starting from 0). Bear in mind that target names are scoped to the current timeline only!

<CodeGroup>
  <CodeGroupItem title="Component API">

```vue
<template>
  <Timeline>
    <div class="box">VueSock</div>
    <div class="box" name="box-two">VueSock</div>
    <div class="box">VueSock</div>
    <Tween 
        :from="{ opacity: 0 }" 
        :to="{ opacity: 1 }" 
        :duration="2" 
        :target="0" 
    />
    <Tween :to="{ x: '200px' }" target="box-two" />
    <Tween :to="{ rotation: 180 }" position="+=1" :target="[2, 'box-two']" />
  </Timeline>
</template>

<script setup>
  import { Tween, Timeline } from 'vue-sock'
</script>
```

  </CodeGroupItem>
    <CodeGroupItem title="Composition API">

```vue
<template>
  <div class="box" ref="boxOneEl">
    VueSock
  </div>
  <div class="box" ref="boxTwoEl">
    VueSock
  </div>
  <div class="box" ref="boxThreeEl">
    VueSock
  </div>
</template>

<script setup>
  import { useTimeline } from 'vue-sock'

  const [[boxOneEl, boxTwoEl, boxThreeEl]] = useTimeline([
    {
        target: 0,
        from: { opacity: 0 },
        to: { opacity: 1 },
        duration: 2
    },
    {
        target: 'boxTwoEl',
        to: { x: '200px' }
    },
    {
        target: [2, 'boxTwoEl']
        to: { rotation: 180 },
        position: '+=1'
    }
  ])

</script>
```

  </CodeGroupItem>
</CodeGroup>

## Nested timelines

<CodeGroup>
  <CodeGroupItem title="Component API">

```vue
<template>
  <Timeline>
    <div class="box">VueSock</div>
    <Tween :from="{ scaleX: 0.5, scaleY: 0.5 }" :duration="2" />
    <Tween :to="{ x: '200px' }" />
    <Timeline>
        <div class="box">VueSock</div>
        <Tween :from="{ scaleX: 0.5, scaleY: 0.5 }" :duration="2" />
        <Tween :to="{ x: '200px' }" />
    </Timeline>
  </Timeline>
</template>

<script setup>
  import { Tween, Timeline } from 'vue-sock'
</script>
```

  </CodeGroupItem>
    <CodeGroupItem title="Composition API">

```vue
<template>
  <div class="box" ref="boxOneEl">
    VueSock
  </div>
  <div class="box" ref="boxTwoEl">
    VueSock
  </div>
</template>

<script setup>
  import { useTimeline } from 'vue-sock'

  const [[ boxOneEl, boxTwoEl ]] = useTimeline([
    {
        target: 'boxOneEl',
        to: { scaleX: 0.5, scaleY: 0.5 },
        duration: 2
    },
    {
        target: 'boxOneEl',
        to: { x: '200px' },
    },
    [[
        {
            target: 'boxTwoEl',
            to: { scaleX: 0.5, scaleY: 0.5 },
            duration: 2
        },
        {
            target: 'boxTwoEl',
            to: { x: '200px' },
        }
    ]]
  ])
</script>
```

  </CodeGroupItem>
</CodeGroup>

## Labels

<CodeGroup>
  <CodeGroupItem title="Component API">

```vue
<template>
  <Timeline>
    <div class="box">VueSock</div>
    <Label name="sec4" :position="4" />
    <Label name="sec6" :position="6" />
    <Tween :to="{ x: '200px' }" />
    <Tween :to="{ rotation: 180 }" position="sec4" />
    <Tween :to="{ x: '0px' }" position="sec6" />
  </Timeline>
</template>

<script setup>
  import { Tween, Timeline, Label } from 'vue-sock'
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
  import { useTimeline } from 'vue-sock'

  const labels = [
      {
          name: 'sec4',
          position: 4
      },
      {
          name: 'sec6',
          position: 6
      }
  ]

  const [[ boxEl ]] = useTimeline([
    {
        to: { x: '200px' },
        duration: 2
    },
    {
        to: { rotation: 180 },
        position: 'sec4'
    },
    {
        to: { x: '0px' },
        position: 'sec6'
    }
  ], { labels })

</script>
```

  </CodeGroupItem>
</CodeGroup>