'use strict';

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _lodash = require('lodash');

var _storeChangeBehaviour = require('./store-change-behaviour');

var _storeChangeBehaviour2 = _interopRequireDefault(_storeChangeBehaviour);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var storeMixin = {
    mixins: [_storeChangeBehaviour2.default],
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
                newState[property] = storeConf.store['get' + (0, _lodash.capitalize)(property)]();
            });
        });
        var defaultData = {};
        if (this.props.useDefaultStoreData && (this.definition || this.getDefaultStoreData)) {
            if (this.getDefaultStoreData) {
                defaultData = this.getDefaultActionData(this.definition);
            } else {
                defaultData = (0, _lodash.keys)(this.definition).reduce(function (acc, key) {
                    acc[key] = null;
                    return acc;
                }, {});
            }
        }
        var computedState = (0, _objectAssign2.default)(this._computeEntityFromStoresData(newState), this._getLoadingStateFromStores());
        return (0, _lodash.defaultsDeep)({}, computedState, defaultData);
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
                var errorState = storeConf.store['getError' + (0, _lodash.capitalize)(property)]();
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
                        isLoading = propStatus.isLoading || false;
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
                if ((0, _lodash.isArray)(d) || !(0, _lodash.isObject)(d)) {
                    d = _defineProperty({}, key, d);
                }
                (0, _objectAssign2.default)(entity, d);
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
                        console.warn('You add a property : ' + property + ' in your store which is not in your definition : ' + (0, _lodash.keys)(storeConf.store.definition));
                    }
                    storeConf.store['add' + (0, _lodash.capitalize)(property) + 'ChangeListener'](_this._onChange);
                    storeConf.store['add' + (0, _lodash.capitalize)(property) + 'ErrorListener'](_this._onError);
                    storeConf.store['add' + (0, _lodash.capitalize)(property) + 'StatusListener'](_this._onStatus);
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
                    storeConf.store['remove' + (0, _lodash.capitalize)(property) + 'ChangeListener'](_this2._onChange);
                    storeConf.store['remove' + (0, _lodash.capitalize)(property) + 'ErrorListener'](_this2._onError);
                    storeConf.store['remove' + (0, _lodash.capitalize)(property) + 'StatusListener'](_this2._onStatus);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJzdG9yZU1peGluIiwibWl4aW5zIiwiX2dldFN0YXRlRnJvbVN0b3JlcyIsImZvcm1HZXRTdGF0ZUZyb21TdG9yZSIsImdldFN0YXRlRnJvbVN0b3JlIiwibmV3U3RhdGUiLCJzdG9yZXMiLCJtYXAiLCJzdG9yZUNvbmYiLCJwcm9wZXJ0aWVzIiwicHJvcGVydHkiLCJzdG9yZSIsImRlZmF1bHREYXRhIiwicHJvcHMiLCJ1c2VEZWZhdWx0U3RvcmVEYXRhIiwiZGVmaW5pdGlvbiIsImdldERlZmF1bHRTdG9yZURhdGEiLCJnZXREZWZhdWx0QWN0aW9uRGF0YSIsInJlZHVjZSIsImFjYyIsImtleSIsImNvbXB1dGVkU3RhdGUiLCJfY29tcHV0ZUVudGl0eUZyb21TdG9yZXNEYXRhIiwiX2dldExvYWRpbmdTdGF0ZUZyb21TdG9yZXMiLCJfZ2V0RXJyb3JTdGF0ZUZyb21TdG9yZXMiLCJmb3JtR2V0RXJyb3JTdGF0ZUZyb21TdG9yZSIsImdldEVycm9yU3RhdGVGcm9tU3RvcmUiLCJlcnJvclN0YXRlIiwicHJvcCIsImdldExvYWRpbmdTdGF0ZUZyb21TdG9yZXMiLCJpc0xvYWRpbmciLCJmb3JFYWNoIiwicHJvcFN0YXR1cyIsImdldFN0YXR1cyIsImRhdGEiLCJjb21wdXRlRW50aXR5RnJvbVN0b3Jlc0RhdGEiLCJlbnRpdHkiLCJyZWZlcmVuY2UiLCJyZWZlcmVuY2VOYW1lcyIsImluZGV4T2YiLCJkIiwiX3JlZ2lzdGVyTGlzdGVuZXJzIiwicmVnaXN0ZXJTdG9yZUxpc3RlbmVycyIsImNvbnNvbGUiLCJ3YXJuIiwiX29uQ2hhbmdlIiwiX29uRXJyb3IiLCJfb25TdGF0dXMiLCJfdW5SZWdpc3Rlckxpc3RlbmVycyIsInVucmVnaXN0ZXJMaXN0ZW5lciIsImNvbXBvbmVudFdpbGxNb3VudCIsInN0b3JlQmVoYXZpb3VyV2lsbE1vdW50IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJz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VUFBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJztcclxuaW1wb3J0IHtpc09iamVjdCwgaXNBcnJheSwga2V5cywgY2FwaXRhbGl6ZSwgZGVmYXVsdHNEZWVwfSBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgc3RvcmVDaGFuZ2VCZWhhdmlvdXIgZnJvbSAnLi9zdG9yZS1jaGFuZ2UtYmVoYXZpb3VyJztcclxuXHJcbmNvbnN0IHN0b3JlTWl4aW4gPSB7XHJcbiAgICBtaXhpbnM6IFtzdG9yZUNoYW5nZUJlaGF2aW91cl0sXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzdGF0ZSBpbmZvcm1hdGlvbnMgZnJvbSB0aGUgc3RvcmUuXHJcbiAgICogQHJldHVybnMge29iamVjdH0gLSBUaGUganMgb2JqZWN0IGNvbnN0cnVjdGVkIGZyb20gc3RvcmUgZGF0YS5cclxuICAgKi9cclxuICAgIF9nZXRTdGF0ZUZyb21TdG9yZXM6IGZ1bmN0aW9uIGZvcm1HZXRTdGF0ZUZyb21TdG9yZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5nZXRTdGF0ZUZyb21TdG9yZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGF0ZUZyb21TdG9yZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV3U3RhdGUgPSB7fTtcclxuICAgICAgICB0aGlzLnN0b3Jlcy5tYXAoKHN0b3JlQ29uZikgPT4ge1xyXG4gICAgICAgICAgICBzdG9yZUNvbmYucHJvcGVydGllcy5tYXAoKHByb3BlcnR5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZVtwcm9wZXJ0eV0gPSBzdG9yZUNvbmYuc3RvcmVbYGdldCR7Y2FwaXRhbGl6ZShwcm9wZXJ0eSl9YF0oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGRlZmF1bHREYXRhID0ge307XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudXNlRGVmYXVsdFN0b3JlRGF0YSAmJiAodGhpcy5kZWZpbml0aW9uIHx8IHRoaXMuZ2V0RGVmYXVsdFN0b3JlRGF0YSkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0RGVmYXVsdFN0b3JlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdERhdGEgPSB0aGlzLmdldERlZmF1bHRBY3Rpb25EYXRhKHRoaXMuZGVmaW5pdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0RGF0YSA9IGtleXModGhpcy5kZWZpbml0aW9uKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjW2tleV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XHJcbiAgICAgICAgICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29tcHV0ZWRTdGF0ZSA9IGFzc2lnbih0aGlzLl9jb21wdXRlRW50aXR5RnJvbVN0b3Jlc0RhdGEobmV3U3RhdGUpLCB0aGlzLl9nZXRMb2FkaW5nU3RhdGVGcm9tU3RvcmVzKCkpO1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0c0RlZXAoe30sIGNvbXB1dGVkU3RhdGUsIGRlZmF1bHREYXRhKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgZXJyb3Igc3RhdGUgaW5mb3JtYXRpb25zIGZyb20gdGhlIHN0b3JlLlxyXG4gICAgICogQHJldHVybnMge29iamVjdH0gLSBUaGUganMgZXJyb3Igb2JqZWN0IGNvbnN0cnVjdGVkIGZyb20gdGhlIHN0b3JlIGRhdGEuXHJcbiAgICAgKi9cclxuICAgIF9nZXRFcnJvclN0YXRlRnJvbVN0b3JlczogZnVuY3Rpb24gZm9ybUdldEVycm9yU3RhdGVGcm9tU3RvcmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0RXJyb3JTdGF0ZUZyb21TdG9yZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRFcnJvclN0YXRlRnJvbVN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xyXG4gICAgICAgIHRoaXMuc3RvcmVzLm1hcCggc3RvcmVDb25mID0+IHtcclxuICAgICAgICAgICAgc3RvcmVDb25mLnByb3BlcnRpZXMubWFwKCBwcm9wZXJ0eSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JTdGF0ZSA9IHN0b3JlQ29uZi5zdG9yZVtgZ2V0RXJyb3Ike2NhcGl0YWxpemUocHJvcGVydHkpfWBdKCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGVycm9yU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZVtgJHtwcm9wZXJ0eX0uJHtwcm9wfWBdID0gZXJyb3JTdGF0ZVtwcm9wXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xyXG4gICAgfSxcclxuICAvKipcclxuICAgKiBHZXQgdGhlIGlzTG9hZGluZyBzdGF0ZSBmcm9tICBhbGwgdGhlIHN0b3JlLlxyXG4gICAqL1xyXG4gICAgX2dldExvYWRpbmdTdGF0ZUZyb21TdG9yZXM6IGZ1bmN0aW9uIGdldExvYWRpbmdTdGF0ZUZyb21TdG9yZXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0TG9hZGluZ1N0YXRlRnJvbVN0b3Jlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRMb2FkaW5nU3RhdGVGcm9tU3RvcmVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0b3Jlcy5mb3JFYWNoKChzdG9yZUNvbmYpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFpc0xvYWRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHN0b3JlQ29uZi5wcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0xvYWRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BTdGF0dXMgPSBzdG9yZUNvbmYuc3RvcmUuZ2V0U3RhdHVzKHByb3BlcnR5KSB8fCB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nID0gcHJvcFN0YXR1cy5pc0xvYWRpbmcgfHwgZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIC8vY29uc29sZS5pbmZvKCdQcm9jZXNzaW5nIHN0YXRlJywgdGhpcy5zdG9yZXMsICdsb2FkaW5nJywgaXNMb2FkaW5nKTtcclxuICAgICAgICByZXR1cm4ge2lzTG9hZGluZzogaXNMb2FkaW5nfTtcclxuICAgIH0sXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZSB0aGUgZGF0YSBnaXZlbiBmcm9tIHRoZSBzdG9yZXMuXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGRhdGEgLSAgVGhlIGRhdGEgb3JkZXJlZCBieSBzdG9yZS5cclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIFRoZSBqcyBvYmplY3QgdHJhbnNmb3JtZWQgZnJvbSBzdG9yZSBkYXRhLlxyXG4gICAqL1xyXG4gICAgX2NvbXB1dGVFbnRpdHlGcm9tU3RvcmVzRGF0YTogZnVuY3Rpb24gX2NvbXB1dGVFbnRpdHlGcm9tU3RvcmVzRGF0YShkYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tcHV0ZUVudGl0eUZyb21TdG9yZXNEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXB1dGVFbnRpdHlGcm9tU3RvcmVzRGF0YShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVudGl0eSA9IHtyZWZlcmVuY2U6IHt9fTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWZlcmVuY2VOYW1lcyAmJiB0aGlzLnJlZmVyZW5jZU5hbWVzLmluZGV4T2Yoa2V5KSAhPT0gLTEgKSB7XHJcbiAgICAgICAgICAgICAgICBlbnRpdHkucmVmZXJlbmNlW2tleV0gPSBkYXRhW2tleV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZCA9IGRhdGFba2V5XTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KGQpIHx8ICFpc09iamVjdChkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGQgPSB7W2tleV06IGR9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXNzaWduKGVudGl0eSwgZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVudGl0eTtcclxuICAgIH0sXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXIgYWxsIHRoZSBsaXN0ZW5lcnMgcmVsYXRlZCB0byB0aGUgcGFnZS5cclxuICAgKi9cclxuICAgIF9yZWdpc3Rlckxpc3RlbmVyczogZnVuY3Rpb24gcmVnaXN0ZXJTdG9yZUxpc3RlbmVycygpIHtcclxuICAgICAgICBpZiAodGhpcy5zdG9yZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yZXMubWFwKChzdG9yZUNvbmYpID0+IHtcclxuICAgICAgICAgICAgICAgIHN0b3JlQ29uZi5wcm9wZXJ0aWVzLm1hcCgocHJvcGVydHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0b3JlQ29uZi5zdG9yZSB8fCAhc3RvcmVDb25mLnN0b3JlLmRlZmluaXRpb24gfHwgIXN0b3JlQ29uZi5zdG9yZS5kZWZpbml0aW9uW3Byb3BlcnR5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFlvdSBhZGQgYSBwcm9wZXJ0eSA6ICR7cHJvcGVydHl9IGluIHlvdXIgc3RvcmUgd2hpY2ggaXMgbm90IGluIHlvdXIgZGVmaW5pdGlvbiA6ICR7a2V5cyhzdG9yZUNvbmYuc3RvcmUuZGVmaW5pdGlvbil9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlQ29uZi5zdG9yZVtgYWRkJHtjYXBpdGFsaXplKHByb3BlcnR5KX1DaGFuZ2VMaXN0ZW5lcmBdKHRoaXMuX29uQ2hhbmdlKTtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yZUNvbmYuc3RvcmVbYGFkZCR7Y2FwaXRhbGl6ZShwcm9wZXJ0eSl9RXJyb3JMaXN0ZW5lcmBdKHRoaXMuX29uRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlQ29uZi5zdG9yZVtgYWRkJHtjYXBpdGFsaXplKHByb3BlcnR5KX1TdGF0dXNMaXN0ZW5lcmBdKHRoaXMuX29uU3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gIC8qKlxyXG4gICogVW5yZWdpc3RlciBhbGwgdGhlIGxpc3RlbmVycyByZWxhdGVkIHRvIHRoZSBwYWdlLlxyXG4gICovXHJcbiAgICBfdW5SZWdpc3Rlckxpc3RlbmVyczogZnVuY3Rpb24gdW5yZWdpc3Rlckxpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0b3Jlcykge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3Jlcy5tYXAoKHN0b3JlQ29uZikgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3RvcmVDb25mLnByb3BlcnRpZXMubWFwKChwcm9wZXJ0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlQ29uZi5zdG9yZVtgcmVtb3ZlJHtjYXBpdGFsaXplKHByb3BlcnR5KX1DaGFuZ2VMaXN0ZW5lcmBdKHRoaXMuX29uQ2hhbmdlKTtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yZUNvbmYuc3RvcmVbYHJlbW92ZSR7Y2FwaXRhbGl6ZShwcm9wZXJ0eSl9RXJyb3JMaXN0ZW5lcmBdKHRoaXMuX29uRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlQ29uZi5zdG9yZVtgcmVtb3ZlJHtjYXBpdGFsaXplKHByb3BlcnR5KX1TdGF0dXNMaXN0ZW5lcmBdKHRoaXMuX29uU3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiBzdG9yZUJlaGF2aW91cldpbGxNb3VudCgpIHtcclxuICAgIC8vVGhlc2UgbGlzdGVuZXJzIGFyZSByZWdpc3RlcmVkIGJlZm9yZSB0aGUgbW91bnRpbmcgYmVjYXVzZSB0aGV5IGFyZSBub3QgY29ycmVsYXRlZCB0byB0aGUgRE9NLlxyXG4gICAgLy9CdWlsZCB0aGUgZGVmaW5pdGlvbnMuXHJcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJMaXN0ZW5lcnMoKTtcclxuICAgIH0sXHJcbiAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gc3RvcmVCZWhhdmlvdXJXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB0aGlzLl91blJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlTWl4aW47XHJcbiJdfQ==