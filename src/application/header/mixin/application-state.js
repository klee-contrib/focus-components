import applicationStore from 'focus-core/application/built-in-store';

let applicationStateMixin = {
    /** @inheriteddoc */
    getInitialState: function getCartridgeInitialState() {
        return this._getStateFromStore();
    },
    /** @inheriteddoc */
    componentWillMount: function cartridgeWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use components from focus-components/components/layout folder');
        applicationStore.addModeChangeListener(this._handleChangeApplicationStatus);
        applicationStore.addRouteChangeListener(this._handleChangeApplicationStatus);
    },
    /** @inheriteddoc */
    appStateWillUnMount: function cartridgeWillUnMount() {
        applicationStore.removeModeChangeListener(this._handleChangeApplicationStatus);
        applicationStore.removeRouteChangeListener(this._handleChangeApplicationStatus);
    },
    _handleChangeApplicationStatus() {
        this.setState(this._getStateFromStore());
    },
    _getStateFromStore: function getCartridgeStateFromStore() {
        let processMode = applicationStore.getMode();
        let mode = 'consult';
        if (processMode && processMode.edit && processMode.edit > 0) {
            mode = 'edit';
        }
        return { mode: mode, route: applicationStore.getRoute() };
    }
};

export default applicationStateMixin;
