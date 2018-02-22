
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import Panel from '../';
import { init, translate } from 'focus-core/translation';

const i18nConfig = {
    resources: {},
    lng: 'fr-FR'///langOpts.i18nCulture
};


const { findRenderedDOMComponentWithClass, renderIntoDocument, Simulate } = TestUtils;

describe('The Panel', () => {
    beforeEach(() => {
        init(i18nConfig);
    });

    describe('when mounted with no props', () => {
        let reactComponent, domNode;
        beforeEach(() => {
            reactComponent = renderIntoDocument(<Panel />);
            domNode = ReactDOM.findDOMNode(reactComponent);
        });
        it('should render data-focus attribute', () => {
            expect(reactComponent).toBeDefined();
            expect(reactComponent).toBeInstanceOf(Object);
            expect(domNode.tagName).toBe('DIV');
            expect(domNode.getAttribute('data-focus')).toBe('panel');
            expect(domNode.getAttribute('data-spy')).not.toBeNull();
            expect(domNode.getAttribute('data-spy')).not.toBeUndefined();
        });
        it('should have a data-spy attribute', () => {
            expect(domNode.getAttribute('data-spy')).not.toBeNull();
            expect(domNode.getAttribute('data-spy')).not.toBeUndefined();
        });
        it('should be material designed', () => {
            expect(domNode.getAttribute('class')).toBe('mdl-card mdl-card--border mdl-shadow--4dp');
        });
        it('should not have a title section', () => {
            const titleSection = domNode.querySelector('[data-focus="panel-title"]');
            expect(titleSection).toBeNull();
        });
        it('should have a content section', () => {
            const contentSection = domNode.querySelector('[data-focus="panel-content"]');
            expect(contentSection).toBeDefined();
        });
        it('should not have a top actions', () => {
            const topActions = domNode.querySelector('[data-focus="panel-title"] .actions');
            expect(topActions).toBeNull();
        });
        it('should not have a bottom actions section', () => {
            const bottomSection = domNode.querySelector('[data-focus="panel-actions"]');
            expect(bottomSection).toBeNull();
        });
    });
    describe('when mounted with title props', () => {
        init({ resources: { dev: { translation: { panel: { title: 'This is a title' } } } } }, () => {
            let reactComponent, domNode;
            const title = 'panel.title';
            beforeEach(() => {
                reactComponent = renderIntoDocument(<Panel title={title} />);
                domNode = ReactDOM.findDOMNode(reactComponent);
            });
            it('should display a title', () => {
                const titleContent = domNode.querySelector('[data-focus="panel-title"] h3');
                expect(titleContent).toBeDefined();
                expect(titleContent.tagName).toBe('H3');
                expect(titleContent.getAttribute('data-spy-title')).toBeDefined();
                expect(titleContent.innerHTML).toBe(translate(title));
            });
        });
    });
    describe('when mounted with actions props', () => {
        let domNode, reactComponent;
        const actions = () => <span>{'actions'}</span>;
        describe('by default', () => {
            beforeEach(() => {
                reactComponent = renderIntoDocument(<Panel actions={actions} />);
                domNode = ReactDOM.findDOMNode(reactComponent);
            });
            it('should display actions top by default', () => {
                const topActions = domNode.querySelector('[data-focus="panel-title"] .actions');
                expect(topActions).toBeDefined();
            });
            it('should not have a bottom actions section', () => {
                const bottomSection = domNode.querySelector('[data-focus="panel-actions"]');
                expect(bottomSection).toBeNull();
            });
        });
        describe('with actionsPosition top', () => {
            beforeEach(() => {
                reactComponent = renderIntoDocument(<Panel actions={actions} actionsPosition='top' />);
                domNode = ReactDOM.findDOMNode(reactComponent);
            });
            it('should display actions at the top', () => {
                const topActions = domNode.querySelector('[data-focus="panel-title"] .actions');
                expect(topActions).toBeDefined();
            });
            it('should not display action at the bottom', () => {
                const bottomSection = domNode.querySelector('[data-focus="panel-actions"]');
                expect(bottomSection).toBeNull();
            });
        });
        describe('with actionsPosition bottom', () => {
            beforeEach(() => {
                reactComponent = renderIntoDocument(<Panel actions={actions} actionsPosition='bottom' />);
                domNode = ReactDOM.findDOMNode(reactComponent);
            });
            it('should not display actions at the top', () => {
                const topActions = domNode.querySelector('[data-focus="panel-title"] .actions');
                expect(topActions).toBeNull();
            });
            it('should display action at the bottom', () => {
                const bottomSection = domNode.querySelector('[data-focus="panel-actions"]');
                expect(bottomSection).toBeDefined();
            });
        });
        describe('with actionsPosition both', () => {
            beforeEach(() => {
                reactComponent = renderIntoDocument(<Panel actions={actions} actionsPosition='both' />);
                domNode = ReactDOM.findDOMNode(reactComponent);
            });
            it('should display actions at the top', () => {
                const topActions = domNode.querySelector('[data-focus="panel-title"] .actions');
                expect(topActions).toBeDefined();
            });
            it('should display action at the bottom', () => {
                const bottomSection = domNode.querySelector('[data-focus="panel-actions"]');
                expect(bottomSection).toBeDefined();
            });
        });
    });
});


// <div className='mdl-card mdl-card--border mdl-shadow--4dp' data-spy={spyId} data-focus='panel' {...otherProps}>
//     <div className='mdl-card__title mdl-card--border' data-focus='panel-title'>
//         {title &&
//             <h3 data-spy-title>{this.i18n(title)}</h3>
//         }
//         {shouldDisplayActionsTop &&
//             <div className='actions'>{actions()}</div>
//         }
//     </div>
//     <div className='mdl-card__supporting-text' data-focus='panel-content'>
//         {children}
//     </div>
//     {shouldDisplayActionsBottom &&
//         <div className='mdl-card__actions mdl-card--border' data-focus='panel-actions'>
//             <div className='actions'>{actions()}</div>
//         </div>
//     }
// </div>
