/**@jsx*/
var builder = require('focus/component/builder');
var React = require('react');
var Data = require('./live-filter-data').component;

var liveFilterFacetMixin = {

    /**
     * Display name.
     */
    displayName: "live-filter-facet",

    /**
     * Init the component state.
     * @returns {{isShowAll: true if all the facets must be displayed or just be limited to this.props.nbDefaultDataList }}
     */
    getInitialState: function(){
        return {
            isShowAll: false
        };
    },

    /**
     * Init the default props.
     * @returns {{nbDefaultDataList: default number of data facets displayed.}}
     */
    getDefaultProps: function getLiveFilterFacetDefaultProperties(){
        return {
            nbDefaultDataList: 6
        };
    },

    /**
     * Render the component.
     * @returns Html component code.
     */
    render: function renderLiverFilterFacet(){
        var className = this.props.isExpanded ? "lf-facet" : "lf-facet collapsed";
        if(this.props.selectedDataKey) {
            className = "lf-facet selected";
        }
        return (
            <div className={className}>
                {this.renderLiveFilterFacetTitle()}
                {this.renderLiveFilterDataList()}
            </div>);
    },

    /**
     * Render the component title.
     * @returns Html component code.
     */
    renderLiveFilterFacetTitle: function renderLiveFilterFacetTitle() {
        var title = this.props.facetKey;
        if(this.props.selectedDataKey) {
            title += " : " + this.props.facet[this.props.selectedDataKey].label
        }
        return <div className="title"  onClick={this.liveFilterFacetTitleClick}>{title}</div>
    },

    /**
     * Action on facet title click.
     */
    liveFilterFacetTitleClick: function liveFilterFacetTitleClick() {
        this.props.expandHandler(this.props.facetKey, !this.props.isExpanded);
        if(this.props.selectedDataKey) {
            this.props.selectHandler(this.props.facetKey, undefined, undefined);
        }
        this.setState({isExpanded: !this.props.isExpanded, isShowAll: false});
    },

    /**
     * Render the list of data of the facet.
     * @returns Html component code.
     */
    renderLiveFilterDataList: function renderLiveFilterDataList() {
        if(!this.props.isExpanded || this.props.selectedDataKey) {
            return
        }
        var facetDetailList = [];
        var i = 0;
        for(var key in this.props.facet) {
            if(!this.state.isShowAll && i >= this.props.nbDefaultDataList) {
                break;
            }
            facetDetailList.push(<li><Data dataKey={key} data={this.props.facet[key]} selectHandler={this.selectHandler} type={this.props.type} /></li>);
            i++;
        }
        return (<div><ul>{facetDetailList}</ul> {this.renderShowAllDataList()}</div>);
    },

    /**
     * Action on facet data selection.
     */
    selectHandler: function selectHandler(dataKey, data) {
        this.props.expandHandler(this.props.facetKey, false);
        this.props.selectHandler(this.props.facetKey, dataKey, data);
    },

    /**
     * Render all the data facets.
     * @returns Html component code.
     */
    renderShowAllDataList: function renderShowAllDataList() {
        if(!this.state.isShowAll && Object.keys(this.props.facet).length > this.props.nbDefaultDataList) {
            return (<div className="show-all" onClick={this.showAllHandler}> show.alls </div>) ;
        }
    },

    /**
     * Action on "show all" action.
     */
    showAllHandler: function showAllHandler() {
        this.setState({isShowAll: !this.state.isShowAll});
    }
}

module.exports = builder(liveFilterFacetMixin);
