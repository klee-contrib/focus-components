// Dependencies

let builder = require('focus').component.builder;
let React = require('react');
let type = require('focus').component.types;
let assign = require('object-assign');
let omit = require('lodash/object/omit');

// Components

let Facet = require('./facet').component;
let Img = require('../../common/img').component;

// Mixins

let stylable = require('../../mixin/stylable');
let i18n = require('../../common/i18n/mixin');

let FacetBox = {
    /**
     * Component's mixins
     */
    mixins: [stylable, i18n],
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
        let title = this.state.isExpanded ? this.i18n('live.filter.title') : '';
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
