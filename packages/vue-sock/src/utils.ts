import { ComponentInternalInstance, computed, defineAsyncComponent, getCurrentInstance, onMounted, ref, render, watch, h } from 'vue'
import { TweenOptions, TargetString, Writeable, ElementTarget, AnimationTarget, ControlsOptions, PluralInputType, InputType } from './types'
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
    const sid = scopeId || findScopeId(instance)
    if (instance.parent && (!instance.subTree.el || instance.subTree.scopeId !== sid)) {
        return findScopeRoot(instance.parent, sid)
    } else {
        return instance
    }
}

export const findScopeId: (instance: ComponentInternalInstance) => string | null = (instance: ComponentInternalInstance) => {
    if (instance.vnode.scopeId)
        return instance.vnode.scopeId
    else if (instance.parent)
        return findScopeId(instance.parent)
    else
        return null
}

export const getElementFromScopedComponent = (target: TargetString, instance: ComponentInternalInstance) => {

    const scopeId = findScopeId(instance); // TODO: non-SFC scope compatibility

    const scopeRoot = findScopeRoot(instance)

    if (!scopeId) return (instance.subTree.el?.querySelector ? instance.subTree.el?.querySelector(target) : scopeRoot.subTree.el?.querySelector(target)) as Element | undefined;

    if ((scopeRoot.subTree.el as Element | undefined)?.classList?.contains(target.slice(1)) || (scopeRoot.subTree.el as Element | undefined)?.id === target.slice(1)) {
        return scopeRoot.subTree.el as Element
    }

    return scopeRoot.subTree.el?.querySelector(target) as Element | undefined;
}

export const createTween = (targets: (Element | Object)[], options: TweenOptions) => {

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


/** Resolves the Animation ID string in the component. If Vue component `scopeId` is not provided, then it searches for animation globally */
export const resolveAnimation = (animationTarget: AnimationTarget, scopeId?: string) => {

    if (typeof animationTarget !== 'string') return animationTarget

    const scopedId = scopeId ? `${animationTarget}-${scopeId}` : animationTarget

    return gsap.getById(scopedId)
}

export const attachControls = (options: ControlsOptions) => {

    const { animation: animationTarget } = options

    if (!animationTarget) return;

    const animation = resolveAnimation(animationTarget)

    const el = (() => {
        if (animation instanceof gsap.core.Timeline) {
            const tween = animation.getChildren(true, true, false)[0] as gsap.core.Tween | undefined
            return tween?.targets<Element>()[0]
        }
        else if (animation instanceof gsap.core.Tween) return animation.targets<Element>()[0]
        else return undefined;
    })()

    const parent = el?.parentElement

    if (!parent) return

    const controlsComponent = defineAsyncComponent(() => import("./components/Controls.vue"))

    // Find the target element IF containerized
    // If not, pin it on screen

    const controlsVNode = h(controlsComponent, options)
    // instance.vnode.children = [controlsVNode]
    // instance.vnode.children = [h('div', { class: 'bar', innerHTML: 'hello' })]

    console.log('rendering', controlsVNode, parent)

    render(controlsVNode, parent)
}

export const objectKeys = <T>(obj: T) => Object.keys(obj) as (keyof T)[]

export const objectEntries = <T>(obj: T) => Object.entries(obj) as [keyof T, T[keyof T]][]

export function arrayUnique<T>(array: T[]) {
    let a = array.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}
export const inputType: readonly InputType[] = ["target", "tween", "timeline", "animation", "label", "scrollTrigger", "controls"] as const

export const pluralInputTypes: readonly PluralInputType[] = ["target", "tween", "timeline", "animation", "label"] as const
