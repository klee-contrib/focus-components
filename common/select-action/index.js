'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _translation = require('focus-core/translation');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dropdown = {

    /**
    * Display name.
    */
    displayName: 'Dropdown',
    /**
    * Default props.
    * @returns {object} Defauilt props.
    */
    getDefaultProps: function getDefaultProps() {
        return {
            position: 'right',
            iconProps: {
                name: 'more_vert'
            },
            shape: 'icon',
            operationList: []
        };
    },

    /**
    * Scope property validation.
    * @type {Object}
    */
    propTypes: {
        position: _react.PropTypes.string,
        iconProps: _react.PropTypes.object,
        operationList: _react.PropTypes.array,
        shape: _react.PropTypes.string
    },
    /**
     * Component will mount
     */
    componentWillMount: function componentWillMount() {
        this._htmlId = _uuid2.default.v4();
    },

    /**
    * Called when component is mounted.
    */
    componentDidMount: function componentDidMount() {
        if (0 !== this.props.operationList.length && _reactDom2.default.findDOMNode(this.refs.dropdown)) {
            componentHandler.upgradeElement(_reactDom2.default.findDOMNode(this.refs.dropdown));
        }
    },

    /**
     * Component will receive props.
     * @param {Object} nextProps the next props
     */
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (0 !== nextProps.operationList.length && _reactDom2.default.findDOMNode(this.refs.dropdown)) {
            componentHandler.upgradeElement(_reactDom2.default.findDOMNode(this.refs.dropdown));
        }
    },

    /**
    * Called before component is unmounted.
    */
    componentWillUnmount: function componentWillUnmount() {
        if (0 !== this.props.operationList.length && _reactDom2.default.findDOMNode(this.refs.dropdown)) {
            componentHandler.downgradeElements(_reactDom2.default.findDOMNode(this.refs.dropdown));
        }
    },

    /**
    * Handle action on selected item.
    * @param {function} action Action to call
    * @returns {function} Function called when item is selected.
    * @private
    */
    _handleAction: function _handleAction(action) {
        var _this = this;

        return function () {
            if (_this.props.operationParam) {
                action(_this.props.operationParam);
            } else {
                action();
            }
        };
    },

    /**
    * Render the component.
    * @returns  {XML} Htm code.
    */
    render: function render() {
        var _this2 = this;

        var _props = this.props,
            iconProps = _props.iconProps,
            operationList = _props.operationList,
            position = _props.position,
            shape = _props.shape;

        var id = this._htmlId;
        if (0 === operationList.length) {
            return null;
        }
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_button2.default, { icon: iconProps.name, id: id, isJs: true, shape: shape }),
            _react2.default.createElement(
                'ul',
                { className: 'mdl-menu mdl-menu--bottom-' + position + ' mdl-js-menu mdl-js-ripple-effect', htmlFor: id, ref: 'dropdown' },
                operationList.map(function (operation, idx) {
                    return _react2.default.createElement(
                        'li',
                        { className: 'mdl-menu__item ' + operation.style, key: idx, onClick: _this2._handleAction(operation.action) },
                        (0, _translation.translate)(operation.label)
                    );
                })
            )
        );
    }
};

