// Dependencies

const builder = require('focus-core').component.builder;

// Stores

const applicationStore = require('focus-core').application.builtInStore;

// Mixins

const stylableBehaviour = require('../../mixin/stylable');

// Components

const Button = require('../../common/button/action').component;
const Dropdown = require('../../common/select-action').component;

const ContentActions = {
    mixins: [stylableBehaviour],
    /** @inheriteddoc */
    getInitialState() {
        return this._getStateFromStore();
    },
    /** @inheriteddoc */
    componentWillMount() {
        applicationStore.addActionsChangeListener(this._handleComponentChange);
    },
    /** @inheriteddoc */
    componentWillUnMount() {
        applicationStore.removeActionsChangeListener(this._handleComponentChange);
    },
    /**
     * Get state from store
     * @return {Object} actions extracted from the store
     */
    _getStateFromStore() {
        return {
            actions: applicationStore.getActions() || {primary: [], secondary: []}};
    },
    /**
     * Component change handler
     */
    _handleComponentChange() {
        this.setState(this._getStateFromStore());
    },
    /** @inheriteddoc */
    render() {
        const {actions} = this.state;
        return (
            <div className={this._getStyleClassName()} data-focus='content-actions'>
                {actions.primary.map((primary)=>{
                    return (
                        <Button handleOnClick={primary.action} icon={primary.icon} label={primary.label} shape='fab' style={{className: primary.className}} type='button'/>
                    );
                })}
                <Dropdown iconProps={{name: 'more_vert'}} operationList={actions.secondary} shape='fab'/>
            </div>
        );
    }
};

module.exports = builder(ContentActions);
