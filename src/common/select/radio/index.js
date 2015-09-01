const builder = require('focus').component.builder;
const React = require('react');
const types = require('focus').component.types;
const i18nBehaviour = require('../../i18n/mixin');
const uuid = require('uuid').v4;

const selectRadioMixin = {
    mixins: [i18nBehaviour],
    /**
    * Tag name.
    */
    displayName: 'select-radio',

    /** @inheritdoc */
    getDefaultProps() {
        return {
            values: [],
            valueKey: 'value',
            labelKey: 'label'
        };
    },

    /** @inheritdoc */
    propTypes() {
        return {
            values: types('array'),
            selectedValue: types(['number', 'string']),
            valueKey: types('string'),
            labelKey: types('string')
        };
    },

    /** @inheritdoc */
    getInitialState() {
        return {
            guid: uuid(),
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
    _handleOnChange(event) {
        //Set the state then call the change handler.
        this.setState({value: event.target.value});
        if(this.props.onChange){
            this.props.onChange(event);
        }
    },

    /**
    * Render radio for each values
    * @return {XML} the different radio values
    */
    renderSelectRadios() {
        let key = 0;
        const {guid} = this.state;
        return this.props.values.map((val)=>{
            const value = val[this.props.valueKey];
            const label = val[this.props.labelKey];
            const isChecked = value === this.state.value;
            return (
                <label className='mdl-radio mdl-js-radio mdl-js-ripple-effect' key={key++}>
                    <input checked={isChecked} className='mdl-radio__button' name={guid} onChange={this._handleOnChange} type='radio' value={value} />
                    <span className='mdl-radio__label'>{this.i18n(label)}</span>
                </label>
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
