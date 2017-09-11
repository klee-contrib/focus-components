import { component as FacetBox } from 'focus-components/search/facet-box';
import { init as i18nInitializer } from 'focus-core/translation';

const resources = {
    dev: {
        translation: {
            live: {
                filter: {
                    title: 'FACETS',
                    facets: {
                        FCT_CONTRIES: 'Contries',
                        FCT_REGIONS: 'Regions',
                        FCT_CITIES: 'Cities'
                    }
                }
            }
        }
    }
};

i18nInitializer({ resources: resources });

const FacetsExample = React.createClass({
    render() {
        return (
            <div>
                <MyFacetBox />
            </div>
        );
    }
});

const facets = {
    FCT_CONTRIES: {
        FRA: { label: 'France', count: 43 },
        GER: { label: 'Germany', count: 18 },
        ENG: { label: 'England', count: 12 }
    },
    FCT_REGIONS: {
        IDF: { label: 'Ile de France', count: 11 },
        RHA: { label: 'Rhône-Alpes', count: 25 },
        LRN: { label: 'Lorraine', count: 7 },
        BDB: { label: 'Brandenburg', count: 2 },
        HMB: { label: 'Hamburg', count: 5 },
        WML: { label: 'West Midlands', count: 8 },
        HPS: { label: 'Hampshire', count: 5 }
    },
    FCT_CITIES: {
        Par: { label: 'Paris', count: 11 },
        LYO: { label: 'Lyon', count: 25 },
        BRL: { label: 'Hennigsdorf', count: 2 },
        MNC: { label: 'Hamburg', count: 5 },
        LND: { label: 'Birmingham', count: 8 },
        SHN: { label: 'Southampton', count: 5 }
    }
};

const MyFacetBox = React.createClass({
    getInitialState() {
        return ({
            selectedFacetList: {},
            openedFacetList: {}
        })
    },
    config: {
        FCT_CONTRIES: 'text',
        FCT_REGIONS: 'text',
        FCT_CITIES: 'text'
    },
    facetList: facets,
    dataSelectionHandler({ selectedFacetList, openedFacetList }) {
        this.setState({ selectedFacetList, openedFacetList });
    },
    render() {
        const { config, dataSelectionHandler, facetList } = this;
        const { selectedFacetList, openedFacetList } = this.state;
        return (
            <FacetBox
                config={config}
                dataSelectionHandler={dataSelectionHandler}
                facetList={facetList}
                openedFacetList={{ FCT_CONTRIES: true }}
                selectedFacetList={selectedFacetList}
            />
        );
    }
});

export default FacetsExample;
