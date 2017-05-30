'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies
var React = require('react');

var keys = require('lodash/object/keys');

// Components

var FacetBox = require('../../../search/facet-box').component;

var scopeFacetKey = 'FCT_SCOPE';

var Box = {
    /**
     * Get the default props
     * @return {object} the default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            facets: {},
            selectedFacets: {},
            facetConfig: {},
            action: undefined,
            scopesConfig: undefined
        };
    },

    /**
     * Facet selection handler
     * @param  {object}  facetComponentData The new facet box state, given by the FacetBox component
     * @param  {Boolean} isDisableGroup     override the groupinKey ?
     */
    _onFacetSelection: function _onFacetSelection(facetComponentData, isDisableGroup) {
        if (keys(facetComponentData.selectedFacetList).length === 1 && facetComponentData.selectedFacetList[scopeFacetKey]) {
            this.props.action.updateProperties({
                scope: this.props.scopesConfig[facetComponentData.selectedFacetList[scopeFacetKey].key],
                sortBy: undefined,
                sortAsc: true
            });
        } else {
            delete facetComponentData.selectedFacetList[scopeFacetKey];
            var newProperties = {
                selectedFacets: facetComponentData.selectedFacetList
            };
            if (isDisableGroup) {
                newProperties.groupingKey = undefined;
            }
            this.props.action.updateProperties(newProperties);
        }
    },

    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render: function render() {
        return React.createElement(FacetBox, {
            'data-focus': 'advanced-search-facet-box',
            facetList: this.props.facets,
            selectedFacetList: this.props.selectedFacets,
            config: this.props.facetConfig,
            openedFacetList: this.props.openedFacetList,
            dataSelectionHandler: this._onFacetSelection
        });
    }
};

