import { ComponentObjectPropsOptions, Prop, PropType } from 'vue'
import { Propify } from '.'
import { TimelineTarget, TimelineTweenOptions } from './timeline'
import { TweenTarget, TweenTargets } from './tween'

export type EffectOptions<TCustomVars extends Prop<any>, TExtendsBoolean extends boolean, TEffectReturn, TName extends string, TDefaults extends gsap.TweenVars> = {
    name: TName,
    effect: (targets: gsap.TweenTarget, config: TCustomVars & TDefaults) => TExtendsBoolean extends true ? gsap.core.Tween | gsap.core.Timeline : TEffectReturn,
    customVars?: TCustomVars,
    defaults?: TDefaults,
    extendTimeline?: TExtendsBoolean
}

export type EffectProps<TCustomVars extends Prop<any>> =
    {
    target: {
        type: PropType<TweenTarget>,
        default: TweenTarget | undefined
    },
    targets: {
        type: PropType<TweenTargets>,
        default: TweenTargets | undefined
    }
}
    &
    TCustomVars
    & Propify<TimelineTweenOptions>