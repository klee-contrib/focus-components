const builder = require('focus').component.builder;
const React = require('react');
const types = require('focus').component.types;
const i18nBehaviour = require('../../i18n/mixin');
const fieldGridBehaviourMixin = require('../../mixin/field-grid-behaviour');
const {isUndefined} = require('lodash/lang');

const checkBoxMixin = {
    mixins: [i18nBehaviour, fieldGridBehaviourMixin],

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
        return (
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" data-focus="input-checkbox">
                <input checked={isChecked} className="mdl-checkbox__input" onChange={this._onChange} type="checkbox" value={isChecked} />
                {label &&
                    <span className="mdl-checkbox__label">{this.i18n(label)}</span>
                }
            </label>
        );
    }
};

module.exports = builder(checkBoxMixin);
