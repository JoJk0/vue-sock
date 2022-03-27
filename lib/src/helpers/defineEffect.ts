import { Propify, TweenTarget, TweenTargets } from '@/types';
import { EffectOptions, EffectProps } from '@/types/effect';
import { filterOptions } from '@/utils';
import gsap from 'gsap'
import { ComponentObjectPropsOptions, defineComponent, onMounted, Prop, PropType } from 'vue';

export const defineEffect = <TCustomVars extends Prop<any>, TExtendsBoolean extends boolean, TEffectReturn, TName extends string, TDefaults>(options: EffectOptions<TCustomVars, TExtendsBoolean, TEffectReturn, TName, TDefaults>) => {
    
    const filteredOptions = filterOptions(options, ['customVars'])
    
    gsap.registerEffect(filteredOptions);

    const props = {
        ...options.customVars,
        target: {
            type: [Object, String] as PropType<TweenTarget>,
            default: undefined,
        },
        targets: {
            type: Array as PropType<TweenTargets>,
            default: undefined,
        },
        position: {
            type: [Number, String] as PropType<gsap.Position>,
            default: undefined,
        },
    };

    const EffectComponent = defineComponent({
        props,
        setup(props) { 
            onMounted(() => {
                if ((props.target && !props.targets) || (!props.target && props.targets)) {
                    console.warn(`VueSock: Effect [${options.name}]: You must provide either a target or targets`);
                    return;
                }
                const effectTargets = props.target ? [props.target] : props.targets ? props.targets : undefined;
                
                if (!effectTargets) {
                    console.warn(`VueSock: Effect [${options.name}]: No targets provided`);
                    return;
                };

                const effectConfig = filterOptions(props, ['target', 'targets', 'position']);

                options.effect(effectTargets, effectConfig)
            })
        }
    })

    const effectName = `${options.name}Effect` as const

    const componentName = options.name.toUpperCase() as Capitalize<TName>

    return { [effectName]: options, [componentName]: EffectComponent } as {
        [key in typeof effectName]: typeof options
    } & {
        [key in typeof componentName]: typeof EffectComponent
    }
}

const { testEffect, Test } = defineEffect({
    name: 'test',
    effect: (targets, config) => {
        config.yourPro = 'yourPro'
        return gsap.to(targets, config);
    },
    customVars: {
        yourPro: String,
    },
    extendTimeline: true
})

testEffect
Test