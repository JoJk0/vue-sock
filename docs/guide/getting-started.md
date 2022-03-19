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
  <CodeGroupItem title="Component API">

```vue
<template>
  <Tween :from="{ opacity: 0 }" :to="{ opacity: 1 }">
    Hello VueSock!
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
  <div ref="helloVueSockEl">
    Hello VueSock!
  </div>
</template>

<script setup>
  import { useTween } from 'vue-sock'

  const [[ helloVueSockEl ]] = useTween({ 
    from: { opacity: 0 }, 
    to: { opacity: 1 } 
  })

</script>
```

  </CodeGroupItem>
</CodeGroup>

## License
MIT @ jojko.tech