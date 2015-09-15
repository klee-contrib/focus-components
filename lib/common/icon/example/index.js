'use strict';

var Icon = FocusComponents.common.icon.component;

var IconSample = React.createClass({
    displayName: 'IconSample',

    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        return React.createElement(
            'div',
            { className: 'icon-example' },
            React.createElement(
                'h2',
                null,
                'Material'
            ),
            React.createElement(Icon, { name: 'account_circle' }),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(Icon, { name: 'loyalty', style: { color: 'tomato' } }),
            React.createElement('br', null),
            React.createElement(
                'h2',
                null,
                'Font awesome '
            ),
            React.createElement(Icon, { name: 'circle', library: 'font-awesome' })
        );
    }
});

return React.createElement(IconSample, null);