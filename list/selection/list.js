'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _object = require('focus-core/util/object');

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _lang = require('lodash/lang');

var _collection = require('lodash/collection');

var _isReactClassComponent = require('../../utils/is-react-class-component');

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Dependencies
var React = require('react');

var find = require('lodash/collection/find');

var _require = require('lodash/object'),
    omit = _require.omit;

var _require2 = require('lodash/lang'),
    isArray = _require2.isArray;

//Add a ref to the props if the component is not pure add nothing in the other case.


// Mixins

var translationMixin = require('../../common/i18n').mixin;
var infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
var referenceMixin = require('../../common/mixin/reference-property');

// Components

var listMixin = {
    /**
    * Display name.
    */
    displayName: 'SelectionList',

    /**
    * Mixin dependancies.
    */
    mixins: [translationMixin, infiniteScrollMixin, referenceMixin],

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
            return (0, _collection.reduce)(this.refs, function (acc, ref) {
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
        if (!isArray(data)) {
            console.error('List: Lines: it seems data is not an array, please check the value in your store, it could also be related to your action in case of a load (have a look to shouldDumpStoreOnActionCall option).');
        }
        return data.map(function (line, idx) {
            var isSelected = void 0;
            var selection = find(selectionData, _defineProperty({}, idField, line[idField]));
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
            return React.createElement(FinalLineComponent, listFinalProps);
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
            return React.createElement(
                'li',
                { className: 'sl-loading' },
                this.i18n('list.loading'),
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
            return React.createElement(
                'li',
                { className: 'sl-button' },
                React.createElement(_button2.default, {
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

        return React.createElement(
            'ul',
            { 'data-focus': 'selection-list', 'data-selection': isSelection },
            this._renderLines(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }
};

module.exports = (0, _builder2.default)(listMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJmaW5kIiwib21pdCIsImlzQXJyYXkiLCJ0cmFuc2xhdGlvbk1peGluIiwibWl4aW4iLCJpbmZpbml0ZVNjcm9sbE1peGluIiwicmVmZXJlbmNlTWl4aW4iLCJsaXN0TWl4aW4iLCJkaXNwbGF5TmFtZSIsIm1peGlucyIsImdldERlZmF1bHRQcm9wcyIsImdldExpc3REZWZhdWx0UHJvcHMiLCJkYXRhIiwiaXNTZWxlY3Rpb24iLCJzZWxlY3Rpb25TdGF0dXMiLCJzZWxlY3Rpb25EYXRhIiwiaXNMb2FkaW5nIiwib3BlcmF0aW9uTGlzdCIsImlkRmllbGQiLCJwcm9wVHlwZXMiLCJMaW5lQ29tcG9uZW50IiwiYnV0dG9uQ29tcG9uZW50IiwibG9hZGVyIiwib25MaW5lQ2xpY2siLCJvblNlbGVjdGlvbiIsImdldEluaXRpYWxTdGF0ZSIsInNlbGVjdGVkSXRlbXMiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2V0U3RhdGUiLCJNYXAiLCJmb3JFYWNoIiwic2V0IiwiSlNPTiIsInN0cmluZ2lmeSIsIml0ZW0iLCJnZXRTZWxlY3RlZEl0ZW1zIiwic3RhdGUiLCJpc1NlbGVjdGVkIiwicHVzaCIsInBhcnNlIiwicmVmcyIsImFjYyIsInJlZiIsImdldFZhbHVlIiwiX2hhbmRsZUxpbmVTZWxlY3Rpb24iLCJuZXdTZWxlY3RlZEl0ZW1zIiwia2V5IiwidmFsdWUiLCJwcm9wcyIsIl9yZW5kZXJMaW5lcyIsIkxpbmUiLCJvdGhlclByb3BzIiwibGVuZ3RoIiwiY29uc29sZSIsIndhcm4iLCJjdXN0b21MaW5lQ29tcG9uZW50IiwibGluZUNvbXBvbmVudCIsIkZpbmFsTGluZUNvbXBvbmVudCIsImVycm9yIiwibWFwIiwibGluZSIsImlkeCIsInNlbGVjdGlvbiIsInVuZGVmaW5lZCIsImxpc3RGaW5hbFByb3BzIiwicmVmZXJlbmNlIiwiX2dldFJlZmVyZW5jZSIsIl9yZW5kZXJMb2FkaW5nIiwiaTE4biIsIl9yZW5kZXJNYW51YWxGZXRjaCIsImlzTWFudWFsRmV0Y2giLCJoYXNNb3JlRGF0YSIsInN0eWxlIiwiY2xhc3NOYW1lIiwiaGFuZGxlU2hvd01vcmUiLCJzaG91bGRDb21wb25lbnRVcGRhdGUiLCJzaXplIiwicmVuZGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUlBOztBQUNBOztBQUdBOztBQVVBOzs7Ozs7Ozs7O0FBdEJBO0FBQ0EsSUFBTUEsUUFBUUMsUUFBUSxPQUFSLENBQWQ7O0FBSUEsSUFBTUMsT0FBT0QsUUFBUSx3QkFBUixDQUFiOztlQUNlQSxRQUFRLGVBQVIsQztJQUFSRSxJLFlBQUFBLEk7O2dCQUNXRixRQUFRLGFBQVIsQztJQUFYRyxPLGFBQUFBLE87O0FBSVA7OztBQUdBOztBQUVBLElBQU1DLG1CQUFtQkosUUFBUSxtQkFBUixFQUE2QkssS0FBdEQ7QUFDQSxJQUFNQyxzQkFBc0JOLFFBQVEsMEJBQVIsRUFBb0NLLEtBQWhFO0FBQ0EsSUFBTUUsaUJBQWlCUCxRQUFRLHVDQUFSLENBQXZCOztBQUVBOztBQUlBLElBQU1RLFlBQVk7QUFDZDs7O0FBR0FDLGlCQUFhLGVBSkM7O0FBTWQ7OztBQUdBQyxZQUFRLENBQUNOLGdCQUFELEVBQW1CRSxtQkFBbkIsRUFBd0NDLGNBQXhDLENBVE07O0FBV2Q7Ozs7QUFJQUkscUJBQWlCLFNBQVNDLG1CQUFULEdBQStCO0FBQzVDLGVBQU87QUFDSEMsa0JBQU0sRUFESDtBQUVIQyx5QkFBYSxJQUZWO0FBR0hDLDZCQUFpQixTQUhkO0FBSUhDLDJCQUFlLEVBSlo7QUFLSEMsdUJBQVcsS0FMUjtBQU1IQywyQkFBZSxFQU5aO0FBT0hDLHFCQUFTO0FBUE4sU0FBUDtBQVNILEtBekJhOztBQTJCZDs7OztBQUlBQyxlQUFXO0FBQ1BDLHVCQUFlLHFCQUFNLE1BQU4sQ0FEUjtBQUVQQyx5QkFBaUIscUJBQU0sTUFB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OztBQStLZDs7OztBQUlBQyxzQkFuTGMsZ0NBbUxPO0FBQUEsc0JBQ29CLEtBQUtyQixLQUR6QjtBQUFBLFlBQ1ZzQixhQURVLFdBQ1ZBLGFBRFU7QUFBQSxZQUNLQyxXQURMLFdBQ0tBLFdBREw7O0FBRWpCLFlBQUdELGlCQUFpQkMsV0FBcEIsRUFBaUM7QUFDN0IsZ0JBQU1DLFFBQVEsRUFBQ0MsV0FBVyxTQUFaLEVBQWQ7QUFDQSxtQkFDSTtBQUFBO0FBQUEsa0JBQUksV0FBVSxXQUFkO0FBQ0k7QUFDSSxtQ0FBZSxLQUFLQyxjQUR4QjtBQUVJLDJCQUFNLHNCQUZWO0FBR0ksMkJBQU9GLEtBSFg7QUFJSSwwQkFBSztBQUpUO0FBREosYUFESjtBQVVIO0FBQ0osS0FsTWE7QUFvTWRHLHlCQXBNYywrQ0FvTTRDO0FBQUEsWUFBbkM3RCxlQUFtQyxTQUFuQ0EsZUFBbUM7QUFBQSxZQUFoQlksYUFBZ0IsU0FBaEJBLGFBQWdCOztBQUN0RCxlQUFPQSxrQkFBa0IsS0FBS1UsS0FBTCxDQUFXVixhQUE3QixJQUE4Q0EsY0FBY2tELElBQWQsS0FBdUIsQ0FBckUsSUFBMEU5RCxvQkFBb0IsS0FBS2tDLEtBQUwsQ0FBV2xDLGVBQWhIO0FBQ0gsS0F0TWE7OztBQXdNZDs7OztBQUlBK0QsVUE1TWMsb0JBNE1MO0FBQUEsWUFDRWhFLFdBREYsR0FDaUIsS0FBS21DLEtBRHRCLENBQ0VuQyxXQURGOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUksY0FBVyxnQkFBZixFQUFnQyxrQkFBZ0JBLFdBQWhEO0FBQ0ssaUJBQUtvQyxZQUFMLEVBREw7QUFFSyxpQkFBS2tCLGNBQUwsRUFGTDtBQUdLLGlCQUFLRSxrQkFBTDtBQUhMLFNBREo7QUFPSDtBQXJOYSxDQUFsQjs7QUF3TkFTLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVF4RSxTQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmltcG9ydCB7Y2hlY2tJc05vdE51bGx9IGZyb20gJ2ZvY3VzLWNvcmUvdXRpbC9vYmplY3QnO1xyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuY29uc3QgZmluZCA9IHJlcXVpcmUoJ2xvZGFzaC9jb2xsZWN0aW9uL2ZpbmQnKTtcclxuY29uc3Qge29taXR9ID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdCcpO1xyXG5jb25zdCB7aXNBcnJheX0gPSByZXF1aXJlKCdsb2Rhc2gvbGFuZycpO1xyXG5pbXBvcnQge2Nsb25lfSBmcm9tICdsb2Rhc2gvbGFuZyc7XHJcbmltcG9ydCB7cmVkdWNlfSBmcm9tICdsb2Rhc2gvY29sbGVjdGlvbic7XHJcblxyXG4vL0FkZCBhIHJlZiB0byB0aGUgcHJvcHMgaWYgdGhlIGNvbXBvbmVudCBpcyBub3QgcHVyZSBhZGQgbm90aGluZyBpbiB0aGUgb3RoZXIgY2FzZS5cclxuaW1wb3J0IHthZGRSZWZUb1Byb3BzSWZOb3RQdXJlLCBMSU5FfSBmcm9tICcuLi8uLi91dGlscy9pcy1yZWFjdC1jbGFzcy1jb21wb25lbnQnO1xyXG5cclxuLy8gTWl4aW5zXHJcblxyXG5jb25zdCB0cmFuc2xhdGlvbk1peGluID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uL2kxOG4nKS5taXhpbjtcclxuY29uc3QgaW5maW5pdGVTY3JvbGxNaXhpbiA9IHJlcXVpcmUoJy4uL21peGluL2luZmluaXRlLXNjcm9sbCcpLm1peGluO1xyXG5jb25zdCByZWZlcmVuY2VNaXhpbiA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi9taXhpbi9yZWZlcmVuY2UtcHJvcGVydHknKTtcclxuXHJcbi8vIENvbXBvbmVudHNcclxuXHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9idXR0b24nO1xyXG5cclxuY29uc3QgbGlzdE1peGluID0ge1xyXG4gICAgLyoqXHJcbiAgICAqIERpc3BsYXkgbmFtZS5cclxuICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ1NlbGVjdGlvbkxpc3QnLFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBNaXhpbiBkZXBlbmRhbmNpZXMuXHJcbiAgICAqL1xyXG4gICAgbWl4aW5zOiBbdHJhbnNsYXRpb25NaXhpbiwgaW5maW5pdGVTY3JvbGxNaXhpbiwgcmVmZXJlbmNlTWl4aW5dLFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEZWZhdWx0IHByb3BlcnRpZXMgZm9yIHRoZSBsaXN0LlxyXG4gICAgKiBAcmV0dXJucyB7e2lzU2VsZWN0aW9uOiBib29sZWFufX0gdGhlIGRlZmF1bHQgcHJvcGVydGllc1xyXG4gICAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gZ2V0TGlzdERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgaXNTZWxlY3Rpb246IHRydWUsXHJcbiAgICAgICAgICAgIHNlbGVjdGlvblN0YXR1czogJ3BhcnRpYWwnLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25EYXRhOiBbXSxcclxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uTGlzdDogW10sXHJcbiAgICAgICAgICAgIGlkRmllbGQ6ICdpZCdcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogbGlzdCBwcm9wZXJ0eSB2YWxpZGF0aW9uLlxyXG4gICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIExpbmVDb21wb25lbnQ6IHR5cGVzKCdmdW5jJyksXHJcbiAgICAgICAgYnV0dG9uQ29tcG9uZW50OiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIGRhdGE6IHR5cGVzKCdhcnJheScpLFxyXG4gICAgICAgIGlkRmllbGQ6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICBpc0xvYWRpbmc6IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgaXNTZWxlY3Rpb246IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgbG9hZGVyOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIG9uTGluZUNsaWNrOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIG9uU2VsZWN0aW9uOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIG9wZXJhdGlvbkxpc3Q6IHR5cGVzKFsnYXJyYXknLCAnb2JqZWN0J10pLFxyXG4gICAgICAgIHNlbGVjdGlvbkRhdGE6IHR5cGVzKCdhcnJheScpLFxyXG4gICAgICAgIHNlbGVjdGlvblN0YXR1czogdHlwZXMoJ3N0cmluZycpXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zOiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHtzZWxlY3Rpb25TdGF0dXMsIGRhdGF9KSB7XHJcbiAgICAgICAgc3dpdGNoKHNlbGVjdGlvblN0YXR1cykge1xyXG4gICAgICAgICAgICBjYXNlICdub25lJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkSXRlbXM6IG5ldyBNYXAoKX0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlbGVjdGVkJzpcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1zID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge3NlbGVjdGVkSXRlbXMuc2V0KEpTT04uc3RyaW5naWZ5KGl0ZW0pLCBpdGVtKX0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRJdGVtc30pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogUmV0dXJuIHNlbGVjdGVkIGl0ZW1zIGluIHRoZSBsaXN0LlxyXG4gICAgKiBAcmV0dXJuIHtBcnJheX0gc2VsZWN0ZWQgaXRlbXNcclxuICAgICovXHJcbiAgICBnZXRTZWxlY3RlZEl0ZW1zKCkge1xyXG4gICAgICAgIGNvbnN0IHtzZWxlY3RlZEl0ZW1zfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkSXRlbXMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBbaXRlbSwgaXNTZWxlY3RlZF0gb2YgdGhpcy5zdGF0ZS5zZWxlY3RlZEl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTZWxlY3RlZCkgc2VsZWN0ZWRJdGVtcy5wdXNoKEpTT04ucGFyc2UoaXRlbSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZEl0ZW1zO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWR1Y2UodGhpcy5yZWZzLCAoYWNjLCByZWYpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWYuZ2V0VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7aXRlbSwgaXNTZWxlY3RlZH0gPSByZWYuZ2V0VmFsdWUoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNTZWxlY3RlZCkgYWNjLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfaGFuZGxlTGluZVNlbGVjdGlvbihkYXRhLCBpc1NlbGVjdGVkKSB7XHJcbiAgICAgICAgY29uc3Qge3NlbGVjdGVkSXRlbXN9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBuZXdTZWxlY3RlZEl0ZW1zID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZEl0ZW1zICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiBzZWxlY3RlZEl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTZWxlY3RlZEl0ZW1zLnNldChrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdTZWxlY3RlZEl0ZW1zLnNldChKU09OLnN0cmluZ2lmeShkYXRhKSwgaXNTZWxlY3RlZCk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEl0ZW1zOiBuZXdTZWxlY3RlZEl0ZW1zfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vblNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdGlvbihkYXRhLCBpc1NlbGVjdGVkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciBsaW5lcyBvZiB0aGUgbGlzdC5cclxuICAgICogQHJldHVybnMgeyp9IERPTSBmb3IgbGluZXNcclxuICAgICovXHJcbiAgICBfcmVuZGVyTGluZXMoKSB7XHJcbiAgICAgICAgY29uc3Qge2RhdGEsIExpbmVDb21wb25lbnQ6IExpbmUsIHNlbGVjdGlvbkRhdGEsIGlkRmllbGQsIHNlbGVjdGlvblN0YXR1cywgLi4ub3RoZXJQcm9wc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmKHNlbGVjdGlvbkRhdGEgJiYgc2VsZWN0aW9uRGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignW0RFUFJFQ0FURURdIFlvdSBhcmUgdXNpbmcgXFwnc2VsZWN0aW9uRGF0YVxcJyBwcm9wIHdoaWNoIGlzIG5vdyBERVBSRUNBVEVELiBQbGVhc2UgdXNlIFxcJ3NlbGVjdGlvbm5hYmxlSW5pdGlhbGl6ZXJcXCcgb24gbGluZSBjb21wb25lbnQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIExFR0FDWSBDT0RFXHJcbiAgICAgICAgY29uc3QgY3VzdG9tTGluZUNvbXBvbmVudCA9IG90aGVyUHJvcHMubGluZUNvbXBvbmVudDtcclxuICAgICAgICBpZiAoY3VzdG9tTGluZUNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJyVjIERFUFJFQ0FURUQgOiBZb3UgYXJlIHVzaW5nIHRoZSBsaW5lQ29tcG9uZW50IHByb3AgaW4gYSBsaXN0IGNvbXBvbmVudCwgdGhpcyB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgcmVsZWFzZSBvZiBGb2N1cyBDb21wb25lbnRzLiBQbGVhc2UgdXNlIExpbmVDb21wb25lbnQgcHJvcCBpbnN0ZWFkLicsICdjb2xvcjogI0ZGOUMwMDsgZm9udC13ZWlnaHQ6IGJvbGQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgRmluYWxMaW5lQ29tcG9uZW50ID0gY3VzdG9tTGluZUNvbXBvbmVudCB8fCBMaW5lO1xyXG4gICAgICAgIC8vIEVORCBPRiBMRUdBQ1kgQ09ERVxyXG4gICAgICAgIGlmKCFpc0FycmF5KGRhdGEpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICAgICAgICAnTGlzdDogTGluZXM6IGl0IHNlZW1zIGRhdGEgaXMgbm90IGFuIGFycmF5LCBwbGVhc2UgY2hlY2sgdGhlIHZhbHVlIGluIHlvdXIgc3RvcmUsIGl0IGNvdWxkIGFsc28gYmUgcmVsYXRlZCB0byB5b3VyIGFjdGlvbiBpbiBjYXNlIG9mIGEgbG9hZCAoaGF2ZSBhIGxvb2sgdG8gc2hvdWxkRHVtcFN0b3JlT25BY3Rpb25DYWxsIG9wdGlvbikuJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YS5tYXAoKGxpbmUsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXNTZWxlY3RlZDtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZmluZChzZWxlY3Rpb25EYXRhLCB7W2lkRmllbGRdOiBsaW5lW2lkRmllbGRdfSk7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQgPSBzZWxlY3Rpb24uaXNTZWxlY3RlZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaChzZWxlY3Rpb25TdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdub25lJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzZWxlY3RlZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdwYXJ0aWFsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RGaW5hbFByb3BzID0gYWRkUmVmVG9Qcm9wc0lmTm90UHVyZShcclxuICAgICAgICAgICAgICAgIEZpbmFsTGluZUNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgLi4ub3RoZXJQcm9wcyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGxpbmUsXHJcbiAgICAgICAgICAgICAgICBpc1NlbGVjdGVkLFxyXG4gICAgICAgICAgICAgICAga2V5OiBsaW5lW2lkRmllbGRdIHx8IGlkeCxcclxuICAgICAgICAgICAgICAgIG9uU2VsZWN0aW9uOiB0aGlzLl9oYW5kbGVMaW5lU2VsZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlOiB0aGlzLl9nZXRSZWZlcmVuY2UoKVxyXG4gICAgICAgICAgICB9LCBgJHtMSU5FfSR7aWR4fWApO1xyXG4gICAgICAgICAgICByZXR1cm4gPEZpbmFsTGluZUNvbXBvbmVudCB7Li4ubGlzdEZpbmFsUHJvcHN9IC8+O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgbG9hZGluZyBzdGF0ZVxyXG4gICAgKiBAcmV0dXJuIHtIVE1MfSB0aGUgbG9hZGluZyBzdGF0ZVxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJMb2FkaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc0xvYWRpbmcsIGxvYWRlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmKGlzTG9hZGluZykge1xyXG4gICAgICAgICAgICBpZihsb2FkZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsb2FkZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT0nc2wtbG9hZGluZyc+e3RoaXMuaTE4bignbGlzdC5sb2FkaW5nJyl9IC4uLjwvbGk+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgbWFudWFsIGZldGNoIHN0YXRlXHJcbiAgICAqIEByZXR1cm4ge0hUTUx9IHRoZSByZW5kZXJlZCBtYW51YWwgZmV0Y2ggc3RhdGVcclxuICAgICovXHJcbiAgICBfcmVuZGVyTWFudWFsRmV0Y2goKSB7XHJcbiAgICAgICAgY29uc3Qge2lzTWFudWFsRmV0Y2gsIGhhc01vcmVEYXRhfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYoaXNNYW51YWxGZXRjaCAmJiBoYXNNb3JlRGF0YSkge1xyXG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IHtjbGFzc05hbWU6ICdwcmltYXJ5J307XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPSdzbC1idXR0b24nPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlT25DbGljaz17dGhpcy5oYW5kbGVTaG93TW9yZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw9J2xpc3QuYnV0dG9uLnNob3dNb3JlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9J2J1dHRvbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUoe3NlbGVjdGlvblN0YXR1c30sIHtzZWxlY3RlZEl0ZW1zfSkge1xyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZEl0ZW1zID09PSB0aGlzLnN0YXRlLnNlbGVjdGVkSXRlbXMgfHwgc2VsZWN0ZWRJdGVtcy5zaXplID09PSAwIHx8IHNlbGVjdGlvblN0YXR1cyAhPT0gdGhpcy5wcm9wcy5zZWxlY3Rpb25TdGF0dXM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGxpc3QuXHJcbiAgICAqIEByZXR1cm5zIHtYTUx9IERPTSBvZiB0aGUgY29tcG9uZW50XHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc1NlbGVjdGlvbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx1bCBkYXRhLWZvY3VzPSdzZWxlY3Rpb24tbGlzdCcgZGF0YS1zZWxlY3Rpb249e2lzU2VsZWN0aW9ufT5cclxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJMaW5lcygpfVxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlckxvYWRpbmcoKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJNYW51YWxGZXRjaCgpfVxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIobGlzdE1peGluKTtcclxuIl19