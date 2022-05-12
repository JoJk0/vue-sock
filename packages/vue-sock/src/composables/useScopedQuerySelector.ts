import { ElementTarget } from '@/types'
import { getElementFromScopedComponent } from '../utils'
import { getCurrentInstance, ref, onMounted } from 'vue'

export const useScopedQuerySelector = (target: ElementTarget | undefined) => {

    const instance = getCurrentInstance()

    const el = ref<Element>()

    onMounted(() => {
        if (target instanceof Element) {
            el.value = target
        } else if (target) {
            if (!instance) {
                console.warn('[VueSock]: Instance not found');
                return;
            }
            el.value = getElementFromScopedComponent(target, instance)
        }
    })

    return el
}