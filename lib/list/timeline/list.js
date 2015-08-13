'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var Line = require('./line').mixin;
var uuid = require('uuid');
var translationMixin = require('../../common/i18n').mixin;
var infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
var checkIsNotNull = require('focus').util.object.checkIsNotNull;
var Button = require('../../common/button/action').component;

var listMixin = {
    /**
     * Tag name
     */
    displayName: 'timeline',

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, infiniteScrollMixin, referenceMixin],

    /**
     * Default properties for the list.
     * @return {object} default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            data: [],
            idField: 'id',
            dateField: 'date',
            isLoading: false
        };
    },

    /**
     * list property validation.
     */
    propTypes: {
        data: type('array'),
        idField: type('string'),
        dateField: type('string'),
        dateComponent: type('object'),
        lineComponent: type('func', true),
        isloading: type('bool'),
        loader: type('func'),
        onLineClick: type('func')
    },

    /**
     * called before component mount
     */
    componentWillMount: function componentWillMount() {
        checkIsNotNull('lineComponent', this.props.lineComponent);
    },

    /**
     * Render lines of the list.
     * @returns {*} the lines
     */
    _renderLines: function renderLines() {
        var _this = this;

        var lineCount = 1;
        var LineComponent = this.props.lineComponent || React.createClass(Line);
        return this.props.data.map(function (line) {
            return React.createElement(LineComponent, {
                key: line[_this.props.idField] || uuid.v4(),
                data: line,
                ref: 'line' + lineCount++,
                dateField: _this.props.dateField,
                onLineClick: _this.props.onLineClick
            });
        });
    },

    _renderLoading: function renderLoading() {
        if (this.props.isLoading) {
            if (this.props.loader) {
                return this.props.loader();
            }
            return React.createElement(
                'li',
                { className: 'timeline-loading' },
                this.i18n('list.loading'),
                ' ...'
            );
        }
    },

    _renderManualFetch: function renderManualFetch() {
        if (this.props.isManualFetch && this.props.hasMoreData) {
            var style = { className: 'primary' };
            return React.createElement(
                'li',
                { className: 'timeline-button' },
                React.createElement(Button, { label: 'list.button.showMore',
                    type: 'button',
                    handleOnClick: this.handleShowMore,
                    style: style })
            );
        }
    },

    /**
     * Render the list.
     * @returns {XML} the list component
     */
    render: function renderList() {
        return React.createElement(
            'ul',
            { className: 'timeline' },
            this._renderLines(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }
};

module.exports = builder(listMixin);