module.exports = (0, _builder2.default)(Box);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJrZXlzIiwiRmFjZXRCb3giLCJjb21wb25lbnQiLCJzY29wZUZhY2V0S2V5IiwiQm94IiwiZ2V0RGVmYXVsdFByb3BzIiwiZmFjZXRzIiwic2VsZWN0ZWRGYWNldHMiLCJmYWNldENvbmZpZyIsImFjdGlvbiIsInVuZGVmaW5lZCIsInNjb3Blc0NvbmZpZyIsIl9vbkZhY2V0U2VsZWN0aW9uIiwiZmFjZXRDb21wb25lbnREYXRhIiwiaXNEaXNhYmxlR3JvdXAiLCJzZWxlY3RlZEZhY2V0TGlzdCIsImxlbmd0aCIsInByb3BzIiwidXBkYXRlUHJvcGVydGllcyIsInNjb3BlIiwia2V5Iiwic29ydEJ5Iiwic29ydEFzYyIsIm5ld1Byb3BlcnRpZXMiLCJncm91cGluZ0tleSIsInJlbmRlciIsIm9wZW5lZEZhY2V0TGlzdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7OztBQUZBO0FBQ0EsSUFBTUEsUUFBUUMsUUFBUSxPQUFSLENBQWQ7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxvQkFBUixDQUFiOztBQUVBOztBQUVBLElBQU1FLFdBQVdGLFFBQVEsMkJBQVIsRUFBcUNHLFNBQXREOztBQUVBLElBQU1DLGdCQUFnQixXQUF0Qjs7QUFFQSxJQUFNQyxNQUFNO0FBQ1I7Ozs7QUFJQUMsbUJBTFEsNkJBS1U7QUFDZCxlQUFRO0FBQ0pDLG9CQUFRLEVBREo7QUFFSkMsNEJBQWdCLEVBRlo7QUFHSkMseUJBQWEsRUFIVDtBQUlKQyxvQkFBUUMsU0FKSjtBQUtKQywwQkFBY0Q7QUFMVixTQUFSO0FBT0gsS0FiTzs7QUFjUjs7Ozs7QUFLQUUscUJBbkJRLDZCQW1CVUMsa0JBbkJWLEVBbUI4QkMsY0FuQjlCLEVBbUI4QztBQUNsRCxZQUFJZCxLQUFLYSxtQkFBbUJFLGlCQUF4QixFQUEyQ0MsTUFBM0MsS0FBc0QsQ0FBdEQsSUFBMkRILG1CQUFtQkUsaUJBQW5CLENBQXFDWixhQUFyQyxDQUEvRCxFQUFvSDtBQUNoSCxpQkFBS2MsS0FBTCxDQUFXUixNQUFYLENBQWtCUyxnQkFBbEIsQ0FBbUM7QUFDL0JDLHVCQUFPLEtBQUtGLEtBQUwsQ0FBV04sWUFBWCxDQUF3QkUsbUJBQW1CRSxpQkFBbkIsQ0FBcUNaLGFBQXJDLEVBQW9EaUIsR0FBNUUsQ0FEd0I7QUFFL0JDLHdCQUFRWCxTQUZ1QjtBQUcvQlkseUJBQVM7QUFIc0IsYUFBbkM7QUFLSCxTQU5ELE1BTU87QUFDSCxtQkFBT1QsbUJBQW1CRSxpQkFBbkIsQ0FBcUNaLGFBQXJDLENBQVA7QUFDQSxnQkFBTW9CLGdCQUFnQjtBQUNsQmhCLGdDQUFnQk0sbUJBQW1CRTtBQURqQixhQUF0QjtBQUdBLGdCQUFJRCxjQUFKLEVBQW9CO0FBQ2hCUyw4QkFBY0MsV0FBZCxHQUE0QmQsU0FBNUI7QUFDSDtBQUNELGlCQUFLTyxLQUFMLENBQVdSLE1BQVgsQ0FBa0JTLGdCQUFsQixDQUFtQ0ssYUFBbkM7QUFDSDtBQUVKLEtBckNPOztBQXNDUjs7OztBQUlBRSxVQTFDUSxvQkEwQ0M7QUFDTCxlQUNJLG9CQUFDLFFBQUQ7QUFDSSwwQkFBVywyQkFEZjtBQUVJLHVCQUFXLEtBQUtSLEtBQUwsQ0FBV1gsTUFGMUI7QUFHSSwrQkFBbUIsS0FBS1csS0FBTCxDQUFXVixjQUhsQztBQUlJLG9CQUFRLEtBQUtVLEtBQUwsQ0FBV1QsV0FKdkI7QUFLSSw2QkFBaUIsS0FBS1MsS0FBTCxDQUFXUyxlQUxoQztBQU1JLGtDQUFzQixLQUFLZDtBQU4vQixVQURKO0FBVUg7QUFyRE8sQ0FBWjs7QUF3REFlLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVF4QixHQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5jb25zdCBrZXlzID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC9rZXlzJyk7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcblxyXG5jb25zdCBGYWNldEJveCA9IHJlcXVpcmUoJy4uLy4uLy4uL3NlYXJjaC9mYWNldC1ib3gnKS5jb21wb25lbnQ7XHJcblxyXG5jb25zdCBzY29wZUZhY2V0S2V5ID0gJ0ZDVF9TQ09QRSc7XHJcblxyXG5jb25zdCBCb3ggPSB7XHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgZGVmYXVsdCBwcm9wc1xyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSB0aGUgZGVmYXVsdCBwcm9wc1xyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgIGZhY2V0czoge30sXHJcbiAgICAgICAgICAgIHNlbGVjdGVkRmFjZXRzOiB7fSxcclxuICAgICAgICAgICAgZmFjZXRDb25maWc6IHt9LFxyXG4gICAgICAgICAgICBhY3Rpb246IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgc2NvcGVzQ29uZmlnOiB1bmRlZmluZWRcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEZhY2V0IHNlbGVjdGlvbiBoYW5kbGVyXHJcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9ICBmYWNldENvbXBvbmVudERhdGEgVGhlIG5ldyBmYWNldCBib3ggc3RhdGUsIGdpdmVuIGJ5IHRoZSBGYWNldEJveCBjb21wb25lbnRcclxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IGlzRGlzYWJsZUdyb3VwICAgICBvdmVycmlkZSB0aGUgZ3JvdXBpbktleSA/XHJcbiAgICAgKi9cclxuICAgIF9vbkZhY2V0U2VsZWN0aW9uKGZhY2V0Q29tcG9uZW50RGF0YSwgaXNEaXNhYmxlR3JvdXApIHtcclxuICAgICAgICBpZiAoa2V5cyhmYWNldENvbXBvbmVudERhdGEuc2VsZWN0ZWRGYWNldExpc3QpLmxlbmd0aCA9PT0gMSAmJiBmYWNldENvbXBvbmVudERhdGEuc2VsZWN0ZWRGYWNldExpc3Rbc2NvcGVGYWNldEtleV0pIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5hY3Rpb24udXBkYXRlUHJvcGVydGllcyh7XHJcbiAgICAgICAgICAgICAgICBzY29wZTogdGhpcy5wcm9wcy5zY29wZXNDb25maWdbZmFjZXRDb21wb25lbnREYXRhLnNlbGVjdGVkRmFjZXRMaXN0W3Njb3BlRmFjZXRLZXldLmtleV0sXHJcbiAgICAgICAgICAgICAgICBzb3J0Qnk6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIHNvcnRBc2M6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGVsZXRlIGZhY2V0Q29tcG9uZW50RGF0YS5zZWxlY3RlZEZhY2V0TGlzdFtzY29wZUZhY2V0S2V5XTtcclxuICAgICAgICAgICAgY29uc3QgbmV3UHJvcGVydGllcyA9IHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRmFjZXRzOiBmYWNldENvbXBvbmVudERhdGEuc2VsZWN0ZWRGYWNldExpc3RcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKGlzRGlzYWJsZUdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdQcm9wZXJ0aWVzLmdyb3VwaW5nS2V5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuYWN0aW9uLnVwZGF0ZVByb3BlcnRpZXMobmV3UHJvcGVydGllcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJuIHtIVE1MfSB0aGUgcmVuZGVyZWQgY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8RmFjZXRCb3hcclxuICAgICAgICAgICAgICAgIGRhdGEtZm9jdXM9J2FkdmFuY2VkLXNlYXJjaC1mYWNldC1ib3gnXHJcbiAgICAgICAgICAgICAgICBmYWNldExpc3Q9e3RoaXMucHJvcHMuZmFjZXRzfVxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRGYWNldExpc3Q9e3RoaXMucHJvcHMuc2VsZWN0ZWRGYWNldHN9XHJcbiAgICAgICAgICAgICAgICBjb25maWc9e3RoaXMucHJvcHMuZmFjZXRDb25maWd9XHJcbiAgICAgICAgICAgICAgICBvcGVuZWRGYWNldExpc3Q9e3RoaXMucHJvcHMub3BlbmVkRmFjZXRMaXN0fVxyXG4gICAgICAgICAgICAgICAgZGF0YVNlbGVjdGlvbkhhbmRsZXI9e3RoaXMuX29uRmFjZXRTZWxlY3Rpb259XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihCb3gpO1xyXG4iXX0=