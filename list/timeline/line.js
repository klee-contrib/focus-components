'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**@jsx*/
var React = require('react');

var translationMixin = require('../../common/i18n').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
var definitionMixin = require('../../common/mixin/definition');
var builtInComponentsMixin = require('../mixin/built-in-components');

var lineMixin = {
    /**
     * React component name.
     */
    displayName: 'timeline-line',

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, definitionMixin, referenceMixin, builtInComponentsMixin],

    getInitialState: function getInitialSate() {
        return {};
    },

    /**
     * line property validation.
     * @type {Object}
     */
    propTypes: {
        data: (0, _types2.default)('object'),
        dateField: (0, _types2.default)('string'),
        dateComponent: (0, _types2.default)('object'),
        onLineClick: (0, _types2.default)('func')
    },

    /**
     * Get the line value.
     * @returns {object} - the data od the line.
     */
    getValue: function getLineValue() {
        return {
            item: this.props.data
        };
    },

    /**
     * Line Click handler.
     * @param {object} event - the event
     */
    _handleLineClick: function handleLineClick(event) {
        if (this.props.onLineClick) {
            this.props.onLineClick(this.props.data);
        }
    },

    /**
     * render content for a line.
     * @returns {XML} the line content
     */
    _renderLineContent: function renderLineContent() {
        if (this.renderLineContent) {
            return this.renderLineContent(this.props.data);
        } else {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'timeline-heading' },
                    React.createElement(
                        'h4',
                        { className: 'timeline-title' },
                        this.props.data.title
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'timeline-body' },
                    React.createElement(
                        'p',
                        null,
                        this.props.data.body
                    )
                )
            );
        }
    },

    /**
     * Render line in list.
     * @returns {XML} - the render of the line
     */
    render: function renderLine() {
        if (this.renderLine) {
            return this.renderLine();
        } else {
            return React.createElement(
                'li',
                null,
                React.createElement(
                    'div',
                    { className: 'timeline-date' },
                    this.textFor(this.props.dateField, {})
                ),
                React.createElement('div', { className: 'timeline-badge' }),
                React.createElement(
                    'div',
                    { className: 'timeline-panel', onClick: this._handleLineClick },
                    this._renderLineContent()
                )
            );
        }
    }
};

