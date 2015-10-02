import jQuery from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import React from 'react';
import ReactDOM from 'react-dom';
import Catalog from './catalog';
import Layout from './layout';
import Sandbox from './live-component';
import componentsStore from './store/components';
import findComponent from './service/getComponentFromIndex';
const ShowCaseRouter =  Backbone.Router.extend({
    routes: {
        '': 'showcase',
        'component/:name': 'component',
        'component/:name/detail': 'componentDetail',
        'query/:query': 'query'
    },
    showcase(){
        console.log('showcase');
        // render the showcase into the document
        return ReactDOM.render(
            <Layout title='Component catalog'><Catalog store={componentsStore}/></Layout>,
            document.querySelector('body')
        );
    },
    component(name){
        console.log('component', name);
        const component = findComponent(name);
        return ReactDOM.render(
            <Layout title={`component ${name}`}><Detail component={component} /></Layout>,
            document.querySelector('body')
        );
    },
    componentDetail(name){
            console.log('component detail', name);
            const component = findComponent(name);
            return ReactDOM.render(
                <Sandbox component={component} />,
                document.querySelector('body')
            );
    },
    query(query){
        console.log('query route', query);
        return ReactDOM.render(
            <Layout title={`query ${query}`}><Catalog store={componentsStore} query={query}/></Layout>,
            document.querySelector('body')
        );
    }
});
export default new ShowCaseRouter();
