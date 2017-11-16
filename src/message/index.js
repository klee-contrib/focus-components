import React from 'react';
import builder from 'focus-core/component/builder';
import types from 'focus-core/component/types';
import i18nBehaviour from '../common/i18n/mixin';
import Button from '../components/button';

const messageMixin = {
    /** @inheritedDoc */
    getDefaultProps() {
        return {
            type: 'info',
            style: {}
        };
    },

    /** @inheritedDoc */
    propTypes: {
        content: types('string'),
        style: types('object'),
        title: types('string'),
        ttl: types('number'),
        type: types('string')
    },
    componentWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use the message center instead instead');
    },
    /** @inheritedDoc */
    componentDidMount() {
        if (this.props.ttl) {
            setTimeout(() => {
                this._handleTimeToLeave();
            }, this.props.ttl);
        }
    },

    /** @inheritedDoc */
    mixins: [i18nBehaviour],

    /**
    * Time to leave handler.
    */
    _handleTimeToLeave() {
        let { handleTimeToLeave, id } = this.props;
        if (handleTimeToLeave) {
            handleTimeToLeave(id);
        }
    },

    /**
    * Handle click on the dismiss button.
    * @param {Event} event - Sanitize event.
    */
    _handleOnClick(event) {
        let { handleOnClick, id } = this.props;
        if (handleOnClick) {
            handleOnClick(id);
        }
    },

    /**
    * Render an alert.
    * @return {JSX} The jsx.
    */
    render() {
        const { type, id, content, title } = this.props;
        return (
            <div data-focus='message' data-id={id} data-message-type={type}>
                <Button handleOnClick={this._handleOnClick} icon='clear' shape='icon' type='button' />
                {title && <h4>{title}</h4>}
                <p>{this.i18n(content)}</p>
            </div>
        );
    }
};

const { mixin, component } = builder(messageMixin);
export { mixin, component };
export default { mixin, component };
