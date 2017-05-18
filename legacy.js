'use strict';

var _lang = require('lodash/lang');

var _checkbox = require('./components/input/checkbox');

var _toggle = require('./components/input/toggle');

var _select = require('./components/input/select');

var _scrollspyContainer = require('./components/scrollspy-container');

var _panel = require('./components/panel');

var legacy = {
    common: {
        input: {
            text: { component: InputText, mixin: InputText },
            checkbox: { component: _checkbox.InputCheckbox, mixin: _checkbox.InputCheckbox },
            toggle: { component: _toggle.InputToggle, mixin: _toggle.InputToggle }
        },
        select: {
            classic: { component: _select.Select, mixin: _select.Select }
        },
        detail: { component: _scrollspyContainer.ScrollspyContainer },
        block: { component: _panel.Panel }
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJsZWdhY3kiLCJjb21tb24iLCJpbnB1dCIsInRleHQiLCJjb21wb25lbnQiLCJJbnB1dFRleHQiLCJtaXhpbiIsImNoZWNrYm94IiwidG9nZ2xlIiwic2VsZWN0IiwiY2xhc3NpYyIsImRldGFpbCIsImJsb2NrIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBLElBQU1BLFNBQVM7QUFDWEMsWUFBUTtBQUNKQyxlQUFPO0FBQ0hDLGtCQUFNLEVBQUNDLFdBQVdDLFNBQVosRUFBdUJDLE9BQU9ELFNBQTlCLEVBREg7QUFFSEUsc0JBQVUsRUFBQ0gsa0NBQUQsRUFBMkJFLDhCQUEzQixFQUZQO0FBR0hFLG9CQUFRLEVBQUNKLDhCQUFELEVBQXlCRSwwQkFBekI7QUFITCxTQURIO0FBTUpHLGdCQUFRO0FBQ0pDLHFCQUFTLEVBQUNOLHlCQUFELEVBQW9CRSxxQkFBcEI7QUFETCxTQU5KO0FBU0pLLGdCQUFRLEVBQUVQLGlEQUFGLEVBVEo7QUFVSlEsZUFBTyxFQUFFUix1QkFBRjtBQVZIO0FBREcsQ0FBZiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2Nsb25lfSBmcm9tICdsb2Rhc2gvbGFuZyc7XHJcbmltcG9ydCB7SW5wdXRDaGVja2JveH0gZnJvbSAnLi9jb21wb25lbnRzL2lucHV0L2NoZWNrYm94JztcclxuaW1wb3J0IHtJbnB1dFRvZ2dsZX0gZnJvbSAnLi9jb21wb25lbnRzL2lucHV0L3RvZ2dsZSc7XHJcbmltcG9ydCB7U2VsZWN0fSBmcm9tICcuL2NvbXBvbmVudHMvaW5wdXQvc2VsZWN0JztcclxuaW1wb3J0IHtTY3JvbGxzcHlDb250YWluZXJ9IGZyb20gJy4vY29tcG9uZW50cy9zY3JvbGxzcHktY29udGFpbmVyJ1xyXG5pbXBvcnQge1BhbmVsfSBmcm9tICcuL2NvbXBvbmVudHMvcGFuZWwnXHJcblxyXG5jb25zdCBsZWdhY3kgPSB7XHJcbiAgICBjb21tb246IHtcclxuICAgICAgICBpbnB1dDoge1xyXG4gICAgICAgICAgICB0ZXh0OiB7Y29tcG9uZW50OiBJbnB1dFRleHQsIG1peGluOiBJbnB1dFRleHR9LFxyXG4gICAgICAgICAgICBjaGVja2JveDoge2NvbXBvbmVudDogSW5wdXRDaGVja2JveCwgbWl4aW46IElucHV0Q2hlY2tib3h9LFxyXG4gICAgICAgICAgICB0b2dnbGU6IHtjb21wb25lbnQ6IElucHV0VG9nZ2xlLCBtaXhpbjogSW5wdXRUb2dnbGV9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWxlY3Q6IHtcclxuICAgICAgICAgICAgY2xhc3NpYzoge2NvbXBvbmVudDogU2VsZWN0LCBtaXhpbjogU2VsZWN0fVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGV0YWlsOiB7IGNvbXBvbmVudDogU2Nyb2xsc3B5Q29udGFpbmVyIH0sXHJcbiAgICAgICAgYmxvY2s6IHsgY29tcG9uZW50OiBQYW5lbCB9XHJcbiAgICB9XHJcbn1cclxuIl19