import { PropType } from 'vue';
import type ScrollTrigger from 'gsap'
import { ElementTarget, EmitKeys, Propify, TimelineTarget, TweenTarget } from '.';
export type ScrollTriggerOptions = {

    /** A GSAP Tween or Timeline instance that should be controlled by the ScrollTrigger. Only one animation is controlled per ScrollTrigger, but you can wrap all your animations in a single Timeline (best) or create multiple ScrollTriggers if you prefer. */
    animation?: ScrollTrigger.StaticVars['animation'];

    /** If you pin large sections/panels you may notice what looks like a slight delay in pinning when you scroll quickly. That's caused by the fact that most modern browsers handle scroll repaints on a separate thread, so at the moment of pinning the browser may have already painted the pre-pinned content, making it visible for perhaps 1/60th of a second. The only way to counteract that is to have ScrollTrigger monitor the scroll velocity and anticipate the pin, applying it slightly early to avoid that flash of unpinned content. A value of `anticipatePin: 1` is typically fine, but you can reduce or increase that number to control how early it does the pinning. In many cases, however, you don't need any `anticipatePin` (the default is `0`). */
    anticipatePin?: ScrollTrigger.StaticVars['anticipatePin'];

    /** A popular effect is to create horizontally-moving sections that are tied to vertical scrolling but since that horizontal movement isn't a native scroll, a regular ScrollTrigger can't know when, for example, an element comes into view horizontally, so you must tell ScrollTrigger to monitor the container's [horizontal] animation to know when to trigger, like `containerAnimation: yourTween`. */
    containerAnimation?: ScrollTrigger.StaticVars['containerAnimation'];

    /** Determines the ending position of the ScrollTrigger. */
    end?: ScrollTrigger.StaticVars['end'];

    /** The element (or selector text for the element) whose position in the normal document flow is used for calculating where the ScrollTrigger ends. You don't need to define an `endTrigger` unless it's DIFFERENT than the `trigger` element because that's the default. */
    endTrigger?: ScrollTrigger.StaticVars['endTrigger'];

    /** If `true`, it will force the current ScrollTrigger's animation to completion if you leave its trigger area faster than a certain velocity (default 2500px/s). This helps avoid overlapping animations when the user scrolls quickly. You can specify a number for the minimum velocity, so `fastScrollEnd: 3000` would only activate if the velocity exceeds 3000px/s. */
    fastScrollEnd?: ScrollTrigger.StaticVars['fastScrollEnd'];

    /** By default, it assumes your setup uses vertical scrolling but simply set `horizontal: true` if your setup uses horizontal scrolling instead. */
    horizontal?: ScrollTrigger.StaticVars['horizontal'];

    /** An arbitrary unique identifier for the ScrollTrigger instance which can be used with `ScrollTrigger.getById()`. This id is also added to the markers. */
    id?: ScrollTrigger.StaticVars['id'];

    /** If `true`, the animation associated with the ScrollTrigger will have its `invalidate()` method called whenever a `refresh() `occurs (typically on resize). This flushes out any internally-recorded starting values. */
    invalidateOnRefresh?: ScrollTrigger.StaticVars['invalidateOnRefresh'];

    /** Adds markers that are helpful during development/troubleshooting. `markers: true` adds them with the defaults (startColor: "green", endColor: "red", fontSize: "16px", fontWeigth: "normal", indent: 0) but you can customize them by using an object like `markers: {startColor: "white", endColor: "white", fontSize: "18px", fontWeight: "bold", indent: 20}`. */
    markers?: ScrollTrigger.StaticVars['markers'];

    /** If `true`, the ScrollTrigger will kill() itself as soon as the end position is reached once. This causes it to stop listening for scroll events and it becomes eligible for garbage collection. This will only call onEnter a maximum of one time as well. It does **not** kill the associated animation. It's perfect for times when you only want an animation to play once when scrolling forward and never get reset or replayed. It also sets the toggleActions to "play none none none". */
    once?: ScrollTrigger.StaticVars['once'];

    /** An element (or selector text for the element) that should be pinned during the time that the ScrollTrigger is active, meaning it will appear to "stick" in its starting position while the rest of the content continues scrolling underneath it. Only one pinned element is allowed, but it can contain as many elements as you want. Setting `pin: true` will cause it to pin the `trigger` element. **Warning** don't animate the pinned element itself because that will throw off the measurements (ScrollTrigger is highly optimized for performance and pre-calculates as much as possible). Instead, you could nest things such that you're animating only elements INSIDE the pinned element. */
    pin?: ScrollTrigger.StaticVars['pin'];

    /** If your ScrollTrigger's `trigger`/`endTrigger` element is **INSIDE** an element that gets pinned by another ScrollTrigger (pretty uncommon), that would cause the start/end positions to be thrown off by however long that pin lasts, so you can set the `pinnedContainer` to that parent/container element to have ScrollTrigger calculate those offsets accordingly. Again, this is very rarely needed. */
    pinnedContainer?: ScrollTrigger.StaticVars['pinnedContainer'];

    /**
     * If `true`, the pinned element will be reparented to the `<body>` while it is actively pinned so that it can escape any ancestor containing blocks. If you notice odd behavior while pinning (like the pinned element suddenly shifting and then moving with the scroll), you probably have a `transform` or `will-change` on an ancestor element which breaks `position: fixed` behavior (it's a browser thing, not ScrollTrigger). It's best to set up your project to avoid those because reparenting can be expensive, but `pinReparent: true` can bail you out if you can't avoid them. Only use this feature if you must. 
     * 
     * @Warning if you have CSS rules that rely on specific nesting that'd be affected by the reparenting, they'll break. For example, a CSS rule like `.section .panel p {color: white}` wouldn't apply to the nested `<p>` anymore if you pin the `.panel` element with `pinReparent: true` because during the pin, it would no longer be inside the `<section>`, so make sure you write your CSS rules to accommodate the reparenting.
     */
    pinReparent?: ScrollTrigger.StaticVars['pinReparent'];

    /** Normally ScrollTrigger creates a `<div>` internally to wrap around pinned elements but in the extremely rare scenario where you're loading an iframe into the pinned element, it can cause the iframe to refresh when ScrollTrigger refreshes (like on window resize), so this feature allows you to specify an element that should be used as the spacer instead of the internally-created one. That way, ScrollTrigger won't remove/add it during its refresh, keeping iframe content intact. */
    pinSpacer?: ScrollTrigger.StaticVars['pinSpacer'];

    /**  
     * By default, padding will be added to the bottom (or right for `horizontal: true`) to push other elements down so that when the pinned element gets unpinned, the following content catches up perfectly. Otherwise, things may scroll UNDER the pinned element. You can tell ScrollTrigger not to add any padding by setting `pinSpacing: false`. If you'd rather it use margin instead of padding, you can set `pinSpacing: "margin"`. 
     * @Note pinSpacing works in most cases, but it really depends on the way you set up your DOM and CSS. For example, if you pin something in a parent that has display: flex or position: absolute, the extra padding won't push other elements down/right so you may need to manually space things out. pinSpacing is just a convenience that works in most situations. 
     * */
    pinSpacing?: ScrollTrigger.StaticVars['pinSpacing'];

    /** By default, `position: fixed` is used for pinning only if the scroller is the <body>, otherwise transforms are used (because `position: fixed` won't work in various nested scenarios), but you can force ScrollTrigger to use `position: fixed` by setting `pinType: "fixed"`. Typically this isn't necessary or helpful. Beware that if you set the CSS property `will-change: transform`, browsers treat it just like having a transform applied, breaking `position: fixed` elements (this is unrelated to ScrollTrigger/GSAP).  */
    pinType?: ScrollTrigger.StaticVars['pinType'];

    /** This feature activates as a ScrollTrigger is about to trigger an animation; it finds preceding scrollTrigger-based animations and forces those previous animations to their end state – avoiding unsightly overlaps. if `true`, it will affect all preceding ScrollTriggers. You can use an arbitrary string to limit their effect to only others with a matching string. So `preventOverlaps: "group1"` would only affect other ScrollTriggers with `preventOverlaps: "group1"`.  */
    preventOverlaps?: ScrollTrigger.StaticVars['preventOverlaps'];

    /** It's **VERY** unlikely that you'd need to define a `refreshPriority` as long as you create your ScrollTriggers in the order they'd happen on the page (top-to-bottom or left-to-right)...which we strongly recommend doing. Otherwise, use `refreshPriority` to influence the order in which ScrollTriggers get refreshed to ensure that the pinning distance gets added to the start/end values of subsequent ScrollTriggers further down the page (that's why order matters). See the sort() method for details. A ScrollTrigger with `refreshPriority: 1` will get refreshed earlier than one with `refreshPriority: 0` (the default). You're welcome to use negative numbers too, and you can assign the same number to multiple ScrollTriggers. */
    refreshPriority?: ScrollTrigger.StaticVars['refreshPriority'];

    /**
     * Links the progress of the animation directly to the scrollbar so it acts like a scrubber. You can apply smoothing so that it takes a little time for the playhead to catch up with the scrollbar's position! It can be any of the following
     * 
     * - **Boolean** - `scrub: true` links the animation's progress directly to the ScrollTrigger's progress.
     *
     * - **Number** - The amount of time (in seconds) that the playhead should take to "catch up", so `scrub: 0.5` would cause the animation's playhead to take 0.5 seconds to catch up with the scrollbar's position. It's great for smoothing things out.
     */
    scrub?: ScrollTrigger.StaticVars['scrub'];

    /** Allows you to snap to certain progress values (between 0 and 1) after the user stops scrolling. So `snap: 0.1` would snap in increments of 0.1 (10%, 20%, 30%, etc.). `snap: [0, 0.1, 0.5, 0.8, 1]` would only let it come to rest on one of those specific progress values. */
    snap?: ScrollTrigger.StaticVars['snap'];

    /** Determines the starting position of the ScrollTrigger. */
    start?: ScrollTrigger.StaticVars['start'];

    /** Determines how the linked animation is controlled at the 4 distinct toggle places - **onEnter**, **onLeave**, **onEnterBack**, and **onLeaveBack**, in that order. The default is `play none none none`. */
    toggleActions?: ScrollTrigger.StaticVars['toggleActions'];

    /** Adds/removes a class to an element (or multiple elements) when the ScrollTrigger toggles active/inactive. */
    toggleClass?: ScrollTrigger.StaticVars['toggleClass'];

} & ScrollTriggerScrollerOptions & ScrollTriggerTriggerOptions

