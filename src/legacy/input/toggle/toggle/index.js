import builder from 'focus-core/component/builder';
import React from 'react';
import type from 'focus-core/component/types';
import fieldGridBehaviourMixin from '../../../../common/mixin/field-grid-behaviour';

const toggleMixin = {
    mixins: [fieldGridBehaviourMixin],
    /**
     * Get the checkbox default attributes.
     */
    getDefaultProps() {
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
        style: type('object')
    },
    getInitialState() {
        return {
            isChecked: this.props.value
        };
    },
    _onChange(event) {
        this.setState({
            isChecked: !this.state.isChecked
        });
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },
    _labelClassName() {
        return `${this._getContentGridClassName()}`;
    },
    /**
     * Get the value from the input in  the DOM.
     */
    getValue() {
        return this.getDOMNode().value;
    },
    /**
     * Render the Checkbox HTML.
     * @return {VirtualDOM} - The virtual DOM of the checkbox.
     */
    render() {
        return (
            <div className='togglebutton form-group'>
                <label className={this._getLabelGridClassName()}>{this.props.label ? this.props.label : ''}</label>
                <label className={this._labelClassName()}>
                    <input ref='checkbox' checked={this.state.isChecked} onChange={this._onChange} type='checkbox' />
                </label>
            </div>
        );
    },
    /** @inheritedDoc*/
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== undefined) {
            this.setState({ isChecked: nextProps.value });
        }
    }
};

export default builder(toggleMixin);
