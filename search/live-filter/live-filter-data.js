/**@jsx*/
var builder = require('focus/component/builder');
var React = require('react');

var liveFilterDataMixin = {

    /**
     * Display name.
     */
    displayName: "live-filter-data",

    /**
     * Render the component.
     * @returns Html code of the component.
     */
    render: function renderFacet(){
        return(<div className="lf-data" onClick={this.selectFacetData}>{this.renderData()} </div>);
    },

    /**
     * Render the data.
     * @returns Html generated code.
     */
    renderData: function renderData() {
        if(this.props.type == "text") {
            return this.props.data.label + " (" + this.props.data.count + ")";
        }
        throw new Error("Unknown property type : " + this.props.type);
    },

    /**
     * Action of selection.
     */
    selectFacetData: function selectFacetDetail() {
        return this.props.selectHandler(this.props.dataKey, this.props.data);
    }
}

module.exports = builder(liveFilterDataMixin);
