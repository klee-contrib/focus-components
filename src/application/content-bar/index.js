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

const builtComp = builder(headerMixin);
const {component, mixin} = builtComp;

export {
    component,
    mixin
}
export default builtComp;
