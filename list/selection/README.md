## Technical Configuration

Cas d'utilisation :
Affichage d'une liste par block avec la capacité de selectionner une ou plusieurs lignes.


## Attributes

Attribute       | Options           | Possible              | Default       | Description
---             | ---               | ---                   | ---           | ---
`data`          | *Array*           |                       |               | Définie le tableau à afficher.
`lineComponent` | *React-component* |                       |               | Définie le composant permettant d'afficher une ligne de la liste.
`isSelection`   | *boolean*         |                       | `true`        | Définie si le composant permet la selection des lignes.
`onLineClick`   | *function*        |                       |               | Définie la fonction déclenchée sur le click d'une ligne.
`onSelection`   | *function*        |                       |               | Définie la fonction déclenchée sur la selection d'une ligne.
`isAllSelected` | *function*        |                       |               | Définie si toutes les lignes sont sélectionnées.

## Methods

Pas de méthodes.

## Events

Evènement à définir par l'utilisateur.

Event           | Description
---             | ---
`line:onClick`  | action sur le click d'une ligne.

## Structure
- conteneur du tableau : <ul>
- conteneur de ligne : <li>

## Example
```jsx
<List data={list} onLineClick={function}/>
```


## Test

## Demo
![Input](http://images.ientrymail.com/webpronews/article_pics/html-speech-input.jpg)