/**@jsx*/
var builder = require('focus/component/builder');
var React = require('react');
var LiveFilter = require('../../search/live-filter').component;
var ActionBar = require('../../list/action-bar').component;

var searchResultMixin = {

    /**
     * Display name.
     */
    displayName: "search-result",

    /**
     * Init default props.
     */
    getDefaultProps: function() {
        return {
            facetList: {},
            config:{}
        }
    },
    /**
     * Init default state.
     */
    getInitialState: function() {
        return {
            facetList: this.props.facetList,
            selectedFacetList: {},
            openedFacetList: {}
        };
    },
    /**
     * render the component.
     * @returns Html code.
     */
    render: function renderSearchResult() {
        return (
            <div class="search-result">
                <LiveFilter ref="liveFilter"    facetList={this.state.facetList}
                                                selectedFacetList={this.state.selectedFacetList}
                                                openedFacetList={this.state.openedFacetList}
                                                config={this.props.config}
                                                dataSelectionHandler={this.facetSelectionHandler}/>
                <ActionBar />
            </div>
        );
    },

    facetSelectionHandler: function() {
        var facetComponentDate = this.refs.liveFilter.getValue();
        var selectedFacetList= facetComponentDate.selectedFacetList;
        var openedFacetList=facetComponentDate.openedFacetList;

        // Todo call the service
        console.warn("TODO : implement the search service ");
        console.log(selectedFacetList);

        // On search returns, we are waiting for a field "facetList". For the moment we keep the current facetList
        var facetList = this.state.facetList;

        // We update state with :
        // - Data from server : list of facets
        // - Data from client : list of opened facets, list of selected facets
        this.setState({
            facetList: facetList,
            selectedFacetList: selectedFacetList,
            openedFacetList: openedFacetList
        });
    }
}

module.exports = builder(searchResultMixin);
