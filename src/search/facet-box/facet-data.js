// Dependencies

let builder = require('focus').component.builder;
let React = require('react');
let ArgumentInvalidException = require('focus').exception.ArgumentInvalidException;
let numberFormatter = Focus.definition.formatter.number;

let FacetData = {
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
