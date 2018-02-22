import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';

import ActionMenu from './action-menu';

/**
 * Dropdown component
 * 
 * @class Dropdown
 * @extends {Component}
 */
class Dropdown extends Component {

    /**
     * Creates an instance of Dropdown.
     * @param {any} props component props
     * @memberof Dropdown
     */
    constructor(props) {
        super(props);
    }

    /** @inheritdoc */
    componentWillMount() {
        this._htmlId = uuid.v4();
    }

    /** @inheritdoc */
    render() {
        const { iconProps, operationList, position, shape } = this.props;
        const id = this._htmlId;
        if (0 === operationList.length) {
            return null;
        }
        return (
            <ActionMenu id={id} iconProps={iconProps} operationList={operationList} position={position} shape={shape} />
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