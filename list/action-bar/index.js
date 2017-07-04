'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _collection = require('lodash/collection');

var _topicDisplayer = require('../../components/topic-displayer');

var _topicDisplayer2 = _interopRequireDefault(_topicDisplayer);

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Components

var Dropdown = require('../../common/select-action').component; // Dependencies

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

      var groupOperationList = (0, _collection.reduce)(groupableColumnList, function (operationList, label, key) {
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
          topicList: this.props.facetList
        })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJEcm9wZG93biIsInJlcXVpcmUiLCJjb21wb25lbnQiLCJBY3Rpb25Db250ZXh0dWFsIiwidHJhbnNsYXRpb25NaXhpbiIsIkFjdGlvbkJhciIsImRpc3BsYXlOYW1lIiwibWl4aW5zIiwicHJvcFR5cGVzIiwiZmFjZXRDbGlja0FjdGlvbiIsImZ1bmMiLCJmYWNldExpc3QiLCJvYmplY3QiLCJncm91cEFjdGlvbiIsImdyb3VwTGFiZWxQcmVmaXgiLCJzdHJpbmciLCJncm91cFNlbGVjdGVkS2V5IiwiZ3JvdXBhYmxlQ29sdW1uTGlzdCIsImhhc0dyb3VwaW5nIiwiYm9vbCIsImlzUmVxdWlyZWQiLCJpc1NlbGVjdGlvbiIsIm9wZXJhdGlvbkxpc3QiLCJhcnJheSIsIm9yZGVyQWN0aW9uIiwib3JkZXJTZWxlY3RlZCIsIm9yZGVyYWJsZUNvbHVtbkxpc3QiLCJzZWxlY3Rpb25BY3Rpb24iLCJzZWxlY3Rpb25TdGF0dXMiLCJnZXREZWZhdWx0UHJvcHMiLCJjb25zb2xlIiwid2FybiIsInVuZGVmaW5lZCIsImtleSIsIm9yZGVyIiwiX2dldFNlbGVjdGlvbk9iamVjdCIsIm9uSWNvbkNsaWNrIiwibmV3U2VsZWN0aW9uU3RhdHVzIiwicHJvcHMiLCJfZ2V0U2VsZWN0aW9uT2JqZWN0SWNvbiIsIl9nZXRPcmRlck9iamVjdCIsIm9yZGVyU2VsZWN0ZWRQYXJzZWRLZXkiLCJvcmRlck9wZXJhdGlvbkxpc3QiLCJkZXNjcmlwdGlvbiIsInB1c2giLCJhY3Rpb24iLCJfb3JkZXJGdW5jdGlvbiIsImxhYmVsIiwic3R5bGUiLCJfZ2V0U2VsZWN0ZWRTdHlsZSIsIm9yZGVySWNvbiIsIm5hbWUiLCJfZ2V0R3JvdXBPYmplY3QiLCJncm91cE9wZXJhdGlvbkxpc3QiLCJfZ3JvdXBGdW5jdGlvbiIsImkxOG4iLCJjb25jYXQiLCJncm91cEljb24iLCJjdXJyZW50S2V5Iiwic2VsZWN0ZWRLZXki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V0FBTyxZQUFNO0FBQ1gsYUFBS0ssS0FBTCxDQUFXekIsV0FBWCxDQUF1Qm9CLEdBQXZCO0FBQ0gsS0FGQztBQUdILEdBMUplOzs7QUE0SmhCOzs7O0FBSUUyQixRQWhLYyxvQkFnS0w7QUFDUCxXQUNFO0FBQUE7QUFBQSxRQUFLLFdBQVUsVUFBZixFQUEwQixjQUFXLGlCQUFyQztBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsVUFBZixFQUEwQixjQUFXLHFCQUFyQztBQUNHLGFBQUt0QixLQUFMLENBQVdqQixXQUFYLElBQTBCLEtBQUtjLG1CQUFMLEVBRDdCO0FBRUcsYUFBS0ssZUFBTCxFQUZIO0FBR0csYUFBS1ksZUFBTDtBQUhILE9BREY7QUFNRTtBQUFBO0FBQUEsVUFBSyxXQUFVLHFEQUFmLEVBQXFFLGNBQVcsd0JBQWhGO0FBQ0U7QUFDRSw2QkFERjtBQUVFLDRCQUFrQixLQUFLZCxLQUFMLENBQVc3QixnQkFGL0I7QUFHRSxxQkFBVyxLQUFLNkIsS0FBTCxDQUFXM0I7QUFIeEI7QUFERixPQU5GO0FBYUU7QUFBQTtBQUFBLFVBQUssV0FBVSxVQUFmLEVBQTBCLGNBQVcsMkJBQXJDO0FBQ0Usc0NBQUMsZ0JBQUQsSUFBa0IsZUFBZSxLQUFLMkIsS0FBTCxDQUFXaEIsYUFBNUM7QUFERjtBQWJGLEtBREY7QUFtQkg7QUFwTGUsQ0FBbEI7O0FBdUxBdUMsT0FBT0MsT0FBUCxHQUFpQix1QkFBUXpELFNBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgeyByZWR1Y2UgfSBmcm9tICdsb2Rhc2gvY29sbGVjdGlvbic7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcblxyXG5jb25zdCBEcm9wZG93biA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi9zZWxlY3QtYWN0aW9uJykuY29tcG9uZW50O1xyXG5jb25zdCBBY3Rpb25Db250ZXh0dWFsID0gcmVxdWlyZSgnLi4vYWN0aW9uLWNvbnRleHR1YWwnKS5jb21wb25lbnQ7XHJcbmltcG9ydCBUb3BpY0Rpc3BsYXllciBmcm9tICcuLi8uLi9jb21wb25lbnRzL3RvcGljLWRpc3BsYXllcic7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9idXR0b24nO1xyXG5cclxuLy8gTWl4aW5zXHJcblxyXG5jb25zdCB0cmFuc2xhdGlvbk1peGluID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uL2kxOG4vbWl4aW4nKTtcclxuXHJcbmNvbnN0IEFjdGlvbkJhciA9IHtcclxuXHJcbiAgLyoqXHJcbiAgKiBEaXNwbGF5IG5hbWUuXHJcbiAgKi9cclxuICAgIGRpc3BsYXlOYW1lOiAnTGlzdEFjdGlvbkJhcicsXHJcblxyXG4gICAgbWl4aW5zOiBbdHJhbnNsYXRpb25NaXhpbl0sXHJcblxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgIGZhY2V0Q2xpY2tBY3Rpb246IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICBmYWNldExpc3Q6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICAgIGdyb3VwQWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgZ3JvdXBMYWJlbFByZWZpeDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgZ3JvdXBTZWxlY3RlZEtleTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgZ3JvdXBhYmxlQ29sdW1uTGlzdDogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgaGFzR3JvdXBpbmc6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgIGlzU2VsZWN0aW9uOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICBvcGVyYXRpb25MaXN0OiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgICAgIG9yZGVyQWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgb3JkZXJTZWxlY3RlZDogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgb3JkZXJhYmxlQ29sdW1uTGlzdDogUHJvcFR5cGVzLmFycmF5LCAvLyBbe2tleTonY29sdW1uS2V5JywgbGFiZWw6J2NvbHVtbkxhYmVsJ31dXHJcbiAgICAgIHNlbGVjdGlvbkFjdGlvbjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgIHNlbGVjdGlvblN0YXR1czogUHJvcFR5cGVzLnN0cmluZyAvLyBub25lLCBzZWxlY3RlZCwgcGFydGlhbFxyXG4gIH0sXHJcblxyXG5cclxuICAvKipcclxuICAqIElOaXQgZGVmYXVsdCBwcm9wc1xyXG4gICogQHJldHVybnMge29iamVjdH0gRGVmYXV0a2wgcHJvcHMuXHJcbiAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpc1NlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgICBoYXNHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICBzZWxlY3Rpb25TdGF0dXM6ICdub25lJywgLy8gbm9uZSwgc2VsZWN0ZWQsIHBhcnRpYWxcclxuICAgICAgICBzZWxlY3Rpb25BY3Rpb24oc2VsZWN0aW9uU3RhdHVzKSB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oc2VsZWN0aW9uU3RhdHVzKTtcclxuICAgICAgfSwgLy8gQWN0aW9uIG9uIHNlbGVjdGlvbiBjbGlja1xyXG4gICAgICAgIG9yZGVyYWJsZUNvbHVtbkxpc3Q6IHVuZGVmaW5lZCwgLy8gW3trZXk6J2NvbHVtbktleScsIGxhYmVsOidjb2x1bW5MYWJlbCd9XVxyXG4gICAgICAgIG9yZGVyQWN0aW9uKGtleSwgb3JkZXIpIHtcclxuICAgICAgICAgIGNvbnNvbGUud2FybihrZXkgKyAnLScgKyBvcmRlcik7XHJcbiAgICAgIH0sIC8vIEFjdGlvbiBvbiBjbGljayBvbiBvcmRlciBmdW5jdGlvblxyXG4gICAgICAgIG9yZGVyU2VsZWN0ZWQ6IHt9LFxyXG4gICAgICAgIGZhY2V0Q2xpY2tBY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oa2V5KTtcclxuICAgICAgfSwgLy8gQWN0aW9uIHdoZW4gY2xpY2sgb24gZmFjZXRcclxuICAgICAgICBmYWNldExpc3Q6IHt9LCAvLyB7ZmFjZXQxOiAnTGFiZWwgb2YgZmFjZXQgb25lJywgZmFjZXQyOidMYWJlbCBvZiBmYWNldCAyJ30gTGlzdCBvZiBmYWNldHNcclxuICAgICAgICBncm91cGFibGVDb2x1bW5MaXN0OiB7fSwgLy8ge2NvbDE6ICdMYWJlbDEnLCBjb2wyOiAnTGFiZWwyJ31cclxuICAgICAgICBncm91cEFjdGlvbihrZXkpIHtcclxuICAgICAgICAgIGNvbnNvbGUud2FybihrZXkpO1xyXG4gICAgICB9LCAvLyBBY3Rpb24gb24gZ3JvdXAgZnVuY3Rpb25cclxuICAgICAgICBvcGVyYXRpb25MaXN0OiBbXSwgLy8gTGlzdCBvZiBjb250ZXh0dWFsIG9wZXJhdGlvbnNcclxuICAgICAgICBncm91cExhYmVsUHJlZml4OiAnJ1xyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAqIEByZXR1cm5zIHtKU1h9IFNlbGVjdGlvbiBjb21wb25lbnQuXHJcbiAgKiBAcHJpdmF0ZVxyXG4gICovXHJcbiAgICBfZ2V0U2VsZWN0aW9uT2JqZWN0KCkge1xyXG4gICAgICBjb25zdCBvbkljb25DbGljayA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBuZXdTZWxlY3Rpb25TdGF0dXMgPSB0aGlzLnByb3BzLnNlbGVjdGlvblN0YXR1cyA9PT0gJ25vbmUnID8gJ3NlbGVjdGVkJyA6ICdub25lJztcclxuICAgICAgICB0aGlzLnByb3BzLnNlbGVjdGlvbkFjdGlvbihuZXdTZWxlY3Rpb25TdGF0dXMpO1xyXG4gICAgfTtcclxuICAgICAgcmV0dXJuIDxCdXR0b24gc2hhcGU9J2ljb24nIGljb249e3RoaXMuX2dldFNlbGVjdGlvbk9iamVjdEljb24oKX0gaGFuZGxlT25DbGljaz17b25JY29uQ2xpY2t9IC8+O1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICogQHJldHVybnMge0pTWH0gT3JkZXIgY29tcG9uZW50LlxyXG4gICogQHByaXZhdGVcclxuICAqL1xyXG4gICAgX2dldE9yZGVyT2JqZWN0KCkge1xyXG4gICAgICBpZiAodGhpcy5wcm9wcy5vcmRlcmFibGVDb2x1bW5MaXN0KSB7XHJcbiAgICAgICAgY29uc3Qgb3JkZXJTZWxlY3RlZFBhcnNlZEtleSA9IHRoaXMucHJvcHMub3JkZXJTZWxlY3RlZC5rZXkgKyB0aGlzLnByb3BzLm9yZGVyU2VsZWN0ZWQub3JkZXI7XHJcbiAgICAgICAgY29uc3Qgb3JkZXJPcGVyYXRpb25MaXN0ID0gW107IC8vIFt7a2V5Oidjb2x1bW5LZXknLCBvcmRlcjonYXNjJywgbGFiZWw6J2NvbHVtbkxhYmVsJ31dXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5wcm9wcy5vcmRlcmFibGVDb2x1bW5MaXN0KSB7XHJcbiAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHRoaXMucHJvcHMub3JkZXJhYmxlQ29sdW1uTGlzdFtrZXldO1xyXG4gICAgICAgICAgb3JkZXJPcGVyYXRpb25MaXN0LnB1c2goe1xyXG4gICAgICAgICAgICBhY3Rpb246IHRoaXMuX29yZGVyRnVuY3Rpb24oZGVzY3JpcHRpb24ua2V5LCBkZXNjcmlwdGlvbi5vcmRlciksXHJcbiAgICAgICAgICAgIGxhYmVsOiBkZXNjcmlwdGlvbi5sYWJlbCxcclxuICAgICAgICAgICAgc3R5bGU6IHRoaXMuX2dldFNlbGVjdGVkU3R5bGUoZGVzY3JpcHRpb24ua2V5ICsgZGVzY3JpcHRpb24ub3JkZXIsIG9yZGVyU2VsZWN0ZWRQYXJzZWRLZXkpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgICBjb25zdCBvcmRlckljb24gPSAnc29ydF9ieV9hbHBoYSc7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxEcm9wZG93biBpY29uUHJvcHM9e3sgbmFtZTogb3JkZXJJY29uIH19IGtleT0nZG93bicgb3BlcmF0aW9uTGlzdD17b3JkZXJPcGVyYXRpb25MaXN0fSAvPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAqIEByZXR1cm5zIHtKU1h9IEdyb3VwaW5nIGNvbXBvbmVudC5cclxuICAqIEBwcml2YXRlXHJcbiAgKi9cclxuICAgIF9nZXRHcm91cE9iamVjdCgpIHtcclxuICAgICAgY29uc3Qge2hhc0dyb3VwaW5nfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgIGlmIChoYXNHcm91cGluZykge1xyXG4gICAgICAgIGNvbnN0IHtncm91cExhYmVsUHJlZml4LCBncm91cFNlbGVjdGVkS2V5LCBncm91cGFibGVDb2x1bW5MaXN0LCBzdHlsZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGdyb3VwT3BlcmF0aW9uTGlzdCA9IHJlZHVjZShncm91cGFibGVDb2x1bW5MaXN0LCAob3BlcmF0aW9uTGlzdCwgbGFiZWwsIGtleSkgPT4ge1xyXG4gICAgICAgICAgb3BlcmF0aW9uTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgYWN0aW9uOiB0aGlzLl9ncm91cEZ1bmN0aW9uKGtleSksXHJcbiAgICAgICAgICAgIGxhYmVsOiB0aGlzLmkxOG4oZ3JvdXBMYWJlbFByZWZpeCArIGxhYmVsKSxcclxuICAgICAgICAgICAgc3R5bGU6IHRoaXMuX2dldFNlbGVjdGVkU3R5bGUoa2V5LCBncm91cFNlbGVjdGVkS2V5KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuIG9wZXJhdGlvbkxpc3Q7XHJcbiAgICAgIH0sIFtdKS5jb25jYXQoW3tcclxuICAgICAgICAgIGxhYmVsOiB0aGlzLmkxOG4oJ2xpc3QuYWN0aW9uQmFyLnVuZ3JvdXAnKSxcclxuICAgICAgICAgIGFjdGlvbjogdGhpcy5fZ3JvdXBGdW5jdGlvbigpXHJcbiAgICAgIH1dKTtcclxuICAgICAgICBjb25zdCBncm91cEljb24gPSAnZm9sZGVyX29wZW4nO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8RHJvcGRvd24gaWNvblByb3BzPXt7IG5hbWU6IGdyb3VwSWNvbiB9fSBvcGVyYXRpb25MaXN0PXtncm91cE9wZXJhdGlvbkxpc3R9IC8+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbnRLZXkgQ3VycmVudCBzZWxlY3RlZCBrZXkuXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0ZWRLZXkgS2V5IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHNlbGVjdGVkIG9uZS5cclxuICAqIEByZXR1cm5zIHtzdHJpbmd9IENsYXNzIHNlbGVjdGVkIGlmIGN1cnJlbnRLZXkgY29ycmVzcG9uZHMgdG8gdGhlIHNlbGVjdGVkS2V5LlxyXG4gICogQHByaXZhdGVcclxuICAqL1xyXG4gICAgX2dldFNlbGVjdGVkU3R5bGUoY3VycmVudEtleSwgc2VsZWN0ZWRLZXkpIHtcclxuICAgICAgaWYgKGN1cnJlbnRLZXkgPT09IHNlbGVjdGVkS2V5KSB7XHJcbiAgICAgICAgcmV0dXJuICcgc2VsZWN0ZWQgJztcclxuICAgIH1cclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAqIEByZXR1cm4ge3N0cmluZ30gQ2xhc3Mgb2YgdGhlIHNlbGVjdGlvbiBjb21wb25lbnQgaWNvbi5cclxuICAqIEBwcml2YXRlXHJcbiAgKi9cclxuICAgIF9nZXRTZWxlY3Rpb25PYmplY3RJY29uKCkge1xyXG4gICAgICBpZiAoJ25vbmUnID09PSB0aGlzLnByb3BzLnNlbGVjdGlvblN0YXR1cykge1xyXG4gICAgICAgIHJldHVybiAnY2hlY2tfYm94X291dGxpbmVfYmxhbmsnO1xyXG4gICAgfSBlbHNlIGlmICgnc2VsZWN0ZWQnID09PSB0aGlzLnByb3BzLnNlbGVjdGlvblN0YXR1cykge1xyXG4gICAgICAgIHJldHVybiAnY2hlY2tfYm94JztcclxuICAgIH1cclxuICAgICAgcmV0dXJuICdpbmRldGVybWluYXRlX2NoZWNrX2JveCc7XHJcbiAgfSxcclxuICAgIF9vcmRlckZ1bmN0aW9uKGtleSwgb3JkZXIpIHtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9yZGVyQWN0aW9uKGtleSwgb3JkZXIpO1xyXG4gICAgfTtcclxuICB9LFxyXG4gICAgX2dyb3VwRnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5ncm91cEFjdGlvbihrZXkpO1xyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAqIFJlbmRlciB0aGUgaHRtbFxyXG4gICogQHJldHVybnMge0pTWH0gSHRtIGNvbnRlbnQuXHJcbiAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWRsLWdyaWQnIGRhdGEtZm9jdXM9J2xpc3QtYWN0aW9uLWJhcic+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWRsLWNlbGwnIGRhdGEtZm9jdXM9J2dsb2JhbC1saXN0LWNvbnRlbnQnPlxyXG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5pc1NlbGVjdGlvbiAmJiB0aGlzLl9nZXRTZWxlY3Rpb25PYmplY3QoKX1cclxuICAgICAgICAgICAge3RoaXMuX2dldE9yZGVyT2JqZWN0KCl9XHJcbiAgICAgICAgICAgIHt0aGlzLl9nZXRHcm91cE9iamVjdCgpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21kbC1jZWxsIG1kbC1jZWxsLS1oaWRlLXRhYmxldCBtZGwtY2VsbC0taGlkZS1waG9uZScgZGF0YS1mb2N1cz0nc2VsZWN0ZWQtZmFjZXQtY29udGVudCc+XHJcbiAgICAgICAgICAgIDxUb3BpY0Rpc3BsYXllclxyXG4gICAgICAgICAgICAgIGRpc3BsYXlMYWJlbHNcclxuICAgICAgICAgICAgICB0b3BpY0NsaWNrQWN0aW9uPXt0aGlzLnByb3BzLmZhY2V0Q2xpY2tBY3Rpb259XHJcbiAgICAgICAgICAgICAgdG9waWNMaXN0PXt0aGlzLnByb3BzLmZhY2V0TGlzdH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWRsLWNlbGwnIGRhdGEtZm9jdXM9J2NvbnRleHR1YWwtYWN0aW9uLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICA8QWN0aW9uQ29udGV4dHVhbCBvcGVyYXRpb25MaXN0PXt0aGlzLnByb3BzLm9wZXJhdGlvbkxpc3R9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoQWN0aW9uQmFyKTtcclxuIl19