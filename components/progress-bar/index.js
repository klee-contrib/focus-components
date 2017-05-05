'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _class; // Dependencies


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _material = require('../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ProgressBar = (_dec = (0, _material2.default)('bar'), _dec(_class = function (_Component) {
    _inherits(ProgressBar, _Component);

    function ProgressBar() {
        _classCallCheck(this, ProgressBar);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ProgressBar.prototype.componentDidMount = function componentDidMount() {
        var completed = this.props.completed;

        var bar = _reactDom2.default.findDOMNode(this.refs.bar);
        if (bar) {
            bar.MaterialProgress.setProgress(completed);
            bar.MaterialProgress.setBuffer(100);
        }
    };

    ProgressBar.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
        var completed = _ref.completed;

        if (0 > completed) {
            completed = 0;
        }
        if (100 < completed) {
            completed = 100;
        }
        var bar = _reactDom2.default.findDOMNode(this.refs.bar);
        if (bar) {
            bar.MaterialProgress.setProgress(completed);
            bar.MaterialProgress.setBuffer(100);
        }
    };

    ProgressBar.prototype._renderClassName = function _renderClassName() {
        var indeterminated = this.props.indeterminated;


        if (indeterminated) {
            return 'mdl-progress mdl-js-progress mdl-progress__indeterminate';
        } else {
            return 'mdl-progress mdl-js-progress';
        }
    };

    ProgressBar.prototype.render = function render() {
        var completed = +this.props.completed;
        if (0 > completed) {
            completed = 0;
        }
        if (100 < completed) {
            completed = 100;
        }
        return _react2.default.createElement('div', { className: this._renderClassName(), 'data-focus': 'progress-bar', ref: 'bar' });
    };

    return ProgressBar;
}(_react.Component)) || _class);
ProgressBar.propTypes = {
    completed: _react.PropTypes.number,
    indeterminated: _react.PropTypes.bool
};
ProgressBar.defaultProps = {
    completed: 0,
    indetermindated: false
};


ProgressBar.displayName = 'ProgressBar';

