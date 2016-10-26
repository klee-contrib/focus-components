## Technical Configuration
Mixin permettant d'implémenter un écran de recherche avancée.

## Attributs
<table>
    <thead>
		<tr>
          <th>Attribut</th>
          <th>Options</th>
          <th>valeurs possibles</th>
          <th>valeur par défault</th>
          <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>criteria</code></td>
            <td><i>object</i></td>
            <td><code>{scope: "Scope", searchText: "value"}</code></td>
            <td></td>
            <td>Définit le critère de recherche saisi dans la recherche rapide.</td>
        </tr>
        <tr>
            <td><code>lineMap</code></td>
            <td><i>object</i></td>
            <td><code>{scope1: line}</code></td>
            <td><code>text</code></td>
            <td>Définit la map des différents type de ligne à afficher dans résultats de recherche.</td>
        </tr>
        <tr>
            <td><code>operationList</code></td>
            <td><i>array</i></td>
            <td></td>
            <td><code>[]</code></td>
            <td>Définit la liste des opérations applicable sur un groupe de lignes.</td>
        </tr>
         <tr>
            <td><code>lineOperationList</code></td>
            <td><i>array</i></td>
            <td></td>
            <td><code>[]</code></td>
            <td>Définit la liste des opérations applicable sur une ligne.</td>
        </tr>
        <tr>
            <td><code>facetConfig</code></td>
            <td><i>object</i></td>
            <td><code>{FCT_PAYS: "text", FCT_STATUS: "text"}</code></td>
            <td><code>{}</code></td>
            <td>Définit la liste des facettes disponible pour la recherche avancée.</td>
        </tr>
        <tr>
            <td><code>orderableColumnList</code></td>
            <td><i>array</i></td>
            <td><code>[{key:"col1", order:"desc", label:"Colonne 1 desc"}]</code></td>
            <td><code>{}</code></td>
            <td>Définit la liste des colonnes triables.</td>
        </tr>
        <tr>
            <td><code>groupMaxRows</code></td>
            <td><i>number</i></td>
            <td></td>
            <td><code>3</code></td>
            <td>Définit le nombre de ligne à afficher par groupe pour un grouby sur une colonne.</td>
        </tr>
        <tr>
            <td><code>idField</code></td>
            <td><i>string</i></td>
            <td></td>
            <td>id</td>
            <td>Définit le nom de l'attribut portant l'id sur une ligne.</td>
        </tr>
        <tr>
            <td><code>isSelection</code></td>
            <td><i>boolean</i></td>
            <td></td>
            <td><code>true</code></td>
            <td>Définit si la liste offre la possibilité de sélectionner les lignes de résultat.</td>
        </tr>
        <tr>
            <td><code>onLineClick</code></td>
            <td><i>function</i></td>
            <td></td>
            <td>aucune.</td>
            <td>Définit la fonction à exécuter lors du clic sur une ligne de résultat.</td>
        </tr>
        <tr>
            <td><code>unselectedScopeAction</code></td>
            <td><i>function</i></td>
            <td></td>
            <td>aucune.</td>
            <td>Définit la fonction à exécuter lors du clic sur la suppression du scope de la recherche avancée.</td>
        </tr>
        <tr>
            <td><code>exportAction</code></td>
            <td><i>function</i></td>
            <td></td>
            <td>aucune.</td>
            <td>Définit la fonction à exécuter lors du clic sur le bouton exporter.</td>
        </tr>
   </tbody>
</table>

## Méthodes
<table>
    <thead>
        <tr>
            <th>Méthode</th>
            <th>Paramètres</th>
            <th>Retour</th>
            <th>Description</th>
        </tr>
    </thead>
        <tbody>
            <tr>
                <td><code>getFacetBoxComponent()</code></td>
                <td>Aucun.</td>
                <td><i>React-component</i></td>
                <td>Retourne le composant filtre par facettes.</td>
            </tr>
            <tr>
                <td><code>isSimpleList()</code></td>
                <td>Aucun.</td>
                <td><i>boolean</i></td>
                <td>Retourne true si le resultat de la recherche est une liste simple et non une liste groupée.</td>
            </tr>
            <tr>
                <td><code>getSimpleListComponent()</code></td>
                <td>Aucun.</td>
                <td><i>React-component</i></td>
                <td>Retourne une liste de résultats simple. Doit être utilisée lorsque la recherche est effectuée sur un scope.</td>
            </tr>
            <tr>
                <td><code>getGroupByListComponent()</code></td>
                <td>Aucun.</td>
                <td><i>React-component</i></td>
                <td>Retourne le composant de liste de résultats en mode groupé.Doit être utilisé dans le cas d'une recherche globale.</td>
            </tr>
            <tr>
                <td><code>getListSummaryComponent()</code></td>
                <td>Aucun.</td>
                <td><i>React-component</i></td>
                <td>Retourne le composant de liste de résultats en mode groupé.Doit être utilisé dans le cas d'une recherche globale.</td>
            </tr>
            <tr>
                <td><code>getActionBarComponent()</code></td>
                <td>Aucun.</td>
                <td><i>React-component</i></td>
                <td>Retourne le composant de barre d'action applicable à la liste.</td>
            </tr>
    </tbody>
