/**@jsx*/
var builder = require('focus').component.builder;
var React = require('react');
var LiveFilterFacet = require('./live-filter-facet').component;
var type = require('focus').component.types;
var assign = require('object-assign');
var omit = require('lodash/object/omit');
var Img = require('../../common/img').component;

var liveFilterMixin = {
    mixins: [require('../../common/i18n/mixin')],
    /**
     * Display name.
     */
    displayName: 'live-filter',
    /**
     * Init the default properties
     * @returns {object} Initial properties.
     */
    getDefaultProps: function() {
        return {
            facetList: {},
            selectedFacetList: {},
            openedFacetList: {},
            config: {},
            dataSelectionHandler: undefined
        };
    },
    /**
     * List property validation.
     */
    propTypes: {
        facetList: type('object'),
        selectedFacetList: type('object'),
        openedFacetList: type('object'),
        config: type('object'),
        dataSelectionHandler: type('func')
    },
    /**
     * Init the state of the component.
     * @returns {object} Iitial state.
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
            openedFacetList: openedFacetList
        };
    },
    /**
     * Render the component.
     * @returns {XML} Html code.
     */
    render: function renderLiverFilter(){
        var className = 'panel live-filter';
        if(this.state.isExpanded) {
            className += ' expanded';
        } else {
            className += ' collapsed';
        }

        return (<div className={className} >
                {this.renderLiveFacetTitle()}
                {this.renderFilterFacetList()}
            </div>);
    },
    /**
     * Render the div title of the component.
     * @returns {XML} Hatml content.
     */
    renderLiveFacetTitle: function renderLiveFacetTitle() {
        var title = this.state.isExpanded ? this.i18n('live.filter.title') : '';
        var img = this.state.isExpanded ? 'chevron-thin-left' : 'chevron-thin-right';
        return (<div className="panel-heading">
                    <span>{title}</span>
                    <Img src={img} onClick={this.liveFilterTitleClick} />
                </div>);
    },
    /**
     * Render the list of the facets.
     * @returns {XML} Html content.
     */
    renderFilterFacetList: function renderFilterFacetList(){
        if(!this.state.isExpanded) {
            return '';
        }
        var facets = [];
        for(var key in this.props.facetList) {
            var facet = this.props.facetList[key];
            var selectedDataKey = this.props.selectedFacetList[key] ? this.props.selectedFacetList[key].key : undefined;
            if(selectedDataKey || Object.keys(facet).length > 1) {
                facets.push(<LiveFilterFacet facetKey={key} key={key}
                    facet={facet}
                    selectedDataKey = {selectedDataKey}
                    isExpanded={this.state.openedFacetList[key]}
                    expandHandler={this.expandFacetHandler}
                    selectHandler={this.selectHandler}
                    type={this.props.config[key]}/>);
            }
        }
        return (<div className="panel-body">{facets}</div>);
    },

    /**
     * Action on title click.
     * Hide / Expand the component.
     */
    liveFilterTitleClick: function liveFilterTitleClick() {
        this.setState({isExpanded: !this.state.isExpanded});
    },

    /**
     * Facet selection action handler.
     * @param {string} facetKey Key of the selected facet.
     * @param {string} dataKey Key of the selceted data.
     * @param {object} data Content of the selected data facet.
     */
    selectHandler: function selectLiverFilterHandler(facetKey, dataKey, data) {
        var result = {openedFacetList: this.state.openedFacetList};
        if(dataKey == undefined) {
            result.selectedFacetList = omit(this.props.selectedFacetList, facetKey);
        } else {
            result.selectedFacetList = assign(this.props.selectedFacetList, {[facetKey] : {key: dataKey, data: data}});
        }
        this.props.dataSelectionHandler(result);
    },

    /**
     * Expand facet action handler.
     * @param {string} facetKey Key of the facet.
     * @param {string} isExpanded true if expand action, false if collapse action.
     */
    expandFacetHandler: function expandFacetHandler(facetKey, isExpanded) {
        var openedFacetList = this.state.openedFacetList;
        openedFacetList[facetKey] = isExpanded;
        this.setState({openedFacetList: openedFacetList});
    }
};

module.exports = builder(liveFilterMixin);
