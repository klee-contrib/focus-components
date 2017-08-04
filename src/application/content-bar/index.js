import builder from 'focus-core/component/builder';
import React from 'react';

const headerMixin = {
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
