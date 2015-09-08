//dependencies
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;

//Other component
var ComponentCard = require('./component-card');

var CatalogListComponent = (function (_Component) {
    _inherits(CatalogListComponent, _Component);

    function CatalogListComponent(props) {
        _classCallCheck(this, CatalogListComponent);

        _Component.call(this, props);
    }

    //Static props.

    CatalogListComponent.prototype._showLiveComponentHandler = function _showLiveComponentHandler(comp) {
        var _this = this;

        return function () {
            _this.props.showLiveComponent(comp);
        };
    };

    CatalogListComponent.prototype.render = function render() {
        var _this2 = this;

        var data = this.props.data;

        var style = {
            display: 'flex', flexWrap: 'wrap', listStyleType: 'none'
        };
        return React.createElement(
            'ul',
            { 'data-focus': 'catalog-list', style: style },
            data.map(function (comp, idx) {
                return React.createElement(ComponentCard, _extends({ key: idx }, comp, { showLiveComponent: _this2._showLiveComponentHandler(comp) }));
            })
        );
    };

    return CatalogListComponent;
})(Component);

CatalogListComponent.displayName = 'Catalog';
module.exports = CatalogListComponent;