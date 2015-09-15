// Dependencies

'use strict';

var types = require('focus').component.types;

var React = require('react');

// Mixins

var i18nBehaviour = require('../../common/i18n/mixin');

var Layout = React.createClass({
    displayName: 'ShowcaseLayout',
    mixins: [i18nBehaviour],

    /**
    * Properties validation.
    * @type {Object}
    */
    propTypes: {
        title: types('string').isRequired
    },

    /**
    * Render the layout HTML of focus components showcase.
    * @return {VirtualDOM} - The virtual DOM of the layout.
    */
    render: function render() {

        return React.createElement(
            'div',
            { className: 'demo-layout mdl-layout mdl-layout--fixed-drawer mdl-layout--fixed-header', 'data-focus': 'template' },
            React.createElement(
                'header',
                { className: 'demo-header mdl-layout__header mdl-color--white mdl-color--grey-100 mdl-color-text--grey-600' },
                React.createElement(
                    'div',
                    { className: 'mdl-layout__header-row' },
                    React.createElement(
                        'span',
                        { className: 'mdl-layout-title' },
                        this.i18n(this.props.title)
                    ),
                    React.createElement('div', { className: 'mdl-layout-spacer' }),
                    React.createElement(
                        'div',
                        { className: 'mdl-textfield mdl-js-textfield mdl-textfield--expandable' },
                        React.createElement(
                            'label',
                            { className: 'mdl-button mdl-js-button mdl-button--icon', htmlFor: 'search' },
                            React.createElement(
                                'i',
                                { className: 'material-icons' },
                                'search'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'mdl-textfield__expandable-holder' },
                            React.createElement('input', { className: 'mdl-textfield__input', id: 'search', type: 'text' }),
                            React.createElement(
                                'label',
                                { className: 'mdl-textfield__label', htmlFor: 'search' },
                                'Enter your query...'
                            )
                        )
                    ),
                    React.createElement(
                        'button',
                        { className: 'mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon', id: 'hdrbtn' },
                        React.createElement(
                            'i',
                            { className: 'material-icons' },
                            'more_vert'
                        )
                    ),
                    React.createElement(
                        'ul',
                        { className: 'mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right', htmlFor: 'hdrbtn' },
                        React.createElement(
                            'li',
                            { className: 'mdl-menu__item' },
                            'About'
                        ),
                        React.createElement(
                            'li',
                            { className: 'mdl-menu__item' },
                            'Contact'
                        ),
                        React.createElement(
                            'li',
                            { className: 'mdl-menu__item' },
                            'Legal information'
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50' },
                React.createElement(
                    'header',
                    { className: 'demo-drawer-header' },
                    React.createElement(
                        'a',
                        { href: '/' },
                        React.createElement(
                            'h1',
                            null,
                            React.createElement(
                                'strong',
                                null,
                                'FOCUS'
                            ),
                            React.createElement(
                                'span',
                                null,
                                'components'
                            )
                        ),
                        React.createElement(
                            'h2',
                            null,
                            'Showcase'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'links' },
                        React.createElement(
                            'a',
                            { alt: 'focus-docs', href: 'http://kleegroup.github.io/focus-docs/', target: '_blank', title: 'Documentation focus-components' },
                            React.createElement('i', { className: 'mdl-color-text--blue-grey-400 fa fa-book', role: 'presentation' })
                        ),
                        React.createElement(
                            'a',
                            { alt: 'focus-components sur Github', href: 'https://github.com/KleeGroup/focus-components', target: '_blank', title: 'focus-components sur Github' },
                            React.createElement('i', { className: 'mdl-color-text--blue-grey-400 fa fa-github', role: 'presentation' })
                        )
                    )
                ),
                React.createElement(
                    'nav',
                    { className: 'demo-navigation mdl-navigation mdl-color--blue-grey-800' },
                    React.createElement(
                        'h3',
                        null,
                        'Composants'
                    ),
                    React.createElement(
                        'a',
                        { className: 'mdl-navigation__link', href: '/' },
                        React.createElement('i', { className: 'mdl-color-text--blue-grey-400 fa fa-cube', role: 'presentation' }),
                        'My awsome component 1'
                    ),
                    React.createElement(
                        'a',
                        { className: 'mdl-navigation__link', href: '/' },
                        React.createElement('i', { className: 'mdl-color-text--blue-grey-400 fa fa-cube', role: 'presentation' }),
                        'My awsome component 2'
                    ),
                    React.createElement(
                        'a',
                        { className: 'mdl-navigation__link', href: '/' },
                        React.createElement('i', { className: 'mdl-color-text--blue-grey-400 fa fa-cube', role: 'presentation' }),
                        'My awsome component 3'
                    ),
                    React.createElement(
                        'a',
                        { className: 'mdl-navigation__link', href: '/' },
                        React.createElement('i', { className: 'mdl-color-text--blue-grey-400 fa fa-cube', role: 'presentation' }),
                        'My awsome component 5'
                    ),
                    React.createElement(
                        'a',
                        { className: 'mdl-navigation__link', href: '/' },
                        React.createElement('i', { className: 'mdl-color-text--blue-grey-400 fa fa-cubes', role: 'presentation' }),
                        'My awsome component 4'
                    ),
                    React.createElement(
                        'a',
                        { className: 'mdl-navigation__link', href: '/' },
                        React.createElement('i', { className: 'mdl-color-text--blue-grey-400 fa fa-cubes', role: 'presentation' }),
                        'My awsome component 6'
                    ),
                    React.createElement('div', { className: 'mdl-layout-spacer' }),
                    React.createElement(
                        'div',
                        { className: 'brand-powered' },
                        React.createElement(
                            'a',
                            { href: 'http://www.kleegroup.com' },
                            'Propulsé par'
                        )
                    )
                )
            ),
            React.createElement(
                'main',
                { className: 'mdl-layout__content mdl-color--grey-100', style: { zIndex: '100' } },
                React.createElement(
                    'div',
                    { className: 'demo-content' },
                    this.props.children
                )
            )
        );
    }
});

module.exports = Layout;