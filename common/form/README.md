# Form mixin

The purpose of the `formMixin` is to be able to create HTML forms.

Le mixin de form n'est pas un composant autosuffisant, il faut nécessairement redéfinir certaines methodes et certaines propriétés afin de le faire fonctionner correctement.

## Properties

Le composant de formulaire a plusieurs propriétés.

## Attributs

Afin de fonctionner il est nécessaire de définir certains attributs, en voici la liste ainsi que leur siginification.

### Actions

```javascript
{
  action: {
    save: yoursaveFunction,
    load: yourLoadFunction,
    delete: yourDeleteFunction
  }
}
```

### Stores

```javascript
{
  stores: [{
    store: yourStoreInstance, properties: ['propertyOne']
  }]
}
```

## Code avancé

Le mixin de formulaire est divisé en sous mixin afin de clarifier les responsabilités et éventuellement de pouvoir surcharger une partie dans le cadre d'un projet. Les mixins sont dans le répertoire `mixin`.
La composition est la suivante:
- `action-behaviour`: Le mixin regroupant l'appel aux différentes actions de la page.
