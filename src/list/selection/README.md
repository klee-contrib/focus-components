## Technical Configuration

Cas d'utilisation :
Affichage d'une liste par block avec la capacité de selectionner une ou plusieurs lignes.


## Attributes

<table>
	<thead>
        <tr>
            <th>Attribut</th>
            <th>Type</th>
            <th>valeurs possibles</th>
            <th>valeur par défault</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>data</code></td>
            <td><i>array</i></td>
            <td><code>[{firstname: "test", lastname: "test"}]</code></td>
            <td><code>[]</code></td>
            <td>Définit le tableau des données à afficher.</td>
        </tr>
        <tr>
            <td><code>isSelection</code></td>
            <td><i>boolean</i></td>
            <td></td>
            <td><code>true</code></td>
            <td>Définit si la liste offre la possibilité de sélectionner les lignes.</td>
        </tr>
        <tr>
            <td><code>lineComponent</code></td>
            <td><i>React-component</i></td>
            <td></td>
            <td>aucune.</td>
            <td>Définit le composant pour afficher les lignes de la liste.</td>
        </tr>
		<tr>
            <td><code>buttonComponent</code></td>
            <td><i>React-component</i></td>
            <td></td>
            <td><code>FocusComponents.common.button.action</code></td>
            <td>Définit le composant pour afficher un bouton.</td>
        </tr>
        <tr>
            <td><code>isLoading</code></td>
            <td><i>boolean</i></td>
            <td></td>
            <td><code>false</code></td>
            <td>Définit si la liste est cours de chargement des données.</td>
        </tr>
        <tr>
            <td><code>loader</code></td>
            <td><i>function</i></td>
            <td></td>
            <td>une fonction qui affiche : Loading...</td>
            <td>Définit la fonction affichant l'etat de chargement dans la liste</td>
        </tr>
        <tr>
            <td><code>selectionStatus</code></td>
            <td><i>string</i></td>
            <td><code>none</code>, <code>selected</code>, <code>partial</code></td>
            <td><code>partial</code></td>
            <td>Définit l'état de selection de la liste.</td>
        </tr>
        <tr>
            <td><code>idField</code></td>
            <td><i>string</i></td>
            <td></td>
            <td>id</td>
            <td>Définit le nom de l'attribut portant l'id sur une ligne.</td>
        </tr>
        <tr>
            <td><code>operationList</code></td>
            <td><i>array</i></td>
            <td></td>
            <td><code>[]</code></td>
            <td>Définit la liste des opérations applicable sur une ligne.</td>
        </tr>
        <tr>
            <td><code>onLineClick</code></td>
            <td><i>function</i></td>
            <td></td>
            <td>aucune.</td>
            <td>Définit la fonction à exécuter lors du clic sur une ligne.</td>
        </tr>
        <tr>
            <td><code>onSelection</code></td>
            <td><i>function</i></td>
            <td></td>
            <td>aucune.</td>
            <td>Définit la fonction à exécuter lors de la sélection d'une ligne dans la liste.</td>
        </tr>
        <tr>
            <td><code>hasMoreData</code></td>
            <td><i>boolean</i></td>
            <td></td>
            <td><code>false</code></td>
            <td>Définit si la liste a encore des données à charger</td>
        </tr>
        <tr>
            <td><code>fetchNextPage</code></td>
            <td><i>function</i></td>
            <td></td>
            <td>aucune.</td>
            <td>Définit la fonction permettant de charger la page suivante de données.</td>
        </tr>
        <tr>
            <td><code>isManualFetch</code></td>
            <td><i>boolean</i></td>
            <td></td>
            <td><code>false</code></td>
            <td>Définit si la liste utilise le comportement de scroll infini ou non.</td>
        </tr>

   </tbody>
</table>

**example d'utilisation de l'attribut operationList**

```javascript
var operationList = [
        {label: "Button1_a",action: function(data) {alert(data.title);},style: undefined,priority: 1},
        {label: "Button1_b",action: function(data) {alert(data.title);},style: undefined,priority: 1},
        {label: "Button2_a",action: function(data) {alert(data.title);},style: undefined,priority: 2},
        {label: "Button2_b",action: function(data) {alert(data.title);},style: undefined,priority: 2}
    ];
   // l'attribut priority définit si l'action est primaire ou secondaire
   // action primaire = bouton
   // action secondaire = liste deroulante en fin de ligne
```

## Methods

Pas de méthodes.

## Events

Evènement à définir par l'utilisateur.

<table>
	<thead>
		<tr>
          <th>Evènement</th>
          <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <td><code>`line:onClick`</code></td>
          <td>action sur le click d'une ligne.</td>
      </tr>
       <tr>
            <td><code>`line:selection`</code></td>
            <td>action la selection d'une d'une ligne.</td>
        </tr>
   </tbody>
</table>

## Structure
- conteneur du tableau : ul
- conteneur de ligne : li

## Example
```jsx
<List data={list} onLineClick={function}/>
```

[Exemple de liste selection](https://github.com/KleeGroup/focus-components/blob/master/list/selection/example/index.html)
## Test
Todo.
## Demo
[Démo de table](http://kleegroup.github.io/focus-components/list/selection/example/)

## Définition de la ligne d'un tableau
Un mixin de ligne est définit dans focus afin de rendre la ligne d'une table : **Focus.components.list.selection.line.mixin**

```javascript
var Line = React.createClass({
        mixins: [Focus.components.list.selection.line.mixin],
        definitionPath: [entityDefinition de votre objet],
        renderLineContent: function(data){
            return (
                    <div>
                          ...
                    </div>
            );
        }
    });
```
