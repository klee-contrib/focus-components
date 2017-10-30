// Libs
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import 'material-design-lite/material';
// Dependencies
import builder from 'focus-core/component/builder';
import { translate } from 'focus-core/translation';
// Components
import Button from '../../components/button';

const Dropdown = {

    /** DisplayName. */
    displayName: 'Dropdown',

    /** @inheritdoc */
    propTypes: {
        iconLibrary: PropTypes.string,
        iconProps: PropTypes.shape({
            name: PropTypes.string,
            iconLibrary: PropTypes.string
        }),
        operationList: PropTypes.array,
        position: PropTypes.string,
        shape: PropTypes.string
    },

    /** @inheritdoc */
    getDefaultProps() {
        return {
            iconProps: {
                name: 'more_vert',
                iconLibrary: undefined
            },
            operationList: [],
            position: 'right',
            shape: 'icon'
        };
    },

    /** @inheritdoc */
    componentWillMount() {
        this._htmlId = uuid.v4();
    },

    /** @inheritdoc */
    componentDidMount() {
        if (0 !== this.props.operationList.length && ReactDOM.findDOMNode(this.refs.dropdown)) {
            componentHandler.upgradeElement(ReactDOM.findDOMNode(this.refs.dropdown));
        }
    },

    /** @inheritdoc */
    componentWillReceiveProps(nextProps) {
        if (0 !== nextProps.operationList.length && ReactDOM.findDOMNode(this.refs.dropdown)) {
            componentHandler.upgradeElement(ReactDOM.findDOMNode(this.refs.dropdown));
        }
    },

    /** @inheritdoc */
    componentWillUnmount() {
        if (0 !== this.props.operationList.length && ReactDOM.findDOMNode(this.refs.dropdown)) {
            componentHandler.downgradeElements(ReactDOM.findDOMNode(this.refs.dropdown));
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

    /** @inheritdoc */
    render() {
        const { iconProps, operationList, position, shape } = this.props;
        const id = this._htmlId;

        if (0 === operationList.length) {
            return null;
        }

        return (
            <div>
                <Button icon={iconProps.name} iconLibrary={iconProps.iconLibrary} id={id} isJs shape={shape} />
                <ul className={`mdl-menu mdl-menu--bottom-${position} mdl-js-menu mdl-js-ripple-effect`} htmlFor={id} ref='dropdown'>
                    {operationList.map((operation, idx) => {
                        return (
                            <li className={`mdl-menu__item ${operation.style}`} key={idx} onClick={this._handleAction(operation.action)}>
                                {translate(operation.label)}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
};

const { mixin, component } = builder(Dropdown);
export default { mixin, component };
export { mixin, component };
