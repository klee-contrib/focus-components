import React from 'react';
import { lazyload } from 'react-lazyload';

import Panel from '../../components/panel';

/**
 * Lazy loading component with focus component Panel in placeholder by default.
 * The source code is available here: https://github.com/jasonslyvia/react-lazyload
 * Some demonstrations on this page: https://jasonslyvia.github.io/react-lazyload/examples/#/?_k=dr4z6a
 * 
 * @param {any} { title,
 *     height = 300,
 *     offset = 150,
 *     placeholder = <Panel style={{ height }} title={title} />,
 *     debounce = 250,
 *     once = true } 
 * @returns Your wrapped component
 */
export default function lazyDecorator({ title,
    height = 300,
    offset = 150,
    placeholder = <Panel style={{ height }} title={title} />,
    debounce = 250,
    once = true }) {
    return lazyload({ height, debounce, once, offset, placeholder });
}