import React from 'react';
import builder from 'focus-core/component/builder';
import type from 'focus-core/component/types';
import {translate} from 'focus-core/translation';

let assign = require('object-assign');
let omit = require('lodash/object/omit');

// Components
let Facet = require('./facet').component;

// Mixins
let stylable = require('../../mixin/stylable');

let FacetBox = {
    /**
     * Component's mixins
     */
    mixins: [stylable],
    /**
     * Display name.
     */
    displayName: 'facet-box',
    /**
     * Init the default properties
     * @returns {object} Initial properties.
     */
    getDefaultProps: function () {
        return {
            facetList: {},
            selectedFacetList: {},
            openedFacetList: {},
            config: {}
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
    getInitialState: function () {
        let openedFacetList = this.props.openedFacetList;
        if (Object.keys(openedFacetList).length == 0) {
            this._generateOpenedFacetList(this.props.facetList);
        }
        return {
            isExpanded: true,
            openedFacetList
        };
    },
    /**
     * New properties set event handle
     * @param {Object} nextProps
     */
    componentWillReceiveProps(nextProps) {
        let openedFacetList = nextProps.openedFacetList;
        if (Object.keys(openedFacetList).length == 0) {
            openedFacetList = this._generateOpenedFacetList(nextProps.facetList);
        }
        this.setState({openedFacetList});
    },
    _generateOpenedFacetList(facetList) {
        return Object.keys(facetList).reduce(function (list, facetKey) {
            list[facetKey] = true;
            return list;
        }, {});
    },
    /**
     * Render the component.
     * @returns {XML} Html code.
     */
    render() {
        let className = '';
        if (this.state.isExpanded) {
            className += ' expanded';
        } else {
            className += ' collapsed';
        }
        return (
            <div className={`${this._getStyleClassName() + className}`} data-focus='facet-box'>
                {this._renderFacetBoxTitle()}
                {this._renderFacetList()}
            </div>
        );
    },
    /**
     * Render the div title of the component.
     * @returns {XML} Html content.
     */
    _renderFacetBoxTitle() {
        let title = this.state.isExpanded ? translate('live.filter.title') : '';
        //TODO onClick={this._facetBoxTitleClickHandler} (le repli doit aussi etre porté par le data-focus=advanced-search
        return (
            <div data-focus="facet-box-heading" onClick={this._facetBoxTitleClickHandler}>
                <h2>{title}</h2>
            </div>
        );
    },
    /**
     * Render the list of the facets.
     * @returns {XML} Html content.
     */
    _renderFacetList() {
        if (!this.state.isExpanded) {
            return '';
        }
        return (
            <div data-focus="facet-box-body">
                {this.props.facetList.map((facet) => {
                    let selectedDataKey = this.props.selectedFacetList[facet.code] ? this.props.selectedFacetList[facet.code].key : undefined;
                    if (selectedDataKey || Object.keys(facet).length > 1) {
                        return (
                            <Facet facetKey={facet.code} key={facet.code}
                                facet={facet}
                                selectedDataKey={selectedDataKey}
                                isExpanded={this.state.openedFacetList[facet.code]}
                                expandHandler={this._facetExpansionHandler}
                                selectHandler={this._facetSelectionHandler}
                                type={this.props.config[facet.code]}
                                />
                        );
                    }
                })}
            </div>);
    },
    /**
     * Action on title click.
     * Hide / Expand the component.
     */
    _facetBoxTitleClickHandler() {
        this.setState({isExpanded: !this.state.isExpanded});
    },
    /**
     * Facet selection action handler.
     * @param {string} facetKey Key of the selected facet.
     * @param {string} dataKey Key of the selceted data.
     * @param {object} data Content of the selected data facet.
     */
    _facetSelectionHandler(facetKey, dataKey, data) {
        let result = {openedFacetList: this.state.openedFacetList};
        if (dataKey == undefined) {
            result.selectedFacetList = omit(this.props.selectedFacetList, facetKey);
        } else {
            result.selectedFacetList = assign(this.props.selectedFacetList, {[facetKey]: {key: dataKey, data: data}});
        }
        this.props.dataSelectionHandler(result);
    },
    /**
     * Expand facet action handler.
     * @param {string} facetKey Key of the facet.
     * @param {string} isExpanded true if expand action, false if collapse action.
     */
    _facetExpansionHandler(facetKey, isExpanded) {
        let openedFacetList = this.state.openedFacetList;
        openedFacetList[facetKey] = isExpanded;
        this.setState({openedFacetList: openedFacetList});
    }
};

module.exports = builder(FacetBox);
