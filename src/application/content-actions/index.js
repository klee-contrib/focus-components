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

    /** @inheritdoc */
    render() {
        const { actions: { primary, secondary } } = this.state;
        return (
            <div className={this._getStyleClassName()} data-focus='content-actions'>
                {primary.map((primary) => {
                    if (Array.isArray(primary.action)) {
                        return (
                            <Dropdown
                                iconProps={{ name: primary.icon, iconLibrary: primary.iconLibrary }}
                                operationList={primary.action}
                                shape='fab'
                            />
                        );
                    } else {
                        return (
                            <Button
                                handleOnClick={primary.action}
                                icon={primary.icon}
                                iconLibrary={primary.iconLibrary}
                                label={primary.label}
                                shape='fab'
                                style={{ className: primary.className }}
                                type='button'
                            />
                        );
                    }
                })}
                {isArray(secondary) && (
                    <Dropdown
                        iconProps={{ name: 'more_vert' }}
                        operationList={secondary}
                        shape='fab'
                    />
                )}
                {isObject(secondary) && (
                    <Dropdown
                        iconProps={{ name: secondary.icon || 'more_vert', iconLibrary: secondary.iconLibrary }}
                        operationList={secondary.action}
                        shape='fab'
                    />
                )}
            </div>
        );
    }
};

const { mixin, component } = builder(ContentActions);
export { mixin, component };
export default { mixin, component };