module.exports = (0, _builder2.default)(Dropdown);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJEcm9wZG93biIsImRpc3BsYXlOYW1lIiwiZ2V0RGVmYXVsdFByb3BzIiwicG9zaXRpb24iLCJpY29uUHJvcHMiLCJuYW1lIiwic2hhcGUiLCJvcGVyYXRpb25MaXN0IiwicHJvcFR5cGVzIiwic3RyaW5nIiwib2JqZWN0IiwiYXJyYXkiLCJjb21wb25lbnRXaWxsTW91bnQiLCJfaHRtbElkIiwidjQiLCJjb21wb25lbnREaWRNb3VudCIsInByb3BzIiwibGVuZ3RoIiwiZmluZERPTU5vZGUiLCJyZWZzIiwiZHJvcGRvd24iLCJjb21wb25lbnRIYW5kbGVyIiwidXBncmFkZUVsZW1lbnQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJkb3duZ3JhZGVFbGVtZW50cyIsIl9oYW5kbGVBY3Rpb24iLCJhY3Rpb24iLCJvcGVyYXRpb25QYXJhbSIsInJlbmRlciIsImlkIiwibWFwIiwib3BlcmF0aW9uIiwiaWR4Iiwic3R5bGUiLCJsYWJlbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBR0EsSUFBTUEsV0FBVzs7QUFFYjs7O0FBR0FDLGlCQUFhLFVBTEE7QUFNYjs7OztBQUlBQyxtQkFWYSw2QkFVSztBQUNkLGVBQU87QUFDSEMsc0JBQVUsT0FEUDtBQUVIQyx1QkFBVztBQUNQQyxzQkFBTTtBQURDLGFBRlI7QUFLSEMsbUJBQU8sTUFMSjtBQU1IQywyQkFBZTtBQU5aLFNBQVA7QUFRSCxLQW5CWTs7QUFvQmI7Ozs7QUFJQUMsZUFBVztBQUNQTCxrQkFBVSxpQkFBVU0sTUFEYjtBQUVQTCxtQkFBVyxpQkFBVU0sTUFGZDtBQUdQSCx1QkFBZSxpQkFBVUksS0FIbEI7QUFJUEwsZUFBTyxpQkFBVUc7QUFKVixLQXhCRTtBQThCYjs7O0FBR0FHLHNCQWpDYSxnQ0FpQ1E7QUFDakIsYUFBS0MsT0FBTCxHQUFlLGVBQUtDLEVBQUwsRUFBZjtBQUNILEtBbkNZOztBQW9DYjs7O0FBR0FDLHFCQXZDYSwrQkF1Q087QUFDaEIsWUFBSSxNQUFNLEtBQUtDLEtBQUwsQ0FBV1QsYUFBWCxDQUF5QlUsTUFBL0IsSUFBeUMsbUJBQVNDLFdBQVQsQ0FBcUIsS0FBS0MsSUFBTCxDQUFVQyxRQUEvQixDQUE3QyxFQUF1RjtBQUNuRkMsNkJBQWlCQyxjQUFqQixDQUFnQyxtQkFBU0osV0FBVCxDQUFxQixLQUFLQyxJQUFMLENBQVVDLFFBQS9CLENBQWhDO0FBQ0g7QUFDSixLQTNDWTs7QUE0Q2I7Ozs7QUFJQUcsNkJBaERhLHFDQWdEYUMsU0FoRGIsRUFnRHdCO0FBQ2pDLFlBQUksTUFBTUEsVUFBVWpCLGFBQVYsQ0FBd0JVLE1BQTlCLElBQXdDLG1CQUFTQyxXQUFULENBQXFCLEtBQUtDLElBQUwsQ0FBVUMsUUFBL0IsQ0FBNUMsRUFBc0Y7QUFDbEZDLDZCQUFpQkMsY0FBakIsQ0FBZ0MsbUJBQVNKLFdBQVQsQ0FBcUIsS0FBS0MsSUFBTCxDQUFVQyxRQUEvQixDQUFoQztBQUNIO0FBQ0osS0FwRFk7O0FBcURiOzs7QUFHQUssd0JBeERhLGtDQXdEVTtBQUNuQixZQUFJLE1BQU0sS0FBS1QsS0FBTCxDQUFXVCxhQUFYLENBQXlCVSxNQUEvQixJQUF5QyxtQkFBU0MsV0FBVCxDQUFxQixLQUFLQyxJQUFMLENBQVVDLFFBQS9CLENBQTdDLEVBQXVGO0FBQ25GQyw2QkFBaUJLLGlCQUFqQixDQUFtQyxtQkFBU1IsV0FBVCxDQUFxQixLQUFLQyxJQUFMLENBQVVDLFFBQS9CLENBQW5DO0FBQ0g7QUFDSixLQTVEWTs7QUE2RGI7Ozs7OztBQU1BTyxpQkFuRWEseUJBbUVDQyxNQW5FRCxFQW1FUztBQUFBOztBQUNsQixlQUFPLFlBQU07QUFDVCxnQkFBSSxNQUFLWixLQUFMLENBQVdhLGNBQWYsRUFBK0I7QUFDM0JELHVCQUFPLE1BQUtaLEtBQUwsQ0FBV2EsY0FBbEI7QUFDSCxhQUZELE1BRU87QUFDSEQ7QUFDSDtBQUNKLFNBTkQ7QUFPSCxLQTNFWTs7QUE0RWI7Ozs7QUFJQUUsVUFoRmEsb0JBZ0ZKO0FBQUE7O0FBQUEscUJBQytDLEtBQUtkLEtBRHBEO0FBQUEsWUFDRVosU0FERixVQUNFQSxTQURGO0FBQUEsWUFDYUcsYUFEYixVQUNhQSxhQURiO0FBQUEsWUFDNEJKLFFBRDVCLFVBQzRCQSxRQUQ1QjtBQUFBLFlBQ3NDRyxLQUR0QyxVQUNzQ0EsS0FEdEM7O0FBRUwsWUFBTXlCLEtBQUssS0FBS2xCLE9BQWhCO0FBQ0EsWUFBSSxNQUFNTixjQUFjVSxNQUF4QixFQUFnQztBQUM1QixtQkFBTyxJQUFQO0FBQ0g7QUFDRCxlQUNJO0FBQUE7QUFBQTtBQUNJLDhEQUFRLE1BQU1iLFVBQVVDLElBQXhCLEVBQThCLElBQUkwQixFQUFsQyxFQUFzQyxVQUF0QyxFQUEyQyxPQUFPekIsS0FBbEQsR0FESjtBQUVJO0FBQUE7QUFBQSxrQkFBSSwwQ0FBd0NILFFBQXhDLHNDQUFKLEVBQXlGLFNBQVM0QixFQUFsRyxFQUFzRyxLQUFJLFVBQTFHO0FBQ0t4Qiw4QkFBY3lCLEdBQWQsQ0FBa0IsVUFBQ0MsU0FBRCxFQUFZQyxHQUFaLEVBQW9CO0FBQ25DLDJCQUNJO0FBQUE7QUFBQSwwQkFBSSwrQkFBNkJELFVBQVVFLEtBQTNDLEVBQW9ELEtBQUtELEdBQXpELEVBQThELFNBQVMsT0FBS1AsYUFBTCxDQUFtQk0sVUFBVUwsTUFBN0IsQ0FBdkU7QUFDSyxvREFBVUssVUFBVUcsS0FBcEI7QUFETCxxQkFESjtBQUtILGlCQU5BO0FBREw7QUFGSixTQURKO0FBY0g7QUFwR1ksQ0FBakI7O0FBdUdBQyxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRdEMsUUFBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQge3RyYW5zbGF0ZX0gZnJvbSAnZm9jdXMtY29yZS90cmFuc2xhdGlvbic7XHJcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xyXG5cclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2J1dHRvbic7XHJcblxyXG5cclxuY29uc3QgRHJvcGRvd24gPSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERpc3BsYXkgbmFtZS5cclxuICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ0Ryb3Bkb3duJyxcclxuICAgIC8qKlxyXG4gICAgKiBEZWZhdWx0IHByb3BzLlxyXG4gICAgKiBAcmV0dXJucyB7b2JqZWN0fSBEZWZhdWlsdCBwcm9wcy5cclxuICAgICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXHJcbiAgICAgICAgICAgIGljb25Qcm9wczoge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ21vcmVfdmVydCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2hhcGU6ICdpY29uJyxcclxuICAgICAgICAgICAgb3BlcmF0aW9uTGlzdDogW11cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBTY29wZSBwcm9wZXJ0eSB2YWxpZGF0aW9uLlxyXG4gICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIHBvc2l0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGljb25Qcm9wczogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgICBvcGVyYXRpb25MaXN0OiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgICAgICAgc2hhcGU6IFByb3BUeXBlcy5zdHJpbmdcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIENvbXBvbmVudCB3aWxsIG1vdW50XHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICB0aGlzLl9odG1sSWQgPSB1dWlkLnY0KCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIENhbGxlZCB3aGVuIGNvbXBvbmVudCBpcyBtb3VudGVkLlxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGlmICgwICE9PSB0aGlzLnByb3BzLm9wZXJhdGlvbkxpc3QubGVuZ3RoICYmIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5kcm9wZG93bikpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50SGFuZGxlci51cGdyYWRlRWxlbWVudChSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZHJvcGRvd24pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21wb25lbnQgd2lsbCByZWNlaXZlIHByb3BzLlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG5leHRQcm9wcyB0aGUgbmV4dCBwcm9wc1xyXG4gICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgICAgIGlmICgwICE9PSBuZXh0UHJvcHMub3BlcmF0aW9uTGlzdC5sZW5ndGggJiYgUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmRyb3Bkb3duKSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnRIYW5kbGVyLnVwZ3JhZGVFbGVtZW50KFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5kcm9wZG93bikpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQ2FsbGVkIGJlZm9yZSBjb21wb25lbnQgaXMgdW5tb3VudGVkLlxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGlmICgwICE9PSB0aGlzLnByb3BzLm9wZXJhdGlvbkxpc3QubGVuZ3RoICYmIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5kcm9wZG93bikpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50SGFuZGxlci5kb3duZ3JhZGVFbGVtZW50cyhSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuZHJvcGRvd24pKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEhhbmRsZSBhY3Rpb24gb24gc2VsZWN0ZWQgaXRlbS5cclxuICAgICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uIEFjdGlvbiB0byBjYWxsXHJcbiAgICAqIEByZXR1cm5zIHtmdW5jdGlvbn0gRnVuY3Rpb24gY2FsbGVkIHdoZW4gaXRlbSBpcyBzZWxlY3RlZC5cclxuICAgICogQHByaXZhdGVcclxuICAgICovXHJcbiAgICBfaGFuZGxlQWN0aW9uKGFjdGlvbikge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9wZXJhdGlvblBhcmFtKSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24odGhpcy5wcm9wcy5vcGVyYXRpb25QYXJhbSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50LlxyXG4gICAgKiBAcmV0dXJucyAge1hNTH0gSHRtIGNvZGUuXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtpY29uUHJvcHMsIG9wZXJhdGlvbkxpc3QsIHBvc2l0aW9uLCBzaGFwZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5faHRtbElkO1xyXG4gICAgICAgIGlmICgwID09PSBvcGVyYXRpb25MaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxCdXR0b24gaWNvbj17aWNvblByb3BzLm5hbWV9IGlkPXtpZH0gaXNKcyBzaGFwZT17c2hhcGV9IC8+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXtgbWRsLW1lbnUgbWRsLW1lbnUtLWJvdHRvbS0ke3Bvc2l0aW9ufSBtZGwtanMtbWVudSBtZGwtanMtcmlwcGxlLWVmZmVjdGB9IGh0bWxGb3I9e2lkfSByZWY9J2Ryb3Bkb3duJz5cclxuICAgICAgICAgICAgICAgICAgICB7b3BlcmF0aW9uTGlzdC5tYXAoKG9wZXJhdGlvbiwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtgbWRsLW1lbnVfX2l0ZW0gJHtvcGVyYXRpb24uc3R5bGV9YH0ga2V5PXtpZHh9IG9uQ2xpY2s9e3RoaXMuX2hhbmRsZUFjdGlvbihvcGVyYXRpb24uYWN0aW9uKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RyYW5zbGF0ZShvcGVyYXRpb24ubGFiZWwpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoRHJvcGRvd24pO1xyXG4iXX0=