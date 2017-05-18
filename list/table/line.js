'use strict';

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Mixins

var translationMixin = require('../../common/i18n').mixin; // Dependencies

var referenceMixin = require('../../common/mixin/reference-property');
var definitionMixin = require('../../common/mixin/definition');
var builtInComponentsMixin = require('../mixin/built-in-components');

// Components

var ContextualActions = require('../action-contextual').component;

var lineMixin = {
    /**
     * React component name.
     */
    displayName: 'table-line',

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, definitionMixin, referenceMixin, builtInComponentsMixin],

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
                React.createElement(ContextualActions, { operationList: this.props.operationList, operationParam: this.props.data })
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

module.exports = { mixin: lineMixin };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJ0cmFuc2xhdGlvbk1peGluIiwicmVxdWlyZSIsIm1peGluIiwicmVmZXJlbmNlTWl4aW4iLCJkZWZpbml0aW9uTWl4aW4iLCJidWlsdEluQ29tcG9uZW50c01peGluIiwiQ29udGV4dHVhbEFjdGlvbnMiLCJjb21wb25lbnQiLCJsaW5lTWl4aW4iLCJkaXNwbGF5TmFtZSIsIm1peGlucyIsImdldERlZmF1bHRQcm9wcyIsImdldEluaXRpYWxTdGF0ZSIsInByb3BUeXBlcyIsImRhdGEiLCJzYXZlQWN0aW9uIiwiZGVsZXRlQWN0aW9uIiwib25MaW5lQ2xpY2siLCJvblNlbGVjdGlvbiIsIm9wZXJhdGlvbkxpc3QiLCJyZW5kZXJMaW5lQWN0aW9ucyIsInByb3BzIiwibGVuZ3RoIiwiX29uTGluZUNsaWNrSGFuZGxlciIsInJlbmRlciIsInJlbmRlckxpbmVDb250ZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7O0FBRUE7O0FBRUEsSUFBSUEsbUJBQW1CQyxRQUFRLG1CQUFSLEVBQTZCQyxLQUFwRCxDLENBTkE7O0FBT0EsSUFBSUMsaUJBQWlCRixRQUFRLHVDQUFSLENBQXJCO0FBQ0EsSUFBSUcsa0JBQWtCSCxRQUFRLCtCQUFSLENBQXRCO0FBQ0EsSUFBSUkseUJBQXlCSixRQUFRLDhCQUFSLENBQTdCOztBQUVBOztBQUVBLElBQUlLLG9CQUFvQkwsUUFBUSxzQkFBUixFQUFnQ00sU0FBeEQ7O0FBRUEsSUFBSUMsWUFBWTtBQUNaOzs7QUFHQUMsaUJBQWEsWUFKRDs7QUFNWjs7O0FBR0FDLFlBQVEsQ0FBQ1YsZ0JBQUQsRUFBbUJJLGVBQW5CLEVBQW9DRCxjQUFwQyxFQUFvREUsc0JBQXBELENBVEk7O0FBV1o7QUFDQU0sbUJBWlksNkJBWU07QUFDZCxlQUFPLEVBQVA7QUFDSCxLQWRXOzs7QUFnQlo7QUFDQUMsbUJBakJZLDZCQWlCTTtBQUNkLGVBQU8sRUFBUDtBQUNILEtBbkJXOzs7QUFxQlo7Ozs7QUFJQUMsZUFBVztBQUNQQyxjQUFNLHFCQUFLLFFBQUwsQ0FEQztBQUVQQyxvQkFBWSxxQkFBSyxNQUFMLENBRkw7QUFHUEMsc0JBQWMscUJBQUssTUFBTCxDQUhQO0FBSVBDLHFCQUFhLHFCQUFLLE1BQUwsQ0FKTjtBQUtQQyxxQkFBYSxxQkFBSyxNQUFMLENBTE47QUFNUEMsdUJBQWUscUJBQUssT0FBTCxFQUFjLElBQWQ7QUFOUixLQXpCQzs7QUFrQ1o7OztBQUdBQyxxQkFyQ1ksK0JBcUNRO0FBQ2hCLFlBQUksS0FBS0MsS0FBTCxDQUFXRixhQUFYLENBQXlCRyxNQUF6QixHQUFrQyxDQUF0QyxFQUF5QztBQUNyQyxtQkFDSTtBQUFBO0FBQUEsa0JBQUssY0FBVyxvQkFBaEI7QUFDSSxvQ0FBQyxpQkFBRCxJQUFtQixlQUFlLEtBQUtELEtBQUwsQ0FBV0YsYUFBN0MsRUFBNEQsZ0JBQWdCLEtBQUtFLEtBQUwsQ0FBV1AsSUFBdkY7QUFESixhQURKO0FBS0g7QUFDSixLQTdDVztBQThDWlMsdUJBOUNZLCtCQThDUVQsSUE5Q1IsRUE4Q2M7QUFBQTs7QUFDdEIsZUFBTyxZQUFNO0FBQUMsa0JBQUtPLEtBQUwsQ0FBV0osV0FBWCxDQUF1QkgsSUFBdkI7QUFBK0IsU0FBN0M7QUFDSCxLQWhEVztBQWlEWlUsVUFqRFksb0JBaURIO0FBQ0wsZUFBTyxLQUFLQyxpQkFBTCxDQUF1QixLQUFLSixLQUFMLENBQVdQLElBQWxDLENBQVA7QUFDSDtBQW5EVyxDQUFoQjs7QUFzREFZLE9BQU9DLE9BQVAsR0FBaUIsRUFBQ3pCLE9BQU9NLFNBQVIsRUFBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcblxyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcblxyXG4vLyBNaXhpbnNcclxuXHJcbmxldCB0cmFuc2xhdGlvbk1peGluID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uL2kxOG4nKS5taXhpbjtcclxubGV0IHJlZmVyZW5jZU1peGluID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uL21peGluL3JlZmVyZW5jZS1wcm9wZXJ0eScpO1xyXG5sZXQgZGVmaW5pdGlvbk1peGluID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uL21peGluL2RlZmluaXRpb24nKTtcclxubGV0IGJ1aWx0SW5Db21wb25lbnRzTWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbi9idWlsdC1pbi1jb21wb25lbnRzJyk7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcblxyXG5sZXQgQ29udGV4dHVhbEFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb24tY29udGV4dHVhbCcpLmNvbXBvbmVudDtcclxuXHJcbmxldCBsaW5lTWl4aW4gPSB7XHJcbiAgICAvKipcclxuICAgICAqIFJlYWN0IGNvbXBvbmVudCBuYW1lLlxyXG4gICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ3RhYmxlLWxpbmUnLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWl4aW4gZGVwZW5kYW5jaWVzLlxyXG4gICAgICovXHJcbiAgICBtaXhpbnM6IFt0cmFuc2xhdGlvbk1peGluLCBkZWZpbml0aW9uTWl4aW4sIHJlZmVyZW5jZU1peGluLCBidWlsdEluQ29tcG9uZW50c01peGluXSxcclxuXHJcbiAgICAvKipAaW5oZXJpdERvYyoqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqQGluaGVyaXREb2MqKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbGluZSBwcm9wZXJ0eSB2YWxpZGF0aW9uLlxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgZGF0YTogdHlwZSgnb2JqZWN0JyksXHJcbiAgICAgICAgc2F2ZUFjdGlvbjogdHlwZSgnZnVuYycpLFxyXG4gICAgICAgIGRlbGV0ZUFjdGlvbjogdHlwZSgnZnVuYycpLFxyXG4gICAgICAgIG9uTGluZUNsaWNrOiB0eXBlKCdmdW5jJyksXHJcbiAgICAgICAgb25TZWxlY3Rpb246IHR5cGUoJ2Z1bmMnKSxcclxuICAgICAgICBvcGVyYXRpb25MaXN0OiB0eXBlKCdhcnJheScsIHRydWUpXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGxpbmUgQWN0aW9ucy5cclxuICAgICAqL1xyXG4gICAgcmVuZGVyTGluZUFjdGlvbnMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub3BlcmF0aW9uTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J3RhYmxlLWxpbmUtYWN0aW9ucyc+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbnRleHR1YWxBY3Rpb25zIG9wZXJhdGlvbkxpc3Q9e3RoaXMucHJvcHMub3BlcmF0aW9uTGlzdH0gb3BlcmF0aW9uUGFyYW09e3RoaXMucHJvcHMuZGF0YX0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF9vbkxpbmVDbGlja0hhbmRsZXIoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7dGhpcy5wcm9wcy5vbkxpbmVDbGljayhkYXRhKTsgfTtcclxuICAgIH0sXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTGluZUNvbnRlbnQodGhpcy5wcm9wcy5kYXRhKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge21peGluOiBsaW5lTWl4aW59O1xyXG4iXX0=