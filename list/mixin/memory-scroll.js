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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJtZW1vcnlNaXhpbiIsImdldERlZmF1bHRQcm9wcyIsImRhdGEiLCJyZWZlcmVuY2UiLCJwZXJQYWdlIiwiZ2V0SW5pdGlhbFN0YXRlIiwicGFnZSIsIm1heEVsZW1lbnRzIiwicHJvcHMiLCJmZXRjaE5leHRQYWdlIiwiY3VycmVudFBhZ2UiLCJzdGF0ZSIsInNldFN0YXRlIiwiZ2V0RGF0YVRvVXNlIiwic2xpY2UiLCJnZXRSZWZlcmVuY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGNBQWM7QUFDZDtBQUNBQyxtQkFGYyw2QkFFSTtBQUNkLGVBQU87QUFDSEMsa0JBQU0sRUFESDtBQUVIQyx1QkFBVyxFQUZSO0FBR0hDLHFCQUFTO0FBSE4sU0FBUDtBQUtILEtBUmE7OztBQVVkO0FBQ0FDLG1CQVhjLDZCQVdJO0FBQ2QsZUFBTztBQUNIQyxrQkFBTSxDQURIO0FBRUhDLHlCQUFhLEtBQUtDLEtBQUwsQ0FBV0o7QUFGckIsU0FBUDtBQUlILEtBaEJhOzs7QUFrQmQ7Ozs7QUFJQUssaUJBdEJjLDJCQXNCRTtBQUNaLFlBQUlDLGNBQWMsS0FBS0MsS0FBTCxDQUFXTCxJQUFYLEdBQWtCLENBQXBDO0FBQ0EsYUFBS00sUUFBTCxDQUFjO0FBQ1ZOLGtCQUFNSSxXQURJO0FBRVZILHlCQUFhLEtBQUtDLEtBQUwsQ0FBV0osT0FBWCxHQUFxQk07QUFGeEIsU0FBZDtBQUlILEtBNUJhOzs7QUE4QmQ7Ozs7QUFJQUcsZ0JBbENjLDBCQWtDQztBQUNYLFlBQUcsQ0FBQyxLQUFLTCxLQUFMLENBQVdOLElBQWYsRUFBcUI7QUFDakIsbUJBQU8sRUFBUDtBQUNIO0FBQ0QsZUFBTyxLQUFLTSxLQUFMLENBQVdOLElBQVgsQ0FBZ0JZLEtBQWhCLENBQXNCLENBQXRCLEVBQXlCLEtBQUtILEtBQUwsQ0FBV0osV0FBcEMsQ0FBUDtBQUNILEtBdkNhOzs7QUF5Q2Q7Ozs7QUFJQVEsZ0JBN0NjLDBCQTZDQztBQUNYLGVBQU8sS0FBS0osS0FBTCxDQUFXUixTQUFYLElBQXdCLEtBQUtLLEtBQUwsQ0FBV0wsU0FBMUM7QUFDSDtBQS9DYSxDQUFsQjs7QUFrREFhLE9BQU9DLE9BQVAsR0FBaUJqQixXQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgbWVtb3J5TWl4aW4gPSB7XHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgcmVmZXJlbmNlOiB7fSxcclxuICAgICAgICAgICAgcGVyUGFnZTogNVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBhZ2U6IDEsXHJcbiAgICAgICAgICAgIG1heEVsZW1lbnRzOiB0aGlzLnByb3BzLnBlclBhZ2VcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSB0aGUgbnVtYmVyIG9mIGVsZW1lbnQgdG8gZGlzcGxheSBpbiB0aGUgbWVtb3J5IGxpc3QuXHJcbiAgICAgKiBAcGFyYW0gcGFnZSB0aGUgY3VycmVudCBwYWdlIHRvIGZldGNoXHJcbiAgICAgKi9cclxuICAgIGZldGNoTmV4dFBhZ2UoKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlID0gdGhpcy5zdGF0ZS5wYWdlICsgMTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgcGFnZTogY3VycmVudFBhZ2UsXHJcbiAgICAgICAgICAgIG1heEVsZW1lbnRzOiB0aGlzLnByb3BzLnBlclBhZ2UgKiBjdXJyZW50UGFnZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZSB0aGUgZGF0YSB0byBkaXNwbGF5LlxyXG4gICAgICogQHJldHVybiBkYXRhIGxpc3RcclxuICAgICAqL1xyXG4gICAgZ2V0RGF0YVRvVXNlKCkge1xyXG4gICAgICAgIGlmKCF0aGlzLnByb3BzLmRhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5kYXRhLnNsaWNlKDAsIHRoaXMuc3RhdGUubWF4RWxlbWVudHMpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgcmVmZXJlbmNlIGxpc3RzLlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBvYmplY3Qgd2ljaCBjb250YWlucyBhbGwgcmVmZXJlbmNlIGxpc3RzLlxyXG4gICAgICovXHJcbiAgICBnZXRSZWZlcmVuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUucmVmZXJlbmNlIHx8IHRoaXMucHJvcHMucmVmZXJlbmNlO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtZW1vcnlNaXhpbjtcclxuIl19