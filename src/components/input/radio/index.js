import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Translation from '../../../behaviours/translation';
import GridBehaviour from '../../../behaviours/grid';
import MaterialBehaviour from '../../../behaviours/material';
import filterProps from '../../../utils/filter-html-attributes';
import isUndefined from 'lodash/lang/isUndefined';

@Translation
@MaterialBehaviour('inputMdl')
@GridBehaviour
class Radio extends Component {

    static defaultProps = {
        value: false
    };

    static propTypes = {
        label: PropTypes.string.isRequired,
        name: PropTypes.string,
        value: PropTypes.bool,
        onChange: PropTypes.func
    };

    state = {
        isChecked: isUndefined(this.props.value) ? false : this.props.value
    };

    componentWillReceiveProps(newProps) {
        this.setState({ isChecked: newProps.value });
    }

    componentDidMount() {
        this.updateCheckedClass();
    }

    componentDidUpdate() {
        this.updateCheckedClass();
    }

    updateCheckedClass() {
        const { inputMdl } = this.refs;
        const { isChecked } = this.state;
        if (inputMdl) {
            const { classList } = inputMdl;
            if (isChecked === true) classList.add('is-checked');
            if (isChecked === false) classList.remove('is-checked');
        }
    }

    /**
    * Executed actions on change event.
    * @param  {event} event
    */
    _onChange = () => {
        this.setState({ isChecked: !this.state.isChecked }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.isChecked);
            }
        });
    }

    /**
    * Get the value from the input in  the DOM.
    * @returns The DOM node value.
    */
    getValue() {
        return this.state.isChecked;
    }

    /**
    * Render the Checkbox HTML.
    * @return {VirtualDOM} - The virtual DOM of the checkbox.
    */
    render() {
        const { isChecked } = this.state;
        const { label } = this.props;
        const validInputProps = filterProps(this.props);

        validInputProps.onChange = this._onChange;
        validInputProps.checked = isChecked ? 'checked' : undefined;
        const inputProps = { ...validInputProps };

        return (
            <label className='mdl-radio mdl-js-radio mdl-js-ripple-effect' data-focus='input-radio' ref='inputMdl'>
                <input className='mdl-radio__button' type='radio' ref='inputRadio' {...inputProps} />
                <span className='mdl-radio__label'>{this.i18n(label)}</span>
            </label>
        );
    }
}

Radio.displayName = 'InputRadio';

export default Radio;
