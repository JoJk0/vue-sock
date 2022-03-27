# Components
## `<Tween />`
### Props

| Name              | Type                                     | Default value | Description
| ----------------- | ---------------------------------------- | ------------- | ----------- |
| `from`            | `gsap.TweenVars`                         | `undefined`   | An object containing the initial (starting) property/value pairs.
| `to`              | `gsap.TweenVars`                         | `undefined`   | An object containing the destination properties/values to animate to.
| `callbackScope`   | `object`                                 | `undefined`   | The scope to be used for all of the callbacks (`onStart`, `onUpdate`, `onComplete`, etc.).
| `data`            | `any`                                    | `undefined`   | Assign arbitrary data to this property (a string, a reference to an object, whatever) and it gets attached to the tween instance itself so that you can reference it later like `yourTween.data`.
| `duration`        | `gsap.TweenValue`                        | `0.5`         | The duration of the animation (in seconds). Default: `0.5`.
| `delay`           | `gsap.TweenValue`                        | `0`           | Amount of delay before the animation should begin (in seconds).
| `ease`            | `string \| gsap.EaseFunction`            | `"power1.out"`| Controls the rate of change during the animation, giving it a specific feel. For example, `"elastic"` or `"strong.inOut"`. See the Ease Visualizer for a list of all of the options. ease can be a String (most common) or a function that accepts a progress value between `0` and `1` and returns a converted, similarly normalized value. Default: `"power1.out"`.
| `endArray`        | `any[]`                                  | `undefined`   | 
| `id`              | `string \| number`                       | `undefined`   | Allows you to (optionally) assign a unique identifier to your tween instance so that you can find it later with `gsap.getById()` and it will show up in GSDevTools with that id.
| `inherit`         | `boolean`                                | `false`       | Normally tweens inherit from their parent timeline's defaults object (if one is defined), but you can disable this on a per-tween basis by setting `inherit: false`.
| `immediateRender` | `boolean`                                | `false`       | Normally a tween waits to render for the first time until the very next tick (update cycle) unless you specify a delay. Set immediateRender: true to force it to render immediately upon instantiation. Default: `false` for `to()` tweens, `true` for `from()` and `fromTo()` tweens or anything with a `scrollTrigger` applied.
| `lazy`            | `boolean`                                | `true`        | When a tween renders for the very first time and reads its starting values, GSAP will try to delay writing of values until the very end of the current "tick" which can improve performance because it avoids the read/write/read/write layout thrashing that browsers dislike. To disable lazy rendering for a particular tween, set `lazy: false`. In most cases, there's no need to set lazy. To learn more, watch this video. Default: `true` (except for zero-duration tweens).
| `keyframes`       | `object \| gsap.TweenVars[]`             | `undefined`   | To animate the targets to various states, use `keyframes` - an array of vars objects that serve as to() tweens. For example, keyframes: [{x:100, duration:1}, {y:100, duration:0.5}]. All keyframes will be perfectly sequenced back-to-back, but you can define a delay value to add spacing between each step (or a negative delay would create an overlap).
| `overwrite`       | `boolean \| "auto"`                      | `false`       | If `true`, all tweens of the same targets will be killed immediately regardless of what properties they affect. If `"auto"`, when the tween renders for the first time it hunt down any conflicts in active animations (animating the same properties of the same targets) and kill only those parts of the other tweens. Non-conflicting parts remain intact. If `false`, no overwriting strategies will be employed. Default: `false`.
| `paused`          | `boolean`                                | `false`       | If `true`, the animation will pause itself immediately upon creation. Default: `false`.
| `repeat`          | `number`                                 | `0`           | How many times the animation should repeat. So `repeat: 1` would play a total of two iterations. Default: `0`. `repeat: -1` will repeat infinitely.
| `repeatDelay`     | `number`                                 | `0`           | Amount of time to wait between repeats (in seconds). Default: `0`.
| `repeatRefresh`   | `boolean`                                | `false`       | Setting `repeatRefresh: true` causes a repeating tween to `invalidate()` and re-record its starting/ending values internally on each full iteration (not including yoyo's). This is useful when you use dynamic values (relative, random, or function-based). For example, `x: "random(-100, 100)"` would get a new random `x` value on each repeat. duration, delay, and stagger do NOT refresh.
| `reversed`        | `boolean`                                | `false`       | If `true`, the animation will start out with its playhead reversed, meaning it will be oriented to move toward its start. Since the playhead begins at a time of 0 anyway, a reversed tween will appear paused initially because its playhead cannot move backward past the start.
| `runBackwards`    | `boolean`                                | `false`       | If `true`, the animation will invert its starting and ending values (this is what a `from()` tween does internally), though the ease doesn't get flipped. In other words, you can make a `to()` tween into a `from()` by setting `runBackwards: true`.
| `stagger`         | `gsap.NumberValue \| gsap.StaggerVars`   | `0`           | If multiple targets are defined, you can easily stagger the start times for each by setting a value like stagger: `0.1` (for 0.1 seconds between each start time). Or you can get much more advanced staggers by using a `stagger` object. For more information, see the stagger documentation.
| `startAt`         | `gsap.TweenVars`                         | `undefined`   | Defines starting values for any properties (even if they're not animating). For example, `startAt: {x: -100, opacity: 0}`
| `yoyo`            | `boolean`                                | `false`       | If `true`, every other repeat iteration will run in the opposite direction so that the tween appears to go back and forth. This has no affect on the reversed property though. So if `repeat` is `2` and `yoyo` is `false`, it will look like: `start - 1 - 2 - 3 - 1 - 2 - 3 - 1 - 2 - 3 - end`. But if yoyo is true, it will look like: `start - 1 - 2 - 3 - 3 - 2 - 1 - 1 - 2 - 3 - end`. Default: `false`.
| `yoyoEase`        | `string \| boolean \| gsap.EaseFunction` | `false`       | Allows you to alter the ease in the tween's yoyo phase. Set it to a specific ease like "power2.in" or set it to true to simply invert the tween's normal ease. Note: GSAP is smart enough to automatically set yoyo: true if you define any yoyoEase, so there's less code for you to write. Default: `false`.

### Emits

All emits are giving access to current tween by passing `$event` when using event listeners.

| Name              | Description
| ----------------- | ------------- | 
| `complete`        | A function to call when the animation has completed.
| `interrupt`       | A function to call when the animation has been interrupted.
| `repeat`          | A function to call each time the animation enters a new iteration cycle (repeats). Obviously this only occurs if you set a non-zero repeat.
| `reverseComplete` | A function to call when the animation has reached its beginning again from the reverse direction (excluding repeats).
| `start`           | A function to call when the animation begins (when its time changes from 0 to some other value which can happen more than once if the tween is restarted multiple times).
| `update`          | A function to call every time the animation updates (on each "tick" that moves its playhead).

### Methods

#### duration
Plays the animation, optionally from the given start time.

| Parameter name    | Type
| ----------------- | ------------- | 
| `from`            | `string \| number \| null \| undefined`
| `suppressEvents`  | `boolean \| undefined`

Returns `gsap.core.Tween`

#### play
Plays the animation, optionally from the given start time.

| Parameter name    | Type
| ----------------- | ------------- | 
| `from`            | `string \| number \| null \| undefined`
| `suppressEvents`  | `boolean \| undefined`

Returns `gsap.core.Tween`

## `<Timeline />`
## `<ScrollTrigger />`
## `<Controls />`
## `<Snap />`
## `<[Effect] />`