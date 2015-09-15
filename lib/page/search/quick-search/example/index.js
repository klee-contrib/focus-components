'use strict';

Focus.reference.config.set({
    scopes: function scopes() {
        return new Promise(function (success) {
            success([{
                code: 'face',
                label: 'Utilisateurs'
            }, {
                code: 'extension',
                label: 'Extensions'
            }, {
                code: 'contact_phone',
                label: 'Contacts'
            }]);
        });
    }
});

Focus.definition.entity.container.setEntityConfiguration({
    contact: {
        firstName: {
            domain: 'DO_TEXT',
            required: false
        },
        lastName: {
            domain: 'DO_TEXT',
            required: true
        },
        age: {
            domain: 'DO_NUMBER',
            required: false
        },
        email: {
            domain: 'DO_EMAIL',
            required: false
        }
    }
});

var countId = 0;

var getSearchService = function getSearchService(scoped) {
    return function (criteria) {
        return new Promise(function (success) {
            window.setTimeout(function () {
                var _data;

                var groups = {
                    Test: [{
                        id: countId++,
                        firstName: 'toto',
                        lastName: 'ceci est un test'
                    }, {
                        id: countId++,
                        firstName: 'tata',
                        lastName: 'deuxieme test'
                    }],
                    Autre: [{
                        id: countId++,
                        firstName: 'toto',
                        lastName: 'ceci est un test'
                    }, {
                        id: countId++,
                        firstName: 'tata',
                        lastName: 'deuxieme test'
                    }]
                };

                var list = [{
                    id: countId++,
                    firstName: 'toto',
                    lastName: 'ceci est un test'
                }, {
                    id: countId++,
                    firstName: 'tata',
                    lastName: 'deuxieme test'
                }];

                var payload = scoped ? list : groups;
                var data = (_data = {
                    facets: {}
                }, _data[scoped ? 'list' : 'groups'] = payload, _data.totalCount = 20, _data);
                success(data);
                // Focus.dispatcher.handleServerAction({
                //     data: data, type: 'update'
                // });
            }, 1000);
        });
    };
};

var service = {
    unscoped: getSearchService(false),
    scoped: getSearchService(true)
};

var Line = React.createClass({
    mixins: [FocusComponents.list.selection.line.mixin],
    displayName: 'ResultLine',
    definitionPath: 'contact',
    renderLineContent: function renderLineContent(data) {
        return React.createElement(
            'div',
            null,
            data.firstName + ' ' + data.lastName
        );
    }
});

var Group = React.createClass({
    displayName: 'ResultGroup',
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h2',
                null,
                this.props.groupKey
            ),
            this.props.children
        );
    }
});

var quickSearchProps = {
    onLineClick: function onLineClick(line) {
        alert('click sur la ligne ' + line.id);
    },
    scope: 'SCP2',
    groupMaxRows: 3,
    lineComponentMapper: function lineComponentMapper(list) {
        return Line;
    },
    service: service,
    groupComponent: Group
};

var QuickSearchComponent = FocusComponents.page.search.quickSearch.component;

return React.createElement(QuickSearchComponent, quickSearchProps);