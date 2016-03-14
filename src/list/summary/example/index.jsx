const ListSummary = FocusComponents.list.summary.component;
const i18nInitializer = FocusCore.translation.init;

var resources = {
    dev: {
        translation: {
            'result': {
                'for': 'results have been found for ',
                'export': 'Export'
            }
        }
    }
};
i18n.init({resStore: resources});

const scopes = {
    ani: 'Animation',
    mov: 'Movie'
};

const ListSummaryExample = React.createClass({
    render() {
        return(
            <div>
                <ListSummary
                    nb={8}
                    queryText="Superman"
                    scopeList={scopes}
                    scopeClickAction={(scopeKey) => {alert("Removed scope : " + scopeKey); }}
                    exportAction={() => {alert("Export action"); }}
                    />
            </div>
        );
    }
});

module.exports = ListSummaryExample;
