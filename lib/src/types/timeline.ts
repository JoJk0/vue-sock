import { PropType } from 'vue';
import { EmitKeys, ScrollTriggerTweenTimelineOptions } from '.';

export type TimelineOptions = {
    /** If `autoRemoveChildren` is set to `true`, as soon as child tweens/timelines complete, they will automatically get killed/removed. This is normally undesireable because it prevents going backwards in time (like if you want to `reverse()` or set the progress lower, etc.). It can, however, improve speed and memory management. The root timelines use `autoRemoveChildren: true`. */
    autoRemoveChildren?: gsap.TimelineVars['autoRemoveChildren'];

    /** The scope to be used for all of the callbacks (`onStart`, `onUpdate`, `onComplete`, etc.). The scope is what `this` refers to inside any of the callbacks. */
    callbackScope?: gsap.TimelineVars['callbackScope'];

    /** Amount of delay in seconds before the animation should begin. */
    delay?: gsap.TimelineVars['delay'];

    /** If `true`, the animation will pause itself immediately upon creation. */
    paused?: gsap.TimelineVars['paused'];

    /** Number of times that the animation should repeat after its first iteration. For example, if `repeat` is `1`, the animation will play a total of twice (the initial play plus 1 repeat). To repeat indefinitely, use `-1`. `repeat` should always be an integer. */
    repeat?: gsap.TimelineVars['repeat'];

    /** Amount of time in seconds between repeats. For example, if `repeat` is `2` and `repeatDelay` is `1`, the animation will play initially, then wait for 1 second before it repeats, then play again, then wait 1 second again before doing its final repeat. */
    repeatDelay?: gsap.TimelineVars['repeatDelay'];

    /** Setting `repeatRefresh: true` causes a repeating timeline to `invalidate()` all of its child tweens and re-record their starting/ending values internally on each full iteration (not including yoyo's). This is useful when you use dynamic values (relative, random, or function-based). For example, x: `"random(-100, 100)"` would get a new random x value on each repeat. `duration`, `delay`, and `stagger` do **NOT** refresh. */
    repeatRefresh?: gsap.TimelineVars['repeatRefresh'];

    /** Controls whether or not child animations are repositioned automatically (changing their `startTime`) in order to maintain smooth playback when timing-related properties are changed on-the-fly. For example, imagine that the timeline’s playhead is on a child tween that is 75% complete, moving element’s left from 0 to 100 and then that tween’s `reverse()` method is called. If `smoothChildTiming` is `false` (the default except for the globalTimeline), the tween would flip in place, keeping its `startTime` consistent. Therefore the playhead of the timeline would now be at the tween’s 25% completion point instead of 75%. */
    smoothChildTiming?: gsap.TimelineVars['smoothChildTiming'];

    /** If `true`, every other repeat cycle will run in the opposite direction so that the tween appears to go back and forth (forward then backward). This has no affect on the `reversed` property though. So if `repeat` is `2` and `yoyo` is `false`, it will look like: start - 1 - 2 - 3 - 1 - 2 - 3 - 1 - 2 - 3 - end. But if `yoyo` is `true`, it will look like: start - 1 - 2 - 3 - 3 - 2 - 1 - 1 - 2 - 3 - end. */
    yoyo?: gsap.TimelineVars['yoyo'];

} & TimelineTweenOptions & ScrollTriggerTweenTimelineOptions

export type TimelineTargetString = `.${string}` | `#${string}`
export type TimelineTarget = (Element | TimelineTargetString)
export type TimelineTargets = TimelineTarget[]

export type TimelineTweenOptions = {
    /** Sets position of tween/timeline on the timeline. Ignored if tween/timeline is not in timeline */
    position?: gsap.Position;
}

export type TimelineProps = {
    [P in keyof Required<TimelineOptions>]: {
        type: PropType<TimelineOptions[P]>,
        default: TimelineOptions[P]
    }
} & {
    tween: {
        type: PropType<gsap.core.Tween>,
        default: gsap.core.Tween | undefined
    },
    tweens: {
        type: PropType<gsap.core.Tween[]>,
        default: gsap.core.Tween[] | undefined
    },
    timeline: {
        type: PropType<gsap.core.Timeline>,
        default: gsap.core.Timeline | undefined
    },
    timelines: {
        type: PropType<gsap.core.Timeline[]>,
        default: gsap.core.Timeline[] | undefined
    }
} & TimelineState

export type TimelineEmits = {
    [P in EmitKeys<gsap.CallbackType>]: (timeline: gsap.core.Timeline) => gsap.core.Timeline
} & TimelineInternalEmits;

export type TimelineInternalEmits = {
    // progressChange: (e: number) => number,
    pausedChange: (e: boolean) => boolean,
    reversedChange: (e: boolean) => boolean,
    ready: (e: { el: gsap.core.Timeline, position?: gsap.Position }) => { el: gsap.core.Timeline, position?: gsap.Position },
    destroyed: (e: gsap.core.Timeline) => gsap.core.Timeline,
}

export type TimelineState = {

}