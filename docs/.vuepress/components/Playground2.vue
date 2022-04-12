<template>
    <div>
        <div class="box">Box</div>
        <Timeline>
            <Tween target=".box" :to="{opacity: 1}" :duration="1" />
            <Tween target=".box" :to="{opacity: 0}" :duration="1" />
        </Timeline>
    </div>
</template>

<script lang="ts" setup>
import { Timeline, Tween } from '../../../lib/src';

// const props = defineProps({});

// const emit = defineEmits({});

</script>

<style lang="scss" scoped></style>
