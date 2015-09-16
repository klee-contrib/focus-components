const {builder, types} = require('focusjs').component;
const React = require('react');
const ReactDOM = require('react-dom');
const i18nBehaviour = require('../../i18n/mixin');
const mdlBehaviour = require('../../mixin/mdl-behaviour');

/**
*
* @type {Object}
*/
const textAreaMixin = {
    mixins: [i18nBehaviour, mdlBehaviour],
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
        minlength: types('number'),
        maxlength: types('number'),
        wrap: types('string'),
        required: types('bool'),
        value: types('string'),
        label: types('string'),
        rows: types('number'),
        cols: types('number')
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
        return ReactDOM.findDOMNode(this).value;
    },
    /**
    * Render the Checkbox HTML.
    * @return {VirtualDOM} - The virtual DOM of the checkbox.
    */
    render: function renderTextArea() {
        const {cols, label, maxlength, minlength, rows} = this.props;
        return (
            <div className="mdl-textfield mdl-js-textfield" data-focus="input-textarea">
                <textarea className="mdl-textfield__input" cols={cols} maxLength={maxlength} minLength={minlength} onChange={this._onChange} ref='textarea' rows={rows} type="text">{this.state.value}</textarea>
                <label className="mdl-textfield__label">{this.i18n(label)}</label>
            </div>
        );
    }
};

module.exports = builder(textAreaMixin);
