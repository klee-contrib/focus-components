import builder from 'focus-core/component/builder';
import React from 'react';

const headerMixin = {
    componenWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use components from focus-components/components/layout folder');
    },
    /** @inheriteddoc */
    render() {
        return (
            <div data-focus='content-bar'>
                {this.props.children}
            </div>
        );
    }
};

const { mixin, component } = builder(headerMixin);
export { mixin, component };
export default { mixin, component };
