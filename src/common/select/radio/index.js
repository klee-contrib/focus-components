const builder = require('focus-core').component.builder;
const React = require('react');
const types = require('focus-core').component.types;
const i18nBehaviour = require('../../i18n/mixin');
const mdlBehaviour = require('../../mixin/mdl-behaviour');
const {uniqueId} = require('lodash/utility');
const InputRadio = require('../../input/radio').component;

const selectRadioMixin = {
    mixins: [i18nBehaviour, mdlBehaviour],
    /**
    * Tag name.
    */
    displayName: 'SelectRadio',

    /** @inheritdoc */
    getDefaultProps() {
        return {
            values: [],
            valueKey: 'code',
            labelKey: 'label'
        };
    },

    /** @inheritdoc */
    propTypes: {
        values: types('array'),
        value: types(['number', 'string']),
        valueKey: types('string'),
        labelKey: types('string'),
        onChange: types('func')
    },

    /** @inheritdoc */
    getInitialState() {
        return {
            uniqueName: uniqueId('options_'),
            value: this.props.value
        };
    },

    /** @inheritdoc */
    componentWillReceiveProps (newProps){
        this.setState({
            value: newProps.value
        });
    },

    /**
     * Get the value from the select in the DOM.
     * @return {string, number} selected value
     */
    getValue () {
        return this.state.value;
    },

    /**
    * handle click on radio
    * @param {object} event - the click event
    */
    _handleRadioChange(newValue) {
        const {onChange} = this.props;
        if(onChange){
            onChange(newValue);
            return;
        }
        //Set the state then call the change handler.
        this.setState({value: newValue});
    },
    /**
     * Closure to capture key and radio status.
     * @param  {string} key the key of radio
     * @return {func} status closure
     */
    _getRadioChangeHandler(key) {
        return () => {
            this._handleRadioChange(key);
        };
    },
    /**
    * Render radio for each values
    * @return {XML} the different radio values
    */
    renderSelectRadios() {
        const {uniqueName} = this.state;
        return this.props.values.map((val, idx)=>{
            const value = val[this.props.valueKey];
            const label = val[this.props.labelKey];
            const isChecked = value === this.state.value;
            return (
                <InputRadio key={idx} label={this.i18n(label)} name={uniqueName} onChange={this._getRadioChangeHandler(value)} value={isChecked} />
            );
        });
    },
    /** @inheritdoc */
    render() {
        return (
            <div data-focus='select-radio'>
                {this.renderSelectRadios()}
            </div>
        );
    }
};

module.exports = builder(selectRadioMixin);
