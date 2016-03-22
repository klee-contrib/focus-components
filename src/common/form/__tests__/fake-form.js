import React, {Component, PropTypes} from 'react';
import {mixin as formMixin} from  '../../../common/form' ;
import {translate} from 'focus-core/translation';
import uuid from 'uuid';
import {action,contactStore} from './environment';


const BasicFakeForm = React.createClass({

    definitionPath: 'contact',
    displayName: 'BasicFakeForm',
    mixins: [formMixin],

    componentWillMount() {
        this._htmlId = uuid.v4();
    },


    renderContent() {
        return (
            <div>{this.children}</div>
        );
    },

});

const FakeForm = React.createClass({

    definitionPath: 'contact',
    displayName: 'FakeForm',
    mixins: [formMixin],
    referenceNames :['papas', 'singe'],
    action :action,
    stores: [{
        store: contactStore,
        properties: ['contact', 'commandes']
    }],

    componentWillMount() {
        this._htmlId = uuid.v4();
    },
    renderContent() {
        return (
          <div>{this.children}</div>
        );
    },

});

export default
{
    BasicFakeForm : BasicFakeForm,
    FakeForm :FakeForm,
}

