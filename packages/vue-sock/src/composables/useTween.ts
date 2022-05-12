import { TweenEvents, UseTweenOptions, TweenRefs, UseTweenActions, UseTweenReturn } from '@/types';
import { attachControls, methods, warnTweenNotFound } from '../utils';
import gsap from 'gsap'
import { computed, ComputedRef, defineAsyncComponent, getCurrentInstance, onMounted, Ref, ref, render, toRefs, useSlots } from 'vue'
import { Controls, Tween } from '..';
import { h } from 'vue';

/** GSAP Tween composable function
 * @param options - tween options
 */

export function useTween(options: UseTweenOptions): UseTweenReturn<'targetRefs'>
export function useTween(options: UseTweenOptions, targets: HTMLElement[]): UseTweenReturn<'actionsOnly'>
export function useTween(tweenComponent: typeof Tween): UseTweenReturn<'actionsOnly'>
// export function useTween(): UseTweenReturn<'targetRef'>

export function useTween(arg1: UseTweenOptions | typeof Tween, arg2?: HTMLElement[]) {
    // const refEl = ref<HTMLElement>()
    if (typeof arg1 !== 'object') { console.error('VueSock: invalid arguments - must be either Tween component instance, or UseTweenOptions'); return };

    const isComponent = arg1 && typeof (arg1 as any)?.render === 'function'

    const isUseTweenOptions = !isComponent && (!!arg1.from || !!arg1.to)

    const options = (isComponent ? (arg1 as typeof Tween).props : isUseTweenOptions ? arg1 : undefined) as UseTweenOptions | undefined
    if (!options) {
        console.error('VueSock: invalid arguments - must be either Tween component instance, or UseTweenOptions');
        return
    }

    const targets = isComponent ? ((arg1 as typeof Tween).targets as ComputedRef<HTMLElement[]>).value.map(target => ref(target)) : arg2 ? toRefs(arg2) : isUseTweenOptions ? [100].map(i => ref<HTMLElement>()) : undefined;
    if (!targets) {
        console.error('VueSock: invalid arguments - must be either Tween component instance, or UseTweenOptions');
        return
    }

    const tween = isComponent ? (arg1 as typeof Tween).tween as Ref<gsap.core.Tween | undefined> : ref<gsap.core.Tween>()

    const instance = getCurrentInstance()
    if (!instance) {
        console.error('VueSock: No component instance found. Make sure you are using the `useTween` hook inside setup.');
        return
    }



    onMounted(() => {

        if (!targets[0].value) {
            console.error('VueSock: No targets provided');
            return
        };

        const els = (targets.filter(el => !!el.value) as Ref<HTMLElement>[]).map(target => target.value)

        if (tween.value) return;

        if (options.from && options.to) {
            tween.value = gsap.fromTo(els, options.from, options.to)
        } else if (options.from) {
            tween.value = gsap.from(els, options.from)
        } else if (options.to) {
            tween.value = gsap.to(els, options.to)
        } else {
            tween.value = gsap.set(els, options)
        }

        if (options.controls) attachControls({ ...(options.controls === true ? {} : options.controls), animation: tween.value })
    })

    const refs: TweenRefs = {
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
        // ...methods(tween.value!),
        ...refs
    } as UseTweenActions;

    if (isComponent || arg2) {
        return actions as UseTweenReturn<'actionsOnly'>
    } else {
        return [targets, actions] as UseTweenReturn<'targetRefs'>
    }
}