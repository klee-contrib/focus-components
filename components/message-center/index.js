'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _capitalize = require('lodash/string/capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _builtInStore = require('focus-core/message/built-in-store');

var _builtInStore2 = _interopRequireDefault(_builtInStore);

var _translation = require('focus-core/translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var defaultProps = {
    ttlError: 8000,
    ttlInfo: 3000,
    ttlSuccess: 3000,
    ttlWarning: 3000
};

var propTypes = {
    ttlError: _react.PropTypes.number.isRequired,
    ttlInfo: _react.PropTypes.number.isRequired,
    ttlSuccess: _react.PropTypes.number.isRequired,
    ttlWarning: _react.PropTypes.number.isRequired
};

var CONSTANT = {
    ANIMATION_LENGTH: 250
};

var MessageCenter = function (_Component) {
    _inherits(MessageCenter, _Component);

    function MessageCenter(props) {
        _classCallCheck(this, MessageCenter);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.cleanupTimeout = null;
        _this.currentNotification = null;
        _this.queuedNotifications = [];

        _this._checkQueue = function () {
            if (_this.queuedNotifications.length > 0) {
                _this.showSnackbar(_this.queuedNotifications.shift());
            }
        };

        _this._forceCleanup = function () {
            clearTimeout(_this.cleanupTimeout);
            _this._cleanup();
        };

        _this._cleanup = function () {
            _this.cleanupTimeout = null;
            _this.setState({ active: false });
            setTimeout(function () {
                _this._checkQueue();
            }, CONSTANT.ANIMATION_LENGTH);
        };

        _this._handlePushMessage = function (messageId) {
            var message = _builtInStore2.default.getMessage(messageId);
            var content = message.content,
                action = message.action,
                type = message.type;

            var ttl = _this.props['ttl' + (0, _capitalize2.default)(type)];
            var notificationData = {
                type: type,
                message: content,
                timeout: ttl
            };
            if (action) {
                notificationData['actionText'] = action.text;
                notificationData['actionHandler'] = action.handler;
            }
            _this.showSnackbar(notificationData);
        };

        _this.showSnackbar = function (data) {
            if (data === undefined) {
                throw new Error('Please provide a data object with at least a message to display.');
            }
            if (data['message'] === undefined) {
                throw new Error('Please provide a message to be displayed.');
            }
            if (data['actionHandler'] && !data['actionText']) {
                throw new Error('Please provide action text with the handler.');
            }
            var active = _this.state.active;

            if (active) {
                _this.queuedNotifications.push(data);
            } else {
                _this.currentNotification = data;
                _this.setState({ active: true });
                _this.cleanupTimeout = setTimeout(_this._cleanup, data.timeout);
            }
        };

        _this.state = { active: false };
        return _this;
    }

    /** @inheriteddoc */
    MessageCenter.prototype.componentWillMount = function componentWillMount() {
        _builtInStore2.default.addPushedMessageListener(this._handlePushMessage);
    };

    /** @inheriteddoc */
    MessageCenter.prototype.componentWillUnmount = function componentWillUnmount() {
        _builtInStore2.default.removePushedMessageListener(this._handlePushMessage);
    };

    /**
    * Check if the queue has items within it.
    * If it does, display the next entry.
    *
    * @private
    */


    /**
    * Remove cleanupTimeout
    * @return {[type]} [description]
    */


    /**
    * Cleanup the snackbar event listeners and accessiblity attributes.
    *
    * @private
    */


    /**
    * Push a new message into snackbar.
    * @type {number} message id.
    */


    /** @inheritDoc */
    MessageCenter.prototype.render = function render() {
        var active = this.state.active;

        var notification = this.currentNotification || {};
        var actionText = notification.actionText,
            actionHandler = notification.actionHandler,
            message = notification.message,
            type = notification.type;

        var classNames = 'mdl-snackbar ' + (active ? 'mdl-snackbar--active' : '');
        var otherProps = { 'aria-hidden': active, 'aria-live': 'assertive', 'aria-atomic': 'true', 'aria-relevant': 'text' };
        return _react2.default.createElement(
            'div',
            _extends({ 'data-focus': 'snackbar-message-center', 'data-message-type': type, className: classNames }, otherProps),
            _react2.default.createElement(
                'div',
                { className: 'mdl-snackbar__text' },
                (0, _translation.translate)(message)
            ),
            actionText && _react2.default.createElement(
                'button',
                { className: 'mdl-snackbar__action', type: 'button', onClick: actionHandler },
                (0, _translation.translate)(actionText)
            ),
            _react2.default.createElement(
                'button',
                { className: 'mdl-snackbar__close', type: 'button', onClick: this._forceCleanup },
                _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'clear'
                )
            )
        );
    };

    /**
    * Show the snackbar.
    *
    * @param {Object} data The data for the notification.
    * @public
    */


    return MessageCenter;
}(_react.Component);

