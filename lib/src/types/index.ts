import { PropType } from 'vue';

export * from './tween';
export * from './timeline';
export * from './scrollTrigger';
export * from './gsap';

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

export type EmitKeys<T> = T extends `on${infer U}` ? Uncapitalize<U> : never

export type Propify<T> = {
    [P in keyof Required<T>]: {
        type: PropType<T[P]>,
        default?: T[P]
    }
}