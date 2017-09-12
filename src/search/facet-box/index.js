import React from 'react';
import builder from 'focus-core/component/builder';
import type from 'focus-core/component/types';
import { translate } from 'focus-core/translation';
import assign from 'object-assign';
import omit from 'lodash/object/omit';

// Components
import { component as Facet } from './facet';
// Mixins
import stylable from '../../mixin/stylable';

const FacetBox = {
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
    getDefaultProps() {
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
    getInitialState() {
        const openedFacetList = this._generateOpenedFacetList(this.props.openedFacetList, this.props.facetList);
        return {
            isExpanded: true,
            openedFacetList
        };
    },
    /**
     * New properties set event handle
     * @param {Object} nextProps nextProps
     */
    componentWillReceiveProps(nextProps) {
        const openedFacetList = this._generateOpenedFacetList(nextProps.openedFacetList, nextProps.facetList);
        this.setState({ openedFacetList });
    },
    _generateOpenedFacetList(openedFacetList, facetList) {
        if (openedFacetList.length === 0) {
            return Object.keys(facetList).reduce((list, facetKey) => {
                list[facetKey] = true;
                return list;
            }, {});
        } else {
            return openedFacetList;
        }
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
            <div data-focus='facet-box-heading' onClick={this._facetBoxTitleClickHandler}>
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
            <div data-focus='facet-box-body'>
                {Object.keys(this.props.facetList).map((facetKey) => {
                    let facet = this.props.facetList[facetKey];
                    let selectedDataKey = this.props.selectedFacetList[facetKey] ? this.props.selectedFacetList[facetKey].key : undefined;
                    if (selectedDataKey || Object.keys(facet).length > 1) {
                        return (
                            <Facet facetKey={facetKey} key={facetKey}
                                facet={facet}
                                selectedDataKey={selectedDataKey}
                                isExpanded={this.state.openedFacetList[facetKey]}
                                expandHandler={this._facetExpansionHandler}
                                selectHandler={this._facetSelectionHandler}
                                type={this.props.config[facetKey]}
                            />
                        );
                    }
                })}
            </div>
        );
    },
    /**
     * Action on title click.
     * Hide / Expand the component.
     */
    _facetBoxTitleClickHandler() {
        this.setState({ isExpanded: !this.state.isExpanded });
    },
    /**
     * Facet selection action handler.
     * @param {string} facetKey Key of the selected facet.
     * @param {string} dataKey Key of the selceted data.
     * @param {object} data Content of the selected data facet.
     */
    _facetSelectionHandler(facetKey, dataKey, data) {
        let result = { openedFacetList: this.state.openedFacetList };
        if (dataKey == undefined) {
            result.selectedFacetList = omit(this.props.selectedFacetList, facetKey);
        } else {
            result.selectedFacetList = assign(this.props.selectedFacetList, { [facetKey]: { key: dataKey, data: data } });
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
        this.setState({ openedFacetList: openedFacetList });
    }
};

const builtComp = builder(FacetBox);
const { component, mixin } = builtComp;

export {
    component,
    mixin
}
export default builtComp;
