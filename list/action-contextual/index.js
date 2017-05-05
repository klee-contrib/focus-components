'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies
var React = require('react');

var _require = require('lodash/collection'),
    reduce = _require.reduce;

// Components

var SelectAction = require('../../common/select-action').component;

var actionContextualMixin = {

    /**
    * Display name.
    */
    displayName: 'ActionContextual',

    /**
    * Init default props.
    * @returns {object} Default props.
    */
    getDefaultProps: function getDefaultProps() {
        return {
            buttonComponent: _button2.default,
            operationList: [],
            operationParam: undefined
        };
    },

    /**
    * Init default state.
    * @returns {oject} Initial state.
    */
    getInitialState: function getInitialState() {
        return {
            isSecondaryActionListExpanded: false // true if secondary actionList is expanded.
        };
    },


    /**
    * Handle contextual action on click.
    * @param {string} key Action key.
    * @return {function} action handler.
    */
    _handleAction: function _handleAction(key) {
        var _props = this.props,
            operationList = _props.operationList,
            operationParam = _props.operationParam;

        return function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (operationParam) {
                operationList[key].action(operationParam);
            } else {
                operationList[key].action();
            }
        };
    },


    /**
    * render the component.
    * @returns {JSX} Html code.
    */
    render: function render() {
        var _this = this;

        var _props2 = this.props,
            operationList = _props2.operationList,
            operationParam = _props2.operationParam,
            buttonComponent = _props2.buttonComponent;
        var isSecondaryActionListExpanded = this.state.isSecondaryActionListExpanded;

        var _reduce = reduce(operationList, function (actionLists, operation, key) {
            var primaryActions = actionLists.primaryActionList,
                secondaryActions = actionLists.secondaryActionList;

            if (1 === operation.priority) {
                primaryActions.push(React.createElement(_this.props.buttonComponent, _extends({
                    handleOnClick: _this._handleAction(key),
                    icon: operation.icon,
                    iconLibrary: operation.iconLibrary,
                    key: key,
                    label: operation.label,
                    shape: operation.style && operation.style.shape || 'icon',
                    style: operation.style || {},
                    type: 'button'
                }, _this.props, operation)));
            } else {
                secondaryActions.push(operation);
            }
            return actionLists;
        }, { primaryActionList: [], secondaryActionList: [] }, this),
            primaryActionList = _reduce.primaryActionList,
            secondaryActionList = _reduce.secondaryActionList;

        return React.createElement(
            'div',
            { className: 'list-action-contextual' },
            React.createElement(
                'span',
                null,
                primaryActionList
            ),
            React.createElement(SelectAction, {
                isExpanded: isSecondaryActionListExpanded,
                operationList: secondaryActionList,
                operationParam: operationParam
            })
        );
    }
};

