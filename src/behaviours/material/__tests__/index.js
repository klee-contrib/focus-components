import MaterialBehaviour from '../';

describe.skip('The Material behaviour', () => {
    let mdlSpy;
    before(() => {
        mdlSpy = global.componentHandler = {
            upgradeElement: sinon.spy(),
            downgradeElements: sinon.spy()
        };
    });
    describe('when called with no ref', () => {
        before(() => {
            @MaterialBehaviour()
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
        });
    });
    describe('when called with a bad ref', () => {
        before(() => {
            @MaterialBehaviour('badRef')
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
        });
    });
    describe('when called with a good ref', () => {
        before(() => {
            @MaterialBehaviour('myRef')
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

        it('should bind mdl JS once', () => {
            expect(mdlSpy.upgradeElement).to.be.called.once;
        });
    });
});
