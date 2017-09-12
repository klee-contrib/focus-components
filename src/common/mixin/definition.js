//Dependencies.
/**
* Accessor on the entity informations.
* @type {function} - Get the entity definition for a given key.
*/
import { getEntityInformations } from 'focus-core/definition/entity/builder';

const definitionMixin = {
    /**
    * Build the entity definition givent the path of the definition.
    */
    _buildDefinition() {
        if (!this.definitionPath) {
            throw new Error('the definition path should be defined to know the domain of your entity property.');
        }
        this.definition = getEntityInformations(this.definitionPath, this.additionalDefinition);
    },
    /** @inheritdoc */
    componentWillMount() {
        this._buildDefinition();
    }
};

export default definitionMixin;
