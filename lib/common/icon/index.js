'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var builder = require('focus').component.builder;
var React = require('react');
var types = require('focus').component.types;
var oneOf = React.PropTypes.oneOf;

var iconMixin = {
    displayName: 'Icon',
    getDefaultProps: function getDefaultProps() {
        return {
            name: '',
            library: 'material'
        };
    },
    propTypes: {
        handleOnClick: types('function'),
        name: types('string'),
        library: oneOf(['material', 'font-awesome', 'focus'])
    },

    /**
    * Render the img.
    * @returns {XML} Html code.
    */
    render: function renderIcon() {
        var _props = this.props;
        var name = _props.name;
        var library = _props.library;
        var onClick = _props.onClick;
        var style = _props.style;

        switch (library) {
            case 'material':
                return React.createElement(
                    'i',
                    _extends({ className: 'material-icons', onClick: onClick }, style),
                    name
                );
            case 'font-awesome':
                var faCss = 'fa fa-' + name;
                return React.createElement('i', _extends({ className: faCss, onClick: onClick }, style));
            default:
                return null;
        }
    }
};

module.exports = builder(iconMixin);