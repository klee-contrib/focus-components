'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var capitalize = require('lodash/string/capitalize');
var assign = require('object-assign');

var _require = require('lodash/lang'),
    isObject = _require.isObject,
    isArray = _require.isArray;

var keys = require('lodash/object/keys');
var storeChangeBehaviour = require('./store-change-behaviour');

var storeMixin = {
    mixins: [storeChangeBehaviour],
    /**
     * Get the state informations from the store.
     * @returns {object} - The js object constructed from store data.
     */
    _getStateFromStores: function formGetStateFromStore() {
        if (this.getStateFromStore) {
            return this.getStateFromStore();
        }
        var newState = {};
        this.stores.map(function (storeConf) {
            storeConf.properties.map(function (property) {
                newState[property] = storeConf.store['get' + capitalize(property)]();
            });
        });
        var computedState = assign(this._computeEntityFromStoresData(newState), this._getLoadingStateFromStores());
        return computedState;
    },
    /**
     * Get the error state informations from the store.
     * @returns {object} - The js error object constructed from the store data.
     */
    _getErrorStateFromStores: function formGetErrorStateFromStore() {
        if (this.getErrorStateFromStore) {
            return this.getErrorStateFromStore();
        }
        var newState = {};
        this.stores.map(function (storeConf) {
            storeConf.properties.map(function (property) {
                var errorState = storeConf.store['getError' + capitalize(property)]();
                for (var prop in errorState) {
                    newState[property + '.' + prop] = errorState[prop];
                }
            });
        });
        return newState;
    },
    /**
     * Get the isLoading state from  all the store.
     */
    _getLoadingStateFromStores: function getLoadingStateFromStores() {
        if (this.getLoadingStateFromStores) {
            return this.getLoadingStateFromStores();
        }
        var isLoading = false;
        this.stores.forEach(function (storeConf) {
            if (!isLoading) {
                storeConf.properties.forEach(function (property) {
                    if (!isLoading) {
                        var propStatus = storeConf.store.getStatus(property) || {};
                        isLoading = propStatus.isLoading;
                    }
                });
            }
        });
        //console.info('Processing state', this.stores, 'loading', isLoading);
        return { isLoading: isLoading };
    },
    /**
     * Compute the data given from the stores.
     * @param {object} data -  The data ordered by store.
     * @returns {object} - The js object transformed from store data.
     */
    _computeEntityFromStoresData: function _computeEntityFromStoresData(data) {
        if (this.computeEntityFromStoresData) {
            return this.computeEntityFromStoresData(data);
        }
        var entity = { reference: {} };
        for (var key in data) {
            if (this.referenceNames && this.referenceNames.indexOf(key) !== -1) {
                entity.reference[key] = data[key];
            } else {
                var d = data[key];
                if (isArray(d) || !isObject(d)) {
                    d = _defineProperty({}, key, d);
                }
                assign(entity, d);
            }
        }
        return entity;
    },
    /**
     * Register all the listeners related to the page.
     */
    _registerListeners: function registerStoreListeners() {
        var _this = this;

        if (this.stores) {
            this.stores.map(function (storeConf) {
                storeConf.properties.map(function (property) {
                    if (!storeConf.store || !storeConf.store.definition || !storeConf.store.definition[property]) {
                        console.warn('You add a property : ' + property + ' in your store which is not in your definition : ' + keys(storeConf.store.definition));
                    }
                    storeConf.store['add' + capitalize(property) + 'ChangeListener'](_this._onChange);
                    storeConf.store['add' + capitalize(property) + 'ErrorListener'](_this._onError);
                    storeConf.store['add' + capitalize(property) + 'StatusListener'](_this._onStatus);
                });
            });
        }
    },
    /**
    * Unregister all the listeners related to the page.
    */
    _unRegisterListeners: function unregisterListener() {
        var _this2 = this;

        if (this.stores) {
            this.stores.map(function (storeConf) {
                storeConf.properties.map(function (property) {
                    storeConf.store['remove' + capitalize(property) + 'ChangeListener'](_this2._onChange);
                    storeConf.store['remove' + capitalize(property) + 'ErrorListener'](_this2._onError);
                    storeConf.store['remove' + capitalize(property) + 'StatusListener'](_this2._onStatus);
                });
            });
        }
    },
    /** @inheritdoc */
    componentWillMount: function storeBehaviourWillMount() {
        //These listeners are registered before the mounting because they are not correlated to the DOM.
        //Build the definitions.
        this._registerListeners();
    },
    /** @inheritdoc */
    componentWillUnmount: function storeBehaviourWillUnmount() {
        this._unRegisterListeners();
    }
};

