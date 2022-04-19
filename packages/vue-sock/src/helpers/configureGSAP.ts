import { GSAPOptions } from '@/types';
import gsap from 'gsap'
import { filterOptions } from '../utils';

export const configureGSAP = (options: GSAPOptions) => {
    options.plugins?.forEach(plugin => gsap.registerPlugin(plugin))

    const filteredConfig = filterOptions(options, ['plugins'])

    gsap.config(filteredConfig)
}