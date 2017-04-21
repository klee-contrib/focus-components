import React, {Component, PropTypes} from 'react';
import Checkbox from '../checkbox';
import Translation from '../../../behaviours/translation';
import {pull} from 'lodash/array';

@Translation
class SelectCheckbox extends Component {
    static defaultProps = {
        values: [], // all values
        value: [], // selected values list
        valueKey: 'value', // key for the displayed value
        labelKey: 'label' // key for the displayed label
    };

    static propTypes = {
        values: PropTypes.array,
        value: PropTypes.array,
        valueKey: PropTypes.string,
        labelKey: PropTypes.string,
        onChange: PropTypes.func
    };

    state = {
        selectedValues: this.props.value
    };

    componentWillReceiveProps(newProps) {
        if (newProps) {
            this.setState({selectedValues: newProps.value});
        }
    }

    /**
    * Get the value from the select in the DOM.
    * @return {string} value
    */
    getValue() {
        return this.state.selectedValues;
    }

    /**
     * Handle a change of value.
     * @param  {[type]} key       the key
     * @param  {[type]} newStatus the new status
     */
    _handleCheckboxChange(key, newStatus) {
        if (this.props.onChange) {
            this.props.onChange(key, newStatus);
            return;
        }
        const selectedValues = this.state.selectedValues;
        if (newStatus) {
            selectedValues.push(key);
        } else {
            pull(selectedValues, key);
        }
        this.setState({value: selectedValues});
    }

    /**
     * Closure to capture key and checbox status.
     * @param  {[type]} key the key of checkbox
     * @return {[type]} status closure
     */
    _getCheckboxChangeHandler(key) {
        return (status) => {
            this._handleCheckboxChange(key, status);
        };
    }

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
    }

    render() {
        return (
            <div data-focus='select-checkbox'>
                {this.renderCheckboxes()}
            </div>
        );
    }
}

SelectCheckbox.displayName = 'SelectCheckbox';

export default SelectCheckbox;