;

//Static props.
MessageCenter.displayName = 'MessageCenter';
MessageCenter.defaultProps = defaultProps;
MessageCenter.propTypes = propTypes;

exports.default = MessageCenter;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJ0dGxFcnJvciIsInR0bEluZm8iLCJ0dGxTdWNjZXNzIiwidHRsV2FybmluZyIsInByb3BUeXBlcyIsIm51bWJlciIsImlzUmVxdWlyZWQiLCJDT05TVEFOVCIsIkFOSU1BVElPTl9MRU5HVEgiLCJNZXNzYWdlQ2VudGVyIiwicHJvcHMiLCJjbGVhbnVwVGltZW91dCIsImN1cnJlbnROb3RpZmljYXRpb24iLCJxdWV1ZWROb3RpZmljYXRpb25zIiwiX2NoZWNrUXVldWUiLCJsZW5ndGgiLCJzaG93U25hY2tiYXIiLCJzaGlmdCIsIl9mb3JjZUNsZWFudXAiLCJjbGVhclRpbWVvdXQiLCJfY2xlYW51cCIsInNldFN0YXRlIiwiYWN0aXZlIiwic2V0VGltZW91dCIsIl9oYW5kbGVQdXNoTWVzc2FnZSIsIm1lc3NhZ2UiLCJnZXRNZXNzYWdlIiwibWVzc2FnZUlkIiwiY29udGVudCIsImFjdGlvbiIsInR5cGUiLCJ0dGwiLCJub3RpZmljYXRpb25EYXRhIiwidGltZW91dCIsInRleHQiLCJoYW5kbGVyIiwiZGF0YSIsInVuZGVmaW5lZCIsIkVycm9yIiwic3RhdGUiLCJwdXNoIiwiY29tcG9uZW50V2lsbE1vdW50IiwiYWRkUHVzaGVkTWVzc2FnZUxpc3RlbmVyIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVQdXNoZWRNZXNzYWdlTGlzdGVuZXIiLCJyZW5kZXIiLCJub3RpZmljYXRpb24iLCJhY3Rpb25UZXh0IiwiYWN0aW9uSGFuZGxlciIsImNsYXNzTmFtZXMiLCJvdGhlclByb3BzIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGVBQWU7QUFDakJDLGNBQVUsSUFETztBQUVqQkMsYUFBUyxJQUZRO0FBR2pCQyxnQkFBWSxJQUhLO0FBSWpC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SjtBQUVLc0IsMEJBQ0c7QUFBQTtBQUFBLGtCQUFRLFdBQVUsc0JBQWxCLEVBQXlDLE1BQUssUUFBOUMsRUFBdUQsU0FBU0MsYUFBaEU7QUFBZ0YsNENBQVVELFVBQVY7QUFBaEYsYUFIUjtBQUtJO0FBQUE7QUFBQSxrQkFBUSxXQUFVLHFCQUFsQixFQUF3QyxNQUFLLFFBQTdDLEVBQXNELFNBQVMsS0FBSzdCLGFBQXBFO0FBQW1GO0FBQUE7QUFBQSxzQkFBRyxXQUFVLGdCQUFiO0FBQUE7QUFBQTtBQUFuRjtBQUxKLFNBREo7QUFTSCxLOztBQUVEOzs7Ozs7Ozs7OztBQTBCSDs7QUFFRDtBQUNBVCxjQUFjMEMsV0FBZCxHQUE0QixlQUE1QjtBQUNBMUMsY0FBY1YsWUFBZCxHQUE2QkEsWUFBN0I7QUFDQVUsY0FBY0wsU0FBZCxHQUEwQkEsU0FBMUI7O2tCQUVlSyxhIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjYXBpdGFsaXplIGZyb20gJ2xvZGFzaC9zdHJpbmcvY2FwaXRhbGl6ZSc7XHJcbmltcG9ydCBtZXNzYWdlU3RvcmUgZnJvbSAnZm9jdXMtY29yZS9tZXNzYWdlL2J1aWx0LWluLXN0b3JlJztcclxuaW1wb3J0IHt0cmFuc2xhdGV9IGZyb20gJ2ZvY3VzLWNvcmUvdHJhbnNsYXRpb24nO1xyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdHRsRXJyb3I6IDgwMDAsXHJcbiAgICB0dGxJbmZvOiAzMDAwLFxyXG4gICAgdHRsU3VjY2VzczogMzAwMCxcclxuICAgIHR0bFdhcm5pbmc6IDMwMDBcclxufTtcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIHR0bEVycm9yOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICB0dGxJbmZvOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICB0dGxTdWNjZXNzOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICB0dGxXYXJuaW5nOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcclxufTtcclxuXHJcbmNvbnN0IENPTlNUQU5UID0ge1xyXG4gICAgQU5JTUFUSU9OX0xFTkdUSDogMjUwXHJcbn07XHJcblxyXG5jbGFzcyBNZXNzYWdlQ2VudGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBjbGVhbnVwVGltZW91dCA9IG51bGw7XHJcbiAgICBjdXJyZW50Tm90aWZpY2F0aW9uID0gbnVsbDtcclxuICAgIHF1ZXVlZE5vdGlmaWNhdGlvbnMgPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0geyBhY3RpdmU6IGZhbHNlIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBAaW5oZXJpdGVkZG9jICovXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgbWVzc2FnZVN0b3JlLmFkZFB1c2hlZE1lc3NhZ2VMaXN0ZW5lcih0aGlzLl9oYW5kbGVQdXNoTWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIEBpbmhlcml0ZWRkb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIG1lc3NhZ2VTdG9yZS5yZW1vdmVQdXNoZWRNZXNzYWdlTGlzdGVuZXIodGhpcy5faGFuZGxlUHVzaE1lc3NhZ2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogQ2hlY2sgaWYgdGhlIHF1ZXVlIGhhcyBpdGVtcyB3aXRoaW4gaXQuXHJcbiAgICAqIElmIGl0IGRvZXMsIGRpc3BsYXkgdGhlIG5leHQgZW50cnkuXHJcbiAgICAqXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgX2NoZWNrUXVldWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMucXVldWVkTm90aWZpY2F0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1NuYWNrYmFyKHRoaXMucXVldWVkTm90aWZpY2F0aW9ucy5zaGlmdCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW1vdmUgY2xlYW51cFRpbWVvdXRcclxuICAgICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXHJcbiAgICAqL1xyXG4gICAgX2ZvcmNlQ2xlYW51cCA9ICgpID0+IHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5jbGVhbnVwVGltZW91dCk7XHJcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogQ2xlYW51cCB0aGUgc25hY2tiYXIgZXZlbnQgbGlzdGVuZXJzIGFuZCBhY2Nlc3NpYmxpdHkgYXR0cmlidXRlcy5cclxuICAgICpcclxuICAgICogQHByaXZhdGVcclxuICAgICovXHJcbiAgICBfY2xlYW51cCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLmNsZWFudXBUaW1lb3V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYWN0aXZlOiBmYWxzZSB9KTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY2hlY2tRdWV1ZSgpO1xyXG4gICAgICAgIH0sIENPTlNUQU5ULkFOSU1BVElPTl9MRU5HVEgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogUHVzaCBhIG5ldyBtZXNzYWdlIGludG8gc25hY2tiYXIuXHJcbiAgICAqIEB0eXBlIHtudW1iZXJ9IG1lc3NhZ2UgaWQuXHJcbiAgICAqL1xyXG4gICAgX2hhbmRsZVB1c2hNZXNzYWdlID0gbWVzc2FnZUlkID0+IHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gbWVzc2FnZVN0b3JlLmdldE1lc3NhZ2UobWVzc2FnZUlkKTtcclxuICAgICAgICBjb25zdCB7Y29udGVudCwgYWN0aW9uLCB0eXBlfSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgY29uc3QgdHRsID0gdGhpcy5wcm9wc1tgdHRsJHtjYXBpdGFsaXplKHR5cGUpfWBdO1xyXG4gICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbkRhdGEgPSB7XHJcbiAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgIHRpbWVvdXQ6IHR0bFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbkRhdGFbJ2FjdGlvblRleHQnXSA9IGFjdGlvbi50ZXh0O1xyXG4gICAgICAgICAgICBub3RpZmljYXRpb25EYXRhWydhY3Rpb25IYW5kbGVyJ10gPSBhY3Rpb24uaGFuZGxlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93U25hY2tiYXIobm90aWZpY2F0aW9uRGF0YSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYWN0aXZlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uID0gdGhpcy5jdXJyZW50Tm90aWZpY2F0aW9uIHx8IHt9O1xyXG4gICAgICAgIGNvbnN0IHsgYWN0aW9uVGV4dCwgYWN0aW9uSGFuZGxlciwgbWVzc2FnZSwgdHlwZSB9ID0gbm90aWZpY2F0aW9uO1xyXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBgbWRsLXNuYWNrYmFyICR7YWN0aXZlID8gJ21kbC1zbmFja2Jhci0tYWN0aXZlJyA6ICAnJ31gO1xyXG4gICAgICAgIGNvbnN0IG90aGVyUHJvcHMgPSB7ICdhcmlhLWhpZGRlbic6IGFjdGl2ZSwgJ2FyaWEtbGl2ZSc6J2Fzc2VydGl2ZScsICdhcmlhLWF0b21pYyc6J3RydWUnLCAnYXJpYS1yZWxldmFudCc6ICd0ZXh0JyB9O1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nc25hY2tiYXItbWVzc2FnZS1jZW50ZXInIGRhdGEtbWVzc2FnZS10eXBlPXt0eXBlfSBjbGFzc05hbWU9e2NsYXNzTmFtZXN9IHsuLi5vdGhlclByb3BzfT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtZGwtc25hY2tiYXJfX3RleHQnPnt0cmFuc2xhdGUobWVzc2FnZSl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7YWN0aW9uVGV4dCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdtZGwtc25hY2tiYXJfX2FjdGlvbicgdHlwZT0nYnV0dG9uJyBvbkNsaWNrPXthY3Rpb25IYW5kbGVyfT57dHJhbnNsYXRlKGFjdGlvblRleHQpfTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J21kbC1zbmFja2Jhcl9fY2xvc2UnIHR5cGU9J2J1dHRvbicgb25DbGljaz17dGhpcy5fZm9yY2VDbGVhbnVwfT48aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJz5jbGVhcjwvaT48L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFNob3cgdGhlIHNuYWNrYmFyLlxyXG4gICAgKlxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBUaGUgZGF0YSBmb3IgdGhlIG5vdGlmaWNhdGlvbi5cclxuICAgICogQHB1YmxpY1xyXG4gICAgKi9cclxuICAgIHNob3dTbmFja2JhciA9IGRhdGEgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgcHJvdmlkZSBhIGRhdGEgb2JqZWN0IHdpdGggYXQgbGVhc3QgYSBtZXNzYWdlIHRvIGRpc3BsYXkuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhWydtZXNzYWdlJ10gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGEgbWVzc2FnZSB0byBiZSBkaXNwbGF5ZWQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhWydhY3Rpb25IYW5kbGVyJ10gJiYgIWRhdGFbJ2FjdGlvblRleHQnXSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBwcm92aWRlIGFjdGlvbiB0ZXh0IHdpdGggdGhlIGhhbmRsZXIuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHthY3RpdmV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZiAoYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucXVldWVkTm90aWZpY2F0aW9ucy5wdXNoKGRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE5vdGlmaWNhdGlvbiA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhY3RpdmU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cFRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMuX2NsZWFudXAsIGRhdGEudGltZW91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn07XHJcblxyXG4vL1N0YXRpYyBwcm9wcy5cclxuTWVzc2FnZUNlbnRlci5kaXNwbGF5TmFtZSA9ICdNZXNzYWdlQ2VudGVyJztcclxuTWVzc2FnZUNlbnRlci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbk1lc3NhZ2VDZW50ZXIucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZUNlbnRlcjtcclxuIl19