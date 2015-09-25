// Components

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var InputDate = FocusComponents.components.input.Date;

var InputDateSample = (function (_React$Component) {
    _inherits(InputDateSample, _React$Component);

    function InputDateSample(props) {
        var _this = this;

        _classCallCheck(this, InputDateSample);

        _React$Component.call(this, props);

        this.changeHandler = function (id) {
            return function (value) {
                var _setState;

                var _refs$validate = _this.refs['date' + id].validate(value);

                var isValid = _refs$validate.isValid;
                var message = _refs$validate.message;

                _this.setState((_setState = {}, _setState['date' + id] = value, _setState['error' + id] = isValid ? null : message, _setState));
            };
        };

        this.render = function () {
            var _state = _this.state;
            var date1 = _state.date1;
            var error1 = _state.error1;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h3',
                    null,
                    'With value'
                ),
                React.createElement(InputDate, { error: error1, name: 'date1', onChange: _this.changeHandler(1), ref: 'date1', value: date1 })
            );
        };

        this.state = {
            date1: _moment2['default']().toISOString()
        };
    }

    return InputDateSample;
})(React.Component);

return React.createElement(InputDateSample, null);