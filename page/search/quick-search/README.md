## Configuration technique
Mixin permettant d'implémenter un panneau de recherche rapide.
Le panneau se compose d'une barre de recherche, ainsi que d'une liste de résultats.

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
            <td>Définit la liste des opérations applicables sur une ligne.</td>
        </tr>
        <tr>
            <td><code>scopeList</code></td>
            <td><i>array</i></td>
            <td></td>
            <td><code>[]</code></td>
            <td>Définit la liste des scopes selectionnables pour restreindre l'étendue de la recherche.</td>
        </tr>
        <tr>
            <td><code>groupMaxRows</code></td>
            <td><i>number</i></td>
            <td></td>
            <td><code>3</code></td>
            <td>Définit le nombre de ligne à afficher par groupe lorsque la recherche est globale.</td>
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
            <td><code>false</code></td>
            <td>Définit si la liste offre la possibilité de sélectionner les lignes de résultat.</td>
        </tr>
        <tr>
            <td><code>onLineClick</code></td>
            <td><i>function</i></td>
            <td></td>
            <td>aucune.</td>
            <td>Définit la fonction à exécuter lors du clic sur une ligne de résultat.</td>
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
                <td><code>getSearchBarComponent()</code></td>
                <td>Aucun.</td>
                <td><i>React-component</i></td>
                <td>Retourne le composant de barre de recherche avec sélecteur de scope.</td>
            </tr>
            <tr>
                <td><code>isSimpleList()</code></td>
                <td>Aucun.</td>
                <td><i>boolean</i></td>
                <td>Retourne <code>true</code> si la propriété <code>list</code> du <code>store</code> est une liste simple (un <code>Array</code>), <code>false</code> si la propriété <code>list</code> du <code>store</code> est une liste typée (un <code>Object</code>)</td>
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
                <td>Retourne le composant de liste de résultats en mode groupé. Doit être utilisé dans le cas d'une recherche globale.</td>
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

## Utilisation du mixin de quick-search
Afin d'utiliser le mixin il est nécessaire de définir deux attributs et deux méthodes :
- attributs : actions et store
- méthodes : render et renderGroupByBlock

```javascript
 var quickSearch = React.createClass({
    mixins:[Focus.components.page.search.quickSearch.mixin],
    actions: {search: function() {// fonction de recherche}},
    store: {[store de recherche]},
    render: function render(){
        var searchBar = this.getSearchBarComponent();
        var list = this.isSimpleList() ? this.getSimpleListComponent({type:"test"}) : this.getGroupByListComponent();
        var root = React.createElement('div',{className: "search-panel"},searchBar,list);
        return root;
    },
    renderGroupByBlock: function renderGroupByBlock(groupKey, list, maxRows) {
        var title = React.createElement(FocusComponents.common.title.component, { title: groupKey });
        var showMoreButton = React.createElement(FocusComponents.common.button.action.component, { handleOnClick: this.changeGroupByMaxRows(groupKey, 5), label: "Show more" });
        return React.createElement( "div", { className: "listResultContainer panel" },
                title,
                this.getSimpleListComponent({
                    type: "test",
                    list: list,
                    maxRows: maxRows
                }),
                showMoreButton);
    }
});
```

## Dépendances à implémenter
- la recherche nécessite également la création d'un store de type **Focus.store.SearchStore**
- les lignes doivent implémenter le mixin de ligne **Focus.components.list.selection.line.mixin**

## Structure
- un menu de facettes
- une barre de résumé
- une barre d'actions
- une liste de résultat

## Exemple
[Exemple de quick-search](https://github.com/KleeGroup/focus-components/blob/master/page/search/quick-search/example/index.html)
## Test
todo
## Démo
[Démo de quick-search](http://kleegroup.github.io/focus-components/page/search/quick-search/example/)