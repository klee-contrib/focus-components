'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _material = require('../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var LoadingStatus = (_dec = (0, _material2.default)('spinner'), _dec(_class = function (_Component) {
    _inherits(LoadingStatus, _Component);

    function LoadingStatus() {
        _classCallCheck(this, LoadingStatus);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    LoadingStatus.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            { 'data-focus': 'loading-status' },
            _react2.default.createElement('div', { ref: 'spinner', className: 'mdl-spinner mdl-js-spinner is-active' }),
            _react2.default.createElement(
                'div',
                { className: 'content' },
                'Loading'
            )
        );
    };

    return LoadingStatus;
}(_react.Component)) || _class);
exports.default = LoadingStatus;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJMb2FkaW5nU3RhdHVzIiwicmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBSU1BLGEsV0FETCx3QkFBa0IsU0FBbEIsQzs7Ozs7Ozs7OzRCQUVHQyxNLHFCQUFTO0FBQ0wsZUFDQTtBQUFBO0FBQUEsY0FBSyxjQUFXLGdCQUFoQjtBQUNFLG1EQUFLLEtBQUksU0FBVCxFQUFtQixXQUFVLHNDQUE3QixHQURGO0FBRUU7QUFBQTtBQUFBLGtCQUFLLFdBQVUsU0FBZjtBQUEwQjtBQUExQjtBQUZGLFNBREE7QUFNSCxLOzs7O2tCQUlVRCxhIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgTWF0ZXJpYWxCZWJhdmlvdXIgZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcblxyXG5cclxuQE1hdGVyaWFsQmViYXZpb3VyKCdzcGlubmVyJylcclxuY2xhc3MgTG9hZGluZ1N0YXR1cyBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2xvYWRpbmctc3RhdHVzJz5cclxuICAgICAgICAgIDxkaXYgcmVmPSdzcGlubmVyJyBjbGFzc05hbWU9XCJtZGwtc3Bpbm5lciBtZGwtanMtc3Bpbm5lciBpcy1hY3RpdmVcIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdjb250ZW50Jz57J0xvYWRpbmcnfTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvYWRpbmdTdGF0dXM7XHJcbiJdfQ==