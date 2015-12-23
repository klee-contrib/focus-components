import React, {Component, PropTypes} from 'react';
import Focus from 'focus-core';
import Scroll from '../../behaviours/scroll';

// Variables
const applicationStore = Focus.application.builtInStore;

// Component default props.
const defaultProps = {
    canDeploy: true, // Determines if the header can be deployed (revealing the cartridge component) or not.
    notifySizeChange: undefined, // A handler to notify other elements that the header has added/removed the cartridge.
    scrollTargetSelector: undefined // Selector for the domNode on which the scroll is attached.
};

// Component props definition.
const propTypes = {
    canDeploy: PropTypes.bool,
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
        this.setState(this._getStateFromStore());
        this.handleScroll();
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
            canDeploy: applicationStore.getCanDeploy(),
            isDeployed: applicationStore.getCanDeploy()
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
        let {deployThreshold, placeholderHeight} = this.state;

        if (this.state.isDeployed) {
            let content = document.querySelector('header');
            deployThreshold = content ? content.clientHeight - 60 : 1000;
            placeholderHeight = content ? content.clientHeight : 1000;
            this.setState({deployThreshold, placeholderHeight});
        }

        const {top} = this.scrollPosition();
        let isDeployed = this.state.canDeploy ? top < deployThreshold : false;

        if (isDeployed !== this.state.isDeployed) {
            this.setState({isDeployed}, this._notifySizeChange);
        }
    }

    /** @inheriteddoc */
    render() {
        const {mode, route, isDeployed, canDeploy, placeholderHeight} = this.state;
        const {children} = this.props;
        return (
            <header data-focus='header-scrolling' data-mode={mode} data-route={route} data-deployed={isDeployed}>
                {children}
                {!isDeployed ? <div style={{height: canDeploy ? placeholderHeight : 60, width: '100%'}} /> : ''}
            </header>
        );
    }
}

// Static props.
HeaderScrolling.displayName = 'HeaderScrolling';
HeaderScrolling.defaultProps = defaultProps;
HeaderScrolling.propTypes = propTypes;

export default HeaderScrolling;
