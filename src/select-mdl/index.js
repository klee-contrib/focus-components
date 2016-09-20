//dependencies
import React, {PureComponent, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
import find from 'lodash/find';
import {isUndefined, isNull, isNumber} from 'lodash/lang';
import union from 'lodash/union';

const UNSELECTED_KEY = 'UNSELECTED_KEY';

/**
* Parse the value.
* @param  {string | number} propsValue - The value given as props to read the type.
* @param  {string} rawValue   - The raw string value.
* @return {strint | number}  - The parsed value.
*/
function _valueParser(propsValue, rawValue) {
    if(UNSELECTED_KEY === rawValue) {
        return undefined;
    }
    const {type} = this.props;
    return type === 'number' ? +rawValue : rawValue;
}


/**
* Component standing for an HTML input.
* https://github.com/CreativeIT/getmdl-select/
*/
class Select extends PureComponent {
    constructor(props) {
        super(props);
        const {hasUndefined, isRequired, labelKey, value, values = [], valueKey, unSelectedLabel} = props;
        const isRequiredAndNoValue = isRequired && (isUndefined(value) || isNull(value));
        this.allValues = hasUndefined || isRequiredAndNoValue ? union([{[labelKey]: i18next.t(unSelectedLabel), [valueKey]: UNSELECTED_KEY}], values) : values;
    };

    componentDidMount() {
      const selectMenu = ReactDOM.findDOMNode(this.refs["selectMenu"]);
      componentHandler.upgradeElement(selectMenu);
    }

    /**
    * Get the dom value of the component.
    * @return {object} - The unformated dom value.
    */
    getValue = () => {
        const {type, value} = this.props;
        if (isNull(value) || isUndefined(value) || UNSELECTED_KEY === value) return null;
        return type === 'number' ? +value : value;
    };

    /**
    * Handle the change on the select, it only propagates the value.
    * @param  {object} evt - The react DOM event.
    * @return {object} - The function onChange from the props, called.
    */
    _handleSelectChange = (value) => {
        const {onChange, valueParser, value: propsValue} = this.props;
        return onChange(valueParser.call(this, propsValue, value));
    };

    /** inheritdoc */
    _renderOptions({hasUndefined, labelKey, isRequired, value, values = [], valueKey, isActiveProperty, unSelectedLabel}) {
        return this.allValues.filter(v => isUndefined(v[isActiveProperty]) || v[isActiveProperty] === true) // Filter on the active value only
        .map((val, idx) => {
            const optVal = `${val[valueKey]}`;
            const elementValue = val[labelKey];
            const optLabel = isUndefined(elementValue) || isNull(elementValue) ? i18next.t('input.select.noLabel') : elementValue;
            const isSelected = optVal === value;
            return (
                <li key={idx} className='mdl-menu__item' data-selected={isSelected} data-val={optVal} onClick={() => this._handleSelectChange(optVal)}>{optLabel}</li>
            );
        });
    }

    /**
    * @inheritdoc
    * @override
    */
    render() {
        const { autoFocus, error, labelKey, name, placeholder, style, value, valueKey, disabled, onChange, size } = this.props;
        const selectProps = { autoFocus, disabled, size };
        const currentValue = find(this.allValues, (o) => o[valueKey] === value);
        const currentLabel = isUndefined(currentValue) || isNull(currentValue) ? i18next.t('input.select.noLabel') : currentValue[labelKey];
        return (
            <div data-focus='select-mdl' ref='select' className='mdl-textfield mdl-js-textfield getmdl-select' data-valid={!error} style={style}>
                <input placeholder={placeholder} className='mdl-textfield__input' value={currentLabel} type='text' id={name} name={name} readOnly tabIndex='-1' data-val={value} ref='htmlSelect' {...selectProps} />
                {!disabled &&
                    <label htmlFor={name}>
                        <i className='mdl-icon-toggle__label material-icons'>keyboard_arrow_down</i>
                    </label>
                }
                {!disabled &&
                    <ul className='mdl-menu mdl-js-menu' htmlFor={name} ref='selectMenu'>
                        {this._renderOptions(this.props)}
                    </ul>
                }
                {error && <div className='label-error' ref='error'>{error}</div>}
            </div>
        );
    }
}

Select.displayName = 'Select';
Select.defaultProps = {
    disabled: false,
    hasUndefined: true,
    isActiveProperty: 'isActive',
    isRequired: false,
    labelKey: 'label',
    multiple: false,
    unSelectedLabel: 'select.unSelected',
    values: [],
    valueKey: 'code',
    valueParser: _valueParser
};
Select.propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    hasUndefined: PropTypes.bool,
    isActiveProperty: PropTypes.string,
    isRequired: PropTypes.bool,
    labelKey: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    unSelectedLabel: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    valueKey: PropTypes.string,
    values: PropTypes.array.isRequired
};
export default Select;
