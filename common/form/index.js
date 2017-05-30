'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

// Common mixins.
var definitionMixin = require('../mixin/definition');
//let fieldComponentBehaviour = require('../mixin/field-component-behaviour');
var builtInComponents = require('../mixin/built-in-components');
var storeBehaviour = require('../mixin/store-behaviour');
var ownIdentifierBehaviour = require('../mixin/own-identifier');
//Form mixins.

var _require = require('./mixin'),
    actionBehaviour = _require.actionBehaviour,
    referenceBehaviour = _require.referenceBehaviour,
    validationBehaviour = _require.validationBehaviour;

/**
* Mixin to create a block for the rendering.
* @type {Object}
*/


var formMixin = {
    mixins: [ownIdentifierBehaviour, definitionMixin, referenceBehaviour, storeBehaviour, validationBehaviour, actionBehaviour, builtInComponents],
    /** @inheritdoc */
    getDefaultProps: function getFormDefaultProps() {
        return {
            hasForm: true,
            /**
            * Defines it the form can have  an edit mode.
            * @type {Boolean}
            */
            hasEdit: true,
            /**
            * Defines if the form has a delete action button.
            * @type {Boolean}
            */
            hasDelete: false,
            /**
            * Does the form call the load action on componentdid mount.
            * @type {Boolean}
            */
            hasLoad: true,
            /**
            * Defines
            * @type {Boolean}
            */
            isEdit: false,
            /**
            * Style of the component.
            * @type {Object}
            */
            style: {}
        };
    },
    /** @inheritdoc */
    getInitialState: function getFormInitialState() {
        return {
            /**
            * Identifier of the entity.
            * @type {[type]}
            */
            id: this.props.id,
            isEdit: this.props.isEdit
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps() {
        var newProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var isEdit = newProps.isEdit;

        if (isEdit !== undefined) {
            this.setState({ isEdit: isEdit });
        }
    },

    /** @inheritdoc */
    callMountedActions: function formCallMountedActions() {
        if (this.props.hasLoad) {
            this._loadData();
        }
        this._loadReference();
    },
    /** @inheritdoc */
    componentDidMount: function formDidMount() {
        //Build the definitions.
        if (this.registerListeners) {
            this.registerListeners();
        }
        if (this.callMountedActions) {
            this.callMountedActions();
        }
    },
    /** @inheritdoc */
    componentWillUnmount: function formWillMount() {
        if (this.unregisterListeners) {
            this.unregisterListeners();
        }
    },
    _mode: function _mode() {
        return '' + (this.state.isEdit ? 'edit' : 'consult');
    },
    _className: function formClassName() {
        return 'form-horizontal ' + this.props.style.className;
    },
    _renderActions: function renderActions() {
        if (this.renderActions) {
            return this.renderActions();
        }
        return this.state.isEdit ? this._renderEditActions() : this._renderConsultActions();
    },
    _renderEditActions: function _renderEditActions() {
        return this.renderEditActions ? this.renderEditActions() : React.createElement(
            'span',
            null,
            this.buttonSave(),
            this.buttonCancel()
        );
    },
    _renderConsultActions: function _renderConsultActions() {
        return this.renderConsultActions ? this.renderConsultActions() : React.createElement(
            'div',
            null,
            this.props.hasEdit && this.buttonEdit(),
            this.props.hasDelete && this.buttonDelete()
        );
    },
    /**
    * Handle the form submission.
    * @param {Event} e - React sanityze event from the form submit.
    */
    _handleSubmitForm: function _handleSubmitForm(e) {
        e.preventDefault();
        if (this._validate()) {
            this.action.save.call(this, this._getEntity());
        }
        //return false;
    },

    /** @inheritdoc */
    render: function render() {
        //console.log('state form', this.state);
        if (this.props.hasForm) {
            return React.createElement(
                'form',
                { className: this._className(), 'data-loading': this.state.isLoading, 'data-mode': this._mode(), noValidate: true, onSubmit: this._handleSubmitForm },
                React.createElement(
                    'fieldset',
                    null,
                    this.renderContent()
                )
            );
        }
        return this.renderContent();
    }
};

module.exports = (0, _builder2.default)(formMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJkZWZpbml0aW9uTWl4aW4iLCJidWlsdEluQ29tcG9uZW50cyIsInN0b3JlQmVoYXZpb3VyIiwib3duSWRlbnRpZmllckJlaGF2aW91ciIsImFjdGlvbkJlaGF2aW91ciIsInJlZmVyZW5jZUJlaGF2aW91ciIsInZhbGlkYXRpb25CZWhhdmlvdXIiLCJmb3JtTWl4aW4iLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJnZXRGb3JtRGVmYXVsdFByb3BzIiwiaGFzRm9ybSIsImhhc0VkaXQiLCJoYXNEZWxldGUiLCJoYXNMb2FkIiwiaXNFZGl0Iiwic3R5bGUiLCJnZXRJbml0aWFsU3RhdGUiLCJnZXRGb3JtSW5pdGlhbFN0YXRlIiwiaWQiLCJwcm9wcyIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXdQcm9wcyIsInVuZGVmaW5lZCIsInNldFN0YXRlIiwiY2FsbE1vdW50ZWRBY3Rpb25zIiwiZm9ybUNhbGxNb3VudGVkQWN0aW9ucyIsIl9sb2FkRGF0YSIsIl9sb2FkUmVmZXJlbmNlIiwiY29tcG9uZW50RGlkTW91bnQiLCJmb3JtRGlkTW91bnQiLCJyZWdpc3Rlckxpc3RlbmVycyIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiZm9ybVdpbGxNb3VudCIsInVucmVnaXN0ZXJMaXN0ZW5lcnMiLCJfbW9kZSIsInN0YXRlIiwiX2NsYXNzTmFtZSIsImZvcm1DbGFzc05hbWUiLCJjbGFzc05hbWUiLCJfcmVuZGVyQWN0aW9ucyIsInJlbmRlckFjdGlvbnMiLCJfcmVuZGVyRWRpdEFjdGlvbnMiLCJfcmVuZGVyQ29uc3VsdEFjdGlvbnMiLCJyZW5kZXJFZGl0QWN0aW9ucyIsImJ1dHRvblNhdmUiLCJidXR0b25DYW5jZWwiLCJyZW5kZXJDb25zdWx0QWN0aW9ucyIsImJ1dHRvbkVkaXQiLCJidXR0b25EZWxldGUiLCJfaGFuZGxlU3VibWl0Rm9ybSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIl92YWxpZGF0ZSIsImFjdGlvbiIsInNhdmUiLCJjYWxsIiwiX2dldEVudGl0eSIsInJlbmRlciIsImlzTG9hZGluZyIsInJlbmRlckNvbnRlbnQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7QUFDQSxJQUFJQSxRQUFRQyxRQUFRLE9BQVIsQ0FBWjs7QUFFQTtBQUNBLElBQUlDLGtCQUFrQkQsUUFBUSxxQkFBUixDQUF0QjtBQUNBO0FBQ0EsSUFBSUUsb0JBQW9CRixRQUFRLDhCQUFSLENBQXhCO0FBQ0EsSUFBSUcsaUJBQWlCSCxRQUFRLDBCQUFSLENBQXJCO0FBQ0EsSUFBSUkseUJBQXlCSixRQUFRLHlCQUFSLENBQTdCO0FBQ0E7O2VBQ2tFQSxRQUFRLFNBQVIsQztJQUE1REssZSxZQUFBQSxlO0lBQWlCQyxrQixZQUFBQSxrQjtJQUFvQkMsbUIsWUFBQUEsbUI7O0FBRTNDOzs7Ozs7QUFJQSxJQUFJQyxZQUFZO0FBQ1pDLFlBQVEsQ0FBQ0wsc0JBQUQsRUFBeUJILGVBQXpCLEVBQTBDSyxrQkFBMUMsRUFBOERILGNBQTlELEVBQThFSSxtQkFBOUUsRUFBbUdGLGVBQW5HLEVBQW9ISCxpQkFBcEgsQ0FESTtBQUVaO0FBQ0FRLHFCQUFpQixTQUFTQyxtQkFBVCxHQUErQjtBQUM1QyxlQUFPO0FBQ0hDLHFCQUFTLElBRE47QUFFSDs7OztBQUlBQyxxQkFBUyxJQU5OO0FBT0g7Ozs7QUFJQUMsdUJBQVcsS0FYUjtBQVlIOzs7O0FBSUFDLHFCQUFTLElBaEJOO0FBaUJIOzs7O0FBSUFDLG9CQUFRLEtBckJMO0FBc0JIOzs7O0FBSUFDLG1CQUFPO0FBMUJKLFNBQVA7QUE0QkgsS0FoQ1c7QUFpQ1o7QUFDQUMscUJBQWlCLFNBQVNDLG1CQUFULEdBQStCO0FBQzVDLGVBQU87QUFDSDs7OztBQUlBQyxnQkFBSSxLQUFLQyxLQUFMLENBQVdELEVBTFo7QUFNSEosb0JBQVEsS0FBS0ssS0FBTCxDQUFXTDtBQU5oQixTQUFQO0FB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UDtBQUNIO0FBM0hXLENBQWhCOztBQThIQUMsT0FBT0MsT0FBUCxHQUFpQix1QkFBUXZELFNBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmxldCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcblxyXG4vLyBDb21tb24gbWl4aW5zLlxyXG5sZXQgZGVmaW5pdGlvbk1peGluID0gcmVxdWlyZSgnLi4vbWl4aW4vZGVmaW5pdGlvbicpO1xyXG4vL2xldCBmaWVsZENvbXBvbmVudEJlaGF2aW91ciA9IHJlcXVpcmUoJy4uL21peGluL2ZpZWxkLWNvbXBvbmVudC1iZWhhdmlvdXInKTtcclxubGV0IGJ1aWx0SW5Db21wb25lbnRzID0gcmVxdWlyZSgnLi4vbWl4aW4vYnVpbHQtaW4tY29tcG9uZW50cycpO1xyXG5sZXQgc3RvcmVCZWhhdmlvdXIgPSByZXF1aXJlKCcuLi9taXhpbi9zdG9yZS1iZWhhdmlvdXInKTtcclxubGV0IG93bklkZW50aWZpZXJCZWhhdmlvdXIgPSByZXF1aXJlKCcuLi9taXhpbi9vd24taWRlbnRpZmllcicpO1xyXG4vL0Zvcm0gbWl4aW5zLlxyXG5sZXQgeyBhY3Rpb25CZWhhdmlvdXIsIHJlZmVyZW5jZUJlaGF2aW91ciwgdmFsaWRhdGlvbkJlaGF2aW91cn0gPSByZXF1aXJlKCcuL21peGluJyk7XHJcblxyXG4vKipcclxuKiBNaXhpbiB0byBjcmVhdGUgYSBibG9jayBmb3IgdGhlIHJlbmRlcmluZy5cclxuKiBAdHlwZSB7T2JqZWN0fVxyXG4qL1xyXG5sZXQgZm9ybU1peGluID0ge1xyXG4gICAgbWl4aW5zOiBbb3duSWRlbnRpZmllckJlaGF2aW91ciwgZGVmaW5pdGlvbk1peGluLCByZWZlcmVuY2VCZWhhdmlvdXIsIHN0b3JlQmVoYXZpb3VyLCB2YWxpZGF0aW9uQmVoYXZpb3VyLCBhY3Rpb25CZWhhdmlvdXIsIGJ1aWx0SW5Db21wb25lbnRzXSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiBnZXRGb3JtRGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhhc0Zvcm06IHRydWUsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIERlZmluZXMgaXQgdGhlIGZvcm0gY2FuIGhhdmUgIGFuIGVkaXQgbW9kZS5cclxuICAgICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaGFzRWRpdDogdHJ1ZSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogRGVmaW5lcyBpZiB0aGUgZm9ybSBoYXMgYSBkZWxldGUgYWN0aW9uIGJ1dHRvbi5cclxuICAgICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaGFzRGVsZXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogRG9lcyB0aGUgZm9ybSBjYWxsIHRoZSBsb2FkIGFjdGlvbiBvbiBjb21wb25lbnRkaWQgbW91bnQuXHJcbiAgICAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGhhc0xvYWQ6IHRydWUsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIERlZmluZXNcclxuICAgICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaXNFZGl0OiBmYWxzZSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogU3R5bGUgb2YgdGhlIGNvbXBvbmVudC5cclxuICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzdHlsZToge31cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRGb3JtSW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIElkZW50aWZpZXIgb2YgdGhlIGVudGl0eS5cclxuICAgICAgICAgICAgKiBAdHlwZSB7W3R5cGVdfVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBpZDogdGhpcy5wcm9wcy5pZCxcclxuICAgICAgICAgICAgaXNFZGl0OiB0aGlzLnByb3BzLmlzRWRpdFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHtpc0VkaXR9ID0gbmV3UHJvcHM7XHJcbiAgICAgICAgaWYoaXNFZGl0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNFZGl0OiBpc0VkaXR9KVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGNhbGxNb3VudGVkQWN0aW9uczogZnVuY3Rpb24gZm9ybUNhbGxNb3VudGVkQWN0aW9ucygpIHtcclxuICAgICAgICBpZih0aGlzLnByb3BzLmhhc0xvYWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9hZFJlZmVyZW5jZSgpO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uIGZvcm1EaWRNb3VudCgpIHtcclxuICAgICAgICAvL0J1aWxkIHRoZSBkZWZpbml0aW9ucy5cclxuICAgICAgICBpZiAodGhpcy5yZWdpc3Rlckxpc3RlbmVycykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNhbGxNb3VudGVkQWN0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxNb3VudGVkQWN0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiBmb3JtV2lsbE1vdW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVucmVnaXN0ZXJMaXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgdGhpcy51bnJlZ2lzdGVyTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIF9tb2RlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5zdGF0ZS5pc0VkaXQgPyAnZWRpdCcgOiAnY29uc3VsdCd9YDtcclxuICAgIH0sXHJcbiAgICBfY2xhc3NOYW1lOiBmdW5jdGlvbiBmb3JtQ2xhc3NOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiBgZm9ybS1ob3Jpem9udGFsICR7dGhpcy5wcm9wcy5zdHlsZS5jbGFzc05hbWV9YDtcclxuICAgIH0sXHJcbiAgICBfcmVuZGVyQWN0aW9uczogZnVuY3Rpb24gcmVuZGVyQWN0aW9ucygpIHtcclxuICAgICAgICBpZiAodGhpcy5yZW5kZXJBY3Rpb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckFjdGlvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaXNFZGl0ID8gdGhpcy5fcmVuZGVyRWRpdEFjdGlvbnMoKSA6IHRoaXMuX3JlbmRlckNvbnN1bHRBY3Rpb25zKCk7XHJcbiAgICB9LFxyXG4gICAgX3JlbmRlckVkaXRBY3Rpb25zOiBmdW5jdGlvbiBfcmVuZGVyRWRpdEFjdGlvbnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRWRpdEFjdGlvbnMgPyB0aGlzLnJlbmRlckVkaXRBY3Rpb25zKCkgOiAoXHJcbiAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICB7dGhpcy5idXR0b25TYXZlKCl9XHJcbiAgICAgICAgICAgIHt0aGlzLmJ1dHRvbkNhbmNlbCgpfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICBfcmVuZGVyQ29uc3VsdEFjdGlvbnM6IGZ1bmN0aW9uIF9yZW5kZXJDb25zdWx0QWN0aW9ucygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJDb25zdWx0QWN0aW9ucyA/IHRoaXMucmVuZGVyQ29uc3VsdEFjdGlvbnMoKSA6IChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMuaGFzRWRpdCAmJiB0aGlzLmJ1dHRvbkVkaXQoKX1cclxuICAgICAgICAgICAge3RoaXMucHJvcHMuaGFzRGVsZXRlICYmIHRoaXMuYnV0dG9uRGVsZXRlKCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEhhbmRsZSB0aGUgZm9ybSBzdWJtaXNzaW9uLlxyXG4gICAgKiBAcGFyYW0ge0V2ZW50fSBlIC0gUmVhY3Qgc2FuaXR5emUgZXZlbnQgZnJvbSB0aGUgZm9ybSBzdWJtaXQuXHJcbiAgICAqL1xyXG4gICAgX2hhbmRsZVN1Ym1pdEZvcm0oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZih0aGlzLl92YWxpZGF0ZSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uLnNhdmUuY2FsbCh0aGlzLCB0aGlzLl9nZXRFbnRpdHkoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3N0YXRlIGZvcm0nLCB0aGlzLnN0YXRlKTtcclxuICAgICAgICBpZih0aGlzLnByb3BzLmhhc0Zvcm0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT17dGhpcy5fY2xhc3NOYW1lKCl9IGRhdGEtbG9hZGluZz17dGhpcy5zdGF0ZS5pc0xvYWRpbmd9IGRhdGEtbW9kZT17dGhpcy5fbW9kZSgpfSBub1ZhbGlkYXRlIG9uU3VibWl0PXt0aGlzLl9oYW5kbGVTdWJtaXRGb3JtfSA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGZpZWxkc2V0Pnt0aGlzLnJlbmRlckNvbnRlbnQoKX08L2ZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoZm9ybU1peGluKTtcclxuIl19