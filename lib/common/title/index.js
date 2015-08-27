// Dependencies
'use strict';

var builder = require('focus').component.builder;
var type = require('focus').component.types;

var _require = require('lodash/utility');

var uniqueId = _require.uniqueId;

var titleMixin = {

    /**
    * Display name.
    */
    displayName: 'Title',
    /** @inheritDoc */
    getInitialState: function getInitialState() {
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
    render: function render() {
        var spyId = this.state.spyId;
        var _props = this.props;
        var id = _props.id;
        var label = _props.label;

        return React.createElement(
            'h3',
            { 'data-spy': spyId, id: id },
            label
        );
    }
};

module.exports = builder(titleMixin);