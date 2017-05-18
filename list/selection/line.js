'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Dependencies

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _isEqual = require('lodash/lang/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');


// Components

var ContextualActions = require('../action-contextual').component;

var _require = require('../../components/input'),
    Checkbox = _require.Checkbox;

// Mixins

var translationMixin = require('../../common/i18n').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
var definitionMixin = require('../../common/mixin/definition');
var builtInComponentsMixin = require('../mixin/built-in-components');

var lineMixin = {
    /**
    * React component name.
    */
    displayName: 'SelectionLine',

    /**
    * Mixin dependancies.
    */
    mixins: [translationMixin, definitionMixin, referenceMixin, builtInComponentsMixin],

    /**
     * Get default props
     * @return {object} default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            isSelection: true,
            operationList: {}
        };
    },


    /**
    * line property validation.
    * @type {Object}
    */
    propTypes: {
        data: (0, _types2.default)('object'),
        isSelected: (0, _types2.default)('bool'),
        isSelection: (0, _types2.default)('bool'),
        onLineClick: (0, _types2.default)('func'),
        onSelection: (0, _types2.default)('func'),
        operationList: (0, _types2.default)(['array', 'object'])
    },

    /**
    * State initialization.
    * @return {object} initial state
    */
    getInitialState: function getInitialState() {
        var data = this.props.data;
        var isSelected = this.props.isSelected;

        if (this.selectedInitializer) {
            // this allows to initiate a data specific value for isSelected
            isSelected = this.selectedInitializer(data);
        }
        return {
            isSelected: isSelected || false
        };
    },


    /**
     * Before component is mounted.
     */
    componentWillMount: function componentWillMount() {
        var _props = this.props,
            data = _props.data,
            isSelection = _props.isSelection;

        this._isSelectionnable = isSelection;
        if (this.selectionnableInitializer) {
            this._isSelectionnable = this.selectionnableInitializer(data);
        }
    },


    /**
     * Component will receive props
     * @param  {object} nextProps new component's props
     */
    componentWillReceiveProps: function componentWillReceiveProps(_ref) {
        var isSelected = _ref.isSelected,
            data = _ref.data;

        if ((0, _isEqual2.default)(data, this.props.data)) {
            if (isSelected !== undefined) {
                this.setState({ isSelected: isSelected });
            }
        } else {
            this.setState({ isSelected: false });
        }
    },


    /**
    * Get the line value.
    * @return {object} the line value
    */
    getValue: function getValue() {
        var item = this.props.data;
        var isSelected = this.state.isSelected;

        return { item: item, isSelected: isSelected };
    },


    /**
    * Selection Click handler.
    */
    _handleSelectionClick: function _handleSelectionClick() {
        var isSelected = !this.state.isSelected;
        var _props2 = this.props,
            data = _props2.data,
            onSelection = _props2.onSelection;

        this.setState({ isSelected: isSelected }, function () {
            if (onSelection) {
                onSelection(data, isSelected);
            }
        });
    },


    /**
    * Line Click handler.
    */
    _handleLineClick: function _handleLineClick() {
        var _props3 = this.props,
            data = _props3.data,
            onLineClick = _props3.onLineClick;

        if (onLineClick) {
            onLineClick(data);
        }
    },


    /**
    * Render the left box for selection
    * @return {XML} the rendered selection box
    */
    _renderSelectionBox: function _renderSelectionBox() {
        var isSelected = this.state.isSelected;

        if (this._isSelectionnable) {
            var selectionClass = isSelected ? 'selected' : 'no-selection';
            return React.createElement(
                'div',
                { className: 'sl-selection ' + selectionClass },
                React.createElement(Checkbox, { onChange: this._handleSelectionClick, value: isSelected })
            );
        }
        return null;
    },


    /**
    * render content for a line.
    * @return {XML} the rendered line content
    */
    _renderLineContent: function _renderLineContent() {
        var data = this.props.data;
        var title = data.title,
            body = data.body;

        if (this.renderLineContent) {
            return this.renderLineContent(data);
        } else {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    title
                ),
                React.createElement(
                    'div',
                    null,
                    body
                )
            );
        }
    },


    /**
    * Render actions which can be applied on the line
    * @return {XML} the rendered actions
    */
    _renderActions: function _renderActions() {
        var props = _extends({ operationParam: this.props.data }, this.props);
        if (0 < props.operationList.length) {
            return React.createElement(
                'div',
                { className: 'sl-actions' },
                React.createElement(ContextualActions, props)
            );
        }
    },


    /**
    * Render line in list.
    *  @return {XML} the rendered line
    */
    render: function render() {
        if (this.renderLine) {
            return this.renderLine();
        } else {
            return React.createElement(
                'li',
                { 'data-focus': 'sl-line' },
                this._renderSelectionBox(),
                React.createElement(
                    'div',
                    { className: 'sl-content', onClick: this._handleLineClick },
                    this._renderLineContent()
                ),
                this._renderActions()
            );
        }
    }
};

