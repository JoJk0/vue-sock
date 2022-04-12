import { ComputedRef, PropType, Ref, WritableComputedRef } from 'vue';
import { ElementTarget, EmitKeys, OnReadyEmit, Propify, ScrollTriggerTweenTimelineOptions } from '.';
import { AnimationControlsOptions } from './controls';
import { TimelineTweenOptions } from './timeline';

export type TweenOptions = {

    /** An object containing the initial (starting) property/value pairs.  */
    from?: Parameters<typeof gsap.from>['2'];

    /** An object containing the destination properties/values to animate to. */
    to?: Parameters<typeof gsap.to>['2'];

    /** The scope to be used for all of the callbacks (onStart, onUpdate, onComplete, etc.). */
    callbackScope?: gsap.TweenVars['callbackScope'];

    /** Assign arbitrary data to this property (a string, a reference to an object, whatever) and it gets attached to the tween instance itself so that you can reference it later like yourTween.data. */
    data?: gsap.TweenVars['data'];

    /** Amount of delay before the animation should begin (in seconds). */
    delay?: gsap.TweenVars['delay'];

    /** The duration of the animation (in seconds). Default: `0.5`. */
    duration?: gsap.TweenVars['duration'];

    /** Controls the rate of change during the animation, giving it a specific feel. For example, `"elastic"` or `"strong.inOut"`. See the Ease Visualizer for a list of all of the options. ease can be a String (most common) or a function that accepts a progress value between `0` and `1` and returns a converted, similarly normalized value. Default: `"power1.out"`. */
    ease?: gsap.TweenVars['ease'];

    endArray?: gsap.TweenVars['endArray'];

    /** Normally a tween waits to render for the first time until the very next tick (update cycle) unless you specify a delay. Set immediateRender: true to force it to render immediately upon instantiation. Default: `false` for `to()` tweens, `true` for `from()` and `fromTo()` tweens or anything with a `scrollTrigger` applied.  */
    immediateRender?: gsap.TweenVars['immediateRender'];

    /** When a tween renders for the very first time and reads its starting values, GSAP will try to delay writing of values until the very end of the current "tick" which can improve performance because it avoids the read/write/read/write layout thrashing that browsers dislike. To disable lazy rendering for a particular tween, set `lazy: false`. In most cases, there's no need to set lazy. To learn more, watch this video. Default: `true` (except for zero-duration tweens). */
    lazy?: gsap.TweenVars['lazy'];

    /** To animate the targets to various states, use `keyframes` - an array of vars objects that serve as to() tweens. For example, keyframes: [{x:100, duration:1}, {y:100, duration:0.5}]. All keyframes will be perfectly sequenced back-to-back, but you can define a delay value to add spacing between each step (or a negative delay would create an overlap). */
    keyframes?: gsap.TweenVars['keyframes'];

    /** If `true`, all tweens of the same targets will be killed immediately regardless of what properties they affect. If `"auto"`, when the tween renders for the first time it hunt down any conflicts in active animations (animating the same properties of the same targets) and kill only those parts of the other tweens. Non-conflicting parts remain intact. If `false`, no overwriting strategies will be employed. Default: `false`.  */
    overwrite?: gsap.TweenVars['overwrite'];

    /** If `true`, the animation will invert its starting and ending values (this is what a `from()` tween does internally), though the ease doesn't get flipped. In other words, you can make a `to()` tween into a `from()` by setting `runBackwards: true`.  */
    runBackwards?: gsap.TweenVars['runBackwards'];

    /** If multiple targets are defined, you can easily stagger the start times for each by setting a value like stagger: `0.1` (for 0.1 seconds between each start time). Or you can get much more advanced staggers by using a `stagger` object. For more information, see the stagger documentation.  */
    stagger?: gsap.TweenVars['stagger'];

    /** Defines starting values for any properties (even if they're not animating). For example, `startAt: {x: -100, opacity: 0}`  */
    startAt?: gsap.TweenVars['startAt'];

    /** Allows you to alter the ease in the tween's yoyo phase. Set it to a specific ease like "power2.in" or set it to true to simply invert the tween's normal ease. Note: GSAP is smart enough to automatically set yoyo: true if you define any yoyoEase, so there's less code for you to write. Default: `false`. */
    yoyoEase?: gsap.TweenVars['yoyoEase'];

    /** Allows you to (optionally) assign a unique identifier to your tween instance so that you can find it later with `gsap.getById()` and it will show up in GSDevTools with that id. */
    id?: gsap.TweenVars['id'];

    /** Normally tweens inherit from their parent timeline's defaults object (if one is defined), but you can disable this on a per-tween basis by setting `inherit: false`. */
    inherit?: gsap.TweenVars['inherit'];

    /** If `true`, the animation will pause itself immediately upon creation. Default: `false`.  */
    paused?: gsap.TweenVars['paused'];

    /** How many times the animation should repeat. So `repeat: 1` would play a total of two iterations. Default: `0`.
`repeat: -1` will repeat infinitely.  */
    repeat?: gsap.TweenVars['repeat'];

    /** Amount of time to wait between repeats (in seconds). Default: `0`. */
    repeatDelay?: gsap.TweenVars['repeatDelay'];

    /** Setting `repeatRefresh: true` causes a repeating tween to `invalidate()` and re-record its starting/ending values internally on each full iteration (not including yoyo's). This is useful when you use dynamic values (relative, random, or function-based). For example, `x: "random(-100, 100)"` would get a new random `x` value on each repeat. duration, delay, and stagger do NOT refresh. */
    repeatRefresh?: gsap.TweenVars['repeatRefresh'];

    /** If `true`, the animation will start out with its playhead reversed, meaning it will be oriented to move toward its start. Since the playhead begins at a time of 0 anyway, a reversed tween will appear paused initially because its playhead cannot move backward past the start. */
    reversed?: gsap.TweenVars['reversed'];

    /** If `true`, every other repeat iteration will run in the opposite direction so that the tween appears to go back and forth. This has no affect on the reversed property though. So if `repeat` is `2` and `yoyo` is `false`, it will look like: `start - 1 - 2 - 3 - 1 - 2 - 3 - 1 - 2 - 3 - end`. But if yoyo is true, it will look like: `start - 1 - 2 - 3 - 3 - 2 - 1 - 1 - 2 - 3 - end`. Default: `false`. */
    yoyo?: gsap.TweenVars['yoyo'];

} & TimelineTweenOptions & ScrollTriggerTweenTimelineOptions

