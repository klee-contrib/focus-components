import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {component as Button} from '../../common/button/action';

function isDescendant(parent, child) {
     let node = child.parentNode;
     while (node != null) {
         if (node == parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}

class Dropdown extends Component {
    static propTypes = {
        openDirection: PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),
    };

    static defaultProps = {
        openDirection: 'bottom-left',
        iconProps: {
            name: 'more_vert',
            iconLibrary: 'material'
        },
        shape: 'fab',
        operationList: []
    };

    state = {
        visible: false
    };

    componentDidMount() {
        document.addEventListener('click', this._handleDocumentClick.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._handleDocumentClick);
    }

    _handleDocumentClick({target}) {
        const {visible} = this.state;
        if (visible) {
            const dropdownElement = ReactDOM.findDOMNode(this.refs.parent);
            if (!isDescendant(dropdownElement, target)) {
                this.setState({visible: false});
            }
        }
    }

    _handleIconClick() {
        this.setState({visible: !this.state.visible});
    }

    _operationActionWrapper(action) {
        return () => {
            action();
            this.setState({visible: false});
        }
    }

    render() {
        const {iconProps: {name, iconLibrary}, operationList, shape, openDirection} = this.props;
        const {visible} = this.state;
        return (
            <div data-focus='icon-dropdown' ref='parent'>
                <Button
                    shape={shape}
                    icon={name}
                    iconLibrary={iconLibrary}
                    handleOnClick={this._handleIconClick.bind(this)}
                    />
                {visible &&
                    <div data-focus='dropdown-menu' data-position={openDirection} ref='dropdown'>
                        {operationList.map(({label, action}, idx) => (<div key={idx} data-role='dropdown-item' onClick={this._operationActionWrapper(action)}>{label}</div>))}
                    </div>
                }
            </div>
        )
    }
}

export default Dropdown;
