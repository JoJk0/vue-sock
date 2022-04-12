import { AnimationTarget, ElementTarget, ScrollTriggerTarget, TimelineTarget, TweenTarget } from '@/types';
import { getElementFromScopedComponent, getParentFromInstance } from '@/utils';
import { Slots, ExtractPropTypes, Ref, ComponentInternalInstance, ref, onMounted, computed, getCurrentInstance } from 'vue';

export type InputSources<TProps, TParams extends Record<string, any>, TArgs> = {
    slots?: Slots,
    props?: Readonly<ExtractPropTypes<TProps>>,
    params?: Readonly<TParams>,
    destructRefs?: Readonly<Ref<Element | undefined>[]>,
    args?: Readonly<TArgs>,
}

export type InputTypes = {
    target: ElementTarget;
    targets: ElementTarget[];
    tween: TweenTarget;
    tweens: TweenTarget[];
    timeline: TimelineTarget;
    timelines: TimelineTarget[];
    animation: AnimationTarget;
    animations: AnimationTarget[];
    scrollTrigger: ScrollTriggerTarget;
    // controls: InputControls;
    // label: InputLabel;
    // labels: InputLabel[];
}

export type AllowedInputTypeKeys = keyof InputTypes

export type AllowedInputTypes<TProps, TParams extends Record<string, any>, TArgs> = Partial<Record<keyof InputSources<TProps, TParams, TArgs>, AllowedInputTypeKeys[]>>

export type UseInputTargetOptions<TProps, TParams, TArgs> = {
    sources: InputSources<TProps, TParams, TArgs>,
    allowedInputTypes: AllowedInputTypes<TProps, TParams, TArgs>,
}

export const useInputTargets = <TProps, TParams, TArgs>(options: UseInputTargetOptions<TProps, TParams, TArgs>) => {

    const { sources, allowedInputTypes } = options

    const inputTargets = ref();

    const onTargetReady = () => {

    }

    onMounted(() => {

        const targetsFromSlots = sources.slots ? getInputTargetsFromSlots(sources.slots, allowedInputTypes.slots, instance) : undefined

        const targetsFromProps = allowedInputTypes.props ? getInputTargetsFromProps(sources.props, allowedInputTypes.props) : undefined

        const targetsFromParams = allowedInputTypes.params ? getInputTargetsFromParams(sources.params, allowedInputTypes.params) : undefined

        const targetsFromDestructRefs = allowedInputTypes.destructRefs ? getInputTargetsFromDestructRefs(sources.destructRefs, allowedInputTypes.destructRefs) : undefined

        const targetsFromArgs = allowedInputTypes.args ? getInputTargetsFromArgs(sources.args, allowedInputTypes.args) : undefined

        inputTargets.value = {
            ...targetsFromSlots,
            ...targetsFromProps,
            ...targetsFromParams,
            ...targetsFromDestructRefs,
            ...targetsFromArgs,
        }

    })

    return {
        inputTargets,
        onTargetReady
    }

}

const getInputTargetsFromSlots = (containerEl: Element | undefined, allowedInputTypes: AllowedInputTypeKeys[], instance: ComponentInternalInstance) => {

    if (!containerEl) return undefined

    const isElementAllowed = allowedInputTypes.find(type => type === 'target') !== undefined
    if (isElementAllowed) {
        const targetEls = containerEl ? Array.from(containerEl.children) : []
        return targetEls
    }

    const isTweenAllowed = allowedInputTypes.find(type => type === 'tween') !== undefined
    if (isTweenAllowed) {
        
    }

    // TODO: ScrollTrigger controls case


}

const getInputTargetsFromProps = <TProps>(props: Readonly<ExtractPropTypes<TProps>> | undefined, allowedInputTypes: AllowedInputTypeKeys[]) => {

    if (!props) return undefined

    const filteredProps = (Object.keys(props) as (keyof typeof props)[]).map(propName => {
        const propValue = props[propName]
        if (inputTargets.includes(propName)) {
            if (allowedInputTypes.includes(propName)) {
                return hydrateTarget(propValue)
            } else {
                console.error(`[vue-gsap]: prop "${propName}" is not allowed in this context`)
            }
        }
    })

    if (props.target) {
        if (typeof props.target === 'string') {
            if (!instance) return [];
            const el = getElementFromScopedComponent(props.target, instance)
            if (!el) return [];
            return [el]
        } else {
            return [props.target]
        }
    }
    if (props.targets) {
        return props.targets.map(target => {
            if (typeof target === 'string') {
                if (!instance) return;
                const el = getElementFromScopedComponent(target, instance)
                if (!el) return;
                return el
            } else {
                return target
            }
        }).filter(target => target !== undefined) as Element[]
    }

}

const getInputTargetsFromParams = <TParams>(params: Readonly<TParams> | undefined, allowedInputTypes: AllowedInputTypeKeys[]) => {

    if (!params) return undefined

}

const getInputTargetsFromDestructRefs = (destructRefs: Readonly<Ref<Element | undefined>[]> | undefined, allowedInputTypes: AllowedInputTypeKeys[]) => {

    if (!destructRefs) return undefined

}

const getInputTargetsFromArgs = <TArgs>(args: Readonly<TArgs> | undefined, allowedInputTypes: AllowedInputTypeKeys[]) => {

    if (!args) return undefined

}

// Tween

// const targets = getInputTargets(sources, {
//     slots: ['target', 'targets'],
//     props: ['target', 'targets'],
//     destructRefs: ['targets'],
//     args: ['target', 'targets'],
// }, instance)