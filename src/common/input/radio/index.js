import React from 'react';
import builder from 'focus-core/component/builder';
import types from 'focus-core/component/types';
import i18nBehaviour from '../../i18n/mixin';
import fieldGridBehaviourMixin from '../../mixin/field-grid-behaviour';
import mdlBehaviour from '../../mixin/mdl-behaviour';
import isUndefined from 'lodash/lang/isUndefined';

const radioMixin = {
    mixins: [i18nBehaviour, fieldGridBehaviourMixin, mdlBehaviour],
    /**
    * Tag name.
    */
    displayName: 'input-radio',

    /** @inheritdoc */
    getDefaultProps() {
        return {
            value: false
        };
    },
    /**
    * Properties validation.
    * @type {Object}
    */
    propTypes: {
        label: types('string').isRequired,
        name: types('string'),
        value: types('bool'),
        onChange: types('func')
    },
    componentWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use focus-components/components/input/select-radio instead');
    },
    /** @inheritdoc */
    componentWillReceiveProps(newProps) {
        this.setState({ isChecked: newProps.value });
    },
    /** @inheritDoc */
    getInitialState() {
        const { value } = this.props;
        return {
            isChecked: isUndefined(value) ? false : value
        };
    },
    componentDidUpdate() {
        const { inputMdl } = this.refs;
        const { isChecked } = this.state;
        if (inputMdl) {
            const { classList } = inputMdl;
            if (isChecked === true) classList.add('is-checked');
            if (isChecked === false) classList.remove('is-checked');
        }
    },
    /**
    * Executed actions on change event.
    * @param  {event} event
    */
    _onChange() {
        this.setState({
            isChecked: !this.state.isChecked
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.isChecked);
            }
        });
    },
    /**
    * Get the value from the input in  the DOM.
    * @returns The DOM node value.
    */
    getValue() {
        return this.state.isChecked;
    },
    /**
    * Render the Checkbox HTML.
    * @return {VirtualDOM} - The virtual DOM of the checkbox.
    */
    render() {
        const { isChecked } = this.state;
        const { label, name, ...otherProps } = this.props;
        // we use inputProps to be able to display 'checked' property. it is required to be able to use MDL.
        const checkedProps = isChecked ? { checked: 'checked' } : {};
        const inputProps = { ...{ className: 'mdl-radio__button', name: name, onChange: this._onChange, type: 'radio' }, ...checkedProps, ...otherProps };

        return (
            <label className='mdl-radio mdl-js-radio mdl-js-ripple-effect' data-focus='input-radio' ref='inputMdl'>
                <input {...inputProps} />
                <span className='mdl-radio__label'>{this.i18n(label)}</span>
            </label>
        );
    }
};

const { mixin, component } = builder(radioMixin);
export { mixin, component };
export default { mixin, component };
