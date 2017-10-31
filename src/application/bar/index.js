import builder from 'focus-core/component/builder';
import React from 'react';
import applicationStore from 'focus-core/application/built-in-store';

const barMixin = {
    /**
    * Get initial state
    * @return {object} Initial state
    */
    getInitialState() {
        return this._getStateFromStore();
    },
    /**
    * Component will mount
    */
    componentWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use components from focus-components/components/layout folder');
        applicationStore.addSummaryComponentChangeListener(this._handleComponentChange);
        applicationStore.addBarContentLeftComponentChangeListener(this._handleComponentChange);
        applicationStore.addBarContentRightComponentChangeListener(this._handleComponentChange);
    },
    /**
    * Component will unmount.
    */
    componentWillUnmount() {
        applicationStore.removeSummaryComponentChangeListener(this._handleComponentChange);
        applicationStore.removeBarContentLeftComponentChangeListener(this._handleComponentChange);
        applicationStore.removeBarContentRightComponentChangeListener(this._handleComponentChange);
    },
    /**
    * Get state from store
    * @return {object} state from store
    */
    _getStateFromStore() {
        return {
            summaryComponent: applicationStore.getSummaryComponent(),
            barContentLeftComponent: applicationStore.getBarContentLeftComponent(),
            barContentRightComponent: applicationStore.getBarContentRightComponent()
        };
    },
    /**
    * Component change handler.
    */
    _handleComponentChange() {
        this.setState(this._getStateFromStore());
    },
    /**
    * Render the component
    * @return {HTML} Rendered component
    */
    render() {
        const { barContentLeftComponent, barContentRightComponent, summaryComponent } = this.state;
        return (
            <div data-focus='bar'>
                <div data-focus='bar-content-left'>
                    {barContentLeftComponent && (
                        <barContentLeftComponent.component {...barContentLeftComponent.props} />
                    )}
                </div>
                <div data-focus='bar-content-right'>
                    {barContentRightComponent && (
                        <barContentRightComponent.component {...barContentRightComponent.props} />
                    )}
                </div>
                <div data-focus='bar-content-middle'>
                    {summaryComponent && (
                        <summaryComponent.component {...summaryComponent.props} />
                    )}
                </div>
            </div>
        );
    }
};

const { mixin, component } = builder(barMixin);
export { mixin, component };
export default { mixin, component };
