/*global focus*/
var entities ={
  "contact": {
    "firstName": {
      "domain": "DO_TEXT",
      "required": false,
      "validator": function(data){
        return data.length <= 3 ? "le champ doit dépasser la taille de 3" : true;
      }
    },
    "lastName": {
      "domain": "DO_TEXT",
      "required": true
    },
    "age": {
      "domain": "DO_NUMBER",
      "required": false
    },
    "email": {
      "domain": "DO_EMAIL",
      "required": false
    }
  }};
focus.definition.entity.container.setEntityConfiguration(entities);