module.exports = storeMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJjYXBpdGFsaXplIiwicmVxdWlyZSIsImFzc2lnbiIsImlzT2JqZWN0IiwiaXNBcnJheSIsImtleXMiLCJzdG9yZUNoYW5nZUJlaGF2aW91ciIsInN0b3JlTWl4aW4iLCJtaXhpbnMiLCJfZ2V0U3RhdGVGcm9tU3RvcmVzIiwiZm9ybUdldFN0YXRlRnJvbVN0b3JlIiwiZ2V0U3RhdGVGcm9tU3RvcmUiLCJuZXdTdGF0ZSIsInN0b3JlcyIsIm1hcCIsInN0b3JlQ29uZiIsInByb3BlcnRpZXMiLCJwcm9wZXJ0eSIsInN0b3JlIiwiY29tcHV0ZWRTdGF0ZSIsIl9jb21wdXRlRW50aXR5RnJvbVN0b3Jlc0RhdGEiLCJfZ2V0TG9hZGluZ1N0YXRlRnJvbVN0b3JlcyIsIl9nZXRFcnJvclN0YXRlRnJvbVN0b3JlcyIsImZvcm1HZXRFcnJvclN0YXRlRnJvbVN0b3JlIiwiZ2V0RXJyb3JTdGF0ZUZyb21TdG9yZSIsImVycm9yU3RhdGUiLCJwcm9wIiwiZ2V0TG9hZGluZ1N0YXRlRnJvbVN0b3JlcyIsImlzTG9hZGluZyIsImZvckVhY2giLCJwcm9wU3RhdHVzIiwiZ2V0U3RhdHVzIiwiZGF0YSIsImNvbXB1dGVFbnRpdHlGcm9tU3RvcmVzRGF0YSIsImVudGl0eSIsInJlZmVyZW5jZSIsImtleSIsInJlZmVyZW5jZU5hbWVzIiwiaW5kZXhPZiIsImQiLCJfcmVnaXN0ZXJMaXN0ZW5lcnMiLCJyZWdpc3RlclN0b3JlTGlzdGVuZXJzIiwiZGVmaW5pdGlvbiIsImNvbnNvbGUiLCJ3YXJuIiwiX29uQ2hhbmdlIiwiX29uRXJyb3IiLCJfb25TdGF0dXMiLCJfdW5SZWdpc3Rlckxpc3RlbmVycyIsInVucmVnaXN0ZXJMaXN0ZW5lciIsImNvbXBvbmVudFdpbGxNb3VudCIsInN0b3JlQmVoYXZpb3VyV2lsbE1vdW50IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJzdG9yZUJlaGF2aW91cldpbGxVbm1v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QTRELE1BQUs4QixTQUFqRTtBQUNILGlCQVBDO0FBUUgsYUFURDtBQVVIO0FBQ0osS0FsR2M7QUFtR2pCOzs7QUFHRUMsMEJBQXNCLFNBQVNDLGtCQUFULEdBQThCO0FBQUE7O0FBQ2hELFlBQUksS0FBS3BDLE1BQVQsRUFBaUI7QUFDYixpQkFBS0EsTUFBTCxDQUFZQyxHQUFaLENBQWdCLFVBQUNDLFNBQUQsRUFBZTtBQUMzQkEsMEJBQVVDLFVBQVYsQ0FBcUJGLEdBQXJCLENBQXlCLFVBQUNHLFFBQUQsRUFBYztBQUNyQ0YsOEJBQVVHLEtBQVYsWUFBeUJsQixXQUFXaUIsUUFBWCxDQUF6QixxQkFBK0QsT0FBSzRCLFNBQXBFO0FBQ0E5Qiw4QkFBVUcsS0FBVixZQUF5QmxCLFdBQVdpQixRQUFYLENBQXpCLG9CQUE4RCxPQUFLNkIsUUFBbkU7QUFDQS9CLDhCQUFVRyxLQUFWLFlBQXlCbEIsV0FBV2lCLFFBQVgsQ0FBekIscUJBQStELE9BQUs4QixTQUFwRTtBQUNILGlCQUpDO0FBS0gsYUFORDtBQU9IO0FBQ0osS0FoSGM7QUFpSGpCO0FBQ0VHLHdCQUFvQixTQUFTQyx1QkFBVCxHQUFtQztBQUN2RDtBQUNBO0FBQ0ksYUFBS1gsa0JBQUw7QUFDSCxLQXRIYztBQXVIakI7QUFDRVksMEJBQXNCLFNBQVNDLHlCQUFULEdBQXFDO0FBQ3ZELGFBQUtMLG9CQUFMO0FBQ0g7QUExSGMsQ0FBbkI7O0FBNkhBTSxPQUFPQyxPQUFQLEdBQWlCaEQsVUFBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY2FwaXRhbGl6ZSA9IHJlcXVpcmUoJ2xvZGFzaC9zdHJpbmcvY2FwaXRhbGl6ZScpO1xyXG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XHJcbmNvbnN0IHtpc09iamVjdCwgaXNBcnJheX0gPSByZXF1aXJlKCdsb2Rhc2gvbGFuZycpO1xyXG5jb25zdCBrZXlzID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC9rZXlzJyk7XHJcbmNvbnN0IHN0b3JlQ2hhbmdlQmVoYXZpb3VyID0gcmVxdWlyZSgnLi9zdG9yZS1jaGFuZ2UtYmVoYXZpb3VyJyk7XHJcblxyXG5jb25zdCBzdG9yZU1peGluID0ge1xyXG4gICAgbWl4aW5zOiBbc3RvcmVDaGFuZ2VCZWhhdmlvdXJdLFxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgc3RhdGUgaW5mb3JtYXRpb25zIGZyb20gdGhlIHN0b3JlLlxyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gVGhlIGpzIG9iamVjdCBjb25zdHJ1Y3RlZCBmcm9tIHN0b3JlIGRhdGEuXHJcbiAgICovXHJcbiAgICBfZ2V0U3RhdGVGcm9tU3RvcmVzOiBmdW5jdGlvbiBmb3JtR2V0U3RhdGVGcm9tU3RvcmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0U3RhdGVGcm9tU3RvcmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdGVGcm9tU3RvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5ld1N0YXRlID0ge307XHJcbiAgICAgICAgdGhpcy5zdG9yZXMubWFwKChzdG9yZUNvbmYpID0+IHtcclxuICAgICAgICAgICAgc3RvcmVDb25mLnByb3BlcnRpZXMubWFwKChwcm9wZXJ0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV3U3RhdGVbcHJvcGVydHldID0gc3RvcmVDb25mLnN0b3JlW2BnZXQke2NhcGl0YWxpemUocHJvcGVydHkpfWBdKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGNvbXB1dGVkU3RhdGUgPSBhc3NpZ24odGhpcy5fY29tcHV0ZUVudGl0eUZyb21TdG9yZXNEYXRhKG5ld1N0YXRlKSwgdGhpcy5fZ2V0TG9hZGluZ1N0YXRlRnJvbVN0b3JlcygpKTtcclxuICAgICAgICByZXR1cm4gY29tcHV0ZWRTdGF0ZTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgZXJyb3Igc3RhdGUgaW5mb3JtYXRpb25zIGZyb20gdGhlIHN0b3JlLlxyXG4gICAgICogQHJldHVybnMge29iamVjdH0gLSBUaGUganMgZXJyb3Igb2JqZWN0IGNvbnN0cnVjdGVkIGZyb20gdGhlIHN0b3JlIGRhdGEuXHJcbiAgICAgKi9cclxuICAgIF9nZXRFcnJvclN0YXRlRnJvbVN0b3JlczogZnVuY3Rpb24gZm9ybUdldEVycm9yU3RhdGVGcm9tU3RvcmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0RXJyb3JTdGF0ZUZyb21TdG9yZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRFcnJvclN0YXRlRnJvbVN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xyXG4gICAgICAgIHRoaXMuc3RvcmVzLm1hcCggc3RvcmVDb25mID0+IHtcclxuICAgICAgICAgICAgc3RvcmVDb25mLnByb3BlcnRpZXMubWFwKCBwcm9wZXJ0eSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JTdGF0ZSA9IHN0b3JlQ29uZi5zdG9yZVtgZ2V0RXJyb3Ike2NhcGl0YWxpemUocHJvcGVydHkpfWBdKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIHByb3AgaW4gZXJyb3JTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICBuZXdTdGF0ZVtgJHtwcm9wZXJ0eX0uJHtwcm9wfWBdID0gZXJyb3JTdGF0ZVtwcm9wXTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcclxuICAgIH0sXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBpc0xvYWRpbmcgc3RhdGUgZnJvbSAgYWxsIHRoZSBzdG9yZS5cclxuICAgKi9cclxuICAgIF9nZXRMb2FkaW5nU3RhdGVGcm9tU3RvcmVzOiBmdW5jdGlvbiBnZXRMb2FkaW5nU3RhdGVGcm9tU3RvcmVzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdldExvYWRpbmdTdGF0ZUZyb21TdG9yZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9hZGluZ1N0YXRlRnJvbVN0b3JlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdG9yZXMuZm9yRWFjaCgoc3RvcmVDb25mKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKCFpc0xvYWRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHN0b3JlQ29uZi5wcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlmKCFpc0xvYWRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcFN0YXR1cyA9IHN0b3JlQ29uZi5zdG9yZS5nZXRTdGF0dXMocHJvcGVydHkpIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZyA9IHByb3BTdGF0dXMuaXNMb2FkaW5nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAvL2NvbnNvbGUuaW5mbygnUHJvY2Vzc2luZyBzdGF0ZScsIHRoaXMuc3RvcmVzLCAnbG9hZGluZycsIGlzTG9hZGluZyk7XHJcbiAgICAgICAgcmV0dXJuIHtpc0xvYWRpbmc6IGlzTG9hZGluZ307XHJcbiAgICB9LFxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGRhdGEgZ2l2ZW4gZnJvbSB0aGUgc3RvcmVzLlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gIFRoZSBkYXRhIG9yZGVyZWQgYnkgc3RvcmUuXHJcbiAgICogQHJldHVybnMge29iamVjdH0gLSBUaGUganMgb2JqZWN0IHRyYW5zZm9ybWVkIGZyb20gc3RvcmUgZGF0YS5cclxuICAgKi9cclxuICAgIF9jb21wdXRlRW50aXR5RnJvbVN0b3Jlc0RhdGE6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZih0aGlzLmNvbXB1dGVFbnRpdHlGcm9tU3RvcmVzRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wdXRlRW50aXR5RnJvbVN0b3Jlc0RhdGEoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBlbnRpdHkgPSB7cmVmZXJlbmNlOiB7fX07XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnJlZmVyZW5jZU5hbWVzICYmIHRoaXMucmVmZXJlbmNlTmFtZXMuaW5kZXhPZihrZXkpICE9PSAtMSApIHtcclxuICAgICAgICAgICAgICAgIGVudGl0eS5yZWZlcmVuY2Vba2V5XSA9IGRhdGFba2V5XTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGQgPSBkYXRhW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZihpc0FycmF5KGQpIHx8ICFpc09iamVjdChkKSkge1xyXG4gICAgICAgICAgICAgICAgICBkID0ge1trZXldIDogZH07XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXNzaWduKGVudGl0eSwgZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVudGl0eTtcclxuICAgIH0sXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXIgYWxsIHRoZSBsaXN0ZW5lcnMgcmVsYXRlZCB0byB0aGUgcGFnZS5cclxuICAgKi9cclxuICAgIF9yZWdpc3Rlckxpc3RlbmVyczogZnVuY3Rpb24gcmVnaXN0ZXJTdG9yZUxpc3RlbmVycygpIHtcclxuICAgICAgICBpZiAodGhpcy5zdG9yZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yZXMubWFwKChzdG9yZUNvbmYpID0+IHtcclxuICAgICAgICAgICAgICAgIHN0b3JlQ29uZi5wcm9wZXJ0aWVzLm1hcCgocHJvcGVydHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgaWYoIXN0b3JlQ29uZi5zdG9yZSB8fCAhc3RvcmVDb25mLnN0b3JlLmRlZmluaXRpb24gfHwgIXN0b3JlQ29uZi5zdG9yZS5kZWZpbml0aW9uW3Byb3BlcnR5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgWW91IGFkZCBhIHByb3BlcnR5IDogJHtwcm9wZXJ0eX0gaW4geW91ciBzdG9yZSB3aGljaCBpcyBub3QgaW4geW91ciBkZWZpbml0aW9uIDogJHtrZXlzKHN0b3JlQ29uZi5zdG9yZS5kZWZpbml0aW9uKX1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgc3RvcmVDb25mLnN0b3JlW2BhZGQke2NhcGl0YWxpemUocHJvcGVydHkpfUNoYW5nZUxpc3RlbmVyYF0odGhpcy5fb25DaGFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgICBzdG9yZUNvbmYuc3RvcmVbYGFkZCR7Y2FwaXRhbGl6ZShwcm9wZXJ0eSl9RXJyb3JMaXN0ZW5lcmBdKHRoaXMuX29uRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICBzdG9yZUNvbmYuc3RvcmVbYGFkZCR7Y2FwaXRhbGl6ZShwcm9wZXJ0eSl9U3RhdHVzTGlzdGVuZXJgXSh0aGlzLl9vblN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgLyoqXHJcbiAgKiBVbnJlZ2lzdGVyIGFsbCB0aGUgbGlzdGVuZXJzIHJlbGF0ZWQgdG8gdGhlIHBhZ2UuXHJcbiAgKi9cclxuICAgIF91blJlZ2lzdGVyTGlzdGVuZXJzOiBmdW5jdGlvbiB1bnJlZ2lzdGVyTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RvcmVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmVzLm1hcCgoc3RvcmVDb25mKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdG9yZUNvbmYucHJvcGVydGllcy5tYXAoKHByb3BlcnR5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHN0b3JlQ29uZi5zdG9yZVtgcmVtb3ZlJHtjYXBpdGFsaXplKHByb3BlcnR5KX1DaGFuZ2VMaXN0ZW5lcmBdKHRoaXMuX29uQ2hhbmdlKTtcclxuICAgICAgICAgICAgICAgICAgc3RvcmVDb25mLnN0b3JlW2ByZW1vdmUke2NhcGl0YWxpemUocHJvcGVydHkpfUVycm9yTGlzdGVuZXJgXSh0aGlzLl9vbkVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgc3RvcmVDb25mLnN0b3JlW2ByZW1vdmUke2NhcGl0YWxpemUocHJvcGVydHkpfVN0YXR1c0xpc3RlbmVyYF0odGhpcy5fb25TdGF0dXMpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiBzdG9yZUJlaGF2aW91cldpbGxNb3VudCgpIHtcclxuICAgIC8vVGhlc2UgbGlzdGVuZXJzIGFyZSByZWdpc3RlcmVkIGJlZm9yZSB0aGUgbW91bnRpbmcgYmVjYXVzZSB0aGV5IGFyZSBub3QgY29ycmVsYXRlZCB0byB0aGUgRE9NLlxyXG4gICAgLy9CdWlsZCB0aGUgZGVmaW5pdGlvbnMuXHJcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJMaXN0ZW5lcnMoKTtcclxuICAgIH0sXHJcbiAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gc3RvcmVCZWhhdmlvdXJXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB0aGlzLl91blJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlTWl4aW47XHJcbiJdfQ==