module.exports = { mixin: lineMixin };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJDb250ZXh0dWFsQWN0aW9ucyIsImNvbXBvbmVudCIsIkNoZWNrYm94IiwidHJhbnNsYXRpb25NaXhpbiIsIm1peGluIiwicmVmZXJlbmNlTWl4aW4iLCJkZWZpbml0aW9uTWl4aW4iLCJidWlsdEluQ29tcG9uZW50c01peGluIiwibGluZU1peGluIiwiZGlzcGxheU5hbWUiLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJpc1NlbGVjdGlvbiIsIm9wZXJhdGlvbkxpc3QiLCJwcm9wVHlwZXMiLCJkYXRhIiwiaXNTZWxlY3RlZCIsIm9uTGluZUNsaWNrIiwib25TZWxlY3Rpb24iLCJnZXRJbml0aWFsU3RhdGUiLCJwcm9wcyIsInNlbGVjdGVkSW5pdGlhbGl6ZXIiLCJjb21wb25lbnRXaWxsTW91bnQiLCJfaXNTZWxlY3Rpb25uYWJsZSIsInNlbGVjdGlvbm5hYmxlSW5pdGlhbGl6ZXIiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwidW5kZWZpbmVkIiwic2V0U3RhdGUiLCJnZXRWYWx1ZSIsIml0ZW0iLCJzdGF0ZSIsIl9oYW5kbGVTZWxlY3Rpb25DbGljayIsIl9oYW5kbGVMaW5lQ2xpY2siLCJfcmVuZGVyU2VsZWN0aW9uQm94Iiwic2VsZWN0aW9uQ2xhc3MiLCJfcmVuZGVyTGluZUNvbnRlbnQiLCJ0aXRsZSIsImJvZHkiLCJyZW5kZXJMaW5lQ29udGVudCIsIl9yZW5kZXJBY3Rpb25zIiwib3BlcmF0aW9uUGFyYW0iLCJsZW5ndGgiLCJyZW5kZXIiLCJyZW5kZXJMaW5lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7a1FBQUE7O0FBRUE7Ozs7QUFFQTs7Ozs7O0FBREEsSUFBTUEsUUFBUUMsUUFBUSxPQUFSLENBQWQ7OztBQUdBOztBQUVBLElBQU1DLG9CQUFvQkQsUUFBUSxzQkFBUixFQUFnQ0UsU0FBMUQ7O2VBQ21C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QkFBU29CLGdCQUFnQixLQUFLcEIsS0FBTCxDQUFXTCxJQUFwQyxJQUE2QyxLQUFLSyxLQUFsRCxDQUFOO0FBQ0EsWUFBSSxJQUFJQSxNQUFNUCxhQUFOLENBQW9CNEIsTUFBNUIsRUFBb0M7QUFDaEMsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsWUFBZjtBQUNJLG9DQUFDLGlCQUFELEVBQXVCckIsS0FBdkI7QUFESixhQURKO0FBS0g7QUFDSixLQTdKYTs7O0FBK0pkOzs7O0FBSUFzQixVQW5LYyxvQkFtS0w7QUFDTCxZQUFHLEtBQUtDLFVBQVIsRUFBb0I7QUFDaEIsbUJBQU8sS0FBS0EsVUFBTCxFQUFQO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsbUJBQ0k7QUFBQTtBQUFBLGtCQUFJLGNBQVcsU0FBZjtBQUNLLHFCQUFLVixtQkFBTCxFQURMO0FBRUk7QUFBQTtBQUFBLHNCQUFLLFdBQVUsWUFBZixFQUE0QixTQUFTLEtBQUtELGdCQUExQztBQUNLLHlCQUFLRyxrQkFBTDtBQURMLGlCQUZKO0FBS0sscUJBQUtJLGNBQUw7QUFMTCxhQURKO0FBU0g7QUFDSjtBQWpMYSxDQUFsQjs7QUFvTEFLLE9BQU9DLE9BQVAsR0FBaUIsRUFBQ3pDLE9BQU9JLFNBQVIsRUFBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcblxyXG5pbXBvcnQgdHlwZXMgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmltcG9ydCBpc0VxdWFsIGZyb20gJ2xvZGFzaC9sYW5nL2lzRXF1YWwnO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5cclxuY29uc3QgQ29udGV4dHVhbEFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb24tY29udGV4dHVhbCcpLmNvbXBvbmVudDtcclxuY29uc3Qge0NoZWNrYm94fSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvaW5wdXQnKTtcclxuXHJcbi8vIE1peGluc1xyXG5cclxuY29uc3QgdHJhbnNsYXRpb25NaXhpbiA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi9pMThuJykubWl4aW47XHJcbmNvbnN0IHJlZmVyZW5jZU1peGluID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uL21peGluL3JlZmVyZW5jZS1wcm9wZXJ0eScpO1xyXG5jb25zdCBkZWZpbml0aW9uTWl4aW4gPSByZXF1aXJlKCcuLi8uLi9jb21tb24vbWl4aW4vZGVmaW5pdGlvbicpO1xyXG5jb25zdCBidWlsdEluQ29tcG9uZW50c01peGluID0gcmVxdWlyZSgnLi4vbWl4aW4vYnVpbHQtaW4tY29tcG9uZW50cycpO1xyXG5cclxuY29uc3QgbGluZU1peGluID0ge1xyXG4gICAgLyoqXHJcbiAgICAqIFJlYWN0IGNvbXBvbmVudCBuYW1lLlxyXG4gICAgKi9cclxuICAgIGRpc3BsYXlOYW1lOiAnU2VsZWN0aW9uTGluZScsXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIE1peGluIGRlcGVuZGFuY2llcy5cclxuICAgICovXHJcbiAgICBtaXhpbnM6IFt0cmFuc2xhdGlvbk1peGluLCBkZWZpbml0aW9uTWl4aW4sIHJlZmVyZW5jZU1peGluLCBidWlsdEluQ29tcG9uZW50c01peGluXSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBkZWZhdWx0IHByb3BzXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IGRlZmF1bHQgcHJvcHNcclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlzU2VsZWN0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb25MaXN0OiB7fVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBsaW5lIHByb3BlcnR5IHZhbGlkYXRpb24uXHJcbiAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgZGF0YTogdHlwZXMoJ29iamVjdCcpLFxyXG4gICAgICAgIGlzU2VsZWN0ZWQ6IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgaXNTZWxlY3Rpb246IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgb25MaW5lQ2xpY2s6IHR5cGVzKCdmdW5jJyksXHJcbiAgICAgICAgb25TZWxlY3Rpb246IHR5cGVzKCdmdW5jJyksXHJcbiAgICAgICAgb3BlcmF0aW9uTGlzdDogdHlwZXMoWydhcnJheScsICdvYmplY3QnXSlcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFN0YXRlIGluaXRpYWxpemF0aW9uLlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IGluaXRpYWwgc3RhdGVcclxuICAgICovXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgY29uc3Qge2RhdGF9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBsZXQge2lzU2VsZWN0ZWR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZih0aGlzLnNlbGVjdGVkSW5pdGlhbGl6ZXIpIHsgLy8gdGhpcyBhbGxvd3MgdG8gaW5pdGlhdGUgYSBkYXRhIHNwZWNpZmljIHZhbHVlIGZvciBpc1NlbGVjdGVkXHJcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkSW5pdGlhbGl6ZXIoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGlzU2VsZWN0ZWQgfHwgZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJlZm9yZSBjb21wb25lbnQgaXMgbW91bnRlZC5cclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHtkYXRhLCBpc1NlbGVjdGlvbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHRoaXMuX2lzU2VsZWN0aW9ubmFibGUgPSBpc1NlbGVjdGlvbjtcclxuICAgICAgICBpZih0aGlzLnNlbGVjdGlvbm5hYmxlSW5pdGlhbGl6ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNTZWxlY3Rpb25uYWJsZSA9IHRoaXMuc2VsZWN0aW9ubmFibGVJbml0aWFsaXplcihkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tcG9uZW50IHdpbGwgcmVjZWl2ZSBwcm9wc1xyXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBuZXh0UHJvcHMgbmV3IGNvbXBvbmVudCdzIHByb3BzXHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoe2lzU2VsZWN0ZWQsIGRhdGF9KSB7XHJcbiAgICAgICAgaWYgKGlzRXF1YWwoZGF0YSx0aGlzLnByb3BzLmRhdGEpKSB7XHJcbiAgICAgICAgICAgIGlmIChpc1NlbGVjdGVkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzU2VsZWN0ZWR9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzU2VsZWN0ZWQ6IGZhbHNlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSBsaW5lIHZhbHVlLlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBsaW5lIHZhbHVlXHJcbiAgICAqL1xyXG4gICAgZ2V0VmFsdWUoKSB7XHJcbiAgICAgICAgY29uc3Qge2RhdGE6IGl0ZW19ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7aXNTZWxlY3RlZH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHJldHVybiB7aXRlbSwgaXNTZWxlY3RlZH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBTZWxlY3Rpb24gQ2xpY2sgaGFuZGxlci5cclxuICAgICovXHJcbiAgICBfaGFuZGxlU2VsZWN0aW9uQ2xpY2soKSB7XHJcbiAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9ICF0aGlzLnN0YXRlLmlzU2VsZWN0ZWQ7XHJcbiAgICAgICAgY29uc3Qge2RhdGEsIG9uU2VsZWN0aW9ufSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNTZWxlY3RlZH0sICgpID0+IHtcclxuICAgICAgICAgICAgaWYob25TZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG9uU2VsZWN0aW9uKGRhdGEsIGlzU2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBMaW5lIENsaWNrIGhhbmRsZXIuXHJcbiAgICAqL1xyXG4gICAgX2hhbmRsZUxpbmVDbGljaygpIHtcclxuICAgICAgICBjb25zdCB7ZGF0YSwgb25MaW5lQ2xpY2t9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZihvbkxpbmVDbGljaykge1xyXG4gICAgICAgICAgICBvbkxpbmVDbGljayhkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGxlZnQgYm94IGZvciBzZWxlY3Rpb25cclxuICAgICogQHJldHVybiB7WE1MfSB0aGUgcmVuZGVyZWQgc2VsZWN0aW9uIGJveFxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJTZWxlY3Rpb25Cb3goKSB7XHJcbiAgICAgICAgY29uc3Qge2lzU2VsZWN0ZWR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZiAodGhpcy5faXNTZWxlY3Rpb25uYWJsZSkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25DbGFzcyA9IGlzU2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJ25vLXNlbGVjdGlvbic7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHNsLXNlbGVjdGlvbiAke3NlbGVjdGlvbkNsYXNzfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDaGVja2JveCBvbkNoYW5nZT17dGhpcy5faGFuZGxlU2VsZWN0aW9uQ2xpY2t9IHZhbHVlPXtpc1NlbGVjdGVkfS8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiByZW5kZXIgY29udGVudCBmb3IgYSBsaW5lLlxyXG4gICAgKiBAcmV0dXJuIHtYTUx9IHRoZSByZW5kZXJlZCBsaW5lIGNvbnRlbnRcclxuICAgICovXHJcbiAgICBfcmVuZGVyTGluZUNvbnRlbnQoKSB7XHJcbiAgICAgICAgY29uc3Qge2RhdGF9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7dGl0bGUsIGJvZHl9ID0gZGF0YTtcclxuICAgICAgICBpZiAodGhpcy5yZW5kZXJMaW5lQ29udGVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJMaW5lQ29udGVudChkYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2Pnt0aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2Pntib2R5fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIGFjdGlvbnMgd2hpY2ggY2FuIGJlIGFwcGxpZWQgb24gdGhlIGxpbmVcclxuICAgICogQHJldHVybiB7WE1MfSB0aGUgcmVuZGVyZWQgYWN0aW9uc1xyXG4gICAgKi9cclxuICAgIF9yZW5kZXJBY3Rpb25zKCkge1xyXG4gICAgICAgIGNvbnN0IHByb3BzID0ge29wZXJhdGlvblBhcmFtOiB0aGlzLnByb3BzLmRhdGEsIC4uLnRoaXMucHJvcHN9O1xyXG4gICAgICAgIGlmICgwIDwgcHJvcHMub3BlcmF0aW9uTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzbC1hY3Rpb25zJz5cclxuICAgICAgICAgICAgICAgICAgICA8Q29udGV4dHVhbEFjdGlvbnMgey4uLnByb3BzfS8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgbGluZSBpbiBsaXN0LlxyXG4gICAgKiAgQHJldHVybiB7WE1MfSB0aGUgcmVuZGVyZWQgbGluZVxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZih0aGlzLnJlbmRlckxpbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTGluZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8bGkgZGF0YS1mb2N1cz0nc2wtbGluZSc+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlclNlbGVjdGlvbkJveCgpfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzbC1jb250ZW50JyBvbkNsaWNrPXt0aGlzLl9oYW5kbGVMaW5lQ2xpY2t9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyTGluZUNvbnRlbnQoKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyQWN0aW9ucygpfVxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHttaXhpbjogbGluZU1peGlufTtcclxuIl19