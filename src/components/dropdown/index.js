import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Button from '../../components/button';
import {translate} from 'focus-core/translation';
import uuid from 'uuid';

class Dropdown extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * Component will mount
     */
    componentWillMount() {
        this._htmlId = uuid.v4();
    }

    /**
     * Called when component is mounted.
     */
    componentDidMount() {
        if (0 !== this.props.operationList.length && ReactDOM.findDOMNode(this.refs.dropdown)) {
            componentHandler.upgradeElement(ReactDOM.findDOMNode(this.refs.dropdown));
        }
    }

    /**
     * Component will receive props.
     * @param {Object} nextProps the next props
     */
    componentWillReceiveProps(nextProps) {
        if (0 !== nextProps.operationList.length && ReactDOM.findDOMNode(this.refs.dropdown)) {
            componentHandler.upgradeElement(ReactDOM.findDOMNode(this.refs.dropdown));
        }
    }

    /**
     * Called before component is unmounted.
     */
    componentWillUnmount() {
        if (0 !== this.props.operationList.length && ReactDOM.findDOMNode(this.refs.dropdown)) {
            componentHandler.downgradeElements(ReactDOM.findDOMNode(this.refs.dropdown));
        }
    }

    /**
     * Render the component.
     * @returns  {XML} Htm code.
     */
    render() {
        const {iconProps, operationList, position, shape} = this.props;
        const id = this._htmlId;
        if (0 === operationList.length) {
            return null;
        }
        return (
            <ActionMenu id={id} iconProps={iconProps} operationList={operationList} position={position} shape={shape}/>
        );
    }

}


class ActionMenu extends React.Component {
    /**
     * Handle action on selected item.
     * @param {function} action Action to call
     * @returns {function} Function called when item is selected.
     * @private
     */

    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false
        };
    }


    _handleAction(action) {
        return () => {
            if (this.props.operationParam) {
                action(this.props.operationParam);
            } else {
                action();
            }
        };
    }

    _handleButtonClick() {
        this.setState({menuVisible: !this.state.menuVisible});
    }

    renderMenuItems(menuVisible,operationList) {
        operationList.map((operation, idx) => {

                    return (

                        <li className={`mdl-menu__item ${operation.style}`} key={idx}
                            onClick={this._handleAction(operation.action)}>
                            {translate(operation.label)}
                        </li>
                    )
            }
        )


    }


    render() {
        const {menuVisible} = this.state;
        const {id,iconProps, operationList, position, shape} = this.props;
        return (
            <div>
                <Button icon={iconProps.name} id={id} isJs={true} shape={shape}
                        handleOnClick={this._handleButtonClick.bind(this)}/>

                <div>
                    <ul className={`mdl-menu mdl-menu--bottom-${position} mdl-js-menu mdl-js-ripple-effect`}
                        htmlFor={id}
                        ref='dropdown'>
                        { operationList.map((operation, idx) => {

                            return (

                                <li className={`mdl-menu__item ${operation.style}`} key={idx}
                                    onClick={this._handleAction(operation.action)}>
                                    {translate(operation.label)}
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}


Dropdown.displayName = 'Dropdown';
Dropdown.defaultProps = {
    position: 'right',
    iconProps: {
        name: 'more_vert'
    },
    shape: 'icon',
    operationList: []
};
Dropdown.propTypes = {
    position: PropTypes.string,
    iconProps: PropTypes.object,
    operationList: PropTypes.array,
    shape: PropTypes.string
};
export default Dropdown;
