## Technical Configuration

Cas d'utilisation :
Affichage d'un champ de formulaire avec label erreur, aide et champ de saisie..


## Attributes

Attribute       | Options              | Possible              | Default       | Description
---             | ---                  | ---                   | ---           | ---
`name`         | *string*              | *                     |   undefined   | nom de la propriété.
`value`         | *string|number*      | *                     |   undefined   | Fournie la valeur du composant.
`error`         | *string*      | *                     |   undefined   | Fournie l'erreur associée au champ si elle existe.
`type`          | *text|date|number...*|                       |     text      | Définie le composant permettant d'afficher une ligne de la liste.
`hasLabel`      | *boolean*            |       true/fasle      | `true`        | Définit si le compoant a un label ou non.
`onChange`      | *function*           |                       |     undefined | Fonction appellée lors du changement de valeur du champ field.

## Methods

getValue
validate: valide la

## Events

Evènement à définir par l'utilisateur.

Event           | Description
---             | ---
`field:onChange`  | Changement de la valeur renseigné dans le champ de saisie.

## Structure
- label
- input
- error
- help

## Example
```jsx
<field value="pierre" type="text" />
```


## [Test](http://kleegroup.github.io/focus-components/form/field/example)

## Demo
![field](http://images.ientrymail.com/webpronews/article_pics/html-speech-input.jpg)
