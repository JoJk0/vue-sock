<template>
  <div class="component">
    <Controls>
      <div class="box" ref="helloVueSockEl">
        Hello VueSock!
      </div>
    </Controls>
    <div class="child">child</div>
  </div>
</template>

<script setup>
import { useTween } from 'vue-sock'

const [[helloVueSockEl], { Controls }] = useTween({
  to: { x: 100, rotation: 360 },
  duration: 2
})

</script>

<style scoped>
.box {
  transform: translateX(-100px) rotate(0deg);
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