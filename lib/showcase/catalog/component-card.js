//dependencies
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;

var types = require('focus').component.types;
var liStyle = { flex: 1, minWidth: '20%', marginTop: '7px', marginRight: '7px' };

/**
 * Component describing a component.
 */

var ComponentCard = (function (_Component) {
    _inherits(ComponentCard, _Component);

    function ComponentCard(props) {
        _classCallCheck(this, ComponentCard);

        _Component.call(this, props);
    }

    //Static props.

    /** @inheriteDoc */

    ComponentCard.prototype.render = function render() {
        var _props = this.props;
        var name = _props.name;
        var description = _props.description;
        var example = _props.example;
        var photo = _props.photo;
        var keywords = _props.keywords;

        var style = { background: 'url(\'' + photo + '\') bottom right  no-repeat #46B6AC', height: '320px' };
        return React.createElement(
            'li',
            { className: 'demo-card-wide mdl-card mdl-shadow--2dp', style: liStyle },
            React.createElement(
                'div',
                { className: 'mdl-card__title', style: style },
                React.createElement(
                    'h2',
                    { className: 'mdl-card__title-text' },
                    name
                )
            ),
            React.createElement(
                'div',
                { className: 'mdl-card__supporting-text' },
                description,
                React.createElement(
                    'div',
                    { className: 'tags' },
                    keywords.slice(0, 2).map(function (tag) {
                        return React.createElement(
                            'button',
                            { className: 'mdl-button mdl-js-button mdl-js-ripple-effect' },
                            tag
                        );
                    })
                )
            ),
            React.createElement(
                'div',
                { className: 'mdl-card__actions mdl-card--border' },
                React.createElement(
                    'a',
                    { className: 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect', href: example, onClick: this.props.showLiveComponent },
                    'Example'
                )
            ),
            React.createElement(
                'div',
                { className: 'mdl-card__menu' },
                React.createElement(
                    'button',
                    { className: 'mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect' },
                    React.createElement(
                        'i',
                        { className: 'material-icons' },
                        'share'
                    )
                )
            )
        );
    };

    return ComponentCard;
})(Component);

ComponentCard.displayName = 'ComponentCard';
ComponentCard.defaultProps = {};
ComponentCard.propTypes = {
    description: types('string'),
    example: types('string'),
    url: types('string'),
    keywords: types('string'),
    photo: types('string'),
    name: types('string')
};

module.exports = ComponentCard;