exports.default = ProgressBar;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJQcm9ncmVzc0JhciIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcGxldGVkIiwicHJvcHMiLCJiYXIiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJNYXRlcmlhbFByb2dyZXNzIiwic2V0UHJvZ3Jlc3MiLCJzZXRCdWZmZXIiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwiX3JlbmRlckNsYXNzTmFtZSIsImluZGV0ZXJtaW5hdGVkIiwicmVuZGVyIiwicHJvcFR5cGVzIiwibnVtYmVyIiwiYm9vbCIsImRlZmF1bHRQcm9wcyIsImluZGV0ZXJtaW5kYXRlZCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBQUE7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFHTUEsVyxXQURMLHdCQUFhLEtBQWIsQzs7Ozs7Ozs7OzBCQWFHQyxpQixnQ0FBb0I7QUFBQSxZQUNUQyxTQURTLEdBQ0ksS0FBS0MsS0FEVCxDQUNURCxTQURTOztBQUVoQixZQUFNRSxNQUFNLG1CQUFTQyxXQUFULENBQXFCLEtBQUtDLElBQUwsQ0FBVUYsR0FBL0IsQ0FBWjtBQUNBLFlBQUlBLEdBQUosRUFBUztBQUNMQSxnQkFBSUcsZ0JBQUosQ0FBcUJDLFdBQXJCLENBQWlDTixTQUFqQztBQUNBRSxnQkFBSUcsZ0JBQUosQ0FBcUJFLFNBQXJCLENBQStCLEdBQS9CO0FBQ0g7QUFDSixLOzswQkFFREMseUIsNENBQXVDO0FBQUEsWUFBWlIsU0FBWSxRQUFaQSxTQUFZOztBQUNuQyxZQUFJLElBQUlBLFNBQVIsRUFBbUI7QUFDZkEsd0JBQVksQ0FBWjtBQUNIO0FBQ0QsWUFBSSxNQUFNQSxTQUFWLEVBQXFCO0FBQ2pCQSx3QkFBWSxHQUFaO0FBQ0g7QUFDRCxZQUFNRSxNQUFNLG1CQUFTQyxXQUFULENBQXFCLEtBQUtDLElBQUwsQ0FBVUYsR0FBL0IsQ0FBWjtBQUNBLFlBQUlBLEdBQUosRUFBUztBQUNMQSxnQkFBSUcsZ0JBQUosQ0FBcUJDLFdBQXJCLENBQWlDTixTQUFqQztBQUNBRSxnQkFBSUcsZ0JBQUosQ0FBcUJFLFNBQXJCLENBQStCLEdBQS9CO0FBQ0g7QUFDSixLOzswQkFFREUsZ0IsK0JBQW1CO0FBQUEsWUFDUkMsY0FEUSxHQUNVLEtBQUtULEtBRGYsQ0FDUlMsY0FEUTs7O0FBR2YsWUFBR0EsY0FBSCxFQUFtQjtBQUNmLG1CQUFPLDBEQUFQO0FBQ0gsU0FGRCxNQUdLO0FBQ0QsbUJBQU8sOEJBQVA7QUFDSDtBQUNKLEs7OzBCQUVEQyxNLHFCQUFTO0FBQ0wsWUFBSVgsWUFBWSxDQUFDLEtBQUtDLEtBQUwsQ0FBV0QsU0FBNUI7QUFDQSxZQUFJLElBQUlBLFNBQVIsRUFBbUI7QUFDZkEsd0JBQVksQ0FBWjtBQUNIO0FBQ0QsWUFBSSxNQUFNQSxTQUFWLEVBQXFCO0FBQ2pCQSx3QkFBWSxHQUFaO0FBQ0g7QUFDRCxlQUNJLHVDQUFLLFdBQVcsS0FBS1MsZ0JBQUwsRUFBaEIsRUFBeUMsY0FBVyxjQUFwRCxFQUFtRSxLQUFJLEtBQXZFLEdBREo7QUFHSCxLOzs7O0FBekRDWCxXLENBRUtjLFMsR0FBWTtBQUNmWixlQUFXLGlCQUFVYSxNQUROO0FBRWZILG9CQUFnQixpQkFBVUk7QUFGWCxDO0FBRmpCaEIsVyxDQU9LaUIsWSxHQUFlO0FBQ2xCZixlQUFXLENBRE87QUFFbEJnQixxQkFBaUI7QUFGQyxDOzs7QUFxRDFCbEIsWUFBWW1CLFdBQVosR0FBMEIsYUFBMUI7O2tCQUVlbkIsVyIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXBlbmRlbmNpZXNcclxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBtZGxCZWhhdmlvdXIgZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcblxyXG5AbWRsQmVoYXZpb3VyKCdiYXInKVxyXG5jbGFzcyBQcm9ncmVzc0JhciBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgICAgICBjb21wbGV0ZWQ6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgaW5kZXRlcm1pbmF0ZWQ6IFByb3BUeXBlcy5ib29sXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgY29tcGxldGVkOiAwLFxyXG4gICAgICAgIGluZGV0ZXJtaW5kYXRlZDogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgY29uc3Qge2NvbXBsZXRlZH0gPSB0aGlzLnByb3BzXHJcbiAgICAgICAgY29uc3QgYmFyID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmJhcik7XHJcbiAgICAgICAgaWYgKGJhcikge1xyXG4gICAgICAgICAgICBiYXIuTWF0ZXJpYWxQcm9ncmVzcy5zZXRQcm9ncmVzcyhjb21wbGV0ZWQpO1xyXG4gICAgICAgICAgICBiYXIuTWF0ZXJpYWxQcm9ncmVzcy5zZXRCdWZmZXIoMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh7Y29tcGxldGVkfSkge1xyXG4gICAgICAgIGlmICgwID4gY29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgIGNvbXBsZXRlZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgxMDAgPCBjb21wbGV0ZWQpIHtcclxuICAgICAgICAgICAgY29tcGxldGVkID0gMTAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBiYXIgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuYmFyKTtcclxuICAgICAgICBpZiAoYmFyKSB7XHJcbiAgICAgICAgICAgIGJhci5NYXRlcmlhbFByb2dyZXNzLnNldFByb2dyZXNzKGNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgIGJhci5NYXRlcmlhbFByb2dyZXNzLnNldEJ1ZmZlcigxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcmVuZGVyQ2xhc3NOYW1lKCkge1xyXG4gICAgICAgIGNvbnN0IHtpbmRldGVybWluYXRlZH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBpZihpbmRldGVybWluYXRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ21kbC1wcm9ncmVzcyBtZGwtanMtcHJvZ3Jlc3MgbWRsLXByb2dyZXNzX19pbmRldGVybWluYXRlJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICdtZGwtcHJvZ3Jlc3MgbWRsLWpzLXByb2dyZXNzJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGNvbXBsZXRlZCA9ICt0aGlzLnByb3BzLmNvbXBsZXRlZDtcclxuICAgICAgICBpZiAoMCA+IGNvbXBsZXRlZCkge1xyXG4gICAgICAgICAgICBjb21wbGV0ZWQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoMTAwIDwgY29tcGxldGVkKSB7XHJcbiAgICAgICAgICAgIGNvbXBsZXRlZCA9IDEwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuX3JlbmRlckNsYXNzTmFtZSgpfSBkYXRhLWZvY3VzPSdwcm9ncmVzcy1iYXInIHJlZj0nYmFyJyAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblByb2dyZXNzQmFyLmRpc3BsYXlOYW1lID0gJ1Byb2dyZXNzQmFyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzQmFyO1xyXG4iXX0=