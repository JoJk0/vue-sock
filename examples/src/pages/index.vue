<template>
  <div>
    <p>
      <ScrollTrigger start="-200px center" end="200px center" :scrub="0.5" markers>
        <Tween :from="{opacity: 0}" :to="{opacity: 1}" :duration="1" ease="none" :stagger="0.2">
          <div class="lol">
            Lolz
          </div>
          <div class="lol">
            Lolz
          </div>
          <div class="lol">
            Lolz
          </div>
          <div class="lol">
            Lolz
          </div>
        </Tween>
      </ScrollTrigger>
      <Timeline :duration="1">
        <div class="lol">
          Lolz
        </div>
        <Tween :from="{opacity: 0}" :to="{opacity: 1}" ease="none" />
      </Timeline>
    </p>
    <ul>
      <li>Tween example</li>
      <li>Staggered tween</li>
      <li>Timeline example</li>
      <li>ScrollTrigger example</li>
    </ul>
  </div>
</template>
<script setup lang="ts">

import { ScrollTrigger, Timeline, Tween } from 'vue-sock'

</script>
