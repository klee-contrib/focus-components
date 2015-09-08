//Target
//http://codepen.io/Sambego/pen/zDLxe
/*
 <label>
 <input type="checkbox"><span class="ripple"></span><span class="check"></span> Checkbox
 </label>
 */
'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var fieldGridBehaviourMixin = require('../../mixin/field-grid-behaviour');
var jQuery = require('jquery');
var isBoolean = require('lodash/lang/isBoolean');
var uuid = require('uuid').v4;

var checkBoxMixin = {
    mixins: [fieldGridBehaviourMixin],
    /**
     * Get the checkbox default attributes.
     */
    getDefaultProps: function getInputDefaultProps() {
        return {
            value: undefined,
            label: undefined,
            style: {}
        };
    },
    /**
     * Properties validation.
     * @type {Object}
     */
    propTypes: {
        value: type('bool'),
        label: type('string'),
        style: type('object'),
        onChange: type(['function', 'object'])
    },
    getInitialState: function getInitialState() {
        return {
            uuid: uuid(),
            isChecked: this.props.isChecked ? this.props.isChecked : this.props.value
        };
    },
    _onChange: function onChange(event) {
        this.setState({
            isChecked: !this.state.isChecked
        }, this.props.onChange);
    },
    /**
     * Get the value from the input in  the DOM.
     * @returns The DOM node value.
     */
    getValue: function getValue() {
        if (this.props.value === undefined || isBoolean(this.props.value)) {
            return !!this.state.isChecked;
        }
        return !!(this.state.isChecked ? this.props.value : undefined);
    },
    /**
     * Build the label class name.
     * @returns The label classame with the grid informations.
     */
    _labelClassName: function labelClassName() {
        return this._getContentOffsetClassName() + ' ' + this._getContentGridClassName();
    },
    _matrerialize: function _matrerialize() {
        jQuery.material.checkbox('[data-focus="input-checkbox"][data-uid="' + this.state.uuid + '"] input[type="checkbox"]');
    },
    componentDidUpdate: function componentDidUpdate() {
        this._matrerialize();
    },
    componentDidMount: function componentDidMount() {
        if (!jQuery.material.checkbox) {
            console.warn('You should install bootstrap material with your project in order to have a working checkbox see https://fezvrasta.github.io/bootstrap-material-design');
        }
        this._matrerialize();
    },

    /**
     * Render the Checkbox HTML.
     * @return {VirtualDOM} - The virtual DOM of the checkbox.
     */
    render: function renderCheckBox() {
        return React.createElement(
            'div',
            { className: 'checkbox', 'data-focus': 'input-checkbox', 'data-uid': this.state.uuid },
            React.createElement(
                'label',
                null,
                React.createElement('input', { ref: 'checkbox', checked: this.state.isChecked, onChange: this._onChange, type: 'checkbox', value: this.props.value }),
                React.createElement(
                    'span',
                    null,
                    this.props.label ? this.props.label : ''
                )
            )
        );
    },
    /** @inheritedDoc*/
    componentWillReceiveProps: function checkBoxWillreceiveProps(nextProps) {
        if (nextProps.value !== undefined) {
            this.setState({ isChecked: nextProps.value });
        }
    }
};

module.exports = builder(checkBoxMixin);