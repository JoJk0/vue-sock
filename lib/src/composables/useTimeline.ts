import { TimelineTweenOptions, TweenOptions } from '@/types'
import { ref } from 'vue';

type TimelineOptions = TweenOptions

export const useTimeline = (tweens: TimelineTweenOptions[], options?: TimelineOptions) => {
    const targets = [100].map(i => ref<HTMLElement>());
    return [targets]
}

const [[boxOneEl, boxTwoEl]] = useTimeline([
    {
        target: 'boxOneEl',
        to: { scaleX: 0.5, scaleY: 0.5 },
        duration: 2
    },
    {
        target: 'boxOneEl',
        to: { x: '200px' },
    },
    [
        [{
            target: 'boxTwoEl',
            to: { scaleX: 0.5, scaleY: 0.5 },
            duration: 2
        },
        {
            target: 'boxTwoEl',
            to: { x: '200px' },
        }],
        { options }
    ]
])
