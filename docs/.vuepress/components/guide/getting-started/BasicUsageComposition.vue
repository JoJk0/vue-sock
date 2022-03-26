<template>
  <div ref="helloVueSockEl">
    Hello VueSock!
  </div>
</template>

<script setup>
  import { useTween } from '../../../../../lib/src'
  // import { useTween } from 'vue-sock'

  const [[ helloVueSockEl ]] = useTween({ 
    from: { opacity: 0 }, 
    to: { opacity: 1 },
    controls: true
  })
  
</script>

<style scoped>

</style>