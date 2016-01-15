import React, {Component} from 'react';
import applicationStore from 'focus-core/application/built-in-store';
import {component as Button} from '../../common/button/action';
import Dropdown from '../../components/icon-dropdown';

/**
* HeaderActions component.
*/
class HeaderActions extends Component {
    constructor(props) {
        super(props);
        this.state = this._getStateFromStore();
    }

    /** @inheriteddoc */
    componentWillMount() {
        applicationStore.addActionsChangeListener(this._handleComponentChange);
    }

    /** @inheriteddoc */
    componentWillUnmount() {
        applicationStore.removeActionsChangeListener(this._handleComponentChange);
    }

    /**
    * Get state from store
    * @return {Object} actions extracted from the store
    */
    _getStateFromStore = () => {
        return {actions: applicationStore.getActions() || {primary: [], secondary: []}};
    };

    /**
    * Component change handler
    */
    _handleComponentChange = () => {
        this.setState(this._getStateFromStore());
    };

    /** @inheriteddoc */
    render() {
        const {...otherProps} = this.props;
        const {actions} = this.state;
        return (
            <div data-focus='header-actions' {...otherProps}>
                {actions.primary.map((primary, index) => {
                    const {action, className, icon, iconLibrary, label, ...otherProps} = primary;
                    return (
                        <Button key={`header-action-${index}`} className={className} handleOnClick={action} icon={icon} iconLibrary={iconLibrary} label={label} shape='fab' type='button' {...otherProps}/>
                    );
                })}
                {actions.secondary && actions.secondary.length > 0 && <Dropdown operationList={actions.secondary}/>}
            </div>
        );
    }
}

//Static props.
HeaderActions.displayName = 'HeaderActions';
//HeaderActions.defaultProps = defaultProps;
//HeaderActions.propTypes = propTypes;

export default HeaderActions;
