<p align="center" style="margin: 4rem">
  <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
    <img width="180" src="packages/docs/.vuepress/public/logo.svg" alt="VueSock logo">
  </a>
  <h1 align="center">VueSock</h1>
  <h3 align="center">A GreenSock for Vue</h3>
  <h3 align="center"><b><s>Guide</s> (under construction) • <s>Examples</s> • <s>API Reference</s></b></h3>
  <h3 align="center">
    <a href="https://www.npmjs.com/package/vue-sock">
      <img src="https://img.shields.io/npm/v/vue-sock?style=flat-square" alt="version" />
    </a>
    <a href="https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md">
      <img src="https://raw.githubusercontent.com/JoJk0/StandWithUkraine/patch-1/badges/StandWithUkraineFlat.svg" alt="version" />
    </a>    
  </h3>
</p>

[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://vshymanskyy.github.io/StandWithUkraine/)

Vue wrapper for GreenSock Animation Platform (GSAP)

- **🧮  In-template tweens** <br />
  Use GSAP components in your template

- **✨  Reactive animations** <br />
  Don't worry about updating animations manually

- **🎯  Scoped targets** <br />
  Target elements by scoped IDs and classes within your Vue component

- **🎼  Composition API** <br />
  Use composables if you prefer more programmatic approach

- **✅  Complete** <br />
  Access all properties and methods without limitations - no more ditching the library as your project grows!

> 
> ## **This project is in very early stage of development and is not fit for production use**
> 

## 📦 Installation
VueSock is GSAP-version agnostic and should work with any version you throw into your project. 

```sh
// with npm
$ npm install gsap vue-sock

// or with yarn
$ yarn add gsap vue-sock

// or with pnpm
$ pnpm add gsap vue-sock
```

Make sure you don't forget about `vue`!

## 👉 Basic usage
You can either use components, or composable functions to build your animations, depending on your preference, or use cases. You can use components in Options API and Composition API, and composables in Composition API only.

### Components
```vue
<template>
  <Tween :from="{ opacity: 0, xPercent: -20 }" :to="{ opacity: 1, xPercent: 0 }" :duration="2">
    <div class="box">Hello VueSock!</div>
  </Tween>
</template>

<script setup>
import {
  Tween
} from 'vue-sock'
</script>
```

### Composables
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
    to: { opacity: 1 },
    controls: true
  })
</script>
```

For more examples, see **~~Docs~~ (under construction)**

## 🗺 Development progress
The roadmap is published on 
[GitHub Projects](https://github.com/users/JoJk0/projects/1).


Once implemented, [Netlify](https://www.netlify.com/) is expected to be used for deployment and the docs will be plugged into [Algolia](https://www.algolia.com/) search engine.

## 💖 Funding

Help support my open-source work through [PayPal](https://paypal.com) and [GitHub Sponsors](https://github.com/sponsors/JoJk0?o=esb).

<a href="https://www.paypal.com/donate/?hosted_button_id=MVYGX9EHYRN9W"><img src="https://pics.paypal.com/00/s/YTRmYmIzYjgtNDA5My00YzY5LWJmN2QtNmMyNTU2ZGUwOTYw/file.PNG" border="0" height="35" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" /></a>

## License
MIT License © 2022 Jacob Janisz