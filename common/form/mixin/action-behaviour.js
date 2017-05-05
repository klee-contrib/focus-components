'use strict';

var _focusException = require('focus-core/exception/focus-exception');

var _focusException2 = _interopRequireDefault(_focusException);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assign = require('object-assign');
var isFunction = require('lodash/lang/isFunction');
var omit = require('lodash/object/omit');

var actionMixin = {

    /**
       * Get the entity identifier for the form loading.
       * @returns {object} - The identifier of the entity.
       */
    _getId: function _getId() {
        if (this.getId) {
            return this.getId();
        }
        return this.state.id;
    },

    /**
     * Get a clean state to send data to the server.
     * @returns {object} - The state json cleanded
     */
    _getCleanState: function _getCleanState() {
        return omit(this.state, ['reference', 'isLoading', 'isEdit']);
    },

    /**
     * Compute the entity read from the html givent the keys and the definition Path, this operation is reversed from the _computeEntityFromStore operation.
     * @param {object} htmlData - Data read from the html form.
     * @returns {object} - The computed entity from html.
     */
    _computeEntityFromHtml: function _computeEntityFromHtml(htmlData) {
        var DEF = this.definitionPath + '.';
        var EMPTY = '';
        var computedEntity = {};
        for (var prop in htmlData) {
            computedEntity[prop.replace(DEF, EMPTY)] = htmlData[prop];
        }
        return computedEntity;
    },

    /**
     * Get entity from the state, and the HTML.
     * @return {object} - Combinaison of state and HTML builded entity.
     */
    _getEntityFromHTMLAndState: function _getEntityFromHTMLAndState() {
        //Build the entity value from the ref getVaue.
        var htmlData = {};
        var refs = this.refs;

        for (var r in refs) {
            //If the reference has a getValue function if is read.
            if (refs[r] && isFunction(refs[r].getValue)) {
                htmlData[r] = refs[r].getValue();
            }
        }
        //Maybe a merge cold be done if we need a deeper property merge.
        return assign({}, this._getCleanState(), this._computeEntityFromHtml(htmlData));
    },

    /**
     * Get the constructed entity from the state.
     * If you need to perform a custom getEntity just write a getEntity function in your mixin.
     * @returns {object} - the entity informations.
     */
    _getEntity: function _getEntity() {
        if (this.getEntity) {
            return this.getEntity();
        }
        return this._getEntityFromHTMLAndState();
    },

    /**
     * This is the load action of the form.
     */
    _loadData: function _loadData() {
        if (!this.action || !isFunction(this.action.load)) {
            throw new _focusException2.default('It seems your form component does not have a load action, and your props is set to hasLoad={true}.', this);
        }
        this.action.load.call(this, this._getId());
    },
    clearError: function clearError() {
        for (var r in this.refs) {
            //If the reference has a getValue function if is read.
            if (this.refs[r] && isFunction(this.refs[r].setError)) {
                this.refs[r].setError(undefined);
            }
        }
    }
};

