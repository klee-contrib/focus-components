import storeConnectBehaviour from '../connect';

describe.only('The store connect behaviour', () => {
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
});