module.exports = (0, _builder2.default)(actionContextualMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJyZWR1Y2UiLCJTZWxlY3RBY3Rpb24iLCJjb21wb25lbnQiLCJhY3Rpb25Db250ZXh0dWFsTWl4aW4iLCJkaXNwbGF5TmFtZSIsImdldERlZmF1bHRQcm9wcyIsImJ1dHRvbkNvbXBvbmVudCIsIm9wZXJhdGlvbkxpc3QiLCJvcGVyYXRpb25QYXJhbSIsInVuZGVmaW5lZCIsImdldEluaXRpYWxTdGF0ZSIsImlzU2Vjb25kYXJ5QWN0aW9uTGlzdEV4cGFuZGVkIiwiX2hhbmRsZUFjdGlvbiIsImtleSIsInByb3BzIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImFjdGlvbiIsInJlbmRlciIsInN0YXRlIiwiYWN0aW9uTGlzdHMiLCJvcGVyYXRpb24iLCJwcmltYXJ5QWN0aW9ucyIsInByaW1hcnlBY3Rpb25MaXN0Iiwic2Vjb25kYXJ5QWN0aW9ucyIsInNlY29uZGFyeUFjdGlvbkxpc3QiLCJwcmlvcml0eSIsInB1c2giLCJpY29uIiwiaWNvbkxpYnJhcnkiLCJsYWJlbCIsInN0eWxlIiwic2hhcGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBRUE7Ozs7QUFLQTs7Ozs7O0FBUEE7QUFDQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDs7ZUFFaUJBLFFBQVEsbUJBQVIsQztJQUFWQyxNLFlBQUFBLE07O0FBRVA7O0FBR0EsSUFBTUMsZUFBZUYsUUFBUSw0QkFBUixFQUFzQ0csU0FBM0Q7O0FBRUEsSUFBTUMsd0JBQXdCOztBQUUxQjs7O0FBR0FDLGlCQUFhLGtCQUxhOztBQU8xQjs7OztBQUlBQyxtQkFYMEIsNkJBV1I7QUFDZCxlQUFPO0FBQ0hDLDZDQURHO0FBRUhDLDJCQUFlLEVBRlo7QUFHSEMsNEJBQWdCQztBQUhiLFNBQVA7QUFLSCxLQWpCeUI7O0FBa0IxQjs7OztBQUlBQyxtQkF0QjBCLDZCQXNCUjtBQUNkLGVBQU87QUFDSEMsMkNBQStCLEtBRDVCLENBQ2tDO0FBRGxDLFNBQVA7QUFHSCxLQTFCeUI7OztBQTRCMUI7Ozs7O0FBS0FDLGlCQWpDMEIseUJBaUNaQyxHQWpDWSxFQWlDUDtBQUFBLHFCQUN5QixLQUFLQyxLQUQ5QjtBQUFBLFlBQ1JQLGFBRFEsVUFDUkEsYUFEUTtBQUFBLFlBQ09DLGNBRFAsVUFDT0EsY0FEUDs7QUFFZixlQUFPLGlCQUFTO0FBQ1pPLGtCQUFNQyxjQUFOO0FBQ0FELGtCQUFNRSxlQUFOO0FBQ0EsZ0JBQUlULGNBQUosRUFBb0I7QUFDaEJELDhCQUFjTSxHQUFkLEVBQW1CSyxNQUFuQixDQUEwQlYsY0FBMUI7QUFDSCxhQUZELE1BRU87QUFDSEQsOEJBQWNNLEdBQWQsRUFBbUJLLE1BQW5CO0FBQ0g7QUFDSixTQVJEO0FBU0gsS0E1Q3lCOzs7QUErQzFCOzs7O0FBSUFDLFVBbkQwQixvQkFtRGpCO0FBQUE7O0FBQUEsc0JBQ29ELEtBQUtMLEtBRHpEO0FBQUEsWUFDRVAsYUFERixXQUNFQSxhQURGO0FBQUEsWUFDaUJDLGNBRGpCLFdBQ2lCQSxjQURqQjtBQUFBLFlBQ2lDRixlQURqQyxXQUNpQ0EsZUFEakM7QUFBQSxZQUVFSyw2QkFGRixHQUVtQyxLQUFLUyxLQUZ4QyxDQUVFVCw2QkFGRjs7QUFBQSxzQkFHNENYLE9BQU9PLGFBQVAsRUFBc0IsVUFBQ2MsV0FBRCxFQUFjQyxTQUFkLEVBQXlCVCxHQUF6QixFQUFpQztBQUFBLGdCQUM1RVUsY0FENEUsR0FDbkJGLFdBRG1CLENBQy9GRyxpQkFEK0Y7QUFBQSxnQkFDdkNDLGdCQUR1QyxHQUNuQkosV0FEbUIsQ0FDNURLLG1CQUQ0RDs7QUFFcEcsZ0JBQUksTUFBTUosVUFBVUssUUFBcEIsRUFBOEI7QUFDMUJKLCtCQUFlSyxJQUFmLENBQ0ksMEJBQU0sS0FBTixDQUFZLGVBQVo7QUFDSSxtQ0FBZSxNQUFLaEIsYUFBTCxDQUFtQkMsR0FBbkIsQ0FEbkI7QUFFSSwwQkFBTVMsVUFBVU8sSUFGcEI7QUFHSSxpQ0FBYVAsVUFBVVEsV0FIM0I7QUFJSSx5QkFBS2pCLEdBSlQ7QUFLSSwyQkFBT1MsVUFBVVMsS0FMckI7QUFNSSwyQkFBT1QsVUFBVVUsS0FBVixJQUFtQlYsVUFBVVUsS0FBVixDQUFnQkMsS0FBbkMsSUFBNEMsTUFOdkQ7QUFPSSwyQkFBT1gsVUFBVVUsS0FBVixJQUFtQixFQVA5QjtBQVFJLDBCQUFLO0FBUlQsbUJBU1EsTUFBS2xCLEtBVGIsRUFVUVEsU0FWUixFQURKO0FBY0gsYUFmRCxNQWVPO0FBQ0hHLGlDQUFpQkcsSUFBakIsQ0FBc0JOLFNBQXRCO0FBQ0g7QUFDRCxtQkFBT0QsV0FBUDtBQUNILFNBckJnRCxFQXFCOUMsRUFBQ0csbUJBQW1CLEVBQXBCLEVBQXdCRSxxQkFBcUIsRUFBN0MsRUFyQjhDLEVBcUJJLElBckJKLENBSDVDO0FBQUEsWUFHRUYsaUJBSEYsV0FHRUEsaUJBSEY7QUFBQSxZQUdxQkUsbUJBSHJCLFdBR3FCQSxtQkFIckI7O0FBeUJMLGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSx3QkFBZjtBQUNJO0FBQUE7QUFBQTtBQUFPRjtBQUFQLGFBREo7QUFFSSxnQ0FBQyxZQUFEO0FBQ0ksNEJBQVliLDZCQURoQjtBQUVJLCtCQUFlZSxtQkFGbkI7QUFHSSxnQ0FBZ0JsQjtBQUhwQjtBQUZKLFNBREo7QUFVSDtBQXRGeUIsQ0FBOUI7O0FBeUZBMEIsT0FBT0MsT0FBUCxHQUFpQix1QkFBUWhDLHFCQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5jb25zdCB7cmVkdWNlfSA9IHJlcXVpcmUoJ2xvZGFzaC9jb2xsZWN0aW9uJyk7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcblxyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uJztcclxuY29uc3QgU2VsZWN0QWN0aW9uID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uL3NlbGVjdC1hY3Rpb24nKS5jb21wb25lbnQ7XHJcblxyXG5jb25zdCBhY3Rpb25Db250ZXh0dWFsTWl4aW4gPSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERpc3BsYXkgbmFtZS5cclxuICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ0FjdGlvbkNvbnRleHR1YWwnLFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBJbml0IGRlZmF1bHQgcHJvcHMuXHJcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9IERlZmF1bHQgcHJvcHMuXHJcbiAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbkNvbXBvbmVudDogQnV0dG9uLFxyXG4gICAgICAgICAgICBvcGVyYXRpb25MaXN0OiBbXSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uUGFyYW06IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEluaXQgZGVmYXVsdCBzdGF0ZS5cclxuICAgICogQHJldHVybnMge29qZWN0fSBJbml0aWFsIHN0YXRlLlxyXG4gICAgKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpc1NlY29uZGFyeUFjdGlvbkxpc3RFeHBhbmRlZDogZmFsc2UgLy8gdHJ1ZSBpZiBzZWNvbmRhcnkgYWN0aW9uTGlzdCBpcyBleHBhbmRlZC5cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogSGFuZGxlIGNvbnRleHR1YWwgYWN0aW9uIG9uIGNsaWNrLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IEFjdGlvbiBrZXkuXHJcbiAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBhY3Rpb24gaGFuZGxlci5cclxuICAgICovXHJcbiAgICBfaGFuZGxlQWN0aW9uKGtleSkge1xyXG4gICAgICAgIGNvbnN0IHtvcGVyYXRpb25MaXN0LCBvcGVyYXRpb25QYXJhbX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAob3BlcmF0aW9uUGFyYW0pIHtcclxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbkxpc3Rba2V5XS5hY3Rpb24ob3BlcmF0aW9uUGFyYW0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uTGlzdFtrZXldLmFjdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiByZW5kZXIgdGhlIGNvbXBvbmVudC5cclxuICAgICogQHJldHVybnMge0pTWH0gSHRtbCBjb2RlLlxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7b3BlcmF0aW9uTGlzdCwgb3BlcmF0aW9uUGFyYW0sIGJ1dHRvbkNvbXBvbmVudH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtpc1NlY29uZGFyeUFjdGlvbkxpc3RFeHBhbmRlZH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtwcmltYXJ5QWN0aW9uTGlzdCwgc2Vjb25kYXJ5QWN0aW9uTGlzdH0gPSByZWR1Y2Uob3BlcmF0aW9uTGlzdCwgKGFjdGlvbkxpc3RzLCBvcGVyYXRpb24sIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQge3ByaW1hcnlBY3Rpb25MaXN0OiBwcmltYXJ5QWN0aW9ucywgc2Vjb25kYXJ5QWN0aW9uTGlzdDogc2Vjb25kYXJ5QWN0aW9uc30gPSBhY3Rpb25MaXN0cztcclxuICAgICAgICAgICAgaWYgKDEgPT09IG9wZXJhdGlvbi5wcmlvcml0eSkge1xyXG4gICAgICAgICAgICAgICAgcHJpbWFyeUFjdGlvbnMucHVzaChcclxuICAgICAgICAgICAgICAgICAgICA8dGhpcy5wcm9wcy5idXR0b25Db21wb25lbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlT25DbGljaz17dGhpcy5faGFuZGxlQWN0aW9uKGtleSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb249e29wZXJhdGlvbi5pY29ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uTGlicmFyeT17b3BlcmF0aW9uLmljb25MaWJyYXJ5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e29wZXJhdGlvbi5sYWJlbH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGU9e29wZXJhdGlvbi5zdHlsZSAmJiBvcGVyYXRpb24uc3R5bGUuc2hhcGUgfHwgJ2ljb24nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17b3BlcmF0aW9uLnN0eWxlIHx8IHt9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSdidXR0b24nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ub3BlcmF0aW9ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlY29uZGFyeUFjdGlvbnMucHVzaChvcGVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhY3Rpb25MaXN0cztcclxuICAgICAgICB9LCB7cHJpbWFyeUFjdGlvbkxpc3Q6IFtdLCBzZWNvbmRhcnlBY3Rpb25MaXN0OiBbXX0sIHRoaXMpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsaXN0LWFjdGlvbi1jb250ZXh0dWFsJz5cclxuICAgICAgICAgICAgICAgIDxzcGFuPntwcmltYXJ5QWN0aW9uTGlzdH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8U2VsZWN0QWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgaXNFeHBhbmRlZD17aXNTZWNvbmRhcnlBY3Rpb25MaXN0RXhwYW5kZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uTGlzdD17c2Vjb25kYXJ5QWN0aW9uTGlzdH1cclxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25QYXJhbT17b3BlcmF0aW9uUGFyYW19XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihhY3Rpb25Db250ZXh0dWFsTWl4aW4pO1xyXG4iXX0=