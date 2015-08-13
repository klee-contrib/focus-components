## Technical Configuration

Le composant de facettes est utilisé dans le cas d'une recherche au sein de l'application

## Attributes

List of attributes
<table>
<tr>
    <td>Attribute</td><td>Options</td><td>Possible</td><td>Default</td><td>Description</td>
</tr>
<tr>
    <td>`facetList`</td><td>*array*</td><td>{FCT_PAYS: { "FRA": {label: "France", count: 5}, "GER": {label: "Germany", count: 8} }, FCT_STATUS: { "OPE": {label: "Open", count: 7} } } </td><td> {}    </td><td> Liste des facettes renvoyées par la recherche</td></tr>
    <tr><td>`selectedFacetList`</td><td>*array*</td><td>{ FCT_STATUS: "OPE"} </td><td> {}</td><td> Liste des facettes selectionnées</td></tr>
    <tr><td>`openedFacetList`</td><td>*array*</td><td>{"FCT_PAYS": true}</td><td>{}</td><td> Liste des facette ouvertes (true) ou fermées (false)</td></tr>
    <tr><td>`config`</td><td> *array*</td><td>{ FCT_PAYS: "text", FCT_STATUS: "text" }</td><td>{}</td><td>Facet configuration (seul le type "text" est supporté pour le moment)</td></tr>
    <tr><td>`dataSelectionHandler`</td><td>*function*</td><td></td><td>`undefined`</td><td>function called when facet is selected or unselected</td></tr>
</table>

## Methods

If the component exposes methods in order to be able to interact with it.
<table>
<th>
    <td>Method</td><td>Parameters</td><td>Returns</td><td>Description</td>
</th>
<tr>
    <td>`getValue()`</td><td>Aucun.</td><td>*object* </td><td>Retourne la valeur de l'input de recherche</td><td>`{selectedFacetList: { FCT_STATUS: "OPE"}, openedFacetList : {"FCT_PAYS": true}}`</td>
</tr>
</table>

## Structure
- facet (composant fils)
- facet-data (composant petit-fils)

## Example

```
var config = {
        facetList: {
            FCT_PAYS: {
                "FRA": {label: "France", count: 5},
                "GER": {label: "Germany", count: 8}
            },
            FCT_STATUS: {
                "OPE": {label: "Open", count: 7},
                "CLO": {label: "Closed", count: 2}
            },
            FCT_REGION: {
                "IDF": {label: "Ile de France", count: 11},
                "NPC": {label: "Nord - Pas de Calais", count: 6}
            }
        },
        selectedFacetList: {},
        openedFacetList: {"FCT_STATUS": true},
        config: {
            FCT_PAYS: "text",
            FCT_STATUS: "text",
            FCT_REGION: "text"
        },
        dataSelectionHandler: function() {
            var facetResult = this.refs.liveFilter.getValue();
            ...
        }
    }
    
React.render(
    React.createElement(FocusComponents.search.facetBox.component, config),
    document.querySelector("#facet-box-container"))
);
```

## Exemple
[Exemple de facet-box](https://github.com/KleeGroup/focus-components/blob/master/search/facet-box/example/index.html)
## Test
todo
## Démo
[Démo de facet-box]](http://kleegroup.github.io/focus-components/search/facet-box/example/)
