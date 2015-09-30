import 'material-design-lite/material';
window.jQuery = require('jquery');
window._ = require('lodash');
window.Backbone = require('backbone');
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

// exposing in windows
window.React = React;
window.ReactDOM = ReactDOM;
window.Focus = FocusCore;
window.FocusComponents = FocusComponents;
window.moment = moment;
//Import the router
import './router';
window.i18n = i18n;

document.addEventListener('DOMContentLoaded', ()=> {
    // Render the showcase
    i18n.init({resStore, lng: 'dev'}, ()=>{
        console.log('Translation correctlyzzz.');
        Backbone.history.start();
    });
});
