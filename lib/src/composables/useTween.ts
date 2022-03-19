import { TweenEvents, TweenOptions } from '@/types';
import { methods, warnTweenNotFound } from '../utils';
import gsap from 'gsap'
import { computed, onMounted, Ref, ref } from 'vue'

/** GSAP Tween composable function
 * @param options - tween options
 */
export const useTween = (options: TweenOptions) => {
    // const refEl = ref<HTMLElement>()

    const targets = [100].map(i => ref<HTMLElement>());

    const tween = ref<gsap.core.Tween>()
    
    onMounted(() => {
        if (!targets[0].value) return;

        const els = (targets.filter(el => !!el.value) as Ref<HTMLElement>[]).map(target => target.value)

        if (options.from && options.to) {
            tween.value = gsap.fromTo(els, options.from, options.to)
        } else if (options.from) {
            tween.value = gsap.from(els, options.from)
        } else if(options.to) {
            tween.value = gsap.to(els, options.to)
        } else {
            tween.value = gsap.set(els, options)
        }
    })

    const refs = {
        progress: computed({
            get: () => tween.value?.progress(),
            set: (v) => v ? tween.value?.progress(v) : undefined
        }),
        yoyo: computed({
            get: () => tween.value?.yoyo(),
            set: (v) => v ? tween.value?.yoyo(v) : undefined
        }),
        totalTime: computed({
            get: () => tween.value?.totalTime(),
            set: (v) => v ? tween.value?.totalTime(v) : undefined
        }),
        totalProgress: computed({
            get: () => tween.value?.totalProgress(),
            set: (v) => v ? tween.value?.totalProgress(v) : undefined
        }),
        totalDuration: computed({
            get: () => tween.value?.progress(),
            set: (v) => v ? tween.value?.progress(v) : undefined
        }),
        timeScale: computed({
            get: () => tween.value?.timeScale(),
            set: (v) => v ? tween.value?.timeScale(v) : undefined
        }),
        time: computed({
            get: () => tween.value?.time(),
            set: (v) => v ? tween.value?.time(v) : undefined
        }),
        startTime: computed({
            get: () => tween.value?.startTime(),
            set: (v) => v ? tween.value?.startTime(v) : undefined
        }),
        reversed: computed({
            get: () => tween.value?.reversed(),
            set: (v) => v ? tween.value?.reversed(v) : undefined
        }),
        repeatDelay: computed({
            get: () => tween.value?.repeatDelay(),
            set: (v) => v ? tween.value?.repeatDelay(v) : undefined
        }),
        repeat: computed({
            get: () => tween.value?.repeat(),
            set: (v) => v ? tween.value?.repeat(v) : undefined
        }),
        paused: computed({
            get: () => tween.value?.paused(),
            set: (v) => v ? tween.value?.paused(v) : undefined
        }),
        iteration: computed({
            get: () => tween.value?.iteration(),
            set: (v) => v ? tween.value?.iteration(v) : undefined
        }),
        isActive: computed(() => tween.value?.isActive()),
        duration: computed({
            get: () => tween.value?.duration(),
            set: (v) => v ? tween.value?.duration(v) : undefined
        }),
        delay: computed({
            get: () => tween.value?.delay(),
            set: (v) => v ? tween.value?.delay(v) : undefined
        }),
    }

    const events: TweenEvents = {
        onInterrupt: hook => {
            if (!tween.value) warnTweenNotFound()
            tween.value?.eventCallback('onInterrupt', () => hook(tween.value!))
        },

        /** A function to call every time the animation updates (on each "tick" that moves its playhead).  */
        onUpdate: hook => {
            if (!tween.value) warnTweenNotFound()
            tween.value?.eventCallback('onUpdate', () => hook(tween.value!))
        },

        /** A function to call when the animation has reached its beginning again from the reverse direction (excluding repeats). */
        onReverseComplete: hook => {
            if (!tween.value) warnTweenNotFound()
            tween.value?.eventCallback('onReverseComplete', () => hook(tween.value!))
        },

        /** A function to call each time the animation enters a new iteration cycle (repeats). Obviously this only occurs if you set a non-zero repeat. */
        onRepeat: hook => {
            if (!tween.value) warnTweenNotFound()
            tween.value?.eventCallback('onRepeat', () => hook(tween.value!))
        },

        /** A function to call when the animation has completed. */
        onComplete: hook => {
            if (!tween.value) warnTweenNotFound()
            tween.value?.eventCallback('onComplete', () => hook(tween.value!))
        },

        /** A function to call when the animation begins (when its time changes from 0 to some other value which can happen more than once if the tween is restarted multiple times).  */
        onStart: hook => {
            if (!tween.value) warnTweenNotFound()
            tween.value?.eventCallback('onStart', () => hook(tween.value!))
        },
    }

    const actions = {
        tween,
        ...events,
        ...methods(tween.value!),
        ...refs
    };

    return [targets, actions] as const
}