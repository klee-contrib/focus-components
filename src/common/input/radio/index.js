const React = require('react');
const {builder, types} = require('focus-core').component;
const i18nBehaviour = require('../../i18n/mixin');
const fieldGridBehaviourMixin = require('../../mixin/field-grid-behaviour');
const mdlBehaviour = require('../../mixin/mdl-behaviour');
const {isUndefined} = require('lodash/lang');

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
    /** @inheritdoc */
    componentWillReceiveProps(newProps) {
        this.setState({isChecked: newProps.value});
    },
    /** @inheritDoc */
    getInitialState() {
        const {value} = this.props;
        return {
            isChecked: isUndefined(value) ? false : value
        };
    },
    /**
    * Executed actions on change event.
    * @param  {event} event
    */
    _onChange() {
        this.setState({
            isChecked: !this.state.isChecked
        }, () => {
            if(this.props.onChange) {
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
        const {isChecked} = this.state;
        const {label, name} = this.props;
        // we use inputProps to be able to display 'checked' property. it is required to be able to use MDL.
        const checkedProps = isChecked ? {checked: 'checked'} : {};
        const inputProps = {...{className: 'mdl-radio__button', name: name, onChange: this._onChange, type: 'radio'}, ...checkedProps};
        return (
            <label className='mdl-radio mdl-js-radio mdl-js-ripple-effect' data-focus="input-radio">
                <input {...inputProps} />
                <span className='mdl-radio__label'>{this.i18n(label)}</span>
            </label>
        );
    }
};

module.exports = builder(radioMixin);
