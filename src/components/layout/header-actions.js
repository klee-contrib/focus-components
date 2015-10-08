import React, {Component} from 'react';
import Focus from 'focus-core';
import Button from '../../common/button/action';
import Dropdown from '../../common/select-action';

// variables
const applicationStore = Focus.application.builtInStore;

// Components
const ButtonComponent = Button.component;
const DropdownComponent = Dropdown.component;

// component default props.
//const defaultProps = {};

// component props definition.
//const propTypes = {};

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
    componentWillUnMount() {
        applicationStore.removeActionsChangeListener(this._handleComponentChange);
    }

    /**
    * Get state from store
    * @return {Object} actions extracted from the store
    */
    _getStateFromStore = () => {
        return {actions: applicationStore.getActions() || {primary: [], secondary: []}};
    }

    /**
    * Component change handler
    */
    _handleComponentChange = () => {
        this.setState(this._getStateFromStore());
    }

    /** @inheriteddoc */
    render() {
        const {...otherProps} = this.props;
        const {actions} = this.state;
        return (
            <div data-focus='header-actions' {...otherProps}>
                {actions.primary.map((primary)=>{
                    return (
                        <ButtonComponent handleOnClick={primary.action} icon={primary.icon} label={primary.label} shape='fab' style={{className: primary.className}} type='button'/>
                    );
                })}
                <DropdownComponent iconProps={{name: 'more_vert'}} operationList={actions.secondary} shape='fab'/>
            </div>
        );
    }
}

//Static props.
HeaderActions.displayName = 'HeaderActions';
//HeaderActions.defaultProps = defaultProps;
//HeaderActions.propTypes = propTypes;

export default HeaderActions;
