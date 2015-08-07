## Technical Configuration

Le composant de recherche rapide est utilisé dans le cadre d'une recherche centralisée au sein de l'application.


## Attributes

Attribute     | Options     | Possible               | Default       | Description
---           | ---         | ---                    | ---           | ---
`value`        | *string*   |                        | undefined     | valeur préremplie du champ de recherche
`scopes`        | *array*   | [{code: "code", label: "label", style: "cssClass"}] | []| Scopes possibles pour le champ de recherche
`scope`        | *string | number*   | 12, "COD"     | undefined     | valeur du scope sélectionné si ce dernier existe
`minChar`        | *number* | 12 ou 1 ou 0          | 0       | Nombre de caractères minimum afin de lancer la recherche
`loading`        | *boolean*   |    `true` ou `false`                   | `false`    | true if the component is in the loading state
`handleKeyUp`        | *function*   |    function                   | `undefined`    | Fonction de callback appellée lorque le nombre de caractère dépasse `minChar`


## Methods

If the component exposes methods in order to be able to interact with it.

Method         | Parameters   | Returns      | Description
---            | ---          | ---          | ---
`getValue()`   | Aucun.        | *object*     |Retourne la valeur du scope et la valeur de l'input de recherche dans `{scope: "scopeValue", query : "query value"}`

## Events

Which events are triggered by the user.

Event         | Description
---           | ---
`scope:click`      | The scope has change its value
`input:change`      | The input text has change its value

## Structure
- scope (composant fils)
- input
- help

## Example
```jsx
<QuickSearch placeholder="Veuillez taper au moins 3 caractères..."/>
```
```javascript
React.createElement(React.createClass(FocusComponents.search.quickSearch)),
  document.querySelector("#quick-search-container")
);
```


## Test

## Demo
![Input](http://images.ientrymail.com/webpronews/article_pics/html-speech-input.jpg)
