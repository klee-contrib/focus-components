'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _topicDisplayer = require('../../components/topic-displayer');

var _topicDisplayer2 = _interopRequireDefault(_topicDisplayer);

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

var _grid = require('../../components/grid');

var _grid2 = _interopRequireDefault(_grid);

var _column = require('../../components/column');

var _column2 = _interopRequireDefault(_column);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies
var _require = require('lodash/collection'),
    reduce = _require.reduce;

// Components

var Dropdown = require('../../common/select-action').component;
var ActionContextual = require('../action-contextual').component;


// Mixins

var translationMixin = require('../../common/i18n/mixin');

var ActionBar = {

  /**
  * Display name.
  */
  displayName: 'ListActionBar',

  mixins: [translationMixin],

  propTypes: {
    facetClickAction: _react.PropTypes.func,
    facetList: _react.PropTypes.object,
    groupAction: _react.PropTypes.func,
    groupLabelPrefix: _react.PropTypes.string,
    groupSelectedKey: _react.PropTypes.string,
    groupableColumnList: _react.PropTypes.object,
    hasGrouping: _react.PropTypes.bool.isRequired,
    isSelection: _react.PropTypes.bool.isRequired,
    operationList: _react.PropTypes.array,
    orderAction: _react.PropTypes.func,
    orderSelected: _react.PropTypes.object,
    orderableColumnList: _react.PropTypes.array, // [{key:'columnKey', label:'columnLabel'}]
    selectionAction: _react.PropTypes.func,
    selectionStatus: _react.PropTypes.string // none, selected, partial
  },

  /**
  * INit default props
  * @returns {object} Defautkl props.
  */
  getDefaultProps: function getDefaultProps() {
    return {
      isSelection: true,
      hasGrouping: true,
      selectionStatus: 'none', // none, selected, partial
      selectionAction: function selectionAction(selectionStatus) {
        console.warn(selectionStatus);
      },
      // Action on selection click
      orderableColumnList: undefined, // [{key:'columnKey', label:'columnLabel'}]
      orderAction: function orderAction(key, order) {
        console.warn(key + '-' + order);
      },
      // Action on click on order function
      orderSelected: {},
      facetClickAction: function facetClickAction(key) {
        console.warn(key);
      },
      // Action when click on facet
      facetList: {}, // {facet1: 'Label of facet one', facet2:'Label of facet 2'} List of facets
      groupableColumnList: {}, // {col1: 'Label1', col2: 'Label2'}
      groupAction: function groupAction(key) {
        console.warn(key);
      },
      // Action on group function
      operationList: [], // List of contextual operations
      groupLabelPrefix: ''
    };
  },


  /**
  * @returns {JSX} Selection component.
  * @private
  */
  _getSelectionObject: function _getSelectionObject() {
    var _this = this;

    var onIconClick = function onIconClick() {
      var newSelectionStatus = _this.props.selectionStatus === 'none' ? 'selected' : 'none';
      _this.props.selectionAction(newSelectionStatus);
    };
    return _react2.default.createElement(_button2.default, { shape: 'icon', icon: this._getSelectionObjectIcon(), handleOnClick: onIconClick });
  },


  /**
  * @returns {JSX} Order component.
  * @private
  */
  _getOrderObject: function _getOrderObject() {
    if (this.props.orderableColumnList) {
      var orderSelectedParsedKey = this.props.orderSelected.key + this.props.orderSelected.order;
      var orderOperationList = []; // [{key:'columnKey', order:'asc', label:'columnLabel'}]
      for (var key in this.props.orderableColumnList) {
        var description = this.props.orderableColumnList[key];
        orderOperationList.push({
          action: this._orderFunction(description.key, description.order),
          label: description.label,
          style: this._getSelectedStyle(description.key + description.order, orderSelectedParsedKey)
        });
      }
      var orderIcon = 'sort_by_alpha';
      return _react2.default.createElement(Dropdown, { iconProps: { name: orderIcon }, key: 'down', operationList: orderOperationList });
    }
    return null;
  },


  /**
  * @returns {JSX} Grouping component.
  * @private
  */
  _getGroupObject: function _getGroupObject() {
    var _this2 = this;

    var hasGrouping = this.props.hasGrouping;

    if (hasGrouping) {
      var _props = this.props,
          groupLabelPrefix = _props.groupLabelPrefix,
          groupSelectedKey = _props.groupSelectedKey,
          groupableColumnList = _props.groupableColumnList,
          style = _props.style;

      var groupOperationList = reduce(groupableColumnList, function (operationList, label, key) {
        operationList.push({
          action: _this2._groupFunction(key),
          label: _this2.i18n(groupLabelPrefix + label),
          style: _this2._getSelectedStyle(key, groupSelectedKey)
        });
        return operationList;
      }, []).concat([{
        label: this.i18n('list.actionBar.ungroup'),
        action: this._groupFunction()
      }]);
      var groupIcon = 'folder_open';
      return _react2.default.createElement(Dropdown, { iconProps: { name: groupIcon }, operationList: groupOperationList });
    }
    return null;
  },


  /**
  * @param {string} currentKey Current selected key.
  * @param {string} selectedKey Key corresponding to the selected one.
  * @returns {string} Class selected if currentKey corresponds to the selectedKey.
  * @private
  */
  _getSelectedStyle: function _getSelectedStyle(currentKey, selectedKey) {
    if (currentKey === selectedKey) {
      return ' selected ';
    }
    return undefined;
  },


  /**
  * @return {string} Class of the selection component icon.
  * @private
  */
  _getSelectionObjectIcon: function _getSelectionObjectIcon() {
    if ('none' === this.props.selectionStatus) {
      return 'check_box_outline_blank';
    } else if ('selected' === this.props.selectionStatus) {
      return 'check_box';
    }
    return 'indeterminate_check_box';
  },
  _orderFunction: function _orderFunction(key, order) {
    var _this3 = this;

    return function () {
      _this3.props.orderAction(key, order);
    };
  },
  _groupFunction: function _groupFunction(key) {
    var _this4 = this;

    return function () {
      _this4.props.groupAction(key);
    };
  },


  /**
  * Render the html
  * @returns {JSX} Htm content.
  */
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'mdl-grid', 'data-focus': 'list-action-bar' },
      _react2.default.createElement(
        'div',
        { className: 'mdl-cell', 'data-focus': 'global-list-content' },
        this.props.isSelection && this._getSelectionObject(),
        this._getOrderObject(),
        this._getGroupObject()
      ),
      _react2.default.createElement(
        'div',
        { className: 'mdl-cell mdl-cell--hide-tablet mdl-cell--hide-phone', 'data-focus': 'selected-facet-content' },
        _react2.default.createElement(_topicDisplayer2.default, {
          displayLabels: true,
          topicClickAction: this.props.facetClickAction,
          topicList: this.props.facetList })
      ),
      _react2.default.createElement(
        'div',
        { className: 'mdl-cell', 'data-focus': 'contextual-action-content' },
        _react2.default.createElement(ActionContextual, { operationList: this.props.operationList })
      )
    );
  }
};

