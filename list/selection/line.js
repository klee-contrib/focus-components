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

var _i18n = require('../../common/i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lineMixin = {
    /**
    * React component name.
    */
    displayName: 'SelectionLine',

    /**
    * Mixin dependancies.
    */
    mixins: [_i18n.mixin, _definition2.default, _referenceProperty2.default, _builtInComponents2.default],

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJsaW5lTWl4aW4iLCJkaXNwbGF5TmFtZSIsIm1peGlucyIsImdldERlZmF1bHRQcm9wcyIsImlzU2VsZWN0aW9uIiwib3BlcmF0aW9uTGlzdCIsInByb3BUeXBlcyIsImRhdGEiLCJpc1NlbGVjdGVkIiwib25MaW5lQ2xpY2siLCJvblNlbGVjdGlvbiIsImdldEluaXRpYWxTdGF0ZSIsInByb3BzIiwic2VsZWN0ZWRJbml0aWFsaXplciIsImNvbXBvbmVudFdpbGxNb3VudCIsIl9pc1NlbGVjdGlvbm5hYmxlIiwic2VsZWN0aW9ubmFibGVJbml0aWFsaXplciIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJ1bmRlZmluZWQiLCJzZXRTdGF0ZSIsImdldFZhbHVlIiwiaXRlbSIsInN0YXRlIiwiX2hhbmRsZVNlbGVjdGlvbkNsaWNrIiwiX2hhbmRsZUxpbmVDbGljayIsIl9yZW5kZXJTZWxlY3Rpb25Cb3giLCJzZWxlY3Rpb25DbGFzcyIsIl9yZW5kZXJMaW5lQ29udGVudCIsInRpdGxlIiwiYm9keSIsInJlbmRlckxpbmVDb250ZW50IiwiX3JlbmRlckFjdGlvbnMiLCJvcGVyYXRpb25QYXJhbSIsImxlbmd0aCIsInJlbmRlciIsInJlbmRlckxpbmUiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztrUUFBQTs7QUFNQTs7QUFLQTs7QUFUQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFJQTs7QUFDQTs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQU1BLFlBQVk7QUFDZDs7O0FBR0FDLGlCQUFhLGVBSkM7O0FBTWQ7OztBQUdBQyxZQUFRLDZGQVRNOztBQVdkOzs7O0FBSUFDLG1CQWZjLDZCQWVJO0FBQ2QsZUFBTztBQUNIQyx5QkFBYSxJQURWO0FBRUhDLDJCQUFlO0FBRlosU0FBUDtBQUlILEtBcEJhOzs7QUFzQmQ7Ozs7QUFJQUMsZUFBVztBQUNQQyxj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QkFGSjtBQUtLLHFCQUFLSSxjQUFMO0FBTEwsYUFESjtBQVNIO0FBQ0o7QUFqTGEsQ0FBbEI7O2tCQW9MZTtBQUNYSyxXQUFPcEM7QUFESSxDO1FBSUVvQyxLLEdBQWJwQyxTIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5cclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGlzRXF1YWwgZnJvbSAnbG9kYXNoJztcclxuXHJcbi8vIENvbXBvbmVudHNcclxuXHJcbmltcG9ydCB7Y29tcG9uZW50IGFzIENvbnRleHR1YWxBY3Rpb25zfSBmcm9tICcuLi9hY3Rpb24tY29udGV4dHVhbCc7XHJcbmltcG9ydCB7Q2hlY2tib3h9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW5wdXQnO1xyXG5cclxuLy8gTWl4aW5zXHJcblxyXG5pbXBvcnQgcmVmZXJlbmNlTWl4aW4gZnJvbSAnLi4vLi4vY29tbW9uL21peGluL3JlZmVyZW5jZS1wcm9wZXJ0eSc7XHJcbmltcG9ydCBkZWZpbml0aW9uTWl4aW4gZnJvbSAnLi4vLi4vY29tbW9uL21peGluL2RlZmluaXRpb24nO1xyXG5pbXBvcnQgYnVpbHRJbkNvbXBvbmVudHNNaXhpbiBmcm9tICcuLi9taXhpbi9idWlsdC1pbi1jb21wb25lbnRzJztcclxuaW1wb3J0IHttaXhpbiBhcyB0cmFuc2xhdGlvbk1peGlufSBmcm9tICcuLi8uLi9jb21tb24vaTE4bic7XHJcblxyXG5jb25zdCBsaW5lTWl4aW4gPSB7XHJcbiAgICAvKipcclxuICAgICogUmVhY3QgY29tcG9uZW50IG5hbWUuXHJcbiAgICAqL1xyXG4gICAgZGlzcGxheU5hbWU6ICdTZWxlY3Rpb25MaW5lJyxcclxuXHJcbiAgICAvKipcclxuICAgICogTWl4aW4gZGVwZW5kYW5jaWVzLlxyXG4gICAgKi9cclxuICAgIG1peGluczogWyB0cmFuc2xhdGlvbk1peGluLCBkZWZpbml0aW9uTWl4aW4sIHJlZmVyZW5jZU1peGluLCBidWlsdEluQ29tcG9uZW50c01peGluXSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBkZWZhdWx0IHByb3BzXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IGRlZmF1bHQgcHJvcHNcclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlzU2VsZWN0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb25MaXN0OiB7fVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBsaW5lIHByb3BlcnR5IHZhbGlkYXRpb24uXHJcbiAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgZGF0YTogdHlwZXMoJ29iamVjdCcpLFxyXG4gICAgICAgIGlzU2VsZWN0ZWQ6IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgaXNTZWxlY3Rpb246IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgb25MaW5lQ2xpY2s6IHR5cGVzKCdmdW5jJyksXHJcbiAgICAgICAgb25TZWxlY3Rpb246IHR5cGVzKCdmdW5jJyksXHJcbiAgICAgICAgb3BlcmF0aW9uTGlzdDogdHlwZXMoWydhcnJheScsICdvYmplY3QnXSlcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFN0YXRlIGluaXRpYWxpemF0aW9uLlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IGluaXRpYWwgc3RhdGVcclxuICAgICovXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgY29uc3Qge2RhdGF9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBsZXQge2lzU2VsZWN0ZWR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEluaXRpYWxpemVyKSB7IC8vIHRoaXMgYWxsb3dzIHRvIGluaXRpYXRlIGEgZGF0YSBzcGVjaWZpYyB2YWx1ZSBmb3IgaXNTZWxlY3RlZFxyXG4gICAgICAgICAgICBpc1NlbGVjdGVkID0gdGhpcy5zZWxlY3RlZEluaXRpYWxpemVyKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpc1NlbGVjdGVkOiBpc1NlbGVjdGVkIHx8IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCZWZvcmUgY29tcG9uZW50IGlzIG1vdW50ZWQuXHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICBjb25zdCB7ZGF0YSwgaXNTZWxlY3Rpb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICB0aGlzLl9pc1NlbGVjdGlvbm5hYmxlID0gaXNTZWxlY3Rpb247XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9ubmFibGVJbml0aWFsaXplcikge1xyXG4gICAgICAgICAgICB0aGlzLl9pc1NlbGVjdGlvbm5hYmxlID0gdGhpcy5zZWxlY3Rpb25uYWJsZUluaXRpYWxpemVyKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21wb25lbnQgd2lsbCByZWNlaXZlIHByb3BzXHJcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IG5leHRQcm9wcyBuZXcgY29tcG9uZW50J3MgcHJvcHNcclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh7aXNTZWxlY3RlZCwgZGF0YX0pIHtcclxuICAgICAgICBpZiAoaXNFcXVhbChkYXRhLHRoaXMucHJvcHMuZGF0YSkpIHtcclxuICAgICAgICAgICAgaWYgKGlzU2VsZWN0ZWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNTZWxlY3RlZH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNTZWxlY3RlZDogZmFsc2V9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIGxpbmUgdmFsdWUuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gdGhlIGxpbmUgdmFsdWVcclxuICAgICovXHJcbiAgICBnZXRWYWx1ZSgpIHtcclxuICAgICAgICBjb25zdCB7ZGF0YTogaXRlbX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtpc1NlbGVjdGVkfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIHtpdGVtLCBpc1NlbGVjdGVkfTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFNlbGVjdGlvbiBDbGljayBoYW5kbGVyLlxyXG4gICAgKi9cclxuICAgIF9oYW5kbGVTZWxlY3Rpb25DbGljaygpIHtcclxuICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gIXRoaXMuc3RhdGUuaXNTZWxlY3RlZDtcclxuICAgICAgICBjb25zdCB7ZGF0YSwgb25TZWxlY3Rpb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc1NlbGVjdGVkfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAob25TZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG9uU2VsZWN0aW9uKGRhdGEsIGlzU2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBMaW5lIENsaWNrIGhhbmRsZXIuXHJcbiAgICAqL1xyXG4gICAgX2hhbmRsZUxpbmVDbGljaygpIHtcclxuICAgICAgICBjb25zdCB7ZGF0YSwgb25MaW5lQ2xpY2t9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAob25MaW5lQ2xpY2spIHtcclxuICAgICAgICAgICAgb25MaW5lQ2xpY2soZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBsZWZ0IGJveCBmb3Igc2VsZWN0aW9uXHJcbiAgICAqIEByZXR1cm4ge1hNTH0gdGhlIHJlbmRlcmVkIHNlbGVjdGlvbiBib3hcclxuICAgICovXHJcbiAgICBfcmVuZGVyU2VsZWN0aW9uQm94KCkge1xyXG4gICAgICAgIGNvbnN0IHtpc1NlbGVjdGVkfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzU2VsZWN0aW9ubmFibGUpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uQ2xhc3MgPSBpc1NlbGVjdGVkID8gJ3NlbGVjdGVkJyA6ICduby1zZWxlY3Rpb24nO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BzbC1zZWxlY3Rpb24gJHtzZWxlY3Rpb25DbGFzc31gfT5cclxuICAgICAgICAgICAgICAgICAgICA8Q2hlY2tib3ggb25DaGFuZ2U9e3RoaXMuX2hhbmRsZVNlbGVjdGlvbkNsaWNrfSB2YWx1ZT17aXNTZWxlY3RlZH0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogcmVuZGVyIGNvbnRlbnQgZm9yIGEgbGluZS5cclxuICAgICogQHJldHVybiB7WE1MfSB0aGUgcmVuZGVyZWQgbGluZSBjb250ZW50XHJcbiAgICAqL1xyXG4gICAgX3JlbmRlckxpbmVDb250ZW50KCkge1xyXG4gICAgICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3RpdGxlLCBib2R5fSA9IGRhdGE7XHJcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyTGluZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTGluZUNvbnRlbnQoZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj57dGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj57Ym9keX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciBhY3Rpb25zIHdoaWNoIGNhbiBiZSBhcHBsaWVkIG9uIHRoZSBsaW5lXHJcbiAgICAqIEByZXR1cm4ge1hNTH0gdGhlIHJlbmRlcmVkIGFjdGlvbnNcclxuICAgICovXHJcbiAgICBfcmVuZGVyQWN0aW9ucygpIHtcclxuICAgICAgICBjb25zdCBwcm9wcyA9IHtvcGVyYXRpb25QYXJhbTogdGhpcy5wcm9wcy5kYXRhLCAuLi50aGlzLnByb3BzfTtcclxuICAgICAgICBpZiAoMCA8IHByb3BzLm9wZXJhdGlvbkxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2wtYWN0aW9ucyc+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbnRleHR1YWxBY3Rpb25zIHsuLi5wcm9wc30vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIGxpbmUgaW4gbGlzdC5cclxuICAgICogIEByZXR1cm4ge1hNTH0gdGhlIHJlbmRlcmVkIGxpbmVcclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyTGluZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJMaW5lKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxsaSBkYXRhLWZvY3VzPSdzbC1saW5lJz5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyU2VsZWN0aW9uQm94KCl9XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3NsLWNvbnRlbnQnIG9uQ2xpY2s9e3RoaXMuX2hhbmRsZUxpbmVDbGlja30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJMaW5lQ29udGVudCgpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJBY3Rpb25zKCl9XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG1peGluOiBsaW5lTWl4aW5cclxufVxyXG5leHBvcnQge1xyXG4gICAgbGluZU1peGluIGFzIG1peGluIFxyXG59XHJcbiJdfQ==