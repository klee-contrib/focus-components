'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _React = React;
var Component = _React.Component;

global.componentHandler = {
    upgradeElement: sinon.stub(),
    downgradeElements: sinon.stub()
};

describe('The input date', function () {
    describe('when mounted with a valid value', function () {
        var now = new Date().toISOString();
        var renderedTest = undefined;
        var onChangeSpy = sinon.spy();
        before(function () {
            renderedTest = TestUtils.renderIntoDocument(React.createElement(_2['default'], { onChange: onChangeSpy, value: now }));
        });

        it('should hold the provided initial value', function () {
            expect(renderedTest.getValue()).to.equal(now);
        });

        it('should display the provided date in the dropdown', function () {
            expect(renderedTest.state.dropDownDate.toISOString()).to.equal(now);
        });
    });

    describe('when mounted with a null value', function () {
        var renderedTest = undefined;
        var onChangeSpy = sinon.spy();
        before(function () {
            renderedTest = TestUtils.renderIntoDocument(React.createElement(_2['default'], { onChange: onChangeSpy, value: null }));
        });

        it('should give a null value', function () {
            expect(renderedTest.getValue()).to.be['null'];
        });

        it('should display today\'s date in the dropdown', function () {
            expect(_moment2['default']().diff(renderedTest.state.dropDownDate, 'days')).to.equal(0);
        });
    });

    describe('when mounted with an invalid value', function () {
        var renderedTest = undefined;
        var onChangeSpy = sinon.spy();
        before(function () {
            renderedTest = TestUtils.renderIntoDocument(React.createElement(_2['default'], { onChange: onChangeSpy, value: 'invalid date' }));
        });

        it('should give a null value', function () {
            expect(renderedTest.getValue()).to.be['null'];
        });

        it('should display today\'s date in the dropdown', function () {
            expect(_moment2['default']().diff(renderedTest.state.dropDownDate, 'days')).to.equal(0);
        });
    });

    describe('when the value given as a prop changes', function () {
        var now = new Date().toISOString();
        var renderedTest = undefined;
        var onChangeSpy = sinon.spy();

        var TestComponent = (function (_Component) {
            _inherits(TestComponent, _Component);

            function TestComponent() {
                _classCallCheck(this, TestComponent);

                _Component.call(this);
                this.state = {
                    value: now
                };
            }

            TestComponent.prototype.render = function render() {
                return React.createElement(_2['default'], { onChange: onChangeSpy, ref: 'date', value: now });
            };

            return TestComponent;
        })(Component);

        before(function () {
            renderedTest = TestUtils.renderIntoDocument(React.createElement(TestComponent, null));
            now = new Date().toISOString();
            renderedTest.setState({ value: now });
        });

        it('should change its internal value', function () {
            expect(renderedTest.refs.date.getValue()).to.equal(now);
        });
    });

    describe('when the user clears the input', function () {
        var now = new Date().toISOString();
        var renderedTest = undefined;
        var onChangeSpy = sinon.spy();
        before(function () {
            renderedTest = TestUtils.renderIntoDocument(React.createElement(_2['default'], { onChange: onChangeSpy, value: now }));
            var input = ReactDOM.findDOMNode(renderedTest.refs.input.refs.htmlInput);
            TestUtils.Simulate.change(input, { target: { value: '' } });
        });
        it('should give a null value', function () {
            expect(renderedTest.getValue()).to.be['null'];
        });
    });

    describe('when the user enters a valid input', function () {
        var validDateString = '02/03/10';
        var renderedTest = undefined;

        var TestComponent = (function (_Component2) {
            _inherits(TestComponent, _Component2);

            function TestComponent() {
                var _this = this;

                _classCallCheck(this, TestComponent);

                _Component2.call(this);

                this.onDateChange = function (value) {
                    _this.setState({ value: value });
                };

                this.render = function () {
                    return React.createElement(_2['default'], { onChange: _this.onDateChange, ref: 'date', value: _this.state.value });
                };

                this.state = {
                    value: null
                };
            }

            return TestComponent;
        })(Component);

        before(function () {
            renderedTest = TestUtils.renderIntoDocument(React.createElement(TestComponent, null));
            var input = ReactDOM.findDOMNode(renderedTest.refs.date.refs.input.refs.htmlInput);
            TestUtils.Simulate.change(input, { target: { value: validDateString } });
            TestUtils.Simulate.blur(input);
        });
        it('should give the provided value', function () {
            expect(renderedTest.refs.date.getValue()).to.equal(_moment2['default'](Date.parse(validDateString)).toISOString());
        });
    });

    describe('when the user enters an invalid input', function () {
        var invalidDateString = 'Lol invalid';
        var renderedTest = undefined;

        var TestComponent = (function (_Component3) {
            _inherits(TestComponent, _Component3);

            function TestComponent() {
                var _this2 = this;

                _classCallCheck(this, TestComponent);

                _Component3.call(this);

                this.onDateChange = function (value) {
                    _this2.setState({ value: value });
                };

                this.render = function () {
                    return React.createElement(_2['default'], { onChange: _this2.onDateChange, ref: 'date', value: _this2.state.value });
                };

                this.state = {
                    value: null
                };
            }

            return TestComponent;
        })(Component);

        before(function () {
            renderedTest = TestUtils.renderIntoDocument(React.createElement(TestComponent, null));
            var input = ReactDOM.findDOMNode(renderedTest.refs.date.refs.input.refs.htmlInput);
            TestUtils.Simulate.change(input, { target: { value: invalidDateString } });
        });
        it('should give a null value', function () {
            expect(renderedTest.refs.date.getValue()).to.be['null'];
        });
        it('but still let the invalid value in the input', function () {
            expect(ReactDOM.findDOMNode(renderedTest.refs.date.refs.input.refs.htmlInput).value).to.equal(invalidDateString);
        });
    });
});