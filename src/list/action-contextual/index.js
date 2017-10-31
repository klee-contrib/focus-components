// Dependencies
import React from 'react';
import builder from 'focus-core/component/builder';
// Components
import Button from '../../components/button';
import SelectAction from '../../components/dropdown';

const actionContextualMixin = {

    /**
    * Display name.
    */
    displayName: 'ActionContextual',

    /**
    * Init default props.
    * @returns {object} Default props.
    */
    getDefaultProps() {
        return {
            buttonComponent: Button,
            operationList: [],
            operationParam: undefined
        };
    },

    /**
    * Init default state.
    * @returns {oject} Initial state.
    */
    getInitialState() {
        return {
            isSecondaryActionListExpanded: false // true if secondary actionList is expanded.
        };
    },

    /**
    * Handle contextual action on click.
    * @param {string} key Action key.
    * @return {function} action handler.
    */
    _handleAction(key) {
        const { operationList, operationParam } = this.props;
        return event => {
            event.preventDefault();
            event.stopPropagation();
            if (operationParam) {
                operationList[key].action(operationParam);
            } else {
                operationList[key].action();
            }
        };
    },

    /**
    * render the component.
    * @returns {JSX} Html code.
    */
    render() {
        const { operationList, operationParam, buttonComponent } = this.props;
        const { isSecondaryActionListExpanded } = this.state;
        const { primaryActionList, secondaryActionList } = operationList.reduce((actionLists, operation, key) => {
            let { primaryActionList: primaryActions, secondaryActionList: secondaryActions } = actionLists;
            if (1 === operation.priority) {
                primaryActions.push(
                    <this.props.buttonComponent
                        handleOnClick={this._handleAction(key)}
                        icon={operation.icon}
                        iconLibrary={operation.iconLibrary}
                        key={key}
                        label={operation.label}
                        shape={operation.style && operation.style.shape || 'icon'}
                        style={operation.style || {}}
                        type='button'
                        {...this.props}
                        {...operation}
                    />
                );
            } else {
                secondaryActions.push(operation);
            }
            return actionLists;
        }, { primaryActionList: [], secondaryActionList: [] });
        return (
            <div className='list-action-contextual'>
                <span>{primaryActionList}</span>
                <SelectAction
                    isExpanded={isSecondaryActionListExpanded}
                    operationList={secondaryActionList}
                    operationParam={operationParam}
                />
            </div>
        );
    }
};

const { component, mixin } = builder(actionContextualMixin);
export { component, mixin };
export default { component, mixin };
