'use strict';

var Button = FocusComponents.common.button.action.component;

var ButtonSample = React.createClass({
    displayName: 'ButtonSample',

    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        return React.createElement(
            'div',
            { className: 'button-example' },
            React.createElement(Button, { label: 'Bouton primaire', type: 'button', handleOnClick: function () {
                    return alert('click bouton');
                } }),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(Button, { icon: 'alarm', color: 'colored', label: 'Bouton primaire', shape: 'fab', type: 'button', handleOnClick: function () {
                    return alert('click bouton');
                } }),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(Button, { icon: 'build', label: 'Bouton icone', type: 'button', handleOnClick: function () {
                    return alert('click bouton');
                } }),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(Button, { icon: 'build', color: 'accent', label: 'Bouton accent', type: 'button', handleOnClick: function () {
                    return alert('click bouton');
                } }),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(Button, { icon: 'mood', color: 'colored', label: 'iconbutton', shape: 'icon', type: 'button', handleOnClick: function () {
                    return alert('click bouton');
                } }),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(Button, { icon: 'mood', label: 'minifabbutton', color: 'announcement', shape: 'mini-fab', type: 'button', handleOnClick: function () {
                    return alert('click bouton');
                } })
        );
    }
});

return React.createElement(ButtonSample, null);