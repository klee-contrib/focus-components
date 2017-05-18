'use strict';

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paginationMixin = {
    /**
     * @inheritDoc
     */
    getDefaultProps: function getPaginationDefaultProps() {
        return {
            hasMoreData: false,
            isManualFetch: false
        };
    },

    propTypes: {
        hasMoreData: (0, _types2.default)('bool'),
        fetchNextPage: (0, _types2.default)('func'),
        isManualFetch: (0, _types2.default)('bool')
    },

    /**
     * Fetch the next page.
     * @param {number} page the page to fetch
     * @return {*} the next page
     */
    fetchNextPage: function fetchNextPage(page) {
        if (!this.props.hasMoreData) {
            return;
        }
        if (this.props.fetchNextPage) {
            return this.props.fetchNextPage(page);
        }
    },

    /**
     * handle manual fetch.
     * @param {object} event event received
     */
    handleShowMore: function handleShowMore(event) {
        this.nextPage++;
        this.fetchNextPage(this.nextPage);
    }
};

module.exports = { mixin: paginationMixin };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwYWdpbmF0aW9uTWl4aW4iLCJnZXREZWZhdWx0UHJvcHMiLCJnZXRQYWdpbmF0aW9uRGVmYXVsdFByb3BzIiwiaGFzTW9yZURhdGEiLCJpc01hbnVhbEZldGNoIiwicHJvcFR5cGVzIiwiZmV0Y2hOZXh0UGFnZSIsInBhZ2UiLCJwcm9wcyIsImhhbmRsZVNob3dNb3JlIiwiZXZlbnQiLCJuZXh0UGFnZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0FBRUEsSUFBSUEsa0JBQWtCO0FBQ2xCOzs7QUFHQUMscUJBQWlCLFNBQVNDLHlCQUFULEdBQXFDO0FBQ2xELGVBQU87QUFDSEMseUJBQWEsS0FEVjtBQUVIQywyQkFBZTtBQUZaLFNBQVA7QUFJSCxLQVRpQjs7QUFXbEJDLGVBQVc7QUFDUEYscUJBQWEscUJBQUssTUFBTCxDQUROO0FBRVBHLHVCQUFlLHFCQUFLLE1BQUwsQ0FGUjtBQUdQRix1QkFBZSxxQkFBSyxNQUFMO0FBSFIsS0FYTzs7QUFpQmxCOzs7OztBQUtBRSxtQkFBZSxTQUFTQSxhQUFULENBQXVCQyxJQUF2QixFQUE2QjtBQUN4QyxZQUFHLENBQUMsS0FBS0MsS0FBTCxDQUFXTCxXQUFmLEVBQTRCO0FBQ3hCO0FBQ0g7QUFDRCxZQUFHLEtBQUtLLEtBQUwsQ0FBV0YsYUFBZCxFQUE2QjtBQUN6QixtQkFBTyxLQUFLRSxLQUFMLENBQVdGLGFBQVgsQ0FBeUJDLElBQXpCLENBQVA7QUFDSDtBQUNKLEtBN0JpQjs7QUErQmxCOzs7O0FBSUFFLG9CQUFnQixTQUFTQSxjQUFULENBQXdCQyxLQUF4QixFQUErQjtBQUMzQyxhQUFLQyxRQUFMO0FBQ0EsYUFBS0wsYUFBTCxDQUFtQixLQUFLSyxRQUF4QjtBQUNIO0FBdENpQixDQUF0Qjs7QUF5Q0FDLE9BQU9DLE9BQVAsR0FBaUIsRUFBQ0MsT0FBT2QsZUFBUixFQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcblxyXG52YXIgcGFnaW5hdGlvbk1peGluID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdERvY1xyXG4gICAgICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldFBhZ2luYXRpb25EZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGFzTW9yZURhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc01hbnVhbEZldGNoOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIGhhc01vcmVEYXRhOiB0eXBlKCdib29sJyksXHJcbiAgICAgICAgZmV0Y2hOZXh0UGFnZTogdHlwZSgnZnVuYycpLFxyXG4gICAgICAgIGlzTWFudWFsRmV0Y2g6IHR5cGUoJ2Jvb2wnKVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZldGNoIHRoZSBuZXh0IHBhZ2UuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcGFnZSB0aGUgcGFnZSB0byBmZXRjaFxyXG4gICAgICogQHJldHVybiB7Kn0gdGhlIG5leHQgcGFnZVxyXG4gICAgICovXHJcbiAgICBmZXRjaE5leHRQYWdlOiBmdW5jdGlvbiBmZXRjaE5leHRQYWdlKHBhZ2UpIHtcclxuICAgICAgICBpZighdGhpcy5wcm9wcy5oYXNNb3JlRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMucHJvcHMuZmV0Y2hOZXh0UGFnZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5mZXRjaE5leHRQYWdlKHBhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoYW5kbGUgbWFudWFsIGZldGNoLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGV2ZW50IGV2ZW50IHJlY2VpdmVkXHJcbiAgICAgKi9cclxuICAgIGhhbmRsZVNob3dNb3JlOiBmdW5jdGlvbiBoYW5kbGVTaG93TW9yZShldmVudCkge1xyXG4gICAgICAgIHRoaXMubmV4dFBhZ2UrKztcclxuICAgICAgICB0aGlzLmZldGNoTmV4dFBhZ2UodGhpcy5uZXh0UGFnZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHttaXhpbjogcGFnaW5hdGlvbk1peGlufTtcclxuIl19