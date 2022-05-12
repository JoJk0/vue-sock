import { AnimationTarget, ControlsTarget, ElementTarget, InputTargetSource, InputType, LabelTarget, PluralInputType, ScrollTriggerTarget, TimelineTarget, TweenTarget } from '@/types';
import { arrayUnique, getElementFromScopedComponent, getParentFromInstance, objectEntries, objectKeys, pluralInputTypes } from '../utils';
import { Slots, ExtractPropTypes, Ref, ComponentInternalInstance, ref, onMounted, computed, getCurrentInstance, toRefs, WritableComputedRef } from 'vue';
import { resolvers } from '../resolvers';
import { List } from 'ts-toolbelt'
import { Assign } from 'ts-toolbelt/out/Object/Assign';

export type InputSources<TProps, TParams extends Record<string, any>, TArgs> = {
    [K in InputTargetSource]?: K extends "slots" ? Slots : K extends "props" ? ExtractPropTypes<TProps> : K extends "params" ? TParams : K extends "destructRefs" ? Ref<Element | undefined>[] : K extends "args" ? TArgs : never
}

export type InputTypes = {
    [K in InputType]: K extends "target" ? ElementTarget : K extends "tween" ? TweenTarget : K extends "timeline" ? TimelineTarget : K extends "animation" ? AnimationTarget : K extends "scrollTrigger" ? ScrollTriggerTarget : K extends "label" ? LabelTarget : K extends "controls" ? ControlsTarget : never
}

export type InputTypesWithPlural = InputTypes & {
    [K in PluralInputType as `${K}s`]: InputTypes[K][]
}

export type InputTargets = {
    [K in keyof InputTypesWithPlural]: InputTypesWithPlural[K] extends Array<infer U> ? Exclude<U, string>[] : Exclude<InputTypesWithPlural[K], string>
}

export type AllowedInputTypeKey<TAllowedInputs extends AllowedInputTypes> = Readonly<TAllowedInputs['slots'] | TAllowedInputs['props'] | TAllowedInputs['params'] | TAllowedInputs['destructRefs'] | TAllowedInputs['args']>

export type UseInputTargetsReturn<TAllowedInputs extends AllowedInputTypes> = {
    [K in keyof AllowedInputTypeKey<TAllowedInputs>]: InputTargets[K]
}

export type AllowedInputTypeKeys = keyof InputTypesWithPlural

export type AllowedInputTypes = Readonly<Partial<{
    [K in InputTargetSource]: Readonly<AllowedInputTypeKeys[]>
}>>

export type UseInputTargetOptions<TProps, TParams, TArgs, TAllowedInputs extends AllowedInputTypes> = Readonly<{
    sources: InputSources<TProps, TParams, TArgs>,
    allowedInputTypes: TAllowedInputs,
    onTargetsReady: (targets?: UseInputTargetsReturn<TAllowedInputs>) => void,
}>
export const prepareInputTargetsReturn = <TAllowedInputs extends AllowedInputTypes>(allowedInputTypes: TAllowedInputs) => {

    const fieldNames = Object.values(allowedInputTypes).reduce((acc, cur) => {
        return [...acc, ...cur]
    }, []) as Readonly<[
        ...(typeof allowedInputTypes['slots'] extends readonly any[] ? typeof allowedInputTypes['slots'] : []),
        ...(typeof allowedInputTypes['props'] extends readonly any[] ? typeof allowedInputTypes['props'] : []),
        ...(typeof allowedInputTypes['params'] extends readonly any[] ? typeof allowedInputTypes['params'] : []),
        ...(typeof allowedInputTypes['args'] extends readonly any[] ? typeof allowedInputTypes['args'] : []),
        ...(typeof allowedInputTypes['destructRefs'] extends readonly any[] ? typeof allowedInputTypes['destructRefs'] : []),
    ][number]>

    return (fieldNames.reduce((acc: any, fieldName: any) => {

        const isMultiValuable = pluralInputTypes.includes(fieldName)
        const isPlural = pluralInputTypes.includes(fieldName.slice(0, -1))

        if (isMultiValuable && !isPlural) {
            const obj = {
                [`${fieldName}s`]: ref([])
            }
            const obj2 = {
                [fieldName]: computed({
                    get: () => obj[`${fieldName}s`].value[0],
                    set: (val: any) => { obj[`${fieldName}s`].value[0] = val }
                })
            }
            return { ...acc, ...obj, ...obj2 }
        } else if (!isPlural) {
            return { ...acc, [fieldName]: ref() }
        } else {
            return acc
        }

    }, {}) as {
            [K in typeof fieldNames]: K extends keyof InputTargets ? K extends PluralInputType ? WritableComputedRef<InputTargets[K]> : Ref<InputTargets[K]> : never
        }
    )
}

