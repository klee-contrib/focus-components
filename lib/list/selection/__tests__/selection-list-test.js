/*global TestUtils*/
'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var shallowRenderer = TestUtils.createRenderer();
var data = {
    title: 'title test',
    body: 'body test'
};

var Focus = require('focus');
var domain = {
    "DO_TEXT": {
        style: "do_text",
        type: "text",
        component: "PapaSinge",
        validation: [{
            type: "function",
            value: function value() {
                return false;
            }
        }]
    },
    "DO_EMAIL": {
        style: "do_email",
        type: "email",
        component: "PapaMail",
        validation: [{
            type: "function",
            value: function value() {
                return true;
            }
        }]
    }
};
Focus.definition.domain.container.setAll(domain);
var entities = {
    "contact": {
        "firstName": {
            "domain": "DO_TEXT",
            "required": false
        },
        "lastName": {
            "domain": "DO_TEXT",
            "required": true
        },
        "age": {
            "domain": "DO_NUMBER",
            "required": false
        },
        "email": {
            "domain": "DO_EMAIL",
            "required": false
        }
    } };
Focus.definition.entity.container.setEntityConfiguration(entities);

var Line = React.createClass({
    displayName: 'testLine',
    definitionPath: 'contact',
    mixins: [require('../line').mixin],
    renderLineContent: function renderLineContent(data) {
        var title = React.createElement('div', null, data.title);
        var body = React.createElement('div', null, data.body);
        var root = React.createElement('div', null, title, body);
        return root;
    }
});

var line = shallowRenderer.render(React.createElement(Line, { data: data }));

describe("##selection list", function () {
    it('the initial state should be not selected', function () {

        shallowRenderer.render(React.createElement(Line, { data: data }));
        var component = shallowRenderer.getRenderOutput();
        console.log('LINE', component);
        /*var boxEmpty = TestUtils.findRenderedDOMComponentWithClass(
            line, 'sl-selection no-selection');
        expect(boxEmpty).toBeDefined();
          var boxSelected = TestUtils.findRenderedDOMComponentWithClass(
            line, 'sl-selection selected');
        expect(boxSelected).toBeUndefined();*/
    });

    it.skip('the line should be selected on click on the box', function () {
        /*var boxEmpty = TestUtils.findRenderedDOMComponentWithClass(
            line, 'sl-selection no-selection');
        TestUtils.Simulate.click(boxEmpty);
        var boxSelected = TestUtils.findRenderedDOMComponentWithClass(
            line, 'sl-selection selected');
        expect(boxSelected).toBeDefined();*/
    });
});