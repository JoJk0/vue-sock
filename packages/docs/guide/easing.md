# Easing
Easing works in the same way as in vanilla GSAP.

For more information, see [Eases](https://greensock.com/docs/v3/Eases) in GSAP Docs

## Defining eases
You can define ease with a convenience `defineEase` helper that auto-registers eases

```ts
import { defineEase } from 'vue-sock'

const myEase = defineEase({
    name: 'myEase',
    ease: progress => {
        // Your ease function
    }
})
```

## Using eases
You can use eases by either importing defined ease function:

```ts
import { myEase } from '@/eases'

const [[ targetEl ]] = useTween({ 
    from: { opacity: 0 }, 
    to: { opacity: 1 }, 
    ease: myEase 
})
```

or by just referring to its name:

```ts
const [[ targetEl ]] = useTween({ 
    from: { opacity: 0 }, 
    to: { opacity: 1 }, 
    ease: 'myEase' 
})
```