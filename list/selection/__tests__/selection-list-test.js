var React = require('react/addons');
jest.dontMock('../line.js');
var TestUtils = React.addons.TestUtils;

var data = {
    title : 'title test',
    body: 'body test'
};

var Line = React.createClass({
    mixins: [require('../line').mixin],
    renderLineContent: function(data){
        var title = React.createElement('div',null,data.title);
        var body = React.createElement('div',null,data.body);
        var root = React.createElement('div',null,title,body);
        return root;
    }
});

var line = TestUtils.renderIntoDocument(
    React.createElement(Line, {data: data})
);

describe("## SL-Line", function(){
    it('the initial state should be not selected', function() {
        var boxEmpty = TestUtils.findRenderedDOMComponentWithClass(
            line, 'sl-selection no-selection');
        expect(boxEmpty).toBeDefined();

        var boxSelected = TestUtils.findRenderedDOMComponentWithClass(
            line, 'sl-selection selected');
        expect(boxSelected).toBeUndefined();
    });

    it('the line should be selected on click on the box', function(){
        var boxEmpty = TestUtils.findRenderedDOMComponentWithClass(
            line, 'sl-selection no-selection');
        TestUtils.Simulate.click(boxEmpty);
        var boxSelected = TestUtils.findRenderedDOMComponentWithClass(
            line, 'sl-selection selected');
        expect(boxSelected).toBeDefined();
    })
});

