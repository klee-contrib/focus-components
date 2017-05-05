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
            return selectedScope.label || this.props.scope;
        }
        return this.props.scope;
    },

    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render: function render() {
        var scope = this.props.scope && this.props.scope !== scopeAll ? { scope: {
                code: this.props.scope,
                label: 'Scope',
                value: this._getScopeLabel()
            } } : undefined;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJMaXN0U3VtbWFyeSIsImNvbXBvbmVudCIsInJlZmVyZW5jZUJlaGF2aW91ciIsInN0b3JlQmVoYXZpb3VyIiwic2NvcGVBbGwiLCJTdW1tYXJ5IiwibWl4aW5zIiwicmVmZXJlbmNlTmFtZXMiLCJnZXREZWZhdWx0UHJvcHMiLCJ0b3RhbENvdW50IiwicXVlcnkiLCJhY3Rpb24iLCJ1bmRlZmluZWQiLCJzY29wZSIsImNvbXBvbmVudERpZE1vdW50IiwiX2xvYWRSZWZlcmVuY2UiLCJfb25TY29wZUNsaWNrIiwicHJvcHMiLCJ1cGRhdGVQcm9wZXJ0aWVzIiwic2VsZWN0ZWRGYWNldHMiLCJncm91cGluZ0tleSIsIl9nZXRTY29wZUxhYmVsIiwic3RhdGUiLCJyZWZlcmVuY2UiLCJzY29wZXMiLCJzZWxlY3RlZFNjb3BlIiwiZmluZCIsImNvZGUiLCJsYWJlbCIsInJlbmRlciIsInZhbHVlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7O0FBRkE7QUFDQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDs7O0FBR0E7O0FBRUEsSUFBTUMsY0FBY0QsUUFBUSw2QkFBUixFQUF1Q0UsU0FBM0Q7O0FBRUE7O0FBRUEsSUFBTUMscUJBQXFCSCxRQUFRLGdEQUFSLENBQTNCO0FBQ0EsSUFBTUksaUJBQWlCSixRQUFRLHVDQUFSLENBQXZCOztBQUVBLElBQU1LLFdBQVcsS0FBakI7O0FBRUEsSUFBTUMsVUFBVTtBQUNaOzs7O0FBSUFDLFlBQVEsQ0FBQ0osa0JBQUQsRUFBcUJDLGNBQXJCLENBTEk7O0FBT1o7Ozs7QUFJQUksb0JBQWdCLENBQUMsUUFBRCxDQVhKOztBQWFaOzs7O0FBSUFDLG1CQWpCWSw2QkFpQk07QUFDZCxlQUFRO0FBQ0pDLHdCQUFZLENBRFI7QUFFSkMsbUJBQU8sRUFGSDtBQUdKQyxvQkFBUUMsU0FISjtBQUlKQyxtQkFBT0Q7QUFKSCxTQUFSO0FBTUgsS0F4Qlc7O0FBeUJaO0FBQ0FFLHFCQTFCWSwrQkEwQlM7QUFDakIsYUFBS0MsY0FBTDtBQUNILEtBNUJXOztBQTZCWjs7OztBQUlBQyxpQkFqQ1ksMkJBaUNJO0FBQ1osYUFBS0MsS0FBTCxDQUFXTixNQUFYLENBQWtCTyxnQkFBbEIsQ0FBbUM7QUFDL0JMLG1CQUFPVCxRQUR3QjtBQUUvQmUsNEJBQWdCLEVBRmU7QUFHL0JDLHlCQUFhUjtBQUhrQixTQUFuQztBQUtILEtBdkNXO0FBd0NaUyxrQkF4Q1ksNEJBd0NLO0FBQUE7O0FBQ2IsWUFBRyxLQUFLQyxLQUFMLElBQWMsS0FBS0EsS0FBTCxDQUFXQyxTQUFYLENBQXFCQyxNQUF0QyxFQUE4QztBQUMxQyxnQkFBTUMsZ0JBQWdCLEtBQUtILEtBQUwsQ0FBV0MsU0FBWCxDQUFxQkMsTUFBckIsQ0FBNEJFLElBQTVCLENBQWlDO0FBQUEsdUJBQ25EYixNQUFNYyxJQUFOLEtBQWUsTUFBS1YsS0FBTCxDQUFXSixLQUR5QjtBQUFBLGFBQWpDLENBQXRCO0FBR0EsbUJBQU9ZLGNBQWNHLEtBQWQsSUFBdUIsS0FBS1gsS0FBTCxDQUFXSixLQUF6QztBQUNIO0FBQ0QsZUFBTyxLQUFLSSxLQUFMLENBQVdKLEtBQWxCO0FBQ0gsS0FoRFc7O0FBaURaOzs7O0FBSUFnQixVQXJEWSxvQkFxREg7QUFDTCxZQUFNaEIsUUFBUSxLQUFLSSxLQUFMLENBQVdKLEtBQVgsSUFBb0IsS0FBS0ksS0FBTCxDQUFXSixLQUFYLEtBQXFCVCxRQUF6QyxHQUFvRCxFQUFDUyxPQUFPO0FBQ3RFYyxzQkFBTSxLQUFLVixLQUFMLENBQVdKLEtBRHFEO0FBRXRFZSx1QkFBTyxPQUYrRDtBQUd0RUUsdUJBQU8sS0FBS1QsY0FBTDtBQUgrRCxhQUFSLEVBQXBELEdBSVRULFNBSkw7QUFLQSxlQUNJLG9CQUFDLFdBQUQ7QUFDSSwwQkFBVyw4QkFEZjtBQUVJLGdCQUFJLEtBQUtLLEtBQUwsQ0FBV1IsVUFGbkI7QUFHSSx1QkFBVyxLQUFLUSxLQUFMLENBQVdQLEtBSDFCO0FBSUksdUJBQVdHLEtBSmY7QUFLSSw4QkFBa0IsS0FBS0c7QUFMM0IsVUFESjtBQVNIO0FBcEVXLENBQWhCOztBQXVFQWUsT0FBT0MsT0FBUCxHQUFpQix1QkFBUTNCLE9BQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcblxyXG5jb25zdCBMaXN0U3VtbWFyeSA9IHJlcXVpcmUoJy4uLy4uLy4uL2xpc3Qvc3VtbWFyeS9pbmRleCcpLmNvbXBvbmVudDtcclxuXHJcbi8vIE1peGluc1xyXG5cclxuY29uc3QgcmVmZXJlbmNlQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tbW9uL2Zvcm0vbWl4aW4vcmVmZXJlbmNlLWJlaGF2aW91cicpO1xyXG5jb25zdCBzdG9yZUJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbW1vbi9taXhpbi9zdG9yZS1iZWhhdmlvdXInKTtcclxuXHJcbmNvbnN0IHNjb3BlQWxsID0gJ0FMTCc7XHJcblxyXG5jb25zdCBTdW1tYXJ5ID0ge1xyXG4gICAgLyoqXHJcbiAgICAqIENvbXBvbmVudCdzIG1peGluc1xyXG4gICAgKiBAdHlwZSB7QXJyYXl9XHJcbiAgICAqL1xyXG4gICAgbWl4aW5zOiBbcmVmZXJlbmNlQmVoYXZpb3VyLCBzdG9yZUJlaGF2aW91cl0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlZmVyZW5jZSBuYW1lcyB0byBiZSBmZXRjaGVkIGJ5IHRoZSByZWZlcmVuY2UgYmVoYXZpb3VyXHJcbiAgICAqIEB0eXBlIHtBcnJheX1cclxuICAgICovXHJcbiAgICByZWZlcmVuY2VOYW1lczogWydzY29wZXMnXSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgZGVmYXVsdCBwcm9wc1xyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSB0aGUgZGVmYXVsdCBwcm9wc1xyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgIHRvdGFsQ291bnQ6IDAsXHJcbiAgICAgICAgICAgIHF1ZXJ5OiAnJyxcclxuICAgICAgICAgICAgYWN0aW9uOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHNjb3BlOiB1bmRlZmluZWRcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuICAgICAgICB0aGlzLl9sb2FkUmVmZXJlbmNlKCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBTY29wZSBjbGljayBoYW5kbGVyXHJcbiAgICAgKiBTZXQgdGhlIHNjb3BlIHRvIEFMTC5cclxuICAgICAqL1xyXG4gICAgX29uU2NvcGVDbGljaygpIHtcclxuICAgICAgICB0aGlzLnByb3BzLmFjdGlvbi51cGRhdGVQcm9wZXJ0aWVzKHtcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlQWxsLFxyXG4gICAgICAgICAgICBzZWxlY3RlZEZhY2V0czoge30sXHJcbiAgICAgICAgICAgIGdyb3VwaW5nS2V5OiB1bmRlZmluZWRcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBfZ2V0U2NvcGVMYWJlbCgpIHtcclxuICAgICAgICBpZih0aGlzLnN0YXRlICYmIHRoaXMuc3RhdGUucmVmZXJlbmNlLnNjb3Blcykge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFNjb3BlID0gdGhpcy5zdGF0ZS5yZWZlcmVuY2Uuc2NvcGVzLmZpbmQoc2NvcGUgPT5cclxuICAgICAgICAgICAgICAgIHNjb3BlLmNvZGUgPT09IHRoaXMucHJvcHMuc2NvcGVcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRTY29wZS5sYWJlbCB8fCB0aGlzLnByb3BzLnNjb3BlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zY29wZTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJuIHtIVE1MfSB0aGUgcmVuZGVyZWQgY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBzY29wZSA9IHRoaXMucHJvcHMuc2NvcGUgJiYgdGhpcy5wcm9wcy5zY29wZSAhPT0gc2NvcGVBbGwgPyB7c2NvcGU6IHtcclxuICAgICAgICAgICAgY29kZTogdGhpcy5wcm9wcy5zY29wZSxcclxuICAgICAgICAgICAgbGFiZWw6ICdTY29wZScsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl9nZXRTY29wZUxhYmVsKClcclxuICAgICAgICB9fSA6IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TGlzdFN1bW1hcnlcclxuICAgICAgICAgICAgICAgIGRhdGEtZm9jdXM9J2FkdmFuY2VkLXNlYXJjaC1saXN0LXN1bW1hcnknXHJcbiAgICAgICAgICAgICAgICBuYj17dGhpcy5wcm9wcy50b3RhbENvdW50fVxyXG4gICAgICAgICAgICAgICAgcXVlcnlUZXh0PXt0aGlzLnByb3BzLnF1ZXJ5fVxyXG4gICAgICAgICAgICAgICAgc2NvcGVMaXN0PXtzY29wZX1cclxuICAgICAgICAgICAgICAgIHNjb3BlQ2xpY2tBY3Rpb249e3RoaXMuX29uU2NvcGVDbGlja31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKFN1bW1hcnkpO1xyXG4iXX0=