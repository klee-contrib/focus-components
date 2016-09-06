import TranslationBehaviour from '../';
import React from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';

describe.only('The translation behaviour', () => {
    let renderedComponent;
    before((done) => {
        i18next.init({resources: {}}, () => {
            @TranslationBehaviour
            class TestComponent extends React.Component {
                render() {
                    return (
                        <div>
                            {i18next.t('my.translation.path')}
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
