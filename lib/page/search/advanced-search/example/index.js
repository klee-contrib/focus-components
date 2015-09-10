'use strict';

var Title = FocusComponents.common.title.component;
var Button = FocusComponents.common.button.action.component;

Focus.reference.config.set({
    scopes: function scopes() {
        return new Promise(function (success) {
            success([{
                code: 'SCP1',
                label: 'Scope 1'
            }, {
                code: 'SCP2',
                label: 'Scope 2'
            }, {
                code: 'SCP3',
                label: 'Scope 3'
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

var facets = {
    FCT_PAYS: {
        France: 5,
        Germany: 8
    },
    FCT_STATUS: {
        Open: 7,
        Closed: 2,
        'Status 1': 2,
        'Status 2': 2,
        'Status 3': 2,
        'Status 4': 2,
        'Status 5': 2
    },
    FCT_REGION: {
        'Ile de France': 11,
        'Nord - Pas de Calais': 6
    }
};

var getSearchService = function getSearchService(scoped) {
    return function (criteria) {
        return new Promise(function (success) {
            window.setTimeout(function () {
                var groups = {
                    FCT_PAYS: [{
                        id: countId++,
                        firstName: 'toto',
                        lastName: 'ceci est un test'
                    }, {
                        id: countId++,
                        firstName: 'tata',
                        lastName: 'deuxieme test'
                    }],
                    FCT_STATUS: [{
                        id: countId++,
                        firstName: 'toto',
                        lastName: 'ceci est un test'
                    }, {
                        id: countId++,
                        firstName: 'tata',
                        lastName: 'deuxieme test'
                    }]
                };

                var data = {
                    facets: facets,
                    groups: groups,
                    totalCount: 20
                };
                success(data);
            }, 1000);
        });
    };
};

var service = {
    unscoped: getSearchService(false),
    scoped: getSearchService(true)
};

var Line = React.createClass({
    displayName: 'Line',

    mixins: [FocusComponents.list.selection.line.mixin],
    definitionPath: 'contact',
    renderLineContent: function renderLineContent(data) {
        return React.createElement(
            'div',
            null,
            this.displayFor('firstName', {}),
            this.displayFor('lastName', {})
        );
    }
});

var Group = React.createClass({
    displayName: 'Group',

    mixins: [FocusComponents.common.i18n.mixin],
    _getShowAllHandler: function _getShowAllHandler(key) {
        var _this = this;

        return function () {
            _this.props.showAllHandler(key);
        };
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'listResultContainer panel', 'data-focus': 'group-result-container' },
            React.createElement(Title, { label: this.props.groupKey + ' (' + this.props.count + ')' }),
            React.createElement(
                'p',
                null,
                this.i18n('search.mostRelevant')
            ),
            React.createElement(
                'div',
                { className: 'resultContainer' },
                this.props.children
            ),
            React.createElement(
                'div',
                { 'data-focus': 'group-actions' },
                this.props.canShowMore && React.createElement(Button, { handleOnClick: this.props.showMoreHandler, label: this.i18n('show.more') }),
                React.createElement(Button, { handleOnClick: this._getShowAllHandler(this.props.groupKey), label: this.i18n('show.all') })
            )
        );
    }
});

var advancedSearchProps = {
    facetConfig: {
        FCT_PAYS: 'text',
        FCT_STATUS: 'text',
        FCT_REGION: 'text'
    },
    orderableColumnList: [{ key: 'col1', order: 'desc', label: 'Colonne 1 desc' }, { key: 'col1', order: 'asc', label: 'Colonne 1 asc' }, { key: 'col2', order: 'desc', label: 'Colonne 2 desc' }, { key: 'col2', order: 'asc', label: 'Colonne 2 asc' }],
    operationList: [{
        label: 'Button1_a',
        action: function action() {
            alert('Button1a');
        },
        style: {},
        priority: 1
    }, {
        label: 'Button1_b',
        action: function action() {
            alert('Button1b');
        },
        style: {},
        priority: 1
    }, {
        label: 'Button2_a',
        action: function action() {
            alert('Button2a');
        },
        style: {},
        priority: 2
    }, {
        label: 'Button2_b',
        action: function action() {
            alert('Button2b');
        },
        style: {},
        priority: 2
    }],
    onLineClick: function onLineClick(_ref) {
        var id = _ref.id;

        alert('click sur la ligne ' + id);
    },
    isSelection: true,
    lineOperationList: [{
        label: 'Button1_a',
        action: function action(_ref2) {
            var tile = _ref2.tile;

            alert(title);
        },
        style: {},
        priority: 1
    }, {
        label: 'Button1_b',
        action: function action(_ref3) {
            var tile = _ref3.tile;

            alert(title);
        },
        style: {},
        priority: 1
    }, {
        label: 'Button2_a',
        action: function action(_ref4) {
            var tile = _ref4.tile;

            alert(title);
        },
        style: {},
        priority: 2
    }, {
        label: 'Button2_b',
        action: function action(_ref5) {
            var tile = _ref5.tile;

            alert(title);
        },
        style: {},
        priority: 2
    }],
    criteria: {
        scope: 'Scope',
        searchText: 'value'
    },
    idField: 'id',
    unselectedScopeAction: function unselectedScopeAction() {
        alert('unselect scope');
    },
    exportAction: function exportAction() {
        alert('export');
    },
    service: service,
    lineComponentMapper: function lineComponentMapper(list) {
        return Line;
    },
    groupComponent: Group,
    groupMaxRows: 1
};

var AdvancedSearch = FocusComponents.page.search.advancedSearch.component;

// Mocked interaction

setTimeout(function () {
    service.scoped({ query: '', scope: '', facets: '' });
}, 2000);

return React.createElement(AdvancedSearch, advancedSearchProps);