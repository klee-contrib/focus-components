import React from 'react';
import { lazyload } from 'react-lazyload';

import Panel from '../../components/panel';

export default function lazyDecorator({ title,
    height = 300,
    offset = 150,
    placeholder = <Panel style={{ height }} title={title} />,
    debounce = 250,
    once = true }) {
    return lazyload({ title, height, debounce, once, offset, placeholder });
}