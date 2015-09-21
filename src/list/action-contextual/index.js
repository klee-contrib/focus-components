// Dependencies

const {builder} = require('focus-core').component;
const {reduce} = require('lodash/collection');

// Components

const Button = require('../../common/button/action').component;
const SelectAction = require('../../common/select-action').component;

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
        const {operationList, operationParam} = this.props;
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
        const {operationList, operationParam, buttonComponent} = this.props;
        const {isSecondaryActionListExpanded} = this.state;
        const {primaryActionList, secondaryActionList} = reduce(operationList, (actionLists, operation, key) => {
            let {primaryActionList: primaryActions, secondaryActionList: secondaryActions} = actionLists;
            if (1 === operation.priority) {
                primaryActions.push(
                    <this.props.buttonComponent
                        handleOnClick={this._handleAction(key)}
                        icon={operation.icon}
                        iconLibrary={operation.iconLibrary}
                        key={key}
                        label={operation.label}
                        shape={operation.style.shape || 'icon'}
                        style={operation.style || {}}
                        type='button'
                        {...this.props}
                        />
                );
            } else {
                secondaryActions.push(operation);
            }
            return actionLists;
        }, {primaryActionList: [], secondaryActionList: []}, this);
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

module.exports = builder(actionContextualMixin);