export type UseTweenOptions = TweenOptions & AnimationControlsOptions
export type TweenTarget = ElementTarget
export type TweenTargets = TweenTarget[]

export type TweenTargetOptions = {
    /** An element or ID/classname of element this tween is applied to */
    target?: TweenTarget
}

export type TweenTargetsOptions = {
    /** An array of elements or IDs/classnames of elements this tween is applied to */
    targets?: TweenTargets
}

export type TweenProps = Propify<TweenOptions & TweenTargetOptions & TweenTargetsOptions & TweenState>

export type TweenMethods = {}

export type TweenRefs = {
    progress: WritableComputedRef<number | undefined>,
    yoyo: WritableComputedRef<boolean | undefined>,
    totalTime: WritableComputedRef<number | undefined>,
    totalProgress: WritableComputedRef<number | undefined>,
    totalDuration: WritableComputedRef<number | undefined>,
    timeScale: WritableComputedRef<number | undefined>,
    time: WritableComputedRef<number | undefined>,
    startTime: WritableComputedRef<number | undefined>,
    reversed: WritableComputedRef<boolean | undefined>,
    repeatDelay: WritableComputedRef<number | undefined>,
    repeat: WritableComputedRef<number | undefined>,
    paused: WritableComputedRef<boolean | undefined>,
    iteration: WritableComputedRef<number | undefined>,
    duration: WritableComputedRef<number | undefined>,
    delay: WritableComputedRef<number | undefined>,
    isActive: ComputedRef<boolean | undefined>,
}

export type TweenEvents = {
    [P in gsap.CallbackType]: (hook: (tween: gsap.core.Tween) => void) => void
}

export type TweenEmits = {
    [P in EmitKeys<gsap.CallbackType>]: (tween: gsap.core.Tween) => gsap.core.Tween
} & TweenInternalEmits;

export type TweenInternalEmits = {
    // progressChange: (e: number) => number,
    pausedChange: (e: boolean) => boolean,
    reversedChange: (e: boolean) => boolean,
    ready: (e: OnReadyEmit<gsap.core.Tween>) => OnReadyEmit<gsap.core.Tween>,
    destroyed: (e: gsap.core.Tween) => gsap.core.Tween,
}

export type UseTweenActions = {
    tween: Ref<gsap.core.Tween>,
} & TweenEvents & TweenRefs

export type UseTweenReturnType = 'targetRefs' | 'actionsOnly'

export type UseTweenReturn<T extends UseTweenReturnType> = T extends 'targetRefs' ? [
    Ref<HTMLElement | undefined>[],
    UseTweenActions
] : T extends 'actionsOnly' ? UseTweenActions : never

export type TweenState = {
    // progress: WritableComputedRef<number | undefined>,
    // yoyo: WritableComputedRef<boolean | undefined>,
    // totalTime: WritableComputedRef<number | undefined>,
    // totalProgress: WritableComputedRef<number | undefined>,
    // totalDuration: WritableComputedRef<number | undefined>,
    // timeScale: WritableComputedRef<number | undefined>,
    // time: WritableComputedRef<number | undefined>,
    // startTime: WritableComputedRef<number | undefined>,
    // reversed: WritableComputedRef<boolean | undefined>,
    // repeatDelay: WritableComputedRef<number | undefined>,
    // repeat: WritableComputedRef<number | undefined>,
    // paused: WritableComputedRef<boolean | undefined>,
    // iteration: WritableComputedRef<number | undefined>,
    // isActive: ComputedRef<boolean | undefined>,
    // duration: WritableComputedRef<number | undefined>,
    // delay: WritableComputedRef<number | undefined>,
    progress?: number
}
