import builder from 'focus-core/component/builder';
import React from 'react';
// Common mixins.
import definitionMixin from '../definition';
import builtInComponents from '../built-in-components';
import storeBehaviour from '../store-behaviour';
import ownIdentifierBehaviour from '../own-identifier';
//Form mixins.
import { actionBehaviour, referenceBehaviour, validationBehaviour } from './mixin';

/**
* Mixin to create a block for the rendering.
* @type {Object}
*/
let formMixin = {
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
    getInitialState() {
        return {
            /**
            * Identifier of the entity.
            * @type {[type]}
            */
            id: this.props.id,
            isEdit: this.props.isEdit
        };
    },
    componentWillReceiveProps(newProps = {}) {
        let { isEdit } = newProps;
        if (isEdit !== undefined) {
            this.setState({ isEdit: isEdit })
        }
    },
    /** @inheritdoc */
    callMountedActions() {
        if (this.props.hasLoad) {
            this._loadData();
        }
    },
    /** @inheritdoc */
    componentWillMount() {
        //Build the definitions.
        if (this.registerListeners) {
            this.registerListeners();
        }
        if (this.callMountedActions) {
            this.callMountedActions();
        }
    },
    /** @inheritdoc */
    componentWillUnmount() {
        if (this.unregisterListeners) {
            this.unregisterListeners();
        }
    },
    _mode() {
        return `${this.state.isEdit ? 'edit' : 'consult'}`;
    },
    _className() {
        return `form-horizontal ${this.props.style.className}`;
    },
    _renderActions() {
        if (this.renderActions) {
            return this.renderActions();
        }
        return this.state.isEdit ? this._renderEditActions() : this._renderConsultActions();
    },
    _renderEditActions() {
        return this.renderEditActions ? this.renderEditActions() : (
            <span>
                {this.buttonSave()}
                {this.buttonCancel()}
            </span>
        );
    },
    _renderConsultActions() {
        return this.renderConsultActions ? this.renderConsultActions() : (
            <div>
                {this.props.hasEdit && this.buttonEdit()}
                {this.props.hasDelete && this.buttonDelete()}
            </div>
        );
    },
    /**
    * Handle the form submission.
    * @param {Event} e - React sanityze event from the form submit.
    */
    _handleSubmitForm(e) {
        e.preventDefault();
        if (this._validate()) {
            this.action.save.call(this, this._getEntity());
        }
        //return false;
    },
    /** @inheritdoc */
    render() {
        //console.log('state form', this.state);
        if (this.props.hasForm) {
            return (
                <form className={this._className()} data-loading={this.state.isLoading} data-mode={this._mode()} noValidate onSubmit={this._handleSubmitForm} >
                    <fieldset>{this.renderContent()}</fieldset>
                </form>
            );
        }
        return this.renderContent();
    }
};

const { mixin, component } = builder(formMixin);
export { mixin, component };
export default { mixin, component };
