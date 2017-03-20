import { flow } from 'lodash';

import TranslationBehaviour from '../translation';

/**
 * Component base is an annotation used to combine all the standard annotation of a component.
 * @return {function} - The annotation.
 */
const componentBase = flow(TranslationBehaviour);

export default componentBase;
