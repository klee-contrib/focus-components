// Dependencies

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _React = React;
var Component = _React.Component;

// Components

var Checkbox = FocusComponents.components.input.Checkbox;

var InputCheckboxSample = (function (_Component) {
    _inherits(InputCheckboxSample, _Component);

    function InputCheckboxSample() {
        var _this = this;

        _classCallCheck(this, InputCheckboxSample);

        _Component.apply(this, arguments);

        this.handleGetValueClick = function () {
            var value = _this.refs.cbTestGetValue.getValue();
            alert('Checkbox value: ' + value);
        };
    }

    /**
    * Render the component.
    * @return {object} React node
    */

    InputCheckboxSample.prototype.render = function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h3',
                null,
                'Input checkbox'
            ),
            React.createElement(Checkbox, { label: 'My awsome checkbox', value: true }),
            React.createElement(
                'h3',
                null,
                'Unselected checkbox'
            ),
            React.createElement(Checkbox, { label: 'My awsome checkbox', value: false }),
            React.createElement(
                'h3',
                null,
                'Without label'
            ),
            React.createElement(Checkbox, { value: true }),
            React.createElement(
                'h3',
                null,
                'Get Checkbox value'
            ),
            React.createElement(
                'div',
                { style: { float: 'left', width: '300px' } },
                React.createElement(Checkbox, { label: 'My awsome checkbox', ref: 'cbTestGetValue', value: true })
            ),
            React.createElement(
                'div',
                { style: { marginLeft: '300px' } },
                React.createElement(
                    'button',
                    { onClick: this.handleGetValueClick },
                    'Get the checkbox value'
                )
            )
        );
    };

    return InputCheckboxSample;
})(Component);

return React.createElement(InputCheckboxSample, null);

/**
* Handle click action to get check value.
*/