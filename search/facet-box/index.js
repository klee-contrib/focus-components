'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _translation = require('focus-core/translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var assign = require('object-assign');
var omit = require('lodash/object/omit');

// Components
var Facet = require('./facet').component;

// Mixins
var stylable = require('../../mixin/stylable');

var FacetBox = {
    /**
     * Component's mixins
     */
    mixins: [stylable],
    /**
     * Display name.
     */
    displayName: 'facet-box',
    /**
     * Init the default properties
     * @returns {object} Initial properties.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            facetList: {},
            selectedFacetList: {},
            openedFacetList: {},
            config: {}
        };
    },
    /**
     * List property validation.
     */
    propTypes: {
        facetList: (0, _types2.default)('object'),
        selectedFacetList: (0, _types2.default)('object'),
        openedFacetList: (0, _types2.default)('object'),
        config: (0, _types2.default)('object'),
        dataSelectionHandler: (0, _types2.default)('func')
    },
    /**
     * Init the state of the component.
     * @returns {object} Iitial state.
     */
    getInitialState: function getInitialState() {
        var openedFacetList = this.props.openedFacetList;
        if (Object.keys(openedFacetList).length == 0) {
            this._generateOpenedFacetList(this.props.facetList);
        }
        return {
            isExpanded: true,
            openedFacetList: openedFacetList
        };
    },
    /**
     * New properties set event handle
     * @param {Object} nextProps
     */
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var openedFacetList = nextProps.openedFacetList;
        if (Object.keys(openedFacetList).length == 0) {
            openedFacetList = this._generateOpenedFacetList(nextProps.facetList);
        }
        this.setState({ openedFacetList: openedFacetList });
    },
    _generateOpenedFacetList: function _generateOpenedFacetList(facetList) {
        return Object.keys(facetList).reduce(function (list, facetKey) {
            list[facetKey] = true;
            return list;
        }, {});
    },

    /**
     * Render the component.
     * @returns {XML} Html code.
     */
    render: function render() {
        var className = '';
        if (this.state.isExpanded) {
            className += ' expanded';
        } else {
            className += ' collapsed';
        }
        return _react2.default.createElement(
            'div',
            { className: '' + (this._getStyleClassName() + className), 'data-focus': 'facet-box' },
            this._renderFacetBoxTitle(),
            this._renderFacetList()
        );
    },

    /**
     * Render the div title of the component.
     * @returns {XML} Html content.
     */
    _renderFacetBoxTitle: function _renderFacetBoxTitle() {
        var title = this.state.isExpanded ? (0, _translation.translate)('live.filter.title') : '';
        //TODO onClick={this._facetBoxTitleClickHandler} (le repli doit aussi etre porté par le data-focus=advanced-search
        return _react2.default.createElement(
            'div',
            { 'data-focus': 'facet-box-heading', onClick: this._facetBoxTitleClickHandler },
            _react2.default.createElement(
                'h2',
                null,
                title
            )
        );
    },

    /**
     * Render the list of the facets.
     * @returns {XML} Html content.
     */
    _renderFacetList: function _renderFacetList() {
        var _this = this;

        if (!this.state.isExpanded) {
            return '';
        }
        return _react2.default.createElement(
            'div',
            { 'data-focus': 'facet-box-body' },
            Object.keys(this.props.facetList).map(function (facetKey) {
                var facet = _this.props.facetList[facetKey];
                var selectedDataKey = _this.props.selectedFacetList[facetKey] ? _this.props.selectedFacetList[facetKey].key : undefined;
                if (selectedDataKey || Object.keys(facet).length > 1) {
                    return _react2.default.createElement(Facet, { facetKey: facetKey, key: facetKey,
                        facet: facet,
                        selectedDataKey: selectedDataKey,
                        isExpanded: _this.state.openedFacetList[facetKey],
                        expandHandler: _this._facetExpansionHandler,
                        selectHandler: _this._facetSelectionHandler,
                        type: _this.props.config[facetKey]
                    });
                }
            })
        );
    },

    /**
     * Action on title click.
     * Hide / Expand the component.
     */
    _facetBoxTitleClickHandler: function _facetBoxTitleClickHandler() {
        this.setState({ isExpanded: !this.state.isExpanded });
    },

    /**
     * Facet selection action handler.
     * @param {string} facetKey Key of the selected facet.
     * @param {string} dataKey Key of the selceted data.
     * @param {object} data Content of the selected data facet.
     */
    _facetSelectionHandler: function _facetSelectionHandler(facetKey, dataKey, data) {
        var result = { openedFacetList: this.state.openedFacetList };
        if (dataKey == undefined) {
            result.selectedFacetList = omit(this.props.selectedFacetList, facetKey);
        } else {
            result.selectedFacetList = assign(this.props.selectedFacetList, _defineProperty({}, facetKey, { key: dataKey, data: data }));
        }
        this.props.dataSelectionHandler(result);
    },

    /**
     * Expand facet action handler.
     * @param {string} facetKey Key of the facet.
     * @param {string} isExpanded true if expand action, false if collapse action.
     */
    _facetExpansionHandler: function _facetExpansionHandler(facetKey, isExpanded) {
        var openedFacetList = this.state.openedFacetList;
        openedFacetList[facetKey] = isExpanded;
        this.setState({ openedFacetList: openedFacetList });
    }
};

