import { describe, expect, it } from 'vitest'
import Tween from '../Tween.vue'
import { box, container, createWrapper, tweenProppedSingle, assertTween, tweenProppedMulti, box2, tweenProppedMixed, tweenSlottedSingle, tweenSlottedMulti, box3 } from './mocks'

describe('Tween.vue', () => {
    describe('props', () => {
        it('should render from target prop', () =>
            assertTween(createWrapper(container(box, tweenProppedSingle('.box')), { Tween }), { target: '.box' })
        )
        it('should render from targets prop', () =>
            assertTween(createWrapper(container(box, box2, tweenProppedMulti(['.box', '#box2'] as const)), { Tween }), { targets: ['.box', '#box2'] as const })
        )
        it('should render from target and targets prop', () => {
            const tmp = container(box, box2, box3, tweenProppedMixed('.box', ['#box2', '.box3'] as const))
            assertTween(createWrapper(tmp, { Tween }), { targets: ['.box3', '#box2'] as const, target: '.box' })
        })
    })
    describe('slots', () => {
        it('should render target from slot', async () => {
            const template = container(tweenSlottedSingle(box))
            const wrapper = createWrapper(template, { Tween })
            assertTween(wrapper, { target: '.box' })
        })
        it('should render targets from slot', async () =>
            assertTween(createWrapper(container(tweenSlottedMulti([box, box2] as const)), { Tween }), { targets: ['.box', '#box2'] as const })
        )
    })
    describe('slots and props', () => {
        it('should render target from slot and prop', async () => {
            expect(1).toBe(2)
        })
        it('should render targets from slot and prop', async () => {
            expect(1).toBe(2)
        })
        it('should render target from slot and targets from prop', async () => {
            expect(1).toBe(2)
        })
        it('should render targets from slot and targets from prop', async () => {
            expect(1).toBe(2)
        })
        it('should render target from slot and target and targets from prop', async () => {
            expect(1).toBe(2)
        })
        it('should render targets from slot and target and targets from prop', async () => {
            expect(1).toBe(2)
        })
    })
})
