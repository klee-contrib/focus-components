import TranslationBehaviour from '../';
import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next-client';

describe.skip('The translation behaviour', () => {
    let renderedComponent;
    before((done) => {
        i18n.init({}, () => {
            @TranslationBehaviour
            class TestComponent extends React.Component {
                render() {
                    return (
                        <div>
                            {this.i18n('my.translation.path')}
                        </div>
                    );
                }
            }
            renderedComponent = TestUtils.renderIntoDocument(<TestComponent/>);
            done();
        });
    });
    it('should add the translation function to the provided component', () => {
        const child = TestUtils.findRenderedDOMComponentWithTag(renderedComponent, 'div');
        expect(ReactDOM.findDOMNode(child).innerHTML).to.equal('my.translation.path');
    });
});
