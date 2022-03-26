export type GSAPOptions = {

    /** An array of registerable GSAP plugins to use in the app */
    plugins?: gsap.Plugin[];

    /** How many frames should elapse between internal checks to see if GSAP should power-down the internal ticker to conserve system resources and battery life on mobile devices. The default is `120` (about every 2 seconds). */
    autoSleep?: gsap.GSAPConfig['autoSleep'];

    /** GSAP automatically attempts to maximize rendering performance by applying transforms with 3D components like `translate3d()` instead of `translate()` **during** The animation to activate GPU acceleration, and then switches back to the 2D variant at the end (if possible) to conserve GPU memory. That describes  `force3D: "auto"` behavior (the default). Setting `force3D: false` disables the behavior. Setting `force3D: true` will force all transform-related tweens to use the 3D component and NOT switch back to 2D at the end of the tween. */
    force3D?: gsap.GSAPConfig['force3D'];

    /** By default, GSAP will throw a warning when attempting to tween elements that don't exist (are `null`). You can suppress this warning by setting `nullTargetWarn: false`. */
    nullTargetWarn?: gsap.GSAPConfig['nullTargetWarn'];

    /** Set the default CSS unit to be used for various properties when no unit is provided. For example, `{left: 100}` animates the CSS "left" property to be tweened to 100px because the default unit is "px" for the "left" property. If you want to make `{left: 100}` animate to 100% by default instead you could define` gsap.config({units: {left: "%"}})`. Only the properties that you set will be changed. The default for most numbers is `"px"` and rotation-related values are `"deg"`. */
    units?: gsap.GSAPConfig['units'];

    autoKillThreshold?: gsap.GSAPConfig['autoKillThreshold'];

    resistance?: gsap.GSAPConfig['resistance'];

    unitFactors?: gsap.GSAPConfig['unitFactors'];

    stringFilter?: gsap.GSAPConfig['stringFilter'];
}