module.exports = (0, _builder2.default)(FacetBox);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJhc3NpZ24iLCJyZXF1aXJlIiwib21pdCIsIkZhY2V0IiwiY29tcG9uZW50Iiwic3R5bGFibGUiLCJGYWNldEJveCIsIm1peGlucyIsImRpc3BsYXlOYW1lIiwiZ2V0RGVmYXVsdFByb3BzIiwiZmFjZXRMaXN0Iiwic2VsZWN0ZWRGYWNldExpc3QiLCJvcGVuZWRGYWNldExpc3QiLCJjb25maWciLCJwcm9wVHlwZXMiLCJkYXRhU2VsZWN0aW9uSGFuZGxlciIsImdldEluaXRpYWxTdGF0ZSIsInByb3BzIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsIl9nZW5lcmF0ZU9wZW5lZEZhY2V0TGlzdCIsImlzRXhwYW5kZWQiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJyZWR1Y2UiLCJsaXN0IiwiZmFjZXRLZXkiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJzdGF0ZSIsIl9nZXRTdHlsZUNsYXNzTmFtZSIsIl9yZW5kZXJGYWNldEJveFRpdGxlIiwiX3JlbmRlckZhY2V0TGlzdCIsInRpdGxlIiwiX2ZhY2V0Qm94VGl0bGVDbGlja0hhbmRsZXIiLCJtYXAiLCJmYWNldCIsInNlbGVjdGVkRGF0YUtleSIsImtleSIsInVuZGVmaW5lZCIsIl9mYWNldEV4cGFuc2lvbkhhbmRsZXIiLCJfZmFjZXRTZWxlY3Rpb25IYW5kbGVyIiwiZGF0YUtleSIsImRhdGEiLCJyZXN1bHQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxTQUFTQyxRQUFRLGVBQVIsQ0FBYjtBQUNBLElBQUlDLE9BQU9ELFFBQVEsb0JBQVIsQ0FBWDs7QUFFQTtBQUNBLElBQUlFLFFBQVFGLFFBQVEsU0FBUixFQUFtQkcsU0FBL0I7O0FBRUE7QUFDQSxJQUFJQyxXQUFXSixRQUFRLHNC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QUZELE1BRU87QUFDSGtCLG1CQUFPbkMsaUJBQVAsR0FBMkJYLE9BQU8sS0FBS2lCLEtBQUwsQ0FBV04saUJBQWxCLHNCQUF1Q2lCLFFBQXZDLEVBQWtELEVBQUNZLEtBQUtJLE9BQU4sRUFBZUMsTUFBTUEsSUFBckIsRUFBbEQsRUFBM0I7QUFDSDtBQUNELGFBQUs1QixLQUFMLENBQVdGLG9CQUFYLENBQWdDK0IsTUFBaEM7QUFDSCxLQTlJVTs7QUErSVg7Ozs7O0FBS0FKLDBCQXBKVyxrQ0FvSllkLFFBcEpaLEVBb0pzQk4sVUFwSnRCLEVBb0prQztBQUN6QyxZQUFJVixrQkFBa0IsS0FBS21CLEtBQUwsQ0FBV25CLGVBQWpDO0FBQ0FBLHdCQUFnQmdCLFFBQWhCLElBQTRCTixVQUE1QjtBQUNBLGFBQUtHLFFBQUwsQ0FBYyxFQUFDYixpQkFBaUJBLGVBQWxCLEVBQWQ7QUFDSDtBQXhKVSxDQUFmOztBQTJKQW1DLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVExQyxRQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmltcG9ydCB7dHJhbnNsYXRlfSBmcm9tICdmb2N1cy1jb3JlL3RyYW5zbGF0aW9uJztcclxuXHJcbmxldCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XHJcbmxldCBvbWl0ID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC9vbWl0Jyk7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcbmxldCBGYWNldCA9IHJlcXVpcmUoJy4vZmFjZXQnKS5jb21wb25lbnQ7XHJcblxyXG4vLyBNaXhpbnNcclxubGV0IHN0eWxhYmxlID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vc3R5bGFibGUnKTtcclxuXHJcbmxldCBGYWNldEJveCA9IHtcclxuICAgIC8qKlxyXG4gICAgICogQ29tcG9uZW50J3MgbWl4aW5zXHJcbiAgICAgKi9cclxuICAgIG1peGluczogW3N0eWxhYmxlXSxcclxuICAgIC8qKlxyXG4gICAgICogRGlzcGxheSBuYW1lLlxyXG4gICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ2ZhY2V0LWJveCcsXHJcbiAgICAvKipcclxuICAgICAqIEluaXQgdGhlIGRlZmF1bHQgcHJvcGVydGllc1xyXG4gICAgICogQHJldHVybnMge29iamVjdH0gSW5pdGlhbCBwcm9wZXJ0aWVzLlxyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmYWNldExpc3Q6IHt9LFxyXG4gICAgICAgICAgICBzZWxlY3RlZEZhY2V0TGlzdDoge30sXHJcbiAgICAgICAgICAgIG9wZW5lZEZhY2V0TGlzdDoge30sXHJcbiAgICAgICAgICAgIGNvbmZpZzoge31cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogTGlzdCBwcm9wZXJ0eSB2YWxpZGF0aW9uLlxyXG4gICAgICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBmYWNldExpc3Q6IHR5cGUoJ29iamVjdCcpLFxyXG4gICAgICAgIHNlbGVjdGVkRmFjZXRMaXN0OiB0eXBlKCdvYmplY3QnKSxcclxuICAgICAgICBvcGVuZWRGYWNldExpc3Q6IHR5cGUoJ29iamVjdCcpLFxyXG4gICAgICAgIGNvbmZpZzogdHlwZSgnb2JqZWN0JyksXHJcbiAgICAgICAgZGF0YVNlbGVjdGlvbkhhbmRsZXI6IHR5cGUoJ2Z1bmMnKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogSW5pdCB0aGUgc3RhdGUgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IElpdGlhbCBzdGF0ZS5cclxuICAgICAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IG9wZW5lZEZhY2V0TGlzdCA9IHRoaXMucHJvcHMub3BlbmVkRmFjZXRMaXN0O1xyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhvcGVuZWRGYWNldExpc3QpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dlbmVyYXRlT3BlbmVkRmFjZXRMaXN0KHRoaXMucHJvcHMuZmFjZXRMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaXNFeHBhbmRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgb3BlbmVkRmFjZXRMaXN0XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIE5ldyBwcm9wZXJ0aWVzIHNldCBldmVudCBoYW5kbGVcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBuZXh0UHJvcHNcclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgICBsZXQgb3BlbmVkRmFjZXRMaXN0ID0gbmV4dFByb3BzLm9wZW5lZEZhY2V0TGlzdDtcclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMob3BlbmVkRmFjZXRMaXN0KS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBvcGVuZWRGYWNldExpc3QgPSB0aGlzLl9nZW5lcmF0ZU9wZW5lZEZhY2V0TGlzdChuZXh0UHJvcHMuZmFjZXRMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7b3BlbmVkRmFjZXRMaXN0fSk7XHJcbiAgICB9LFxyXG4gICAgX2dlbmVyYXRlT3BlbmVkRmFjZXRMaXN0KGZhY2V0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhmYWNldExpc3QpLnJlZHVjZShmdW5jdGlvbiAobGlzdCwgZmFjZXRLZXkpIHtcclxuICAgICAgICAgICAgbGlzdFtmYWNldEtleV0gPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgICAgICB9LCB7fSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudC5cclxuICAgICAqIEByZXR1cm5zIHtYTUx9IEh0bWwgY29kZS5cclxuICAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBjbGFzc05hbWUgPSAnJztcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0V4cGFuZGVkKSB7XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZSArPSAnIGV4cGFuZGVkJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbGFzc05hbWUgKz0gJyBjb2xsYXBzZWQnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7dGhpcy5fZ2V0U3R5bGVDbGFzc05hbWUoKSArIGNsYXNzTmFtZX1gfSBkYXRhLWZvY3VzPSdmYWNldC1ib3gnPlxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlckZhY2V0Qm94VGl0bGUoKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJGYWNldExpc3QoKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgZGl2IHRpdGxlIG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAgKiBAcmV0dXJucyB7WE1MfSBIdG1sIGNvbnRlbnQuXHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJGYWNldEJveFRpdGxlKCkge1xyXG4gICAgICAgIGxldCB0aXRsZSA9IHRoaXMuc3RhdGUuaXNFeHBhbmRlZCA/IHRyYW5zbGF0ZSgnbGl2ZS5maWx0ZXIudGl0bGUnKSA6ICcnO1xyXG4gICAgICAgIC8vVE9ETyBvbkNsaWNrPXt0aGlzLl9mYWNldEJveFRpdGxlQ2xpY2tIYW5kbGVyfSAobGUgcmVwbGkgZG9pdCBhdXNzaSBldHJlIHBvcnTDqSBwYXIgbGUgZGF0YS1mb2N1cz1hZHZhbmNlZC1zZWFyY2hcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9XCJmYWNldC1ib3gtaGVhZGluZ1wiIG9uQ2xpY2s9e3RoaXMuX2ZhY2V0Qm94VGl0bGVDbGlja0hhbmRsZXJ9PlxyXG4gICAgICAgICAgICAgICAgPGgyPnt0aXRsZX08L2gyPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSBsaXN0IG9mIHRoZSBmYWNldHMuXHJcbiAgICAgKiBAcmV0dXJucyB7WE1MfSBIdG1sIGNvbnRlbnQuXHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJGYWNldExpc3QoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmlzRXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9XCJmYWNldC1ib3gtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAge09iamVjdC5rZXlzKHRoaXMucHJvcHMuZmFjZXRMaXN0KS5tYXAoKGZhY2V0S2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZhY2V0ID0gdGhpcy5wcm9wcy5mYWNldExpc3RbZmFjZXRLZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZERhdGFLZXkgPSB0aGlzLnByb3BzLnNlbGVjdGVkRmFjZXRMaXN0W2ZhY2V0S2V5XSA/IHRoaXMucHJvcHMuc2VsZWN0ZWRGYWNldExpc3RbZmFjZXRLZXldLmtleSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWREYXRhS2V5IHx8IE9iamVjdC5rZXlzKGZhY2V0KS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RmFjZXQgZmFjZXRLZXk9e2ZhY2V0S2V5fSBrZXk9e2ZhY2V0S2V5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhY2V0PXtmYWNldH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGFLZXk9e3NlbGVjdGVkRGF0YUtleX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0V4cGFuZGVkPXt0aGlzLnN0YXRlLm9wZW5lZEZhY2V0TGlzdFtmYWNldEtleV19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kSGFuZGxlcj17dGhpcy5fZmFjZXRFeHBhbnNpb25IYW5kbGVyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdEhhbmRsZXI9e3RoaXMuX2ZhY2V0U2VsZWN0aW9uSGFuZGxlcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPXt0aGlzLnByb3BzLmNvbmZpZ1tmYWNldEtleV19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC9kaXY+KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEFjdGlvbiBvbiB0aXRsZSBjbGljay5cclxuICAgICAqIEhpZGUgLyBFeHBhbmQgdGhlIGNvbXBvbmVudC5cclxuICAgICAqL1xyXG4gICAgX2ZhY2V0Qm94VGl0bGVDbGlja0hhbmRsZXIoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNFeHBhbmRlZDogIXRoaXMuc3RhdGUuaXNFeHBhbmRlZH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogRmFjZXQgc2VsZWN0aW9uIGFjdGlvbiBoYW5kbGVyLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZhY2V0S2V5IEtleSBvZiB0aGUgc2VsZWN0ZWQgZmFjZXQuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YUtleSBLZXkgb2YgdGhlIHNlbGNldGVkIGRhdGEuXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBDb250ZW50IG9mIHRoZSBzZWxlY3RlZCBkYXRhIGZhY2V0LlxyXG4gICAgICovXHJcbiAgICBfZmFjZXRTZWxlY3Rpb25IYW5kbGVyKGZhY2V0S2V5LCBkYXRhS2V5LCBkYXRhKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHtvcGVuZWRGYWNldExpc3Q6IHRoaXMuc3RhdGUub3BlbmVkRmFjZXRMaXN0fTtcclxuICAgICAgICBpZiAoZGF0YUtleSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnNlbGVjdGVkRmFjZXRMaXN0ID0gb21pdCh0aGlzLnByb3BzLnNlbGVjdGVkRmFjZXRMaXN0LCBmYWNldEtleSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0LnNlbGVjdGVkRmFjZXRMaXN0ID0gYXNzaWduKHRoaXMucHJvcHMuc2VsZWN0ZWRGYWNldExpc3QsIHtbZmFjZXRLZXldOiB7a2V5OiBkYXRhS2V5LCBkYXRhOiBkYXRhfX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb3BzLmRhdGFTZWxlY3Rpb25IYW5kbGVyKHJlc3VsdCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHBhbmQgZmFjZXQgYWN0aW9uIGhhbmRsZXIuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmFjZXRLZXkgS2V5IG9mIHRoZSBmYWNldC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpc0V4cGFuZGVkIHRydWUgaWYgZXhwYW5kIGFjdGlvbiwgZmFsc2UgaWYgY29sbGFwc2UgYWN0aW9uLlxyXG4gICAgICovXHJcbiAgICBfZmFjZXRFeHBhbnNpb25IYW5kbGVyKGZhY2V0S2V5LCBpc0V4cGFuZGVkKSB7XHJcbiAgICAgICAgbGV0IG9wZW5lZEZhY2V0TGlzdCA9IHRoaXMuc3RhdGUub3BlbmVkRmFjZXRMaXN0O1xyXG4gICAgICAgIG9wZW5lZEZhY2V0TGlzdFtmYWNldEtleV0gPSBpc0V4cGFuZGVkO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe29wZW5lZEZhY2V0TGlzdDogb3BlbmVkRmFjZXRMaXN0fSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoRmFjZXRCb3gpO1xyXG4iXX0=