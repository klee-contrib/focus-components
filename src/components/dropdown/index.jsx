import React, {PropTypes, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import Material from '../../behaviours/material';
import Translation from '../../behaviours/translation';
import Button from '../button';
import uniqueId from 'lodash/uniqueId';
import map from 'lodash/map';

@Translation
@Material('dropdown')
class Dropdown extends PureComponent {
    constructor(props) {
        super(props);
        this._htmlId = uniqueId('dropdown-');
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
        const {button, position, operationList} = this.props;
        const mdlClasses = `mdl-menu mdl-menu--${position.vertical}-${position.horizontal} mdl-js-menu mdl-js-ripple-effect`;
        return (
            <div data-focus='dropdown'>
                <Button handleOnClick={this._handleButtonClick.bind(this)} icon={button.icon} id={this._htmlId} isJs={true} label={button.label} shape={button.shape}  />
                <ul className={mdlClasses} htmlFor={this._htmlId} ref='dropdown'>
                    {map(operationList, (operation, idx) => (
                        <li className={`mdl-menu__item ${operation.style}`} key={idx}
                            onClick={this._handleAction(operation.action)}>
                            {this.i18n(operation.label)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
};

Dropdown.displayName = 'Dropdown';
Dropdown.defaultProps = {
    position: {
        vertical: 'bottom',
        horizontal: 'left'
    },
    button: {
        icon: 'more_vert',
        shape: 'icon'
    }
};
Dropdown.propTypes = {
    position: PropTypes.shape ({
        vertical: PropTypes.string.isRequired,
        horizontal: PropTypes.string.isRequired
    }),
    button: PropTypes.shape ({
        icon: PropTypes.string,
        label: PropTypes.string,
        shape: PropTypes.string
    }),
    operationList: PropTypes.array.isRequired
};
export default Dropdown;
