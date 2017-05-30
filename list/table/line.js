'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mixin = undefined;

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _referenceProperty = require('../../common/mixin/reference-property');

var _referenceProperty2 = _interopRequireDefault(_referenceProperty);

var _definition = require('../../common/mixin/definition');

var _definition2 = _interopRequireDefault(_definition);

var _builtInComponents = require('../mixin/built-in-components');

var _builtInComponents2 = _interopRequireDefault(_builtInComponents);

var _i18n = require('../../common/i18n');

var _actionContextual = require('../action-contextual');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies

var lineMixin = {
    /**
     * React component name.
     */
    displayName: 'table-line',

    /**
     * Mixin dependancies.
     */
    mixins: [_i18n.mixin, _definition2.default, _referenceProperty2.default, _builtInComponents2.default],

    /**@inheritDoc**/
    getDefaultProps: function getDefaultProps() {
        return {};
    },


    /**@inheritDoc**/
    getInitialState: function getInitialState() {
        return {};
    },


    /**
     * line property validation.
     * @type {Object}
     */
    propTypes: {
        data: (0, _types2.default)('object'),
        saveAction: (0, _types2.default)('func'),
        deleteAction: (0, _types2.default)('func'),
        onLineClick: (0, _types2.default)('func'),
        onSelection: (0, _types2.default)('func'),
        operationList: (0, _types2.default)('array', true)
    },

    /**
     * Render line Actions.
     */
    renderLineActions: function renderLineActions() {
        if (this.props.operationList.length > 0) {
            return React.createElement(
                'div',
                { 'data-focus': 'table-line-actions' },
                React.createElement(_actionContextual.component, { operationList: this.props.operationList, operationParam: this.props.data })
            );
        }
    },
    _onLineClickHandler: function _onLineClickHandler(data) {
        var _this = this;

        return function () {
            _this.props.onLineClick(data);
        };
    },
    render: function render() {
        return this.renderLineContent(this.props.data);
    }
};

// Components

// Mixins

