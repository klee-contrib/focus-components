// Dependencies

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var checkIsNotNull = require('focus').util.object.checkIsNotNull;

var _require$component = require('focus').component;

var builder = _require$component.builder;
var types = _require$component.types;

var find = require('lodash/collection/find');

var _require = require('lodash/object');

var omit = _require.omit;

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
        buttonComponent: types('func'),
        data: types('array'),
        idField: types('string'),
        isLoading: types('bool'),
        isSelection: types('bool'),
        lineComponent: types('func', true),
        loader: types('func'),
        onLineClick: types('func'),
        onSelection: types('func'),
        operationList: types('array'),
        selectionData: types('array'),
        selectionStatus: types('string')
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
        var Line = _props.lineComponent;
        var selectionData = _props.selectionData;
        var idField = _props.idField;
        var selectionStatus = _props.selectionStatus;

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
            return React.createElement(Line, _extends({
                data: line,
                isSelected: isSelected,
                key: line[idField],
                ref: 'line' + lineCount++,
                reference: _this._getReference()
            }, omit(_this.props, 'data')));
        });
    },
    /**
    * Render loading state
    * @return {HTML} the loading state
    */
    _renderLoading: function _renderLoading() {
        var _props2 = this.props;
        var isLoading = _props2.isLoading;
        var loader = _props2.loader;

        if (isLoading) {
            if (loader) {
                return loader();
            }
            return React.createElement(
                'li',
                { className: 'sl-loading' },
                this.i18n('list.loading'),
                ' ...'
            );
        }
    },
    /**
    * Render manual fetch state
    * @return {HTML} the rendered manual fetch state
    */
    _renderManualFetch: function _renderManualFetch() {
        var _props3 = this.props;
        var isManualFetch = _props3.isManualFetch;
        var hasMoreData = _props3.hasMoreData;

        if (isManualFetch && hasMoreData) {
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