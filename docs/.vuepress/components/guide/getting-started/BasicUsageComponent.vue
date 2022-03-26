<template>
  <Tween :from="{ opacity: 0, xPercent: -20 }" :to="{ opacity: 1, xPercent: 0 }" :duration="2">
    <div class="box">Hello VueSock!</div>
  </Tween>
</template>

<script setup>
import {
  Tween
} from '../../../../../lib/src'
// } from 'vue-sock'

</script>

<style scoped>
.box {
  width: 6em;
  height: 6em;
  border-radius: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  line-height: 130%;
  text-align: center;
  background-color: rgba(116, 179, 0, 0.5);
  border: 0.1em solid rgba(116, 179, 0, 0.5);
}
</style>