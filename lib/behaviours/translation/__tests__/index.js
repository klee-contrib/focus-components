'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _i18nextClient = require('i18next-client');

var _i18nextClient2 = _interopRequireDefault(_i18nextClient);

describe.skip('The translation behaviour', function () {
    var renderedComponent = undefined;
    before(function (done) {
        _i18nextClient2['default'].init({}, function () {
            var TestComponent = (function (_React$Component) {
                _inherits(TestComponent, _React$Component);

                function TestComponent() {
                    _classCallCheck(this, _TestComponent);

                    _React$Component.apply(this, arguments);
                }

                TestComponent.prototype.render = function render() {
                    return _react2['default'].createElement(
                        'div',
                        null,
                        this.i18n('my.translation.path')
                    );
                };

                var _TestComponent = TestComponent;
                TestComponent = _2['default'](TestComponent) || TestComponent;
                return TestComponent;
            })(_react2['default'].Component);

            renderedComponent = TestUtils.renderIntoDocument(_react2['default'].createElement(TestComponent, null));
            done();
        });
    });
    it('should add the translation function to the provided component', function () {
        var child = TestUtils.findRenderedDOMComponentWithTag(renderedComponent, 'div');
        expect(_reactDom2['default'].findDOMNode(child).innerHTML).to.equal('my.translation.path');
    });
});