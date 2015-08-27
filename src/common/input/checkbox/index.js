const builder = require('focus').component.builder;
const React = require('react');
const type = require('focus').component.types;
const fieldGridBehaviourMixin = require('../../mixin/field-grid-behaviour');
const isBoolean = require('lodash/lang/isBoolean');
// const uuid = require('uuid').v4;

const checkBoxMixin = {
    mixins: [fieldGridBehaviourMixin],

    /**
    * Properties validation.
    * @type {Object}
    */
    propTypes: {
        value: type('bool'),
        label: type('string'),
        onChange: type(['function', 'object'])
    },
    /** @inheritDoc */
    getInitialState() {
        return {
            // guid: uuid(),
            isChecked: this.props.isChecked ? this.props.isChecked : this.props.value
        };
    },
    /**
    * Executed actions on change event.
    * @param  {event} event
    */
    _onChange(event) {
        this.setState({
            isChecked: !this.state.isChecked
        }, this.props.onChange);
    },
    /**
    * Get the value from the input in  the DOM.
    * @returns The DOM node value.
    */
    getValue() {
        const value = this.props.value;
        const isChecked = this.state.isChecked;
        if (value === undefined || isBoolean(value)) {
            return !!isChecked;
        }
        return !!(isChecked ? value : undefined);
    },
    // /**
    // * Build the label class name.
    // * @returns The label classame with the grid informations.
    // */
    // _labelClassName() {
    //     return `${this._getContentOffsetClassName()} ${this._getContentGridClassName()}`;
    // },
    /**
    * Render the Checkbox HTML.
    * @return {VirtualDOM} - The virtual DOM of the checkbox.
    */
    render() {
        const {isChecked, guid} = this.state;
        const {label, value} = this.props;
        return (
            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" data-focus="input-checkbox" data-uid={guid}>
              <input checked={isChecked} className="mdl-checkbox__input" onChange={this._onChange} type="checkbox" value={value} />
              <span className="mdl-checkbox__label">{label ? label : ''}</span>
            </label>
        );
    },
    // /** @inheritedDoc*/
    // componentWillReceiveProps: function checkBoxWillreceiveProps(nextProps) {
    //     if (nextProps.value !== undefined) {
    //         this.setState({isChecked: nextProps.value});
    //     }
    // }
};

module.exports = builder(checkBoxMixin);
