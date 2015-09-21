//Focus.reference.builder.loadListByName('papas').then(function(data){Focus.dispatcher.dispatch({action: {type: "update",data: {papas: data}}})})

const refStoreGetter = require('focus-core').reference.getStore;
const builtInActionReferenceLoader = require('focus-core').reference.builtInAction;
const isEmpty = require('lodash/lang/isEmpty');
const referenceMixin = {
    /** @inheritdoc */
    /*  getDefaultProps: function getReferenceDefaultProps(){
    return {*/
    /**
    * Array which contains all the reference lists.
    * If the referenceNames are set into the object, they are set into the default props.
    * @type {Array}
    */
    /*  referenceNames: this.referenceNames || []
    };
    },*/
    getInitialState(){
        return {reference: {}};
    },
    /**
    * Build actions associated to the reference.
    */
    _buildReferenceActions(){
        this.action = this.action || {};
        this.action.loadReference = builtInActionReferenceLoader(this.referenceNames);
    },
    _loadReference(){
        return this.action.loadReference();
    },
    /**
    * Build the reference names and set the store into the application.
    */
    _buildReferenceStoreConfig(){
        //Get the store for references.
        const referenceStore = refStoreGetter();

        //If the reference store is empty don't do anything.
        if(isEmpty(this.referenceNames)){
            return;
        }
        this.stores = this.stores || [];
        //Set as referencestore the referencestore of the application.
        this.stores.push({
            store: referenceStore,
            properties: this.referenceNames
        });
    },
    /**
    * Build store and actions related to the reference.
    */
    _buildReference(){
        this._buildReferenceStoreConfig();
        this._buildReferenceActions();
    },
    /** @inheritdoc */
    componentWillMount(){
        this.referenceNames = this.props.referenceNames || this.referenceNames;
        this._buildReference();
    }
};

module.exports = referenceMixin;
