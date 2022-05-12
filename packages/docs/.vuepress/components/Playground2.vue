<template>
    <div class="container">
        <!-- <Tween :targets="['.box', '.box2']" :from="{ opacity: 0 }" :to="{ opacity: 1 }" /> -->
        <Tween :from="{ opacity: 0 }" :to="{ opacity: 1 }" :duration="1">
            <div class="box">Box</div>
        </Tween>
        <div class="box2">Box2</div>
        <!-- <ScrollTrigger trigger=".container" start="top center" end="bottom center" scrub markers>
            <Timeline>
                <Tween target=".box" :from="{ opacity: 0 }" :to="{ opacity: 1 }" :duration="1" />
                <Tween target=".box" :from="{ opacity: 1 }" :to="{ opacity: 0 }" :duration="1"
                    :immediate-render="false" />
            </Timeline>
        </ScrollTrigger> -->
    </div>
</template>

<script lang="ts" setup>
import { Timeline, Tween, ScrollTrigger } from 'vue-sock';

// const props = defineProps({});

// const emit = defineEmits({});

</script>

<style lang="scss" scoped>
</style>
