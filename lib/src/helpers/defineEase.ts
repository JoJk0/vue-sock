import gsap from 'gsap'

export type EaseOptions = {
    name: string,
    ease: gsap.EaseFunction
}

export const defineEase = (options: EaseOptions) => {
    gsap.registerEase(options.name, options.ease);
}