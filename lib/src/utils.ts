import { ComponentInternalInstance, computed } from 'vue'
import { TweenOptions, TweenTargets, TweenTargetString, Writeable } from './types'
import gsap from 'gsap'

export const config = {
    tweenClassName: 'vue-sock-tween',
    timelineClassName: 'vue-sock-timeline',
    scrollTriggerClassName: 'vue-sock-scroll-trigger',
} as const

export const warnTweenNotFound = () => {
    console.warn('VueSock: Tween not found')
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

export const getElementFromScopedComponent = (target: TweenTargetString, instance: ComponentInternalInstance) => {

    const findScopeRoot: (instance: ComponentInternalInstance, scopeId: string) => ComponentInternalInstance = (instance, scopeId) => {
        if (instance.parent?.vnode?.scopeId === scopeId) {
            return findScopeRoot(instance.parent, scopeId)
        } else if (instance.parent?.subTree.scopeId === scopeId) {
            return instance.parent
        } else {
            return instance
        }
    }

    const scopeId = instance.vnode.scopeId;
    if (!scopeId) return instance.vnode.el?.querySelector(target) as Element | undefined;

    const scopeRoot = findScopeRoot(instance, scopeId);

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