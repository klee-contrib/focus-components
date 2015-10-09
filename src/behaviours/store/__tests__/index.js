import storeConnectBehaviour from '../connect';
const {renderIntoDocument, Simulate} = TestUtils;
import {store, dispatcher} from 'focus-core';
const {CoreStore} = store;


describe('The store connect behaviour', () => {
    describe('when called without storeConf', () => {
        it('should throw an error', () => {
            expect(() => storeConnectBehaviour()).to.throw('connectToStores: you need to provide an array of store config.');
        });
    });
    describe('when called without getState', () => {
        it('should throw an error', () => {
            expect(() => storeConnectBehaviour([])).to.throw('connectToStores: you need to provide function to read state from store.');
        });
    });
    describe('when called with correct argument', () => {
        it('should return a function', () => {
            expect(() => storeConnectBehaviour([], () => {})).to.be.a.function;
        });
    });
    describe('when called with a store', () => {
        let renderComponent;
        const storeChangeSpy = sinon.spy();
        const conectedComponentRenderSpy = sinon.spy();
        const newStore = new CoreStore({definition: {papa: 'papa', lopez: 'lopez'}});
        const connector = storeConnectBehaviour(
            [{store: newStore, properties: ['papa', 'lopez']}],
            (props) => {const storeValue = newStore.getValue(); storeChangeSpy(storeValue); return storeValue; }
        );
        const Component = (props) => { console.log(props); conectedComponentRenderSpy(props); return <div>{JSON.stringify(props)}</div>;};
        const ConnectedComponent = connector(Component);
        before(
            () => {
                renderComponent = renderIntoDocument(<ConnectedComponent testProps='testPropsValue'/>);
            }
        );
        it('should call the getState method on mounting', () => {
            expect(storeChangeSpy).to.have.been.called.once;
            expect(storeChangeSpy).to.have.been.calledWith({});
            expect(conectedComponentRenderSpy).to.have.been.called.once;
            expect(conectedComponentRenderSpy).to.have.been.calledWith({testProps: 'testPropsValue'});
        });
        describe('when a value is dispatched' , () => {
            before(() => {
                dispatcher.handleViewAction({
                    data: {
                        lopez: 'joe',
                        papa: 'singe'
                    },
                    type: 'update'
                });
            });
            it('should render the component with the state value', () => {
                expect(storeChangeSpy).to.have.been.called.thrice; //Mounting, joe, singe
                //expect(storeChangeSpy.getCall(0)).to.equal({ lopez: 'joe', papa: 'singe'});
                // expect(storeChangeSpy).to.have.been.calledWith({ lopez: 'joe', papa: 'singe'});//
                expect(conectedComponentRenderSpy).to.have.been.called.twice;
            });
            it('should render the component with the state value', () => {
                expect(storeChangeSpy).to.have.been.called.thrice; //Mounting, joe, singe
                expect(conectedComponentRenderSpy).to.have.been.called.twice;
            });
            it('should render the component with the state value', () => {
                const domNode = ReactDOM.findDOMNode(renderComponent);
                expect(JSON.parse(domNode.innerHTML)).to.deep.equal({lopez: 'joe', papa: 'singe', testProps: 'testPropsValue'});
            });
        });

    });
});
