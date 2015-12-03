import React, {PropTypes} from 'react';
import {getEntityInformations} from 'focus-core/definition/entity/builder';
import {isNull, isUndefined, isArray, isString} from 'lodash/lang';

/**
 * This function is a behaviour. It aims to comment a component to a definition.
 *  - A definition is related to the data model
 *  - Each field of the domain have a definition which contains its domain and the fact that it is required ot not.
 *  - The definitions of your application should have been set using `focus-core/definition/entity/container/setEntityConfiguration`
 * @param  {string | array} definitionPath - A string or an array of the definition path to the configuration.
 * @param  {object} additionalDefinition - If you need to override a definition for a specific component, you can use this object.
 * @return {function} - A function to commect a component to a definition.
 */
export default function definitionBehaviout(definitionPath, additionalDefinition){

    // Arguments validation
    if(isUndefined(definitionPath) || isNull(definitionPath)|| !isString(definitionPath) || !isArray(definitionPath)){
        throw new Error('the definition path should be givent in order to to know the domain of your entity property.');
    }
    if(!isUndefined(additionalDefinition) && !isNull(additionalDefinition) && !isObject(additionalDefinition)){
        throw new Error('The additional definition if is defined should be an object');
    }

    // Definition Construction
    const definitionConf = isArray(definitionPath) ? definitionPath : [definitionPath];
    const definition = definitionConf.reduce((valeurPrecedente, valeurCourante) => ({...valeurPrecedente, ...getEntityInformations(definitionPath, additionalDefinition)}), {});

    // annotation
    return function wrapWithDefinition(ComponentToWrap){

        // Save the display name for later
        const displayName = DecoratedComponent.displayName || 'Component';

        // Wrapped component
        function DefinitionWrappedComponent(props) {
            return <ComponentToWrap definition={definition} {...props}/>;
        }

        DefinitionWrappedComponent.displayName =  `${displayName}WithDefinition`;

        return DefinitionWrappedComponent
    }
}

/*
 Example
// ES6

class MyComponent{
    render(){
      return <div>{JSON.stringify(this.props)}</div>;

    }
}

const MyComponentWithDefinition = definition('path.to.my.awesome.entity')(MyComponent);

 // ES7

@definition('path.to.my.awesome.entity')
class MyComponent{
    render(){
      return <div>{JSON.stringify(this.props)}</div>;

    }
}

*/
