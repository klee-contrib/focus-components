'use strict';

var Input = FocusComponents.components.input.Text;

var InputTextExample = React.createClass({
    displayName: 'InputTextExample',

    onChangeInput: function onChangeInput(name) {
        var _this = this;

        return function (value) {
            var _setState;

            _this.setState((_setState = {}, _setState[name] = value, _setState));
        };
    },
    getInitialState: function getInitialState() {
        return { inputWithValue: 'myAwesomeValue', inputWithError: 'errorValue' };
    },
    render: function render() {
        var _this2 = this;

        var _state = this.state;
        var inputWithValue = _state.inputWithValue;
        var inputWithoutValue = _state.inputWithoutValue;
        var inputWithError = _state.inputWithError;
        var inputGetTheValue = _state.inputGetTheValue;

        return React.createElement(
            'form',
            null,
            React.createElement(
                'h3',
                null,
                'Input with value'
            ),
            React.createElement(Input, { name: 'inputWithValue', value: inputWithValue, onChange: this.onChangeInput('inputWithValue') }),
            React.createElement(
                'h3',
                null,
                'Without value'
            ),
            React.createElement(Input, { placeholder: 'Put your value here...', name: 'inputWithoutValue', value: inputWithoutValue, onChange: this.onChangeInput('inputWithoutValue') }),
            React.createElement(
                'h3',
                null,
                'Input with error'
            ),
            React.createElement(Input, { value: 'Lorem Ipsum', error: 'Hey! you\'ve done someting wrong!', name: 'inputWithError', value: inputWithError, onChange: this.onChangeInput('inputWithError') }),
            React.createElement(
                'h3',
                null,
                'Get the value'
            ),
            React.createElement(Input, { value: 'Lorem Ipsum', ref: 'myInputText', name: 'inputGetTheValue', value: inputGetTheValue, onChange: this.onChangeInput('inputGetTheValue') }),
            React.createElement(
                'button',
                { onClick: function () {
                        alert(_this2.refs.myInputText.getValue());
                    } },
                'Get the input value'
            )
        );
    }
});

return React.createElement(InputTextExample, null);