'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _translation = require('focus-core/translation');

var _isObject = require('lodash/lang/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _keys = require('lodash/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _uniqueId = require('lodash/utility/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Components
var FacetData = require('./facet-data').component;

var Facet = {
    /**
     * Display name.
     */
    displayName: 'Facet',
    /**
     * Init the component state.
     * @returns {object} Initial state.
     */
    getInitialState: function getInitialState() {
        return {
            isShowAll: false
        };
    },

    /**
     * Init the default props.
     * @returns {object} Initial state.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            nbDefaultDataList: 6
        };
    },

    propTypes: {
        facet: _react.PropTypes.array,
        isShowAll: _react.PropTypes.bool,
        nbDefaultDataList: _react.PropTypes.number
    },
    /**
     * Render the component.
     * @returns {XML} Html component code.
     */
    render: function render() {
        var className = 'facet';
        if (this.props.selectedDataKey) {
            className += '-selected';
        } else if (this.props.isExpanded) {
            className += '-expanded';
        } else {
            className += '-collapsed';
        }
        return _react2.default.createElement(
            'div',
            { className: className, 'data-focus': 'facet' },
            this._renderFacetTitle(),
            this._renderFacetDataList()
        );
    },

    /**
     * Render the component title.
     * @returns {XML} Html component code.
     */
    _renderFacetTitle: function _renderFacetTitle() {
        var _this = this;

        var title = (0, _translation.translate)('live.filter.facets.' + this.props.facetKey); // Default facet translation path is live.filter.facets.
        if (this.props.selectedDataKey) {
            var facetLabel = '';
            var facet = this.props.facet && (0, _isObject2.default)(this.props.facet[this.props.selectedDataKey]) ? this.props.facet[this.props.selectedDataKey].label : this.props.facet.find(function (elm) {
                return elm.label === _this.props.selectedDataKey;
            });
            if (facet) {
                facetLabel = facet.label;
            }
            title = title + ' : ' + facetLabel;
        }
        return _react2.default.createElement(
            'div',
            { 'data-focus': 'facet-title', onClick: this._facetTitleClickHandler },
            _react2.default.createElement(
                'h3',
                null,
                title
            )
        );
    },

    /**
     * Action on facet title click.
     */
    _facetTitleClickHandler: function _facetTitleClickHandler() {
        this.props.expandHandler(this.props.facetKey, !this.props.isExpanded);
        if (this.props.selectedDataKey) {
            this.props.selectHandler(this.props.facetKey, undefined, undefined);
        }
        this.setState({
            isExpanded: !this.props.isExpanded,
            isShowAll: false
        });
    },

    /**
     * Render the list of data of the facet.
     * @returns {XML} Html component code.
     */
    _renderFacetDataList: function _renderFacetDataList() {
        var _this2 = this;

        if (!this.props.isExpanded || this.props.selectedDataKey) {
            return '';
        }
        // The parsed facets are now an array
        var facetValues = this.state.isShowAll ? this.props.facet : this.props.facet.slice(0, this.props.nbDefaultDataList);
        return _react2.default.createElement(
            'div',
            { className: '', 'data-focus': 'facet-data-list' },
            _react2.default.createElement(
                'ul',
                null,
                facetValues.map(function (facetValue) {
                    return _react2.default.createElement(
                        'li',
                        { key: (0, _uniqueId2.default)('facet-item') },
                        _react2.default.createElement(FacetData, {
                            dataKey: facetValue.label,
                            data: facetValue,
                            selectHandler: _this2._facetDataSelectionHandler,
                            type: _this2.props.type
                        })
                    );
                })
            ),
            _react2.default.createElement(
                'div',
                { 'data-focus': 'facet-data-show-all' },
                this._renderShowAllDataList()
            )
        );
    },

    /**
     * Action on facet data selection.
     * @param {string} dataKey Key of the selected data.
     * @param {string} data Selected data.
     */
    _facetDataSelectionHandler: function _facetDataSelectionHandler(dataKey, data) {
        this.props.expandHandler(this.props.facetKey, false);
        this.props.selectHandler(this.props.facetKey, dataKey, data);
    },

    /**
     * Render all the data facets.
     * @returns {XML} Html component code.
     */
    _renderShowAllDataList: function _renderShowAllDataList() {
        if (!this.state.isShowAll && Object.keys(this.props.facet).length > this.props.nbDefaultDataList) {
            return _react2.default.createElement(
                'a',
                { href: 'javascript:void(0);', 'data-focus': 'facet-show-all', onClick: this._showAllHandler },
                (0, _translation.translate)('show.all')
            );
        }
    },

    /**
     * Action on 'show all' action.
     */
    _showAllHandler: function _showAllHandler() {
        this.setState({ isShowAll: !this.state.isShowAll });
    }
};

module.exports = (0, _builder2.default)(Facet);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJGYWNldERhdGEiLCJyZXF1aXJlIiwiY29tcG9uZW50IiwiRmFjZXQiLCJkaXNwbGF5TmFtZSIsImdldEluaXRpYWxTdGF0ZSIsImlzU2hvd0FsbCIsImdldERlZmF1bHRQcm9wcyIsIm5iRGVmYXVsdERhdGFMaXN0IiwicHJvcFR5cGVzIiwiZmFjZXQiLCJhcnJheSIsImJvb2wiLCJudW1iZXIiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJwcm9wcyIsInNlbGVjdGVkRGF0YUtleSIsImlzRXhwYW5kZWQiLCJfcmVuZGVyRmFjZXRUaXRsZSIsIl9yZW5kZXJGYWNldERhdGFMaXN0IiwidGl0bGUiLCJmYWNldEtleSIsImZhY2V0TGFiZWwiLCJsYWJlbCIsImZpbmQiLCJlbG0iLCJfZmFjZXRUaXRsZUNsaWNrSGFuZGxlciIsImV4cGFuZEhhbmRsZXIiLCJzZWxlY3RIYW5kbGVyIiwidW5kZWZpbmVkIiwic2V0U3RhdGUiLCJmYWNldFZhbHVlcyIsInN0YXRlIiwic2xpY2UiLCJtYXAiLCJmYWNldFZhbHVlIiwiX2ZhY2V0RGF0YVNlbGVjdGlvbkhhbmRsZXIiLCJ0eXBlIiwiX3JlbmRlclNob3dBbGxEYXRhTGlzdCIsImRhdGFLZXkiLCJkYXRhIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsIl9zaG93QWxsSGFuZGxlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQSxJQUFNQSxZQUFZQyxRQUFRLGNBQVIsRUFBd0JDLFNBQTFDOztBQUVBLElBQU1DLFFBQVE7QUFDVjs7O0FBR0FDLGlCQUFhLE9BSkg7QUFLVjs7OztBQUlBQyxtQkFUVSw2QkFTUTtBQUNkLGVBQU87QUFDSEMsdUJBQVc7QUFEUixTQUFQO0FBR0gsS0FiUzs7QUFjVjs7OztBQUlBQyxtQkFsQlUsNkJB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LENBQWMsRUFBQ3pCLFdBQVcsQ0FBQyxLQUFLMkIsS0FBTCxDQUFXM0IsU0FBeEIsRUFBZDtBQUNIO0FBMUlTLENBQWQ7O0FBNklBd0MsT0FBT0MsT0FBUCxHQUFpQix1QkFBUTVDLEtBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQge3RyYW5zbGF0ZX0gZnJvbSAnZm9jdXMtY29yZS90cmFuc2xhdGlvbic7XHJcblxyXG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoL2xhbmcvaXNPYmplY3QnO1xyXG5pbXBvcnQga2V5cyBmcm9tICdsb2Rhc2gvb2JqZWN0L2tleXMnO1xyXG5pbXBvcnQgdW5pcXVlSWQgZnJvbSAnbG9kYXNoL3V0aWxpdHkvdW5pcXVlSWQnO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5jb25zdCBGYWNldERhdGEgPSByZXF1aXJlKCcuL2ZhY2V0LWRhdGEnKS5jb21wb25lbnQ7XHJcblxyXG5jb25zdCBGYWNldCA9IHtcclxuICAgIC8qKlxyXG4gICAgICogRGlzcGxheSBuYW1lLlxyXG4gICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ0ZhY2V0JyxcclxuICAgIC8qKlxyXG4gICAgICogSW5pdCB0aGUgY29tcG9uZW50IHN0YXRlLlxyXG4gICAgICogQHJldHVybnMge29iamVjdH0gSW5pdGlhbCBzdGF0ZS5cclxuICAgICAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlzU2hvd0FsbDogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogSW5pdCB0aGUgZGVmYXVsdCBwcm9wcy5cclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IEluaXRpYWwgc3RhdGUuXHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYkRlZmF1bHREYXRhTGlzdDogNlxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgZmFjZXQ6IFByb3BUeXBlcy5hcnJheSxcclxuICAgICAgICBpc1Nob3dBbGw6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIG5iRGVmYXVsdERhdGFMaXN0OiBQcm9wVHlwZXMubnVtYmVyXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudC5cclxuICAgICAqIEByZXR1cm5zIHtYTUx9IEh0bWwgY29tcG9uZW50IGNvZGUuXHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgY2xhc3NOYW1lID0gJ2ZhY2V0JztcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZERhdGFLZXkpIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lICs9ICctc2VsZWN0ZWQnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5pc0V4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnLWV4cGFuZGVkJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbGFzc05hbWUgKz0gJy1jb2xsYXBzZWQnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBkYXRhLWZvY3VzPSdmYWNldCc+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyRmFjZXRUaXRsZSgpfVxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlckZhY2V0RGF0YUxpc3QoKX1cclxuICAgICAgICAgICAgPC9kaXY+KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50IHRpdGxlLlxyXG4gICAgICogQHJldHVybnMge1hNTH0gSHRtbCBjb21wb25lbnQgY29kZS5cclxuICAgICAqL1xyXG4gICAgX3JlbmRlckZhY2V0VGl0bGUoKSB7XHJcbiAgICAgICAgbGV0IHRpdGxlID0gdHJhbnNsYXRlKCdsaXZlLmZpbHRlci5mYWNldHMuJyArIHRoaXMucHJvcHMuZmFjZXRLZXkpOyAvLyBEZWZhdWx0IGZhY2V0IHRyYW5zbGF0aW9uIHBhdGggaXMgbGl2ZS5maWx0ZXIuZmFjZXRzLlxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkRGF0YUtleSkge1xyXG4gICAgICAgICAgICBsZXQgZmFjZXRMYWJlbCA9ICcnO1xyXG4gICAgICAgICAgICBjb25zdCBmYWNldCA9IHRoaXMucHJvcHMuZmFjZXQgJiYgaXNPYmplY3QodGhpcy5wcm9wcy5mYWNldFt0aGlzLnByb3BzLnNlbGVjdGVkRGF0YUtleV0pID8gIHRoaXMucHJvcHMuZmFjZXRbdGhpcy5wcm9wcy5zZWxlY3RlZERhdGFLZXldLmxhYmVsIDogdGhpcy5wcm9wcy5mYWNldC5maW5kKGVsbSA9PiBlbG0ubGFiZWwgPT09IHRoaXMucHJvcHMuc2VsZWN0ZWREYXRhS2V5KTtcclxuICAgICAgICAgICAgaWYgKGZhY2V0KSB7XHJcbiAgICAgICAgICAgICAgICBmYWNldExhYmVsID0gZmFjZXQubGFiZWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aXRsZSA9IGAke3RpdGxlfSA6ICR7ZmFjZXRMYWJlbH1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2ZhY2V0LXRpdGxlJyBvbkNsaWNrPXt0aGlzLl9mYWNldFRpdGxlQ2xpY2tIYW5kbGVyfT5cclxuICAgICAgICAgICAgICAgIDxoMz57dGl0bGV9PC9oMz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEFjdGlvbiBvbiBmYWNldCB0aXRsZSBjbGljay5cclxuICAgICAqL1xyXG4gICAgX2ZhY2V0VGl0bGVDbGlja0hhbmRsZXIoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5leHBhbmRIYW5kbGVyKHRoaXMucHJvcHMuZmFjZXRLZXksICF0aGlzLnByb3BzLmlzRXhwYW5kZWQpO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkRGF0YUtleSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnNlbGVjdEhhbmRsZXIodGhpcy5wcm9wcy5mYWNldEtleSwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNFeHBhbmRlZDogIXRoaXMucHJvcHMuaXNFeHBhbmRlZCxcclxuICAgICAgICAgICAgaXNTaG93QWxsOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSBsaXN0IG9mIGRhdGEgb2YgdGhlIGZhY2V0LlxyXG4gICAgICogQHJldHVybnMge1hNTH0gSHRtbCBjb21wb25lbnQgY29kZS5cclxuICAgICAqL1xyXG4gICAgX3JlbmRlckZhY2V0RGF0YUxpc3QoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmlzRXhwYW5kZWQgfHwgdGhpcy5wcm9wcy5zZWxlY3RlZERhdGFLZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBUaGUgcGFyc2VkIGZhY2V0cyBhcmUgbm93IGFuIGFycmF5XHJcbiAgICAgICAgY29uc3QgZmFjZXRWYWx1ZXMgPSB0aGlzLnN0YXRlLmlzU2hvd0FsbCA/IHRoaXMucHJvcHMuZmFjZXQgOiB0aGlzLnByb3BzLmZhY2V0LnNsaWNlKDAsIHRoaXMucHJvcHMubmJEZWZhdWx0RGF0YUxpc3QpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPScnIGRhdGEtZm9jdXM9J2ZhY2V0LWRhdGEtbGlzdCc+XHJcbiAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICAgICAge2ZhY2V0VmFsdWVzLm1hcCggZmFjZXRWYWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkga2V5PXt1bmlxdWVJZCgnZmFjZXQtaXRlbScpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RmFjZXREYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFLZXk9e2ZhY2V0VmFsdWUubGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2ZhY2V0VmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdEhhbmRsZXI9e3RoaXMuX2ZhY2V0RGF0YVNlbGVjdGlvbkhhbmRsZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3RoaXMucHJvcHMudHlwZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9XCJmYWNldC1kYXRhLXNob3ctYWxsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlclNob3dBbGxEYXRhTGlzdCgpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2Pik7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3Rpb24gb24gZmFjZXQgZGF0YSBzZWxlY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YUtleSBLZXkgb2YgdGhlIHNlbGVjdGVkIGRhdGEuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YSBTZWxlY3RlZCBkYXRhLlxyXG4gICAgICovXHJcbiAgICBfZmFjZXREYXRhU2VsZWN0aW9uSGFuZGxlcihkYXRhS2V5LCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5leHBhbmRIYW5kbGVyKHRoaXMucHJvcHMuZmFjZXRLZXksIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnByb3BzLnNlbGVjdEhhbmRsZXIodGhpcy5wcm9wcy5mYWNldEtleSwgZGF0YUtleSwgZGF0YSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgYWxsIHRoZSBkYXRhIGZhY2V0cy5cclxuICAgICAqIEByZXR1cm5zIHtYTUx9IEh0bWwgY29tcG9uZW50IGNvZGUuXHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJTaG93QWxsRGF0YUxpc3QoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmlzU2hvd0FsbCAmJiBPYmplY3Qua2V5cyh0aGlzLnByb3BzLmZhY2V0KS5sZW5ndGggPiB0aGlzLnByb3BzLm5iRGVmYXVsdERhdGFMaXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPSdqYXZhc2NyaXB0OnZvaWQoMCk7JyBkYXRhLWZvY3VzPSdmYWNldC1zaG93LWFsbCcgb25DbGljaz17dGhpcy5fc2hvd0FsbEhhbmRsZXJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0cmFuc2xhdGUoJ3Nob3cuYWxsJyl9XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogQWN0aW9uIG9uICdzaG93IGFsbCcgYWN0aW9uLlxyXG4gICAgICovXHJcbiAgICBfc2hvd0FsbEhhbmRsZXIoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNTaG93QWxsOiAhdGhpcy5zdGF0ZS5pc1Nob3dBbGx9KTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihGYWNldCk7XHJcbiJdfQ==