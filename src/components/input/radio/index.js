import React, {Component, PropTypes} from 'react';
import Translation from '../../../behaviours/translation';
import GridBehaviour from '../../../behaviours/grid';
import MaterialBehaviour from '../../../behaviours/material';
import {isUndefined} from 'lodash/lang';

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
        this.setState({isChecked: newProps.value});
    }

    componentDidUpdate() {
        const {inputMdl} = this.refs;
        const {isChecked} = this.state;
        if (inputMdl) {
            const {classList} = inputMdl;
            if (isChecked === true) classList.add('is-checked');
            if (isChecked === false) classList.remove('is-checked');
        }
    }

    /**
    * Executed actions on change event.
    * @param  {event} event
    */
    _onChange() {
        this.setState({isChecked: !this.state.isChecked}, () => {
            if(this.props.onChange) {
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
        const {isChecked} = this.state;
        const {label, name, ...otherProps} = this.props;
        // we use inputProps to be able to display 'checked' property. it is required to be able to use MDL.
        const checkedProps = isChecked ? {checked: 'checked'} : {};

        return (
            <label className='mdl-radio mdl-js-radio mdl-js-ripple-effect' data-focus="input-radio" ref='inputMdl'>
                <input className='mdl-radio__button' name={name} onChange={::this._onChange} type='radio' {...checkedProps} {...otherProps}/>
                <span className='mdl-radio__label'>{label}</span>
            </label>
        );
    }
}

Radio.displayName = 'input-radio';

export default Radio;