</table>

## Evénements
Evénement à définir par l'utilisateur.

<table>
	<thead>
		<tr>
          <th>Evénement</th>
          <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <td><code>`line:onClick`</code></td>
          <td>action sur le click d'une ligne.</td>
      </tr>
   </tbody>
</table>

## Changer les propriétés de AdvancedSearch en fonction du scope sélectionné

Pour que le composant AdvancedSearch puisse s'adapter en fonction du scope, il est possible de s'abonner au noeud "scope" de son store pour réagir en fonction de sa valeur.

Ce scope est disponible par un import, voici un exemple avec des actions de tri changeant en fonction du scope :
```javascript
import React, {Component, PropTypes} from 'react';
import connect from 'focus-components/behaviours/store/connect';

// web components
import {component as AdvancedSearch} from 'focus-components/page/search/advanced-search';
import {advancedSearchStore} from 'focus-core/search/built-in-store';

//Autres propriétés passées au composant, qui ne changent pas en fonction du scope
import {configuration} from './configuration';

const AdvancedSearchView = (props) => {

	//Configure les actions en fonction du scope
	let orderableColumnList;
	if (this.props.scope==="scope0") {
	    orderableColumnList = [
	        {key: "ATTRIBUT0", order: true, label: "Trier par attribut 0")}
	    ]
	} else if (this.props.scope==="scope1") {
	    orderableColumnList = [
	        {key: "ATTRIBUT1", order: true, label: "Trier par attribut 1")}
	    ]
	}

	return (
	     <AdvancedSearch ref="advancedSearch" {...configuration} orderableColumnList={orderableColumnList} />
	)
}
AdvancedSearchView.displayName = 'AdvancedSearch';
AdvancedSearchView.propTypes = {
	scope: PropTypes.string.isRequired
	};

const connector = connect(
    [{store: advancedSearchStore, properties: ['scope']}],
    props => advancedSearchStore.getValue()
);

export default connector(AdvancedSearchView);
```

## Utilisation du mixin de recherche-résultats
Afin d'utiliser le mixin il est nécessaire de définir deux attributs et deux méthodes :
- attributs : actions et store
- méthodes : render et renderGroupByBlock

```javascript
 var advancedSearch = React.createClass({
    mixins:[Focus.components.page.search.advancedSearch.mixin],
    actions: {search: function() {// fonction de recherche}},
    store: {[store de recherche]},
    render: function render(){
        var facets = this.getFacetBoxComponent();
        var summaryList = this.getListSummaryComponent();
        var actionBar = this.getActionBarComponent();
        var resultsList = this.isSimpleList() ? this.getSimpleListComponent({type:"test"}) : this.getGroupByListComponent();
        var root = React.createElement('div', {className: "advanced-search"},
            facets,
            React.createElement('div', {},
                summaryList,
                actionBar,
                resultsList
            )
        );
        return root;
    },
    renderGroupByBlock: function renderGroupByBlock(groupKey, list, maxRows) {
        var title = React.createElement(FocusComponents.common.title.component, { title: groupKey });
        var showMoreButton = React.createElement(FocusComponents.common.button.action.component, { handleOnClick: this.changeGroupByMaxRows(groupKey, 5), label: "Show more" });
        var showAllButton = React.createElement(FocusComponents.common.button.action.component, { handleOnClick: this.showAllGroupListHandler(groupKey), label: "Show all" });
        return React.createElement( "div", { className: "listResultContainer panel" },
            title,
            this.getSimpleListComponent({
                type: "test",
                list: list,
                maxRows: maxRows
            }),
            showMoreButton,
            showAllButton
        );
    }
});
```

## Dépendances à implémenter
- la recherche nécessite également la création d'un store de type **Focus.store.SearchStore**
- les lignes doivent implémenter le mixin de ligne **Focus.components.list.selection.line.mixin**

## Structure
- un champs de recherche
- une liste de résultat

## Exemple
[Exemple de advanced-search](https://github.com/KleeGroup/focus-components/blob/master/page/search/advanced-search/example/index.html)
## Test
todo
## Démo
[Démo de advanced-search](http://kleegroup.github.io/focus-components/page/search/advanced-search/example/)
