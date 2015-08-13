'use strict';

var _require$component = require('focus').component;

var builder = _require$component.builder;
var types = _require$component.types;

var i18nBehaviour = require('../common/i18n/mixin');
var messageMixin = {
    /** @inheritedDoc */
    getDefaultProps: function getDefaultProps() {
        return {
            type: 'info',
            style: {}
        };
    },
    /** @inheritedDoc */
    propTypes: {
        title: types('string'),
        content: types('string'),
        type: types('string'),
        ttl: types('number'),
        style: types('object')
    },
    /** @inheritedDoc */
    componentDidMount: function componentDidMount() {
        var _this = this;

        if (this.props.ttl) {
            setTimeout(function () {
                _this._handleTimeToLeave();
            }, this.props.ttl);
        }
    },
    /** @inheritedDoc */
    mixins: [i18nBehaviour],
    /**
     * Time to leave handler.
     */
    _handleTimeToLeave: function _handleTimeToLeave() {
        var _props = this.props;
        var handleTimeToLeave = _props.handleTimeToLeave;
        var id = _props.id;

        if (handleTimeToLeave) {
            handleTimeToLeave(id);
        }
    },
    /**
     * Handle click on the dismiss button.
     * @param {Event} event - Sanitize event.
     */
    _handleOnClick: function _handleOnClick(event) {
        var _props2 = this.props;
        var handleOnClick = _props2.handleOnClick;
        var id = _props2.id;

        if (handleOnClick) {
            handleOnClick(id);
        }
        //Maybe it is not the best way to do it.
        //React.unmountComponentAtNode(this.getDOMNode().parentNode);
    },
    _renderTitle: function _renderTitle() {
        var title = this.props.title;

        return title ? React.createElement(
            'h4',
            null,
            title
        ) : null;
    },
    /**
     * Render an alert.
     * @return {JSX} The jsx.
     */
    render: function render() {
        var _props3 = this.props;
        var type = _props3.type;
        var style = _props3.style;
        var id = _props3.id;
        var content = _props3.content;

        type = type && 'error' === type ? 'danger' : type;
        var cssClass = 'alert alert-dismissable alert-' + type + ' ' + (style && style.className);
        return React.createElement(
            'div',
            { className: cssClass, 'data-focus': 'message', 'data-id': id },
            React.createElement(
                'button',
                { className: 'close', onClick: this._handleOnClick, type: 'button' },
                '×'
            ),
            this._renderTitle(),
            React.createElement(
                'p',
                null,
                this.i18n(content)
            )
        );
    }
};
module.exports = builder(messageMixin);