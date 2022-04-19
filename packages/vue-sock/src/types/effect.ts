import { ComponentObjectPropsOptions, ExtractPropTypes, Prop, PropType } from 'vue'
import { Propify } from '.'
import { TimelineChild, TimelineChildren, TimelineTweenOptions } from './timeline'
import { TweenTarget, TweenTargets } from './tween'

export type EffectOptions<
    TCustomVars extends ComponentObjectPropsOptions,
    TExtendsTimeline extends boolean,
    TEffectReturn extends (TExtendsTimeline extends true ? gsap.core.Tween | gsap.core.Timeline : any),
    TName extends string,
    TDefaults extends gsap.TweenVars
    > = {
        name: TName,
        effect: (targets: gsap.TweenTarget, config: ExtractPropTypes<TCustomVars> & TDefaults) => TEffectReturn,
        customVars?: TCustomVars,
        defaults?: TDefaults,
        extendTimeline?: TExtendsTimeline
    }

export type EffectTarget = TweenTarget
export type EffectTargets = TweenTargets

export type EffectChild = TimelineChild
export type EffectChildren = TimelineChildren

export type EffectTargetOptions = {
    target: EffectTarget
}

export type EffectTargetsOptions = {
    targets: EffectTargets
}

export type EffectChildOptions = {
    child: EffectChild
}

export type EffectChildrenOptions = {
    children: EffectChildren
}

export type EffectProps<TCustomVars extends Prop<any>, TIsTimeline extends boolean> =
    TIsTimeline extends true ? Propify<EffectChildOptions & EffectChildrenOptions> : Propify<EffectTargetOptions & EffectTargetsOptions>
    &
    TCustomVars
    & Propify<TimelineTweenOptions>