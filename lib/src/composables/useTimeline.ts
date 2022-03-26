import { TimelineTweenOptions, TweenOptions } from '@/types'
import { ref } from 'vue';

type TimelineOptions = TweenOptions

export const useTimeline = (tweens: TimelineTweenOptions[], options?: TimelineOptions) => {
    const targets = [100].map(i => ref<HTMLElement>());
    return [targets]
}
