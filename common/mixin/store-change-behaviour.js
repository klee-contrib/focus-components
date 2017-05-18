'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _message = require('focus-core/message');

var _message2 = _interopRequireDefault(_message);

var _application = require('focus-core/application');

var _reduce = require('lodash/collection/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var changeBehaviourMixin = {
    /**
    * Display a message when there is a change on a store property resulting from a component action call.
    * @param  {object} changeInfos - An object containing all the event informations, without the data.
    * @return {function} - An override function can be called.
    */
    _displayMessageOnChange: function displayMessageOnChange(changeInfos) {
        if (this.displayMessageOnChange) {
            return this.displayMessageOnChange(changeInfos);
        }
        if (changeInfos && changeInfos.status && changeInfos.status.name) {
            switch (changeInfos.status.name) {
                /* case 'loading':
                Focus.message.addInformationMessage('detail.loading');
                break;
                case 'loaded':
                Focus.message.addSuccessMessage('detail.loaded');
                break;
                case 'saving':
                Focus.message.addInformationMessage('detail.saving');
                break;*/
                case 'saved':
                    //Maybe the action result or the event should have a caller notion.
                    _message2.default.addSuccessMessage('detail.saved');
                    //Change the page mode as edit
                    this.setState({ isEdit: false }, function () {
                        (0, _application.changeMode)('consult', 'edit');
                    });
                    break;
                default:
                    break;
            }
        }
    },
    /**
    * After change informations.
    * You can override this method using afterChange function.
    * @param {object} changeInfos - All informations relative to the change.
    * @returns {undefined} -  The return value is the callback.
    */
    _afterChange: function afterChangeForm(changeInfos) {
        if (this.afterChange) {
            return this.afterChange(changeInfos);
        }
        //If there is no callerId in the event, the display message does not have any sens.
        //Other component responding to the store property change does not need to react on it.
        if (changeInfos && changeInfos.informations && changeInfos.informations.callerId && this._identifier === changeInfos.informations.callerId) {
            return this._displayMessageOnChange(changeInfos);
        }
    },
    /**
    * Event handler for 'change' events coming from the stores
    * @param {object} changeInfos - The changing informations.
    */
    _onChange: function onFormStoreChangeHandler(changeInfos) {
        var _this = this;

        var onChange = this.props.onChange || this.onChange;
        if (onChange) {
            onChange.call(this, changeInfos);
        }
        this.setState(this._getStateFromStores(), function () {
            return _this._afterChange(changeInfos);
        });
    },
    /**
    * Event handler for 'error' events coming from the stores.
    */
    _onError: function onFormErrorHandler(changeInfos) {
        var _this2 = this;

        this.setState(this._getLoadingStateFromStores(), function () {
            return _this2._handleErrors(changeInfos);
        }); // update errors after status
    },
    _handleErrors: function _handleErrors() {
        var _this3 = this;

        var errorState = this._getErrorStateFromStores();
        if (this.definitionPath) {
            var _loop = function _loop(key) {
                // Let's find that corresponding field, considering that the ref might not directly be 'storeNode.fieldName', but in fact 'entityPath.fieldName'
                var ref = (0, _reduce2.default)(_this3.refs, function (acc, value, candidateRef) {
                    var candidate = candidateRef.replace(_this3.definitionPath + '.', ''); // Remove the 'definitionPath.'
                    if (candidate === key.match(/([^\.]*)$/)[0]) {
                        // Look for the 'fieldName' part of 'storeNode.fieldName'
                        acc = value;
                    }
                    return acc;
                }, null);
                if (ref) {
                    // If we found it, then bingo
                    ref.setError(errorState[key]);
                }
            };

            // In case we have a definitionPath, we might want to trigger a setError on the corresponding field
            for (var key in errorState) {
                _loop(key);
            }
        }
    },

    /**
    * Read
    * @param  {[type]} changeInfos [description]
    * @return {[type]}             [description]
    */
    _onStatus: function _onStatus(changeInfos) {
        if (this._getEntity) {
            this.setState(_extends({}, this._getEntity(), this._getLoadingStateFromStores()));
        } else {
            this.setState(this._getLoadingStateFromStores());
        }
    }
};
module.exports = changeBehaviourMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJjaGFuZ2VCZWhhdmlvdXJNaXhpbiIsIl9kaXNwbGF5TWVzc2FnZU9uQ2hhbmdlIiwiZGlzcGxheU1lc3NhZ2VPbkNoYW5nZSIsImNoYW5nZUluZm9zIiwic3RhdHVzIiwibmFtZSIsImFkZFN1Y2Nlc3NNZXNzYWdlIiwic2V0U3RhdGUiLCJpc0VkaXQiLCJfYWZ0ZXJDaGFuZ2UiLCJhZnRlckNoYW5nZUZvcm0iLCJhZnRlckNoYW5nZSIsImluZm9ybWF0aW9ucyIsImNhbGxlcklkIiwiX2lkZW50aWZpZXIiLCJfb25DaGFuZ2UiLCJvbkZvcm1TdG9yZUNoYW5nZUhhbmRsZXIiLCJvbkNoYW5nZSIsInByb3BzIiwiY2FsbCIsIl9nZXRTdGF0ZUZyb21TdG9yZXMiLCJfb25FcnJvciIsIm9uRm9ybUVycm9ySGFuZGxlciIsIl9nZXRMb2FkaW5nU3RhdGVGcm9tU3RvcmVzIiwiX2hhbmRsZUVycm9ycyIsImVycm9yU3RhdGUiLCJfZ2V0RXJyb3JTdGF0ZUZyb21TdG9yZXMiLCJkZWZpbml0aW9uUGF0aCIsImtleSIsInJlZiIsInJlZnMiLCJhY2MiLCJ2YWx1ZSIsImNhbmRpZGF0ZVJlZiIsImNhbmRpZGF0ZSIsInJlcGxhY2UiLCJtYXRjaCIsInNldEVycm9yIiwiX29uU3RhdHVzIiwiX2dldEVudGl0eSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNQSx1QkFBdUI7QUFDekI7Ozs7O0FBS0FDLDZCQUF5QixTQUFTQyxzQkFBVCxDQUFnQ0MsV0FBaEMsRUFBNkM7QUFDbEUsWUFBSSxLQUFLRCxzQkFBVCxFQUFpQztBQUM3QixtQkFBTyxLQUFLQSxzQkFBTCxDQUE0QkMsV0FBNUIsQ0FBUDtBQUNIO0FBQ0QsWUFBSUEsZUFBZUEsWUFBWUMsTUFBM0IsSUFBcUNELFlBQVlDLE1BQVosQ0FBbUJDLElBQTVELEVB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QUNIO0FBRUo7QUFuR3dCLENBQTdCO0FBcUdBaUIsT0FBT0MsT0FBUCxHQUFpQnpDLG9CQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWVzc2FnZSBmcm9tICdmb2N1cy1jb3JlL21lc3NhZ2UnO1xyXG5pbXBvcnQge2NoYW5nZU1vZGV9IGZyb20gJ2ZvY3VzLWNvcmUvYXBwbGljYXRpb24nO1xyXG5pbXBvcnQgcmVkdWNlIGZyb20gJ2xvZGFzaC9jb2xsZWN0aW9uL3JlZHVjZSc7XHJcblxyXG5jb25zdCBjaGFuZ2VCZWhhdmlvdXJNaXhpbiA9IHtcclxuICAgIC8qKlxyXG4gICAgKiBEaXNwbGF5IGEgbWVzc2FnZSB3aGVuIHRoZXJlIGlzIGEgY2hhbmdlIG9uIGEgc3RvcmUgcHJvcGVydHkgcmVzdWx0aW5nIGZyb20gYSBjb21wb25lbnQgYWN0aW9uIGNhbGwuXHJcbiAgICAqIEBwYXJhbSAge29iamVjdH0gY2hhbmdlSW5mb3MgLSBBbiBvYmplY3QgY29udGFpbmluZyBhbGwgdGhlIGV2ZW50IGluZm9ybWF0aW9ucywgd2l0aG91dCB0aGUgZGF0YS5cclxuICAgICogQHJldHVybiB7ZnVuY3Rpb259IC0gQW4gb3ZlcnJpZGUgZnVuY3Rpb24gY2FuIGJlIGNhbGxlZC5cclxuICAgICovXHJcbiAgICBfZGlzcGxheU1lc3NhZ2VPbkNoYW5nZTogZnVuY3Rpb24gZGlzcGxheU1lc3NhZ2VPbkNoYW5nZShjaGFuZ2VJbmZvcykge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlNZXNzYWdlT25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheU1lc3NhZ2VPbkNoYW5nZShjaGFuZ2VJbmZvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VJbmZvcyAmJiBjaGFuZ2VJbmZvcy5zdGF0dXMgJiYgY2hhbmdlSW5mb3Muc3RhdHVzLm5hbWUpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2VJbmZvcy5zdGF0dXMubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgLyogY2FzZSAnbG9hZGluZyc6XHJcbiAgICAgICAgICAgICAgICBGb2N1cy5tZXNzYWdlLmFkZEluZm9ybWF0aW9uTWVzc2FnZSgnZGV0YWlsLmxvYWRpbmcnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGVkJzpcclxuICAgICAgICAgICAgICAgIEZvY3VzLm1lc3NhZ2UuYWRkU3VjY2Vzc01lc3NhZ2UoJ2RldGFpbC5sb2FkZWQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2F2aW5nJzpcclxuICAgICAgICAgICAgICAgIEZvY3VzLm1lc3NhZ2UuYWRkSW5mb3JtYXRpb25NZXNzYWdlKCdkZXRhaWwuc2F2aW5nJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhazsqL1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2F2ZWQnOlxyXG4gICAgICAgICAgICAgICAgLy9NYXliZSB0aGUgYWN0aW9uIHJlc3VsdCBvciB0aGUgZXZlbnQgc2hvdWxkIGhhdmUgYSBjYWxsZXIgbm90aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkU3VjY2Vzc01lc3NhZ2UoJ2RldGFpbC5zYXZlZCcpO1xyXG4gICAgICAgICAgICAgICAgLy9DaGFuZ2UgdGhlIHBhZ2UgbW9kZSBhcyBlZGl0XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNFZGl0OiBmYWxzZX0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlTW9kZSgnY29uc3VsdCcsICdlZGl0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBBZnRlciBjaGFuZ2UgaW5mb3JtYXRpb25zLlxyXG4gICAgKiBZb3UgY2FuIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHVzaW5nIGFmdGVyQ2hhbmdlIGZ1bmN0aW9uLlxyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gY2hhbmdlSW5mb3MgLSBBbGwgaW5mb3JtYXRpb25zIHJlbGF0aXZlIHRvIHRoZSBjaGFuZ2UuXHJcbiAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9IC0gIFRoZSByZXR1cm4gdmFsdWUgaXMgdGhlIGNhbGxiYWNrLlxyXG4gICAgKi9cclxuICAgIF9hZnRlckNoYW5nZTogZnVuY3Rpb24gYWZ0ZXJDaGFuZ2VGb3JtKGNoYW5nZUluZm9zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWZ0ZXJDaGFuZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWZ0ZXJDaGFuZ2UoY2hhbmdlSW5mb3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0lmIHRoZXJlIGlzIG5vIGNhbGxlcklkIGluIHRoZSBldmVudCwgdGhlIGRpc3BsYXkgbWVzc2FnZSBkb2VzIG5vdCBoYXZlIGFueSBzZW5zLlxyXG4gICAgICAgIC8vT3RoZXIgY29tcG9uZW50IHJlc3BvbmRpbmcgdG8gdGhlIHN0b3JlIHByb3BlcnR5IGNoYW5nZSBkb2VzIG5vdCBuZWVkIHRvIHJlYWN0IG9uIGl0LlxyXG4gICAgICAgIGlmKGNoYW5nZUluZm9zICYmIGNoYW5nZUluZm9zLmluZm9ybWF0aW9ucyAmJiBjaGFuZ2VJbmZvcy5pbmZvcm1hdGlvbnMuY2FsbGVySWQgJiYgdGhpcy5faWRlbnRpZmllciA9PT0gY2hhbmdlSW5mb3MuaW5mb3JtYXRpb25zLmNhbGxlcklkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5TWVzc2FnZU9uQ2hhbmdlKGNoYW5nZUluZm9zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBFdmVudCBoYW5kbGVyIGZvciAnY2hhbmdlJyBldmVudHMgY29taW5nIGZyb20gdGhlIHN0b3Jlc1xyXG4gICAgKiBAcGFyYW0ge29iamVjdH0gY2hhbmdlSW5mb3MgLSBUaGUgY2hhbmdpbmcgaW5mb3JtYXRpb25zLlxyXG4gICAgKi9cclxuICAgIF9vbkNoYW5nZTogZnVuY3Rpb24gb25Gb3JtU3RvcmVDaGFuZ2VIYW5kbGVyKGNoYW5nZUluZm9zKSB7XHJcbiAgICAgICAgbGV0IG9uQ2hhbmdlID0gdGhpcy5wcm9wcy5vbkNoYW5nZSB8fCB0aGlzLm9uQ2hhbmdlO1xyXG4gICAgICAgIGlmIChvbkNoYW5nZSkge1xyXG4gICAgICAgICAgICBvbkNoYW5nZS5jYWxsKHRoaXMsIGNoYW5nZUluZm9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLl9nZXRTdGF0ZUZyb21TdG9yZXMoKSwgKCkgPT4gdGhpcy5fYWZ0ZXJDaGFuZ2UoY2hhbmdlSW5mb3MpKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogRXZlbnQgaGFuZGxlciBmb3IgJ2Vycm9yJyBldmVudHMgY29taW5nIGZyb20gdGhlIHN0b3Jlcy5cclxuICAgICovXHJcbiAgICBfb25FcnJvcjogZnVuY3Rpb24gb25Gb3JtRXJyb3JIYW5kbGVyKGNoYW5nZUluZm9zKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLl9nZXRMb2FkaW5nU3RhdGVGcm9tU3RvcmVzKCksICgpID0+IHRoaXMuX2hhbmRsZUVycm9ycyhjaGFuZ2VJbmZvcykpOyAvLyB1cGRhdGUgZXJyb3JzIGFmdGVyIHN0YXR1c1xyXG4gICAgfSxcclxuICAgIF9oYW5kbGVFcnJvcnMoKXtcclxuICAgICAgICBjb25zdCBlcnJvclN0YXRlID0gdGhpcy5fZ2V0RXJyb3JTdGF0ZUZyb21TdG9yZXMoKTtcclxuICAgICAgICBpZiAodGhpcy5kZWZpbml0aW9uUGF0aCkge1xyXG4gICAgICAgICAgICAvLyBJbiBjYXNlIHdlIGhhdmUgYSBkZWZpbml0aW9uUGF0aCwgd2UgbWlnaHQgd2FudCB0byB0cmlnZ2VyIGEgc2V0RXJyb3Igb24gdGhlIGNvcnJlc3BvbmRpbmcgZmllbGRcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGVycm9yU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIExldCdzIGZpbmQgdGhhdCBjb3JyZXNwb25kaW5nIGZpZWxkLCBjb25zaWRlcmluZyB0aGF0IHRoZSByZWYgbWlnaHQgbm90IGRpcmVjdGx5IGJlICdzdG9yZU5vZGUuZmllbGROYW1lJywgYnV0IGluIGZhY3QgJ2VudGl0eVBhdGguZmllbGROYW1lJ1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmID0gcmVkdWNlKHRoaXMucmVmcywgKGFjYywgdmFsdWUsIGNhbmRpZGF0ZVJlZikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IGNhbmRpZGF0ZVJlZi5yZXBsYWNlKGAke3RoaXMuZGVmaW5pdGlvblBhdGh9LmAsICcnKTsgLy8gUmVtb3ZlIHRoZSAnZGVmaW5pdGlvblBhdGguJ1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYW5kaWRhdGUgPT09IGtleS5tYXRjaCgvKFteXFwuXSopJC8pWzBdKSB7IC8vIExvb2sgZm9yIHRoZSAnZmllbGROYW1lJyBwYXJ0IG9mICdzdG9yZU5vZGUuZmllbGROYW1lJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2MgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICAgICAgICAgIH0sIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlZikgeyAvLyBJZiB3ZSBmb3VuZCBpdCwgdGhlbiBiaW5nb1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZi5zZXRFcnJvcihlcnJvclN0YXRlW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZWFkXHJcbiAgICAqIEBwYXJhbSAge1t0eXBlXX0gY2hhbmdlSW5mb3MgW2Rlc2NyaXB0aW9uXVxyXG4gICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgICovXHJcbiAgICBfb25TdGF0dXMoY2hhbmdlSW5mb3MpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2V0RW50aXR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoey4uLnRoaXMuX2dldEVudGl0eSgpLCAuLi50aGlzLl9nZXRMb2FkaW5nU3RhdGVGcm9tU3RvcmVzKCl9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuX2dldExvYWRpbmdTdGF0ZUZyb21TdG9yZXMoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBjaGFuZ2VCZWhhdmlvdXJNaXhpbjtcclxuIl19