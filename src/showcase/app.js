import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next-client';
import Catalog from './catalog';
import Layout from './layout';
import resStore from './resources';

// exposing in windows
window.React = React;
window.ReactDOM = ReactDOM;
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
