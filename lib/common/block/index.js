'use strict';

var React = require('react');
var oneOf = React.PropTypes.oneOf;

var _require$component = require('focus').component;

var builder = _require$component.builder;
var types = _require$component.types;

var i18nBehaviour = require('../../common/i18n/mixin');
var styleBehaviour = require('../../mixin/stylable');
var Title = require('../title').component;

var _require = require('lodash/collection');

var includes = _require.includes;

/**
* Mixin used in order to create a block.
* @type {Object}
*/
var blockMixin = {
    mixins: [i18nBehaviour, styleBehaviour],

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            actionsPosition: 'top'
        };
    },

    /** @inheritedDoc */
    propTypes: {
        actions: types('func'),
        actionsPosition: oneOf(['both', 'bottom', 'top']),
        title: types('string')
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
    /**
    * Render the a block container and the cild content of the block.
    * @return {DOM} React DOM element
    */
    render: function render() {
        var _props = this.props;
        var actions = _props.actions;
        var actionsPosition = _props.actionsPosition;
        var children = _props.children;

        var shouldDisplayActionsTop = actions && includes(['both', 'top'], actionsPosition);
        var shouldDisplayActionsBottom = actions && includes(['both', 'bottom'], actionsPosition);
        return React.createElement(
            'div',
            { className: 'mdl-card mdl-card--border mdl-shadow--4dp', 'data-focus': 'block' },
            React.createElement(
                'div',
                { className: 'mdl-card__title mdl-card--border', 'data-focus': 'block-title' },
                React.createElement(Title, { label: this.heading() }),
                shouldDisplayActionsTop && React.createElement(
                    'div',
                    { className: 'actions' },
                    actions()
                )
            ),
            React.createElement(
                'div',
                { className: 'mdl-card__supporting-text', 'data-focus': 'block-content' },
                children
            ),
            shouldDisplayActionsBottom && React.createElement(
                'div',
                { className: 'mdl-card__actions mdl-card--border', 'data-focus': 'block-actions' },
                actions()
            )
        );
    }
};

module.exports = builder(blockMixin);