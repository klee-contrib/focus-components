
import TestUtils from 'react-dom/test-utils';
import React from 'react';

import ComponentBaseBehaviour from '../';
import ReactDOM from 'react-dom';
import { init } from 'focus-core/translation';

describe('The component base behaviour', () => {
    let renderedComponent;
    beforeEach(() => {
        init({ resources: {} });
        @ComponentBaseBehaviour
        class TestComponent extends React.Component {
            render() {
                return (
                    <div>
                        {this.i18n('my.translation.path')}
                    </div>
                );
            }
        }
        renderedComponent = TestUtils.renderIntoDocument(<TestComponent />);
        // done();
        // });
    });
    it('should add at least the translation function to the provided component', () => {
        const child = TestUtils.findRenderedDOMComponentWithTag(renderedComponent, 'div');
        expect(ReactDOM.findDOMNode(child).innerHTML).toBe('my.translation.path');
    });
});
