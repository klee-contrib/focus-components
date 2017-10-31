// Libs
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
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use components from focus-components/components/layout folder');
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
     * Render a list fab component.
     * @param {object} fab Fab.
     * @returns {JSXElement} Component.
     */
    renderFabListAction(fab) {
        if (Array.isArray(fab.action) && fab.action.length > 0) {
            const { icon, iconLibrary, action, ...otherProps } = fab;
            return (
                <Dropdown
                    iconProps={{ name: icon, iconLibrary }}
                    operationList={action}
                    shape='fab'
                    {...otherProps}
                />
            );
        }
    },

    /**
     * Render a fab component.
     * @param {object} fab Fab.
     * @returns {JSXElement} Component.
     */
    renderFabAction(fab) {
        const { action, className, icon, iconLibrary, label, ...otherProps } = fab;
        return (
            <Button
                key={`header-action-${label}`}
                className={className}
                handleOnClick={action}
                icon={icon}
                iconLibrary={iconLibrary}
                label={label}
                shape='fab'
                type='button'
                {...otherProps}
            />
        );
    },

    /** @inheritdoc */
    render() {
        const { actions: { primary, secondary } } = this.state;

        return (
            <div className={this._getStyleClassName()} data-focus='content-actions'>
                {primary.map((action) => action && Array.isArray(action.action) ? this.renderFabListAction(action) : this.renderFabAction(action))}
                {Array.isArray(secondary) && this.renderFabListAction({ action: secondary })}
                {isObject(secondary) && this.renderFabListAction(secondary)}
            </div>
        );
    }
};

const { mixin, component } = builder(ContentActions);
export { mixin, component };
export default { mixin, component };
