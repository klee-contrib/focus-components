import Panel from '../';
import {init, translate} from 'focus-core/translation';
const {findRenderedDOMComponentWithClass, renderIntoDocument, Simulate} = TestUtils;

describe('The Panel', () => {
    describe('when mounted with no props', () => {
        let reactComponent, domNode;
        before(() => {
            reactComponent = renderIntoDocument(<Panel />);
            domNode = ReactDOM.findDOMNode(reactComponent);
        });
        it('should render data-focus attribute', () => {
            expect(reactComponent).to.exist;
            expect(reactComponent).to.be.an('object');
            expect(domNode.tagName).to.equal('DIV');
            expect(domNode.getAttribute('data-focus')).to.equal('panel');
            expect(domNode.getAttribute('data-spy')).not.to.be.null;
            expect(domNode.getAttribute('data-spy')).not.to.be.undefined;
        });
        it('should have a data-spy attribute', () => {
            expect(domNode.getAttribute('data-spy')).not.to.be.null;
            expect(domNode.getAttribute('data-spy')).not.to.be.undefined;
        });
        it('should be material designed', () => {
            expect(domNode.getAttribute('class')).to.equal('mdl-card mdl-card--border mdl-shadow--4dp');
        });
        it('should have a title section', () => {
            const titleSection = domNode.querySelector('[data-focus="panel-title"]');
            expect(titleSection).to.exist;
        });
        it('should have a content section', () => {
            const contentSection = domNode.querySelector('[data-focus="panel-content"]');
            expect(contentSection).to.exist;
        });
        it('should not have a top actions', () => {
            const topActions = domNode.querySelector('[data-focus="panel-title"] .actions');
            expect(topActions).not.to.exist;
        });
        it('should not have a bottom actions section', () => {
            const bottomSection = domNode.querySelector('[data-focus="panel-actions"]');
            expect(bottomSection).not.to.exist;
        });
    });
    describe('when mounted with title props', () => {
        init({resStore: {dev: {translation: {panel: {title: 'This is a title'}}}}}, () => {
            let reactComponent, domNode;
            const title = 'panel.title';
            before(() => {
                reactComponent = renderIntoDocument(<Panel title={title} />);
                domNode = ReactDOM.findDOMNode(reactComponent);
            });
            it('should display a title', () => {
                const titleContent = domNode.querySelector('[data-focus="panel-title"] h3');
                expect(titleContent).to.exist;
                expect(titleContent.tagName).to.equal('H3');
                expect(titleContent.getAttribute('data-spy-title')).to.exist;
                expect(titleContent.innerHTML).to.equal(translate(title));
            });
        });
    });
    describe('when mounted with actions props', () => {
        let domNode, reactComponent;
        const actions = () => <span>{'actions'}</span>;
        describe('by default', () => {
            before(() => {
                reactComponent = renderIntoDocument(<Panel actions={actions} />);
                domNode = ReactDOM.findDOMNode(reactComponent);
            });
            it('should display actions top by default', () => {
                const topActions = domNode.querySelector('[data-focus="panel-title"] .actions');
                expect(topActions).to.exist;
            });
            it('should not have a bottom actions section', () => {
                const bottomSection = domNode.querySelector('[data-focus="panel-actions"]');
                expect(bottomSection).not.to.exist;
            });
        });
        describe('with actionsPosition top', () => {
            before(() => {
                reactComponent = renderIntoDocument(<Panel actions={actions} actionsPosition='top' />);
                domNode = ReactDOM.findDOMNode(reactComponent);
            });
            it('should display actions at the top', () => {
                const topActions = domNode.querySelector('[data-focus="panel-title"] .actions');
                expect(topActions).to.exist;
            });
            it('should not display action at the bottom', () => {
                const bottomSection = domNode.querySelector('[data-focus="panel-actions"]');
                expect(bottomSection).not.to.exist;
            });
        });
        describe('with actionsPosition bottom', () => {
            before(() => {
                reactComponent = renderIntoDocument(<Panel actions={actions} actionsPosition='bottom' />);
                domNode = ReactDOM.findDOMNode(reactComponent);
            });
            it('should not display actions at the top', () => {
                const topActions = domNode.querySelector('[data-focus="panel-title"] .actions');
                expect(topActions).not.to.exist;
            });
            it('should display action at the bottom', () => {
                const bottomSection = domNode.querySelector('[data-focus="panel-actions"]');
                expect(bottomSection).to.exist;
            });
        });
        describe('with actionsPosition both', () => {
            before(() => {
                reactComponent = renderIntoDocument(<Panel actions={actions} actionsPosition='both' />);
                domNode = ReactDOM.findDOMNode(reactComponent);
            });
            it('should display actions at the top', () => {
                const topActions = domNode.querySelector('[data-focus="panel-title"] .actions');
                expect(topActions).to.exist;
            });
            it('should display action at the bottom', () => {
                const bottomSection = domNode.querySelector('[data-focus="panel-actions"]');
                expect(bottomSection).to.exist;
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
