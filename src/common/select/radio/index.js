var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;

var radioMixin = {
    /**
     * Tag name.
     */
    displayName: 'select-radio',

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps(){
        return {
            values: [],
            valueKey: 'value',
            labelKey: 'label'
        };
    },

    /** @inheritdoc */
    propTypes: function propTypes(){
        return {
            value: type(['number', 'string']),
            values: type('array'),
            valueKey: type('string'),
            labelKey: type('string'),
            name: type('string'),
            style: type('object')
        };
    },

    /** @inheritdoc */
    getInitialState: function getInitialStateSelect() {
        return {
            value: this.props.value
        };
    },

    /** @inheritdoc */
    componentWillReceiveProps: function selectWillReceiveProps(newProps){
        this.setState({value: newProps.value});
    },

    /**
     * Get the value from the select in the DOM.
     */
    getValue: function getSelectTextValue() {
        return this.state.value;
    },

    /**
     * handle click on radio
     * @param {object} event - the click event
     */
    _handleChange: function selectOnChange(event){
        if(this.props.onChange){
            this.props.onChange(event);
        }else {
            //Set the state then call the change handler.
            this.setState({value: event.target.value});
        }
    },

    /**
     * Render radio for each values
     * @return {XML} the different radio values
     */
    renderRadios: function renderRadio(){
        var key = 0;
        return this.props.values.map((val)=>{
            var value = val[this.props.valueKey];
            var label = val[this.props.labelKey];
            var isChecked = value == this.state.value;
            return (
                <div className="radio radio-primary" key={key++}>
                    <label>
                        <input type="radio"
                            name={this.props.name}
                            value={value}
                            checked={isChecked}
                            onChange={this._handleChange}
                        />
                        <span className="circle"></span>
                        <span className="check"></span>
                        <div>{label}</div>
                    </label>
                </div>
            );
        });
    },

    /** @inheritdoc */
    render: function renderRadio(){
        return (
            <div
                className={this.props.style.className}
                name={this.props.name}
            >
            {this.renderRadios()}
            </div>
        );
    }
};

module.exports = builder(radioMixin);
