import React, {Component, PropTypes} from 'react';
import {mixin as formMixin} from  '../../../common/form' ;
import {translate} from 'focus-core/translation';
import uuid from 'uuid';
import {action} from './environment';

const mixins = ['papas', 'singe'];

const BasicFakeForm = React.createClass({

    definitionPath: 'contact',
    displayName: 'BasicFakeForm',
    mixins: [formMixin],
    //referenceNames :mixins,
    //action :action,
    /**
     * Component will mount
     */
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
    displayName: 'Dummy',
    mixins: [formMixin],
    referenceNames :mixins,
    action :action,
    /**
     * Component will mount
     */
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