export const useInputTargets = <TProps, TParams, TArgs, TAllowedInputs extends AllowedInputTypes>(options: UseInputTargetOptions<TProps, TParams, TArgs, TAllowedInputs>) => {

    const { sources, allowedInputTypes, onTargetsReady } = options

    const inputTargets = prepareInputTargetsReturn(allowedInputTypes);

    const instance = getCurrentInstance()

    onMounted(() => {

        if (!instance) return;

        objectEntries(inputTargets).forEach(([inputTargetName, inputTarget]) => {

            const isMultiValuable = pluralInputTypes.includes(inputTargetName)

            if (isMultiValuable) return;

            const isPlural = pluralInputTypes.includes(inputTargetName.slice(0, -1))

            const resolved = objectEntries(sources).map(([sourceName, source]) => {
                return resolvers[sourceName][inputTargetName](source, instance)
            }).filter(Boolean).reduce((acc, cur) => {
                return [...acc, ...cur]
            }, [])

            if (isPlural) {
                // console.log(inputTargetName, inputTarget)
                inputTarget.value = [...inputTarget.value, ...resolved]
            } else {
                inputTarget.value = [...inputTarget.value, resolved]
            }

        })

        onTargetsReady(inputTargets)
    })

    return inputTargets
}

// export const useInputTargets = <TProps, TParams, TArgs>(options: UseInputTargetOptions<TProps, TParams, TArgs>) => {

//     const { sources, allowedInputTypes, onTargetsReady } = options

//     const inputTargets = ref<(Element | Record<string, any>)[]>([]);

//     const animation = ref<gsap.core.Animation>()

//     const instance = getCurrentInstance()

//     onMounted(() => {

//         if (!instance) return;

//         // const targetsFromSlots = sources.slots ? getInputTargetsFromSlots(sources.slots, allowedInputTypes.slots, instance) : undefined

//         const targetsFromProps = allowedInputTypes.props ? getInputTargetsFromProps(sources.props, allowedInputTypes.props, instance) : undefined

//         const targetsFromParams = allowedInputTypes.params ? getInputTargetsFromParams(sources.params, allowedInputTypes.params) : undefined

//         const targetsFromDestructRefs = allowedInputTypes.destructRefs ? getInputTargetsFromDestructRefs(sources.destructRefs, allowedInputTypes.destructRefs) : undefined

//         const targetsFromArgs = allowedInputTypes.args ? getInputTargetsFromArgs(sources.args, allowedInputTypes.args) : undefined

//         inputTargets.value = [
//             // ...targetsFromSlots,
//             ...inputTargets.value,
//             ...[targetsFromProps || []],
//             // ...targetsFromParams,
//             // ...targetsFromDestructRefs,
//             // ...targetsFromArgs,
//         ]

//         onTargetsReady(inputTargets.value)
//     })

//     return {
//         inputTargets,
//         animation
//     }

// }

// const getInputTargetsFromSlots = (containerEl: Element | undefined, allowedInputTypes: AllowedInputTypeKeys[], instance: ComponentInternalInstance) => {

//     if (!containerEl) return undefined

//     const isElementAllowed = allowedInputTypes.find(type => type === 'target') !== undefined
//     if (isElementAllowed) {
//         const targetEls = containerEl ? Array.from(containerEl.children) : []
//         return targetEls
//     }

//     const isTweenAllowed = allowedInputTypes.find(type => type === 'tween') !== undefined
//     if (isTweenAllowed) {

//     }

//     // TODO: ScrollTrigger controls case

// }

// Tween

// const allowedInputTypes = {
//     slots: ['target', 'targets'],
//     props: ['target', 'targets'],
//     destructRefs: ['targets'],
//     args: ['target', 'targets'],
// } as const

// const { target, targets } = useInputTargets({
//     sources: {},
//     allowedInputTypes,
//     onTargetsReady: () => { }
// })

