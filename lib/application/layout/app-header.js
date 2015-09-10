//Needed components
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;

var Header = require('../header').component;
var Cartridge = require('../cartridge').component;
var ContentBar = require('../content-bar').component;
var Bar = require('../bar').component;
var ContentActions = require('../content-actions').component;
/**
 * Application header
 */

var AppHeader = (function (_Component) {
    _inherits(AppHeader, _Component);

    function AppHeader() {
        _classCallCheck(this, AppHeader);

        _Component.apply(this, arguments);
    }

    // static props

    AppHeader.prototype.render = function render() {
        return React.createElement(
            Header,
            null,
            React.createElement(
                ContentBar,
                null,
                React.createElement(Bar, null),
                React.createElement(Cartridge, null)
            ),
            React.createElement(ContentActions, null)
        );
    };

    return AppHeader;
})(Component);

AppHeader.displayName = 'AppHeader';

module.exports = AppHeader;