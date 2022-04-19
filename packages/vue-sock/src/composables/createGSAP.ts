import { GSAPOptions } from '@/types';
import { App } from 'vue';
import { configureGSAP } from '../helpers/configureGSAP';

export const createGSAP = (options?: GSAPOptions) => {
    
    const install = (app: App) => {

        if (!options) return;

        configureGSAP(options);
    }

    return {
        install
    }
}