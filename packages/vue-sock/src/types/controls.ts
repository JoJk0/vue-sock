import { AnimationTarget, ElementTarget, Propify } from '.'

export type ControlsOptions = {
    /** Initial state that the animation is supposed to start. Default `{ paused: true }` */
    initialState?: ControlsState

    /** The color of the theme. Default `#74b300` */
    color?: string

    /** Enable the wrapper container around the animation. Useful for presenting the animation e.x. in docs or examples. Default `false` */
    container?: boolean

    /** Pin the controls panel on the specified place on screen. Useful for animations with multiple targets. Default `undefined` */
    pin?: ControlsOptionsPin
} & ControlsTargetOptions

export type ControlsOptionsPin = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type ControlsState = {
    paused?: boolean,
    reversed?: boolean,
    totalProgress?: number,
}

export type ControlsProps = Propify<ControlsOptions>

export type AnimationControlsOptions = {
    /** Enables play/pause, reverse and scrubbing controls over animation.  */
    controls?: ControlsOptions | boolean;
}

export type ControlsTargetOptions = {
    /** Animation or animation name that controls are applied to */
    animation?: AnimationTarget
}