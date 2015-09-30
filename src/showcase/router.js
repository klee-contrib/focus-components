import jQuery from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import React from 'react';
import ReactDOM from 'react-dom';
import Catalog from './catalog';
import Layout from './layout';

const ShowCaseRouter =  Backbone.Router.extend({
    routes: {
        '': 'showcase',
        'component/:name': 'component',
        'query/:query': 'query'
    },
    showcase(){
        console.log('showcase');
        // render the showcase into the document
        return ReactDOM.render(
            <Layout title='Component catalog'><Catalog /></Layout>,
            document.querySelector('body')
        );
    },
    component(name){
        console.log('component', name);
        return ReactDOM.render(
            <Layout title={`component ${name}`}><Catalog component={name} /></Layout>,
            document.querySelector('body')
        );
    },
    query(query){
        console.log('query route', query);
        return ReactDOM.render(
            <Layout title={`query ${query}`}><Catalog query={query}/></Layout>,
            document.querySelector('body')
        );
    }
});
export default new ShowCaseRouter();
