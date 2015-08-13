var builder = require('focus').component.builder;


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
     * Render the component.
     * @returns {JSX} Htm code.
     */
    render: function renderStickyNavigation(){
        return <h3 id={this.props.id} data-menu>{this.props.title}</h3>
    }

};

module.exports =  builder(titleMixin);
