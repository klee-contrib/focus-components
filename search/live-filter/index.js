/**@jsx*/
var builder = require('focus/component/builder');
var React = require('react');
var LiveFilterFacet = require('./live-filter-facet').component;

var liveFilterMixin = {
    displayName: "live-filter",
    /**
     * Init the state of the component.
     * @returns {{isExpanded: boolean, selectedFacets: Array}}
     */
    getInitialState: function(){
        return {
            isExpanded: true,
            selectedFacetList: this.props.selectedFacetList || {},
            openedFacetList: this.props.openedFacetList || {}
        };
    },
    /**
     * Render the component.
     * @returns Html component code.
     */
    render: function renderLiverFilter(){
        var className = this.state.isExpanded ? "live-filter" : "live-filter collapsed";
        return(
            <div className={className}  >
                {this.renderLiveFacetTitle()}
                {this.renderFilterFacetList()}
            </div>
        );
    },
    /**
     * Render the div title of the component.
     * @Returns Html title code.
     */
    renderLiveFacetTitle: function renderLiveFacetTitle() {
        var title = this.state.isExpanded ? "live.filter.title" : "";
        return <div className="header">
                    <span className="title" >{title}</span>
                    <span className="icon" onClick={this.liveFilterTitleClick} >&nbsp;</span>
                </div>;
    },
    /**
     * Render the list of the facets.
     * @Returns Html facets code.
     */
    renderFilterFacetList: function renderFilterFacetList(){
        if(!this.state.isExpanded) {
            return
        }
        var facets = [];
        var isExpanded = Object.keys(this.state.openedFacetList).length == 0;
        for(var key in this.props.facetList) {
            var selectedDataKey = this.state.selectedFacetList[key] ? this.state.selectedFacetList[key].key : undefined;
            facets.push(<LiveFilterFacet facetKey={key}
                                                facet={this.props.facetList[key]}
                                                selectedDataKey = {selectedDataKey}
                                                isExpanded={isExpanded || this.state.openedFacetList[key]}
                                                expandHandler={this.expandFacetHandler}
                                                selectHandler={this.selectHandler}
                                                type={this.props.config[key]}/>);
            isExpanded = false;
        }
        return <div>{facets}</div>;
    },

    /**
     * Action on title click.
     * Hide / Expand the component.
     */
    liveFilterTitleClick: function liveFilterTitleClick() {
        this.setState({isExpanded: !this.state.isExpanded});
    },

    /**
     * Action on facet selection.
     */
    selectHandler : function selectLiverFilterHandler(facetKey, dataKey, data) {
        var selectedFacetList = this.state.selectedFacetList;
        if(dataKey == undefined) {
            delete selectedFacetList[facetKey];
        } else {
            selectedFacetList[facetKey] = {key: dataKey, data: data};
        }
        this.setState({selectedFacetList : selectedFacetList});

        this.props.handler(this.state.selectedFacetList);
    },
    expandFacetHandler: function expandFacetHandler(facetKey, isExpanded) {
        var openedFacetList = this.state.openedFacetList;
        openedFacetList[facetKey] = isExpanded;
        this.setState({openedFacetList: openedFacetList});
    },
    getValue: function getValue() {
        return {
            selectedFacetList: this.state.selectedFacetList,
            openedFacetList: this.state.openedFacetList
        };
        /*
        return {
            selectedFacetList: {
                "FCT_PAYS": {key: "FRA", data: {label:"France", count:6}}
            },
            openedFacetList: ["FCT_STATUS"]
        };*/
    }
}

module.exports = builder(liveFilterMixin);
