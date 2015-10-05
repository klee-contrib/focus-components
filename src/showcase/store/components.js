import {store} from 'focus-core';
const ListStore = store.ListStore;
// Store wich contains all the query and the filtered elements
const listStore = new ListStore({identifier: 'COMPONENT_CATALOG'});
export default listStore;
