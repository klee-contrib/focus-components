const builder = require('focus').component.builder;
const React = require('react');
const uuid = require('uuid');
const Button = require('../../common/button/action').component;

const {componentHandler} = window;

const Dropdown = {

    /**
    * Display name.
    */
    displayName: 'Dropdown',
    /**
    * Default props.
    * @returns {object} Defauilt props.
    */
    getDefaultProps() {
        return {
            operationList: [],
            iconProps: {
                name: 'ellipsis-v'
            }
        };
    },
    /**
     * Component will mount
     */
    componentWillMount(){
        this._htmlId = uuid.v4();
    },
    /**
    * Called when component is mounted.
    */
    componentDidMount() {
        if (0 !== this.props.operationList.length && React.findDOMNode(this.refs.dropdown)) {
            componentHandler.upgradeElement(React.findDOMNode(this.refs.dropdown));
        }
    },
    /**
     * Component will receive props.
     * @param {Object} nextProps the next props
     */
    componentWillReceiveProps(nextProps) {
        if (0 !== nextProps.operationList.length && React.findDOMNode(this.refs.dropdown)) {
            componentHandler.upgradeElement(React.findDOMNode(this.refs.dropdown));
        }
    },
    /**
    * Called before component is unmounted.
    */
    componentWillUnmount() {
        if (0 !== this.props.operationList.length && React.findDOMNode(this.refs.dropdown)) {
            componentHandler.downgradeElements(React.findDOMNode(this.refs.dropdown));
        }
    },
    /**
    * Handle action on selected item.
    * @param {function} action Action to call
    * @returns {function} Function called when item is selected.
    * @private
    */
    _handleAction(action) {
        return () => {
            if (this.props.operationParam) {
                action(this.props.operationParam);
            } else {
                action();
            }
        };
    },
    /**
    * Render the component.
    * @returns  {XML} Htm code.
    */
    render() {
        const {iconProps, operationList} = this.props;
        const id = this._htmlId;
        if (0 === operationList.length) {
            return null;
        }
        return (
            <div>
                <Button icon={iconProps.name} id={id} isJs={true} shape='icon' />
                <ul className='mdl-menu mdl-menu--bottom-right mdl-js-menu' htmlFor={id} ref='dropdown'>
                    {operationList.map((operation, idx) => {
                        return (
                            <li className={`mdl-menu__item ${operation.style}`} key={idx} onClick={this._handleAction(operation.action)}>
                                {operation.label}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
};

module.exports = builder(Dropdown);
