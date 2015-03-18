var builder = require('focus').component.builder;


var titleMixin = {

    /**
     * Display name.
     */
    displayName: "title",

    /**
     * Default propos.
     * @returns {{id: i of the title, title: Title}}
     */
    getDefaultProps: function(){
        return {
            id: undefined,
            title: undefined
        };
    },

    /**
     * Render the component.
     * @returns Htm code.
     */
    render: function renderStickyNavigation(){
        return <h3 id={this.props.id} data-menu>{this.props.title}</h3>
    }

};

module.exports =  builder(titleMixin);
