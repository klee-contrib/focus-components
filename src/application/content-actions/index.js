// Libs
import isArray from 'lodash/lang/isArray';
import isObject from 'lodash/lang/isObject';
// Dependencies
import builder from 'focus-core/component/builder';
// Stores
import applicationStore from 'focus-core/application/built-in-store';
// Mixins
import stylableBehaviour from '../../mixin/stylable';
// Components
import Button from '../../components/button';
import { component as Dropdown } from '../../common/select-action';

const ContentActions = {

    mixins: [stylableBehaviour],

    /** @inheritdoc */
    getInitialState() {
        return this._getStateFromStore();
    },

    /** @inheritdoc */
    componentWillMount() {
        applicationStore.addActionsChangeListener(this._handleComponentChange);
    },

    /** @inheritdoc */
    componentWillUnmount() {
        applicationStore.removeActionsChangeListener(this._handleComponentChange);
    },

    /**
     * Get state from store
     * @return {Object} actions extracted from the store
     */
    _getStateFromStore() {
        return {
            actions: applicationStore.getActions() || { primary: [], secondary: [] }
        };
    },

    /**
     * Component change handler
     */
    _handleComponentChange() {
        this.setState(this._getStateFromStore());
    },

    /**
     * Render a fab component.
     * @param {object} fab Fab.
     * @returns {JSXElement} Component.
     */
    renderFabAction(fab) {
        if (isArray(fab.action)) {
            return (
                <Dropdown
                    iconProps={{ name: fab.icon, iconLibrary: fab.iconLibrary }}
                    operationList={fab.action}
                    shape='fab'
                />
            );
        } else {
            return (
                <Button
                    handleOnClick={fab.action}
                    icon={fab.icon}
                    iconLibrary={fab.iconLibrary}
                    label={fab.label}
                    style={{ className: fab.className }}
                    shape='fab'
                    type='button'
                />
            );
        }
    },

    /** @inheritdoc */
    render() {
        const { actions: { primary, secondary } } = this.state;
        return (
            <div className={this._getStyleClassName()} data-focus='content-actions'>
                {primary.map((action) => this.renderFabAction(action))}
                {isArray(secondary) && this.renderFabAction({ action: secondary })}
                {isObject(secondary) && this.renderFabAction(secondary)}
            </div>
        );
    }
};

const { mixin, component } = builder(ContentActions);
export { mixin, component };
export default { mixin, component };
