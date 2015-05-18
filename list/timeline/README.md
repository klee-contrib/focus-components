## Configuration technique
Cas d'utilisation :
affichage d'une liste sous forme de timeline.

## Attributs
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
            <td><code>lineComponent</code></td>
            <td><i>React-component</i></td>
            <td></td>
            <td>aucune.</td>
            <td>Définit le composant pour afficher les lignes du tableau.</td>
        </tr>
        <tr>
            <td><code>isLoading</code></td>
            <td><i>boolean</i></td>
            <td></td>
            <td><code>false</code></td>
            <td>Définit si le tableau est en cours de chargement des données.</td>
        </tr>
        <tr>
            <td><code>loader</code></td>
            <td><i>function</i></td>
            <td></td>
            <td>une fonction qui affiche : Loading...</td>
            <td>Définit la fonction affichant l'etat de chargement dans la liste</td>
        </tr>
        <tr>
            <td><code>idField</code></td>
            <td><i>string</i></td>
            <td></td>
            <td>id</td>
            <td>Définit le nom de l'attribut portant l'id sur une ligne.</td>
        </tr>
        <tr>
            <td><code>dateField</code></td>
            <td><i>string</i></td>
            <td></td>
            <td><code>date</code></td>
            <td>Définit le nom de l'attribut portant la date sur une ligne.</td>
        </tr>
        <tr>
            <td><code>onLineClick</code></td>
            <td><i>function</i></td>
            <td></td>
            <td>aucune.</td>
            <td>Définit la fonction à exécuter lors du clic sur une ligne.</td>
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

## Méthodes
pas de méthodes.

## Evènements
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
   </tbody>
</table>

## Structure
- conteneur du tableau : ul
- conteneur de ligne : li

## Exemple
[Exemple de timeline](https://github.com/KleeGroup/focus-components/blob/master/list/timeline/example/index.html)
## Test
todo
## Démo
[Démo de timeline](http://kleegroup.github.io/focus-components/list/timeline/example/)

## Définition de la ligne d'un tableau
Un mixin de ligne est définit dans Focus afin de rendre la ligne d'une table : **Focus.components.list.table.line.mixin**

```javascript
var Line = React.createClass({
        mixins: [Focus.components.list.timeline.line.mixin],
        definitionPath: [entityDefinition de votre objet],
        renderLineContent: function(data){
            return (
                    <div className="timeline-body">
                          ...
                    </div>
            );
        }
    });
```
