import React, {PropTypes} from 'react';
const Console = require('console').Console;

function getDisplayName(comp) {
    if ((comp.constructor) && (comp.constructor.displayName)) {
        return comp.constructor.displayName;
    } else {
        return "";
    }
}

const isNode=new Function("try {return this===global;}catch(e){return false;}");
console.groupCollapsed = function (args)
{
    this.log(args);
}

console.groupEnd = function (args)
{

}

function _logDebugInfos(view, inspect) {

    let displayName="";


    if (view) {
        displayName = getDisplayName(view);
    }

    console.log(`################ Infos Debug ${displayName}  ###############`);
    if (view) {
        console.groupCollapsed('**** defs ****');
        console.log('definitionPath: ', view.definitionPath);
        console.log('definition: ', view.definition);
        console.log('***************');
        console.groupEnd();

        if (view.props) {
            console.groupCollapsed('**** props ****');
            console.log('props: ', view.props);
            console.log('data: ', view.props.data);
            console.log('***************');
            console.groupEnd();
        } else {
            console.log('props: ', undefined);
        }
        if (view.state) {
            console.groupCollapsed('**** state *****');
            console.log('state: ', view.state);
            console.log('isEdit: ', view.state.isEdit);
            console.log('***************');
            console.groupEnd();

        } else {
            console.log('state: ', undefined);
        }

    } else {
        console.log('props view is not defined!!');
    }
    if (inspect) {
        console.log(getDisplayName(inspect), inspect);
    }
    console.log('#######################################################');

}

function checkService(serviceCall, params) {
    serviceCall.apply(undefined, params).then(
        function (valeur) {
            console.log("checkService",valeur);//"Succès"
        },
        function (valeur) {
            console.log("checkService",valeur);//"Succès"
        });
}

const component = React.createClass({
    displayName: 'debug',

    render()
    {
        console.log("comp", this.props.comp);
        let {view,inspect} = this.props;
        if (!view){
            view = this;
            console.log("this!!!!")
        }
        _logDebugInfos(view, inspect);
        let comp = this.props.comp || {cType: 'div'};
        let cType = comp.cType;
        let root = React.createElement(cType, {className: 'debug'}, this.props.children);
        return root;
    }
});

const mixin = {
    logDebugInfos(inspect) {
        _logDebugInfos(this, inspect);
    },
    checkService(serviceCall, params) {
       _checkService(serviceCall, params);
    }
};

export default {
    component,
    mixin
};
