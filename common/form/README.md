# Form mixin

The purpose of the `formMixin` is to be able to create HTML forms.

Le mixin de form n'est pas un composant autosuffisant, il faut nécessairement redéfinir certaines methodes et certaines propriétés afin de le faire fonctionner correctement.

## Properties

Le composant de formulaire a

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
