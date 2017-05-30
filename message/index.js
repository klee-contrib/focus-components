'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _button = require('../components/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var i18nBehaviour = require('../common/i18n/mixin');


var messageMixin = {
    /** @inheritedDoc */
    getDefaultProps: function getDefaultProps() {
        return {
            type: 'info',
            style: {}
        };
    },


    /** @inheritedDoc */
    propTypes: {
        content: (0, _types2.default)('string'),
        style: (0, _types2.default)('object'),
        title: (0, _types2.default)('string'),
        ttl: (0, _types2.default)('number'),
        type: (0, _types2.default)('string')
    },

    /** @inheritedDoc */
    componentDidMount: function componentDidMount() {
        var _this = this;

        if (this.props.ttl) {
            setTimeout(function () {
                _this._handleTimeToLeave();
            }, this.props.ttl);
        }
    },


    /** @inheritedDoc */
    mixins: [i18nBehaviour],

    /**
    * Time to leave handler.
    */
    _handleTimeToLeave: function _handleTimeToLeave() {
        var _props = this.props,
            handleTimeToLeave = _props.handleTimeToLeave,
            id = _props.id;

        if (handleTimeToLeave) {
            handleTimeToLeave(id);
        }
    },


    /**
    * Handle click on the dismiss button.
    * @param {Event} event - Sanitize event.
    */
    _handleOnClick: function _handleOnClick(event) {
        var _props2 = this.props,
            handleOnClick = _props2.handleOnClick,
            id = _props2.id;

        if (handleOnClick) {
            handleOnClick(id);
        }
    },


    /**
    * Render an alert.
    * @return {JSX} The jsx.
    */
    render: function render() {
        var _props3 = this.props,
            type = _props3.type,
            id = _props3.id,
            content = _props3.content,
            title = _props3.title;

        return React.createElement(
            'div',
            { 'data-focus': 'message', 'data-id': id, 'data-message-type': type },
            React.createElement(_button2.default, { handleOnClick: this._handleOnClick, icon: 'clear', shape: 'icon', type: 'button' }),
            title && React.createElement(
                'h4',
                null,
                title
            ),
            React.createElement(
                'p',
                null,
                this.i18n(content)
            )
        );
    }
};
module.exports = (0, _builder2.default)(messageMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJpMThuQmVoYXZpb3VyIiwibWVzc2FnZU1peGluIiwiZ2V0RGVmYXVsdFByb3BzIiwidHlwZSIsInN0eWxlIiwicHJvcFR5cGVzIiwiY29udGVudCIsInRpdGxlIiwidHRsIiwiY29tcG9uZW50RGlkTW91bnQiLCJwcm9wcyIsInNldFRpbWVvdXQiLCJfaGFuZGxlVGltZVRvTGVhdmUiLCJtaXhpbnMiLCJoYW5kbGVUaW1lVG9MZWF2ZSIsImlkIiwiX2hhbmRsZU9uQ2xpY2siLCJldmVudCIsImhhbmRsZU9uQ2xpY2siLCJyZW5kZXIiLCJpMThuIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUpBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkOztBQUdBLElBQU1DLGdCQUFnQkQsUUFBUSxzQkFBUixDQUF0Qjs7O0FBR0EsSUFBTUUsZUFBZTtBQUNqQjtBQUNBQyxtQkFGaUIsNkJBRUM7QUFDZCxlQUFPO0FBQ0hDLGtCQUFNLE1BREg7QUFFSEMsbUJBQU87QUFGSixTQUFQO0FBSUgsS0FQZ0I7OztBQVNqQjtBQUNBQyxlQUFXO0FBQ1BDLGlCQUFTLHFCQUFNLFFBQU4sQ0FERjtBQUVQRixlQUFPLHFCQUFNLFFBQU4sQ0FGQTtBQUdQRyxlQUFPLHFCQUFNLFFBQU4sQ0FIQTtBQUlQQyxhQUFLLHFCQUFNLFFBQU4sQ0FKRTtBQUtQTCxjQUFNLHFCQUFNLFFBQU47QUFMQyxLQVZNOztBQWtCakI7QUFDQU0scUJBbkJpQiwrQkFtQkc7QUFBQTs7QUFDaEIsWUFBRyxLQUFLQyxLQUFMLENBQVdGLEdBQWQsRUFBbUI7QUFDZkcsdUJBQVcsWUFBTTtBQUNiLHNCQUFLQyxrQkFBTDtBQUNILGFBRkQsRUFFRyxLQUFLRixLQUFMLENBQVdGLEdBRmQ7QUFHSDtBQUNKLEtBekJnQjs7O0FBMkJqQjtBQUNBSyxZQUFRLENBQUNiLGFBQUQsQ0E1QlM7O0FBOEJqQjs7O0FBR0FZLHNCQWpDaUIsZ0NBaUNJO0FBQUEscUJBQ2EsS0FBS0YsS0FEbEI7QUFBQSxZQUNaSSxpQkFEWSxVQUNaQSxpQkFEWTtBQUFBLFlBQ09DLEVBRFAsVUFDT0EsRUFEUDs7QUFFakIsWUFBR0QsaUJBQUgsRUFBc0I7QUFDbEJBLDhCQUFrQkMsRUFBbEI7QUFDSDtBQUNKLEtBdENnQjs7O0FBd0NqQjs7OztBQUlBQyxrQkE1Q2lCLDBCQTRDRkMsS0E1Q0UsRUE0Q0s7QUFBQSxzQkFDUSxLQUFLUCxLQURiO0FBQUEsWUFDYlEsYUFEYSxXQUNiQSxhQURhO0FBQUEsWUFDRUgsRUFERixXQUNFQSxFQURGOztBQUVsQixZQUFHRyxhQUFILEVBQWtCO0FBQ2RBLDBCQUFjSCxFQUFkO0FBQ0g7QUFDSixLQWpEZ0I7OztBQW1EakI7Ozs7QUFJQUksVUF2RGlCLG9CQXVEUjtBQUFBLHNCQUM4QixLQUFLVCxLQURuQztBQUFBLFlBQ0VQLElBREYsV0FDRUEsSUFERjtBQUFBLFlBQ1FZLEVBRFIsV0FDUUEsRUFEUjtBQUFBLFlBQ1lULE9BRFosV0FDWUEsT0FEWjtBQUFBLFlBQ3FCQyxLQURyQixXQUNxQkEsS0FEckI7O0FBRUwsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFXLFNBQWhCLEVBQTBCLFdBQVNRLEVBQW5DLEVBQXVDLHFCQUFtQlosSUFBMUQ7QUFDSSxvREFBUSxlQUFlLEtBQUthLGNBQTVCLEVBQTRDLE1BQUssT0FBakQsRUFBeUQsT0FBTSxNQUEvRCxFQUFzRSxNQUFLLFFBQTNFLEdBREo7QUFFS1QscUJBQVM7QUFBQTtBQUFBO0FBQUtBO0FBQUwsYUFGZDtBQUdJO0FBQUE7QUFBQTtBQUFJLHFCQUFLYSxJQUFMLENBQVVkLE9BQVY7QUFBSjtBQUhKLFNBREo7QUFPSDtBQWhFZ0IsQ0FBckI7QUFrRUFlLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVFyQixZQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmNvbnN0IGkxOG5CZWhhdmlvdXIgPSByZXF1aXJlKCcuLi9jb21tb24vaTE4bi9taXhpbicpO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uL2NvbXBvbmVudHMvYnV0dG9uJztcclxuXHJcbmNvbnN0IG1lc3NhZ2VNaXhpbiA9IHtcclxuICAgIC8qKiBAaW5oZXJpdGVkRG9jICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ2luZm8nLFxyXG4gICAgICAgICAgICBzdHlsZTrCoHt9XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZWREb2MgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIGNvbnRlbnQ6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICBzdHlsZTogdHlwZXMoJ29iamVjdCcpLFxyXG4gICAgICAgIHRpdGxlOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgdHRsOiB0eXBlcygnbnVtYmVyJyksXHJcbiAgICAgICAgdHlwZTogdHlwZXMoJ3N0cmluZycpXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGVkRG9jICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBpZih0aGlzLnByb3BzLnR0bCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZVRpbWVUb0xlYXZlKCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMucHJvcHMudHRsKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGVkRG9jICovXHJcbiAgICBtaXhpbnM6IFtpMThuQmVoYXZpb3VyXSxcclxuXHJcbiAgICAvKipcclxuICAgICogVGltZSB0byBsZWF2ZSBoYW5kbGVyLlxyXG4gICAgKi9cclxuICAgIF9oYW5kbGVUaW1lVG9MZWF2ZSgpIHtcclxuICAgICAgICBsZXQge2hhbmRsZVRpbWVUb0xlYXZlLCBpZH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmKGhhbmRsZVRpbWVUb0xlYXZlKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZVRpbWVUb0xlYXZlKGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBIYW5kbGUgY2xpY2sgb24gdGhlIGRpc21pc3MgYnV0dG9uLlxyXG4gICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIFNhbml0aXplIGV2ZW50LlxyXG4gICAgKi9cclxuICAgIF9oYW5kbGVPbkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHtoYW5kbGVPbkNsaWNrLCBpZH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmKGhhbmRsZU9uQ2xpY2spIHtcclxuICAgICAgICAgICAgaGFuZGxlT25DbGljayhpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIGFuIGFsZXJ0LlxyXG4gICAgKiBAcmV0dXJuIHtKU1h9IFRoZSBqc3guXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHt0eXBlLCBpZCwgY29udGVudCwgdGl0bGV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J21lc3NhZ2UnIGRhdGEtaWQ9e2lkfSBkYXRhLW1lc3NhZ2UtdHlwZT17dHlwZX0+XHJcbiAgICAgICAgICAgICAgICA8QnV0dG9uIGhhbmRsZU9uQ2xpY2s9e3RoaXMuX2hhbmRsZU9uQ2xpY2t9IGljb249J2NsZWFyJyBzaGFwZT0naWNvbicgdHlwZT0nYnV0dG9uJy8+XHJcbiAgICAgICAgICAgICAgICB7dGl0bGUgJiYgPGg0Pnt0aXRsZX08L2g0Pn1cclxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLmkxOG4oY29udGVudCl9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIobWVzc2FnZU1peGluKTtcclxuIl19