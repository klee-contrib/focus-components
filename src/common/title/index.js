// Dependencies
const builder = require('focus').component.builder;
const type = require('focus').component.types;


var titleMixin = {

    /**
     * Display name.
     */
    displayName: "title",

    /**
     * Default propos.
     * @returns {object} Default props.
     */
    getDefaultProps: function(){
        return {
            id: undefined,
            title: undefined
        };
    },
    /**
    * Props validation
    */
    propTypes: {
        id: type('string'),
        title: type('string')
    },
    /**
     * Render the component.
     * @returns {JSX} Htm code.
     */
    render: function renderStickyNavigation(){
        const {id, title} = this.props;
        return <h3 id={id} data-spy>{title}</h3>
    }

};

module.exports =  builder(titleMixin);
