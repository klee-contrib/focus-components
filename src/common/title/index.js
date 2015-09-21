// Dependencies
const builder = require('focus-core').component.builder;
const type = require('focus-core').component.types;
const {uniqueId} = require('lodash/utility');


const titleMixin = {

    /**
    * Display name.
    */
    displayName: 'Title',
    /** @inheritDoc */
    getInitialState() {
        return {
            spyId: uniqueId('title_')
        };
    },
    /**
    * Props validation
    */
    propTypes: {
        id: type('string'),
        label: type('string')
    },
    /**
    * Render the component.
    * @returns {JSX} Htm code.
    */
    render() {
        const {spyId} = this.state;
        const {id, label} = this.props;
        return <h3 data-spy={spyId} id={id}>{label}</h3>;
    }
};

module.exports = builder(titleMixin);