module.exports = actionMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJhc3NpZ24iLCJyZXF1aXJlIiwiaXNGdW5jdGlvbiIsIm9taXQiLCJhY3Rpb25NaXhpbiIsIl9nZXRJZCIsImdldElkIiwic3RhdGUiLCJpZCIsIl9nZXRDbGVhblN0YXRlIiwiX2NvbXB1dGVFbnRpdHlGcm9tSHRtbCIsImh0bWxEYXRhIiwiREVGIiwiZGVmaW5pdGlvblBhdGgiLCJFTVBUWSIsImNvbXB1dGVkRW50aXR5IiwicHJvcCIsInJlcGxhY2UiLCJfZ2V0RW50aXR5RnJvbUhUTUxBbmRTdGF0ZSIsInJlZnMiLCJyIiwiZ2V0VmFsdWUiLCJfZ2V0RW50aXR5IiwiZ2V0RW50aXR5IiwiX2xvYWREYXRhIiwiYWN0aW9uIiwibG9hZCIsImNhbGwiLCJjbGVhckVycm9yIiwic2V0RXJyb3IiLCJ1bmRlZmluZWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUdBOzs7Ozs7QUFIQSxJQUFJQSxTQUFTQyxRQUFRLGVBQVIsQ0FBYjtBQUNBLElBQUlDLGFBQWFELFFBQVEsd0JBQVIsQ0FBakI7QUFDQSxJQUFJRSxPQUFPRixRQUFRLG9CQUFSLENBQVg7O0FBRUEsSUFBSUcsY0FBYzs7QUFFbEI7Ozs7QUFJSUMsVUFOYyxvQkFNTDtBQUNMLFlBQUcsS0FBS0MsS0FBUixFQUFlO0FBQ1gsbUJBQU8sS0FBS0EsS0FBTCxFQUFQO0FBQ0g7QUFDRCxlQUFPLEtBQUtDLEtBQUwsQ0FBV0MsRUFBbEI7QUFDSCxLQVhhOztBQVloQjs7OztBQUlFQyxrQkFoQmMsNEJBZ0JHO0FBQ2IsZUFBT04sS0FBSyxLQUFLSSxLQUFWLEVBQWlCLENBQUMsV0FBRCxFQUFjLFdBQWQsRUFBMkIsUUFBM0IsQ0FBakIsQ0FBUDtBQUNILEtBbEJhOztBQW1CaEI7Ozs7O0FBS0VHLDBCQXhCYyxrQ0F3QlNDLFFBeEJULEVBd0JtQjtBQUM3QixZQUFNQyxNQUFTLEtBQUtDLGNBQWQsTUFBTjtBQUNBLFlBQU1DLFFBQVEsRUFBZDtBQUNBLFlBQUlDLGlCQUFpQixFQUFyQjtBQUNBLGFBQUksSUFBSUMsSUFBUixJQUFnQkwsUUFBaEIsRUFBMEI7QUFDdEJJLDJCQUFlQyxLQUFLQyxPQUFMLENBQWFMLEdBQWIsRUFBa0JFLEtBQWxCLENBQWYsSUFBMkNILFNBQVNLLElBQVQsQ0FBM0M7QUFDSDtBQUNELGVBQU9ELGNBQVA7QUFDSCxLQWhDYTs7QUFpQ2Q7Ozs7QUFJQUcsOEJBckNjLHdDQXFDZTtBQUN6QjtBQUNBLFlBQUlQLFdBQVcsRUFBZjtBQUZ5QixZQUdwQlEsSUFIb0IsR0FHWixJQUhZLENBR3BCQSxJQUhvQjs7QUFJekIsYUFBSSxJQUFJQyxDQUFSLElBQWFELElBQWIsRUFBbUI7QUFDZDtBQUNELGdCQUFHQSxLQUFLQyxDQUFMLEtBQVdsQixXQUFXaUIsS0FBS0MsQ0FBTCxFQUFRQyxRQUFuQixDQUFkLEVBQTRDO0FBQ3hDVix5QkFBU1MsQ0FBVCxJQUFjRCxLQUFLQyxDQUFMLEVBQVFDLFFBQVIsRUFBZDtBQUNIO0FBQ0o7QUFDRDtBQUNBLGVBQU9yQixPQUFPLEVBQVAsRUFBVyxLQUFLUyxjQUFMLEVBQVgsRUFBa0MsS0FBS0Msc0JBQUwsQ0FBNEJDLFFBQTVCLENBQWxDLENBQVA7QUFDSCxLQWpEYTs7QUFrRGhCOzs7OztBQUtFVyxjQXZEYyx3QkF1REQ7QUFDVCxZQUFHLEtBQUtDLFNBQVIsRUFBbUI7QUFDZixtQkFBTyxLQUFLQSxTQUFMLEVBQVA7QUFDSDtBQUNELGVBQU8sS0FBS0wsMEJBQUwsRUFBUDtBQUNILEtBNURhOztBQTZEZDs7O0FBR0FNLGFBaEVjLHVCQWdFRjtBQUNSLFlBQUcsQ0FBQyxLQUFLQyxNQUFOLElBQWdCLENBQUN2QixXQUFXLEtBQUt1QixNQUFMLENBQVlDLElBQXZCLENBQXBCLEVBQWtEO0FBQzlDLGtCQUFNLDZCQUFtQixvR0FBbkIsRUFBeUgsSUFBekgsQ0FBTjtBQUNIO0FBQ0QsYUFBS0QsTUFBTCxDQUFZQyxJQUFaLENBQWlCQyxJQUFqQixDQUFzQixJQUF0QixFQUE0QixLQUFLdEIsTUFBTCxFQUE1QjtBQUNILEtBckVhO0FBc0VkdUIsY0F0RWMsd0JBc0VEO0FBQ1QsYUFBSSxJQUFJUixDQUFSLElBQWEsS0FBS0QsSUFBbEIsRUFBd0I7QUFDcEI7QUFDQSxnQkFBRyxLQUFLQSxJQUFMLENBQVVDLENBQVYsS0FBZ0JsQixXQUFXLEtBQUtpQixJQUFMLENBQVVDLENBQVYsRUFBYVMsUUFBeEIsQ0FBbkIsRUFBc0Q7QUFDbEQscUJBQUtWLElBQUwsQ0FBVUMsQ0FBVixFQUFhUyxRQUFiLENBQXNCQyxTQUF0QjtBQUNIO0FBQ0o7QUFDSjtBQTdFYSxDQUFsQjs7QUFpRkFDLE9BQU9DLE9BQVAsR0FBaUI1QixXQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xyXG5sZXQgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24nKTtcclxubGV0IG9taXQgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L29taXQnKTtcclxuaW1wb3J0IEZvY3VzRXhjZXB0aW9uIGZyb20gJ2ZvY3VzLWNvcmUvZXhjZXB0aW9uL2ZvY3VzLWV4Y2VwdGlvbic7XHJcbmxldCBhY3Rpb25NaXhpbiA9IHtcclxuXHJcbi8qKlxyXG4gICAqIEdldCB0aGUgZW50aXR5IGlkZW50aWZpZXIgZm9yIHRoZSBmb3JtIGxvYWRpbmcuXHJcbiAgICogQHJldHVybnMge29iamVjdH0gLSBUaGUgaWRlbnRpZmllciBvZiB0aGUgZW50aXR5LlxyXG4gICAqL1xyXG4gICAgX2dldElkKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0SWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaWQ7XHJcbiAgICB9LFxyXG4gIC8qKlxyXG4gICAqIEdldCBhIGNsZWFuIHN0YXRlIHRvIHNlbmQgZGF0YSB0byB0aGUgc2VydmVyLlxyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gVGhlIHN0YXRlIGpzb24gY2xlYW5kZWRcclxuICAgKi9cclxuICAgIF9nZXRDbGVhblN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiBvbWl0KHRoaXMuc3RhdGUsIFsncmVmZXJlbmNlJywgJ2lzTG9hZGluZycsICdpc0VkaXQnXSk7XHJcbiAgICB9LFxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGVudGl0eSByZWFkIGZyb20gdGhlIGh0bWwgZ2l2ZW50IHRoZSBrZXlzIGFuZCB0aGUgZGVmaW5pdGlvbiBQYXRoLCB0aGlzIG9wZXJhdGlvbiBpcyByZXZlcnNlZCBmcm9tIHRoZSBfY29tcHV0ZUVudGl0eUZyb21TdG9yZSBvcGVyYXRpb24uXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGh0bWxEYXRhIC0gRGF0YSByZWFkIGZyb20gdGhlIGh0bWwgZm9ybS5cclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIFRoZSBjb21wdXRlZCBlbnRpdHkgZnJvbSBodG1sLlxyXG4gICAqL1xyXG4gICAgX2NvbXB1dGVFbnRpdHlGcm9tSHRtbChodG1sRGF0YSkge1xyXG4gICAgICAgIGNvbnN0IERFRiA9IGAke3RoaXMuZGVmaW5pdGlvblBhdGh9LmA7XHJcbiAgICAgICAgY29uc3QgRU1QVFkgPSAnJztcclxuICAgICAgICBsZXQgY29tcHV0ZWRFbnRpdHkgPSB7fTtcclxuICAgICAgICBmb3IobGV0IHByb3AgaW4gaHRtbERhdGEpIHtcclxuICAgICAgICAgICAgY29tcHV0ZWRFbnRpdHlbcHJvcC5yZXBsYWNlKERFRiwgRU1QVFkpXSA9IGh0bWxEYXRhW3Byb3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29tcHV0ZWRFbnRpdHk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgZW50aXR5IGZyb20gdGhlIHN0YXRlLCBhbmQgdGhlIEhUTUwuXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gQ29tYmluYWlzb24gb2Ygc3RhdGUgYW5kIEhUTUwgYnVpbGRlZCBlbnRpdHkuXHJcbiAgICAgKi9cclxuICAgIF9nZXRFbnRpdHlGcm9tSFRNTEFuZFN0YXRlKCkge1xyXG4gICAgICAgIC8vQnVpbGQgdGhlIGVudGl0eSB2YWx1ZSBmcm9tIHRoZSByZWYgZ2V0VmF1ZS5cclxuICAgICAgICBsZXQgaHRtbERhdGEgPSB7fTtcclxuICAgICAgICBsZXQge3JlZnN9ID0gdGhpcztcclxuICAgICAgICBmb3IobGV0IHIgaW4gcmVmcykge1xyXG4gICAgICAgICAgICAgLy9JZiB0aGUgcmVmZXJlbmNlIGhhcyBhIGdldFZhbHVlIGZ1bmN0aW9uIGlmIGlzIHJlYWQuXHJcbiAgICAgICAgICAgIGlmKHJlZnNbcl0gJiYgaXNGdW5jdGlvbihyZWZzW3JdLmdldFZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgaHRtbERhdGFbcl0gPSByZWZzW3JdLmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9NYXliZSBhIG1lcmdlIGNvbGQgYmUgZG9uZSBpZiB3ZSBuZWVkIGEgZGVlcGVyIHByb3BlcnR5IG1lcmdlLlxyXG4gICAgICAgIHJldHVybiBhc3NpZ24oe30sIHRoaXMuX2dldENsZWFuU3RhdGUoKSwgdGhpcy5fY29tcHV0ZUVudGl0eUZyb21IdG1sKGh0bWxEYXRhKSk7XHJcbiAgICB9LFxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY29uc3RydWN0ZWQgZW50aXR5IGZyb20gdGhlIHN0YXRlLlxyXG4gICAqIElmIHlvdSBuZWVkIHRvIHBlcmZvcm0gYSBjdXN0b20gZ2V0RW50aXR5IGp1c3Qgd3JpdGUgYSBnZXRFbnRpdHkgZnVuY3Rpb24gaW4geW91ciBtaXhpbi5cclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIHRoZSBlbnRpdHkgaW5mb3JtYXRpb25zLlxyXG4gICAqL1xyXG4gICAgX2dldEVudGl0eSgpIHtcclxuICAgICAgICBpZih0aGlzLmdldEVudGl0eSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRFbnRpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEVudGl0eUZyb21IVE1MQW5kU3RhdGUoKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgaXMgdGhlIGxvYWQgYWN0aW9uIG9mIHRoZSBmb3JtLlxyXG4gICAgICovXHJcbiAgICBfbG9hZERhdGEoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuYWN0aW9uIHx8ICFpc0Z1bmN0aW9uKHRoaXMuYWN0aW9uLmxvYWQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBGb2N1c0V4Y2VwdGlvbignSXQgc2VlbXMgeW91ciBmb3JtIGNvbXBvbmVudCBkb2VzIG5vdCBoYXZlIGEgbG9hZCBhY3Rpb24sIGFuZCB5b3VyIHByb3BzIGlzIHNldCB0byBoYXNMb2FkPXt0cnVlfS4nLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hY3Rpb24ubG9hZC5jYWxsKHRoaXMsIHRoaXMuX2dldElkKCkpO1xyXG4gICAgfSxcclxuICAgIGNsZWFyRXJyb3IoKSB7XHJcbiAgICAgICAgZm9yKGxldCByIGluIHRoaXMucmVmcykge1xyXG4gICAgICAgICAgICAvL0lmIHRoZSByZWZlcmVuY2UgaGFzIGEgZ2V0VmFsdWUgZnVuY3Rpb24gaWYgaXMgcmVhZC5cclxuICAgICAgICAgICAgaWYodGhpcy5yZWZzW3JdICYmIGlzRnVuY3Rpb24odGhpcy5yZWZzW3JdLnNldEVycm9yKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzW3JdLnNldEVycm9yKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhY3Rpb25NaXhpbjtcclxuIl19