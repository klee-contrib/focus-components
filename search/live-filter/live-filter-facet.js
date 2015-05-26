/**@jsx*/
var builder = require('focus').component.builder;
var React = require('react');
var Data = require('./live-filter-data').component;

var liveFilterFacetMixin = {
    /**
     * Component's mixins
     */
    mixins: [require('../../common/i18n/mixin')],
    /**
     * Display name.
     */
    displayName: 'live-filter-facet',

    /**
     * Init the component state.
     * @returns {object} Initial state.
     */
    getInitialState: function(){
        return {
            isShowAll: false
        };
    },

    /**
     * Init the default props.
     * @returns {object} Initial state.
     */
    getDefaultProps: function getLiveFilterFacetDefaultProperties(){
        return {
            nbDefaultDataList: 6
        };
    },

    /**
     * Render the component.
     * @returns {XML} Html component code.
     */
    render: function renderLiverFilterFacet(){
        var className = 'panel panel-primary facet';
        if(this.props.selectedDataKey) {
            className += '-selected';
        } else if(this.props.isExpanded) {
            className += '-expanded';
        } else {
            className += '-collapsed';
        }
        return (
            <div className={className}>
                {this.renderLiveFilterFacetTitle()}
                {this.renderLiveFilterDataList()}
            </div>);
    },

    /**
     * Render the component title.
     * @returns {XML} Html component code.
     */
    renderLiveFilterFacetTitle: function renderLiveFilterFacetTitle() {
        var title = this.i18n('live.filter.facets.' + this.props.facetKey); // Default facet translation path is live.filter.facets.
        var className = 'panel-heading';
        if(this.props.selectedDataKey) {
            title += ' : ' + this.props.facet[this.props.selectedDataKey].label;
        }
        return (<div className={className} onClick={this.liveFilterFacetTitleClick}>{title}</div>);
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
     * @returns {XML} Html component code.
     */
    renderLiveFilterDataList: function renderLiveFilterDataList() {
        if(!this.props.isExpanded || this.props.selectedDataKey) {
            return '';
        }
        var facetDetailList = [];
        var i = 0;
        for(var key in this.props.facet) {
            if(!this.state.isShowAll && i >= this.props.nbDefaultDataList) {
                break;
            }
            facetDetailList.push(<li key={key}><Data dataKey={key} data={this.props.facet[key]} selectHandler={this.selectHandler} type={this.props.type} /></li>);
            i++;
        }
        return (<div className="panel-body"><ul>{facetDetailList}</ul> {this.renderShowAllDataList()}</div>);
    },

    /**
     * Action on facet data selection.
     * @param {string} dataKey Key of the selected data.
     * @param {string} data Selected data.
     */
    selectHandler: function selectHandler(dataKey, data) {
        this.props.expandHandler(this.props.facetKey, false);
        this.props.selectHandler(this.props.facetKey, dataKey, data);
    },

    /**
     * Render all the data facets.
     * @returns {XML} Html component code.
     */
    renderShowAllDataList: function renderShowAllDataList() {
        if(!this.state.isShowAll && Object.keys(this.props.facet).length > this.props.nbDefaultDataList) {
            return (<a href="javascript:void(0);" onClick={this.showAllHandler}> show.alls </a>);
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
