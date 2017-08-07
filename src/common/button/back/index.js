import React from 'react';
// Dependencies
import builder from 'focus-core/component/builder';
import historic from 'focus-core/history';
// Mixins
import i18nMixin from '../../i18n/mixin';
import stylableMixin from '../../../mixin/stylable';
// Components
import { component as Button } from '../action';

/**
* Mixin button.
* @type {Object}
*/
const buttonBackMixin = {
    /** inheritedDoc */
    mixins: [i18nMixin, stylableMixin],
    /** inheritedDoc */
    componentWillMount() {
        console.warn('FocusComponents v0.15: this component is deprecated, please use FocusComponents.components.Back');
    },
    render() {
        return (
            <Button
                handleOnClick={() => { historic.history.back() }}
                icon='keyboard_backspace'
                label={this.i18n('button.back')}
                shape={null}
                type='button'
            />
        );
    }
};

const { mixin, component } = builder(buttonBackMixin);
export { mixin, component };
export default { mixin, component };
