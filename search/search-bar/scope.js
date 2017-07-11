'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _translation = require('focus-core/translation');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _icon = require('../../components/icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ReactDOM = require('react-dom');

var uuid = require('uuid');
var find = require('lodash/collection/find');

var _require = require('lodash/utility'),
    uniqueId = _require.uniqueId;

// Components


var Dropdown = require('../../common/select-action').component;

var scopeMixin = {
    /**
    * Component tag name.
    * @type {String}
    */
    displayName: 'Scope',
    /**
    * Component default properties.
    * @return {Object} the default props.
    */
    getDefaultProps: function getDefaultProps() {
        return {
            list: []
        };
    },

    /**
    * Scope property validation.
    * @type {Object}
    */
    propTypes: {
        list: _react.PropTypes.array.isRequired,
        value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
    },
    /**
    * Called when component will mount.
    */
    componentWillMount: function componentWillMount() {
        this.scopesId = uniqueId('scopes_');
    },

    /**
    * Called when component is mounted.
    */
    componentDidMount: function componentDidMount() {
        if (ReactDOM.findDOMNode(this.refs.scopeDropdown)) {
            componentHandler.upgradeElement(ReactDOM.findDOMNode(this.refs.scopeDropdown));
        }
    },

    /**
    * Component will receive props.
    * @param {Object} nextProps the next props
    */
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (ReactDOM.findDOMNode(this.refs.scopeDropdown)) {
            componentHandler.upgradeElement(ReactDOM.findDOMNode(this.refs.scopeDropdown));
        }
    },

    /**
    * Called before component is unmounted.
    */
    componentWillUnmount: function componentWillUnmount() {
        if (ReactDOM.findDOMNode(this.refs.scopeDropdown)) {
            componentHandler.downgradeElements(ReactDOM.findDOMNode(this.refs.scopeDropdown));
        }
    },

    /**
    * Get the scope click handler, based on the scope given as an argument.
    * @param  {String} code   the clicked scope's code
    * @return {Function}  the scope click handler
    */
    _getScopeClickHandler: function _getScopeClickHandler(_ref) {
        var _this = this;

        var code = _ref.code;
        var onScopeSelection = this.props.onScopeSelection;

        return function () {
            if (onScopeSelection) {
                onScopeSelection(code);
            }
            // Fix MDL issue with closing a dropdown
            var parentRef = _this.refs.parent;
            if (parentRef) {
                var dropdownDiv = parentRef.getElementsByTagName('div')[0];
                dropdownDiv.className = dropdownDiv.className.replace(' is-visible', '');
            }
        };
    },
    _getActiveScope: function _getActiveScope() {
        var _props = this.props,
            list = _props.list,
            value = _props.value;

        var activeScope = find(list, { code: value });
        return activeScope || {};
    },

    /**
    * Render the scope list if it is deployed
    * @return {HTML} the rendered scope list
    */
    _renderScopeList: function _renderScopeList() {
        var _this2 = this;

        var scopesId = this.scopesId;
        var _props2 = this.props,
            scopeList = _props2.list,
            value = _props2.value;

        return _react2.default.createElement(
            'ul',
            { className: 'mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect', 'data-focus': 'search-bar-scopes', htmlFor: scopesId, ref: 'scopeDropdown' },
            0 < scopeList.length && scopeList.map(function (scope) {
                var code = scope.code,
                    icon = scope.icon,
                    label = scope.label,
                    otherScopeProps = _objectWithoutProperties(scope, ['code', 'icon', 'label']);

                var scopeId = uniqueId('scopes_');
                var isActive = value === code;
                return _react2.default.createElement(
                    'li',
                    { className: 'mdl-menu__item', 'data-active': isActive, key: scope.code || scopeId, 'data-scope': scope.code || scopeId, onClick: _this2._getScopeClickHandler(scope) },
                    scope.code && _react2.default.createElement(_icon2.default, _extends({ name: icon || code }, otherScopeProps)),
                    _react2.default.createElement(
                        'span',
                        null,
                        (0, _translation.translate)(label)
                    )
                );
            }),
            0 === scopeList.length && _react2.default.createElement(
                'li',
                { className: 'mdl-menu__item' },
                (0, _translation.translate)('scopes.empty')
            )
        );
    },

    /**
    * Render the complete scope element.
    * @return {object} - The jsx element.
    */
    render: function render() {
        var scopesId = this.scopesId;

        var activeScope = this._getActiveScope();

        var code = activeScope.code,
            icon = activeScope.icon,
            label = activeScope.label,
            otherScopeProps = _objectWithoutProperties(activeScope, ['code', 'icon', 'label']);

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'search-bar-scope', ref: 'parent' },
            _react2.default.createElement(
                'button',
                { className: 'mdl-button mdl-js-button', id: scopesId, 'data-scope': code },
                _react2.default.createElement(_icon2.default, _extends({ name: icon || code }, otherScopeProps)),
                _react2.default.createElement(
                    'span',
                    null,
                    (0, _translation.translate)(label)
                )
            ),
            this._renderScopeList()
        );
    }
};
module.exports = (0, _builder2.default)(scopeMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdERPTSIsInJlcXVpcmUiLCJ1dWlkIiwiZmluZCIsInVuaXF1ZUlkIiwiRHJvcGRvd24iLCJjb21wb25lbnQiLCJzY29wZU1peGluIiwiZGlzcGxheU5hbWUiLCJnZXREZWZhdWx0UHJvcHMiLCJsaXN0IiwicHJvcFR5cGVzIiwiYXJyYXkiLCJpc1JlcXVpcmVkIiwidmFsdWUiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJudW1iZXIiLCJjb21wb25lbnRXaWxsTW91bnQiLCJzY29wZXNJZCIsImNvbXBvbmVudERpZE1vdW50IiwiZmluZERPTU5vZGUiLCJyZWZzIiwic2NvcGVEcm9wZG93biIsImNvbXBvbmVudEhhbmRsZXIiLCJ1cGdyYWRlRWxlbWVudCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRvd25ncmFkZUVsZW1lbnRzIiwiX2dldFNjb3BlQ2xpY2tIYW5kbGVyIiwiY29kZSIsIm9uU2NvcGVTZWxlY3Rpb24iLCJwcm9wcyIsInBhcmVudFJlZiIsInBhcmVudCIsImRyb3Bkb3duRGl2IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjbGFzc05hbWUiLCJyZXBsYWNlIiwiX2dldEFjdGl2ZVNjb3BlIiwiYWN0aXZlU2NvcGUiLCJfcmVuZGVyU2NvcGVMaXN0Iiwic2NvcGVMaXN0IiwibGVuZ3RoIiwibWFwIiwic2NvcGUiLCJpY29uIiwibGFiZWwiLCJvdGhlclNjb3BlUHJvcHMiLCJzY29wZUlkIiwiaXNBY3RpdmUiLCJyZW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0FBRUE7Ozs7QUFHQTs7OztBQUNBOzs7O0FBTUE7Ozs7Ozs7O0FBVEEsSUFBTUEsV0FBV0MsUUFBUSxXQUFSLENBQWpCOztBQUlBLElBQU1DLE9BQU9ELFFBQVEsTUFBUixDQUFiO0FBQ0Es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QUEsWUFHUWdCLElBSFIsR0FHMkNOLFdBSDNDLENBR1FNLElBSFI7QUFBQSxZQUdjQyxLQUhkLEdBRzJDUCxXQUgzQyxDQUdjTyxLQUhkO0FBQUEsWUFHd0JDLGVBSHhCLDRCQUcyQ1IsV0FIM0M7O0FBSUwsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFXLGtCQUFoQixFQUFtQyxLQUFJLFFBQXZDO0FBQ0k7QUFBQTtBQUFBLGtCQUFRLFdBQVUsMEJBQWxCLEVBQTZDLElBQUl0QixRQUFqRCxFQUEyRCxjQUFZWSxJQUF2RTtBQUNJLHlFQUFNLE1BQU1nQixRQUFRaEIsSUFBcEIsSUFBOEJrQixlQUE5QixFQURKO0FBRUk7QUFBQTtBQUFBO0FBQU8sZ0RBQVVELEtBQVY7QUFBUDtBQUZKLGFBREo7QUFLSyxpQkFBS04sZ0JBQUw7QUFMTCxTQURKO0FBU0g7QUE3SGMsQ0FBbkI7QUErSEFXLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVEvQyxVQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRyYW5zbGF0ZSB9IGZyb20gJ2ZvY3VzLWNvcmUvdHJhbnNsYXRpb24nO1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuY29uc3QgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcclxuXHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmNvbnN0IHV1aWQgPSByZXF1aXJlKCd1dWlkJyk7XHJcbmNvbnN0IGZpbmQgPSByZXF1aXJlKCdsb2Rhc2gvY29sbGVjdGlvbi9maW5kJyk7XHJcbmNvbnN0IHt1bmlxdWVJZH0gPSByZXF1aXJlKCdsb2Rhc2gvdXRpbGl0eScpO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5pbXBvcnQgSWNvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2ljb24nO1xyXG5jb25zdCBEcm9wZG93biA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi9zZWxlY3QtYWN0aW9uJykuY29tcG9uZW50O1xyXG5cclxuY29uc3Qgc2NvcGVNaXhpbiA9IHtcclxuICAgIC8qKlxyXG4gICAgKiBDb21wb25lbnQgdGFnIG5hbWUuXHJcbiAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZGlzcGxheU5hbWU6ICdTY29wZScsXHJcbiAgICAvKipcclxuICAgICogQ29tcG9uZW50IGRlZmF1bHQgcHJvcGVydGllcy5cclxuICAgICogQHJldHVybiB7T2JqZWN0fSB0aGUgZGVmYXVsdCBwcm9wcy5cclxuICAgICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGlzdDogW11cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBTY29wZSBwcm9wZXJ0eSB2YWxpZGF0aW9uLlxyXG4gICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIGxpc3Q6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSlcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQ2FsbGVkIHdoZW4gY29tcG9uZW50IHdpbGwgbW91bnQuXHJcbiAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuc2NvcGVzSWQgPSB1bmlxdWVJZCgnc2NvcGVzXycpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBDYWxsZWQgd2hlbiBjb21wb25lbnQgaXMgbW91bnRlZC5cclxuICAgICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBpZiAoUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnNjb3BlRHJvcGRvd24pKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudEhhbmRsZXIudXBncmFkZUVsZW1lbnQoUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLnNjb3BlRHJvcGRvd24pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIENvbXBvbmVudCB3aWxsIHJlY2VpdmUgcHJvcHMuXHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBuZXh0UHJvcHMgdGhlIG5leHQgcHJvcHNcclxuICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgICAgIGlmIChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuc2NvcGVEcm9wZG93bikpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50SGFuZGxlci51cGdyYWRlRWxlbWVudChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuc2NvcGVEcm9wZG93bikpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQ2FsbGVkIGJlZm9yZSBjb21wb25lbnQgaXMgdW5tb3VudGVkLlxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGlmIChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuc2NvcGVEcm9wZG93bikpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50SGFuZGxlci5kb3duZ3JhZGVFbGVtZW50cyhSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuc2NvcGVEcm9wZG93bikpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSBzY29wZSBjbGljayBoYW5kbGVyLCBiYXNlZCBvbiB0aGUgc2NvcGUgZ2l2ZW4gYXMgYW4gYXJndW1lbnQuXHJcbiAgICAqIEBwYXJhbSAge1N0cmluZ30gY29kZSAgIHRoZSBjbGlja2VkIHNjb3BlJ3MgY29kZVxyXG4gICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gIHRoZSBzY29wZSBjbGljayBoYW5kbGVyXHJcbiAgICAqL1xyXG4gICAgX2dldFNjb3BlQ2xpY2tIYW5kbGVyKHtjb2RlfSkge1xyXG4gICAgICAgIGNvbnN0IHtvblNjb3BlU2VsZWN0aW9ufSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKG9uU2NvcGVTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG9uU2NvcGVTZWxlY3Rpb24oY29kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRml4IE1ETCBpc3N1ZSB3aXRoIGNsb3NpbmcgYSBkcm9wZG93blxyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnRSZWYgPSB0aGlzLnJlZnMucGFyZW50O1xyXG4gICAgICAgICAgICBpZiAocGFyZW50UmVmKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkcm9wZG93bkRpdiA9IHBhcmVudFJlZi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF07XHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bkRpdi5jbGFzc05hbWUgPSBkcm9wZG93bkRpdi5jbGFzc05hbWUucmVwbGFjZSgnIGlzLXZpc2libGUnLCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIF9nZXRBY3RpdmVTY29wZSgpIHtcclxuICAgICAgICBjb25zdCB7bGlzdCwgdmFsdWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBhY3RpdmVTY29wZSA9IGZpbmQobGlzdCwgeyBjb2RlOiB2YWx1ZSB9KTtcclxuICAgICAgICByZXR1cm4gYWN0aXZlU2NvcGUgfHwge307XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgc2NvcGUgbGlzdCBpZiBpdCBpcyBkZXBsb3llZFxyXG4gICAgKiBAcmV0dXJuIHtIVE1MfSB0aGUgcmVuZGVyZWQgc2NvcGUgbGlzdFxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJTY29wZUxpc3QoKSB7XHJcbiAgICAgICAgY29uc3Qge3Njb3Blc0lkfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3Qge2xpc3Q6IHNjb3BlTGlzdCwgdmFsdWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXsnbWRsLW1lbnUgbWRsLW1lbnUtLWJvdHRvbS1sZWZ0IG1kbC1qcy1tZW51IG1kbC1qcy1yaXBwbGUtZWZmZWN0J30gZGF0YS1mb2N1cz0nc2VhcmNoLWJhci1zY29wZXMnIGh0bWxGb3I9e3Njb3Blc0lkfSByZWY9J3Njb3BlRHJvcGRvd24nPlxyXG4gICAgICAgICAgICAgICAgezAgPCBzY29wZUxpc3QubGVuZ3RoICYmIHNjb3BlTGlzdC5tYXAoc2NvcGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtjb2RlLCBpY29uLCBsYWJlbCwgLi4ub3RoZXJTY29wZVByb3BzfSA9IHNjb3BlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjb3BlSWQgPSB1bmlxdWVJZCgnc2NvcGVzXycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gdmFsdWUgPT09IGNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT0nbWRsLW1lbnVfX2l0ZW0nIGRhdGEtYWN0aXZlPXtpc0FjdGl2ZX0ga2V5PXtzY29wZS5jb2RlIHx8IHNjb3BlSWR9IGRhdGEtc2NvcGU9e3Njb3BlLmNvZGUgfHwgc2NvcGVJZH0gb25DbGljaz17dGhpcy5fZ2V0U2NvcGVDbGlja0hhbmRsZXIoc2NvcGUpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzY29wZS5jb2RlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT17aWNvbiB8fCBjb2RlfSB7Li4ub3RoZXJTY29wZVByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3RyYW5zbGF0ZShsYWJlbCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIHswID09PSBzY29wZUxpc3QubGVuZ3RoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT0nbWRsLW1lbnVfX2l0ZW0nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHJhbnNsYXRlKCdzY29wZXMuZW1wdHknKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgY29tcGxldGUgc2NvcGUgZWxlbWVudC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBqc3ggZWxlbWVudC5cclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge3Njb3Blc0lkfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlU2NvcGUgPSB0aGlzLl9nZXRBY3RpdmVTY29wZSgpO1xyXG4gICAgICAgIGNvbnN0IHtjb2RlLCBpY29uLCBsYWJlbCwgLi4ub3RoZXJTY29wZVByb3BzfSA9IGFjdGl2ZVNjb3BlO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nc2VhcmNoLWJhci1zY29wZScgcmVmPSdwYXJlbnQnPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J21kbC1idXR0b24gbWRsLWpzLWJ1dHRvbicgaWQ9e3Njb3Blc0lkfSBkYXRhLXNjb3BlPXtjb2RlfT5cclxuICAgICAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPXtpY29uIHx8IGNvZGV9IHsuLi5vdGhlclNjb3BlUHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3RyYW5zbGF0ZShsYWJlbCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyU2NvcGVMaXN0KCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihzY29wZU1peGluKTtcclxuIl19