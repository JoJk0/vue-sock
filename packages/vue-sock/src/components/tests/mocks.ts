import { mount, VueWrapper } from '@vue/test-utils'
import { Component, ComponentOptionsBase, defineComponent, DefineComponent } from 'vue'

export const durationValue = 0.2

export const duration = `:duration="${durationValue}"` as const
export const animation = `:from="{ opacity: 0 }" :to="{ opacity: 1 }"`

export const container = <TEls extends string[]>(...els: TEls) => `<div class="container">${join(els)}</div>` as const
export const box = `<div class="box">Box</div>`
export const box2 = `<div id="box2">Box 2</div>`
export const box3 = `<div class="box3">Box 3</div>`

export const tweenProppedSingle = <TTarget extends string>(target: TTarget) => `<Tween target="${target}" ${animation} ${duration} />` as const
export const tweenProppedMulti = <TTargets extends readonly string[]>(targets: TTargets) => `<Tween :targets="${toTemplate(targets)}" ${animation} ${duration} />` as const
export const tweenProppedMixed = <TTarget extends string, TTargets extends readonly string[]>(target: TTarget, targets: TTargets) => `<Tween target="${target}" :targets="${toTemplate(targets)}" ${animation} ${duration} />` as const

export const tweenSlottedSingle = <TEl extends string>(el: TEl) => `<Tween ${animation} ${duration}>${el}</Tween>` as const
export const tweenSlottedMulti = <TEls extends readonly string[]>(els: TEls) => `<Tween ${animation} ${duration}>${join(els)}</Tween>` as const

export const tweenMixedSingle = <TTarget extends string, TEl extends string>(target: TTarget, el: TEl) => `<Tween target="${target}" ${animation} ${duration}>${el}</Tween>` as const
export const tweenMixedMulti = <TTargets extends readonly string[], TEls extends readonly string[]>(targets: TTargets, els: TEls) => `<Tween :targets="${toTemplate(targets)}" ${animation} ${duration}>${join(els)}</Tween>` as const

export const createWrapper = (template: string, components: Record<string, Component>) => mount(defineComponent({
    template,
    components
}))

export async function assertTween(wrapper: VueWrapper, { target, targets }: { target?: string, targets?: readonly string[] }) {
    if (target) {
        expect(wrapper.find<HTMLElement>(target).element.style.opacity).toBe("")
    }
    if (targets) {
        targets.forEach(target => {
            expect(wrapper.find<HTMLElement>(target).element.style.opacity).toBe("")
        })
    }
    await sleep(durationValue * 1000)
    if (target) {
        expect(wrapper.find<HTMLElement>(target).element.style.opacity).toBe('1')
    }
    if (targets) {
        targets.forEach(target => {
            expect(wrapper.find<HTMLElement>(target).element.style.opacity).toBe('1')
        })
    }
}

export function sleep(arg0: number) {
    return new Promise(resolve => setTimeout(resolve, arg0))
}


type ToTemplateMapper<
    Arr extends ReadonlyArray<string>,
    Result extends string = ''
    > = Arr extends []
    ? Result
    : Arr extends [infer H]
    ? H extends string
    ? `${Result}, '${H}'`
    : never
    : Arr extends readonly [infer H, ...infer Tail]
    ? Tail extends ReadonlyArray<string>
    ? H extends string
    ? Result extends '' ? ToTemplateMapper<Tail, `${Result}${H}`> : ToTemplateMapper<Tail, `'${Result}', '${H}'`>
    : never
    : never
    : never

type ToTemplate<TArr extends ReadonlyArray<string>> = `[${ToTemplateMapper<TArr>}]`
export const toTemplate = <TArr extends readonly string[]>(arr: TArr) => JSON.stringify(arr).replace(/"/g, "'") as ToTemplate<TArr>

type JoinArrMapper<
    Arr extends ReadonlyArray<string>,
    Result extends string = ''
    > = Arr extends []
    ? Result
    : Arr extends [infer H]
    ? H extends string
    ? `${Result}\n${H}`
    : never
    : Arr extends readonly [infer H, ...infer Tail]
    ? Tail extends ReadonlyArray<string>
    ? H extends string
    ? Result extends '' ? JoinArrMapper<Tail, `${Result}${H}`> : JoinArrMapper<Tail, `${Result}\n${H}`>
    : never
    : never
    : never

type JoinArr<TArr extends ReadonlyArray<string>> = `${JoinArrMapper<TArr>}`

export const join = <TArr extends ReadonlyArray<string>>(arr: TArr) => arr.join('\n') as JoinArr<TArr>