export type ScrollTriggerChild = TimelineTarget | TweenTarget

export type ScrollTriggerChildOptions = {
    /** A child that ScrollTrigger applies to. Can be a tween, timeline, or a name of tween / timeline */
    child?: ScrollTriggerChild;
}

export type ScrollTriggerScroller = ElementTarget | Window

export type ScrollTriggerScrollerOptions = {
    /** By default, the `scroller` is the **viewport** itself, but if you'd like to add a ScrollTrigger to a scrollable <div>, for example, just define that as the scroller. You can use selector text like "#elementID" or the element itself. */
    scroller?: ScrollTriggerScroller
}

export type ScrollTriggerTrigger = ElementTarget

export type ScrollTriggerTriggerOptions = {
    /** The element (or selector text for the element) whose position in the normal document flow is used to calculate where the ScrollTrigger starts. */
    trigger?: ScrollTriggerTrigger;
}

export type ScrollTriggerProps = Propify<ScrollTriggerOptions> & Propify<ScrollTriggerChildOptions>

export type ScrollTriggerTweenTimelineOptions = {
    /** ScrollTrigger vars for tween/timeline. Used internally by `<ScrollTrigger>` and `useScrollTrigger()` */
    scrollTrigger?: ScrollTrigger.Vars,
}

export type ScrollTriggerGlobalListenerType = "scrollStart" | "scrollEnd" | "refreshInit" | "refresh" | "matchMedia"
export type ScrollTriggerCallbackType = 'onEnter' |
    'onEnterBack' |
    'onLeave' |
    'onLeaveBack' |
    'onRefresh' |
    'onRefreshInit' |
    'onSnapComplete' |
    'onScrubComplete' |
    'onUpdate' |
    'onToggle'

export type ScrollTriggerEvents = {
    [P in ScrollTriggerCallbackType]: (hook: (scrollTrigger: ScrollTrigger) => void) => void
}

export type ScrollTriggerEmits = {
    [P in EmitKeys<ScrollTriggerCallbackType>]: (scrollTrigger: ScrollTrigger) => ScrollTrigger
} & ScrollTriggerInternalEmits;

export type ScrollTriggerInternalEmits = {
    // progressChange: (e: number) => number,
    // pausedChange: (e: boolean) => boolean,
    // reversedChange: (e: boolean) => boolean,
    // ready: (e: { el: gsap.core.Tween, position?: gsap.Position }) => { el: gsap.core.Tween, position?: gsap.Position },
    // destroyed: (e: gsap.core.Tween) => gsap.core.Tween,
}