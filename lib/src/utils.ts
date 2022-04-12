import { ComponentInternalInstance, computed, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { TweenOptions, TargetString, Writeable, ElementTarget } from './types'
import gsap from 'gsap'
import { ParentTypes } from './composables/useParent'

export const config = {
    tweenClassName: 'vue-sock-tween',
    timelineClassName: 'vue-sock-timeline',
    scrollTriggerClassName: 'vue-sock-scroll-trigger',
    labelClassName: 'vue-sock-label',
    controlsClassName: 'vue-sock-controls',
} as const

export const warnTweenNotFound = () => {
    console.warn('[VueSock]: Tween not found')
}

export const methods = (tween: gsap.core.Tween | undefined) => {
    return {
        invalidate: tween?.invalidate,
        kill: tween?.kill,
        seek: tween?.seek,
        restart: tween?.restart,
    }
}

export const additionalProps = (tween: gsap.core.Tween) => ({
    endTime: computed(() => tween.endTime()),
    isActive: computed(() => tween.isActive()),
    time: computed({
        get: () => tween.time(),
        set: v => tween.time(v)
    }),
    timeScale: computed({
        get: () => tween.timeScale(),
        set: v => tween.timeScale(v)
    }),
    progress: computed({
        get: () => tween.progress(),
        set: v => tween.progress(v)
    }),
    totalProgress: computed({
        get: () => tween.totalProgress(),
        set: v => tween.totalProgress(v)
    }),
    totalDuration: computed({
        get: () => tween.totalDuration(),
        set: v => tween.totalDuration(v)
    }),
    totalTime: computed({
        get: () => tween.totalTime(),
        set: v => tween.totalTime(v)
    }),
    startTime: computed({
        get: () => tween.startTime(),
        set: v => tween.startTime(v)
    }),
    iteration: computed({
        get: () => tween.iteration(),
        set: v => tween.iteration(v)
    }),
})

export const findScopeRoot: (instance: ComponentInternalInstance, scopeId?: string | null) => ComponentInternalInstance = (instance, scopeId) => {
    const sid = scopeId || instance.vnode.scopeId
    if (instance.parent?.vnode?.scopeId === sid) {
        return findScopeRoot(instance.parent, sid)
    } else if (instance.parent?.subTree.scopeId === sid) {
        return instance.parent
    } else {
        return instance
    }
}

export const useScopedQuerySelector = (target: ElementTarget | undefined) => {

    const instance = getCurrentInstance()

    const scopeRoot = computed(() => instance ? findScopeRoot(instance) : null)

    const el = ref<Element>()

    onMounted(() => {
        if (target instanceof Element) {
            el.value = target
        } else if (target) { 
            const isTargetRootEl = (scopeRoot.value?.vnode.el as Element)?.classList.contains(target.slice(1)) || (scopeRoot.value?.vnode.el as Element)?.id === target.slice(1)

            if (isTargetRootEl) {
                el.value = scopeRoot.value?.vnode.el as Element
            } else {
                el.value = scopeRoot.value?.vnode.el?.querySelector(target)
            }
        }
        if (target === '#splash') {
            console.log('isElementsReady', scopeRoot.value?.vnode.el)
            const a = instance?.parent?.parent?.vnode.el?.querySelector('#splash')
            console.log('splash', a)
        }
    })

    return el
}
export const getElementFromScopedComponent = (target: TargetString, instance: ComponentInternalInstance) => {

    const scopeId = instance.vnode.scopeId;
    if (!scopeId) return instance.vnode.el?.querySelector(target) as Element | undefined;

    const scopeRoot = findScopeRoot(instance);
    // console.log('target', target, 'scopeRoot', scopeRoot)
    // if(target === '.left') console.log('el', scopeRoot.vnode.el)

    return scopeRoot.vnode.el?.querySelector(target) as Element | undefined;
}

export const createTween = (targets: Element[], options: TweenOptions) => {

    const {
        from,
        to,
        callbackScope,
        data,
        duration,
        delay,
        ease,
        endArray,
        id,
        inherit,
        immediateRender,
        lazy,
        keyframes,
        overwrite,
        paused,
        repeat,
        repeatDelay,
        repeatRefresh,
        reversed,
        runBackwards,
        stagger,
        startAt,
        yoyo,
        yoyoEase,
        position,
        scrollTrigger
    } = options

    const magicProps = {
        callbackScope,
        data,
        duration,
        delay,
        ease,
        endArray,
        id,
        inherit,
        immediateRender,
        lazy,
        keyframes,
        overwrite,
        paused,
        repeat,
        repeatDelay,
        repeatRefresh,
        reversed,
        runBackwards,
        stagger,
        startAt,
        yoyo,
        yoyoEase,
        position,
        scrollTrigger
    }

    // const filteredMagicProps = (Object.keys(magicProps) as (keyof typeof magicProps)[]).reduce((acc, key) => {
    //     if (magicProps[key] !== undefined && key !== 'position') {
    //         acc[key] = magicProps[key]
    //     }
    //     return acc
    // }, {} as Partial<Writeable<Omit<typeof magicProps, 'position'>>>)

    const filteredMagicProps = filterOptions(magicProps, ['position'])

    // const isPaused = isInTimeline ? { paused: true } : {};

    return from && to
        ? gsap.fromTo(targets, from, { ...to, ...filteredMagicProps })
        : from
            ? gsap.from(targets, { ...from, ...filteredMagicProps })
            : to
                ? gsap.to(targets, { ...to, ...filteredMagicProps })
                : undefined
}

/** Removes undefined properties from object alongside with specified object keys */
export const filterOptions = <TExclude extends [...(keyof TOptions)[]], TOptions extends Record<string, any>>(options: TOptions, exclude?: TExclude) => (Object.keys(options) as [...(keyof TOptions)[]]).reduce((acc, key) => {
    if (options[key] !== undefined && !exclude?.includes(key)) {
        acc[(key as keyof Partial<Writeable<Omit<TOptions, TExclude extends (infer U)[] ? U : never>>>)] = options[key]
    }
    return acc
}, {} as Partial<Writeable<Omit<TOptions, TExclude extends (infer U)[] ? U : never>>>)

export const validateParent = <TParent extends Element | gsap.core.Tween | gsap.core.Timeline | gsap.core.Animation | ScrollTrigger>(parent: TParent, allowedParents: (keyof ParentTypes)[]) => {

    const isElement = parent instanceof Element
    if (isElement && allowedParents.includes('target')) return true

    const isTween = parent instanceof gsap.core.Tween
    if (isTween && allowedParents.includes('tween')) return true

    const isTimeline = parent instanceof gsap.core.Timeline
    if (isTimeline && allowedParents.includes('timeline')) return true

    const isAnimation = parent instanceof gsap.core.Animation
    if (isAnimation && allowedParents.includes('animation')) return true

    const isScrollTrigger = parent instanceof ScrollTrigger
    if (isScrollTrigger && allowedParents.includes('scrollTrigger')) return true

    console.warn(`[VueSock]: Parent must be an instance of Element, Tween, Timeline, Animation or ScrollTrigger`)

    return false
}

export const getParentFromInstance = (instance: ComponentInternalInstance | null, allowedParents: (keyof ParentTypes)[]) => {
    if (instance?.parent?.exposed) {
        const key = Object.keys(instance?.parent?.exposed).find(key => (allowedParents as string[]).includes(key)) as keyof ParentTypes
        if (!key) {
            // No parent
            return undefined
        }
        const parent = instance?.parent?.exposed![key] as ParentTypes[typeof key]
        validateParent(parent, allowedParents)
        return parent
    } else {
        return undefined
    }
}

export const onIsTween = <TParent extends gsap.core.Tween | gsap.core.Animation | Element | ScrollTrigger | undefined>(parent: TParent, cb: (tween: gsap.core.Tween) => void) => {
    if (parent instanceof gsap.core.Tween) cb(parent)
}