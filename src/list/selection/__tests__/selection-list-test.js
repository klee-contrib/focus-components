
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

const shallowRenderer = TestUtils.createRenderer();
let data = {
    title: 'title test',
    body: 'body test'
};

import {container as domainContainer} from 'focus-core/definition/domain';
import {container as entityContainer} from 'focus-core/definition/entity';

var domain = {
    'DO_TEXT': {
        style: 'do_text',
        type: 'text',
        component: 'PapaSinge',
        validation: [{
            type: 'function',
            value: function() {
              return false;
          }
        }]
    },
    'DO_EMAIL': {
        style: 'do_email',
        type: 'email',
        component: 'PapaMail',
        validation: [{
            type: 'function',
            value: function() {
              return true;
          }
        }]
    }
};
domainContainer.setAll(domain);
var entities ={
    'contact': {
        'firstName': {
            'domain': 'DO_TEXT',
            'required': false
        },
        'lastName': {
            'domain': 'DO_TEXT',
            'required': true
        },
        'age': {
            'domain': 'DO_NUMBER',
            'required': false
        },
        'email': {
            'domain': 'DO_EMAIL',
            'required': false
        }
    }};
entityContainer.setEntityConfiguration(entities);


let Line = React.createClass({
    displayName: 'testLine',
    definitionPath: 'contact',
    mixins: [require('../line').mixin],
    renderLineContent(data) {
        let title = React.createElement('div', null, data.title);
        let body = React.createElement('div', null, data.body);
        let root = React.createElement('div', null, title, body);
        return root;
    }
});

let line = shallowRenderer.render(
    React.createElement(Line, {data: data})
);
