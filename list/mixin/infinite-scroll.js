'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var topOfElement = function topOfElement(element) {
    if (!element) {
        return 0;
    }
    return element.offsetTop + topOfElement(element.offsetParent);
};

var paginationMixin = require('../mixin/pagination').mixin;
/**
 *
 * Mixin which add infinite scroll behavior.
 */
var InfiniteScrollMixin = {

    mixins: [paginationMixin],
    /**
     * defaults props for the mixin.
     * @returns {object} - the default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            isInfiniteScroll: true,
            initialPage: 1,
            offset: 250
        };
    },

    /**
     * Before component mount
     */
    componentWillMount: function componentWillMount() {
        this.nextPage = this.props.initialPage;
    },

    /**
     * Before component unmount.
     */
    componentWillUnmount: function componentWillUnmount() {
        if (!this.props.isManualFetch) {
            this.detachScrollListener();
        }
    },

    /**
     * After component Mount.
     */
    componentDidMount: function componentDidMount() {
        this.parentNode = this.props.parentSelector ? document.querySelector(this.props.parentSelector) : window;
        if (!this.props.isManualFetch) {
            this.attachScrollListener();
        }
    },

    /**
     * after component update.
     */
    componentDidUpdate: function componentDidUpdate() {
        if (!this.props.isLoading && !this.props.isManualFetch) {
            this.attachScrollListener();
        }
    },

    /**
     * Handler for the scroll event.
     */
    scrollListener: function scrollListener() {
        var el = ReactDOM.findDOMNode(this);
        var scrollTop = this.parentNode.pageYOffset !== undefined ? this.parentNode.pageYOffset : this.parentNode.scrollTop;
        if (topOfElement(el) + el.offsetHeight - scrollTop - (window.innerHeight || this.parentNode.offsetHeight) < this.props.offset) {
            this.detachScrollListener();
            this.fetchNextPage(this.nextPage++);
        }

        //calculate visible index in the list
        /*const topHeader = topOfElement(el);
        const pageHeight = topHeader+el.offsetHeight;
        const scrollHeader = (topHeader / pageHeight)*window.innerHeight;
        //console.log((scrollTop - (topHeader / pageHeight) / (el.offsetHeight - topHeader) * this.state.data.length);
        const visibleIndex = (scrollTop - topHeader) / (el.offsetHeight) * this.state.data.length;
        console.log(visibleIndex);*/
    },

    /**
     * Attach scroll listener on the component.
     */
    attachScrollListener: function attachScrollListener() {
        if (!this.props.hasMoreData) {
            return;
        }
        this.parentNode.addEventListener('scroll', this.scrollListener);
        this.parentNode.addEventListener('resize', this.scrollListener);
        this.scrollListener();
    },

    /**
     * detach scroll listener on the component
     */
    detachScrollListener: function detachScrollListener() {
        this.parentNode.removeEventListener('scroll', this.scrollListener);
        this.parentNode.removeEventListener('resize', this.scrollListener);
    }
};

