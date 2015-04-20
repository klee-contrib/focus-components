# Message center

Le composant du centre de message est branché au store de message de focus.
Il suffit de l'insérer dans l'application et il fonctionne de manière autonome.

```jsx
  React.render(<MessageCenter/>, document.querySelector("#message-center-container"));
```

A chaque message ajouté via le `helper` de message de focus ce dernier sera ajouté.


```javascript
focus.message.addErrorMessage({title: "error message", content: "content"});
focus.message.addInformationMessage({title: "information message", content: "content"});
focus.message.addWarningMessage({title: "warning message", content: "content"});
//Ajoute un message en précisant son type
focus.message.addMessage({title: "Success message", content: "content", type: "success"});
```
