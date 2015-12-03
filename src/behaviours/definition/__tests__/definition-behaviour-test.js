import DefinitionBehaviour from '../';
import {definition} from 'focus-core';
const DOMAIN = {
	DO_TEXT: {
		style: "do_text",
		type: "text",
		component: "PapaSinge",
		validation: [{
			type: "function",
			value: function() {
				return false;
			}
		}]
	},
	DO_EMAIL: {
		style: "do_email",
		type: "email",
		component: "PapaMail",
		validation: [{
			type: "function",
			value: function() {
				return true;
			}
		}]
	}
};

const entityMock = {
  contact: {
    firstName: {
      domain: "DO_TEXT",
      required: false
    },
    lastName: {
      domain: "DO_TEXT",
      required: true
    },
    age: {
      "domain": "DO_NUMBER",
      "required": false
    },
    email: {
      domain: "DO_EMAIL",
      required: false
    }
  }
};

// initialize the entity conf.
definition.domain.container.setAll(DOMAIN);
definition.entity.container.setEntityConfiguration(entityMock);

describe('The definition behaviour', () => {

    describe('when called with a wrong definition path', () => {
        it('shoud throw an error when the param is undefined',  () => {
            expect(() => DefinitionBehaviour()).to.throw(Error);
        });
        it('shoud throw an error when when the param is null',  () => {
            expect(() => DefinitionBehaviour(null)).to.throw(Error);
        });
        it('shoud throw an error when the param is an object',  () => {
            expect(() => DefinitionBehaviour({})).to.throw(Error);
        });
        it('shoud throw a number when the param is an object',  () => {
            expect(() => DefinitionBehaviour(1)).to.throw(Error);
        });
        it('shoud not throw an error when the param is a string and not the definition map',  () => {
            expect(() => DefinitionBehaviour('test')).to.throw(Error);
        });
        it('shoud not throw an error when the param is a string and in the definition map',  () => {
            expect(() => DefinitionBehaviour('contact')).to.not.throw(Error);
        });
        it.only('Annotation test', () => {


            class TestComponent extends React.Component {
                render() {
                    return (
                        <div ref='myRef'>
                            {this.props.test}
                        </div>
                    );
                }
            }

			const CompWithDef = DefinitionBehaviour('contact')(TestComponent);
			console.log('CompWithDef')
			console.log(CompWithDef)
            const renderedComponent = TestUtils.renderIntoDocument(<CompWithDef test='hello'/>);
            console.log(renderedComponent);
            expect(renderedComponent.props).to.have.property('contact')

        })
        /*before(() => {
            @DefinitionBehaviour('contact')
            class TestComponent extends React.Component {
                render() {
                    return (
                        <div ref='myRef'>
                        {this.props.test}
                        </div>
                    );
                }
            }
            TestUtils.renderIntoDocument(<TestComponent test='hello'/>);
        });
        it('should not bind mdl JS', () => {
            expect(mdlSpy.upgradeElement).not.to.be.called;
        });*/
    });


});
