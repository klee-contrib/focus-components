'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactDOM = require('react-dom');

var Material = function Material(ref, watchedProp) {
    return function (Component) {
        return (function (_Component) {
            _inherits(MaterialComponent, _Component);

            function MaterialComponent() {
                var _this = this;

                _classCallCheck(this, MaterialComponent);

                _Component.apply(this, arguments);

                this.componentWillReceiveProps = function (nextProps) {
                    if (Component.prototype.componentWillReceiveProps) {
                        Component.prototype.componentWillReceiveProps(nextProps);
                    }
                    var newWatchedProp = nextProps[watchedProp];
                    if (newWatchedProp !== _this.props[watchedProp]) {
                        var refNode = ReactDOM.findDOMNode(_this.refs[ref]);
                        componentHandler.upgradeElement(refNode);
                    }
                };
            }

            MaterialComponent.prototype.componentDidMount = function componentDidMount() {
                if (Component.prototype.componentDidMount) {
                    Component.prototype.componentDidMount();
                }
                var refNode = ReactDOM.findDOMNode(this.refs[ref]);
                if (refNode) {
                    componentHandler.upgradeElement(refNode);
                }
            };

            MaterialComponent.prototype.componentWillUnmount = function componentWillUnmount() {
                if (Component.prototype.componentWillUnmount) {
                    Component.prototype.componentWillUnmount();
                }
                var refNode = ReactDOM.findDOMNode(this.refs[ref]);
                if (refNode) {
                    componentHandler.downgradeElements(refNode);
                }
            };

            return MaterialComponent;
        })(Component);
    };
};

exports['default'] = Material;
module.exports = exports['default'];