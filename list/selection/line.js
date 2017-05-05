'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mixin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Dependencies

// Components

// Mixins

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _actionContextual = require('../action-contextual');

var _input = require('../../components/input');

var _referenceProperty = require('../../common/mixin/reference-property');

var _referenceProperty2 = _interopRequireDefault(_referenceProperty);

var _definition = require('../../common/mixin/definition');

var _definition2 = _interopRequireDefault(_definition);

var _builtInComponents = require('../mixin/built-in-components');

var _builtInComponents2 = _interopRequireDefault(_builtInComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lineMixin = {
    /**
    * React component name.
    */
    displayName: 'SelectionLine',

    /**
    * Mixin dependancies.
    */
    mixins: [_definition2.default, _referenceProperty2.default, _builtInComponents2.default],

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

        if ((0, _lodash2.default)(data, this.props.data)) {
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
            return _react2.default.createElement(
                'div',
                { className: 'sl-selection ' + selectionClass },
                _react2.default.createElement(_input.Checkbox, { onChange: this._handleSelectionClick, value: isSelected })
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
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    title
                ),
                _react2.default.createElement(
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
            return _react2.default.createElement(
                'div',
                { className: 'sl-actions' },
                _react2.default.createElement(_actionContextual.component, props)
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
            return _react2.default.createElement(
                'li',
                { 'data-focus': 'sl-line' },
                this._renderSelectionBox(),
                _react2.default.createElement(
                    'div',
                    { className: 'sl-content', onClick: this._handleLineClick },
                    this._renderLineContent()
                ),
                this._renderActions()
            );
        }
    }
};

exports.default = {
    mixin: lineMixin
};
exports.mixin = lineMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJsaW5lTWl4aW4iLCJkaXNwbGF5TmFtZSIsIm1peGlucyIsImdldERlZmF1bHRQcm9wcyIsImlzU2VsZWN0aW9uIiwib3BlcmF0aW9uTGlzdCIsInByb3BUeXBlcyIsImRhdGEiLCJpc1NlbGVjdGVkIiwib25MaW5lQ2xpY2siLCJvblNlbGVjdGlvbiIsImdldEluaXRpYWxTdGF0ZSIsInByb3BzIiwic2VsZWN0ZWRJbml0aWFsaXplciIsImNvbXBvbmVudFdpbGxNb3VudCIsIl9pc1NlbGVjdGlvbm5hYmxlIiwic2VsZWN0aW9ubmFibGVJbml0aWFsaXplciIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJ1bmRlZmluZWQiLCJzZXRTdGF0ZSIsImdldFZhbHVlIiwiaXRlbSIsInN0YXRlIiwiX2hhbmRsZVNlbGVjdGlvbkNsaWNrIiwiX2hhbmRsZUxpbmVDbGljayIsIl9yZW5kZXJTZWxlY3Rpb25Cb3giLCJzZWxlY3Rpb25DbGFzcyIsIl9yZW5kZXJMaW5lQ29udGVudCIsInRpdGxlIiwiYm9keSIsInJlbmRlckxpbmVDb250ZW50IiwiX3JlbmRlckFjdGlvbnMiLCJvcGVyYXRpb25QYXJhbSIsImxlbmd0aCIsInJlbmRlciIsInJlbmRlckxpbmUiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztrUUFBQTs7QUFNQTs7QUFLQTs7QUFUQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFJQTs7QUFDQTs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFlBQVk7QUFDZDs7O0FBR0FDLGlCQUFhLGVBSkM7O0FBTWQ7OztBQUdBQyxZQUFRLGdGQVRNOztBQVdkOzs7O0FBSUFDLG1CQWZjLDZCQWVJO0FBQ2QsZUFBTztBQUNIQyx5QkFBYSxJQURWO0FBRUhDLDJCQUFlO0FBRlosU0FBUDtBQUlILEtBcEJhOzs7QUFzQmQ7Ozs7QUFJQUMsZUFBVztBQUNQQyxjQUFNLHFC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QUtLLHFCQUFLSSxjQUFMO0FBTEwsYUFESjtBQVNIO0FBQ0o7QUFqTGEsQ0FBbEI7O2tCQW9MZTtBQUNYSyxXQUFPcEM7QUFESSxDO1FBSUVvQyxLLEdBQWJwQyxTIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5cclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGlzRXF1YWwgZnJvbSAnbG9kYXNoJztcclxuXHJcbi8vIENvbXBvbmVudHNcclxuXHJcbmltcG9ydCB7Y29tcG9uZW50IGFzIENvbnRleHR1YWxBY3Rpb25zfSBmcm9tICcuLi9hY3Rpb24tY29udGV4dHVhbCc7XHJcbmltcG9ydCB7Q2hlY2tib3h9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5wdXQnO1xyXG5cclxuLy8gTWl4aW5zXHJcblxyXG5pbXBvcnQgcmVmZXJlbmNlTWl4aW4gZnJvbSAnLi4vLi4vY29tbW9uL21peGluL3JlZmVyZW5jZS1wcm9wZXJ0eSc7XHJcbmltcG9ydCBkZWZpbml0aW9uTWl4aW4gZnJvbSAnLi4vLi4vY29tbW9uL21peGluL2RlZmluaXRpb24nO1xyXG5pbXBvcnQgYnVpbHRJbkNvbXBvbmVudHNNaXhpbiBmcm9tICcuLi9taXhpbi9idWlsdC1pbi1jb21wb25lbnRzJztcclxuXHJcbmNvbnN0IGxpbmVNaXhpbiA9IHtcclxuICAgIC8qKlxyXG4gICAgKiBSZWFjdCBjb21wb25lbnQgbmFtZS5cclxuICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ1NlbGVjdGlvbkxpbmUnLFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBNaXhpbiBkZXBlbmRhbmNpZXMuXHJcbiAgICAqL1xyXG4gICAgbWl4aW5zOiBbIGRlZmluaXRpb25NaXhpbiwgcmVmZXJlbmNlTWl4aW4sIGJ1aWx0SW5Db21wb25lbnRzTWl4aW5dLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGRlZmF1bHQgcHJvcHNcclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gZGVmYXVsdCBwcm9wc1xyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaXNTZWxlY3Rpb246IHRydWUsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbkxpc3Q6IHt9XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIGxpbmUgcHJvcGVydHkgdmFsaWRhdGlvbi5cclxuICAgICogQHR5cGUge09iamVjdH1cclxuICAgICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBkYXRhOiB0eXBlcygnb2JqZWN0JyksXHJcbiAgICAgICAgaXNTZWxlY3RlZDogdHlwZXMoJ2Jvb2wnKSxcclxuICAgICAgICBpc1NlbGVjdGlvbjogdHlwZXMoJ2Jvb2wnKSxcclxuICAgICAgICBvbkxpbmVDbGljazogdHlwZXMoJ2Z1bmMnKSxcclxuICAgICAgICBvblNlbGVjdGlvbjogdHlwZXMoJ2Z1bmMnKSxcclxuICAgICAgICBvcGVyYXRpb25MaXN0OiB0eXBlcyhbJ2FycmF5JywgJ29iamVjdCddKVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogU3RhdGUgaW5pdGlhbGl6YXRpb24uXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gaW5pdGlhbCBzdGF0ZVxyXG4gICAgKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICBjb25zdCB7ZGF0YX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGxldCB7aXNTZWxlY3RlZH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5pdGlhbGl6ZXIpIHsgLy8gdGhpcyBhbGxvd3MgdG8gaW5pdGlhdGUgYSBkYXRhIHNwZWNpZmljIHZhbHVlIGZvciBpc1NlbGVjdGVkXHJcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkSW5pdGlhbGl6ZXIoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IGlzU2VsZWN0ZWQgfHwgZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJlZm9yZSBjb21wb25lbnQgaXMgbW91bnRlZC5cclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHtkYXRhLCBpc1NlbGVjdGlvbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHRoaXMuX2lzU2VsZWN0aW9ubmFibGUgPSBpc1NlbGVjdGlvbjtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25uYWJsZUluaXRpYWxpemVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzU2VsZWN0aW9ubmFibGUgPSB0aGlzLnNlbGVjdGlvbm5hYmxlSW5pdGlhbGl6ZXIoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbXBvbmVudCB3aWxsIHJlY2VpdmUgcHJvcHNcclxuICAgICAqIEBwYXJhbSAge29iamVjdH0gbmV4dFByb3BzIG5ldyBjb21wb25lbnQncyBwcm9wc1xyXG4gICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHtpc1NlbGVjdGVkLCBkYXRhfSkge1xyXG4gICAgICAgIGlmIChpc0VxdWFsKGRhdGEsdGhpcy5wcm9wcy5kYXRhKSkge1xyXG4gICAgICAgICAgICBpZiAoaXNTZWxlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc1NlbGVjdGVkfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc1NlbGVjdGVkOiBmYWxzZX0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgbGluZSB2YWx1ZS5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSB0aGUgbGluZSB2YWx1ZVxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlKCkge1xyXG4gICAgICAgIGNvbnN0IHtkYXRhOiBpdGVtfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge2lzU2VsZWN0ZWR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICByZXR1cm4ge2l0ZW0sIGlzU2VsZWN0ZWR9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogU2VsZWN0aW9uIENsaWNrIGhhbmRsZXIuXHJcbiAgICAqL1xyXG4gICAgX2hhbmRsZVNlbGVjdGlvbkNsaWNrKCkge1xyXG4gICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSAhdGhpcy5zdGF0ZS5pc1NlbGVjdGVkO1xyXG4gICAgICAgIGNvbnN0IHtkYXRhLCBvblNlbGVjdGlvbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzU2VsZWN0ZWR9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvblNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgb25TZWxlY3Rpb24oZGF0YSwgaXNTZWxlY3RlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIExpbmUgQ2xpY2sgaGFuZGxlci5cclxuICAgICovXHJcbiAgICBfaGFuZGxlTGluZUNsaWNrKCkge1xyXG4gICAgICAgIGNvbnN0IHtkYXRhLCBvbkxpbmVDbGlja30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChvbkxpbmVDbGljaykge1xyXG4gICAgICAgICAgICBvbkxpbmVDbGljayhkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGxlZnQgYm94IGZvciBzZWxlY3Rpb25cclxuICAgICogQHJldHVybiB7WE1MfSB0aGUgcmVuZGVyZWQgc2VsZWN0aW9uIGJveFxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJTZWxlY3Rpb25Cb3goKSB7XHJcbiAgICAgICAgY29uc3Qge2lzU2VsZWN0ZWR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZiAodGhpcy5faXNTZWxlY3Rpb25uYWJsZSkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb25DbGFzcyA9IGlzU2VsZWN0ZWQgPyAnc2VsZWN0ZWQnIDogJ25vLXNlbGVjdGlvbic7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHNsLXNlbGVjdGlvbiAke3NlbGVjdGlvbkNsYXNzfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxDaGVja2JveCBvbkNoYW5nZT17dGhpcy5faGFuZGxlU2VsZWN0aW9uQ2xpY2t9IHZhbHVlPXtpc1NlbGVjdGVkfS8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiByZW5kZXIgY29udGVudCBmb3IgYSBsaW5lLlxyXG4gICAgKiBAcmV0dXJuIHtYTUx9IHRoZSByZW5kZXJlZCBsaW5lIGNvbnRlbnRcclxuICAgICovXHJcbiAgICBfcmVuZGVyTGluZUNvbnRlbnQoKSB7XHJcbiAgICAgICAgY29uc3Qge2RhdGF9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7dGl0bGUsIGJvZHl9ID0gZGF0YTtcclxuICAgICAgICBpZiAodGhpcy5yZW5kZXJMaW5lQ29udGVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJMaW5lQ29udGVudChkYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2Pnt0aXRsZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2Pntib2R5fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIGFjdGlvbnMgd2hpY2ggY2FuIGJlIGFwcGxpZWQgb24gdGhlIGxpbmVcclxuICAgICogQHJldHVybiB7WE1MfSB0aGUgcmVuZGVyZWQgYWN0aW9uc1xyXG4gICAgKi9cclxuICAgIF9yZW5kZXJBY3Rpb25zKCkge1xyXG4gICAgICAgIGNvbnN0IHByb3BzID0ge29wZXJhdGlvblBhcmFtOiB0aGlzLnByb3BzLmRhdGEsIC4uLnRoaXMucHJvcHN9O1xyXG4gICAgICAgIGlmICgwIDwgcHJvcHMub3BlcmF0aW9uTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdzbC1hY3Rpb25zJz5cclxuICAgICAgICAgICAgICAgICAgICA8Q29udGV4dHVhbEFjdGlvbnMgey4uLnByb3BzfS8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgbGluZSBpbiBsaXN0LlxyXG4gICAgKiAgQHJldHVybiB7WE1MfSB0aGUgcmVuZGVyZWQgbGluZVxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAodGhpcy5yZW5kZXJMaW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckxpbmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGxpIGRhdGEtZm9jdXM9J3NsLWxpbmUnPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJTZWxlY3Rpb25Cb3goKX1cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2wtY29udGVudCcgb25DbGljaz17dGhpcy5faGFuZGxlTGluZUNsaWNrfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlckxpbmVDb250ZW50KCl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlckFjdGlvbnMoKX1cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgbWl4aW46IGxpbmVNaXhpblxyXG59XHJcbmV4cG9ydCB7XHJcbiAgICBsaW5lTWl4aW4gYXMgbWl4aW4gXHJcbn1cclxuIl19