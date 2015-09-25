'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _lodashLang = require('lodash/lang');

var _fixture = require('./fixture');

var _fixture2 = _interopRequireDefault(_fixture);

//onChangeSpy = sinon.spy();

var _TestUtils = TestUtils;
var renderIntoDocument = _TestUtils.renderIntoDocument;
var Simulate = _TestUtils.Simulate;
describe('The select ', function () {
    describe('when called with no props', function () {
        var component = undefined;
        before(function () {
            var shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(React.createElement(_2['default'], null));
            component = shallowRenderer.getRenderOutput();
        });
        it.skip('should render an empty select', function () {});
    });
    describe('when called with minimal props', function () {
        var component = undefined,
            domNode = undefined;
        var mockValues = _fixture2['default'].VALUES;
        before(function () {
            component = renderIntoDocument(React.createElement(_2['default'], { name: 'selectName', values: mockValues, onChange: _lodashLang.identity }));
            domNode = ReactDOM.findDOMNode(component);
        });
        it('should render an empty select', function () {
            expect(domNode.tagName).to.equal('DIV');
            expect(domNode.getAttribute('data-focus')).to.equal('select');
            var domSelect = ReactDOM.findDOMNode(component.refs.htmlSelect);
            expect(domSelect.tagName).to.equal('SELECT');
            expect(domSelect.options.length).to.equal(mockValues.length + 1);
            expect(domSelect.options[0].innerHTML).to.equal('select.unSelected');
            expect(+domSelect.options[1].value).to.equal(mockValues[0].code);
            expect(domSelect.options[1].innerHTML).to.equal(mockValues[0].label);
        });
        it('should not have a value', function () {
            expect(component.getValue()).to.equal(null);
        });
    });
    describe('when a value is provided', function () {
        var VALUE = _fixture2['default'].VALUE;
        var VALUES = _fixture2['default'].VALUES;

        var component = undefined,
            domNode = undefined;
        before(function () {
            component = renderIntoDocument(React.createElement(_2['default'], { name: 'selectName', onChange: _lodashLang.identity, value: VALUE, values: VALUES }));
        });
        it('should return the value when provided as a props', function () {
            expect(component.getValue()).to.equal(VALUE);
        });
        it('should render the value in the DOM', function () {
            expect(ReactDOM.findDOMNode(component.refs.htmlSelect).value).to.equal('' + VALUE);
        });
    });
    describe('when the user select a new value', function () {
        var VALUE = _fixture2['default'].VALUE;
        var VALUES = _fixture2['default'].VALUES;

        var onChangeSpy = undefined,
            component = undefined;
        before(function () {
            onChangeSpy = sinon.spy();
            component = renderIntoDocument(React.createElement(_2['default'], { name: 'selectName', onChange: onChangeSpy, value: VALUE, values: VALUES }));
        });
        it('should call onChange with the new value', function () {
            Simulate.change(ReactDOM.findDOMNode(component.refs.htmlSelect), { target: { value: VALUE } });
            expect(onChangeSpy).to.have.been.called.once;
            expect(onChangeSpy).to.have.been.calledWith(VALUE);
        });
    });
    describe('when there is an error', function () {
        var VALUE = _fixture2['default'].VALUE;
        var VALUES = _fixture2['default'].VALUES;

        var error = 'MY ERROR';
        var component = undefined;
        before(function () {
            component = renderIntoDocument(React.createElement(_2['default'], { error: error, name: 'selectName', onChange: _lodashLang.identity, value: VALUE, values: VALUES }));
        });
        it('it should be displayed', function () {
            var errorDOMNode = ReactDOM.findDOMNode(component.refs.error);
            expect(errorDOMNode).to.exist;
            expect(errorDOMNode.innerHTML).to.equal(error);
        });
    });
});