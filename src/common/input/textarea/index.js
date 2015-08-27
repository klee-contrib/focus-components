const builder = require('focus').component.builder;
const React = require('react');
const type = require('focus').component.types;
/**
*
* @type {Object}
*/
const textAreaMixin = {
    /**
    * Gets the default props.
    * @return {object} default props
    */
    getDefaultProps() {
        return {
            minlength: 0,
            wrap: 'soft',
            required: false,
            rows: 5,
            cols: 50
        };
    },
    /**
    * Properties validation.
    * @type {Object}
    */
    propTypes: {
        minlength: type('number'),
        maxlength: type('number'),
        wrap: type('string'),
        required: type('bool'),
        value: type('string'),
        label: type('string'),
        rows: type('number'),
        cols: type('number')
    },
    /** inheritedDoc */
    getInitialState() {
        return {
            value: this.props.value
        };
    },
    /**
    * On change handler.
    * @param {object} event - Sanitize event.
    */
    _onChange: function onChange(event) {
        this.setState({value: event.target.value});
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },
    /**
    * Get the value from the input in the DOM.
    */
    getValue: function getTextAreaValue() {
        return this.getDOMNode().value;
    },
    /**
    * Render the Checkbox HTML.
    * @return {VirtualDOM} - The virtual DOM of the checkbox.
    */
    render: function renderTextArea() {
        const {cols, label, maxlength, minlength, rows} = this.props;
        return (
            <div data-focus="input-textarea">
                <textarea className="mdl-textfield__input" cols={cols} maxLength={maxlength} minLength={minlength} onChange={this._onChange} ref='textarea' rows={rows} type="text">{this.state.value}</textarea>
                <label className="mdl-textfield__label">{label}</label>
            </div>
        );
    }
};

module.exports = builder(textAreaMixin);