module.exports = { mixin: InfiniteScrollMixin };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJSZWFjdERPTSIsInRvcE9mRWxlbWVudCIsImVsZW1lbnQiLCJvZmZzZXRUb3AiLCJvZmZzZXRQYXJlbnQiLCJwYWdpbmF0aW9uTWl4aW4iLCJtaXhpbiIsIkluZmluaXRlU2Nyb2xsTWl4aW4iLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJpc0luZmluaXRlU2Nyb2xsIiwiaW5pdGlhbFBhZ2UiLCJvZmZzZXQiLCJjb21wb25lbnRXaWxsTW91bnQiLCJuZXh0UGFnZSIsInByb3BzIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJpc01hbnVhbEZldGNoIiwiZGV0YWNoU2Nyb2xsTGlzdGVuZXIiLCJjb21wb25lbnREaWRNb3VudCIsInBhcmVudE5vZGUiLCJwYXJlbnRTZWxlY3RvciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIndpbmRvdyIsImF0dGFjaFNjcm9sbExpc3RlbmVyIiwiY29tcG9uZW50RGlkVXBkYXRlIiwiaXNMb2FkaW5nIiwic2Nyb2xsTGlzdGVuZXIiLCJlbCIsImZpbmRET01Ob2RlIiwic2Nyb2xsVG9wIiwicGFnZVlPZmZzZXQiLCJ1bmRlZmluZWQiLCJvZmZzZXRIZWlnaHQiLCJpbm5lckhlaWdodCIsImZldGNoTmV4dFBhZ2UiLCJoYXNNb3JlRGF0YSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDtBQUNBLElBQU1DLFdBQVdELFFBQVEsV0FBUixDQUFqQjs7QUFFQSxJQUFNRSxlQUFlLFNBQWZBLFlBQWUsQ0FBU0MsT0FBVCxFQUFrQjtBQUNuQyxRQUFJLENBQUNBLE9BQUwsRUFBYztBQUNWLGVBQU8sQ0FBUDtBQUNIO0FBQ0QsV0FBT0EsUUFBUUMsU0FBUixHQUFvQkYsYUFBYUMsUUFBUUUsWUFBckIsQ0FBM0I7QUFDSCxDQUxEOztBQU9BLElBQU1DLGtCQUFrQk4sUUFBUSxxQkFBUixFQUErQk8sS0FBdkQ7QUFDQTs7OztBQUlBLElBQU1DLHNCQUFzQjs7QUFFeEJDLFlBQVEsQ0FBQ0gsZUFBRCxDQUZnQjtBQUd4Qjs7OztBQUlBSSxxQkFBaUIsMkJBQVc7QUFDeEIsZUFBTztBQUNIQyw4QkFBa0IsSUFEZjtBQUVIQyx5QkFBYSxDQUZWO0FBR0hDLG9CQUFRO0FBSEwsU0FBUDtBQUtILEtBYnVCOztBQWV4Qjs7O0FBR0FDLHdCQUFvQiw4QkFBVztBQUMzQixhQUFLQyxRQUFMLEdBQWdCLEtBQUtDLEtBQUwsQ0FBV0osV0FBM0I7QUFDSCxLQXBCdUI7O0FBc0J4Qjs7O0FBR0FLLDBCQUFzQixnQ0FBVztBQUM3QixZQUFHLENBQUMsS0FBS0QsS0FBTCxDQUFXRSxhQUFmLEVBQThCO0FBQzFCLGlCQUFLQyxvQkFBTDtBQUNIO0FBQ0osS0E3QnVCOztBQStCeEI7OztBQUdBQyx1QkFBbUIsNkJBQVc7QUFDMUIsYUFBS0MsVUFBTCxHQUFrQixLQUFLTCxLQUFMLENBQVdNLGNBQVgsR0FBNEJDLFNBQVNDLGFBQVQsQ0FBdUIsS0FBS1IsS0FBTCxDQUFXTSxjQUFsQyxDQUE1QixHQUFnRkcsTUFBbEc7QUFDQSxZQUFHLENBQUMsS0FBS1QsS0FBTCxDQUFXRSxhQUFmLEVBQThCO0FBQzFCLGlCQUFLUSxvQkFBTDtBQUNIO0FBQ0osS0F2Q3VCOztBQXlDeEI7OztBQUdBQyx3QkFBb0IsOEJBQVc7QUFDM0IsWUFBRyxDQUFDLEtBQUtYLEtBQUwsQ0FBV1ksU0FBWixJQUF5QixDQUFDLEtBQUtaLEtBQUwsQ0FBV0UsYUFBeEMsRUFBdUQ7QUFDbkQsaUJBQUtRLG9CQUFMO0FBQ0g7QUFDSixLQWhEdUI7O0FBa0R4Qjs7O0FBR0FHLG9CQUFnQiwwQkFBWTtBQUN4QixZQUFNQyxLQUFLN0IsU0FBUzhCLFdBQVQsQ0FBcUIsSUFBckIsQ0FBWDtBQUNBLFlBQU1DLFlBQWEsS0FBS1gsVUFBTCxDQUFnQlksV0FBaEIsS0FBZ0NDLFNBQWpDLEdBQThDLEtBQUtiLFVBQUwsQ0FBZ0JZLFdBQTlELEdBQTRFLEtBQUtaLFVBQUwsQ0FBZ0JXLFNBQTlHO0FBQ0EsWUFBSTlCLGFBQWE0QixFQUFiLElBQW1CQSxHQUFHSyxZQUF0QixHQUFxQ0gsU0FBckMsSUFBa0RQLE9BQU9XLFdBQVAsSUFBc0IsS0FBS2YsVUFBTCxDQUFnQmMsWUFBeEYsSUFBd0csS0FBS25CLEtBQUwsQ0FBV0gsTUFBdkgsRUFBK0g7QUFDM0gsaUJBQUtNLG9CQUFMO0FBQ0EsaUJBQUtrQixhQUFMLENBQW1CLEtBQUt0QixRQUFMLEVBQW5CO0FBQ0g7O0FBRUQ7QUFDQTs7Ozs7O0FBTUgsS0FwRXVCOztBQXNFeEI7OztBQUdBVywwQkFBc0IsZ0NBQVk7QUFDOUIsWUFBRyxDQUFDLEtBQUtWLEtBQUwsQ0FBV3NCLFdBQWYsRUFBNEI7QUFDeEI7QUFDSDtBQUNELGFBQUtqQixVQUFMLENBQWdCa0IsZ0JBQWhCLENBQWlDLFFBQWpDLEVBQTJDLEtBQUtWLGNBQWhEO0FBQ0EsYUFBS1IsVUFBTCxDQUFnQmtCLGdCQUFoQixDQUFpQyxRQUFqQyxFQUEyQyxLQUFLVixjQUFoRDtBQUNBLGFBQUtBLGNBQUw7QUFDSCxLQWhGdUI7O0FBa0Z4Qjs7O0FBR0FWLDBCQUFzQixnQ0FBWTtBQUM5QixhQUFLRSxVQUFMLENBQWdCbUIsbUJBQWhCLENBQW9DLFFBQXBDLEVBQThDLEtBQUtYLGNBQW5EO0FBQ0EsYUFBS1IsVUFBTCxDQUFnQm1CLG1CQUFoQixDQUFvQyxRQUFwQyxFQUE4QyxLQUFLWCxjQUFuRDtBQUNIO0FBeEZ1QixDQUE1Qjs7QUEyRkFZLE9BQU9DLE9BQVAsR0FBaUIsRUFBQ25DLE9BQU9DLG1CQUFSLEVBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuY29uc3QgUmVhY3RET00gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcclxuXHJcbmNvbnN0IHRvcE9mRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0VG9wICsgdG9wT2ZFbGVtZW50KGVsZW1lbnQub2Zmc2V0UGFyZW50KTtcclxufTtcclxuXHJcbmNvbnN0IHBhZ2luYXRpb25NaXhpbiA9IHJlcXVpcmUoJy4uL21peGluL3BhZ2luYXRpb24nKS5taXhpbjtcclxuLyoqXHJcbiAqXHJcbiAqIE1peGluIHdoaWNoIGFkZCBpbmZpbml0ZSBzY3JvbGwgYmVoYXZpb3IuXHJcbiAqL1xyXG5jb25zdCBJbmZpbml0ZVNjcm9sbE1peGluID0ge1xyXG5cclxuICAgIG1peGluczogW3BhZ2luYXRpb25NaXhpbl0sXHJcbiAgICAvKipcclxuICAgICAqIGRlZmF1bHRzIHByb3BzIGZvciB0aGUgbWl4aW4uXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIHRoZSBkZWZhdWx0IHByb3BzXHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaXNJbmZpbml0ZVNjcm9sbDogdHJ1ZSxcclxuICAgICAgICAgICAgaW5pdGlhbFBhZ2U6IDEsXHJcbiAgICAgICAgICAgIG9mZnNldDogMjUwXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCZWZvcmUgY29tcG9uZW50IG1vdW50XHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5uZXh0UGFnZSA9IHRoaXMucHJvcHMuaW5pdGlhbFBhZ2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmVmb3JlIGNvbXBvbmVudCB1bm1vdW50LlxyXG4gICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoIXRoaXMucHJvcHMuaXNNYW51YWxGZXRjaCkge1xyXG4gICAgICAgICAgICB0aGlzLmRldGFjaFNjcm9sbExpc3RlbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFmdGVyIGNvbXBvbmVudCBNb3VudC5cclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucGFyZW50Tm9kZSA9IHRoaXMucHJvcHMucGFyZW50U2VsZWN0b3IgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMucHJvcHMucGFyZW50U2VsZWN0b3IpIDogd2luZG93O1xyXG4gICAgICAgIGlmKCF0aGlzLnByb3BzLmlzTWFudWFsRmV0Y2gpIHtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2hTY3JvbGxMaXN0ZW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBhZnRlciBjb21wb25lbnQgdXBkYXRlLlxyXG4gICAgICovXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLnByb3BzLmlzTG9hZGluZyAmJiAhdGhpcy5wcm9wcy5pc01hbnVhbEZldGNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoU2Nyb2xsTGlzdGVuZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlciBmb3IgdGhlIHNjcm9sbCBldmVudC5cclxuICAgICAqL1xyXG4gICAgc2Nyb2xsTGlzdGVuZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBlbCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbFRvcCA9ICh0aGlzLnBhcmVudE5vZGUucGFnZVlPZmZzZXQgIT09IHVuZGVmaW5lZCkgPyB0aGlzLnBhcmVudE5vZGUucGFnZVlPZmZzZXQgOiB0aGlzLnBhcmVudE5vZGUuc2Nyb2xsVG9wO1xyXG4gICAgICAgIGlmICh0b3BPZkVsZW1lbnQoZWwpICsgZWwub2Zmc2V0SGVpZ2h0IC0gc2Nyb2xsVG9wIC0gKHdpbmRvdy5pbm5lckhlaWdodCB8fCB0aGlzLnBhcmVudE5vZGUub2Zmc2V0SGVpZ2h0KSA8IHRoaXMucHJvcHMub2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWNoU2Nyb2xsTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5mZXRjaE5leHRQYWdlKHRoaXMubmV4dFBhZ2UrKyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NhbGN1bGF0ZSB2aXNpYmxlIGluZGV4IGluIHRoZSBsaXN0XHJcbiAgICAgICAgLypjb25zdCB0b3BIZWFkZXIgPSB0b3BPZkVsZW1lbnQoZWwpO1xyXG4gICAgICAgIGNvbnN0IHBhZ2VIZWlnaHQgPSB0b3BIZWFkZXIrZWwub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbEhlYWRlciA9ICh0b3BIZWFkZXIgLyBwYWdlSGVpZ2h0KSp3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygoc2Nyb2xsVG9wIC0gKHRvcEhlYWRlciAvIHBhZ2VIZWlnaHQpIC8gKGVsLm9mZnNldEhlaWdodCAtIHRvcEhlYWRlcikgKiB0aGlzLnN0YXRlLmRhdGEubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCB2aXNpYmxlSW5kZXggPSAoc2Nyb2xsVG9wIC0gdG9wSGVhZGVyKSAvIChlbC5vZmZzZXRIZWlnaHQpICogdGhpcy5zdGF0ZS5kYXRhLmxlbmd0aDtcclxuICAgICAgICBjb25zb2xlLmxvZyh2aXNpYmxlSW5kZXgpOyovXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIHNjcm9sbCBsaXN0ZW5lciBvbiB0aGUgY29tcG9uZW50LlxyXG4gICAgICovXHJcbiAgICBhdHRhY2hTY3JvbGxMaXN0ZW5lcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLnByb3BzLmhhc01vcmVEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXJlbnROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsTGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMucGFyZW50Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNjcm9sbExpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLnNjcm9sbExpc3RlbmVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGV0YWNoIHNjcm9sbCBsaXN0ZW5lciBvbiB0aGUgY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIGRldGFjaFNjcm9sbExpc3RlbmVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuc2Nyb2xsTGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnNjcm9sbExpc3RlbmVyKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge21peGluOiBJbmZpbml0ZVNjcm9sbE1peGlufTtcclxuIl19