// Dependencies

'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var checkIsNotNull = require('focus').util.object.checkIsNotNull;
var type = require('focus').component.types;
var find = require('lodash/collection/find');

// Mixins

var translationMixin = require('../../common/i18n').mixin;
var infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
var referenceMixin = require('../../common/mixin/reference-property');

// Components

var Button = require('../../common/button/action').component;

var listMixin = {
    /**
    * Display name.
    */
    displayName: 'selection-list',

    /**
    * Mixin dependancies.
    */
    mixins: [translationMixin, infiniteScrollMixin, referenceMixin],

    /**
    * Default properties for the list.
    * @returns {{isSelection: boolean}} the default properties
    */
    getDefaultProps: function getListDefaultProps() {
        return {
            data: [],
            isSelection: true,
            selectionStatus: 'partial',
            selectionData: [],
            isLoading: false,
            operationList: [],
            idField: 'id'
        };
    },

    /**
    * list property validation.
    * @type {Object}
    */
    propTypes: {
        data: type('array'),
        idField: type('string'),
        isLoading: type('bool'),
        isSelection: type('bool'),
        lineComponent: type('func', true),
        loader: type('func'),
        onLineClick: type('func'),
        onSelection: type('func'),
        operationList: type('array'),
        selectionData: type('array'),
        selectionStatus: type('string')
    },

    /**
    * called before component mount
    */
    componentWillMount: function componentWillMount() {
        checkIsNotNull('lineComponent', this.props.lineComponent);
    },

    /**
    * Return selected items in the list.
    * @return {Array} selected items
    */
    getSelectedItems: function getSelectedItems() {
        var selected = [];
        for (var i = 1; i < this.props.data.length + 1; i++) {
            var lineName = 'line' + i;
            var lineValue = this.refs[lineName].getValue();
            if (lineValue.isSelected) {
                selected.push(lineValue.item);
            }
        }
        return selected;
    },

    /**
    * Render lines of the list.
    * @returns {*} DOM for lines
    */
    _renderLines: function _renderLines() {
        var _this = this;

        var lineCount = 1;
        var _props = this.props;
        var data = _props.data;
        var lineComponent = _props.lineComponent;
        var selectionStatus = _props.selectionStatus;
        var idField = _props.idField;
        var isSelection = _props.isSelection;
        var selectionData = _props.selectionData;
        var onSelection = _props.onSelection;
        var onLineClick = _props.onLineClick;
        var operationList = _props.operationList;

        return data.map(function (line) {
            var _find;

            var isSelected = undefined;
            var selection = find(selectionData, (_find = {}, _find[idField] = line[idField], _find));
            if (selection) {
                isSelected = selection.isSelected;
            } else {
                switch (selectionStatus) {
                    case 'none':
                        isSelected = false;
                        break;
                    case 'selected':
                        isSelected = true;
                        break;
                    case 'partial':
                        isSelected = undefined;
                        break;
                    default:
                        isSelected = false;
                }
            }
            return React.createElement(lineComponent, {
                key: line[idField],
                data: line,
                ref: 'line' + lineCount++,
                isSelection: isSelection,
                isSelected: isSelected,
                onSelection: onSelection,
                onLineClick: onLineClick,
                operationList: operationList,
                reference: _this._getReference()
            });
        });
    },
    _renderLoading: function _renderLoading() {
        if (this.props.isLoading) {
            if (this.props.loader) {
                return this.props.loader();
            }
            return React.createElement(
                'li',
                { className: 'sl-loading' },
                this.i18n('list.loading'),
                ' ...'
            );
        }
    },

    _renderManualFetch: function _renderManualFetch() {
        if (this.props.isManualFetch && this.props.hasMoreData) {
            var style = { className: 'primary' };
            return React.createElement(
                'li',
                { className: 'sl-button' },
                React.createElement(Button, {
                    handleOnClick: this.handleShowMore,
                    label: 'list.button.showMore',
                    style: style,
                    type: 'button'
                })
            );
        }
    },

    /**
    * Render the list.
    * @returns {XML} DOM of the component
    */
    render: function render() {
        return React.createElement(
            'ul',
            { 'data-focus': 'selection-list' },
            this._renderLines(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }
};

module.exports = builder(listMixin);