exports.mixin = lineMixin;
exports.default = {
    mixin: lineMixin
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJsaW5lTWl4aW4iLCJkaXNwbGF5TmFtZSIsIm1peGlucyIsImdldERlZmF1bHRQcm9wcyIsImdldEluaXRpYWxTdGF0ZSIsInByb3BUeXBlcyIsImRhdGEiLCJzYXZlQWN0aW9uIiwiZGVsZXRlQWN0aW9uIiwib25MaW5lQ2xpY2siLCJvblNlbGVjdGlvbiIsIm9wZXJhdGlvbkxpc3QiLCJyZW5kZXJMaW5lQWN0aW9ucyIsInByb3BzIiwibGVuZ3RoIiwiX29uTGluZUNsaWNrSGFuZGxlciIsInJlbmRlciIsInJlbmRlckxpbmVDb250ZW50IiwibWl4aW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7OztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUlBOzs7O0FBYkE7O0FBZUEsSUFBSUEsWUFBWTtBQUNaOzs7QUFHQUMsaUJBQWEsWUFKRDs7QUFNWjs7O0FBR0FDLFlBQVEsNkZBVEk7O0FBV1o7QUFDQUMsbUJBWlksNkJBWU07QUFDZCxlQUFPLEVBQVA7QUFDSCxLQWRXOzs7QUFnQlo7QUFDQUMsbUJBakJZLDZCQWlCTTtBQUNkLGVBQU8sRUFBUDtBQUNILEtBbkJXOzs7QUFxQlo7Ozs7QUFJQUMsZUFBVztBQUNQQyxjQUFNLHFCQUFLLFFBQUwsQ0FEQztBQUVQQyxvQkFBWSxxQkFBSyxNQUFMLENBRkw7QUFHUEMsc0JBQWMscUJBQUssTUFBTCxDQUhQO0FBSVBDLHFCQUFhLHFCQUFLLE1BQUwsQ0FKTjtBQUtQQyxxQkFBYSxxQkFBSyxNQUFMLENBTE47QUFNUEMsdUJBQWUscUJBQUssT0FBTCxFQUFjLElBQWQ7QUFOUixLQXpCQzs7QUFrQ1o7OztBQUdBQyxxQkFyQ1ksK0JBcUNRO0FBQ2hCLFlBQUksS0FBS0MsS0FBTCxDQUFXRixhQUFYLENBQXlCRyxNQUF6QixHQUFrQyxDQUF0QyxFQUF5QztBQUNyQyxtQkFDSTtBQUFBO0FBQUEsa0JBQUssY0FBVyxvQkFBaEI7QUFDSSxtRUFBbUIsZUFBZSxLQUFLRCxLQUFMLENBQVdGLGFBQTdDLEVBQTRELGdCQUFnQixLQUFLRSxLQUFMLENBQVdQLElBQXZGO0FBREosYUFESjtBQUtIO0FBQ0osS0E3Q1c7QUE4Q1pTLHVCQTlDWSwrQkE4Q1FULElBOUNSLEVBOENjO0FBQUE7O0FBQ3RCLGVBQU8sWUFBTTtBQUFDLGtCQUFLTyxLQUFMLENBQVdKLFdBQVgsQ0FBdUJILElBQXZCO0FBQStCLFNBQTdDO0FBQ0gsS0FoRFc7QUFpRFpVLFVBakRZLG9CQWlESDtBQUNMLGVBQU8sS0FBS0MsaUJBQUwsQ0FBdUIsS0FBS0osS0FBTCxDQUFXUCxJQUFsQyxDQUFQO0FBQ0g7QUFuRFcsQ0FBaEI7O0FBSkE7O0FBUEE7O1FBa0VpQlksSyxHQUFibEIsUztrQkFFVztBQUNYa0IsV0FBT2xCO0FBREksQyIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXBlbmRlbmNpZXNcclxuXHJcbmltcG9ydCB0eXBlIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuXHJcbi8vIE1peGluc1xyXG5cclxuaW1wb3J0IHJlZmVyZW5jZU1peGluIGZyb20gJy4uLy4uL2NvbW1vbi9taXhpbi9yZWZlcmVuY2UtcHJvcGVydHknO1xyXG5pbXBvcnQgZGVmaW5pdGlvbk1peGluIGZyb20gJy4uLy4uL2NvbW1vbi9taXhpbi9kZWZpbml0aW9uJztcclxuaW1wb3J0IGJ1aWx0SW5Db21wb25lbnRzTWl4aW4gZnJvbSAnLi4vbWl4aW4vYnVpbHQtaW4tY29tcG9uZW50cyc7XHJcbmltcG9ydCB7bWl4aW4gYXMgdHJhbnNsYXRpb25NaXhpbn0gZnJvbSAnLi4vLi4vY29tbW9uL2kxOG4nO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5cclxuaW1wb3J0IHtjb21wb25lbnQgYXMgQ29udGV4dHVhbEFjdGlvbnN9IGZyb20gJy4uL2FjdGlvbi1jb250ZXh0dWFsJztcclxuXHJcbmxldCBsaW5lTWl4aW4gPSB7XHJcbiAgICAvKipcclxuICAgICAqIFJlYWN0IGNvbXBvbmVudCBuYW1lLlxyXG4gICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ3RhYmxlLWxpbmUnLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWl4aW4gZGVwZW5kYW5jaWVzLlxyXG4gICAgICovXHJcbiAgICBtaXhpbnM6IFt0cmFuc2xhdGlvbk1peGluLCBkZWZpbml0aW9uTWl4aW4sIHJlZmVyZW5jZU1peGluLCBidWlsdEluQ29tcG9uZW50c01peGluXSxcclxuXHJcbiAgICAvKipAaW5oZXJpdERvYyoqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqQGluaGVyaXREb2MqKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbGluZSBwcm9wZXJ0eSB2YWxpZGF0aW9uLlxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgZGF0YTogdHlwZSgnb2JqZWN0JyksXHJcbiAgICAgICAgc2F2ZUFjdGlvbjogdHlwZSgnZnVuYycpLFxyXG4gICAgICAgIGRlbGV0ZUFjdGlvbjogdHlwZSgnZnVuYycpLFxyXG4gICAgICAgIG9uTGluZUNsaWNrOiB0eXBlKCdmdW5jJyksXHJcbiAgICAgICAgb25TZWxlY3Rpb246IHR5cGUoJ2Z1bmMnKSxcclxuICAgICAgICBvcGVyYXRpb25MaXN0OiB0eXBlKCdhcnJheScsIHRydWUpXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGxpbmUgQWN0aW9ucy5cclxuICAgICAqL1xyXG4gICAgcmVuZGVyTGluZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub3BlcmF0aW9uTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J3RhYmxlLWxpbmUtYWN0aW9ucyc+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbnRleHR1YWxBY3Rpb25zIG9wZXJhdGlvbkxpc3Q9e3RoaXMucHJvcHMub3BlcmF0aW9uTGlzdH0gb3BlcmF0aW9uUGFyYW09e3RoaXMucHJvcHMuZGF0YX0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF9vbkxpbmVDbGlja0hhbmRsZXIoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7dGhpcy5wcm9wcy5vbkxpbmVDbGljayhkYXRhKTsgfTtcclxuICAgIH0sXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTGluZUNvbnRlbnQodGhpcy5wcm9wcy5kYXRhKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBsaW5lTWl4aW4gYXMgbWl4aW5cclxufVxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBtaXhpbjogbGluZU1peGluXHJcbn0iXX0=