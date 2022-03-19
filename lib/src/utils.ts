import { computed } from 'vue'

export const warnTweenNotFound = () => {
    console.warn('VueSock: Tween not found')
}

export const methods = (tween: gsap.core.Tween) => {
    const {
        restart,
        seek,
        kill,
        invalidate
    } = tween

    return {
        invalidate,
        kill,
        seek,
        restart,
    }
}

export const additionalProps = (tween: gsap.core.Tween) => ({
    endTime: computed(() => tween.endTime()),
    isActive: computed(() => tween.isActive()),
    time: computed({
        get: () => tween.time(),
        set: v => tween.time(v) 
    }),
    timeScale: computed({
        get: () => tween.timeScale(),
        set: v => tween.timeScale(v) 
    }),
    progress: computed({
        get: () => tween.progress(),
        set: v => tween.progress(v) 
    }),
    totalProgress: computed({
        get: () => tween.totalProgress(),
        set: v => tween.totalProgress(v) 
    }),
    totalDuration: computed({
        get: () => tween.totalDuration(),
        set: v => tween.totalDuration(v) 
    }),
    totalTime: computed({
        get: () => tween.totalTime(),
        set: v => tween.totalTime(v) 
    }),
    startTime: computed({
        get: () => tween.startTime(),
        set: v => tween.startTime(v) 
    }),
    iteration: computed({
        get: () => tween.iteration(),
        set: v => tween.iteration(v) 
    }),
})