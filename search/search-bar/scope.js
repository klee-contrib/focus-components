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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdERPTSIsInJlcXVpcmUiLCJ1dWlkIiwiZmluZCIsInVuaXF1ZUlkIiwiRHJvcGRvd24iLCJjb21wb25lbnQiLCJzY29wZU1peGluIiwiZGlzcGxheU5hbWUiLCJnZXREZWZhdWx0UHJvcHMiLCJsaXN0IiwicHJvcFR5cGVzIiwiYXJyYXkiLCJpc1JlcXVpcmVkIiwidmFsdWUiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJudW1iZXIiLCJjb21wb25lbnRXaWxsTW91bnQiLCJzY29wZXNJZCIsImNvbXBvbmVudERpZE1vdW50IiwiZmluZERPTU5vZGUiLCJyZWZzIiwic2NvcGVEcm9wZG93biIsImNvbXBvbmVudEhhbmRsZXIiLCJ1cGdyYWRlRWxlbWVudCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImRvd25ncmFkZUVsZW1lbnRzIiwiX2dldFNjb3BlQ2xpY2tIYW5kbGVyIiwiY29kZSIsIm9uU2NvcGVTZWxlY3Rpb24iLCJwcm9wcyIsInBhcmVudFJlZiIsInBhcmVudCIsImRyb3Bkb3duRGl2IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjbGFzc05hbWUiLCJyZXBsYWNlIiwiX2dldEFjdGl2ZVNjb3BlIiwiYWN0aXZlU2NvcGUiLCJfcmVuZGVyU2NvcGVMaXN0Iiwic2NvcGVMaXN0IiwibGVuZ3RoIiwibWFwIiwic2NvcGUiLCJpY29uIiwibGFiZWwiLCJvdGhlclNjb3BlUHJvcHMiLCJzY29wZUlkIiwiaXNBY3RpdmUiLCJyZW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0FBRUE7Ozs7QUFHQTs7OztBQUNBOzs7O0FBTUE7Ozs7Ozs7O0FBVEEsSUFBTUEsV0FBV0MsUUFBUSxXQUFSLENBQWpCOztBQUlBLElBQU1DLE9BQU9ELFFBQVEsTUFBUixDQUFiO0FBQ0Es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QUEsWUFHUWdCLElBSFIsR0FHMkNOLFdBSDNDLENBR1FNLElBSFI7QUFBQSxZQUdjQyxLQUhkLEdBRzJDUCxXQUgzQyxDQUdjTyxLQUhkO0FBQUEsWUFHd0JDLGVBSHhCLDRCQUcyQ1IsV0FIM0M7O0FBSUwsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFXLGtCQUFoQixFQUFtQyxLQUFJLFFBQXZDO0FBQ0k7QUFBQTtBQUFBLGtCQUFRLFdBQVUsMEJBQWxCLEVBQTZDLElBQUl0QixRQUFqRCxFQUEyRCxjQUFZWSxJQUF2RTtBQUNJLHlFQUFNLE1BQU1nQixRQUFRaEIsSUFBcEIsSUFBOEJrQixlQUE5QixFQURKO0FBRUk7QUFBQTtBQUFBO0FBQU8sZ0RBQVVELEtBQVY7QUFBUDtBQUZKLGFBREo7QUFLSyxpQkFBS04sZ0JBQUw7QUFMTCxTQURKO0FBU0g7QUE3SGMsQ0FBbkI7QUErSEFXLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVEvQyxVQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dHJhbnNsYXRlfSBmcm9tICdmb2N1cy1jb3JlL3RyYW5zbGF0aW9uJztcclxuXHJcbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5jb25zdCBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xyXG5cclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB0eXBlIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuY29uc3QgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKTtcclxuY29uc3QgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC9jb2xsZWN0aW9uL2ZpbmQnKTtcclxuY29uc3Qge3VuaXF1ZUlkfSA9IHJlcXVpcmUoJ2xvZGFzaC91dGlsaXR5Jyk7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcbmltcG9ydCBJY29uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaWNvbic7XHJcbmNvbnN0IERyb3Bkb3duID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uL3NlbGVjdC1hY3Rpb24nKS5jb21wb25lbnQ7XHJcblxyXG5jb25zdCBzY29wZU1peGluID0ge1xyXG4gICAgLyoqXHJcbiAgICAqIENvbXBvbmVudCB0YWcgbmFtZS5cclxuICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ1Njb3BlJyxcclxuICAgIC8qKlxyXG4gICAgKiBDb21wb25lbnQgZGVmYXVsdCBwcm9wZXJ0aWVzLlxyXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBkZWZhdWx0IHByb3BzLlxyXG4gICAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsaXN0OiBbXVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFNjb3BlIHByb3BlcnR5IHZhbGlkYXRpb24uXHJcbiAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgbGlzdDogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBDYWxsZWQgd2hlbiBjb21wb25lbnQgd2lsbCBtb3VudC5cclxuICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zY29wZXNJZCA9IHVuaXF1ZUlkKCdzY29wZXNfJyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIENhbGxlZCB3aGVuIGNvbXBvbmVudCBpcyBtb3VudGVkLlxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGlmIChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuc2NvcGVEcm9wZG93bikpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50SGFuZGxlci51cGdyYWRlRWxlbWVudChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuc2NvcGVEcm9wZG93bikpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQ29tcG9uZW50IHdpbGwgcmVjZWl2ZSBwcm9wcy5cclxuICAgICogQHBhcmFtIHtPYmplY3R9IG5leHRQcm9wcyB0aGUgbmV4dCBwcm9wc1xyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICAgICAgaWYgKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5zY29wZURyb3Bkb3duKSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnRIYW5kbGVyLnVwZ3JhZGVFbGVtZW50KFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5zY29wZURyb3Bkb3duKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBDYWxsZWQgYmVmb3JlIGNvbXBvbmVudCBpcyB1bm1vdW50ZWQuXHJcbiAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgaWYgKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5zY29wZURyb3Bkb3duKSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnRIYW5kbGVyLmRvd25ncmFkZUVsZW1lbnRzKFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5zY29wZURyb3Bkb3duKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIHNjb3BlIGNsaWNrIGhhbmRsZXIsIGJhc2VkIG9uIHRoZSBzY29wZSBnaXZlbiBhcyBhbiBhcmd1bWVudC5cclxuICAgICogQHBhcmFtICB7U3RyaW5nfSBjb2RlICAgdGhlIGNsaWNrZWQgc2NvcGUncyBjb2RlXHJcbiAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSAgdGhlIHNjb3BlIGNsaWNrIGhhbmRsZXJcclxuICAgICovXHJcbiAgICBfZ2V0U2NvcGVDbGlja0hhbmRsZXIoe2NvZGV9KSB7XHJcbiAgICAgICAgY29uc3Qge29uU2NvcGVTZWxlY3Rpb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAob25TY29wZVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgb25TY29wZVNlbGVjdGlvbihjb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBGaXggTURMIGlzc3VlIHdpdGggY2xvc2luZyBhIGRyb3Bkb3duXHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudFJlZiA9IHRoaXMucmVmcy5wYXJlbnQ7XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnRSZWYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duRGl2ID0gcGFyZW50UmVmLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXTtcclxuICAgICAgICAgICAgICAgIGRyb3Bkb3duRGl2LmNsYXNzTmFtZSA9IGRyb3Bkb3duRGl2LmNsYXNzTmFtZS5yZXBsYWNlKCcgaXMtdmlzaWJsZScsICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgX2dldEFjdGl2ZVNjb3BlKCkge1xyXG4gICAgICAgIGNvbnN0IHtsaXN0LCB2YWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVNjb3BlID0gZmluZChsaXN0LCB7Y29kZTogdmFsdWV9KTtcclxuICAgICAgICByZXR1cm4gYWN0aXZlU2NvcGUgfHwge307XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgc2NvcGUgbGlzdCBpZiBpdCBpcyBkZXBsb3llZFxyXG4gICAgKiBAcmV0dXJuIHtIVE1MfSB0aGUgcmVuZGVyZWQgc2NvcGUgbGlzdFxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJTY29wZUxpc3QoKSB7XHJcbiAgICAgICAgY29uc3Qge3Njb3Blc0lkfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3Qge2xpc3Q6IHNjb3BlTGlzdCwgdmFsdWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXsnbWRsLW1lbnUgbWRsLW1lbnUtLWJvdHRvbS1sZWZ0IG1kbC1qcy1tZW51IG1kbC1qcy1yaXBwbGUtZWZmZWN0J30gZGF0YS1mb2N1cz0nc2VhcmNoLWJhci1zY29wZXMnIGh0bWxGb3I9e3Njb3Blc0lkfSByZWY9J3Njb3BlRHJvcGRvd24nPlxyXG4gICAgICAgICAgICAgICAgezAgPCBzY29wZUxpc3QubGVuZ3RoICYmIHNjb3BlTGlzdC5tYXAoc2NvcGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtjb2RlLCBpY29uLCBsYWJlbCwgLi4ub3RoZXJTY29wZVByb3BzfSA9IHNjb3BlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjb3BlSWQgPSB1bmlxdWVJZCgnc2NvcGVzXycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gdmFsdWUgPT09IGNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT0nbWRsLW1lbnVfX2l0ZW0nIGRhdGEtYWN0aXZlPXtpc0FjdGl2ZX0ga2V5PXtzY29wZS5jb2RlIHx8IHNjb3BlSWR9IGRhdGEtc2NvcGU9e3Njb3BlLmNvZGUgfHwgc2NvcGVJZH0gb25DbGljaz17dGhpcy5fZ2V0U2NvcGVDbGlja0hhbmRsZXIoc2NvcGUpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzY29wZS5jb2RlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT17aWNvbiB8fCBjb2RlfSB7Li4ub3RoZXJTY29wZVByb3BzfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57dHJhbnNsYXRlKGxhYmVsKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgezAgPT09IHNjb3BlTGlzdC5sZW5ndGggJiZcclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPSdtZGwtbWVudV9faXRlbSc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0cmFuc2xhdGUoJ3Njb3Blcy5lbXB0eScpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBjb21wbGV0ZSBzY29wZSBlbGVtZW50LlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gVGhlIGpzeCBlbGVtZW50LlxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7c2NvcGVzSWR9ID0gdGhpcztcclxuICAgICAgICBjb25zdCBhY3RpdmVTY29wZSA9IHRoaXMuX2dldEFjdGl2ZVNjb3BlKCk7XHJcbiAgICAgICAgY29uc3Qge2NvZGUsIGljb24sIGxhYmVsLCAuLi5vdGhlclNjb3BlUHJvcHN9ID0gYWN0aXZlU2NvcGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzZWFyY2gtYmFyLXNjb3BlJyByZWY9J3BhcmVudCc+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nbWRsLWJ1dHRvbiBtZGwtanMtYnV0dG9uJyBpZD17c2NvcGVzSWR9IGRhdGEtc2NvcGU9e2NvZGV9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9e2ljb24gfHwgY29kZX0gey4uLm90aGVyU2NvcGVQcm9wc30vPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0cmFuc2xhdGUobGFiZWwpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlclNjb3BlTGlzdCgpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoc2NvcGVNaXhpbik7XHJcbiJdfQ==