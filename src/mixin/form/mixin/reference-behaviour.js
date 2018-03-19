//Focus.reference.builder.loadListByName('papas').then(function(data){Focus.dispatcher.dispatch({action: {type: "update",data: {papas: data}}})})
import storeGetter from 'focus-core/reference/built-in-store';
import builtInActionReferenceLoader from 'focus-core/reference/built-in-action';
import difference from 'lodash/array/difference';

const referenceMixin = {

    /** @inheritdoc */
    getInitialState() {
        return { reference: {} };
    },

    /**
    * Build actions associated to the reference.
    */
    _buildReferenceActions(referenceNames) {
        if (!this.action) {
            this.action = {};
        }
        this.action.loadReference = builtInActionReferenceLoader(referenceNames);
    },

    _loadReference() {
        return this.action.loadReference();
    },

    /**
    * Build the reference names and set the store into the application.
    */
    _buildReferenceStoreConfig(referenceNames, oldReferenceNames) {
        const safeReferenceNames = referenceNames || [];
        const safeOldReferenceNames = oldReferenceNames || [];

        if (this.addStoreSub && this.removeStoreSub) {
            const toAdd = difference(safeReferenceNames, safeOldReferenceNames);
            const toDelete = difference(safeOldReferenceNames, safeReferenceNames);

            toAdd.forEach((name) => this.addStoreSub(storeGetter(), name));
            toDelete.forEach((name) => this.removeStoreSub(storeGetter(), name));

        } else {
            // LEGACY CODE : if ever some project uses reference-behaviour without store-behaviour
            if (!this.stores) {
                this.stores = [];
            }
            //Set as referencestore the referencestore of the application.
            this.stores.push({
                store: storeGetter(),
                properties: this.referenceNames
            });
        }
    },

    componentWillReceiveProps({ referenceNames }) {
        if (referenceNames) {
            const shouldReload = difference(referenceNames, this.referenceNames).length > 0;
            this._buildReference(referenceNames, this.referenceNames);
            if (shouldReload) {
                this._loadReference();
            }
        }
    },

    /**
    * Build store and actions related to the reference.
    */
    _buildReference(referenceNames, oldReferenceNames) {
        this._buildReferenceStoreConfig(referenceNames, oldReferenceNames);
        this._buildReferenceActions(referenceNames);
        this.referenceNames = referenceNames;
    },

    componentDidMount() {
        // Calling at didMount and not willMount to be coherent with old loadReference from form
        this._loadReference();
    },

    /** @inheritdoc */
    componentWillMount() {
        const referenceNames = this.props.referenceNames || this.referenceNames;
        this._buildReference(referenceNames);
    }
};

export default referenceMixin;
