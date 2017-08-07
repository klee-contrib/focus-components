import builder from 'focus-core/component/builder';
import React from 'react';

let emptyMixin = {
    componentWillMount() {
        console.warn('FocusComponents v0.15: the \'Empty\' component from FocusComponents.common is deprecated, please use FocusComponents.components.Empty');
    },
    render() {
        return (
            <div data-focus='empty' />
        );
    }
}

const { mixin, component } = builder(emptyMixin);
export { mixin, component };
export default { mixin, component };
