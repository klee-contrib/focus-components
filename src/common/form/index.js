let builder = require('focus').component.builder;
let React = require('react');

// Common mixins.
let definitionMixin = require('../mixin/definition');
//let fieldComponentBehaviour = require('../mixin/field-component-behaviour');
let builtInComponents = require('../mixin/built-in-components');
let storeBehaviour = require('../mixin/store-behaviour');
let ownIdentifierBehaviour = require('../mixin/own-identifier');
//Form mixins.
let { actionBehaviour, referenceBehaviour, validationBehaviour} = require('./mixin');

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
    componentWillReceiveProps(newProps = {}){
        let {isEdit} = newProps;
        if(isEdit !== undefined){
            this.setState({isEdit: isEdit})
        }
    },
    /** @inheritdoc */
    callMountedActions: function formCallMountedActions() {
        if(this.props.hasLoad){
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
    _mode: function(){
        return `${this.state.isEdit ? 'edit' : 'consult'}`;
    },
    _className: function formClassName() {
        return `form-horizontal ${this.props.style.className}`;
    },
    _renderActions: function renderActions(){
        if (this.renderActions) {
            return this.renderActions();
        }
        return this.state.isEdit ? this._renderEditActions() : this._renderConsultActions();
    },
    _renderEditActions: function _renderEditActions(){
        return this.renderEditActions ? this.renderEditActions() : (
            <span>
            {this.buttonSave()}
            {this.buttonCancel()}
            </span>
        );
    },
    _renderConsultActions: function _renderConsultActions(){
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
        if(this._validate()){
            this.action.save.call(this, this._getEntity());
        }
        //return false;
    },
    /** @inheritdoc */
    render() {
        //console.log('state form', this.state);
        if(this.props.hasForm){
            return (
                <form
                    onSubmit={this._handleSubmitForm}
                    className={this._className()}
                    data-mode={this._mode()}
                    data-loading={this.state.isLoading}
                    >
                    <fieldset>
                        {this.renderContent()}
                    </fieldset>
                </form>
            );
        }
        return this.renderContent();
    }
};

module.exports = builder(formMixin);
