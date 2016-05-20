import React, {PropTypes} from 'react';
import connectToStore from 'focus-components/behaviours/store/connect';

// PropTypes
const propTypes = {
    children: PropTypes.element,
    storeProperties:
    PropTypes.arrayOf(
        PropTypes.shape({
            store: PropTypes.any.isRequired,
            properties: PropTypes.arrayOf(PropTypes.string)
        })
    ),
    storeGetFunction: PropTypes.func.isRequired,
    component: PropTypes.func.isRequired
};
// defaultProps
const defaultProps = {
};
//displayName
const displayName = 'StoreConnector';

const StoreConnector = ({storeProperties, storeGetFunction, component, ...others}) => {
    const ConnectedComp = connectToStore(storeProperties, storeGetFunction)(component);
    return (<ConnectedComp {...others}/>);
};

//Static props.
StoreConnector.propTypes = propTypes;
StoreConnector.defaultProps = defaultProps;
StoreConnector.displayName = displayName;

export default StoreConnector;

/* HOW TO USE */
/* import MyComp from ...
* const storeProperties = [{store: MyStore, properties: ['node1', 'node2']}];
* const storeGetFunction = () => (MyStore.getValue());
*
* return (
*	 <StoreConnector storeProperties={storeProperties} storeGetFunction={storeGetFunction} component={MyComp}
* 					 prop1={'truc'} prop2={5}
* 	>
* 			<div>{'truc'}
* 			....
* 	</StoreConnector>
* );
*/
