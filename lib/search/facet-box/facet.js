// Dependencies

'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var keys = require('lodash/object/keys');

// Components

var FacetData = require('./facet-data').component;

var Facet = {
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
    getInitialState: function getInitialState() {
        return {
            isShowAll: false
        };
    },
    /**
     * Init the default props.
     * @returns {object} Initial state.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            nbDefaultDataList: 6
        };
    },
    /**
     * Render the component.
     * @returns {XML} Html component code.
     */
    render: function render() {
        var className = 'facet';
        if (this.props.selectedDataKey) {
            className += '-selected';
        } else if (this.props.isExpanded) {
            className += '-expanded';
        } else {
            className += '-collapsed';
        }
        return React.createElement(
            'div',
            { className: className, 'data-focus': 'facet' },
            this._renderFacetTitle(),
            this._renderFacetDataList()
        );
    },
    /**
     * Render the component title.
     * @returns {XML} Html component code.
     */
    _renderFacetTitle: function _renderFacetTitle() {
        var title = this.i18n('live.filter.facets.' + this.props.facetKey); // Default facet translation path is live.filter.facets.
        if (this.props.selectedDataKey) {
            title += ' : ' + this.props.facet[this.props.selectedDataKey].label;
        }
        return React.createElement(
            'div',
            { 'data-focus': 'facet-title', onClick: this._facetTitleClickHandler },
            React.createElement(
                'h3',
                null,
                title
            )
        );
    },
    /**
     * Action on facet title click.
     */
    _facetTitleClickHandler: function _facetTitleClickHandler() {
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
    _renderFacetDataList: function _renderFacetDataList() {
        var _this = this;

        if (!this.props.isExpanded || this.props.selectedDataKey) {
            return '';
        }
        var keysList = this.state.isShowAll ? keys(this.props.facet) : keys(this.props.facet).slice(0, this.props.nbDefaultDataList);
        return React.createElement(
            'div',
            { className: '', 'data-focus': 'facet-data-list' },
            React.createElement(
                'ul',
                null,
                keysList.map(function (key) {
                    return React.createElement(
                        'li',
                        { key: key },
                        React.createElement(FacetData, { dataKey: key, data: _this.props.facet[key], selectHandler: _this._facetDataSelectionHandler,
                            type: _this.props.type })
                    );
                })
            ),
            React.createElement(
                'div',
                { 'data-focus': 'facet-data-show-all' },
                this._renderShowAllDataList()
            )
        );
    },
    /**
     * Action on facet data selection.
     * @param {string} dataKey Key of the selected data.
     * @param {string} data Selected data.
     */
    _facetDataSelectionHandler: function _facetDataSelectionHandler(dataKey, data) {
        this.props.expandHandler(this.props.facetKey, false);
        this.props.selectHandler(this.props.facetKey, dataKey, data);
    },
    /**
     * Render all the data facets.
     * @returns {XML} Html component code.
     */
    _renderShowAllDataList: function _renderShowAllDataList() {
        if (!this.state.isShowAll && Object.keys(this.props.facet).length > this.props.nbDefaultDataList) {
            return React.createElement(
                'a',
                { href: 'javascript:void(0);', 'data-focus': 'facet-show-all', onClick: this._showAllHandler },
                this.i18n('show.all')
            );
        }
    },
    /**
     * Action on 'show all' action.
     */
    _showAllHandler: function _showAllHandler() {
        this.setState({ isShowAll: !this.state.isShowAll });
    }
};

module.exports = builder(Facet);