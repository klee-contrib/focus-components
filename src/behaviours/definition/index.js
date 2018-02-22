//Dependencies
import PropTypes from 'prop-types';

import React, { Component } from 'react';
import isNull from 'lodash/lang/isNull';
import isUndefined from 'lodash/lang/isUndefined';
import isArray from 'lodash/lang/isArray';
import isString from 'lodash/lang/isString';
import isObject from 'lodash/lang/isObject';

// Import from focus-core 
// We need to investigate why import {getEntityInformations} from 'focus-core/entity/builder' didn't work, maybe an ES2015 related issue with babel.
// Maybe because the node modules reads from the builded lib  instead of src.
import { getEntityInformations } from 'focus-core/definition/entity/builder';


/**
 * This function is a behaviour. It aims to comment a component to a definition.
 *  - A definition is related to the data model
 *  - Each field of the domain have a definition which contains its domain and the fact that it is required ot not.
 *  - The definitions of your application should have been set using `focus-core/definition/entity/container/setEntityConfiguration`
 * @param  {string | array} definitionPath - A string or an array of the definition path to the configuration.
 * @param  {object} additionalDefinition - If you need to override a definition for a specific component, you can use this object.
 * @return {function} - A function to commect a component to a definition.
 * @example please read the end of the file.
 */
export default function definitionBehaviour(definitionPath, additionalDefinition) {

    // Arguments validation
    if (isUndefined(definitionPath) || isNull(definitionPath) || (!isString(definitionPath) && !isArray(definitionPath))) {
        throw new Error('the definition path should be givent in order to to know the domain of your entity property.');
    }
    if (!isUndefined(additionalDefinition) && !isNull(additionalDefinition) && !isObject(additionalDefinition)) {
        throw new Error('The additional definition if is defined should be an object');
    }

    // Definition Construction
    const definitionConf = isArray(definitionPath) ? definitionPath : [definitionPath];
    const definition = definitionConf.reduce((valeurPrecedente, valeurCourante) => ({ ...valeurPrecedente, ...getEntityInformations(definitionPath, additionalDefinition) }), {});

    // annotation
    // The wrapped component should have a props containing the definition object.
    return function wrapComponentWithDefinition(ComponentToWrap) {

        // Save the display name for later
        const displayName = ComponentToWrap.displayName || 'Component';

        // TODO: @reviewer
        // It could have been nice to have a pure function for this.
        // Except for the tests, do we need a React.Component class and a ref.
        // I think it is safer to have it instead of a pure function.
        // Maybe we should have a look on `ownPropertyDescriptor` instead of wrapping class aruoud component for this case.
        // But having everything as props is really clean.

        // # Wrapped component
        //        function DefinitionWrappedComponent(props) {
        //            return <ComponentToWrap definition={definition} {...props}/>;
        //        }

        /**
         * This class stands for the wrapped component with its props plus the definition object as props.
         * It has a reference to the wrapped component in `this.refs.wrappedComponent`
         */
        class DefinitionWrappedComponent extends Component {
            render() {
                return <ComponentToWrap ref='wrappedComponent' definition={definition} {...this.props} />;
            }
        }

        // Add with definition to the name of the component.
        DefinitionWrappedComponent.displayName = `${displayName}WithDefinition`;

        return DefinitionWrappedComponent;
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
// The annotation is just a function, you compose your component with a definition builder.
const MyComponentWithDefinition = definition('path.to.my.awesome.entity')(MyComponent);

 // ES7

@definition('path.to.my.awesome.entity')
class MyComponent{
    render(){
      return <div>{JSON.stringify(this.props)}</div>;

    }
}

*/