'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var PropTypes = React.PropTypes;


var iconMixin = {
    displayName: 'Icon',
    getDefaultProps: function getDefaultProps() {
        return {
            name: '',
            library: 'material'
        };
    },
    componentWillMount: function componentWillMount() {
        console.warn('FocusComponents v0.15: the \'Icon\' component from FocusComponents.common is deprecated, please use FocusComponents.components.Icon');
    },

    propTypes: {
        handleOnClick: PropTypes.func,
        library: PropTypes.oneOf(['material', 'font-awesome', 'font-custom']),
        name: PropTypes.string
    },
    /**
    * Render the img.
    * @returns {XML} Html code.
    */
    render: function renderIcon() {
        var _props = this.props,
            name = _props.name,
            library = _props.library,
            onClick = _props.onClick,
            style = _props.style;

        switch (library) {
            case 'material':
                return React.createElement(
                    'i',
                    _extends({ className: 'material-icons', onClick: onClick }, style),
                    name
                );
            case 'font-awesome':
                var faCss = 'fa fa-' + name;
                return React.createElement('i', _extends({ className: faCss, onClick: onClick }, style));
            case 'font-custom':
                return React.createElement('span', { className: 'icon-' + name });
            default:
                return null;
        }
    }
};

module.exports = (0, _builder2.default)(iconMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJQcm9wVHlwZXMiLCJpY29uTWl4aW4iLCJkaXNwbGF5TmFtZSIsImdldERlZmF1bHRQcm9wcyIsIm5hbWUiLCJsaWJyYXJ5IiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29uc29sZSIsIndhcm4iLCJwcm9wVHlwZXMiLCJoYW5kbGVPbkNsaWNrIiwiZnVuYyIsIm9uZU9mIiwic3RyaW5nIiwicmVuZGVyIiwicmVuZGVySWNvbiIsInByb3BzIiwib25DbGljayIsInN0eWxlIiwiZmFDc3MiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFFQTs7Ozs7O0FBREEsSUFBTUEsUUFBUUMsUUFBUSxPQUFSLENBQWQ7SUFFT0MsUyxHQUFhRixLLENBQWJFLFM7OztBQUVQLElBQU1DLFlBQVk7QUFDZEMsaUJBQWEsTUFEQztBQUVkQyxtQkFGYyw2QkFFSTtBQUNkLGVBQU87QUFDSEMsa0JBQU0sRUFESDtBQUVIQyxxQkFBUztBQUZOLFNBQVA7QUFJSCxLQVBhO0FBUWRDLHNCQVJjLGdDQVFRO0FBQ2xCQyxnQkFBUUMsSUFBUixDQUFhLHFJQUFiO0FBQ0gsS0FWYTs7QUFXZEMsZUFBVztBQUNQQyx1QkFBZVYsVUFBVVcsSUFEbEI7QUFFUE4saUJBQVNMLFVBQVVZLEtBQVYsQ0FBZ0IsQ0FBQyxVQUFELEVBQWEsY0FBYixFQUE2QixhQUE3QixDQUFoQixDQUZGO0FBR1BSLGNBQU1KLFVBQVVhO0FBSFQsS0FYRztBQWdCZDs7OztBQUlBQyxZQUFRLFNBQVNDLFVBQVQsR0FBc0I7QUFBQSxxQkFDYyxLQUFLQyxLQURuQjtBQUFBLFlBQ25CWixJQURtQixVQUNuQkEsSUFEbUI7QUFBQSxZQUNiQyxPQURhLFVBQ2JBLE9BRGE7QUFBQSxZQUNKWSxPQURJLFVBQ0pBLE9BREk7QUFBQSxZQUNLQyxLQURMLFVBQ0tBLEtBREw7O0FBRTFCLGdCQUFRYixPQUFSO0FBQ0ksaUJBQUssVUFBTDtBQUNJLHVCQUFPO0FBQUE7QUFBQSwrQkFBRyxXQUFVLGdCQUFiLEVBQThCLFNBQVNZLE9BQXZDLElBQW9EQyxLQUFwRDtBQUE0RGQ7QUFBNUQsaUJBQVA7QUFDSixpQkFBSyxjQUFMO0FBQ0ksb0JBQU1lLG1CQUFpQmYsSUFBdkI7QUFDQSx1QkFBTyxvQ0FBRyxXQUFXZSxLQUFkLEVBQXFCLFNBQVNGLE9BQTlCLElBQTJDQyxLQUEzQyxFQUFQO0FBQ0osaUJBQUssYUFBTDtBQUNJLHVCQUFPLDhCQUFNLHFCQUFtQmQsSUFBekIsR0FBUDtBQUNKO0FBQ0ksdUJBQU8sSUFBUDtBQVRSO0FBV0g7QUFqQ2EsQ0FBbEI7O0FBb0NBZ0IsT0FBT0MsT0FBUCxHQUFpQix1QkFBUXBCLFNBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuY29uc3Qge1Byb3BUeXBlc30gPSBSZWFjdDtcclxuXHJcbmNvbnN0IGljb25NaXhpbiA9IHtcclxuICAgIGRpc3BsYXlOYW1lOiAnSWNvbicsXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAgICAgIGxpYnJhcnk6ICdtYXRlcmlhbCdcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdGb2N1c0NvbXBvbmVudHMgdjAuMTU6IHRoZSBcXCdJY29uXFwnIGNvbXBvbmVudCBmcm9tIEZvY3VzQ29tcG9uZW50cy5jb21tb24gaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBGb2N1c0NvbXBvbmVudHMuY29tcG9uZW50cy5JY29uJyk7XHJcbiAgICB9LFxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgaGFuZGxlT25DbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgbGlicmFyeTogUHJvcFR5cGVzLm9uZU9mKFsnbWF0ZXJpYWwnLCAnZm9udC1hd2Vzb21lJywgJ2ZvbnQtY3VzdG9tJ10pLFxyXG4gICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmdcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBpbWcuXHJcbiAgICAqIEByZXR1cm5zIHtYTUx9IEh0bWwgY29kZS5cclxuICAgICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlckljb24oKSB7XHJcbiAgICAgICAgY29uc3Qge25hbWUsIGxpYnJhcnksIG9uQ2xpY2ssIHN0eWxlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgc3dpdGNoIChsaWJyYXJ5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hdGVyaWFsJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJyBvbkNsaWNrPXtvbkNsaWNrfSB7Li4uc3R5bGV9PntuYW1lfTwvaT47XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZvbnQtYXdlc29tZSc6XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmYUNzcyA9IGBmYSBmYS0ke25hbWV9YDtcclxuICAgICAgICAgICAgICAgIHJldHVybiA8aSBjbGFzc05hbWU9e2ZhQ3NzfSBvbkNsaWNrPXtvbkNsaWNrfSB7Li4uc3R5bGV9PjwvaT47XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZvbnQtY3VzdG9tJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9e2BpY29uLSR7bmFtZX1gfT48L3NwYW4+O1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKGljb25NaXhpbik7XHJcbiJdfQ==