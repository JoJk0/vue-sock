import { InputTypesWithPlural } from '@/composables/useInputTargets';
import { PropType, Ref, Slots } from 'vue';

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

export type UniqueArray<T> =
    T extends readonly [infer X, ...infer Rest]
    ? InArray<Rest, X> extends true
    ? ['Encountered value with duplicates:', X]
    : readonly [X, ...UniqueArray<Rest>]
    : T

type InArray<T, X> =
    T extends readonly [X, ...infer _Rest]
    ? true
    : T extends readonly [X]
    ? true
    : T extends readonly [infer _, ...infer Rest]
    ? InArray<Rest, X>
    : false

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

export type LabelTarget = string | Object // TODO

export type ControlsTarget = string | Object // TODO

export type OnReadyEmit<T extends gsap.core.Animation> = {
    animation: T,
    position?: gsap.Position
}

export type InputTargetSource = 'slots' | 'props' | 'params' | 'destructRefs' | 'args';

export type InputTargetSourceType = {
    [K in InputTargetSource]: K extends 'slots' ? Slots : K extends 'props' ? Partial<InputTypesWithPlural> : K extends 'params' ? Partial<InputTypesWithPlural> : K extends 'destructRefs' ? Ref<Element | undefined>[] : K extends 'args' ? Partial<InputTypesWithPlural> : never
}

export type InputType = 'target' | 'tween' | 'timeline' | 'animation' | 'scrollTrigger' | 'label' | 'controls';

export type PluralInputType = Extract<InputType, 'target' | 'tween' | 'timeline' | 'animation' | 'label'>