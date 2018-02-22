import PropTypes from 'prop-types';
import React from 'react';
import builder from 'focus-core/component/builder';
import { translate } from 'focus-core/translation';

import isObject from 'lodash/lang/isObject';
import uniqueId from 'lodash/utility/uniqueId';
// Components
import { component as FacetData } from './facet-data';

const Facet = {
    /**
     * Display name.
     */
    displayName: 'Facet',
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
    propTypes: {
        facet: PropTypes.array,
        isShowAll: PropTypes.bool,
        nbDefaultDataList: PropTypes.number
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
        let title = translate('live.filter.facets.' + this.props.facetKey); // Default facet translation path is live.filter.facets.
        if (this.props.selectedDataKey) {
            let facetLabel = '';
            const facet = this.props.facet && isObject(this.props.facet[this.props.selectedDataKey]) ? this.props.facet[this.props.selectedDataKey].label : this.props.facet.find(elm => elm.label === this.props.selectedDataKey);
            if (facet) {
                facetLabel = facet.label
            }
            title = `${title} : ${facetLabel}`;
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
        // The parsed facets are now an array
        const facetValues = this.state.isShowAll ? this.props.facet : this.props.facet.slice(0, this.props.nbDefaultDataList);
        return (
            <div className='' data-focus='facet-data-list'>
                <ul>
                    {facetValues.map(facetValue => {
                        return (
                            <li key={uniqueId('facet-item')}>
                                <FacetData
                                    dataKey={facetValue.label}
                                    data={facetValue}
                                    selectHandler={this._facetDataSelectionHandler}
                                    type={this.props.type}
                                />
                            </li>
                        );
                    })}
                </ul>
                <div data-focus='facet-data-show-all'>
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
                    {translate('show.all')}
                </a>
            );
        }
    },
    /**
     * Action on 'show all' action.
     */
    _showAllHandler() {
        this.setState({ isShowAll: !this.state.isShowAll });
    }
};

const { mixin, component } = builder(Facet);
export { mixin, component };
export default { mixin, component };