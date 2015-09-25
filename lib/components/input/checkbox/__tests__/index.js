'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ = require('../');

var _2 = _interopRequireDefault(_);

global.componentHandler = {
    upgradeElement: sinon.stub(),
    downgradeElements: sinon.stub()
};

describe('The input checkbox', function () {
    describe('when mounted', function () {
        var renderedTest = undefined;
        var onChangeSpy = sinon.spy();
        before(function () {
            renderedTest = TestUtils.renderIntoDocument(React.createElement(_2['default'], { onChange: onChangeSpy, value: true }));
        });

        it('should hold the provided initial value', function () {
            expect(renderedTest.getValue()).to.equal(true);
        });
    });
    describe('when clicked', function () {
        var renderedTest = undefined;
        var checkbox = undefined;
        var onChangeSpy = sinon.spy();
        before(function () {
            renderedTest = TestUtils.renderIntoDocument(React.createElement(_2['default'], { onChange: onChangeSpy, value: false }));
            checkbox = ReactDOM.findDOMNode(renderedTest.refs.checkbox);
            TestUtils.Simulate.change(checkbox, { target: { checked: true } });
        });

        it('should call the handeOnChange prop', function () {
            expect(onChangeSpy).to.be.called.once;
        });

        it('should not change the checkbox value if the parent does not explicitly change it', function () {
            expect(renderedTest.getValue()).to.equal(false);
        });
    });
});