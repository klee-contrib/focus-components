/**@jsx*/
var builder = require('focus/component/builder');
var React = require('react');
var LiveFilterFacet = require('./live-filter-facet').component;
var type = require('focus/component/types');
var assign = require('object-assign');
var omit = require('lodash/object/omit');

var liveFilterMixin = {

    /**
     * Display name.
     */
    displayName: "live-filter",

    /**
     * Init the default properties
     * @returns {{facetList: {}, selectedFacetList: {}, openedFacetList: {}, config: {}, dataSelectionHandler: undefined}}
     */
    getDefaultProps: function() {
        return {
            facetList: {},
            selectedFacetList: {},
            openedFacetList: {},
            config: {},
            dataSelectionHandler: undefined
        }
    },

    /**
     * List property validation.
     */
    propTypes:{
        facetList: type('object'),
        selectedFacetList: type('object'),
        openedFacetList: type('object'),
        config: type('object'),
        dataSelectionHandler: type('func')
    },

    /**
     * Init the state of the component.
     * @returns {
     *  {isExpanded: boolean True if the component is expanded, false if collapsed,
     *   openedFacetList: Map (key : facetKey, value : true if facet expanded)}
     *   }
     */
    getInitialState: function(){
        var openedFacetList = this.props.openedFacetList;
        if(Object.keys(openedFacetList).length == 0) {
            for (var key in this.props.facetList) {
                openedFacetList[key] = true;
                break;
            }
        }
        return {
            isExpanded: true,
            openedFacetList:  openedFacetList
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
        for(var key in this.props.facetList) {
            var selectedDataKey = this.props.selectedFacetList[key] ? this.props.selectedFacetList[key].key : undefined;
            facets.push(<LiveFilterFacet facetKey={key}
                                                facet={this.props.facetList[key]}
                                                selectedDataKey = {selectedDataKey}
                                                isExpanded={this.state.openedFacetList[key]}
                                                expandHandler={this.expandFacetHandler}
                                                selectHandler={this.selectHandler}
                                                type={this.props.config[key]}/>);
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
        var result = {openedFacetList: this.state.openedFacetList};
        if(dataKey == undefined) {
            result["selectedFacetList"] = omit(this.props.selectedFacetList, facetKey);
        } else {
            result["selectedFacetList"] = assign(this.props.selectedFacetList,  {[facetKey] : {key: dataKey, data: data}});
        }
        this.props.dataSelectionHandler(result);
    },

    /**
     * Expand facet action.
     * @param facetKey Key of the facet.
     * @param isExpanded true if expand action, false if collapse action.
     */
    expandFacetHandler: function expandFacetHandler(facetKey, isExpanded) {
        var openedFacetList = this.state.openedFacetList;
        openedFacetList[facetKey] = isExpanded;
        this.setState({openedFacetList: openedFacetList});
    }
}

module.exports = builder(liveFilterMixin);
