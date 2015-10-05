import 'material-design-lite/material';
import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next-client';
//Import focus components
import '../style';
import moment from 'moment';
import FocusCore from 'focus-core';
import FocusComponents from '../';
import resStore from './resources';
import './style/template.scss';
import './style/demo.scss';
import './service/create-index';
import 'highlight.js/styles/default.css'
// exposing in windows
window.jQuery = require('jquery');
window._ = require('lodash');
window.Backbone = require('backbone');
window.React = React;
window.ReactDOM = ReactDOM;
window.Focus = FocusCore;
window.FocusComponents = FocusComponents;
window.moment = moment;
//Import the router
import './router';
window.i18n = i18n;
document.addEventListener('DOMContentLoaded', ()=> {
    jQuery(document).on('click', 'a:not([data-bypass])', function touchHandler(evt) {
        const href = { prop: jQuery(this).prop('href'), attr: jQuery(this).attr('href') };
        const root = location.protocol + '//' + location.host + '/';

        if (href.prop && href.prop.slice(0, root.length) === root) {
            evt.preventDefault();
            Backbone.history.navigate(href.attr, true);
        }
    });

    //Init index
    // Render the showcase
    i18n.init({resStore, lng: 'dev'}, ()=>{
        console.log('Translation correctlyzzz.');
        Backbone.history.start();
    });
});
