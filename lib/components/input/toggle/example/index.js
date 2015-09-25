// Dependencies

'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _React = React;
var Component = _React.Component;

// Components

var Toggle = FocusComponents.components.input.Toggle;

var InputToggleSample = (function (_Component) {
    _inherits(InputToggleSample, _Component);

    function InputToggleSample() {
        var _this = this;

        _classCallCheck(this, InputToggleSample);

        _Component.apply(this, arguments);

        this.handleGetValueClick = function () {
            var value = _this.refs.toggleTestGetValue.getValue();
            alert('Toggle value: ' + value);
        };
    }

    /**
    * Render the component.
    * @return {object} React node
    */

    InputToggleSample.prototype.render = function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h3',
                null,
                'Input toggle'
            ),
            React.createElement(Toggle, { label: 'My awsome toggle', value: true }),
            React.createElement(
                'h3',
                null,
                'Unselected toggle'
            ),
            React.createElement(Toggle, { label: 'My awsome toggle', value: false }),
            React.createElement(
                'h3',
                null,
                'Without label'
            ),
            React.createElement(Toggle, { value: true }),
            React.createElement(
                'h3',
                null,
                'Get Toggle value'
            ),
            React.createElement(
                'div',
                { style: { float: 'left', width: '300px' } },
                React.createElement(Toggle, { label: 'My awsome toggle', ref: 'toggleTestGetValue', value: true })
            ),
            React.createElement(
                'div',
                { style: { marginLeft: '300px' } },
                React.createElement(
                    'button',
                    { onClick: this.handleGetValueClick },
                    'Get the toggle value'
                )
            )
        );
    };

    return InputToggleSample;
})(Component);

return React.createElement(InputToggleSample, null);

/**
* Handle click action to get check value.
*/