import 'material-design-lite/material';
import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next-client';
//Import focus components
import FocusComponents from '../';
import Catalog from './catalog';
import Layout from './layout';
import resStore from './resources';
import './style/template.scss';
import './style/demo.scss';

// exposing in windows
window.React = React;
window.ReactDOM = ReactDOM;
window.FocusComponents = FocusComponents;

document.addEventListener('DOMContentLoaded', ()=> {
    // Render the showcase
    i18n.init({resStore, lng: 'dev'}, ()=>{
        console.log('Translation correctlyzzz.');
        // render the showcase into the document
        ReactDOM.render(
            <Layout title='Component catalog'><Catalog /></Layout>,
            document.querySelector('body')
        );

    });
});