module.exports = { mixin: lineMixin };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJ0cmFuc2xhdGlvbk1peGluIiwibWl4aW4iLCJyZWZlcmVuY2VNaXhpbiIsImRlZmluaXRpb25NaXhpbiIsImJ1aWx0SW5Db21wb25lbnRzTWl4aW4iLCJsaW5lTWl4aW4iLCJkaXNwbGF5TmFtZSIsIm1peGlucyIsImdldEluaXRpYWxTdGF0ZSIsImdldEluaXRpYWxTYXRlIiwicHJvcFR5cGVzIiwiZGF0YSIsImRhdGVGaWVsZCIsImRhdGVDb21wb25lbnQiLCJvbkxpbmVDbGljayIsImdldFZhbHVlIiwiZ2V0TGluZVZhbHVlIiwiaXRlbSIsInByb3BzIiwiX2hhbmRsZUxpbmVDbGljayIsImhhbmRsZUxpbmVDbGljayIsImV2ZW50IiwiX3JlbmRlckxpbmVDb250ZW50IiwicmVuZGVyTGluZUNvbnRlbnQiLCJ0aXRsZSIsImJvZHkiLCJyZW5kZXIiLCJyZW5kZXJMaW5lIiwidGV4dEZvciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBSEE7QUFDQSxJQUFJQSxRQUFRQyxRQUFRLE9BQVIsQ0FBWjs7QUFHQSxJQUFJQyxtQkFBbUJELFFBQVEsbUJBQVIsRUFBNkJFLEtBQXBEO0FBQ0EsSUFBSUMsaUJBQWlCSCxRQUFRLHVDQUFSLENBQXJCO0FBQ0EsSUFBSUksa0JBQWtCSixRQUFRLCtCQUFSLENBQXRCO0FBQ0EsSUFBSUsseUJBQXlCTCxRQUFRLDhCQUFSLENBQTdCOztBQUVBLElBQUlNLFlBQVk7QUFDWjs7O0FBR0FDLGlCQUFhLGVBSkQ7O0FBTVo7OztBQUdBQyxZQUFRLENBQUNQLGdCQUFELEVBQW1CRyxlQUFuQixFQUFvQ0QsY0FBcEMsRUFBb0RFLHNCQUFwRCxDQVRJOztBQVdaSSxxQkFBaUIsU0FBU0MsY0FBVCxHQUEwQjtBQUN2QyxlQUFPLEVBQVA7QUFDSCxLQWJXOztBQWVaOzs7O0FBSUFDLGVBQVc7QUFDUEMsY0FBTSxxQkFBSyxRQUFMLENBREM7QUFFUEMsbUJBQVcscUJBQUssUUFBTCxDQUZKO0FBR1BDLHVCQUFlLHFCQUFLLFFBQUwsQ0FIUjtBQUlQQyxxQkFBYSxxQkFBSyxNQUFMO0FBSk4sS0FuQkM7O0FBMEJaOzs7O0FBSUFDLGNBQVUsU0FBU0MsWUFBVCxHQUF3QjtBQUM5QixlQUFPO0FBQ0hDLGtCQUFNLEtBQUtDLEtBQUwsQ0FBV1A7QUFEZCxTQUFQO0FBR0gsS0FsQ1c7O0FBb0NaOzs7O0FBSUFRLHNCQUFrQixTQUFTQyxlQUFULENBQXlCQyxLQUF6QixFQUFnQztBQUM5QyxZQUFHLEtBQUtILEtBQUwsQ0FBV0osV0FBZCxFQUEyQjtBQUN2QixpQkFBS0ksS0FBTCxDQUFXSixXQUFYLENBQXVCLEtBQUtJLEtBQUwsQ0FBV1AsSUFBbEM7QUFDSDtBQUNKLEtBNUNXOztBQThDWjs7OztBQUlBVyx3QkFBb0IsU0FBU0MsaUJBQVQsR0FBNkI7QUFDN0MsWUFBRyxLQUFLQSxpQkFBUixFQUEyQjtBQUN2QixtQkFBTyxLQUFLQSxpQkFBTCxDQUF1QixLQUFLTCxLQUFMLENBQVdQLElBQWxDLENBQVA7QUFDSCxTQUZELE1BRUs7QUFDRCxtQkFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxrQkFBZjtBQUNJO0FBQUE7QUFBQSwwQkFBSSxXQUFVLGdCQUFkO0FBQWdDLDZCQUFLTyxLQUFMLENBQVdQLElBQVgsQ0FBZ0JhO0FBQWhEO0FBREosaUJBREo7QUFJSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxlQUFmO0FBQ0k7QUFBQTtBQUFBO0FBQUksNkJBQUtOLEtBQUwsQ0FBV1AsSUFBWCxDQUFnQmM7QUFBcEI7QUFESjtBQUpKLGFBREo7QUFXSDtBQUNKLEtBbEVXOztBQW9FWjs7OztBQUlBQyxZQUFRLFNBQVNDLFVBQVQsR0FBc0I7QUFDMUIsWUFBRyxLQUFLQSxVQUFSLEVBQW9CO0FBQ2hCLG1CQUFPLEtBQUtBLFVBQUwsRUFBUDtBQUNILFNBRkQsTUFFSztBQUNELG1CQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLGVBQWY7QUFBZ0MseUJBQUtDLE9BQUwsQ0FBYSxLQUFLVixLQUFMLENBQVdOLFNBQXhCLEVBQW1DLEVBQW5DO0FBQWhDLGlCQURKO0FBRUksNkNBQUssV0FBVSxnQkFBZixHQUZKO0FBR0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsZ0JBQWYsRUFBZ0MsU0FBUyxLQUFLTyxnQkFBOUM7QUFDSyx5QkFBS0csa0JBQUw7QUFETDtBQUhKLGFBREo7QUFTSDtBQUNKO0FBdEZXLENBQWhCOztBQXlGQU8sT0FBT0MsT0FBUCxHQUFpQixFQUFDN0IsT0FBUUksU0FBVCxFQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipAanN4Ki9cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB0eXBlIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxudmFyIHRyYW5zbGF0aW9uTWl4aW4gPSByZXF1aXJlKCcuLi8uLi9jb21tb24vaTE4bicpLm1peGluO1xyXG52YXIgcmVmZXJlbmNlTWl4aW4gPSByZXF1aXJlKCcuLi8uLi9jb21tb24vbWl4aW4vcmVmZXJlbmNlLXByb3BlcnR5Jyk7XHJcbnZhciBkZWZpbml0aW9uTWl4aW4gPSByZXF1aXJlKCcuLi8uLi9jb21tb24vbWl4aW4vZGVmaW5pdGlvbicpO1xyXG52YXIgYnVpbHRJbkNvbXBvbmVudHNNaXhpbiA9IHJlcXVpcmUoJy4uL21peGluL2J1aWx0LWluLWNvbXBvbmVudHMnKTtcclxuXHJcbnZhciBsaW5lTWl4aW4gPSB7XHJcbiAgICAvKipcclxuICAgICAqIFJlYWN0IGNvbXBvbmVudCBuYW1lLlxyXG4gICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ3RpbWVsaW5lLWxpbmUnLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWl4aW4gZGVwZW5kYW5jaWVzLlxyXG4gICAgICovXHJcbiAgICBtaXhpbnM6IFt0cmFuc2xhdGlvbk1peGluLCBkZWZpbml0aW9uTWl4aW4sIHJlZmVyZW5jZU1peGluLCBidWlsdEluQ29tcG9uZW50c01peGluXSxcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldEluaXRpYWxTYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBsaW5lIHByb3BlcnR5IHZhbGlkYXRpb24uXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBkYXRhOiB0eXBlKCdvYmplY3QnKSxcclxuICAgICAgICBkYXRlRmllbGQ6IHR5cGUoJ3N0cmluZycpLFxyXG4gICAgICAgIGRhdGVDb21wb25lbnQ6IHR5cGUoJ29iamVjdCcpLFxyXG4gICAgICAgIG9uTGluZUNsaWNrOiB0eXBlKCdmdW5jJylcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGxpbmUgdmFsdWUuXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIHRoZSBkYXRhIG9kIHRoZSBsaW5lLlxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gZ2V0TGluZVZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGl0ZW06IHRoaXMucHJvcHMuZGF0YVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGluZSBDbGljayBoYW5kbGVyLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IC0gdGhlIGV2ZW50XHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVMaW5lQ2xpY2s6IGZ1bmN0aW9uIGhhbmRsZUxpbmVDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmKHRoaXMucHJvcHMub25MaW5lQ2xpY2spIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkxpbmVDbGljayh0aGlzLnByb3BzLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW5kZXIgY29udGVudCBmb3IgYSBsaW5lLlxyXG4gICAgICogQHJldHVybnMge1hNTH0gdGhlIGxpbmUgY29udGVudFxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyTGluZUNvbnRlbnQ6IGZ1bmN0aW9uIHJlbmRlckxpbmVDb250ZW50KCkge1xyXG4gICAgICAgIGlmKHRoaXMucmVuZGVyTGluZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTGluZUNvbnRlbnQodGhpcy5wcm9wcy5kYXRhKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1oZWFkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0aW1lbGluZS10aXRsZVwiPnt0aGlzLnByb3BzLmRhdGEudGl0bGV9PC9oND5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+e3RoaXMucHJvcHMuZGF0YS5ib2R5fTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGxpbmUgaW4gbGlzdC5cclxuICAgICAqIEByZXR1cm5zIHtYTUx9IC0gdGhlIHJlbmRlciBvZiB0aGUgbGluZVxyXG4gICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlckxpbmUoKSB7XHJcbiAgICAgICAgaWYodGhpcy5yZW5kZXJMaW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckxpbmUoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWRhdGVcIj57dGhpcy50ZXh0Rm9yKHRoaXMucHJvcHMuZGF0ZUZpZWxkLCB7fSl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1iYWRnZVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtcGFuZWxcIiBvbkNsaWNrPXt0aGlzLl9oYW5kbGVMaW5lQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyTGluZUNvbnRlbnQoKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7bWl4aW4gOiBsaW5lTWl4aW59O1xyXG4iXX0=