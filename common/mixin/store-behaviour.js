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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJzdG9yZU1peGluIiwibWl4aW5zIiwiX2dldFN0YXRlRnJvbVN0b3JlcyIsImZvcm1HZXRTdGF0ZUZyb21TdG9yZSIsImdldFN0YXRlRnJvbVN0b3JlIiwibmV3U3RhdGUiLCJzdG9yZXMiLCJtYXAiLCJzdG9yZUNvbmYiLCJwcm9wZXJ0aWVzIiwicHJvcGVydHkiLCJzdG9yZSIsImRlZmF1bHREYXRhIiwicHJvcHMiLCJ1c2VEZWZhdWx0U3RvcmVEYXRhIiwiZGVmaW5pdGlvbiIsImdldERlZmF1bHRTdG9yZURhdGEiLCJnZXREZWZhdWx0QWN0aW9uRGF0YSIsInJlZHVjZSIsImFjYyIsImtleSIsImNvbXB1dGVkU3RhdGUiLCJfY29tcHV0ZUVudGl0eUZyb21TdG9yZXNEYXRhIiwiX2dldExvYWRpbmdTdGF0ZUZyb21TdG9yZXMiLCJfZ2V0RXJyb3JTdGF0ZUZyb21TdG9yZXMiLCJmb3JtR2V0RXJyb3JTdGF0ZUZyb21TdG9yZSIsImdldEVycm9yU3RhdGVGcm9tU3RvcmUiLCJlcnJvclN0YXRlIiwicHJvcCIsImdldExvYWRpbmdTdGF0ZUZyb21TdG9yZXMiLCJpc0xvYWRpbmciLCJmb3JFYWNoIiwicHJvcFN0YXR1cyIsImdldFN0YXR1cyIsImRhdGEiLCJjb21wdXRlRW50aXR5RnJvbVN0b3Jlc0RhdGEiLCJlbnRpdHkiLCJyZWZlcmVuY2UiLCJyZWZlcmVuY2VOYW1lcyIsImluZGV4T2YiLCJkIiwiX3JlZ2lzdGVyTGlzdGVuZXJzIiwicmVnaXN0ZXJTdG9yZUxpc3RlbmVycyIsImNvbnNvbGUiLCJ3YXJuIiwiX29uQ2hhbmdlIiwiX29uRXJyb3IiLCJfb25TdGF0dXMiLCJfdW5SZWdpc3Rlckxpc3RlbmVycyIsInVucmVnaXN0ZXJMaXN0ZW5lciIsImNvbXBvbmVudFdpbGxNb3VudCIsInN0b3JlQmVoYXZpb3VyV2lsbE1vdW50IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJz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ZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NpZ24gZnJvbSAnb2JqZWN0LWFzc2lnbic7XHJcbmltcG9ydCB7aXNPYmplY3QsIGlzQXJyYXksIGtleXMsIGNhcGl0YWxpemUsIGRlZmF1bHRzRGVlcH0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHN0b3JlQ2hhbmdlQmVoYXZpb3VyIGZyb20gJy4vc3RvcmUtY2hhbmdlLWJlaGF2aW91cic7XHJcblxyXG5jb25zdCBzdG9yZU1peGluID0ge1xyXG4gICAgbWl4aW5zOiBbc3RvcmVDaGFuZ2VCZWhhdmlvdXJdLFxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgc3RhdGUgaW5mb3JtYXRpb25zIGZyb20gdGhlIHN0b3JlLlxyXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gVGhlIGpzIG9iamVjdCBjb25zdHJ1Y3RlZCBmcm9tIHN0b3JlIGRhdGEuXHJcbiAgICovXHJcbiAgICBfZ2V0U3RhdGVGcm9tU3RvcmVzOiBmdW5jdGlvbiBmb3JtR2V0U3RhdGVGcm9tU3RvcmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0U3RhdGVGcm9tU3RvcmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdGVGcm9tU3RvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5ld1N0YXRlID0ge307XHJcbiAgICAgICAgdGhpcy5zdG9yZXMubWFwKChzdG9yZUNvbmYpID0+IHtcclxuICAgICAgICAgICAgc3RvcmVDb25mLnByb3BlcnRpZXMubWFwKChwcm9wZXJ0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV3U3RhdGVbcHJvcGVydHldID0gc3RvcmVDb25mLnN0b3JlW2BnZXQke2NhcGl0YWxpemUocHJvcGVydHkpfWBdKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBkZWZhdWx0RGF0YSA9IHt9O1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnVzZURlZmF1bHRTdG9yZURhdGEgJiYgKHRoaXMuZGVmaW5pdGlvbiB8fCB0aGlzLmdldERlZmF1bHRTdG9yZURhdGEpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldERlZmF1bHRTdG9yZURhdGEpIHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHREYXRhID0gdGhpcy5nZXREZWZhdWx0QWN0aW9uRGF0YSh0aGlzLmRlZmluaXRpb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdERhdGEgPSBrZXlzKHRoaXMuZGVmaW5pdGlvbikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY1trZXldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgICAgICAgICAgfSwge30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNvbXB1dGVkU3RhdGUgPSBhc3NpZ24odGhpcy5fY29tcHV0ZUVudGl0eUZyb21TdG9yZXNEYXRhKG5ld1N0YXRlKSwgdGhpcy5fZ2V0TG9hZGluZ1N0YXRlRnJvbVN0b3JlcygpKTtcclxuICAgICAgICByZXR1cm4gZGVmYXVsdHNEZWVwKHt9LCBjb21wdXRlZFN0YXRlLCBkZWZhdWx0RGF0YSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGVycm9yIHN0YXRlIGluZm9ybWF0aW9ucyBmcm9tIHRoZSBzdG9yZS5cclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IC0gVGhlIGpzIGVycm9yIG9iamVjdCBjb25zdHJ1Y3RlZCBmcm9tIHRoZSBzdG9yZSBkYXRhLlxyXG4gICAgICovXHJcbiAgICBfZ2V0RXJyb3JTdGF0ZUZyb21TdG9yZXM6IGZ1bmN0aW9uIGZvcm1HZXRFcnJvclN0YXRlRnJvbVN0b3JlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdldEVycm9yU3RhdGVGcm9tU3RvcmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RXJyb3JTdGF0ZUZyb21TdG9yZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV3U3RhdGUgPSB7fTtcclxuICAgICAgICB0aGlzLnN0b3Jlcy5tYXAoIHN0b3JlQ29uZiA9PiB7XHJcbiAgICAgICAgICAgIHN0b3JlQ29uZi5wcm9wZXJ0aWVzLm1hcCggcHJvcGVydHkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVycm9yU3RhdGUgPSBzdG9yZUNvbmYuc3RvcmVbYGdldEVycm9yJHtjYXBpdGFsaXplKHByb3BlcnR5KX1gXSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBlcnJvclN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGVbYCR7cHJvcGVydHl9LiR7cHJvcH1gXSA9IGVycm9yU3RhdGVbcHJvcF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcclxuICAgIH0sXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBpc0xvYWRpbmcgc3RhdGUgZnJvbSAgYWxsIHRoZSBzdG9yZS5cclxuICAgKi9cclxuICAgIF9nZXRMb2FkaW5nU3RhdGVGcm9tU3RvcmVzOiBmdW5jdGlvbiBnZXRMb2FkaW5nU3RhdGVGcm9tU3RvcmVzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdldExvYWRpbmdTdGF0ZUZyb21TdG9yZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9hZGluZ1N0YXRlRnJvbVN0b3JlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdG9yZXMuZm9yRWFjaCgoc3RvcmVDb25mKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaXNMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yZUNvbmYucHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9wU3RhdHVzID0gc3RvcmVDb25mLnN0b3JlLmdldFN0YXR1cyhwcm9wZXJ0eSkgfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZyA9IHByb3BTdGF0dXMuaXNMb2FkaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAvL2NvbnNvbGUuaW5mbygnUHJvY2Vzc2luZyBzdGF0ZScsIHRoaXMuc3RvcmVzLCAnbG9hZGluZycsIGlzTG9hZGluZyk7XHJcbiAgICAgICAgcmV0dXJuIHtpc0xvYWRpbmc6IGlzTG9hZGluZ307XHJcbiAgICB9LFxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGRhdGEgZ2l2ZW4gZnJvbSB0aGUgc3RvcmVzLlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIC0gIFRoZSBkYXRhIG9yZGVyZWQgYnkgc3RvcmUuXHJcbiAgICogQHJldHVybnMge29iamVjdH0gLSBUaGUganMgb2JqZWN0IHRyYW5zZm9ybWVkIGZyb20gc3RvcmUgZGF0YS5cclxuICAgKi9cclxuICAgIF9jb21wdXRlRW50aXR5RnJvbVN0b3Jlc0RhdGE6IGZ1bmN0aW9uIF9jb21wdXRlRW50aXR5RnJvbVN0b3Jlc0RhdGEoZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbXB1dGVFbnRpdHlGcm9tU3RvcmVzRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wdXRlRW50aXR5RnJvbVN0b3Jlc0RhdGEoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlbnRpdHkgPSB7cmVmZXJlbmNlOiB7fX07XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVmZXJlbmNlTmFtZXMgJiYgdGhpcy5yZWZlcmVuY2VOYW1lcy5pbmRleE9mKGtleSkgIT09IC0xICkge1xyXG4gICAgICAgICAgICAgICAgZW50aXR5LnJlZmVyZW5jZVtrZXldID0gZGF0YVtrZXldO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGQgPSBkYXRhW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheShkKSB8fCAhaXNPYmplY3QoZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkID0ge1trZXldOiBkfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFzc2lnbihlbnRpdHksIGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlbnRpdHk7XHJcbiAgICB9LFxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVyIGFsbCB0aGUgbGlzdGVuZXJzIHJlbGF0ZWQgdG8gdGhlIHBhZ2UuXHJcbiAgICovXHJcbiAgICBfcmVnaXN0ZXJMaXN0ZW5lcnM6IGZ1bmN0aW9uIHJlZ2lzdGVyU3RvcmVMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RvcmVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcmVzLm1hcCgoc3RvcmVDb25mKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzdG9yZUNvbmYucHJvcGVydGllcy5tYXAoKHByb3BlcnR5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdG9yZUNvbmYuc3RvcmUgfHwgIXN0b3JlQ29uZi5zdG9yZS5kZWZpbml0aW9uIHx8ICFzdG9yZUNvbmYuc3RvcmUuZGVmaW5pdGlvbltwcm9wZXJ0eV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBZb3UgYWRkIGEgcHJvcGVydHkgOiAke3Byb3BlcnR5fSBpbiB5b3VyIHN0b3JlIHdoaWNoIGlzIG5vdCBpbiB5b3VyIGRlZmluaXRpb24gOiAke2tleXMoc3RvcmVDb25mLnN0b3JlLmRlZmluaXRpb24pfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzdG9yZUNvbmYuc3RvcmVbYGFkZCR7Y2FwaXRhbGl6ZShwcm9wZXJ0eSl9Q2hhbmdlTGlzdGVuZXJgXSh0aGlzLl9vbkNoYW5nZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcmVDb25mLnN0b3JlW2BhZGQke2NhcGl0YWxpemUocHJvcGVydHkpfUVycm9yTGlzdGVuZXJgXSh0aGlzLl9vbkVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yZUNvbmYuc3RvcmVbYGFkZCR7Y2FwaXRhbGl6ZShwcm9wZXJ0eSl9U3RhdHVzTGlzdGVuZXJgXSh0aGlzLl9vblN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAvKipcclxuICAqIFVucmVnaXN0ZXIgYWxsIHRoZSBsaXN0ZW5lcnMgcmVsYXRlZCB0byB0aGUgcGFnZS5cclxuICAqL1xyXG4gICAgX3VuUmVnaXN0ZXJMaXN0ZW5lcnM6IGZ1bmN0aW9uIHVucmVnaXN0ZXJMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5zdG9yZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9yZXMubWFwKChzdG9yZUNvbmYpID0+IHtcclxuICAgICAgICAgICAgICAgIHN0b3JlQ29uZi5wcm9wZXJ0aWVzLm1hcCgocHJvcGVydHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yZUNvbmYuc3RvcmVbYHJlbW92ZSR7Y2FwaXRhbGl6ZShwcm9wZXJ0eSl9Q2hhbmdlTGlzdGVuZXJgXSh0aGlzLl9vbkNoYW5nZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcmVDb25mLnN0b3JlW2ByZW1vdmUke2NhcGl0YWxpemUocHJvcGVydHkpfUVycm9yTGlzdGVuZXJgXSh0aGlzLl9vbkVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yZUNvbmYuc3RvcmVbYHJlbW92ZSR7Y2FwaXRhbGl6ZShwcm9wZXJ0eSl9U3RhdHVzTGlzdGVuZXJgXSh0aGlzLl9vblN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gc3RvcmVCZWhhdmlvdXJXaWxsTW91bnQoKSB7XHJcbiAgICAvL1RoZXNlIGxpc3RlbmVycyBhcmUgcmVnaXN0ZXJlZCBiZWZvcmUgdGhlIG1vdW50aW5nIGJlY2F1c2UgdGhleSBhcmUgbm90IGNvcnJlbGF0ZWQgdG8gdGhlIERPTS5cclxuICAgIC8vQnVpbGQgdGhlIGRlZmluaXRpb25zLlxyXG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICB9LFxyXG4gIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uIHN0b3JlQmVoYXZpb3VyV2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5fdW5SZWdpc3Rlckxpc3RlbmVycygpO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZU1peGluO1xyXG4iXX0=