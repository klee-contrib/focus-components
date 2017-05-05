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

var _actionContextual = require('../action-contextual');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Mixins

var lineMixin = {
    /**
     * React component name.
     */
    displayName: 'table-line',

    /**
     * Mixin dependancies.
     */
    mixins: [_definition2.default, _referenceProperty2.default, _builtInComponents2.default],

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

// Dependencies

exports.mixin = lineMixin;
exports.default = {
    mixin: lineMixin
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJsaW5lTWl4aW4iLCJkaXNwbGF5TmFtZSIsIm1peGlucyIsImdldERlZmF1bHRQcm9wcyIsImdldEluaXRpYWxTdGF0ZSIsInByb3BUeXBlcyIsImRhdGEiLCJzYXZlQWN0aW9uIiwiZGVsZXRlQWN0aW9uIiwib25MaW5lQ2xpY2siLCJvblNlbGVjdGlvbiIsIm9wZXJhdGlvbkxpc3QiLCJyZW5kZXJMaW5lQWN0aW9ucyIsInByb3BzIiwibGVuZ3RoIiwiX29uTGluZUNsaWNrSGFuZGxlciIsInJlbmRlciIsInJlbmRlckxpbmVDb250ZW50IiwibWl4aW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7OztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUlBOzs7O0FBUkE7O0FBVUEsSUFBSUEsWUFBWTtBQUNaOzs7QUFHQUMsaUJBQWEsWUFKRDs7QUFNWjs7O0FBR0FDLFlBQVEsZ0ZBVEk7O0FBV1o7QUFDQUMsbUJBWlksNkJBWU07QUFDZCxlQUFPLEVBQVA7QUFDSCxLQWRXOzs7QUFnQlo7QUFDQUMsbUJBakJZLDZCQWlCTTtBQUNkLGVBQU8sRUFBUDtBQUNILEtBbkJXOzs7QUFxQlo7Ozs7QUFJQUMsZUFBVztBQUNQQyxjQUFNLHFCQUFLLFFBQUwsQ0FEQztBQUVQQyxvQkFBWSxxQkFBSyxNQUFMLENBRkw7QUFHUEMsc0JBQWMscUJBQUssTUFBTCxDQUhQO0FBSVBDLHFCQUFhLHFCQUFLLE1BQUwsQ0FKTjtBQUtQQyxxQkFBYSxxQkFBSyxNQUFMLENBTE47QUFNUEMsdUJBQWUscUJBQUssT0FBTCxFQUFjLElBQWQ7QUFOUixLQXpCQzs7QUFrQ1o7OztBQUdBQyxxQkFyQ1ksK0JBcUNRO0FBQ2hCLFlBQUksS0FBS0MsS0FBTCxDQUFXRixhQUFYLENBQXlCRyxNQUF6QixHQUFrQyxDQUF0QyxFQUF5QztBQUNyQyxtQkFDSTtBQUFBO0FBQUEsa0JBQUssY0FBVyxvQkFBaEI7QUFDSSxtRUFBbUIsZUFBZSxLQUFLRCxLQUFMLENBQVdGLGFBQTdDLEVBQTRELGdCQUFnQixLQUFLRSxLQUFMLENBQVdQLElBQXZGO0FBREosYUFESjtBQUtIO0FBQ0osS0E3Q1c7QUE4Q1pTLHVCQTlDWSwrQkE4Q1FULElBOUNSLEVBOENjO0FBQUE7O0FBQ3RCLGVBQU8sWUFBTTtBQUFDLGtCQUFLTyxLQUFMLENBQVdKLFdBQVgsQ0FBdUJILElBQXZCO0FBQStCLFNBQTdDO0FBQ0gsS0FoRFc7QUFpRFpVLFVBakRZLG9CQWlESDtBQUNMLGVBQU8sS0FBS0MsaUJBQUwsQ0FBdUIsS0FBS0osS0FBTCxDQUFXUCxJQUFsQyxDQUFQO0FBQ0g7QUFuRFcsQ0FBaEI7O0FBSkE7O0FBVkE7O1FBcUVpQlksSyxHQUFibEIsUztrQkFFVztBQUNYa0IsV0FBT2xCO0FBREksQyIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXBlbmRlbmNpZXNcclxuXHJcbmltcG9ydCB0eXBlIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuXHJcbi8vIE1peGluc1xyXG5cclxuaW1wb3J0IHJlZmVyZW5jZU1peGluIGZyb20gJy4uLy4uL2NvbW1vbi9taXhpbi9yZWZlcmVuY2UtcHJvcGVydHknO1xyXG5pbXBvcnQgZGVmaW5pdGlvbk1peGluIGZyb20gJy4uLy4uL2NvbW1vbi9taXhpbi9kZWZpbml0aW9uJztcclxuaW1wb3J0IGJ1aWx0SW5Db21wb25lbnRzTWl4aW4gZnJvbSAnLi4vbWl4aW4vYnVpbHQtaW4tY29tcG9uZW50cyc7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcblxyXG5pbXBvcnQge2NvbXBvbmVudCBhcyBDb250ZXh0dWFsQWN0aW9uc30gZnJvbSAnLi4vYWN0aW9uLWNvbnRleHR1YWwnO1xyXG5cclxubGV0IGxpbmVNaXhpbiA9IHtcclxuICAgIC8qKlxyXG4gICAgICogUmVhY3QgY29tcG9uZW50IG5hbWUuXHJcbiAgICAgKi9cclxuICAgIGRpc3BsYXlOYW1lOiAndGFibGUtbGluZScsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNaXhpbiBkZXBlbmRhbmNpZXMuXHJcbiAgICAgKi9cclxuICAgIG1peGluczogW2RlZmluaXRpb25NaXhpbiwgcmVmZXJlbmNlTWl4aW4sIGJ1aWx0SW5Db21wb25lbnRzTWl4aW5dLFxyXG5cclxuICAgIC8qKkBpbmhlcml0RG9jKiovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipAaW5oZXJpdERvYyoqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBsaW5lIHByb3BlcnR5IHZhbGlkYXRpb24uXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBkYXRhOiB0eXBlKCdvYmplY3QnKSxcclxuICAgICAgICBzYXZlQWN0aW9uOiB0eXBlKCdmdW5jJyksXHJcbiAgICAgICAgZGVsZXRlQWN0aW9uOiB0eXBlKCdmdW5jJyksXHJcbiAgICAgICAgb25MaW5lQ2xpY2s6IHR5cGUoJ2Z1bmMnKSxcclxuICAgICAgICBvblNlbGVjdGlvbjogdHlwZSgnZnVuYycpLFxyXG4gICAgICAgIG9wZXJhdGlvbkxpc3Q6IHR5cGUoJ2FycmF5JywgdHJ1ZSlcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgbGluZSBBY3Rpb25zLlxyXG4gICAgICovXHJcbiAgICByZW5kZXJMaW5lQWN0aW9ucygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vcGVyYXRpb25MaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0ndGFibGUtbGluZS1hY3Rpb25zJz5cclxuICAgICAgICAgICAgICAgICAgICA8Q29udGV4dHVhbEFjdGlvbnMgb3BlcmF0aW9uTGlzdD17dGhpcy5wcm9wcy5vcGVyYXRpb25MaXN0fSBvcGVyYXRpb25QYXJhbT17dGhpcy5wcm9wcy5kYXRhfS8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgX29uTGluZUNsaWNrSGFuZGxlcihkYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHt0aGlzLnByb3BzLm9uTGluZUNsaWNrKGRhdGEpOyB9O1xyXG4gICAgfSxcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJMaW5lQ29udGVudCh0aGlzLnByb3BzLmRhdGEpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGxpbmVNaXhpbiBhcyBtaXhpblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG1peGluOiBsaW5lTWl4aW5cclxufSJdfQ==