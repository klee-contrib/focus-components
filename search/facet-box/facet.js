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
            var facetLabel = this.props.facet && (0, _isObject2.default)(this.props.facet[this.props.selectedDataKey]) ? this.props.facet[this.props.selectedDataKey].label : this.props.facet.find(function (elm) {
                return elm.label === _this.props.selectedDataKey;
            }).label;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJGYWNldERhdGEiLCJyZXF1aXJlIiwiY29tcG9uZW50IiwiRmFjZXQiLCJkaXNwbGF5TmFtZSIsImdldEluaXRpYWxTdGF0ZSIsImlzU2hvd0FsbCIsImdldERlZmF1bHRQcm9wcyIsIm5iRGVmYXVsdERhdGFMaXN0IiwicHJvcFR5cGVzIiwiZmFjZXQiLCJhcnJheSIsImJvb2wiLCJudW1iZXIiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJwcm9wcyIsInNlbGVjdGVkRGF0YUtleSIsImlzRXhwYW5kZWQiLCJfcmVuZGVyRmFjZXRUaXRsZSIsIl9yZW5kZXJGYWNldERhdGFMaXN0IiwidGl0bGUiLCJmYWNldEtleSIsImZhY2V0TGFiZWwiLCJsYWJlbCIsImZpbmQiLCJlbG0iLCJfZmFjZXRUaXRsZUNsaWNrSGFuZGxlciIsImV4cGFuZEhhbmRsZXIiLCJzZWxlY3RIYW5kbGVyIiwidW5kZWZpbmVkIiwic2V0U3RhdGUiLCJmYWNldFZhbHVlcyIsInN0YXRlIiwic2xpY2UiLCJtYXAiLCJmYWNldFZhbHVlIiwiX2ZhY2V0RGF0YVNlbGVjdGlvbkhhbmRsZXIiLCJ0eXBlIiwiX3JlbmRlclNob3dBbGxEYXRhTGlzdCIsImRhdGFLZXkiLCJkYXRhIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsIl9zaG93QWxsSGFuZGxlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQSxJQUFNQSxZQUFZQyxRQUFRLGNBQVIsRUFBd0JDLFNBQTFDOztBQUVBLElBQU1DLFFBQVE7QUFDVjs7O0FBR0FDLGlCQUFhLE9BSkg7QUFLVjs7OztBQUlBQyxtQkFUVSw2QkFTUTtBQUNkLGVBQU87QUFDSEMsdUJBQVc7QUFEUixTQUFQO0FBR0gsS0FiUzs7QUFjVjs7OztBQUlBQyxtQkFsQlUsNkJB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OztBQXlJQXdDLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVE1QyxLQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHt0cmFuc2xhdGV9IGZyb20gJ2ZvY3VzLWNvcmUvdHJhbnNsYXRpb24nO1xyXG5cclxuaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC9sYW5nL2lzT2JqZWN0JztcclxuaW1wb3J0IGtleXMgZnJvbSAnbG9kYXNoL29iamVjdC9rZXlzJztcclxuaW1wb3J0IHVuaXF1ZUlkIGZyb20gJ2xvZGFzaC91dGlsaXR5L3VuaXF1ZUlkJztcclxuXHJcbi8vIENvbXBvbmVudHNcclxuY29uc3QgRmFjZXREYXRhID0gcmVxdWlyZSgnLi9mYWNldC1kYXRhJykuY29tcG9uZW50O1xyXG5cclxuY29uc3QgRmFjZXQgPSB7XHJcbiAgICAvKipcclxuICAgICAqIERpc3BsYXkgbmFtZS5cclxuICAgICAqL1xyXG4gICAgZGlzcGxheU5hbWU6ICdGYWNldCcsXHJcbiAgICAvKipcclxuICAgICAqIEluaXQgdGhlIGNvbXBvbmVudCBzdGF0ZS5cclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IEluaXRpYWwgc3RhdGUuXHJcbiAgICAgKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpc1Nob3dBbGw6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEluaXQgdGhlIGRlZmF1bHQgcHJvcHMuXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBJbml0aWFsIHN0YXRlLlxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmJEZWZhdWx0RGF0YUxpc3Q6IDZcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIGZhY2V0OiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgICAgICAgaXNTaG93QWxsOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICBuYkRlZmF1bHREYXRhTGlzdDogUHJvcFR5cGVzLm51bWJlclxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSBjb21wb25lbnQuXHJcbiAgICAgKiBAcmV0dXJucyB7WE1MfSBIdG1sIGNvbXBvbmVudCBjb2RlLlxyXG4gICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9ICdmYWNldCc7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VsZWN0ZWREYXRhS2V5KSB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnLXNlbGVjdGVkJztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuaXNFeHBhbmRlZCkge1xyXG4gICAgICAgICAgICBjbGFzc05hbWUgKz0gJy1leHBhbmRlZCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lICs9ICctY29sbGFwc2VkJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gZGF0YS1mb2N1cz0nZmFjZXQnPlxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlckZhY2V0VGl0bGUoKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJGYWNldERhdGFMaXN0KCl9XHJcbiAgICAgICAgICAgIDwvZGl2Pik7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudCB0aXRsZS5cclxuICAgICAqIEByZXR1cm5zIHtYTUx9IEh0bWwgY29tcG9uZW50IGNvZGUuXHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJGYWNldFRpdGxlKCkge1xyXG4gICAgICAgIGxldCB0aXRsZSA9IHRyYW5zbGF0ZSgnbGl2ZS5maWx0ZXIuZmFjZXRzLicgKyB0aGlzLnByb3BzLmZhY2V0S2V5KTsgLy8gRGVmYXVsdCBmYWNldCB0cmFuc2xhdGlvbiBwYXRoIGlzIGxpdmUuZmlsdGVyLmZhY2V0cy5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZERhdGFLZXkpIHtcclxuICAgICAgICAgICAgY29uc3QgZmFjZXRMYWJlbCA9IHRoaXMucHJvcHMuZmFjZXQgJiYgaXNPYmplY3QodGhpcy5wcm9wcy5mYWNldFt0aGlzLnByb3BzLnNlbGVjdGVkRGF0YUtleV0pID8gIHRoaXMucHJvcHMuZmFjZXRbdGhpcy5wcm9wcy5zZWxlY3RlZERhdGFLZXldLmxhYmVsIDogdGhpcy5wcm9wcy5mYWNldC5maW5kKGVsbSA9PiBlbG0ubGFiZWwgPT09IHRoaXMucHJvcHMuc2VsZWN0ZWREYXRhS2V5KS5sYWJlbDtcclxuICAgICAgICAgICAgdGl0bGUgPSBgJHt0aXRsZX0gOiAke2ZhY2V0TGFiZWx9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdmYWNldC10aXRsZScgb25DbGljaz17dGhpcy5fZmFjZXRUaXRsZUNsaWNrSGFuZGxlcn0+XHJcbiAgICAgICAgICAgICAgICA8aDM+e3RpdGxlfTwvaDM+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBBY3Rpb24gb24gZmFjZXQgdGl0bGUgY2xpY2suXHJcbiAgICAgKi9cclxuICAgIF9mYWNldFRpdGxlQ2xpY2tIYW5kbGVyKCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMuZXhwYW5kSGFuZGxlcih0aGlzLnByb3BzLmZhY2V0S2V5LCAhdGhpcy5wcm9wcy5pc0V4cGFuZGVkKTtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZWxlY3RlZERhdGFLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RIYW5kbGVyKHRoaXMucHJvcHMuZmFjZXRLZXksIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzRXhwYW5kZWQ6ICF0aGlzLnByb3BzLmlzRXhwYW5kZWQsXHJcbiAgICAgICAgICAgIGlzU2hvd0FsbDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgbGlzdCBvZiBkYXRhIG9mIHRoZSBmYWNldC5cclxuICAgICAqIEByZXR1cm5zIHtYTUx9IEh0bWwgY29tcG9uZW50IGNvZGUuXHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJGYWNldERhdGFMaXN0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5pc0V4cGFuZGVkIHx8IHRoaXMucHJvcHMuc2VsZWN0ZWREYXRhS2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gVGhlIHBhcnNlZCBmYWNldHMgYXJlIG5vdyBhbiBhcnJheVxyXG4gICAgICAgIGNvbnN0IGZhY2V0VmFsdWVzID0gdGhpcy5zdGF0ZS5pc1Nob3dBbGwgPyB0aGlzLnByb3BzLmZhY2V0IDogdGhpcy5wcm9wcy5mYWNldC5zbGljZSgwLCB0aGlzLnByb3BzLm5iRGVmYXVsdERhdGFMaXN0KTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nJyBkYXRhLWZvY3VzPSdmYWNldC1kYXRhLWxpc3QnPlxyXG4gICAgICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgICAgIHtmYWNldFZhbHVlcy5tYXAoIGZhY2V0VmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17dW5pcXVlSWQoJ2ZhY2V0LWl0ZW0nKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZhY2V0RGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhS2V5PXtmYWNldFZhbHVlLmxhYmVsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtmYWNldFZhbHVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RIYW5kbGVyPXt0aGlzLl9mYWNldERhdGFTZWxlY3Rpb25IYW5kbGVyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXt0aGlzLnByb3BzLnR5cGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPVwiZmFjZXQtZGF0YS1zaG93LWFsbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJTaG93QWxsRGF0YUxpc3QoKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj4pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogQWN0aW9uIG9uIGZhY2V0IGRhdGEgc2VsZWN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGFLZXkgS2V5IG9mIHRoZSBzZWxlY3RlZCBkYXRhLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGEgU2VsZWN0ZWQgZGF0YS5cclxuICAgICAqL1xyXG4gICAgX2ZhY2V0RGF0YVNlbGVjdGlvbkhhbmRsZXIoZGF0YUtleSwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMucHJvcHMuZXhwYW5kSGFuZGxlcih0aGlzLnByb3BzLmZhY2V0S2V5LCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RIYW5kbGVyKHRoaXMucHJvcHMuZmFjZXRLZXksIGRhdGFLZXksIGRhdGEpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGFsbCB0aGUgZGF0YSBmYWNldHMuXHJcbiAgICAgKiBAcmV0dXJucyB7WE1MfSBIdG1sIGNvbXBvbmVudCBjb2RlLlxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyU2hvd0FsbERhdGFMaXN0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5pc1Nob3dBbGwgJiYgT2JqZWN0LmtleXModGhpcy5wcm9wcy5mYWNldCkubGVuZ3RoID4gdGhpcy5wcm9wcy5uYkRlZmF1bHREYXRhTGlzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj0namF2YXNjcmlwdDp2b2lkKDApOycgZGF0YS1mb2N1cz0nZmFjZXQtc2hvdy1hbGwnIG9uQ2xpY2s9e3RoaXMuX3Nob3dBbGxIYW5kbGVyfT5cclxuICAgICAgICAgICAgICAgICAgICB7dHJhbnNsYXRlKCdzaG93LmFsbCcpfVxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEFjdGlvbiBvbiAnc2hvdyBhbGwnIGFjdGlvbi5cclxuICAgICAqL1xyXG4gICAgX3Nob3dBbGxIYW5kbGVyKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzU2hvd0FsbDogIXRoaXMuc3RhdGUuaXNTaG93QWxsfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoRmFjZXQpO1xyXG4iXX0=