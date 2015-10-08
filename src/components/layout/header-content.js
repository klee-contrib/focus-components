import React, {Component} from 'react';
import Focus from 'focus-core';

//variables
const applicationStore = Focus.application.builtInStore;

// component default props.
//const defaultProps = {};

// component props definition.
//const propTypes = {};

/**
* HeaderContent component.
*/
class HeaderContent extends Component {
    constructor(props) {
        super(props);
        this.state = this._getStateFromStore();
    }

    /** @inheriteddoc */
    componentWillMount() {
        applicationStore.addCartridgeComponentChangeListener(this._handleComponentChange);
    }

    /** @inheriteddoc */
    componentWillUnMount() {
        applicationStore.removeCartridgeComponentChangeListener(this._handleComponentChange);
    }

    /**
    * Read the component state from the connected stores.
    * @return {object} - The new state.
    */
    _getStateFromStore = () => {
        return {cartridgeComponent: applicationStore.getCartridgeComponent() || {component: 'div', props: {}}};
    }

    /**
    * Handle the component change cb.
    */
    _handleComponentChange = () => {
        this.setState(this._getStateFromStore());
    }

    /** @inheriteddoc */
    render() {
        const {cartridgeComponent} = this.state;
        const {component: Component, props} = cartridgeComponent;
        return (
            <div data-focus='header-content'>
                <Component {...props}/>
            </div>
        );
    }
}

//Static props.
HeaderContent.displayName = 'HeaderContent';
//HeaderContent.defaultProps = defaultProps;
//HeaderContent.propTypes = propTypes;

export default HeaderContent;
