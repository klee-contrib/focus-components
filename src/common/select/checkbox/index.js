const builder = require('focus').component.builder;
const React = require('react');
const type = require('focus').component.types;
const Checkbox = require('../../input/checkbox').component;
const i18nBehaviour = require('../../i18n/mixin');
const {pull} = require('lodash/array');

const selectCheckboxMixin = {
    mixins: [i18nBehaviour],
    /**
    * Tag name.
    */
    displayName: 'SelectCheckbox',

    /** @inheritdoc */
    getDefaultProps() {
        return {
            values: [], // all values
            value: [], // selected values list
            valueKey: 'value', // key for the displayed value
            labelKey: 'label' // key for the displayed label
        };
    },
    /** @inheritdoc */
    propTypes() {
        return {
            values: type('array'),
            value: type('array'),
            valueKey: type('string'),
            labelKey: type('string')
        };
    },

    /** @inheritdoc */
    getInitialState() {
        return {
            selectedValues: this.props.value
        };
    },

    /** @inheritdoc */
    componentWillReceiveProps(newProps) {
        this.setState({selectedValues: newProps.value});
    },

    /**
    * Get the value from the select in the DOM.
    * @return {string} value
    */
    getValues() {
        return this.state.selectedValues;
    },

    /**
     * Handle a change of value.
     * @param  {[type]} key       the key
     * @param  {[type]} newStatus the new status
     */
    _handleCheckboxChange(key, newStatus) {
        const selectedValues = this.state.selectedValues;
        if(newStatus) {
            selectedValues.push(key);
        } else {
            pull(selectedValues, key);
        }
        this.setState({value: selectedValues});
        if(this.props.onChange) {
            this.props.onChange(event);
        }
    },
    /**
     * Closure to capture key and checbox status.
     * @param  {[type]} key the key of checkbox
     * @return {[type]} status closure
     */
    _getCheckboxChangeHandler(key) {
        return (status) => {
            this._handleCheckboxChange(key, status);
        };
    },
    /**
     * Render all selection checkbox.
     * @return {ReactDOMNode} list of ReactDomNode
     */
    renderCheckboxes() {
        return this.props.values.map((val, idx) => {
            const value = val[this.props.valueKey];
            const label = val[this.props.labelKey];
            const isChecked = 0 <= this.state.selectedValues.indexOf(value);
            return (
                <Checkbox key={idx} label={this.i18n(label)} onChange={this._getCheckboxChangeHandler(value)} value={isChecked} />
            );
        });
    },

    /** @inheritdoc */
    render() {
        return (
            <div data-focus='select-checkbox'>
                {this.renderCheckboxes()}
            </div>
        );
    }
};

module.exports = builder(selectCheckboxMixin);
