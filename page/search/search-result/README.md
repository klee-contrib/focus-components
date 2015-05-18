## Technical Configuration
Mixin permettant d'impl�menter un panneau de recherche.

## Attributs
<table>
    <thead>
		<tr>
          <th>Attribut</th>
          <th>Options</th>
          <th>valeurs possibles</th>
          <th>valeur par d�fault</th>
          <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>lineMap</code></td>
            <td><i>object</i></td>
            <td><code>{scope1: line}</code></td>
            <td><code>text</code></td>
            <td>D�finit la map des diff�rents type de ligne � afficher dans r�sultats de recherche.</td>
        </tr>
        <tr>
            <td><code>operationList</code></td>
            <td><i>array</i></td>
            <td></td>
            <td><code>[]</code></td>
            <td>D�finit la liste des op�rations applicable sur une ligne.</td>
        </tr>
        <tr>
            <td><code>scopeList</code></td>
            <td><i>array</i></td>
            <td></td>
            <td><code>[]</code></td>
            <td>D�finit la liste des scopes selectionnable pour restreindre l'�tendue de la recherche.</td>
        </tr>
        <tr>
            <td><code>groupMaxRows</code></td>
            <td><i>number</i></td>
            <td></td>
            <td><code>3</code></td>
            <td>D�finit le nombre de ligne � afficher par groupe lorsque la recherche est globale.</td>
        </tr>
        <tr>
            <td><code>idField</code></td>
            <td><i>string</i></td>
            <td></td>
            <td>id</td>
            <td>D�finit le nom de l'attribut portant l'id sur une ligne.</td>
        </tr>
        <tr>
            <td><code>isSelection</code></td>
            <td><i>boolean</i></td>
            <td></td>
            <td><code>true</code></td>
            <td>D�finit si la liste offre la possibilit� de s�lectionner les lignes de r�sultat.</td>
        </tr>
        <tr>
            <td><code>onLineClick</code></td>
            <td><i>function</i></td>
            <td></td>
            <td>aucune.</td>
            <td>D�finit la fonction � ex�cuter lors du clic sur une ligne de r�sultat.</td>
        </tr>
   </tbody>
</table>

## M�thodes
<table>
    <thead>
        <tr>
            <th>M�thode</th>
            <th>Param�tres</th>
            <th>Retour</th>
            <th>Description</th>
        </tr>
    </thead>
        <tbody>
            <tr>
                <td><code>quickSearchComponent()</code></td>
                <td>Aucun.</td>
                <td><i>React-component</i></td>
                <td>Retourne le composant de champs de recherche par scope.</td>
            </tr>
            <tr>
                <td><code>isSimpleList()</code></td>
                <td>Aucun.</td>
                <td><i>boolean</i></td>
                <td>Retourne true si le resultat de la recherche est une liste simple et non une liste group�e.</td>
            </tr>
            <tr>
                <td><code>simpleListComponent()</code></td>
                <td>Aucun.</td>
                <td><i>React-component</i></td>
                <td>Retourne une liste de r�sultats simple. Doit �tre utilis�e lorsque la recherche est effectu�e sur un scope.</td>
            </tr>
            <tr>
                <td><code>groupByListComponent()</code></td>
                <td>Aucun.</td>
                <td><i>React-component</i></td>
                <td>Retourne le composant de liste de r�sultats en mode group�.Doit �tre utilis� dans le cas d'une recherche globale.</td>
            </tr>
    </tbody>
</table>

## Ev�nements
Ev�nement � d�finir par l'utilisateur.

<table>
	<thead>
		<tr>
          <th>Ev�nement</th>
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

## Utilisation du mixin de recherche-r�sultats
afin d'uitliser le mixin il est n�cessaire de d�finir deux attributs et deux m�thodes :
- attributs : actions et store
- m�thodes : render et renderGroupByBlock

```javascript
 var searchResult = React.createClass({
    mixins:[Focus.components.page.search.searchResult.mixin],
    actions: {[objet contenant les actions de recherche]},
    store: {[store de recherche]},
    render: function render(){
        var qs = this.quickSearchComponent();
        var list = this.isSimpleList() ? this.simpleListComponent({type:"test"}) : this.groupByListComponent();
        var root = React.createElement('div',{className: "search-panel"},qs,list);
        return root;
    },
    renderGroupByBlock: function renderGroupByBlock(groupKey, list, maxRows) {
        var title = React.createElement(FocusComponents.common.title.component, { title: groupKey });
        var showMoreButton = React.createElement(FocusComponents.common.button.action.component, { handleOnClick: this.changeGroupByMaxRows(groupKey, 5), label: "Show more" });
        return React.createElement( "div", { className: "listResultContainer panel" },
                title,
                this.simpleListComponent({
                    type: "test",
                    list: list,
                    maxRows: maxRows
                }),
                showMoreButton);
    }
});
```

## D�pendance � impl�menter
- la structure du r�pertoire de d�veloppement doit �tre la suivante :

```javascript
_actions
    _search
        index.js
_searchResult
    * line1.jsx
    * line2.jsx
    * preview1.jsx
    * preview2.jsx
    * searchResult.jsx
```

- la recherche n�cessite �galement la cr�ation d'un store de type **Focus.store.SearchStore**
- les lignes doivent impl�menter le mixin de ligne **Focus.components.list.selection.line.mixin**

## Structure
- un champs de recherche
- une liste de r�sultat

## Exemple
[Exemple de recherche-r�sultat](https://github.com/KleeGroup/focus-components/blob/master/page/search/search-result/example/index.html)
## Test
todo
## D�mo
[D�mo de recherche-r�sultat](http://kleegroup.github.io/focus-components/page/search/search-result/example/)