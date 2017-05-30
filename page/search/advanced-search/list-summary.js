'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies
var React = require('react');


// Components

var ListSummary = require('../../../list/summary/index').component;

// Mixins

var referenceBehaviour = require('../../../common/form/mixin/reference-behaviour');
var storeBehaviour = require('../../../common/mixin/store-behaviour');

var scopeAll = 'ALL';

var Summary = {
    /**
    * Component's mixins
    * @type {Array}
    */
    mixins: [referenceBehaviour, storeBehaviour],

    /**
    * Reference names to be fetched by the reference behaviour
    * @type {Array}
    */
    referenceNames: ['scopes'],

    /**
     * Get the default props
     * @return {object} the default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            totalCount: 0,
            query: '',
            action: undefined,
            scope: undefined
        };
    },

    /** @inheritdoc */
    componentDidMount: function componentDidMount() {
        this._loadReference();
    },

    /**
     * Scope click handler
     * Set the scope to ALL.
     */
    _onScopeClick: function _onScopeClick() {
        this.props.action.updateProperties({
            scope: scopeAll,
            selectedFacets: {},
            groupingKey: undefined
        });
    },
    _getScopeLabel: function _getScopeLabel() {
        var _this = this;

        if (this.state && this.state.reference.scopes) {
            var selectedScope = this.state.reference.scopes.find(function (scope) {
                return scope.code === _this.props.scope;
            });
            return selectedScope != null ? selectedScope.label || this.props.scope : this.props.scope;
        }
        return this.props.scope;
    },

    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render: function render() {
        var scope = this.props.scope && this.props.scope !== scopeAll ? {
            scope: {
                code: this.props.scope,
                label: 'Scope',
                value: this._getScopeLabel()
            }
        } : undefined;
        return React.createElement(ListSummary, {
            'data-focus': 'advanced-search-list-summary',
            nb: this.props.totalCount,
            queryText: this.props.query,
            scopeList: scope,
            scopeClickAction: this._onScopeClick
        });
    }
};

