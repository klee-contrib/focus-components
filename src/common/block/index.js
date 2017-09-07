import React from 'react';
import builder from 'focus-core/component/builder';
import types from 'focus-core/component/types';
import i18nBehaviour from '../../common/i18n/mixin';
import styleBehaviour from '../../mixin/stylable';
import { component as Title } from '../title';

/**
* Mixin used in order to create a block.
* @type {Object}
*/
const blockMixin = {
    mixins: [i18nBehaviour, styleBehaviour],

    /** @inheritdoc */
    getDefaultProps() {
        return {
            actionsPosition: 'top'
        };
    },

    /** @inheritedDoc */
    propTypes: {
        actions: types('func'),
        actionsPosition: React.PropTypes.oneOf(['both', 'bottom', 'top']),
        title: types('string')
    },
    /**
    * Header of theblock function.
    * @return {[type]} [description]
    */
    heading() {
        if (this.props.title) {
            return this.i18n(this.props.title);
        }
    },
    componentWillMount() {
        console.warn('FocusComponents 0.7.0: this component is deprecated, please use FocusComponents.components.Panel');
    },
    /**
    * Render the a block container and the cild content of the block.
    * @return {DOM} React DOM element
    */
    render() {
        const { actions, actionsPosition, children } = this.props;
        const shouldDisplayActionsTop = actions && ['both', 'top'].includes(actionsPosition);
        const shouldDisplayActionsBottom = actions && ['both', 'bottom'].includes(actionsPosition);
        return (
            <div className='mdl-card mdl-card--border mdl-shadow--4dp' data-focus='block'>
                <div className='mdl-card__title mdl-card--border' data-focus='block-title'>
                    <Title label={this.heading()} />
                    {shouldDisplayActionsTop && (
                        <div className='actions'>{actions()}</div>
                    )}
                </div>
                <div className='mdl-card__supporting-text' data-focus='block-content'>
                    {children}
                </div>
                {shouldDisplayActionsBottom && (
                    <div className='mdl-card__actions mdl-card--border' data-focus='block-actions'>
                        {actions()}
                    </div>
                )}
            </div>
        );
    }
};

const { mixin, component } = builder(blockMixin);
export { mixin, component };
export default { mixin, component };
