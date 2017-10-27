import React from 'react';
import builder from 'focus-core/component/builder';
/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
let panelMixin = {
    getDefaultProps() {
        return {
            style: {}
        }
    },
    componentWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use focus-components/components/panel instead');
    },
    /**
     * Header of theblock function.
     * @return {[type]} [description]
     */
    heading() {
        if (this.props.title) {
            return (
                <div className='panel-heading'>
                    {this.props.title}
                </div>
            );
        }
    },
    /**
     * Render the a block container and the cild content of the block.
     * @return {DOM}
     */
    render() {
        return (
            <div className={`panel panel-default ${this.props.style.className}`}>
                {this.heading()}
                <div className='panel-body'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
const { mixin, component } = builder(panelMixin);
export { mixin, component };
export default { mixin, component };
