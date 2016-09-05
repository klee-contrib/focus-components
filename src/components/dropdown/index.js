import React, {Component, PureComponent, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import MDBehaviour from '../../../behaviours/material';
import Button from '../../components/button';
import {translate} from 'focus-core/translation';
import uniqueId from 'lodash/util/uniqueId';
import map from 'lodash/collection/map';

class Dropdown extends PureComponent {
    constructor(props) {
        this._htmlId = uniqueId('dropdown-');
    };

    /**
    * Render the component.
    * @returns  {XML} Htm code.
    */
    render() {
        const {iconProps, operationList, position, shape} = this.props;
        return (0 === operationList.length ? null : <ActionMenu id={this._htmlId} iconProps={iconProps} operationList={operationList} position={position} shape={shape} />);
    };
};

@MDBehaviour('dropdown')
class ActionMenu extends Component {
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
    };


    _handleAction(action) {
        return () => {
            if (this.props.operationParam) {
                action(this.props.operationParam);
            } else {
                action();
            }
        };
    };

    _handleButtonClick() {
        this.setState({menuVisible: !this.state.menuVisible});
    };

    render() {
        const {menuVisible} = this.state;
        const {id, iconProps, operationList, position, shape} = this.props;
        const mdlClasses = `mdl-menu mdl-menu--bottom-${position} mdl-js-menu mdl-js-ripple-effect`;
        return (
            <div data-focus='dropdown'>
                <Button icon={iconProps.name} id={id} isJs={true} shape={shape} handleOnClick={this._handleButtonClick.bind(this)} />
                <ul className={mdlClasses} htmlFor={id} ref='dropdown'>
                    {map(operationList, (operation, idx) => (
                        <li className={`mdl-menu__item ${operation.style}`} key={idx}
                            onClick={this._handleAction(operation.action)}>
                            {translate(operation.label)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
};

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
