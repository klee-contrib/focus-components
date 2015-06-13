// Dependencies

let builder = require('focus').component.builder;
let React = require('react');

// Components

let FacetData = require('./facet-data').component;

let Facet = {
    /**
     * Component's mixins
     */
    mixins: [require('../../common/i18n/mixin')],
    /**
     * Display name.
     */
    displayName: 'facet',
    /**
     * Init the component state.
     * @returns {object} Initial state.
     */
    getInitialState() {
        return {
            isShowAll: false
        };
    },
    /**
     * Init the default props.
     * @returns {object} Initial state.
     */
    getDefaultProps() {
        return {
            nbDefaultDataList: 6
        };
    },
    /**
     * Render the component.
     * @returns {XML} Html component code.
     */
    render() {
        let className = 'facet';
        if (this.props.selectedDataKey) {
            className += '-selected';
        } else if (this.props.isExpanded) {
            className += '-expanded';
        } else {
            className += '-collapsed';
        }
        return (
            <div className={className} data-focus='facet'>
                {this._renderFacetTitle()}
                {this._renderFacetDataList()}
            </div>);
    },
    /**
     * Render the component title.
     * @returns {XML} Html component code.
     */
    _renderFacetTitle() {
        let title = this.i18n('live.filter.facets.' + this.props.facetKey); // Default facet translation path is live.filter.facets.
        if (this.props.selectedDataKey) {
            title += ' : ' + this.props.facet[this.props.selectedDataKey].label;
        }
        return (
            <div data-focus='facet-title' onClick={this._facetTitleClickHandler}>
                <h3>{title}</h3>
            </div>
        );
    },
    /**
     * Action on facet title click.
     */
    _facetTitleClickHandler() {
        this.props.expandHandler(this.props.facetKey, !this.props.isExpanded);
        if (this.props.selectedDataKey) {
            this.props.selectHandler(this.props.facetKey, undefined, undefined);
        }
        this.setState({
            isExpanded: !this.props.isExpanded,
            isShowAll: false
        });
    },
    /**
     * Render the list of data of the facet.
     * @returns {XML} Html component code.
     */
    _renderFacetDataList() {
        if (!this.props.isExpanded || this.props.selectedDataKey) {
            return '';
        }
        return (
            <div className='' data-focus='facet-data-list'>
                <ul>
                    {Object.keys(this.props.facet).slice(0, this.props.nbDefaultDataList).map((key) => {
                        return (
                            <li key={key}>
                                <FacetData dataKey={key} data={this.props.facet[key]} selectHandler={this._facetDataSelectionHandler}
                                    type={this.props.type}/>
                            </li>
                        );
                    })}
                </ul>
                <div data-focus="facet-data-show-all">
                    {this._renderShowAllDataList()}
                </div>
            </div>);
    },
    /**
     * Action on facet data selection.
     * @param {string} dataKey Key of the selected data.
     * @param {string} data Selected data.
     */
    _facetDataSelectionHandler(dataKey, data) {
        this.props.expandHandler(this.props.facetKey, false);
        this.props.selectHandler(this.props.facetKey, dataKey, data);
    },
    /**
     * Render all the data facets.
     * @returns {XML} Html component code.
     */
    _renderShowAllDataList() {
        if (!this.state.isShowAll && Object.keys(this.props.facet).length > this.props.nbDefaultDataList) {
            return (
                <a href='javascript:void(0);' data-focus='facet-show-all' onClick={this._showAllHandler}>
                    {this.i18n('show.all')}
                </a>
            );
        }
    },
    /**
     * Action on 'show all' action.
     */
    _showAllHandler() {
        this.setState({isShowAll: !this.state.isShowAll});
    }
};

module.exports = builder(Facet);
