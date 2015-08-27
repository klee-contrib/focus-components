'use strict';

var React = require('react');

var _require$component = require('focus').component;

var builder = _require$component.builder;
var types = _require$component.types;

var i18nBehaviour = require('../../common/i18n/mixin');
var styleBehaviour = require('../../mixin/stylable');
var Title = require('../title').component;
var trim = require('lodash/string/trim');
/**
* Mixin used in order to create a block.
* @type {Object}
*/
var blockMixin = {
    mixins: [i18nBehaviour, styleBehaviour],

    /** @inheritedDoc */
    getDefaultProps: function getDefaultProps() {
        return {
            actions: function actions() {
                return; // override this to add actions.
            }
        };
    },
    /** @inheritedDoc */
    propTypes: {
        title: types('string'),
        actions: types('func')
    },
    /**
    * Header of theblock function.
    * @return {[type]} [description]
    */
    heading: function heading() {
        if (this.props.title) {
            return this.i18n(this.props.title);
        }
    },
    _buildId: function _buildId() {
        return window.location.hash.slice(1) + '/' + trim(this.heading().toLowerCase()); //.replace('/', '_');
    },
    /**
    * Render the a block container and the cild content of the block.
    * @return {DOM} React DOM element
    */
    render: function renderBlock() {
        var _props = this.props;
        var actions = _props.actions;
        var children = _props.children;

        return React.createElement(
            'div',
            { 'data-focus': 'block' },
            React.createElement(
                'header',
                null,
                React.createElement(Title, { id: this._buildId(), title: this.heading() }),
                React.createElement(
                    'div',
                    { className: 'actions' },
                    actions()
                )
            ),
            React.createElement(
                'div',
                { className: 'block-content' },
                children
            )
        );
    }
};

module.exports = builder(blockMixin);