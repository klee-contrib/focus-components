import i18next from 'i18next';
import frResources from './resources/fr-FR';

export const init = (language = 'fr-FR', resources = frResources) => {
    i18next.init({
        lng: language,
        resources: resources
    }, (err, t) => {
        console.info('[FOCUS-COMPONENTS] Translation initialized !');
    });
};
