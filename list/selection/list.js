'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mixin = exports.component = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Dependencies


//Add a ref to the props if the component is not pure add nothing in the other case.

// Mixins

// Components

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _lodash = require('lodash');

var _isReactClassComponent = require('../../utils/is-react-class-component');

var _translation = require('focus-core/translation');

var _infiniteScroll = require('../mixin/infinite-scroll');

var _referenceProperty = require('../../common/mixin/reference-property');

var _referenceProperty2 = _interopRequireDefault(_referenceProperty);

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var listMixin = {
    /**
    * Display name.
    */
    displayName: 'SelectionList',

    /**
    * Mixin dependancies.
    */
    mixins: [_infiniteScroll.mixin, _referenceProperty2.default],

    /**
    * Default properties for the list.
    * @returns {{isSelection: boolean}} the default properties
    */
    getDefaultProps: function getListDefaultProps() {
        return {
            data: [],
            isSelection: true,
            selectionStatus: 'partial',
            selectionData: [],
            isLoading: false,
            operationList: [],
            idField: 'id'
        };
    },

    /**
    * list property validation.
    * @type {Object}
    */
    propTypes: {
        LineComponent: (0, _types2.default)('func'),
        buttonComponent: (0, _types2.default)('func'),
        data: (0, _types2.default)('array'),
        idField: (0, _types2.default)('string'),
        isLoading: (0, _types2.default)('bool'),
        isSelection: (0, _types2.default)('bool'),
        loader: (0, _types2.default)('func'),
        onLineClick: (0, _types2.default)('func'),
        onSelection: (0, _types2.default)('func'),
        operationList: (0, _types2.default)(['array', 'object']),
        selectionData: (0, _types2.default)('array'),
        selectionStatus: (0, _types2.default)('string')
    },

    getInitialState: function getInitialState() {
        return {
            selectedItems: null
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(_ref) {
        var selectionStatus = _ref.selectionStatus,
            data = _ref.data;

        switch (selectionStatus) {
            case 'none':
                this.setState({ selectedItems: new Map() });
                break;
            case 'selected':
                var selectedItems = new Map();
                data.forEach(function (item) {
                    selectedItems.set(JSON.stringify(item), item);
                });
                this.setState({ selectedItems: selectedItems });
                break;
        }
    },


    /**
    * Return selected items in the list.
    * @return {Array} selected items
    */
    getSelectedItems: function getSelectedItems() {
        var selectedItems = this.state.selectedItems;

        if (selectedItems !== null) {
            var _selectedItems = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.state.selectedItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        item = _step$value[0],
                        isSelected = _step$value[1];

                    if (isSelected) _selectedItems.push(JSON.parse(item));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return _selectedItems;
        } else {
            return (0, _lodash.reduce)(this.refs, function (acc, ref) {
                if (ref.getValue) {
                    var _ref$getValue = ref.getValue(),
                        item = _ref$getValue.item,
                        isSelected = _ref$getValue.isSelected;

                    if (isSelected) acc.push(item);
                }
                return acc;
            }, []);
        }
    },
    _handleLineSelection: function _handleLineSelection(data, isSelected) {
        var _this = this;

        var selectedItems = this.state.selectedItems;

        var newSelectedItems = new Map();
        if (selectedItems !== null) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = selectedItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2),
                        key = _step2$value[0],
                        value = _step2$value[1];

                    newSelectedItems.set(key, value);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
        newSelectedItems.set(JSON.stringify(data), isSelected);

        this.setState({ selectedItems: newSelectedItems }, function () {
            if (_this.props.onSelection) {
                _this.props.onSelection(data, isSelected);
            }
        });
    },


    /**
    * Render lines of the list.
    * @returns {*} DOM for lines
    */
    _renderLines: function _renderLines() {
        var _this2 = this;

        var _props = this.props,
            data = _props.data,
            Line = _props.LineComponent,
            selectionData = _props.selectionData,
            idField = _props.idField,
            selectionStatus = _props.selectionStatus,
            otherProps = _objectWithoutProperties(_props, ['data', 'LineComponent', 'selectionData', 'idField', 'selectionStatus']);

        if (selectionData && selectionData.length > 0) {
            console.warn('[DEPRECATED] You are using \'selectionData\' prop which is now DEPRECATED. Please use \'selectionnableInitializer\' on line component.');
        }
        // LEGACY CODE
        var customLineComponent = otherProps.lineComponent;
        if (customLineComponent) {
            console.warn('%c DEPRECATED : You are using the lineComponent prop in a list component, this will be removed in the next release of Focus Components. Please use LineComponent prop instead.', 'color: #FF9C00; font-weight: bold');
        }
        var FinalLineComponent = customLineComponent || Line;
        // END OF LEGACY CODE
        if (!(0, _lodash.isArray)(data)) {
            console.error('List: Lines: it seems data is not an array, please check the value in your store, it could also be related to your action in case of a load (have a look to shouldDumpStoreOnActionCall option).');
        }
        return data.map(function (line, idx) {
            var isSelected = void 0;
            var selection = (0, _lodash.find)(selectionData, _defineProperty({}, idField, line[idField]));
            if (selection) {
                isSelected = selection.isSelected;
            } else {
                switch (selectionStatus) {
                    case 'none':
                        isSelected = false;
                        break;
                    case 'selected':
                        isSelected = true;
                        break;
                    case 'partial':
                        isSelected = undefined;
                        break;
                    default:
                        isSelected = false;
                }
            }
            var listFinalProps = (0, _isReactClassComponent.addRefToPropsIfNotPure)(FinalLineComponent, _extends({}, otherProps, {
                data: line,
                isSelected: isSelected,
                key: line[idField] || idx,
                onSelection: _this2._handleLineSelection,
                reference: _this2._getReference()
            }), '' + _isReactClassComponent.LINE + idx);
            return _react2.default.createElement(FinalLineComponent, listFinalProps);
        });
    },

    /**
    * Render loading state
    * @return {HTML} the loading state
    */
    _renderLoading: function _renderLoading() {
        var _props2 = this.props,
            isLoading = _props2.isLoading,
            loader = _props2.loader;

        if (isLoading) {
            if (loader) {
                return loader();
            }
            return _react2.default.createElement(
                'li',
                { className: 'sl-loading' },
                (0, _translation.translate)('list.loading'),
                ' ...'
            );
        }
    },

    /**
    * Render manual fetch state
    * @return {HTML} the rendered manual fetch state
    */
    _renderManualFetch: function _renderManualFetch() {
        var _props3 = this.props,
            isManualFetch = _props3.isManualFetch,
            hasMoreData = _props3.hasMoreData;

        if (isManualFetch && hasMoreData) {
            var style = { className: 'primary' };
            return _react2.default.createElement(
                'li',
                { className: 'sl-button' },
                _react2.default.createElement(_button2.default, {
                    handleOnClick: this.handleShowMore,
                    label: 'list.button.showMore',
                    style: style,
                    type: 'button'
                })
            );
        }
    },
    shouldComponentUpdate: function shouldComponentUpdate(_ref2, _ref3) {
        var selectionStatus = _ref2.selectionStatus;
        var selectedItems = _ref3.selectedItems;

        return selectedItems === this.state.selectedItems || selectedItems.size === 0 || selectionStatus !== this.props.selectionStatus;
    },


    /**
    * Render the list.
    * @returns {XML} DOM of the component
    */
    render: function render() {
        var isSelection = this.props.isSelection;

        return _react2.default.createElement(
            'ul',
            { 'data-focus': 'selection-list', 'data-selection': isSelection },
            this._renderLines(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }
};

var builtComp = (0, _builder2.default)(listMixin);
var component = builtComp.component,
    mixin = builtComp.mixin;
exports.component = component;
exports.mixin = mixin;
exports.default = builtComp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJsaXN0TWl4aW4iLCJkaXNwbGF5TmFtZSIsIm1peGlucyIsImdldERlZmF1bHRQcm9wcyIsImdldExpc3REZWZhdWx0UHJvcHMiLCJkYXRhIiwiaXNTZWxlY3Rpb24iLCJzZWxlY3Rpb25TdGF0dXMiLCJzZWxlY3Rpb25EYXRhIiwiaXNMb2FkaW5nIiwib3BlcmF0aW9uTGlzdCIsImlkRmllbGQiLCJwcm9wVHlwZXMiLCJMaW5lQ29tcG9uZW50IiwiYnV0dG9uQ29tcG9uZW50IiwibG9hZGVyIiwib25MaW5lQ2xpY2siLCJvblNlbGVjdGlvbiIsImdldEluaXRpYWxTdGF0ZSIsInNlbGVjdGVkSXRlbXMiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2V0U3RhdGUiLCJNYXAiLCJmb3JFYWNoIiwic2V0IiwiSlNPTiIsInN0cmluZ2lmeSIsIml0ZW0iLCJnZXRTZWxlY3RlZEl0ZW1zIiwic3RhdGUiLCJpc1NlbGVjdGVkIiwicHVzaCIsInBhcnNlIiwicmVmcyIsImFjYyIsInJlZiIsImdldFZhbHVlIiwiX2hhbmRsZUxpbmVTZWxlY3Rpb24iLCJuZXdTZWxlY3RlZEl0ZW1zIiwia2V5IiwidmFsdWUiLCJwcm9wcyIsIl9yZW5kZXJMaW5lcyIsIkxpbmUiLCJvdGhlclByb3BzIiwibGVuZ3RoIiwiY29uc29sZSIsIndhcm4iLCJjdXN0b21MaW5lQ29tcG9uZW50IiwibGluZUNvbXBvbmVudCIsIkZpbmFsTGluZUNvbXBvbmVudCIsImVycm9yIiwibWFwIiwibGluZSIsImlkeCIsInNlbGVjdGlvbiIsInVuZGVmaW5lZCIsImxpc3RGaW5hbFByb3BzIiwicmVmZXJlbmNlIiwiX2dldFJlZmVyZW5jZSIsIl9yZW5kZXJMb2FkaW5nIiwiX3JlbmRlck1hbnVhbEZldGNoIiwiaXNNYW51YWxGZXRjaCIsImhhc01vcmVEYXRhIiwic3R5bGUiLCJjbGFzc05hbWUiLCJoYW5kbGVTaG93TW9yZSIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsInNpemUiLCJyZW5kZXIiLCJidWlsdENvbXAiLCJjb21wb25lbnQiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O3lwQkFBQTs7O0FBT0E7O0FBSUE7O0FBS0E7O0FBZkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBR0E7O0FBRUE7O0FBR0E7O0FBQ0E7Ozs7QUFJQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVk7QUFDZDs7O0FBR0FDLGlCQUFhLGVBSkM7O0FBTWQ7OztBQUdBQyxZQUFRLG9EQVRNOztBQVdkOzs7O0FBSUFDLHFCQUFpQixTQUFTQyxtQkFBVCxHQUErQjtBQUM1QyxlQUFPO0FBQ0hDLGtCQUFNLEVBREg7QUFFSEMseUJBQWEsSUFGVjtBQUdIQyw2QkFBaUIsU0FIZDtBQUlIQywyQkFBZSxFQUpaO0FBS0hDLHVCQUFXLEtBTFI7QUFNSEMsMkJBQWUsRUFOWjtBQU9IQyxxQkFBUztBQVBOLFNBQVA7QUFTSCxLQXpCYTs7QUEyQmQ7Ozs7QUFJQUMsZUFBVztBQUNQQyx1QkFBZSxxQkFBTSxNQUFOLENBRFI7QUFFUEMseUJBQWlCLHFCQUFNLE1BQU4sQ0FGVjtBQUdQVCxjQUFNLHFCQUFNLE9BQU4sQ0FIQztBQUlQTSxpQkFBUyxxQkFBTSxRQUFOLENBSkY7QUFLUEYsbUJBQVcscUJBQU0sTUFBTixDQUxKO0FBTVBILHFCQUFhLHFCQUFNLE1BQU4sQ0FOTjtBQU9QUyxnQkFBUSxxQkFBTSxNQUFOLENBUEQ7QUFRUEMscUJBQWEscUJBQU0sTUFBTixDQVJOO0FBU1BDLHFCQUFhLHFCQUFNLE1BQU4sQ0FUTjtBQVVQUCx1QkFBZSxxQkFBTSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBQU4sQ0FWUjtBQVdQRix1QkFBZSxxQkFBTSxPQUFOLENBWFI7QUFZUEQseUJBQWlCLHFCQUFNLFFBQU47QUFaVixLQS9CRzs7QUE4Q2RXLG1CQTlDYyw2QkE4Q0k7QUFDZCxlQUFPO0FBQ0hDLDJCQUFlO0FBRFosU0FBUDtBQUdILEtBbERhO0FB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QWhCQSxhQUFnQjs7QUFDdEQsZUFBT0Esa0JBQWtCLEtBQUtVLEtBQUwsQ0FBV1YsYUFBN0IsSUFBOENBLGNBQWNpRCxJQUFkLEtBQXVCLENBQXJFLElBQTBFN0Qsb0JBQW9CLEtBQUtrQyxLQUFMLENBQVdsQyxlQUFoSDtBQUNILEtBdE1hOzs7QUF3TWQ7Ozs7QUFJQThELFVBNU1jLG9CQTRNTDtBQUFBLFlBQ0UvRCxXQURGLEdBQ2lCLEtBQUttQyxLQUR0QixDQUNFbkMsV0FERjs7QUFFTCxlQUNJO0FBQUE7QUFBQSxjQUFJLGNBQVcsZ0JBQWYsRUFBZ0Msa0JBQWdCQSxXQUFoRDtBQUNLLGlCQUFLb0MsWUFBTCxFQURMO0FBRUssaUJBQUtrQixjQUFMLEVBRkw7QUFHSyxpQkFBS0Msa0JBQUw7QUFITCxTQURKO0FBT0g7QUFyTmEsQ0FBbEI7O0FBd05BLElBQU1TLFlBQVksdUJBQVF0RSxTQUFSLENBQWxCO0lBQ091RSxTLEdBQW9CRCxTLENBQXBCQyxTO0lBQVdDLEssR0FBU0YsUyxDQUFURSxLO1FBR2RELFMsR0FBQUEsUztRQUNBQyxLLEdBQUFBLEs7a0JBRVdGLFMiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZXMgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5cclxuaW1wb3J0IHsgcmVkdWNlLCBpc0FycmF5LCBmaW5kIH0gZnJvbSAnbG9kYXNoJztcclxuXHJcbi8vQWRkIGEgcmVmIHRvIHRoZSBwcm9wcyBpZiB0aGUgY29tcG9uZW50IGlzIG5vdCBwdXJlIGFkZCBub3RoaW5nIGluIHRoZSBvdGhlciBjYXNlLlxyXG5pbXBvcnQgeyBhZGRSZWZUb1Byb3BzSWZOb3RQdXJlLCBMSU5FIH0gZnJvbSAnLi4vLi4vdXRpbHMvaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50JztcclxuXHJcbmltcG9ydCB7dHJhbnNsYXRlfSBmcm9tICdmb2N1cy1jb3JlL3RyYW5zbGF0aW9uJztcclxuLy8gTWl4aW5zXHJcblxyXG5pbXBvcnQge21peGluIGFzIGluZmluaXRlU2Nyb2xsTWl4aW59IGZyb20gJy4uL21peGluL2luZmluaXRlLXNjcm9sbCc7XHJcbmltcG9ydCByZWZlcmVuY2VNaXhpbiBmcm9tICcuLi8uLi9jb21tb24vbWl4aW4vcmVmZXJlbmNlLXByb3BlcnR5JztcclxuXHJcbi8vIENvbXBvbmVudHNcclxuXHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9idXR0b24nO1xyXG5cclxuY29uc3QgbGlzdE1peGluID0ge1xyXG4gICAgLyoqXHJcbiAgICAqIERpc3BsYXkgbmFtZS5cclxuICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ1NlbGVjdGlvbkxpc3QnLFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBNaXhpbiBkZXBlbmRhbmNpZXMuXHJcbiAgICAqL1xyXG4gICAgbWl4aW5zOiBbaW5maW5pdGVTY3JvbGxNaXhpbiwgcmVmZXJlbmNlTWl4aW5dLFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEZWZhdWx0IHByb3BlcnRpZXMgZm9yIHRoZSBsaXN0LlxyXG4gICAgKiBAcmV0dXJucyB7e2lzU2VsZWN0aW9uOiBib29sZWFufX0gdGhlIGRlZmF1bHQgcHJvcGVydGllc1xyXG4gICAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gZ2V0TGlzdERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgaXNTZWxlY3Rpb246IHRydWUsXHJcbiAgICAgICAgICAgIHNlbGVjdGlvblN0YXR1czogJ3BhcnRpYWwnLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25EYXRhOiBbXSxcclxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uTGlzdDogW10sXHJcbiAgICAgICAgICAgIGlkRmllbGQ6ICdpZCdcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogbGlzdCBwcm9wZXJ0eSB2YWxpZGF0aW9uLlxyXG4gICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIExpbmVDb21wb25lbnQ6IHR5cGVzKCdmdW5jJyksXHJcbiAgICAgICAgYnV0dG9uQ29tcG9uZW50OiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIGRhdGE6IHR5cGVzKCdhcnJheScpLFxyXG4gICAgICAgIGlkRmllbGQ6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICBpc0xvYWRpbmc6IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgaXNTZWxlY3Rpb246IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgbG9hZGVyOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIG9uTGluZUNsaWNrOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIG9uU2VsZWN0aW9uOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIG9wZXJhdGlvbkxpc3Q6IHR5cGVzKFsnYXJyYXknLCAnb2JqZWN0J10pLFxyXG4gICAgICAgIHNlbGVjdGlvbkRhdGE6IHR5cGVzKCdhcnJheScpLFxyXG4gICAgICAgIHNlbGVjdGlvblN0YXR1czogdHlwZXMoJ3N0cmluZycpXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHtzZWxlY3Rpb25TdGF0dXMsIGRhdGF9KSB7XHJcbiAgICAgICAgc3dpdGNoIChzZWxlY3Rpb25TdGF0dXMpIHtcclxuICAgICAgICAgICAgY2FzZSAnbm9uZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRJdGVtczogbmV3IE1hcCgpIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlbGVjdGVkJzpcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1zID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4geyBzZWxlY3RlZEl0ZW1zLnNldChKU09OLnN0cmluZ2lmeShpdGVtKSwgaXRlbSkgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRJdGVtcyB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJldHVybiBzZWxlY3RlZCBpdGVtcyBpbiB0aGUgbGlzdC5cclxuICAgICogQHJldHVybiB7QXJyYXl9IHNlbGVjdGVkIGl0ZW1zXHJcbiAgICAqL1xyXG4gICAgZ2V0U2VsZWN0ZWRJdGVtcygpIHtcclxuICAgICAgICBjb25zdCB7c2VsZWN0ZWRJdGVtc30gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZEl0ZW1zICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgW2l0ZW0sIGlzU2VsZWN0ZWRdIG9mIHRoaXMuc3RhdGUuc2VsZWN0ZWRJdGVtcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIHNlbGVjdGVkSXRlbXMucHVzaChKU09OLnBhcnNlKGl0ZW0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRJdGVtcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVkdWNlKHRoaXMucmVmcywgKGFjYywgcmVmKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVmLmdldFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge2l0ZW0sIGlzU2VsZWN0ZWR9ID0gcmVmLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIGFjYy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2hhbmRsZUxpbmVTZWxlY3Rpb24oZGF0YSwgaXNTZWxlY3RlZCkge1xyXG4gICAgICAgIGNvbnN0IHtzZWxlY3RlZEl0ZW1zfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgbmV3U2VsZWN0ZWRJdGVtcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtcyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2Ygc2VsZWN0ZWRJdGVtcykge1xyXG4gICAgICAgICAgICAgICAgbmV3U2VsZWN0ZWRJdGVtcy5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3U2VsZWN0ZWRJdGVtcy5zZXQoSlNPTi5zdHJpbmdpZnkoZGF0YSksIGlzU2VsZWN0ZWQpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkSXRlbXM6IG5ld1NlbGVjdGVkSXRlbXMgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGlvbihkYXRhLCBpc1NlbGVjdGVkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciBsaW5lcyBvZiB0aGUgbGlzdC5cclxuICAgICogQHJldHVybnMgeyp9IERPTSBmb3IgbGluZXNcclxuICAgICovXHJcbiAgICBfcmVuZGVyTGluZXMoKSB7XHJcbiAgICAgICAgY29uc3Qge2RhdGEsIExpbmVDb21wb25lbnQ6IExpbmUsIHNlbGVjdGlvbkRhdGEsIGlkRmllbGQsIHNlbGVjdGlvblN0YXR1cywgLi4ub3RoZXJQcm9wc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb25EYXRhICYmIHNlbGVjdGlvbkRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1tERVBSRUNBVEVEXSBZb3UgYXJlIHVzaW5nIFxcJ3NlbGVjdGlvbkRhdGFcXCcgcHJvcCB3aGljaCBpcyBub3cgREVQUkVDQVRFRC4gUGxlYXNlIHVzZSBcXCdzZWxlY3Rpb25uYWJsZUluaXRpYWxpemVyXFwnIG9uIGxpbmUgY29tcG9uZW50LicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBMRUdBQ1kgQ09ERVxyXG4gICAgICAgIGNvbnN0IGN1c3RvbUxpbmVDb21wb25lbnQgPSBvdGhlclByb3BzLmxpbmVDb21wb25lbnQ7XHJcbiAgICAgICAgaWYgKGN1c3RvbUxpbmVDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCclYyBERVBSRUNBVEVEIDogWW91IGFyZSB1c2luZyB0aGUgbGluZUNvbXBvbmVudCBwcm9wIGluIGEgbGlzdCBjb21wb25lbnQsIHRoaXMgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IHJlbGVhc2Ugb2YgRm9jdXMgQ29tcG9uZW50cy4gUGxlYXNlIHVzZSBMaW5lQ29tcG9uZW50IHByb3AgaW5zdGVhZC4nLCAnY29sb3I6ICNGRjlDMDA7IGZvbnQtd2VpZ2h0OiBib2xkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IEZpbmFsTGluZUNvbXBvbmVudCA9IGN1c3RvbUxpbmVDb21wb25lbnQgfHwgTGluZTtcclxuICAgICAgICAvLyBFTkQgT0YgTEVHQUNZIENPREVcclxuICAgICAgICBpZiAoIWlzQXJyYXkoZGF0YSkpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAgICAgICAgICdMaXN0OiBMaW5lczogaXQgc2VlbXMgZGF0YSBpcyBub3QgYW4gYXJyYXksIHBsZWFzZSBjaGVjayB0aGUgdmFsdWUgaW4geW91ciBzdG9yZSwgaXQgY291bGQgYWxzbyBiZSByZWxhdGVkIHRvIHlvdXIgYWN0aW9uIGluIGNhc2Ugb2YgYSBsb2FkIChoYXZlIGEgbG9vayB0byBzaG91bGREdW1wU3RvcmVPbkFjdGlvbkNhbGwgb3B0aW9uKS4nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhLm1hcCgobGluZSwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpc1NlbGVjdGVkO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSBmaW5kKHNlbGVjdGlvbkRhdGEsIHsgW2lkRmllbGRdOiBsaW5lW2lkRmllbGRdIH0pO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpc1NlbGVjdGVkID0gc2VsZWN0aW9uLmlzU2VsZWN0ZWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNlbGVjdGlvblN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ25vbmUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3NlbGVjdGVkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhcnRpYWwnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbGlzdEZpbmFsUHJvcHMgPSBhZGRSZWZUb1Byb3BzSWZOb3RQdXJlKFxyXG4gICAgICAgICAgICAgICAgRmluYWxMaW5lQ29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4ub3RoZXJQcm9wcyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBsaW5lLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBsaW5lW2lkRmllbGRdIHx8IGlkeCxcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdGlvbjogdGhpcy5faGFuZGxlTGluZVNlbGVjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2U6IHRoaXMuX2dldFJlZmVyZW5jZSgpXHJcbiAgICAgICAgICAgICAgICB9LCBgJHtMSU5FfSR7aWR4fWApO1xyXG4gICAgICAgICAgICByZXR1cm4gPEZpbmFsTGluZUNvbXBvbmVudCB7Li4ubGlzdEZpbmFsUHJvcHN9IC8+O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgbG9hZGluZyBzdGF0ZVxyXG4gICAgKiBAcmV0dXJuIHtIVE1MfSB0aGUgbG9hZGluZyBzdGF0ZVxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJMb2FkaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc0xvYWRpbmcsIGxvYWRlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChpc0xvYWRpbmcpIHtcclxuICAgICAgICAgICAgaWYgKGxvYWRlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvYWRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPSdzbC1sb2FkaW5nJz57dHJhbnNsYXRlKCdsaXN0LmxvYWRpbmcnKX0gLi4uPC9saT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciBtYW51YWwgZmV0Y2ggc3RhdGVcclxuICAgICogQHJldHVybiB7SFRNTH0gdGhlIHJlbmRlcmVkIG1hbnVhbCBmZXRjaCBzdGF0ZVxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJNYW51YWxGZXRjaCgpIHtcclxuICAgICAgICBjb25zdCB7aXNNYW51YWxGZXRjaCwgaGFzTW9yZURhdGF9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoaXNNYW51YWxGZXRjaCAmJiBoYXNNb3JlRGF0YSkge1xyXG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IHsgY2xhc3NOYW1lOiAncHJpbWFyeScgfTtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9J3NsLWJ1dHRvbic+XHJcbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVPbkNsaWNrPXt0aGlzLmhhbmRsZVNob3dNb3JlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD0nbGlzdC5idXR0b24uc2hvd01vcmUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0nYnV0dG9uJ1xyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKHtzZWxlY3Rpb25TdGF0dXN9LCB7c2VsZWN0ZWRJdGVtc30pIHtcclxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRJdGVtcyA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZEl0ZW1zIHx8IHNlbGVjdGVkSXRlbXMuc2l6ZSA9PT0gMCB8fCBzZWxlY3Rpb25TdGF0dXMgIT09IHRoaXMucHJvcHMuc2VsZWN0aW9uU3RhdHVzO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBsaXN0LlxyXG4gICAgKiBAcmV0dXJucyB7WE1MfSBET00gb2YgdGhlIGNvbXBvbmVudFxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7aXNTZWxlY3Rpb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dWwgZGF0YS1mb2N1cz0nc2VsZWN0aW9uLWxpc3QnIGRhdGEtc2VsZWN0aW9uPXtpc1NlbGVjdGlvbn0+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyTGluZXMoKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJMb2FkaW5nKCl9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyTWFudWFsRmV0Y2goKX1cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgYnVpbHRDb21wID0gYnVpbGRlcihsaXN0TWl4aW4pO1xyXG5jb25zdCB7Y29tcG9uZW50LCBtaXhpbn0gPSBidWlsdENvbXA7XHJcblxyXG5leHBvcnQge1xyXG4gICAgY29tcG9uZW50LFxyXG4gICAgbWl4aW5cclxufVxyXG5leHBvcnQgZGVmYXVsdCBidWlsdENvbXA7Il19