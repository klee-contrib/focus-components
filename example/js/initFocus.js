/*global focus*/
var entities ={
  "contact": {
    "firstName": {
      "domain": "DO_TEXT",
      "required": false
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
