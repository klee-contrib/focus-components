// Dependencies
'use strict';

var builder = require('focus').component.builder;
var type = require('focus').component.types;

var titleMixin = {

    /**
     * Display name.
     */
    displayName: "title",

    /**
     * Default propos.
     * @returns {object} Default props.
     */
    getDefaultProps: function getDefaultProps() {
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
    render: function renderStickyNavigation() {
        var _props = this.props;
        var id = _props.id;
        var title = _props.title;

        return React.createElement(
            'h3',
            { id: id, 'data-spy': true },
            title
        );
    }

};

module.exports = builder(titleMixin);