import React, {Component} from 'react';
import Focus from 'focus-core';

//variables
const applicationStore = Focus.application.builtInStore;

// component default props.
//const defaultProps = {};

// component props definition.
//const propTypes = {};


/**
* HeaderTopRow component.
*/
class HeaderTopRow extends Component {
    constructor(props) {
        super(props);
        this.state = this._getStateFromStore();
    }

    /** @inheriteddoc */
    componentWillMount() {
        applicationStore.addSummaryComponentChangeListener(this._handleComponentChange);
        applicationStore.addBarContentLeftComponentChangeListener(this._handleComponentChange);
        applicationStore.addBarContentRightComponentChangeListener(this._handleComponentChange);
    }

    /** @inheriteddoc */
    componentWillUnMount() {
        applicationStore.removeSummaryComponentChangeListener(this._handleComponentChange);
        applicationStore.removeBarContentLeftComponentChangeListener(this._handleComponentChange);
        applicationStore.removeBarContentRightComponentChangeListener(this._handleComponentChange);
    }

    _getStateFromStore() {
        return {
            summaryComponent: applicationStore.getSummaryComponent(),
            barContentLeftComponent: applicationStore.getBarContentLeftComponent(),
            barContentRightComponent: applicationStore.getBarContentRightComponent()
        };
    }

    /**
    * Component change handler.
    */
    _handleComponentChange = () => {
        this.setState(this._getStateFromStore());
    }

    /**
    * Render the component
    * @return {HTML} Rendered component
    */
    render() {
        const {barContentLeftComponent, barContentRightComponent, summaryComponent} = this.state;
        return (
            <div data-focus='header-top-row'>
                <div>
                    <div data-focus='header-top-row-left'>
                        {barContentLeftComponent &&
                            <barContentLeftComponent.component {...barContentLeftComponent.props}/>
                        }
                    </div>
                    <div data-focus='header-top-row-right'>
                        {barContentRightComponent &&
                            <barContentRightComponent.component {...barContentRightComponent.props}/>
                        }
                    </div>
                    <div data-focus='header-top-row-middle'>
                        {summaryComponent &&
                            <summaryComponent.component {...summaryComponent.props}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}


//Static props.
HeaderTopRow.displayName = 'HeaderTopRow';
//HeaderTopRow.defaultProps = defaultProps;
//HeaderTopRow.propTypes = propTypes;

export default HeaderTopRow;
