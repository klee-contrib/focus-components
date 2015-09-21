// Dependencies

const builder = require('focus-core').component.builder;
const React = require('react');
const ArgumentInvalidException = require('focus-core').exception.ArgumentInvalidException;
const numberFormatter = require('focus-core').definition.formatter.number;

const FacetData = {
    getDefaultProps() {
        return ({
            type: 'text'
        });
    },
    /**
     * Display name.
     */
    displayName: 'facet-data',
    /**
     * Render the component.
     * @returns {XML} Html code of the component.
     */
    render() {
        return(
            <div data-focus='facet-data' onClick={this._selectFacetData}>
                {this._renderData()}
            </div>
        );
    },
    /**
     * Render the data.
     * @returns {string} Html generated code.
     */
    _renderData() {
        if(this.props.type == 'text') {
            return `${this.props.data.label} (${numberFormatter.format(this.props.data.count)})`;
        }
        throw new ArgumentInvalidException('Unknown property type : ' + this.props.type);
    },
    /**
     * Facet selection action handler.
     * @returns {function} the facet selection handler.
     */
    _selectFacetData() {
        return this.props.selectHandler(this.props.dataKey, this.props.data);
    }
};

module.exports = builder(FacetData);
