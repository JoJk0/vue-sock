import { getParentFromInstance } from '@/utils';
import { getCurrentInstance, computed, ComputedRef } from 'vue';

export type ParentTypes = {
    target: Element,
    tween: gsap.core.Tween,
    timeline: gsap.core.Timeline,
    animation: gsap.core.Animation,
    scrollTrigger: ScrollTrigger,
}

export const useParent = <TAllowedParents extends (keyof ParentTypes)[]>(allowedParents: TAllowedParents) => {
    const instance = getCurrentInstance()
    const parent = computed(() => getParentFromInstance(instance, allowedParents));
    return parent as ComputedRef<ParentTypes[TAllowedParents extends Array<infer U> ? U : never] | undefined>
}