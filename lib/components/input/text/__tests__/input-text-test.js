'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _lodashUtility = require('lodash/utility');

var _TestUtils = TestUtils;
var renderIntoDocument = _TestUtils.renderIntoDocument;
var Simulate = _TestUtils.Simulate;

describe('The input text', function () {
    describe('when called with no props', function () {
        var component = undefined;
        before(function () {
            var shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(React.createElement(_2['default'], null));
            component = shallowRenderer.getRenderOutput();
        });
        it.skip('should render an empty input', function () {
            console.log('rendered', component);
            expect(component).to.be.an('object');
            expect(component.type).to.equal('div');
            expect(component.className).to.equal('mdl-textfield mdl-js-textfield');
        });
    });
    describe('when called with minimal props', function () {
        var component = undefined,
            domNode = undefined,
            onChangeSpy = undefined;
        before(function () {
            onChangeSpy = sinon.spy();
            component = renderIntoDocument(React.createElement(_2['default'], { name: 'inputName', onChange: onChangeSpy }));
            domNode = ReactDOM.findDOMNode(component);
        });
        it('should render an empty input', function () {
            expect(domNode.tagName).to.equal('DIV');
            expect(domNode.className).to.equal('mdl-textfield mdl-js-textfield');
        });
    });
    describe('when a value is provided', function () {
        var component = undefined,
            onChangeSpy = undefined;
        var value = 'testValue';
        before(function () {
            onChangeSpy = sinon.spy();
            component = renderIntoDocument(React.createElement(_2['default'], { name: 'inputName', onChange: onChangeSpy, value: value }));
        });
        it('shoud return the value on getValue call', function () {
            expect(component.getValue()).to.equal(value);
        });
        it('should render the value in the DOM', function () {
            expect(ReactDOM.findDOMNode(component.refs.htmlInput).value).to.equal(value);
        });
    });
    describe('when a text is typed', function () {
        var component = undefined,
            onChangeSpy = undefined;
        var testValue = 'MY_TEST_VALUE';
        before(function () {
            onChangeSpy = sinon.spy();
            component = renderIntoDocument(React.createElement(_2['default'], { name: 'inputName', onChange: onChangeSpy }));
        });
        it('should call onChange with the new value', function () {
            Simulate.change(ReactDOM.findDOMNode(component.refs.htmlInput), { target: { value: testValue } });
            expect(onChangeSpy).to.have.been.called.once;
            expect(onChangeSpy).to.have.been.calledWith(testValue);
        });
    });
    describe('when a formatter is provided', function () {
        var component = undefined,
            htmlInput = undefined,
            onChange = undefined;
        var testValue = 'MY_TEST_VALUE';
        var formatedValue = 'MY_FORMATED_VALUE';
        before(function () {
            onChange = _lodashUtility.identity;
            /**
             * The formatter test.
             * @return {string} - The formated value
             */
            function formatter() {
                return formatedValue;
            }
            component = renderIntoDocument(React.createElement(_2['default'], { formatter: formatter, name: 'inputName', onChange: onChange, value: testValue }));
            htmlInput = ReactDOM.findDOMNode(component.refs.htmlInput);
        });
        it('should format the value in the DOM', function () {
            expect(htmlInput.value).to.equal(formatedValue);
        });
    });
    describe('when an unformatter is provided', function () {
        var component = undefined,
            onChange = undefined;
        var testValue = 'MY_TEST_VALUE';
        var unformatedValue = 'MY_UN_FORMATED_VALUE';
        before(function () {
            onChange = _lodashUtility.identity;
            /**
             * The unformatter test.
             * @return {string} - The formated value
             */
            function unformatter() {
                return unformatedValue;
            }
            component = renderIntoDocument(React.createElement(_2['default'], { name: 'inputName', onChange: onChange, unformatter: unformatter, value: testValue }));
        });
        it('should unformat the getValue', function () {
            expect(component.getValue()).to.equal(unformatedValue);
        });
    });
    describe('when an error is provided', function () {
        var component = undefined,
            onChange = undefined,
            htmlInput = undefined,
            htmlError = undefined;
        var testValue = 'MY_TEST_VALUE';
        var error = 'MY_ERROR';
        before(function () {
            onChange = _lodashUtility.identity;
            component = renderIntoDocument(React.createElement(_2['default'], { error: error, name: 'inputName', onChange: onChange, value: testValue }));
            htmlInput = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
            htmlError = TestUtils.findRenderedDOMComponentWithTag(component, 'span');
        });
        it('should display the error in the HTML', function () {
            expect(htmlError).to.exist;
            expect(htmlError.innerHTML).to.have.string(error);
        });
        it('input should have a pattern attribute', function () {
            expect(htmlInput).to.exist;
            expect(htmlInput.getAttribute('pattern')).to.equal('hasError');
        });
    });
});