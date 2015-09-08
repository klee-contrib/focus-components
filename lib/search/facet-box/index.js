// Dependencies

'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var assign = require('object-assign');
var omit = require('lodash/object/omit');

// Components

var Facet = require('./facet').component;
var Img = require('../../common/img').component;

// Mixins

var stylable = require('../../mixin/stylable');
var i18n = require('../../common/i18n/mixin');

var FacetBox = {
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
    getDefaultProps: function getDefaultProps() {
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
    getInitialState: function getInitialState() {
        var openedFacetList = this.props.openedFacetList;
        if (Object.keys(openedFacetList).length == 0) {
            this._generateOpenedFacetList(this.props.facetList);
        }
        return {
            isExpanded: true,
            openedFacetList: openedFacetList
        };
    },
    /**
     * New properties set event handle
     * @param {Object} nextProps
     */
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var openedFacetList = nextProps.openedFacetList;
        if (Object.keys(openedFacetList).length == 0) {
            openedFacetList = this._generateOpenedFacetList(nextProps.facetList);
        }
        this.setState({ openedFacetList: openedFacetList });
    },
    _generateOpenedFacetList: function _generateOpenedFacetList(facetList) {
        return Object.keys(facetList).reduce(function (list, facetKey) {
            list[facetKey] = true;
            return list;
        }, {});
    },
    /**
     * Render the component.
     * @returns {XML} Html code.
     */
    render: function render() {
        var className = '';
        if (this.state.isExpanded) {
            className += ' expanded';
        } else {
            className += ' collapsed';
        }
        return React.createElement(
            'div',
            { className: '' + (this._getStyleClassName() + className), 'data-focus': 'facet-box' },
            this._renderFacetBoxTitle(),
            this._renderFacetList()
        );
    },
    /**
     * Render the div title of the component.
     * @returns {XML} Html content.
     */
    _renderFacetBoxTitle: function _renderFacetBoxTitle() {
        var title = this.state.isExpanded ? this.i18n('live.filter.title') : '';
        //TODO onClick={this._facetBoxTitleClickHandler} (le repli doit aussi etre porté par le data-focus=advanced-search
        return React.createElement(
            'div',
            { 'data-focus': 'facet-box-heading', onClick: this._facetBoxTitleClickHandler },
            React.createElement(
                'h2',
                null,
                title
            )
        );
    },
    /**
     * Render the list of the facets.
     * @returns {XML} Html content.
     */
    _renderFacetList: function _renderFacetList() {
        var _this = this;

        if (!this.state.isExpanded) {
            return '';
        }
        return React.createElement(
            'div',
            { 'data-focus': 'facet-box-body' },
            Object.keys(this.props.facetList).map(function (facetKey) {
                var facet = _this.props.facetList[facetKey];
                var selectedDataKey = _this.props.selectedFacetList[facetKey] ? _this.props.selectedFacetList[facetKey].key : undefined;
                if (selectedDataKey || Object.keys(facet).length > 1) {
                    return React.createElement(Facet, { facetKey: facetKey, key: facetKey,
                        facet: facet,
                        selectedDataKey: selectedDataKey,
                        isExpanded: _this.state.openedFacetList[facetKey],
                        expandHandler: _this._facetExpansionHandler,
                        selectHandler: _this._facetSelectionHandler,
                        type: _this.props.config[facetKey]
                    });
                }
            })
        );
    },
    /**
     * Action on title click.
     * Hide / Expand the component.
     */
    _facetBoxTitleClickHandler: function _facetBoxTitleClickHandler() {
        this.setState({ isExpanded: !this.state.isExpanded });
    },
    /**
     * Facet selection action handler.
     * @param {string} facetKey Key of the selected facet.
     * @param {string} dataKey Key of the selceted data.
     * @param {object} data Content of the selected data facet.
     */
    _facetSelectionHandler: function _facetSelectionHandler(facetKey, dataKey, data) {
        var result = { openedFacetList: this.state.openedFacetList };
        if (dataKey == undefined) {
            result.selectedFacetList = omit(this.props.selectedFacetList, facetKey);
        } else {
            var _assign;

            result.selectedFacetList = assign(this.props.selectedFacetList, (_assign = {}, _assign[facetKey] = { key: dataKey, data: data }, _assign));
        }
        this.props.dataSelectionHandler(result);
    },
    /**
     * Expand facet action handler.
     * @param {string} facetKey Key of the facet.
     * @param {string} isExpanded true if expand action, false if collapse action.
     */
    _facetExpansionHandler: function _facetExpansionHandler(facetKey, isExpanded) {
        var openedFacetList = this.state.openedFacetList;
        openedFacetList[facetKey] = isExpanded;
        this.setState({ openedFacetList: openedFacetList });
    }
};

module.exports = builder(FacetBox);