# Bar d'application

La bar d'application doit être utilisé comme conteneur pour le menu, le titre, les infos utilisateur et l'entête.
En fonction de la position de la scroll bar dans l'écran, la barre peut s'afficher de différente manière.
Trois états par défaut
- tall
- medium
- small
Attribut data-size


## Inspiration

- [Google Material](http://www.google.com/design/spec/material-design/introduction.html#)
- [AirBnb](https://www.airbnb.fr/rooms/5601059?s=2nS7) , pas utilisé au final mais utile dans la réflexion.



## Technical Configuration


## Properties

Attribute                     | Options     | Possible               | Default       | Description
---                           | ---         | ---                    | ---           | ---
`scrollTargetSelector`        | *string*    | `#container` | undefined       | Définit  quel élément va notifier la bar avec l'évènement de type scroll.
`sizeMap`                     | *object*    | `{mediumm: {sizeBorder: 150}}` | {'small': {'sizeBorder': 800},'medium': {'sizeBorder': 500}, ...}| Map de taille par défaut.
`size`                        | *string*    | `tall,medium or an element of sizeMap` | tall       | Taille de la bar par défaut.
`processSize`                 | *function*    | `function(){//traitement}` | undefined       | Surcharge le calcul par défaut de la taille.
`notifySizeChange`            | *function*    | `function(){//traitement}` | undefined       | Notifie les autres éléments que la taille a changée.

## Structure

Le [schéma.pdf](https://github.com/KleeGroup/focus-components/blob/master/application/bar/schema.pdf) présent dans les sources du composant a pour but d'expliquer les éléments de la page.


## Example
```html
<Bar>content as you want</Bar>
```



## Demo

[Application bar](http://kleegroup.github.io/focus-components/application/bar/example/)
