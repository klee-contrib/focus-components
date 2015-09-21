const {builder, types} = require('focus-core').component;
const React = require('react');
const i18nBehaviour = require('../../i18n/mixin');
const fieldGridBehaviour = require('../../mixin/field-grid-behaviour');
const mdlBehaviour = require('../../mixin/mdl-behaviour');
const {isUndefined} = require('lodash/lang');


const checkBoxMixin = {
    mixins: [i18nBehaviour, fieldGridBehaviour, mdlBehaviour],

    /**
    * Tag name.
    */
    displayName: 'input-checkbox',

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
        value: types('bool'),
        label: types('string'),
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
        const {label} = this.props;
        const checkedProps = isChecked ? {checked: 'checked'} : {};
        const inputProps = {...{className: 'mdl-checkbox__input', onChange: this._onChange, type: 'checkbox'}, ...checkedProps};
        return (
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" data-focus="input-checkbox">
                <input {...inputProps} />
                {label &&
                    <span className="mdl-checkbox__label">{this.i18n(label)}</span>
                }
            </label>
        );
    }
};

module.exports = builder(checkBoxMixin);