module.exports = (0, _builder2.default)(Summary);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJMaXN0U3VtbWFyeSIsImNvbXBvbmVudCIsInJlZmVyZW5jZUJlaGF2aW91ciIsInN0b3JlQmVoYXZpb3VyIiwic2NvcGVBbGwiLCJTdW1tYXJ5IiwibWl4aW5zIiwicmVmZXJlbmNlTmFtZXMiLCJnZXREZWZhdWx0UHJvcHMiLCJ0b3RhbENvdW50IiwicXVlcnkiLCJhY3Rpb24iLCJ1bmRlZmluZWQiLCJzY29wZSIsImNvbXBvbmVudERpZE1vdW50IiwiX2xvYWRSZWZlcmVuY2UiLCJfb25TY29wZUNsaWNrIiwicHJvcHMiLCJ1cGRhdGVQcm9wZXJ0aWVzIiwic2VsZWN0ZWRGYWNldHMiLCJncm91cGluZ0tleSIsIl9nZXRTY29wZUxhYmVsIiwic3RhdGUiLCJyZWZlcmVuY2UiLCJzY29wZXMiLCJzZWxlY3RlZFNjb3BlIiwiZmluZCIsImNvZGUiLCJsYWJlbCIsInJlbmRlciIsInZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7O0FBRkE7QUFDQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDs7O0FBR0E7O0FBRUEsSUFBTUMsY0FBY0QsUUFBUSw2QkFBUixFQUF1Q0UsU0FBM0Q7O0FBRUE7O0FBRUEsSUFBTUMscUJBQXFCSCxRQUFRLGdEQUFSLENBQTNCO0FBQ0EsSUFBTUksaUJBQWlCSixRQUFRLHVDQUFSLENBQXZCOztBQUVBLElBQU1LLFdBQVcsS0FBakI7O0FBRUEsSUFBTUMsVUFBVTtBQUNaOzs7O0FBSUFDLFlBQVEsQ0FBQ0osa0JBQUQsRUFBcUJDLGNBQXJCLENBTEk7O0FBT1o7Ozs7QUFJQUksb0JBQWdCLENBQUMsUUFBRCxDQVhKOztBQWFaOzs7O0FBSUFDLG1CQWpCWSw2QkFpQk07QUFDZCxlQUFRO0FBQ0pDLHdCQUFZLENBRFI7QUFFSkMsbUJBQU8sRUFGSDtBQUdKQyxvQkFBUUMsU0FISjtBQUlKQyxtQkFBT0Q7QUFKSCxTQUFSO0FBTUgsS0F4Qlc7O0FBeUJaO0FBQ0FFLHFCQTFCWSwrQkEwQlE7QUFDaEIsYUFBS0MsY0FBTDtBQUNILEtBNUJXOztBQTZCWjs7OztBQUlBQyxpQkFqQ1ksMkJBaUNJO0FBQ1osYUFBS0MsS0FBTCxDQUFXTixNQUFYLENBQWtCTyxnQkFBbEIsQ0FBbUM7QUFDL0JMLG1CQUFPVCxRQUR3QjtBQUUvQmUsNEJBQWdCLEVBRmU7QUFHL0JDLHlCQUFhUjtBQUhrQixTQUFuQztBQUtILEtBdkNXO0FBd0NaUyxrQkF4Q1ksNEJBd0NLO0FBQUE7O0FBQ2IsWUFBSSxLQUFLQyxLQUFMLElBQWMsS0FBS0EsS0FBTCxDQUFXQyxTQUFYLENBQXFCQyxNQUF2QyxFQUErQztBQUMzQyxnQkFBTUMsZ0JBQWdCLEtBQUtILEtBQUwsQ0FBV0MsU0FBWCxDQUFxQkMsTUFBckIsQ0FBNEJFLElBQTVCLENBQWlDO0FBQUEsdUJBQ25EYixNQUFNYyxJQUFOLEtBQWUsTUFBS1YsS0FBTCxDQUFXSixLQUR5QjtBQUFBLGFBQWpDLENBQXRCO0FBR0EsbUJBQU9ZLGlCQUFpQixJQUFqQixHQUF5QkEsY0FBY0csS0FBZCxJQUF1QixLQUFLWCxLQUFMLENBQVdKLEtBQTNELEdBQW9FLEtBQUtJLEtBQUwsQ0FBV0osS0FBdEY7QUFDSDtBQUNELGVBQU8sS0FBS0ksS0FBTCxDQUFXSixLQUFsQjtBQUNILEtBaERXOztBQWlEWjs7OztBQUlBZ0IsVUFyRFksb0JBcURIO0FBQ0wsWUFBTWhCLFFBQVEsS0FBS0ksS0FBTCxDQUFXSixLQUFYLElBQW9CLEtBQUtJLEtBQUwsQ0FBV0osS0FBWCxLQUFxQlQsUUFBekMsR0FBb0Q7QUFDOURTLG1CQUFPO0FBQ0hjLHNCQUFNLEtBQUtWLEtBQUwsQ0FBV0osS0FEZDtBQUVIZSx1QkFBTyxPQUZKO0FBR0hFLHVCQUFPLEtBQUtULGNBQUw7QUFISjtBQUR1RCxTQUFwRCxHQU1WVCxTQU5KO0FBT0EsZUFDSSxvQkFBQyxXQUFEO0FBQ0ksMEJBQVcsOEJBRGY7QUFFSSxnQkFBSSxLQUFLSyxLQUFMLENBQVdSLFVBRm5CO0FBR0ksdUJBQVcsS0FBS1EsS0FBTCxDQUFXUCxLQUgxQjtBQUlJLHVCQUFXRyxLQUpmO0FBS0ksOEJBQWtCLEtBQUtHO0FBTDNCLFVBREo7QUFTSDtBQXRFVyxDQUFoQjs7QUF5RUFlLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVEzQixPQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5cclxuY29uc3QgTGlzdFN1bW1hcnkgPSByZXF1aXJlKCcuLi8uLi8uLi9saXN0L3N1bW1hcnkvaW5kZXgnKS5jb21wb25lbnQ7XHJcblxyXG4vLyBNaXhpbnNcclxuXHJcbmNvbnN0IHJlZmVyZW5jZUJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi9mb3JtL21peGluL3JlZmVyZW5jZS1iZWhhdmlvdXInKTtcclxuY29uc3Qgc3RvcmVCZWhhdmlvdXIgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vbWl4aW4vc3RvcmUtYmVoYXZpb3VyJyk7XHJcblxyXG5jb25zdCBzY29wZUFsbCA9ICdBTEwnO1xyXG5cclxuY29uc3QgU3VtbWFyeSA9IHtcclxuICAgIC8qKlxyXG4gICAgKiBDb21wb25lbnQncyBtaXhpbnNcclxuICAgICogQHR5cGUge0FycmF5fVxyXG4gICAgKi9cclxuICAgIG1peGluczogW3JlZmVyZW5jZUJlaGF2aW91ciwgc3RvcmVCZWhhdmlvdXJdLFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZWZlcmVuY2UgbmFtZXMgdG8gYmUgZmV0Y2hlZCBieSB0aGUgcmVmZXJlbmNlIGJlaGF2aW91clxyXG4gICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAqL1xyXG4gICAgcmVmZXJlbmNlTmFtZXM6IFsnc2NvcGVzJ10sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGRlZmF1bHQgcHJvcHNcclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gdGhlIGRlZmF1bHQgcHJvcHNcclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICB0b3RhbENvdW50OiAwLFxyXG4gICAgICAgICAgICBxdWVyeTogJycsXHJcbiAgICAgICAgICAgIGFjdGlvbjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBzY29wZTogdW5kZWZpbmVkXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLl9sb2FkUmVmZXJlbmNlKCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBTY29wZSBjbGljayBoYW5kbGVyXHJcbiAgICAgKiBTZXQgdGhlIHNjb3BlIHRvIEFMTC5cclxuICAgICAqL1xyXG4gICAgX29uU2NvcGVDbGljaygpIHtcclxuICAgICAgICB0aGlzLnByb3BzLmFjdGlvbi51cGRhdGVQcm9wZXJ0aWVzKHtcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlQWxsLFxyXG4gICAgICAgICAgICBzZWxlY3RlZEZhY2V0czoge30sXHJcbiAgICAgICAgICAgIGdyb3VwaW5nS2V5OiB1bmRlZmluZWRcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBfZ2V0U2NvcGVMYWJlbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZSAmJiB0aGlzLnN0YXRlLnJlZmVyZW5jZS5zY29wZXMpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRTY29wZSA9IHRoaXMuc3RhdGUucmVmZXJlbmNlLnNjb3Blcy5maW5kKHNjb3BlID0+XHJcbiAgICAgICAgICAgICAgICBzY29wZS5jb2RlID09PSB0aGlzLnByb3BzLnNjb3BlXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkU2NvcGUgIT0gbnVsbCA/IChzZWxlY3RlZFNjb3BlLmxhYmVsIHx8IHRoaXMucHJvcHMuc2NvcGUpIDogdGhpcy5wcm9wcy5zY29wZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2NvcGU7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudFxyXG4gICAgICogQHJldHVybiB7SFRNTH0gdGhlIHJlbmRlcmVkIGNvbXBvbmVudFxyXG4gICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzLnByb3BzLnNjb3BlICYmIHRoaXMucHJvcHMuc2NvcGUgIT09IHNjb3BlQWxsID8ge1xyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgY29kZTogdGhpcy5wcm9wcy5zY29wZSxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU2NvcGUnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuX2dldFNjb3BlTGFiZWwoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSA6IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TGlzdFN1bW1hcnlcclxuICAgICAgICAgICAgICAgIGRhdGEtZm9jdXM9J2FkdmFuY2VkLXNlYXJjaC1saXN0LXN1bW1hcnknXHJcbiAgICAgICAgICAgICAgICBuYj17dGhpcy5wcm9wcy50b3RhbENvdW50fVxyXG4gICAgICAgICAgICAgICAgcXVlcnlUZXh0PXt0aGlzLnByb3BzLnF1ZXJ5fVxyXG4gICAgICAgICAgICAgICAgc2NvcGVMaXN0PXtzY29wZX1cclxuICAgICAgICAgICAgICAgIHNjb3BlQ2xpY2tBY3Rpb249e3RoaXMuX29uU2NvcGVDbGlja31cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihTdW1tYXJ5KTtcclxuIl19