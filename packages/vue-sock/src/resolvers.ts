import { ComponentInternalInstance } from 'vue';
import { InputTargets } from './composables/useInputTargets';
import { InputTargetSource, InputTargetSourceType, ElementTarget } from './types';
import { getElementFromScopedComponent } from './utils';

export type InputTargetsResolvers = Readonly<{
    [K in InputTargetSource]: InputTargetSourceResolvers<K>
}>

export type InputTargetResolver<T extends keyof InputTargets, TSource extends InputTargetSource> = (source: InputTargetSourceType[TSource], instance: ComponentInternalInstance) => InputTargets[T] | undefined

export type InputTargetSourceResolvers<TSource extends InputTargetSource> = Readonly<{
    [K in keyof InputTargets]: InputTargetResolver<K, TSource>
}>

export const targetGetters = {
    target: (elTarget: ElementTarget | undefined, instance: ComponentInternalInstance) => {
        if (typeof elTarget === 'string') {
            if (!instance) {
                console.warn('[vue-sock]: Cannot resolve target from string without component instance.');
                return undefined
            };
            const el = getElementFromScopedComponent(elTarget, instance)
            if (!el) {
                console.log('noinstance', instance)
                console.warn(`[vue-sock]: Could not find element for target: ${elTarget}`)
                return undefined
            };
            return el
        } else { // TODO: Object case
            return elTarget
        }
    }
} as const

export const resolvers: InputTargetsResolvers = {
    slots: {
        target: (slots, instance) => {

        },
        targets: () => { },
        tween: () => { },
        tweens: () => { },
        timeline: () => { },
        timelines: () => { },
        animation: () => { },
        animations: () => { },
        scrollTrigger: () => { },
        label: () => { },
        labels: () => { },
        controls: () => { }
    },
    props: {
        target: (props, instance) => targetGetters.target(props.target, instance),
        targets: (props, instance) => {
            if (props.target) {
                return [targetGetters.target(props.target, instance)] as Element[]
            } else if (props.targets) {
                // TODO: Merge single with plural if both present (rare)
                return props.targets?.map(target => targetGetters.target(target, instance)).filter(Boolean) as Element[]
            } else {
                return []
            }
        },
        tween: () => { },
        tweens: () => { },
        timeline: () => { },
        timelines: () => { },
        animation: () => { },
        animations: () => { },
        scrollTrigger: () => { },
        label: () => { },
        labels: () => { },
        controls: () => { }
    },
    params: {
        target: () => { },
        targets: () => { },
        tween: () => { },
        tweens: () => { },
        timeline: () => { },
        timelines: () => { },
        animation: () => { },
        animations: () => { },
        scrollTrigger: () => { },
        label: () => { },
        labels: () => { },
        controls: () => { }
    },
    destructRefs: {
        target: () => { },
        targets: () => { },
        tween: () => { },
        tweens: () => { },
        timeline: () => { },
        timelines: () => { },
        animation: () => { },
        animations: () => { },
        scrollTrigger: () => { },
        label: () => { },
        labels: () => { },
        controls: () => { }
    },
    args: {
        target: () => { },
        targets: () => { },
        tween: () => { },
        tweens: () => { },
        timeline: () => { },
        timelines: () => { },
        animation: () => { },
        animations: () => { },
        scrollTrigger: () => { },
        label: () => { },
        labels: () => { },
        controls: () => { }
    }
}