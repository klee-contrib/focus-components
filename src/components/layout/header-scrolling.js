import React, {Component, PropTypes} from 'react';
import Focus from 'focus-core';
import ReactDom from 'react-dom';
import {pluck, sortBy} from 'lodash/collection';
import Scroll from '../../behaviours/scroll';

// variables
const applicationStore = Focus.application.builtInStore;

// component default props.
const defaultProps = {
    canDeploy: true, // Determines if the header can be deployed (revealing the cartridge component) or not.
    deployThreshold: 150, // The y-scrolling threshold that shows/hides the cartridge.
    notifySizeChange: undefined, // A handler to notify other elements that the header has added/removed the cartridge.
    scrollTargetSelector: undefined // Selector for the domNode on which the scroll is attached.
};

// component props definition.
const propTypes = {
    canDeploy: PropTypes.bool,
    deployThreshold: PropTypes.number,
    notifySizeChange: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    scrollTargetSelector: PropTypes.string
};

/**
* HeaderScrolling component.
*/
@Scroll
class HeaderScrolling extends Component {
    constructor(props) {
        super(props);
        let storeState = this._getStateFromStore()
        storeState.canDeploy = props.canDeploy;
        storeState.isDeployed = props.canDeploy;
        this.state = storeState;
    }

    /** @inheriteddoc */
    componentWillMount() {
        this.handleScroll();
        const {scrollTargetSelector} = this.props;
        this.scrollTargetNode = (scrollTargetSelector && scrollTargetSelector !== '') ? document.querySelector(scrollTargetSelector) : window;
        applicationStore.addModeChangeListener(this._handleChangeApplicationStatus);
        applicationStore.addRouteChangeListener(this._handleChangeApplicationStatus);
        applicationStore.addCanDeployChangeListener(this._handleChangeApplicationStatus);
    }

    /** @inheriteddoc */
    componentDidMount() {
        this.scrollTargetNode.addEventListener('scroll', this.handleScroll);
        this.scrollTargetNode.addEventListener('resize', this.handleScroll);
    }

    _handleChangeApplicationStatus = () => {
        this.handleScroll();
        this.setState(this._getStateFromStore());
    }

    _getStateFromStore = () => {
        const processMode = applicationStore.getMode();
        let mode = 'consult';

        if (processMode && processMode.edit && processMode.edit > 0) {
            mode = 'edit';
        }

        return {
            mode: mode,
            route: applicationStore.getRoute(),
            canDeploy: applicationStore.getCanDeploy()
        };
    }

    /** @inheriteddoc */
    componentWillUnmount() {
        this.scrollTargetNode.removeEventListener('scroll', this.handleScroll);
        this.scrollTargetNode.removeEventListener('resize', this.handleScroll);
        applicationStore.removeModeChangeListener(this._handleChangeApplicationStatus);
        applicationStore.removeRouteChangeListener(this._handleChangeApplicationStatus);
        applicationStore.removeCanDeployChangeListener(this._handleChangeApplicationStatus);
    }

   /**
    * Notify other elements that the header has added/removed the cartridge.
    */
    _notifySizeChange = () => {
        const {notifySizeChange} = this.props;
        const {isDeployed} = this.state;
        if (notifySizeChange) {
            notifySizeChange(isDeployed);
        }
    }

    /**
    * Handle the scroll event in order to show/hide the cartridge.
    * @param {object} event [description]
    */
    handleScroll = (event) => {
        const {top} = this.scrollPosition();
        let isDeployed = this.state.canDeploy ? top < this.props.deployThreshold : false;

        if (isDeployed !== this.state.isDeployed) {
            this.setState({isDeployed}, this._notifySizeChange);
        }
    }

    /** @inheriteddoc */
    render() {
        const {mode, route, isDeployed} = this.state;
        const {children} = this.props;
        return (
            <header data-focus='header-scrolling' data-mode={mode} data-route={route} data-deployed={isDeployed}>
                {children}
            </header>
        );
    }
}

// Static props.
HeaderScrolling.displayName = 'HeaderScrolling';
HeaderScrolling.defaultProps = defaultProps;
HeaderScrolling.propTypes = propTypes;

export default HeaderScrolling;
