import { component as ListSummary } from 'focus-components/list/summary';
import { init } from 'focus-core/translation';

const resources = {
    dev: {
        translation: {
            result: {
                for: 'results have been found for ',
                export: 'Export'
            }
        }
    }
};
init({ resources: resources });

const scopes = {
    ani: 'Animation',
    mov: 'Movie'
};

const ListSummaryExample = React.createClass({
    render() {
        return (
            <div>
                <ListSummary
                    nb={8}
                    queryText='Superman'
                    scopeList={scopes}
                    scopeClickAction={(scopeKey) => { console.log('Removed scope : ' + scopeKey); }}
                    exportAction={() => { console.log('Export action'); }}
                />
            </div>
        );
    }
});

export default ListSummaryExample;
