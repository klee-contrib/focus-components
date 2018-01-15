import PropTypes from 'prop-types';
import React, { Component } from 'react';
import applicationStore from 'focus-core/application/built-in-store';
import Scroll from '../../behaviours/scroll';
import connect from '../../behaviours/store/connect';

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

// getState function.
function getState() {
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

/**
* HeaderScrolling component.
*/
@connect([{ store: applicationStore, properties: ['mode', 'route', 'canDeploy'] }], getState)
@Scroll
class HeaderScrolling extends Component {

    constructor(props) {
        super(props);

        this.state = { ...getState(), isDeployed: true };
    }

    /** @inheriteddoc */
    componentWillMount() {
        this.handleScroll();
        const { scrollTargetSelector } = this.props;
        this.scrollTargetNode = (scrollTargetSelector && scrollTargetSelector !== '') ? document.querySelector(scrollTargetSelector) : window;
    }

    /** @inheriteddoc */
    componentDidMount() {
        this.scrollTargetNode.addEventListener('scroll', this.handleScroll);
        this.scrollTargetNode.addEventListener('resize', this.handleScroll);
    }

    /** @inheriteddoc */
    componentWillReceiveProps({ canDeploy }) {
        this.setState({ isDeployed: true }, () => this.handleScroll(null, canDeploy));
    }

    /** @inheriteddoc */
    componentWillUnmount() {
        this.scrollTargetNode.removeEventListener('scroll', this.handleScroll);
        this.scrollTargetNode.removeEventListener('resize', this.handleScroll);
    }

    /**
     * Notify other elements that the header has added/removed the cartridge.
     */
    _notifySizeChange = () => {
        const { notifySizeChange } = this.props;
        const { isDeployed } = this.state;
        if (notifySizeChange) {
            notifySizeChange(isDeployed);
        }
    };

    /**
     * Handle the scroll event in order to show/hide the cartridge.
     * @param {object} event [description]
     */
    handleScroll = (event, canDeploy) => {
        let { deployThreshold, placeholderHeight } = this.state;

        if (this.state.isDeployed) {
            const content = this.refs ? this.refs.header : undefined;
            deployThreshold = content ? content.clientHeight - 60 : 1000; // 1000 is arbitrary, but a value high enough is required by default.
            placeholderHeight = content ? content.clientHeight : 1000;
            this.setState({ deployThreshold, placeholderHeight });
        }

        const { top } = this.scrollPosition();
        const isDeployed = (canDeploy !== undefined ? canDeploy : this.props.canDeploy) ? top <= deployThreshold : false;

        if (isDeployed !== this.state.isDeployed) {
            this.setState({ isDeployed }, this._notifySizeChange);
        }
    };

    /** @inheriteddoc */
    render() {
        const { isDeployed, placeholderHeight } = this.state;
        const { children, canDeploy, mode, route } = this.props;

        return (
            <header ref='header' data-focus='header-scrolling' data-mode={mode} data-route={route} data-deployed={isDeployed}>
                {children}
                {!isDeployed ? <div style={{ height: canDeploy ? placeholderHeight : 60, width: '100%' }} /> : ''}
            </header>
        );
    }
}

// Static props.
HeaderScrolling.displayName = 'HeaderScrolling';
HeaderScrolling.defaultProps = defaultProps;
HeaderScrolling.propTypes = propTypes;

export default HeaderScrolling;
