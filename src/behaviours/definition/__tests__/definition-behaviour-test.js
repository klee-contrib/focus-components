
import TestUtils from 'react-dom/test-utils';
import React from 'react';

import DefinitionBehaviour from '../';
import definition from 'focus-core/definition';

const DOMAIN = {
    DO_TEXT: {
        style: 'do_text',
        type: 'text',
        component: 'PapaSinge',
        validation: [{
            type: 'function',
            value: function () {
                return false;
            }
        }]
    },
    DO_EMAIL: {
        style: 'do_email',
        type: 'email',
        component: 'PapaMail',
        validation: [{
            type: 'function',
            value: function () {
                return true;
            }
        }]
    },
    DO_NUMBER: {
        type: 'number'
    }
};

const entityMock = {
    contact: {
        firstName: {
            domain: 'DO_TEXT',
            required: false
        },
        lastName: {
            domain: 'DO_TEXT',
            required: true
        },
        age: {
            domain: 'DO_NUMBER',
            required: false
        },
        email: {
            domain: 'DO_EMAIL',
            required: false
        }
    }
};

// initialize the entity conf.
definition.domain.container.setAll(DOMAIN);
definition.entity.container.setEntityConfiguration(entityMock);

describe('The definition behaviour', () => {

    describe('when called with a wrong definition path', () => {
        it('shoud throw an error when the param is undefined', () => {
            expect(() => DefinitionBehaviour()).toThrow(Error);
        });
        it('shoud throw an error when when the param is null', () => {
            expect(() => DefinitionBehaviour(null)).toThrow(Error);
        });
        it('shoud throw an error when the param is an object', () => {
            expect(() => DefinitionBehaviour({})).toThrow(Error);
        });
        it('shoud throw a number when the param is an object', () => {
            expect(() => DefinitionBehaviour(1)).toThrow(Error);
        });
        it('shoud not throw an error when the param is a string and not the definition map', () => {
            expect(() => DefinitionBehaviour('test')).toThrow(Error);
        });
        it('shoud not throw an error when the param is a string and in the definition map', () => {
            expect(() => DefinitionBehaviour('contact')).not.toThrow(Error);
        });
    });
    describe('when called with a correct definition path', () => {
        it('should add a defintion property', () => {
            class TestComponent extends React.Component {
                render() {
                    return (
                        <div ref='myRef'>
                            {JSON.stringify(this.props)}
                        </div>
                    );
                }
            }
            const CompWithDef = DefinitionBehaviour('contact')(TestComponent);
            const renderedComponent = TestUtils.renderIntoDocument(<CompWithDef test='hello' />);
            expect(renderedComponent.refs.wrappedComponent.props).toHaveProperty('definition');
        });
        it('should contains all the property given as definition', () => {
            class TestComponent extends React.Component {
                render() {
                    return (
                        <div ref='myRef'>
                            {JSON.stringify(this.props)}
                        </div>
                    );
                }
            }
            const CompWithDef = DefinitionBehaviour('contact')(TestComponent);
            const renderedComponent = TestUtils.renderIntoDocument(<CompWithDef test='hello' />);
            expect(renderedComponent.refs.wrappedComponent.props.definition)
                .toHaveProperty('firstName');
            // console.log('firstName %j', renderedComponent.refs.wrappedComponent.props.definition.firstName)
        });
    });


});
