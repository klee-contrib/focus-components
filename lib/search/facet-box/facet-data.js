// Dependencies

'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var ArgumentInvalidException = require('focus').exception.ArgumentInvalidException;
var numberFormatter = Focus.definition.formatter.number;

var FacetData = {
    getDefaultProps: function getDefaultProps() {
        return {
            type: 'text'
        };
    },
    /**
     * Display name.
     */
    displayName: 'facet-data',
    /**
     * Render the component.
     * @returns {XML} Html code of the component.
     */
    render: function render() {
        return React.createElement(
            'div',
            { 'data-focus': 'facet-data', onClick: this._selectFacetData },
            this._renderData()
        );
    },
    /**
     * Render the data.
     * @returns {string} Html generated code.
     */
    _renderData: function _renderData() {
        if (this.props.type == 'text') {
            return this.props.data.label + ' (' + numberFormatter.format(this.props.data.count) + ')';
        }
        throw new ArgumentInvalidException('Unknown property type : ' + this.props.type);
    },
    /**
     * Facet selection action handler.
     * @returns {function} the facet selection handler.
     */
    _selectFacetData: function _selectFacetData() {
        return this.props.selectHandler(this.props.dataKey, this.props.data);
    }
};

module.exports = builder(FacetData);