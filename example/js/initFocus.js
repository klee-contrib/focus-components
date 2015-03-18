var domain =  {
  "DO_TEXT": {
    style: "do_text",
    type: "text",
    component: "PapaSinge",
    validation: [{
      type: "function",
      value: function() {
        return false;
      }
    }]
  },
  "DO_EMAIL": {
    style: "do_email",
    type: "email",
    component: "PapaMail",
    validation: [{
      type: "function",
      value: function() {
        return true;
      }
    }]
  }
};
focus.definition.domain.container.setAll(domain);
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
    },
    "isCool":{
      "domain": "DO_BOOLEAN",
      "FieldComponent": focusComponents.common.input.checkbox.component
    },
    "isNice":{
      "domain": "DO_BOOLEAN",
      "FieldComponent": focusComponents.common.input.toggle.component
    }
  }};
focus.definition.entity.container.setEntityConfiguration(entities);