module.exports = (0, _builder2.default)(ActionBar);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwicmVkdWNlIiwiRHJvcGRvd24iLCJjb21wb25lbnQiLCJBY3Rpb25Db250ZXh0dWFsIiwidHJhbnNsYXRpb25NaXhpbiIsIkFjdGlvbkJhciIsImRpc3BsYXlOYW1lIiwibWl4aW5zIiwicHJvcFR5cGVzIiwiZmFjZXRDbGlja0FjdGlvbiIsImZ1bmMiLCJmYWNldExpc3QiLCJvYmplY3QiLCJncm91cEFjdGlvbiIsImdyb3VwTGFiZWxQcmVmaXgiLCJzdHJpbmciLCJncm91cFNlbGVjdGVkS2V5IiwiZ3JvdXBhYmxlQ29sdW1uTGlzdCIsImhhc0dyb3VwaW5nIiwiYm9vbCIsImlzUmVxdWlyZWQiLCJpc1NlbGVjdGlvbiIsIm9wZXJhdGlvbkxpc3QiLCJhcnJheSIsIm9yZGVyQWN0aW9uIiwib3JkZXJTZWxlY3RlZCIsIm9yZGVyYWJsZUNvbHVtbkxpc3QiLCJzZWxlY3Rpb25BY3Rpb24iLCJzZWxlY3Rpb25TdGF0dXMiLCJnZXREZWZhdWx0UHJvcHMiLCJjb25zb2xlIiwid2FybiIsInVuZGVmaW5lZCIsImtleSIsIm9yZGVyIiwiX2dldFNlbGVjdGlvbk9iamVjdCIsIm9uSWNvbkNsaWNrIiwibmV3U2VsZWN0aW9uU3RhdHVzIiwicHJvcHMiLCJfZ2V0U2VsZWN0aW9uT2JqZWN0SWNvbiIsIl9nZXRPcmRlck9iamVjdCIsIm9yZGVyU2VsZWN0ZWRQYXJzZWRLZXkiLCJvcmRlck9wZXJhdGlvbkxpc3QiLCJkZXNjcmlwdGlvbiIsInB1c2giLCJhY3Rpb24iLCJfb3JkZXJGdW5jdGlvbiIsImxhYmVsIiwic3R5bGUiLCJfZ2V0U2VsZWN0ZWRTdHlsZSIsIm9yZGVySWNvbiIsIm5hbWUiLCJfZ2V0R3JvdXBPYmplY3QiLCJncm91cE9wZXJhdGlvbkxpc3QiLCJfZ3JvdXBGdW5jdGlvbiIsImkxOG4iLCJjb25jYXQiLCJncm91cEljb24iLCJjdXJyZW50S2V5Iiwic2Vs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RkQ7QUFHRCxHQXJKZTtBQXNKaEJvQixnQkF0SmdCLDBCQXNKRHJCLEdBdEpDLEVBc0pJO0FBQUE7O0FBQ2xCLFdBQU8sWUFBTTtBQUNYLGFBQUtLLEtBQUwsQ0FBV3pCLFdBQVgsQ0FBdUJvQixHQUF2QjtBQUNELEtBRkQ7QUFHRCxHQTFKZTs7O0FBNEpoQjs7OztBQUlBMkIsUUFoS2dCLG9CQWdLUDtBQUNQLFdBQ0U7QUFBQTtBQUFBLFFBQUssV0FBVSxVQUFmLEVBQTBCLGNBQVcsaUJBQXJDO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxVQUFmLEVBQTBCLGNBQVcscUJBQXJDO0FBQ0csYUFBS3RCLEtBQUwsQ0FBV2pCLFdBQVgsSUFBMEIsS0FBS2MsbUJBQUwsRUFEN0I7QUFFRyxhQUFLSyxlQUFMLEVBRkg7QUFHRyxhQUFLWSxlQUFMO0FBSEgsT0FERjtBQU1FO0FBQUE7QUFBQSxVQUFLLFdBQVUscURBQWYsRUFBcUUsY0FBVyx3QkFBaEY7QUFDRTtBQUNFLDZCQURGO0FBRUUsNEJBQWtCLEtBQUtkLEtBQUwsQ0FBVzdCLGdCQUYvQjtBQUdFLHFCQUFXLEtBQUs2QixLQUFMLENBQVczQixTQUh4QjtBQURGLE9BTkY7QUFZRTtBQUFBO0FBQUEsVUFBSyxXQUFVLFVBQWYsRUFBMEIsY0FBVywyQkFBckM7QUFDRSxzQ0FBQyxnQkFBRCxJQUFrQixlQUFlLEtBQUsyQixLQUFMLENBQVdoQixhQUE1QztBQURGO0FBWkYsS0FERjtBQWtCRDtBQW5MZSxDQUFsQjs7QUFzTEF1QyxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRekQsU0FBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXBlbmRlbmNpZXNcclxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5jb25zdCB7cmVkdWNlfSA9IHJlcXVpcmUoJ2xvZGFzaC9jb2xsZWN0aW9uJyk7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcblxyXG5jb25zdCBEcm9wZG93biA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi9zZWxlY3QtYWN0aW9uJykuY29tcG9uZW50O1xyXG5jb25zdCBBY3Rpb25Db250ZXh0dWFsID0gcmVxdWlyZSgnLi4vYWN0aW9uLWNvbnRleHR1YWwnKS5jb21wb25lbnQ7XHJcbmltcG9ydCBUb3BpY0Rpc3BsYXllciBmcm9tICcuLi8uLi9jb21wb25lbnRzL3RvcGljLWRpc3BsYXllcic7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9idXR0b24nO1xyXG5cclxuaW1wb3J0IEdyaWQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9ncmlkJztcclxuaW1wb3J0IENvbHVtbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbHVtbic7XHJcblxyXG4vLyBNaXhpbnNcclxuXHJcbmNvbnN0IHRyYW5zbGF0aW9uTWl4aW4gPSByZXF1aXJlKCcuLi8uLi9jb21tb24vaTE4bi9taXhpbicpO1xyXG5cclxuY29uc3QgQWN0aW9uQmFyID0ge1xyXG5cclxuICAvKipcclxuICAqIERpc3BsYXkgbmFtZS5cclxuICAqL1xyXG4gIGRpc3BsYXlOYW1lOiAnTGlzdEFjdGlvbkJhcicsXHJcblxyXG4gIG1peGluczogW3RyYW5zbGF0aW9uTWl4aW5dLFxyXG5cclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGZhY2V0Q2xpY2tBY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgZmFjZXRMaXN0OiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgZ3JvdXBBY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgZ3JvdXBMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGdyb3VwU2VsZWN0ZWRLZXk6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBncm91cGFibGVDb2x1bW5MaXN0OiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgaGFzR3JvdXBpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBpc1NlbGVjdGlvbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIG9wZXJhdGlvbkxpc3Q6IFByb3BUeXBlcy5hcnJheSxcclxuICAgIG9yZGVyQWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9yZGVyU2VsZWN0ZWQ6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICBvcmRlcmFibGVDb2x1bW5MaXN0OiBQcm9wVHlwZXMuYXJyYXksIC8vIFt7a2V5Oidjb2x1bW5LZXknLCBsYWJlbDonY29sdW1uTGFiZWwnfV1cclxuICAgIHNlbGVjdGlvbkFjdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBzZWxlY3Rpb25TdGF0dXM6IFByb3BUeXBlcy5zdHJpbmcgLy8gbm9uZSwgc2VsZWN0ZWQsIHBhcnRpYWxcclxuICB9LFxyXG5cclxuXHJcbiAgLyoqXHJcbiAgKiBJTml0IGRlZmF1bHQgcHJvcHNcclxuICAqIEByZXR1cm5zIHtvYmplY3R9IERlZmF1dGtsIHByb3BzLlxyXG4gICovXHJcbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaXNTZWxlY3Rpb246IHRydWUsXHJcbiAgICAgIGhhc0dyb3VwaW5nOiB0cnVlLFxyXG4gICAgICBzZWxlY3Rpb25TdGF0dXM6ICdub25lJywgLy8gbm9uZSwgc2VsZWN0ZWQsIHBhcnRpYWxcclxuICAgICAgc2VsZWN0aW9uQWN0aW9uKHNlbGVjdGlvblN0YXR1cykge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihzZWxlY3Rpb25TdGF0dXMpO1xyXG4gICAgICB9LCAvLyBBY3Rpb24gb24gc2VsZWN0aW9uIGNsaWNrXHJcbiAgICAgIG9yZGVyYWJsZUNvbHVtbkxpc3Q6IHVuZGVmaW5lZCwgLy8gW3trZXk6J2NvbHVtbktleScsIGxhYmVsOidjb2x1bW5MYWJlbCd9XVxyXG4gICAgICBvcmRlckFjdGlvbihrZXksIG9yZGVyKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGtleSArICctJyArIG9yZGVyKTtcclxuICAgICAgfSwgLy8gQWN0aW9uIG9uIGNsaWNrIG9uIG9yZGVyIGZ1bmN0aW9uXHJcbiAgICAgIG9yZGVyU2VsZWN0ZWQ6IHt9LFxyXG4gICAgICBmYWNldENsaWNrQWN0aW9uKGtleSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihrZXkpO1xyXG4gICAgICB9LCAvLyBBY3Rpb24gd2hlbiBjbGljayBvbiBmYWNldFxyXG4gICAgICBmYWNldExpc3Q6IHt9LCAvLyB7ZmFjZXQxOiAnTGFiZWwgb2YgZmFjZXQgb25lJywgZmFjZXQyOidMYWJlbCBvZiBmYWNldCAyJ30gTGlzdCBvZiBmYWNldHNcclxuICAgICAgZ3JvdXBhYmxlQ29sdW1uTGlzdDoge30sIC8vIHtjb2wxOiAnTGFiZWwxJywgY29sMjogJ0xhYmVsMid9XHJcbiAgICAgIGdyb3VwQWN0aW9uKGtleSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihrZXkpO1xyXG4gICAgICB9LCAvLyBBY3Rpb24gb24gZ3JvdXAgZnVuY3Rpb25cclxuICAgICAgb3BlcmF0aW9uTGlzdDogW10sIC8vIExpc3Qgb2YgY29udGV4dHVhbCBvcGVyYXRpb25zXHJcbiAgICAgIGdyb3VwTGFiZWxQcmVmaXg6ICcnXHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICogQHJldHVybnMge0pTWH0gU2VsZWN0aW9uIGNvbXBvbmVudC5cclxuICAqIEBwcml2YXRlXHJcbiAgKi9cclxuICBfZ2V0U2VsZWN0aW9uT2JqZWN0KCkge1xyXG4gICAgY29uc3Qgb25JY29uQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5ld1NlbGVjdGlvblN0YXR1cyA9IHRoaXMucHJvcHMuc2VsZWN0aW9uU3RhdHVzID09PSAnbm9uZScgPyAnc2VsZWN0ZWQnIDogJ25vbmUnO1xyXG4gICAgICB0aGlzLnByb3BzLnNlbGVjdGlvbkFjdGlvbihuZXdTZWxlY3Rpb25TdGF0dXMpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiA8QnV0dG9uIHNoYXBlPSdpY29uJyBpY29uPXt0aGlzLl9nZXRTZWxlY3Rpb25PYmplY3RJY29uKCl9IGhhbmRsZU9uQ2xpY2s9e29uSWNvbkNsaWNrfSAvPjtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAqIEByZXR1cm5zIHtKU1h9IE9yZGVyIGNvbXBvbmVudC5cclxuICAqIEBwcml2YXRlXHJcbiAgKi9cclxuICBfZ2V0T3JkZXJPYmplY3QoKSB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5vcmRlcmFibGVDb2x1bW5MaXN0KSB7XHJcbiAgICAgIGNvbnN0IG9yZGVyU2VsZWN0ZWRQYXJzZWRLZXkgPSB0aGlzLnByb3BzLm9yZGVyU2VsZWN0ZWQua2V5ICsgdGhpcy5wcm9wcy5vcmRlclNlbGVjdGVkLm9yZGVyO1xyXG4gICAgICBjb25zdCBvcmRlck9wZXJhdGlvbkxpc3QgPSBbXTsgLy8gW3trZXk6J2NvbHVtbktleScsIG9yZGVyOidhc2MnLCBsYWJlbDonY29sdW1uTGFiZWwnfV1cclxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5wcm9wcy5vcmRlcmFibGVDb2x1bW5MaXN0KSB7XHJcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSB0aGlzLnByb3BzLm9yZGVyYWJsZUNvbHVtbkxpc3Rba2V5XTtcclxuICAgICAgICBvcmRlck9wZXJhdGlvbkxpc3QucHVzaCh7XHJcbiAgICAgICAgICBhY3Rpb246IHRoaXMuX29yZGVyRnVuY3Rpb24oZGVzY3JpcHRpb24ua2V5LCBkZXNjcmlwdGlvbi5vcmRlciksXHJcbiAgICAgICAgICBsYWJlbDogZGVzY3JpcHRpb24ubGFiZWwsXHJcbiAgICAgICAgICBzdHlsZTogdGhpcy5fZ2V0U2VsZWN0ZWRTdHlsZShkZXNjcmlwdGlvbi5rZXkgKyBkZXNjcmlwdGlvbi5vcmRlciwgb3JkZXJTZWxlY3RlZFBhcnNlZEtleSlcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBvcmRlckljb24gPSAnc29ydF9ieV9hbHBoYSc7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPERyb3Bkb3duIGljb25Qcm9wcz17e25hbWU6IG9yZGVySWNvbn19IGtleT0nZG93bicgb3BlcmF0aW9uTGlzdD17b3JkZXJPcGVyYXRpb25MaXN0fS8+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAqIEByZXR1cm5zIHtKU1h9IEdyb3VwaW5nIGNvbXBvbmVudC5cclxuICAqIEBwcml2YXRlXHJcbiAgKi9cclxuICBfZ2V0R3JvdXBPYmplY3QoKSB7XHJcbiAgICBjb25zdCB7aGFzR3JvdXBpbmd9ID0gdGhpcy5wcm9wcztcclxuICAgIGlmKGhhc0dyb3VwaW5nKSB7XHJcbiAgICAgIGNvbnN0IHtncm91cExhYmVsUHJlZml4LCBncm91cFNlbGVjdGVkS2V5LCBncm91cGFibGVDb2x1bW5MaXN0LCBzdHlsZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICBjb25zdCBncm91cE9wZXJhdGlvbkxpc3QgPSByZWR1Y2UoZ3JvdXBhYmxlQ29sdW1uTGlzdCwgKG9wZXJhdGlvbkxpc3QsIGxhYmVsLCBrZXkpID0+IHtcclxuICAgICAgICBvcGVyYXRpb25MaXN0LnB1c2goe1xyXG4gICAgICAgICAgYWN0aW9uOiB0aGlzLl9ncm91cEZ1bmN0aW9uKGtleSksXHJcbiAgICAgICAgICBsYWJlbDogdGhpcy5pMThuKGdyb3VwTGFiZWxQcmVmaXggKyBsYWJlbCksXHJcbiAgICAgICAgICBzdHlsZTogdGhpcy5fZ2V0U2VsZWN0ZWRTdHlsZShrZXksIGdyb3VwU2VsZWN0ZWRLZXkpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG9wZXJhdGlvbkxpc3Q7XHJcbiAgICAgIH0sIFtdKS5jb25jYXQoW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5pMThuKCdsaXN0LmFjdGlvbkJhci51bmdyb3VwJyksXHJcbiAgICAgICAgYWN0aW9uOiB0aGlzLl9ncm91cEZ1bmN0aW9uKClcclxuICAgICAgfV0pO1xyXG4gICAgICBjb25zdCBncm91cEljb24gPSdmb2xkZXJfb3Blbic7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPERyb3Bkb3duIGljb25Qcm9wcz17e25hbWU6IGdyb3VwSWNvbn19IG9wZXJhdGlvbkxpc3Q9e2dyb3VwT3BlcmF0aW9uTGlzdH0vPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVudEtleSBDdXJyZW50IHNlbGVjdGVkIGtleS5cclxuICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RlZEtleSBLZXkgY29ycmVzcG9uZGluZyB0byB0aGUgc2VsZWN0ZWQgb25lLlxyXG4gICogQHJldHVybnMge3N0cmluZ30gQ2xhc3Mgc2VsZWN0ZWQgaWYgY3VycmVudEtleSBjb3JyZXNwb25kcyB0byB0aGUgc2VsZWN0ZWRLZXkuXHJcbiAgKiBAcHJpdmF0ZVxyXG4gICovXHJcbiAgX2dldFNlbGVjdGVkU3R5bGUoY3VycmVudEtleSwgc2VsZWN0ZWRLZXkpIHtcclxuICAgIGlmIChjdXJyZW50S2V5ID09PSBzZWxlY3RlZEtleSkge1xyXG4gICAgICByZXR1cm4gJyBzZWxlY3RlZCAnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAqIEByZXR1cm4ge3N0cmluZ30gQ2xhc3Mgb2YgdGhlIHNlbGVjdGlvbiBjb21wb25lbnQgaWNvbi5cclxuICAqIEBwcml2YXRlXHJcbiAgKi9cclxuICBfZ2V0U2VsZWN0aW9uT2JqZWN0SWNvbigpIHtcclxuICAgIGlmICgnbm9uZScgPT09IHRoaXMucHJvcHMuc2VsZWN0aW9uU3RhdHVzKSB7XHJcbiAgICAgIHJldHVybiAnY2hlY2tfYm94X291dGxpbmVfYmxhbmsnO1xyXG4gICAgfSBlbHNlIGlmICgnc2VsZWN0ZWQnID09PSB0aGlzLnByb3BzLnNlbGVjdGlvblN0YXR1cykge1xyXG4gICAgICByZXR1cm4gJ2NoZWNrX2JveCc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJ2luZGV0ZXJtaW5hdGVfY2hlY2tfYm94JztcclxuICB9LFxyXG4gIF9vcmRlckZ1bmN0aW9uKGtleSwgb3JkZXIpIHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRoaXMucHJvcHMub3JkZXJBY3Rpb24oa2V5LCBvcmRlcik7XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgX2dyb3VwRnVuY3Rpb24oa2V5KSB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB0aGlzLnByb3BzLmdyb3VwQWN0aW9uKGtleSk7XHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICogUmVuZGVyIHRoZSBodG1sXHJcbiAgKiBAcmV0dXJucyB7SlNYfSBIdG0gY29udGVudC5cclxuICAqL1xyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdtZGwtZ3JpZCcgZGF0YS1mb2N1cz0nbGlzdC1hY3Rpb24tYmFyJz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWRsLWNlbGwnIGRhdGEtZm9jdXM9J2dsb2JhbC1saXN0LWNvbnRlbnQnPlxyXG4gICAgICAgICAge3RoaXMucHJvcHMuaXNTZWxlY3Rpb24gJiYgdGhpcy5fZ2V0U2VsZWN0aW9uT2JqZWN0KCl9XHJcbiAgICAgICAgICB7dGhpcy5fZ2V0T3JkZXJPYmplY3QoKX1cclxuICAgICAgICAgIHt0aGlzLl9nZXRHcm91cE9iamVjdCgpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtZGwtY2VsbCBtZGwtY2VsbC0taGlkZS10YWJsZXQgbWRsLWNlbGwtLWhpZGUtcGhvbmUnIGRhdGEtZm9jdXM9J3NlbGVjdGVkLWZhY2V0LWNvbnRlbnQnPlxyXG4gICAgICAgICAgPFRvcGljRGlzcGxheWVyXHJcbiAgICAgICAgICAgIGRpc3BsYXlMYWJlbHNcclxuICAgICAgICAgICAgdG9waWNDbGlja0FjdGlvbj17dGhpcy5wcm9wcy5mYWNldENsaWNrQWN0aW9ufVxyXG4gICAgICAgICAgICB0b3BpY0xpc3Q9e3RoaXMucHJvcHMuZmFjZXRMaXN0fSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtZGwtY2VsbCcgZGF0YS1mb2N1cz0nY29udGV4dHVhbC1hY3Rpb24tY29udGVudCc+XHJcbiAgICAgICAgICA8QWN0aW9uQ29udGV4dHVhbCBvcGVyYXRpb25MaXN0PXt0aGlzLnByb3BzLm9wZXJhdGlvbkxpc3R9Lz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihBY3Rpb25CYXIpO1xyXG4iXX0=