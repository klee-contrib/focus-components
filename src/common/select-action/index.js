const builder = require('focus').component.builder;
const React = require('react');
const Icon = require('../icon').component;
const uuid = require('uuid');

const {componentHandler} = window;

const selectActionMixin = {

    /**
    * Display name.
    */
    displayName: 'select-action',
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
     * Called when component is mounted.
     */
    componentDidMount() {
        componentHandler.upgradeElement(React.findDOMNode(this.refs.button));
        componentHandler.upgradeElement(React.findDOMNode(this.refs.dropdown));
    },

    /**
     * Called before component is unmounted.
     */
    componentWillUnmount() {
        componentHandler.downgradeElements(React.findDOMNode(this.refs.button));
        componentHandler.downgradeElements(React.findDOMNode(this.refs.dropdown));
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
        if (0 === operationList.length) {
            return null;
        }
        const id = uuid.v4();
        return (
            <div>
                <button className='mdl-button mdl-js-button mdl-button--icon' id={id} ref='button'>
                    <Icon {...iconProps}/>
                </button>
                <ul className='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect' htmlFor={id} ref='dropdown'>
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

module.exports = builder(selectActionMixin);
