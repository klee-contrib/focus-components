"use strict";

var memoryMixin = {
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            data: [],
            reference: {},
            perPage: 5
        };
    },


    /** @inheritdoc */
    getInitialState: function getInitialState() {
        return {
            page: 1,
            maxElements: this.props.perPage
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
            this.setState({
                maxElements: nextProps.perPage
            });
        }
    },


    /**
     * Calculate the number of element to display in the memory list.
     * @param page the current page to fetch
     */
    fetchNextPage: function fetchNextPage() {
        var currentPage = this.state.page + 1;
        this.setState({
            page: currentPage,
            maxElements: this.props.perPage * currentPage
        });
    },


    /**
     * Calculate the data to display.
     * @return data list
     */
    getDataToUse: function getDataToUse() {
        if (!this.props.data) {
            return [];
        }
        return this.props.data.slice(0, this.state.maxElements);
    },


    /**
     * Get the reference lists.
     * @return {object} object wich contains all reference lists.
     */
    getReference: function getReference() {
        return this.state.reference || this.props.reference;
    }
};

module.exports = memoryMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJtZW1vcnlNaXhpbiIsImdldERlZmF1bHRQcm9wcyIsImRhdGEiLCJyZWZlcmVuY2UiLCJwZXJQYWdlIiwiZ2V0SW5pdGlhbFN0YXRlIiwicGFnZSIsIm1heEVsZW1lbnRzIiwicHJvcHMiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJmZXRjaE5leHRQYWdlIiwiY3VycmVudFBhZ2UiLCJzdGF0ZSIsImdldERhdGFUb1VzZSIsInNsaWNlIiwiZ2V0UmVmZXJlbmNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxjQUFjO0FBQ2Q7QUFDQUMsbUJBRmMsNkJBRUk7QUFDZCxlQUFPO0FBQ0hDLGtCQUFNLEVBREg7QUFFSEMsdUJBQVcsRUFGUjtBQUdIQyxxQkFBUztBQUhOLFNBQVA7QUFLSCxLQVJhOzs7QUFVZDtBQUNBQyxtQkFYYyw2QkFXSTtBQUNkLGVBQU87QUFDSEMsa0JBQU0sQ0FESDtBQUVIQyx5QkFBYSxLQUFLQyxLQUFMLENBQVdKO0FBRnJCLFNBQVA7QUFJSCxLQWhCYTtBQWtCZEssNkJBbEJjLHFDQWtCWUMsU0FsQlosRUFrQnVCO0FBQ2pDLFlBQUdBLFVBQVVOLE9BQVYsSUFBcUJNLFVBQVVOLE9BQVYsS0FBc0IsS0FBS0ksS0FBTCxDQUFXSixPQUF6RCxFQUFrRTtBQUM5RCxpQkFBS08sUUFBTCxDQUFjO0FBQ1ZKLDZCQUFhRyxVQUFVTjtBQURiLGFBQWQ7QUFHSDtBQUNKLEtBeEJhOzs7QUEwQmQ7Ozs7QUFJQVEsaUJBOUJjLDJCQThCRTtBQUNaLFlBQUlDLGNBQWMsS0FBS0MsS0FBTCxDQUFXUixJQUFYLEdBQWtCLENBQXBDO0FBQ0EsYUFBS0ssUUFBTCxDQUFjO0FBQ1ZMLGtCQUFNTyxXQURJO0FBRVZOLHlCQUFhLEtBQUtDLEtBQUwsQ0FBV0osT0FBWCxHQUFxQlM7QUFGeEIsU0FBZDtBQUlILEtBcENhOzs7QUFzQ2Q7Ozs7QUFJQUUsZ0JBMUNjLDBCQTBDQztBQUNYLFlBQUcsQ0FBQyxLQUFLUCxLQUFMLENBQVdOLElBQWYsRUFBcUI7QUFDakIsbUJBQU8sRUFBUDtBQUNIO0FBQ0QsZUFBTyxLQUFLTSxLQUFMLENBQVdOLElBQVgsQ0FBZ0JjLEtBQWhCLENBQXNCLENBQXRCLEVBQXlCLEtBQUtGLEtBQUwsQ0FBV1AsV0FBcEMsQ0FBUDtBQUNILEtBL0NhOzs7QUFpRGQ7Ozs7QUFJQVUsZ0JBckRjLDBCQXFEQztBQUNYLGVBQU8sS0FBS0gsS0FBTCxDQUFXWCxTQUFYLElBQXdCLEtBQUtLLEtBQUwsQ0FBV0wsU0FBMUM7QUFDSDtBQXZEYSxDQUFsQjs7QUEwREFlLE9BQU9DLE9BQVAsR0FBaUJuQixXQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgbWVtb3J5TWl4aW4gPSB7XHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgcmVmZXJlbmNlOiB7fSxcclxuICAgICAgICAgICAgcGVyUGFnZTogNVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBhZ2U6IDEsXHJcbiAgICAgICAgICAgIG1heEVsZW1lbnRzOiB0aGlzLnByb3BzLnBlclBhZ2VcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgICBpZihuZXh0UHJvcHMucGVyUGFnZSAmJiBuZXh0UHJvcHMucGVyUGFnZSAhPT0gdGhpcy5wcm9wcy5wZXJQYWdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgbWF4RWxlbWVudHM6IG5leHRQcm9wcy5wZXJQYWdlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgdGhlIG51bWJlciBvZiBlbGVtZW50IHRvIGRpc3BsYXkgaW4gdGhlIG1lbW9yeSBsaXN0LlxyXG4gICAgICogQHBhcmFtIHBhZ2UgdGhlIGN1cnJlbnQgcGFnZSB0byBmZXRjaFxyXG4gICAgICovXHJcbiAgICBmZXRjaE5leHRQYWdlKCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50UGFnZSA9IHRoaXMuc3RhdGUucGFnZSArIDE7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlLFxyXG4gICAgICAgICAgICBtYXhFbGVtZW50czogdGhpcy5wcm9wcy5wZXJQYWdlICogY3VycmVudFBhZ2VcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgdGhlIGRhdGEgdG8gZGlzcGxheS5cclxuICAgICAqIEByZXR1cm4gZGF0YSBsaXN0XHJcbiAgICAgKi9cclxuICAgIGdldERhdGFUb1VzZSgpIHtcclxuICAgICAgICBpZighdGhpcy5wcm9wcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGF0YS5zbGljZSgwLCB0aGlzLnN0YXRlLm1heEVsZW1lbnRzKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHJlZmVyZW5jZSBsaXN0cy5cclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gb2JqZWN0IHdpY2ggY29udGFpbnMgYWxsIHJlZmVyZW5jZSBsaXN0cy5cclxuICAgICAqL1xyXG4gICAgZ2V0UmVmZXJlbmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnJlZmVyZW5jZSB8fCB0aGlzLnByb3BzLnJlZmVyZW5jZTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbWVtb3J5TWl4aW47XHJcbiJdfQ==