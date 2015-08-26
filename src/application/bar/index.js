const builder = require('focus').component.builder;
const React = require('react');
const applicationStore = require('focus').application.builtInStore;

const barMixin = {
    /**
    * Default props
    * @return {object} Default props
    */
    getDefaultProps() {
        return {
            style: {}
        };
    },
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
        applicationStore.addSummaryComponentChangeListener(this._handleComponentChange);
        applicationStore.addBarContentLeftComponentChangeListener(this._handleComponentChange);
        applicationStore.addBarContentRightComponentChangeListener(this._handleComponentChange);
    },
    /**
    * Component will unmount
    */
    componentWillUnMount() {
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
    * Component change handler
    */
    _handleComponentChange() {
        this.setState(this._getStateFromStore());
    },
    /**
    * Render the component
    * @return {HTML} Rendered component
    */
    render() {
        const className = `bar ${this.props.style.className}`;
        const {barContentLeftComponent, barContentRightComponent, summaryComponent} = this.state;
        return (
            <div className={className} data-focus='bar'>
                <div data-focus='bar-content-left'>
                    {barContentLeftComponent &&
                        <barContentLeftComponent.component {...barContentLeftComponent.props}/>
                    }
                </div>
                <div data-focus='bar-content-right'>
                    {barContentRightComponent &&
                        <barContentRightComponent.component {...barContentRightComponent.props}/>
                    }
                </div>
                <div data-focus='bar-content-middle'>
                    {summaryComponent &&
                        <summaryComponent.component {...summaryComponent.props}/>
                    }
                </div>
            </div>
        );
    }
};

module.exports = builder(barMixin);
