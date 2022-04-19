import { PropType } from 'vue';
import { Timeline, Tween } from '..';
import { TimelineChildOptions, TimelineChildrenOptions } from './timeline';

export * from './controls';
export * from './tween';
export * from './timeline';
export * from './scrollTrigger';
export * from './gsap';

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

export type EmitKeys<T> = T extends `on${infer U}` ? Uncapitalize<U> : never

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type Propify<T> = {
    [P in keyof Required<T>]: {
        type: PropType<T[P]>,
        default?: T[P]
    }
}

export type TargetString = `.${string}` | `#${string}`

export type ElementTarget = Element | TargetString

export type TweenTarget = gsap.core.Tween | string

export type TimelineTarget = gsap.core.Timeline | string

export type AnimationTarget = gsap.core.Animation | string

export type ScrollTriggerTarget = ScrollTrigger | string

export type TimelineFunctionTarget = (...args: unknown[]) => gsap.core.Timeline

export type OnReadyEmit<T extends gsap.core.Animation> = {
    animation: T,
    position?: gsap.Position
}