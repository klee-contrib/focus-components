'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('../');

var _2 = _interopRequireDefault(_);

describe.skip('The Material behaviour', function () {
    var mdlSpy = undefined;
    before(function () {
        mdlSpy = global.componentHandler = {
            upgradeElement: sinon.spy(),
            downgradeElements: sinon.spy()
        };
    });
    describe('when called with no ref', function () {
        before(function () {
            var TestComponent = (function (_React$Component) {
                _inherits(TestComponent, _React$Component);

                function TestComponent() {
                    _classCallCheck(this, _TestComponent);

                    _React$Component.apply(this, arguments);
                }

                TestComponent.prototype.render = function render() {
                    return React.createElement(
                        'div',
                        { ref: 'myRef' },
                        this.props.test
                    );
                };

                var _TestComponent = TestComponent;
                TestComponent = _2['default']()(TestComponent) || TestComponent;
                return TestComponent;
            })(React.Component);

            TestUtils.renderIntoDocument(React.createElement(TestComponent, { test: 'hello' }));
        });
        it('should not bind mdl JS', function () {
            expect(mdlSpy.upgradeElement).not.to.be.called;
        });
    });
    describe('when called with a bad ref', function () {
        before(function () {
            var TestComponent = (function (_React$Component2) {
                _inherits(TestComponent, _React$Component2);

                function TestComponent() {
                    _classCallCheck(this, _TestComponent2);

                    _React$Component2.apply(this, arguments);
                }

                TestComponent.prototype.render = function render() {
                    return React.createElement(
                        'div',
                        { ref: 'myRef' },
                        this.props.test
                    );
                };

                var _TestComponent2 = TestComponent;
                TestComponent = _2['default']('badRef')(TestComponent) || TestComponent;
                return TestComponent;
            })(React.Component);

            TestUtils.renderIntoDocument(React.createElement(TestComponent, { test: 'hello' }));
        });

        it('should not bind mdl JS', function () {
            expect(mdlSpy.upgradeElement).not.to.be.called;
        });
    });
    describe('when called with a good ref', function () {
        before(function () {
            var TestComponent = (function (_React$Component3) {
                _inherits(TestComponent, _React$Component3);

                function TestComponent() {
                    _classCallCheck(this, _TestComponent3);

                    _React$Component3.apply(this, arguments);
                }

                TestComponent.prototype.render = function render() {
                    return React.createElement(
                        'div',
                        { ref: 'myRef' },
                        this.props.test
                    );
                };

                var _TestComponent3 = TestComponent;
                TestComponent = _2['default']('myRef')(TestComponent) || TestComponent;
                return TestComponent;
            })(React.Component);

            TestUtils.renderIntoDocument(React.createElement(TestComponent, { test: 'hello' }));
        });

        it('should bind mdl JS once', function () {
            expect(mdlSpy.upgradeElement).to.be.called.once;
        });
    });
});